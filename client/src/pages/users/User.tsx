import React from 'react'
import PocketBase from 'pocketbase'
import { usePocket } from 'contexts/PocketContext'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { Card, Typography } from '@mui/material'

function User() {
  // PocketBase functionality
  const pb = new PocketBase('https://pb-temp1.zavaar.net');
  const { user, api } = usePocket()
  const { userid } = useParams()
  // const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error its technically impossible for userid to be undefined because of how our routing is setup
  const { data, error, isLoading } = useSWR({}, () => api.users.get(userid))

  if (error) return <div>Failed to load user.</div>
  return (
    <>
      <div data-testid="User">
        <div className="m-5 text-center">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            /* Public User Info */
            <>
              <h1 className="mb-5 text-4xl font-bold text-white">{data?.username}'s Page</h1>
              <h2 className='mb-2 text-2xl font-bold text-white'>Personal Information</h2>
              <Card>
                <Typography><strong>Email:</strong> {data?.email}</Typography>
                {/* TODO: add bio?
                <Typography><strong>Bio:</strong></Typography>*/}
                {/* TODO: add edit functionality */}
              </Card>

              <h2 className='mt-4 mb-2 text-2xl font-bold text-white'>Posts</h2>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default User
