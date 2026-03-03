import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/shared/Container'
import { getAllContent } from '@/lib/mdx'
import { formatDate } from '@/lib/utils'
import { buildMetadata } from '@/lib/metadata'
import { Rss } from 'lucide-react'

export const metadata = buildMetadata({
  title: 'Insights',
  description:
    'Perspectives on KYC transformation, AI governance, EDD workflows, and financial crime compliance operating models.',
  path: '/insights',
})

const TAG_VARIANTS: Record<string, 'default' | 'secondary' | 'teal' | 'amber'> = {
  KYC: 'default',
  EDD: 'default',
  'AI governance': 'teal',
  sanctions: 'amber',
  'operating model': 'secondary',
}

export default async function InsightsPage() {
  const posts = await getAllContent('insights').catch(() => [])

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? [])))

  return (
    <>
      {/* Header */}
      <section className="bg-slate-900 pb-20 pt-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="dark" className="mb-4">Insights</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Perspectives on compliance transformation
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Practical thinking on KYC, AML, AI governance, and the operating models that make
              compliance programmes work.
            </p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <Container>
          {/* Tags + RSS */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={TAG_VARIANTS[tag] ?? 'secondary'}
                  className="cursor-default"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <a
              href="/api/rss"
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-700 transition-colors"
              aria-label="RSS feed"
            >
              <Rss className="h-4 w-4" aria-hidden="true" />
              RSS feed
            </a>
          </div>

          {/* Posts grid */}
          {posts.length === 0 ? (
            <p className="mt-16 text-center text-slate-500">No insights published yet.</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-200"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.map((tag: string) => (
                      <Badge key={tag} variant={TAG_VARIANTS[tag] ?? 'secondary'}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="mt-4 text-lg font-semibold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-slate-400 border-t border-slate-100 pt-4">
                    {post.author && <span className="font-medium text-slate-600">{post.author}</span>}
                    {post.author && <span aria-hidden="true">·</span>}
                    <span>{formatDate(post.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
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
