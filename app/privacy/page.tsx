import InfoPageShell from '@/src/features/legal/InfoPageShell';

export default function PrivacyPage() {
  return (
    <InfoPageShell
      eyebrow="Privacy"
      title="Privacy that stays aligned with a launch-ready product shell."
      description="Yantra is designed to collect only the information needed to support authentication, onboarding, and learner progress inside the product experience."
      statusLabel="Active"
      sections={[
        {
          title: 'What we store',
          body: [
            'Account creation stores the core identity needed to sign in, maintain a session, and personalize the learner dashboard.',
            'If you edit your student profile, those updates are saved to your Yantra account so the dashboard and profile view stay in sync.',
          ],
        },
        {
          title: 'How data is used',
          body: [
            'Yantra uses profile and progress data to shape the dashboard, onboarding flow, and AI guidance around the current learner context.',
            'Access request submissions are used only to review launch interest and follow up with prospective learners or partners.',
          ],
        },
        {
          title: 'Third-party services',
          body: [
            'Authentication and profile storage are powered through Supabase in this build.',
            'The in-product AI teacher uses Gemini when the required API key is configured in the deployment environment.',
          ],
        },
        {
          title: 'Questions',
          body: [
            'If you need a manual privacy review before launch, use the access form or your internal support channel to request one.',
          ],
        },
      ]}
    />
  );
}
