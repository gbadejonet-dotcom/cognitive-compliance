import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentRoot = path.join(process.cwd(), 'content')

export type ContentType = 'insights' | 'case-studies'

export interface FrontMatter {
  title: string
  description: string
  date: string
  tags?: string[]
  author?: string
  draft?: boolean
  // Case study specific
  client?: string
  sector?: string
  outcome?: string
}

export interface ContentItem extends FrontMatter {
  slug: string
  readingTime: string
  content: string
}

export interface ContentSummary extends Omit<ContentItem, 'content'> {}

export function getAllSlugs(type: ContentType): string[] {
  const dir = path.join(contentRoot, type)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getContentBySlug(type: ContentType, slug: string): ContentItem {
  const filePath = path.join(contentRoot, type, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    ...(data as FrontMatter),
    readingTime: rt.text,
    content,
  }
}

export function getAllContent(type: ContentType): ContentSummary[] {
  const slugs = getAllSlugs(type)
  return slugs
    .map((slug) => {
      const { content, ...rest } = getContentBySlug(type, slug)
      return rest
    })
    .filter((item) => !item.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
