import { CommentType } from './Comment'
import { LikeType } from './Like'
import { UserType } from './User'

export interface PostType {
  id: string
  author: string
  title: string
  content: string
  created: string | Date
  updated: string | Date
  expand: {
    ['comments(post)']?: CommentType[]
    ['likes(post)']?: LikeType[]
    author?: UserType
  }
}
