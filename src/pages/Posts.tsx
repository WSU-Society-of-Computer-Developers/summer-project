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
          <h1 className="text-4xl font-bold text-gray-800">Posts</h1>
          {isLoading ? <Spinner /> : <BasicTable rows={data} />}
        </div>
      </div>
    </>
  )
}

export default Posts
