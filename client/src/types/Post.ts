import { CommentType } from './Comment'
import { UserType } from './User'

export interface PostType {
  id: string
  author: string
  title: string
  content: string
  created: string | Date
  updated: string | Date
  expand: {
    comments?: CommentType[]
    author?: UserType
  }
}
