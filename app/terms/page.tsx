import InfoPageShell from '@/src/features/legal/InfoPageShell';

export default function TermsPage() {
  return (
    <InfoPageShell
      eyebrow="Terms"
      title="Launch terms for the current Yantra experience."
      description="These terms summarize how the current launch build should be used while the platform continues moving from polished prototype to broader production rollout."
      statusLabel="Preview"
      sections={[
        {
          title: 'Product scope',
          body: [
            'The current Yantra release includes a public landing page, account flows, onboarding, a learner dashboard, a student profile view, and an AI chat surface.',
            'Some product areas still represent guided launch flows rather than the final full learning platform.',
          ],
        },
        {
          title: 'User responsibilities',
          body: [
            'Use accurate account details, protect your password, and avoid entering personal information you do not want stored with your learner profile.',
            'Do not misuse the AI chat or submit harmful, abusive, or unlawful content through the product.',
          ],
        },
        {
          title: 'Availability',
          body: [
            'Yantra may change features, copy, or flows as the launch expands and the product team responds to real usage.',
            'Temporary downtime may occur during deployment, environment changes, or service-provider interruptions.',
          ],
        },
        {
          title: 'Support',
          body: [
            'If a launch-critical issue affects access or profile data, use the live product support path established by your team for follow-up.',
          ],
        },
      ]}
    />
  );
}
