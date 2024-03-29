export type PostFrontMatter = {
  title: string
  date: string
  tags: string[]
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  layout?: string
  canonicalUrl?: string
  slug: string
  fileName: string
  repoUrl?: string
}
