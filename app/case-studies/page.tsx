import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/shared/Container'
import { getAllContent } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Case Studies',
  description:
    'Illustrative case studies showing how Cognitive Compliance has supported KYC remediation, ownership mapping, and AI governance implementations.',
  path: '/case-studies',
})

export default async function CaseStudiesPage() {
  const studies = await getAllContent('case-studies').catch(() => [])

  return (
    <>
      {/* Header */}
      <section className="bg-slate-900 pb-20 pt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="dark" className="mb-4">Case studies</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              What good looks like in practice
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Illustrative case studies drawn from financial crime compliance engagements. Client
              details anonymised; sector and challenge type are representative.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              All outcomes are illustrative. Actual results depend on client environment,
              data quality, and programme scope.
            </p>
          </div>
        </Container>
      </section>

      {/* Studies */}
      <section className="bg-white py-16">
        <Container>
          {studies.length === 0 ? (
            <p className="text-center text-slate-500">No case studies published yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {studies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-200"
                >
                  <div className="flex flex-wrap gap-2">
                    {study.sector && (
                      <Badge variant="secondary">{study.sector}</Badge>
                    )}
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {study.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-4">
                    {study.description}
                  </p>
                  {study.outcome && (
                    <div className="mt-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
                      <span className="text-xs font-semibold text-green-700">Key outcome: </span>
                      <span className="text-xs text-green-800">{study.outcome}</span>
                    </div>
                  )}
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-blue-700">
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
