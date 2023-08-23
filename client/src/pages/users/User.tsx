import React from 'react'
import PocketBase from 'pocketbase'
import { usePocket } from 'contexts/PocketContext'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { Card, Typography, Button, Skeleton, Modal, TextField } from '@mui/material'
import { Margin } from '@mui/icons-material'

function User() {
  // PocketBase functionality
  const { user, api, pb } = usePocket()
  const { userid } = useParams()
  
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

  // Edit info functionality
  const [modal, setModal] = React.useState<boolean>(false)
  const emailRef = React.useRef<HTMLInputElement>()
  const usernameRef = React.useRef<HTMLInputElement>()

  const handleUpdateInfoSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    (async () => {
      const username = usernameRef?.current?.value;
      const email = emailRef?.current?.value;
      console.log("Button is firing")
      if(!username || !email || !userid) {
        return alert("Either the username, email, or user id is invalid")
      }
      try {
        //await api.users.edit(userid, username, email)
        
      } catch(Error: any) {
        console.error(error)
      } finally {
        console.log("Working!")
        setModal(false)
      }
    })
  }

  if (error) return <div>Failed to load user.</div>
  return (
    <>
      <div data-testid="User">
        <div className="m-5 text-center">
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton variant='rounded' height={100}/>
              <Skeleton sx={{
                marginTop: 3
              }} />
              <Skeleton variant='rounded' height={300}/>
            </>
          ) : (
            /* Public User Info */
            <>
              <h1 className="mb-5 text-4xl font-bold text-white">
                {data?.username}&apos;s Page
              </h1>
              <h2 className="mb-2 text-2xl font-bold text-white">
                Personal Information
              </h2>
              <Card sx={{
                marginLeft: '25%',
                width: '50%'
              }}>
                <Typography>
                  <strong>Email:</strong> {data?.email}
                </Typography>
                {/* TODO: add edit functionality */}
                {user?.id == data?.id ? (
                  <Button
                    onClick={() => setModal(true)}
                  >
                    Edit Info
                  </Button>
                ) : (
                  <></>
                )}
              </Card>
              <Modal open={modal} onClose={() => setModal(false)}>
                <div className="m-5">
                  <h1 className="mb-5 text-2xl font-bold text-white">
                    Edit Info
                  </h1>
                  <TextField
                    fullWidth
                    multiline
                    label="Username"
                    inputRef={usernameRef}
                    defaultValue={data?.username}
                  />
                  <TextField
                    fullWidth
                    className="mb-5"
                    label="Email"
                    inputRef={emailRef}
                    defaultValue={data?.email}
                  />
                  <Button
                    onClick={() => alert("this works tho...")}
                    className="mr-3 mt-2"
                  >
                    Submit
                  </Button>
                </div>
              </Modal>

              <h2 className="mt-4 mb-2 text-2xl font-bold text-white">Posts</h2>
              {postsLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {posts?.items?.map((post: any) => (
                    <Card key={post.id} sx={{
                      marginBottom: 1,
                      marginLeft: '25%',
                      width: '50%'
                    }}>
                      <Typography variant='h5'>
                        <strong>{post.title}</strong>
                      </Typography>
                      <Typography variant='subtitle1'>
                        <strong>Created:</strong> <em>{post.created}</em>
                      </Typography>
                    </Card>
                  ))}
                  {/* Polish output */}
                  {/* Add links on posts */}
                  {/* Edit email and username */}
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
