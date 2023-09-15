import type { AppMeta, GetContentsQuery } from 'newt-client-js'
import type { Article } from '@/types/article'
import { createClient } from 'newt-client-js'
import { cache } from 'react'

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + '',
  token: process.env.NEWT_CDN_API_TOKEN + '',
  apiType: process.env.NEWT_API_TYPE as 'cdn' | 'api',
})

export const getApp = cache(async (): Promise<AppMeta> => {
  const app = await client.getApp({
    appUid: process.env.NEWT_APP_UID + '',
  })

  return app
})

export const getArticles = cache(
  async (
    query?: GetContentsQuery
  ): Promise<{ articles: Article[]; total: number }> => {
    const { items: articles, total } = await client.getContents<Article>({
      appUid: process.env.NEWT_APP_UID + '',
      modelUid: process.env.NEWT_ARTICLE_MODEL_UID + '',
      query: {
        depth: 2,
        ...query,
      },
    })

    return {
      articles,
      total,
    }
  }
)

export const getArticle = cache(
  async (slug: string): Promise<Article | null> => {
    if (!slug) return null

    const article = await client.getFirstContent<Article>({
      appUid: process.env.NEWT_APP_UID + '',
      modelUid: process.env.NEWT_ARTICLE_MODEL_UID + '',
      query: {
        depth: 2,
        slug,
      },
    })

    return article
  }
)

export const getArticleBySlug = cache(async (slug: string) => {
  const article = await client.getFirstContent<Article>({
    appUid: process.env.NEWT_APP_UID + '',
    modelUid: process.env.NEWT_ARTICLE_MODEL_UID + '',
    query: {
      slug,
      select: ['_id', 'title', 'slug', 'body', 'coverImage', 'tags'],
    },
  })

  return article
})
