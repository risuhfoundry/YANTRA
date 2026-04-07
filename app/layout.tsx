import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Bebas_Neue, Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '../src/styles/globals.css';
import { ExperienceProvider } from '@/src/features/motion/ExperienceProvider';

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const headingFont = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Yantra',
  description:
    'Yantra is an AI-native learning platform for personalized roadmaps, certification signals, and job-ready outcomes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-full focus:bg-white focus:px-4 focus:py-3 focus:font-mono focus:text-[10px] focus:uppercase focus:tracking-[0.22em] focus:text-black focus:no-underline focus:shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          Skip to main content
        </a>
        <ExperienceProvider>
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Analytics />
        </ExperienceProvider>
      </body>
    </html>
  );
}
