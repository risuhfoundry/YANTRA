from __future__ import annotations

import asyncio
import json
import logging
import os
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from dotenv import load_dotenv

try:
    from livekit.agents import Agent, AgentServer, AgentSession, JobContext, JobProcess, cli, inference
    from livekit.agents.llm import ChatMessage
    from livekit.plugins import sarvam, silero
except ImportError as exc:  # pragma: no cover - exercised only when voice extras are missing
    raise SystemExit(
        "LiveKit voice extras are not installed. Run: python -m pip install -e .[voice]"
    ) from exc

from yantra_ai.core.service import ChatService
from yantra_ai.core.prompts import make_voice_friendly_reply
from yantra_ai.schemas.chat import ChatRequest, Message, StudentContext

load_dotenv()

logger = logging.getLogger("yantra-livekit")

DEFAULT_LOCAL_AI_SERVICE_URL = "http://127.0.0.1:8000"


def _student_from_env() -> StudentContext:
    return StudentContext(
        name=os.getenv("YANTRA_VOICE_STUDENT_NAME", "Learner"),
        skill_level=os.getenv("YANTRA_VOICE_STUDENT_LEVEL", "Beginner"),
        current_path=os.getenv("YANTRA_VOICE_STUDENT_PATH", "AI Foundations"),
        progress=int(os.getenv("YANTRA_VOICE_STUDENT_PROGRESS", "0")),
    )


def _running_console_mode() -> bool:
    return "console" in sys.argv[1:]


def _running_text_mode() -> bool:
    return "--text" in sys.argv[1:]


def _requesting_help() -> bool:
    return any(arg in {"-h", "--help", "help"} for arg in sys.argv[1:])


def _audio_enabled() -> bool:
    return True


def _chat_backend_target() -> str:
    target = (
        os.getenv("YANTRA_LIVEKIT_AI_TARGET")
        or os.getenv("YANTRA_AI_TARGET")
        or "local"
    ).strip().lower()
    return "render" if target == "render" else "local"


def _normalize_service_url(raw_url: str | None) -> str | None:
    if raw_url is None:
        return None
    value = raw_url.strip()
    return value.rstrip("/") if value else None


def _chat_service_url() -> str:
    if _chat_backend_target() == "render":
        return (
            _normalize_service_url(os.getenv("YANTRA_AI_RENDER_URL"))
            or _normalize_service_url(os.getenv("YANTRA_AI_SERVICE_URL"))
            or "https://yantra-ai.onrender.com"
        )

    return _normalize_service_url(os.getenv("YANTRA_AI_LOCAL_URL")) or DEFAULT_LOCAL_AI_SERVICE_URL


def _chat_service_timeout_s() -> int:
    try:
        return max(5, int(os.getenv("YANTRA_LIVEKIT_REMOTE_TIMEOUT_S", "70")))
    except ValueError:
        return 70


def _voice_playout_timeout_s() -> float:
    try:
        return max(5.0, float(os.getenv("YANTRA_VOICE_PLAYOUT_TIMEOUT_S", "20")))
    except ValueError:
        return 20.0


def _voice_backend() -> str:
    backend = os.getenv("YANTRA_VOICE_BACKEND", "inference").strip().lower()
    if backend == "sarvam" and not os.getenv("SARVAM_API_KEY"):
        logger.warning(
            "YANTRA_VOICE_BACKEND=sarvam but SARVAM_API_KEY is missing. Falling back to LiveKit Inference."
        )
        return "inference"
    return backend


def _ensure_livekit_secret_for_room_modes() -> None:
    if _requesting_help():
        return

    if _running_console_mode():
        return

    if len(sys.argv) == 1:
        raise SystemExit(
            "Choose a LiveKit mode. For terminal-only testing, run: "
            "python livekit_terminal_agent.py console"
        )

    if os.getenv("LIVEKIT_API_SECRET"):
        return

    raise SystemExit(
        "LIVEKIT_API_SECRET is required for LiveKit dev/connect/start modes. "
        "For terminal-only local testing, run: python livekit_terminal_agent.py console --text"
    )


def _build_session(ctx: JobContext) -> AgentSession:
    if _audio_enabled() and _voice_backend() == "sarvam":
        return AgentSession(
            stt=sarvam.STT(
                language=os.getenv("YANTRA_SARVAM_STT_LANGUAGE", "en-IN"),
                model=os.getenv("YANTRA_SARVAM_STT_MODEL", "saaras:v3"),
            ),
            tts=sarvam.TTS(
                target_language_code=os.getenv("YANTRA_SARVAM_TTS_LANGUAGE", "en-IN"),
                model=os.getenv("YANTRA_SARVAM_TTS_MODEL", "bulbul:v3-beta"),
                speaker=os.getenv("YANTRA_SARVAM_TTS_SPEAKER", "shubh"),
                pace=float(os.getenv("YANTRA_SARVAM_TTS_PACE", "1.0")),
            ),
            vad=ctx.proc.userdata["vad"],
        )

    logger.info("Starting LiveKit agent with built-in LiveKit Inference STT/TTS.")
    return AgentSession(
        stt=inference.STT(
            model=os.getenv("YANTRA_LIVEKIT_STT_MODEL", "deepgram/nova-3"),
            language=os.getenv("YANTRA_LIVEKIT_STT_LANGUAGE", "en-IN"),
        ),
        tts=inference.TTS(
            model=os.getenv("YANTRA_LIVEKIT_TTS_MODEL", "deepgram/aura-2"),
            voice=os.getenv("YANTRA_LIVEKIT_TTS_VOICE", "zeus"),
            language=os.getenv("YANTRA_LIVEKIT_TTS_LANGUAGE", "en"),
        ),
        vad=ctx.proc.userdata["vad"],
    )


def prewarm(proc: JobProcess) -> None:
    if _audio_enabled():
        proc.userdata["vad"] = silero.VAD.load()


server = AgentServer(setup_fnc=prewarm)


@server.rtc_session(agent_name=os.getenv("YANTRA_LIVEKIT_AGENT_NAME", "yantra-terminal-voice"))
async def yantra_agent(ctx: JobContext) -> None:
    student = _student_from_env()
    chat_backend_target = _chat_backend_target()
    chat_service = ChatService() if chat_backend_target == "local" else None
    session = _build_session(ctx)
    conversation: list[Message] = []
    reply_lock = asyncio.Lock()
    handled_user_inputs: set[str] = set()

    logger.info("Starting Yantra LiveKit chat backend target: %s", chat_backend_target)

    if _running_text_mode():
        logger.info("Console text flag detected. If audio capture is unavailable, use terminal text only.")

    def generate_chat_response(request: ChatRequest):
        if chat_backend_target == "render":
            service_url = _chat_service_url()
            payload = json.dumps(request.model_dump(mode="json")).encode("utf-8")
            http_request = Request(
                f"{service_url}/chat",
                data=payload,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            try:
                with urlopen(http_request, timeout=_chat_service_timeout_s()) as response:
                    body = response.read().decode("utf-8", errors="replace")
                    data = json.loads(body)
            except HTTPError as exc:
                body = exc.read().decode("utf-8", errors="replace")
                raise RuntimeError(
                    f"Render Yantra chat failed with status {exc.code}: {body or 'empty response'}"
                ) from exc
            except URLError as exc:
                raise RuntimeError(f"Render Yantra chat is unreachable: {exc.reason}") from exc

            reply = str(data.get("reply", "")).strip()
            if not reply:
                raise RuntimeError("Render Yantra chat returned an empty reply.")

            return {
                "reply": reply,
                "provider": str(data.get("provider") or "render-chat"),
                "model_used": data.get("model_used"),
            }

        if chat_service is None:
            raise RuntimeError("Local ChatService was not initialized.")

        response = chat_service.reply(request)
        return {
            "reply": response.reply,
            "provider": response.provider,
            "model_used": response.model_used,
        }

    async def monitor_speech_playout(handle, reply_text: str) -> None:
        timeout_s = _voice_playout_timeout_s()
        try:
            await asyncio.wait_for(handle.wait_for_playout(), timeout=timeout_s)
            logger.info("Yantra speech finished: %s", handle.id)
        except asyncio.TimeoutError:
            logger.warning(
                "Yantra speech timed out after %.1fs. Interrupting speech %s.",
                timeout_s,
                handle.id,
            )
            handle.interrupt(force=True)
        except Exception:
            logger.exception(
                "Yantra speech failed during playback for speech %s. Reply preview: %s",
                handle.id,
                reply_text[:120],
            )

    async def handle_user_text(user_text: str) -> None:
        cleaned = user_text.strip()
        if not cleaned:
            return

        dedupe_key = cleaned.casefold()
        if dedupe_key in handled_user_inputs:
            return

        async with reply_lock:
            handled_user_inputs.add(dedupe_key)
            logger.info("Yantra heard: %s", cleaned)
            conversation.append(Message(role="user", content=cleaned))
            request = ChatRequest(
                messages=conversation[-8:],
                student=student,
                top_k=(chat_service.settings.top_k if chat_service is not None else 3),
            )
            response = await asyncio.to_thread(generate_chat_response, request)
            spoken_reply = make_voice_friendly_reply(
                response["reply"],
                sentence_limit=int(os.getenv("YANTRA_VOICE_SENTENCE_LIMIT", "0")),
                char_limit=int(os.getenv("YANTRA_VOICE_CHAR_LIMIT", "0")),
            )
            conversation.append(Message(role="assistant", content=spoken_reply))
            logger.info(
                "Yantra reply via %s/%s",
                response["provider"],
                response["model_used"] or chat_backend_target,
            )
            speech_handle = session.say(spoken_reply)
            logger.info(
                "Yantra speech queued: %s (%s chars)",
                speech_handle.id,
                len(spoken_reply),
            )
            speech_handle.add_done_callback(
                lambda handle: logger.info(
                    "Yantra speech handle done: %s interrupted=%s",
                    handle.id,
                    handle.interrupted,
                )
            )
            asyncio.create_task(monitor_speech_playout(speech_handle, spoken_reply))

    @session.on("user_input_transcribed")
    def on_user_input_transcribed(ev) -> None:
        is_final = getattr(ev, "is_final", False)
        transcript = getattr(ev, "transcript", "")
        if not is_final or not isinstance(transcript, str) or not transcript.strip():
            return

        asyncio.create_task(handle_user_text(transcript))

    @session.on("conversation_item_added")
    def on_conversation_item_added(ev) -> None:
        item = getattr(ev, "item", None)
        if not isinstance(item, ChatMessage) or item.role != "user":
            return

        content = getattr(item, "content", None)
        if not isinstance(content, str) or not content.strip():
            return

        asyncio.create_task(handle_user_text(content))

    @session.on("error")
    def on_session_error(ev) -> None:
        error = getattr(ev, "error", None)
        logger.error("LiveKit session error: %s", error)

    @session.on("agent_state_changed")
    def on_agent_state_changed(ev) -> None:
        old_state = getattr(ev, "old_state", "unknown")
        new_state = getattr(ev, "new_state", "unknown")
        logger.info("LiveKit agent state: %s -> %s", old_state, new_state)

    @session.on("speech_created")
    def on_speech_created(ev) -> None:
        handle = getattr(ev, "speech_handle", None)
        source = getattr(ev, "source", "unknown")
        if handle is None:
            logger.info("LiveKit speech created from %s", source)
            return
        logger.info("LiveKit speech created: %s from %s", handle.id, source)

    await session.start(
        agent=Agent(
            instructions=(
                "You are Yantra, a warm teacher-guide for the Yantra platform. "
                "Keep spoken replies natural, easy to follow, and compact by default. "
                "Usually answer in 2 or 3 short sentences unless the learner explicitly asks for more detail. "
                "Do not describe yourself as a machine unless the user directly asks."
            )
        ),
        room=ctx.room,
    )


def main() -> None:
    _ensure_livekit_secret_for_room_modes()
    cli.run_app(server)


if __name__ == "__main__":
    main()
