// api wrapper (kind of)

import axios from 'axios'
import PocketBase, { BaseQueryParams } from 'pocketbase'
import { CommentType } from 'types/Comment'
import { LikeType } from 'types/Like'
import { PostType } from 'types/Post'
import { UserType } from 'types/User'

export const baseURL =
  (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api'

export const pbURL = import.meta.env.VITE_PB_URL || 'http://localhost:8090'

export const vagueFetcher = (...args: any) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-next-line
  fetch(...args).then((res) => res.json())

export const fetcher = (url: string) =>
  axios.get(baseURL + url).then((res) => res.data)

class pbAPI {
  protected pb: PocketBase
  constructor(pb: PocketBase) {
    this.pb = pb
  }
  // TODO: ove user auth actions here in base class
}

export class users extends pbAPI {
  constructor(pb: PocketBase) {
    super(pb)
  }
  /**
   *
   * @param id user id
   * @param query sort, filter, and expansion options
   * @returns Promise<UserType>
   * @example
   * ```ts
   * const user = await api.users.get('user_id')
   * ```
   */
  get(id: UserType['id'], query?: BaseQueryParams) {
    return this.pb.collection('users').getOne<UserType>(id, query)
  }
}

export class posts extends pbAPI {
  constructor(pb: PocketBase) {
    super(pb)
  }
  /**
   * Get a specific post
   * @param id Post record id
   * @param query sort, filter, and expansion options
   * @returns Promise<PostType>
   * @example ```ts
   * const post = await api.posts.get('123')
   * ```
   */
  get(id: PostType['id'], query?: BaseQueryParams) {
    return this.pb.collection('posts').getOne<PostType>(id, query)
  }
  /**
   * Create a new post
   * @param title Post title
   * @param content Post content (rich content supported)
   * @returns Promise<PostType>
   * @example
   * ```ts
   * const post = await api.posts.create('Hello World', 'This is my first post!')
   * ```
   */
  create(title: PostType['title'], content: PostType['content']) {
    const data = {
      author: this.pb?.authStore?.model?.id,
      title,
      content
    }
    return this.pb.collection('posts').create<PostType>(data)
  }
  /**
   * @param id Post id (should be taken from the backend)
   * @returns Promise<boolean>
   * @example
   * ```ts
   * await api.posts.delete('1dew3532ed')
   * ```
   */
  delete(id: PostType['id']) {
    return this.pb.collection('posts').delete(id)
  }
  /**
   *
   * @param id Post id (should be taken from the backend)
   * @param title Title of the post matching the id
   * @param content Content of the post matching the id
   * @returns Promise<Record>
   */
  edit(
    id: PostType['id'],
    title: PostType['title'],
    content: PostType['content']
  ) {
    const data = {
      title,
      content
    }
    return this.pb.collection('posts').update(id, data)
  }
  /**
   * Adds a comment to a specific post
   * @param postId Post record id
   * @param content Comment content (rich content supported)
   * @returns Promise<CommentType>
   */
  addComment(postId: PostType['id'], content: string) {
    return this.pb.collection('comments').create<CommentType>({
      author: this.pb?.authStore?.model?.id,
      post: postId,
      content
    })
  }
  /**
   * Deletes a comment
   * @param commentId comment record id
   */
  deleteComment(commentId: CommentType['id']) {
    return this.pb.collection('comments').delete(commentId)
  }
  /**
   * Edits a comment
   * @param commentId comment record id
   * @param content Comment content (rich content is supported)
   * @returns Promise<CommentType>
   */
  editComment(commentId: CommentType['id'], content: CommentType['content']) {
    return this.pb.collection('comments').update(commentId, { content })
  }
  /**
   * likes a specific post
   * @param postId Post record id
   * @returns Promise<LikeType>
   */
  like(postId: PostType['id']) {
    // TODO: like post -> count all likes for given postid
    return this.pb.collection('likes').create<LikeType>({
      author: this.pb?.authStore?.model?.id,
      post: postId
    })
  }
  /**
   * unlikes a specific post
   * @param likeId like record id
   * @returns Promise<boolean>
   */
  unlike(likeId: LikeType['id']) {
    return this.pb.collection('likes').delete(likeId)
  }
}
