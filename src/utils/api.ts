// api wrapper (kind of)

import axios from 'axios'

export const baseURL = 'https://jsonplaceholder.typicode.com'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const vagueFetcher = (...args: any) => fetch(...args).then((res) => res.json())

export const fetcher = (url: string) =>
  axios.get(baseURL + url).then((res) => res.data)
