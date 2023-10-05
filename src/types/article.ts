import type { Content, Media } from 'newt-client-js'
import type { Author } from '@/types/author'
import type { Category } from '@/types/category'
import type { Tag } from '@/types/tag'

interface MarkDownData {
  type: 'MARKDOWN'
  data: string
}

interface ImageType {
  description?: string
  altText: string
  _id: string
  src: string
  fileType: string
  fileName: string
  fileSize: number
  width: number | `${number}` | undefined
  height: number | `${number}` | undefined
}
interface ImageData {
  type: 'IMAGE'
  data: ImageType
}

interface LinkCardData {
  type: 'linkcard'
  data: {
    url: string
  }
}

interface AffiliateItemData {
  _id: string
  name: string
  slug?: string
  amazon?: string
  rakuten?: string
  yahoo?: string
  other1?: string
  other2?: string
  image: Media
}

interface AffiliateData {
  type: 'affiliateLink'
  data: {
    affi: [AffiliateItemData]
  }
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
  body: [MarkDownData, ImageData, LinkCardData, AffiliateData]
  coverImage: {
    description?: string
    altText: string
    _id: string
    src: string
    fileType: string
    fileName: string
    fileSize: number
    width: number | `${number}` | undefined
    height: number | `${number}` | undefined
  }
  author: Author
  tags?: Tag[]
  categorys: Category[]
}

export interface Archive {
  year: number
  count: number
}
