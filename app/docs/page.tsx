import type { Metadata } from 'next';
import DocsHomePage from '@/src/features/docs/DocsHomePage';

export const metadata: Metadata = {
  title: 'Yantra Docs',
  description: 'Guides, onboarding help, account support, and product explanations for Yantra.',
};

export default function DocsPage() {
  return <DocsHomePage />;
}
