import BasicTable from 'components/BasicTable'
import Spinner from 'components/Spinner'
import React from 'react'
import useSWR from 'swr'
import { fetcher } from 'utils/api'

function Posts() {
  const { data, error, isLoading } = useSWR('/posts', fetcher)
  if (error) return <div>Failed to load posts.</div>
  return (
    <>
      <div data-testid="Posts">
        <div className="m-5">
          <h1 className="mb-5 text-4xl font-bold text-white">Posts</h1>
          {isLoading ? <Spinner /> : <BasicTable rows={data?.body} />}
        </div>
      </div>
    </>
  )
}

export default Posts
