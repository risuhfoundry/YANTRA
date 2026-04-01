const DEFAULT_SERVICE_TIMEOUT_MS = 65000;
const DEFAULT_LOCAL_AI_SERVICE_URL = 'http://127.0.0.1:8000';

export function normalizeYantraServiceUrl(rawUrl?: string | null) {
  const value = rawUrl?.trim();
  return value ? value.replace(/\/+$/, '') : null;
}

export function getYantraAiTarget() {
  return process.env.YANTRA_AI_TARGET?.trim().toLowerCase() === 'render' ? 'render' : 'local';
}

export function getYantraAiServiceUrl() {
  if (getYantraAiTarget() === 'render') {
    return normalizeYantraServiceUrl(process.env.YANTRA_AI_RENDER_URL || process.env.YANTRA_AI_SERVICE_URL);
  }

  return normalizeYantraServiceUrl(process.env.YANTRA_AI_LOCAL_URL) || DEFAULT_LOCAL_AI_SERVICE_URL;
}

export function getYantraAiServiceTimeoutMs() {
  const rawValue = process.env.YANTRA_AI_SERVICE_TIMEOUT_MS?.trim();
  const parsed = rawValue ? Number.parseInt(rawValue, 10) : Number.NaN;

  if (!Number.isFinite(parsed) || parsed < 1000) {
    return DEFAULT_SERVICE_TIMEOUT_MS;
  }

  return parsed;
}
