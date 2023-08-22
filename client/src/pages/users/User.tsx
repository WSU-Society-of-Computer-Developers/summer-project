import React from 'react'
import PocketBase from 'pocketbase'
import { usePocket } from 'contexts/PocketContext'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { Card, Typography, Button } from '@mui/material'
import Spinner from 'components/Spinner'

function User() {
  // PocketBase functionality
  const { user, api, pb } = usePocket()
  const { userid } = useParams()
  // const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error its technically impossible for userid to be undefined because of how our routing is setup
  const { data, error, isLoading } = useSWR(userid, () => api.users.get(userid))
  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading
  } = useSWR(userid + '/posts', () =>
    pb.collection('posts').getList(1, 30, { filter: `author = '${userid}'` })
  )
  if (error) return <div>Failed to load user.</div>
  return (
    <>
      <div data-testid="User">
        <div className="m-5 text-center">
          {isLoading ? (
            <Spinner />
          ) : (
            // ADD Skeleton  here instead of spinner
            /* Public User Info */
            <>
              <h1 className="mb-5 text-4xl font-bold text-white">
                {data?.username}&apos;s Page
              </h1>
              <h2 className="mb-2 text-2xl font-bold text-white">
                Personal Information
              </h2>
              <Card>
                <Typography>
                  <strong>Email:</strong> {data?.email}
                </Typography>
                {/* TODO: add bio?
                <Typography><strong>Bio:</strong></Typography>*/}
                {/* TODO: add edit functionality */}
                {user?.id == data?.id ? (
                  <Button
                    onClick={() => {
                      const selection = prompt(
                        'Enter the field you would like to change (email only for now)'
                      )
                    }}
                  >
                    Edit Info
                  </Button>
                ) : (
                  <p></p>
                )}
              </Card>

              <h2 className="mt-4 mb-2 text-2xl font-bold text-white">Posts</h2>
              {postsLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {posts?.items?.map((post: any) => (
                    <Card key={post.id}>
                      <Typography>
                        <strong>Title:</strong> {post.title}
                      </Typography>
                      <Typography>
                        <strong>Body:</strong> {post.body}
                      </Typography>
                      <Typography>
                        <strong>Author:</strong> {post.author}
                      </Typography>
                      <Typography>
                        <strong>Created:</strong> {post.created}
                      </Typography>
                      <Typography>
                        <strong>Updated:</strong> {post.updated}
                      </Typography>
                    </Card>
                  ))}
                  {/* Polish output */}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default User
