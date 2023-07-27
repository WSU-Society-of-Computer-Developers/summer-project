// api wrapper (kind of)

import axios from 'axios'
import PocketBase, { BaseQueryParams } from 'pocketbase'

export const baseURL =
  (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api'

export const vagueFetcher = (...args: any) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-next-line
  fetch(...args).then((res) => res.json())

export const fetcher = (url: string) =>
  axios.get(baseURL + url).then((res) => res.data)

export const pbFetchers = {
  /** @example
  {
      pb,
      collection: 'posts',
      id: postid,
      query: { expand: 'author,comments.author,likes' }
    },
    pbFetchers.getOne
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
}
