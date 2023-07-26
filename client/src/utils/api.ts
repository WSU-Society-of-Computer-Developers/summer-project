// api wrapper (kind of)

import axios from 'axios'

export const baseURL =
  (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api'

export const vagueFetcher = (...args: any) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore-next-line
  fetch(...args).then((res) => res.json())

export const fetcher = (url: string) =>
  axios.get(baseURL + url).then((res) => res.data)
