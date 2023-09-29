import type { Content, Media } from 'newt-client-js'

export interface Author extends Content {
  fullName: string
  enName: string
  slug: string
  biography: string
  profileImage?: Media
  twitter?: string
  instagram?: string
  youtube?: string
}
