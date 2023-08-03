import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
}

interface Props {
  mdxSource: string
}

export const MDXSingleArticle = ({ mdxSource }: Props) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return (
    <div className="prose max-w-none dark:prose-dark">
      <MDXLayout components={MDXComponents} />
    </div>
  )
}
