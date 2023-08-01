import { PostType } from './Post'
import { UserType } from './User'

export interface LikeType {
  id: string
  author: string
  post: string | Date
  created: string | Date
  updated: string | Date
  expand: Record<string, never> | { author?: UserType; post?: PostType }
}
