import type { Content, Media } from 'newt-client-js'
import type { Category } from '@/types/category'
import type { Tag } from '@/types/tag'

export interface Article extends Content {
  _id: string
  title: string
  slug: string
  meta?: {
    title?: string
    description?: string
    ogImage?: Media
  }
  body: string
  coverImage: Media
  tags?: Tag[]
  categorys: Category[]
}

export interface Archive {
  year: number
  count: number
}
