// api wrapper (kind of)

import axios from 'axios'

export const baseURL = 'https://jsonplaceholder.typicode.com'

export const fetcher = (url: string) =>
  axios.get(baseURL + url).then((res) => res.data)
