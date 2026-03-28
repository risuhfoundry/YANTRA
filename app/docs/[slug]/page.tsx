import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DocsArticlePage from '@/src/features/docs/DocsArticlePage';
import { docsArticles, getDocsArticleBySlug } from '@/src/features/docs/docs-content';

type DocsArticleRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return docsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: DocsArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getDocsArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Yantra Docs',
    };
  }

  return {
    title: `${article.title} | Yantra Docs`,
    description: article.summary,
  };
}

export default async function DocsArticleRoute({ params }: DocsArticleRouteProps) {
  const { slug } = await params;
  const article = getDocsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <DocsArticlePage slug={slug} />;
}
