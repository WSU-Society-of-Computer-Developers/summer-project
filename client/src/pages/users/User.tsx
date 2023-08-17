import React from 'react'
import { usePocket } from 'contexts/PocketContext'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
function User() {
  const { user, api } = usePocket()
  const { userid } = useParams()
  // const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error its technically impossible for userid to be undefined because of how our routing is setup
  const { data, error, isLoading } = useSWR(userid, () => api.users.get(userid))
  if (error) return <div>Failed to load user.</div>
  return (
    <>
      <div data-testid="User">
        <div className="m-5">
          <h1 className="mb-5 text-4xl font-bold text-white">User</h1>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div>{data?.email}</div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default User
