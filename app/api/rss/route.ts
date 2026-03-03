import { Feed } from 'feed'
import { getAllContent } from '@/lib/mdx'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/utils'

export async function GET() {
  const posts = getAllContent('insights').catch(() => [])
  const items = await posts

  const feed = new Feed({
    title: `${SITE_NAME} — Insights`,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: 'en-GB',
    copyright: `All rights reserved ${new Date().getFullYear()}, ${SITE_NAME}`,
    updated: items.length > 0 ? new Date(items[0].date) : new Date(),
    feedLinks: {
      rss: `${SITE_URL}/api/rss`,
    },
    author: {
      name: SITE_NAME,
      link: SITE_URL,
    },
  })

  for (const post of items) {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/insights/${post.slug}`,
      link: `${SITE_URL}/insights/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      author: [{ name: post.author ?? SITE_NAME }],
      category: post.tags?.map((tag: string) => ({ name: tag })) ?? [],
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
