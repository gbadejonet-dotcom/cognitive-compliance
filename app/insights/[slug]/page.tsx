import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/shared/Container'
import { getAllSlugs, getContentBySlug } from '@/lib/mdx'
import { formatDate, SITE_URL, SITE_NAME } from '@/lib/utils'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs('insights').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = getContentBySlug('insights', params.slug)
    return buildMetadata({
      title: post.title,
      description: post.description,
      path: `/insights/${params.slug}`,
    })
  } catch {
    return {}
  }
}

export default function InsightPage({ params }: Props) {
  let post
  try {
    post = getContentBySlug('insights', params.slug)
  } catch {
    notFound()
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header */}
      <section className="bg-slate-900 pb-16 pt-24">
        <Container size="narrow">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All insights
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags?.map((tag: string) => (
              <Badge key={tag} variant="dark">{tag}</Badge>
            ))}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-300">{post.description}</p>

          <div className="mt-6 flex items-center gap-4 text-sm text-slate-400">
            {post.author && (
              <>
                <span className="font-medium text-slate-300">{post.author}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-white py-16">
        <Container size="narrow">
          <article className="prose prose-slate max-w-none lg:prose-lg">
            <MDXRemote source={post.content} />
          </article>

          {/* Back link */}
          <div className="mt-16 border-t border-slate-200 pt-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to insights
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
