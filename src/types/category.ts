import type { Content } from 'newt-client-js'

export interface Category extends Content {
  name: string
  slug: string
}

export interface CategoryWithCount extends Category {
  count: number
}
