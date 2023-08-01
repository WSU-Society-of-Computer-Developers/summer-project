import { LikeType } from './Like'
import { UserType } from './User'

export interface CommentType {
  id: string
  author: string
  content: string
  created: string | Date
  updated: string | Date
  expand:
    | Record<string, never>
    | { author: UserType; 'likes(post)'?: LikeType[] }
}
