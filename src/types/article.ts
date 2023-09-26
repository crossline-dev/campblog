import type { Content, Media } from 'newt-client-js'
import type { Category } from '@/types/category'
import type { Tag } from '@/types/tag'

interface AffiliateLinkData {
  name: string
  amazon?: string
  rakuten?: string
  yahoo?: string
  image: Media | null
}

interface LinkCardData {
  url: string
}
export interface Article extends Content {
  _id: string
  title: string
  slug: string
  meta?: {
    title?: string
    description?: string
    ogImage?: Media
  }
  body: [
    {
      type: string
      data: string | AffiliateLinkData | LinkCardData
    },
  ]
  coverImage: Media
  tags?: Tag[]
  categorys: Category[]
}

export interface Archive {
  year: number
  count: number
}
