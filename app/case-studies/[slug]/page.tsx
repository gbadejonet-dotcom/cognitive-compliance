import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/shared/Container'
import { getAllSlugs, getContentBySlug } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs('case-studies').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const study = getContentBySlug('case-studies', params.slug)
    return buildMetadata({
      title: study.title,
      description: study.description,
      path: `/case-studies/${params.slug}`,
    })
  } catch {
    return {}
  }
}

export default function CaseStudyPage({ params }: Props) {
  let study
  try {
    study = getContentBySlug('case-studies', params.slug)
  } catch {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <section className="bg-slate-900 pb-16 pt-24">
        <Container size="narrow">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All case studies
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {study.sector && <Badge variant="secondary">{study.sector}</Badge>}
            {study.client && <Badge variant="dark">{study.client}</Badge>}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {study.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-300">{study.description}</p>

          {study.outcome && (
            <div className="mt-6 rounded-xl border border-green-800/30 bg-green-900/20 px-5 py-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-green-400">
                Key outcome
              </span>
              <p className="mt-1 text-sm text-green-200">{study.outcome}</p>
            </div>
          )}

          <p className="mt-4 text-xs text-slate-500">
            Note: all case studies are illustrative. Client details have been anonymised.
            Outcomes are representative and depend on engagement scope and client environment.
          </p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-white py-16">
        <Container size="narrow">
          <article className="prose prose-slate max-w-none lg:prose-lg">
            <MDXRemote source={study.content} />
          </article>

          <div className="mt-16 border-t border-slate-200 pt-8">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to case studies
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
