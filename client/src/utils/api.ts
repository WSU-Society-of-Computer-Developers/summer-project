// api wrapper (kind of)

import axios from 'axios'
import PocketBase, { BaseQueryParams } from 'pocketbase'
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
  constructor(protected pb: PocketBase) {
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
}
export const pbAPI_old = {
  /** @example
  {
      pb,
      collection: 'posts',
      id: postid,
      query: { expand: 'author,comments.author,likes' }
    },
    pbAPI.getOne
  */
  getOne: ({
    pb,
    collection,
    id,
    query
  }: {
    pb: PocketBase
    collection: string
    id: string
    query?: BaseQueryParams
  }) => pb.collection(collection).getOne(id, query)
  // create: ({
  //   pb,
}
