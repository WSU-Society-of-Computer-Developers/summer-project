import React from 'react'
import PocketBase from 'pocketbase'
import { usePocket } from 'contexts/PocketContext'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { Card, Typography, Button, Skeleton, Modal, TextField, Box } from '@mui/material'
import { Link } from 'react-router-dom'

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
  const nameRef = React.useRef<HTMLInputElement>()

  const handleUpdateInfoSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    (async () => {
      const name = nameRef?.current?.value;
      if(!name || !userid) {
        return alert("Either the name, or user id is invalid")
      }
      try {
        await api.users.edit(userid, name)
      } catch(Error: any) {
        console.error(error)
      } finally {
        window.location.reload()
      }
    })()
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
            <>
              <h1 className="mb-5 text-4xl font-bold text-white">
                {data?.username}&apos;s Page
              </h1>
              <h2 className="mb-2 text-2xl font-bold text-white">
                Personal Information
              </h2>
              <Card sx={{
                marginLeft: {xs: '0', sm: '25%'},
                width: {xs: '100%', sm: '50%'},
              }}>
                {data?.name !== '' ? (
                  <Typography>
                    <strong>Name:</strong> {data?.name}
                  </Typography>
                ) : ( <></> )}
                <Typography>
                  <strong>Email:</strong> {data?.email}
                </Typography>
                {user?.id == data?.id ? (
                  <Button
                    onClick={() => setModal(true)}
                  >
                    Edit Info
                  </Button>
                ) : ( <></> )}
              </Card>
              <Modal open={modal} onClose={() => setModal(false)}>
                <Box className="m-5" sx={{
                  padding: 2,
                }}>
                  <h1 className="mb-5 text-2xl font-bold text-white">
                    Edit Info
                  </h1>
                  <TextField
                    fullWidth
                    multiline
                    label="Name"
                    inputRef={nameRef}
                    defaultValue={data?.name}
                  />
                  <Button
                    onClick={handleUpdateInfoSubmit}
                    className="mr-3 mt-2"
                  >
                    Submit
                  </Button>
                </Box>
              </Modal>

              <h2 className="mt-4 mb-2 text-2xl font-bold text-white">Posts</h2>
              {postsLoading ? (
                <div></div>
              ) : (
                <>
                  {posts?.items?.map((post: any) => (
                    <Link to={`/posts/${post.id}`} key={post.id}><Card sx={{
                      marginBottom: 1,
                      marginLeft: {xs: '0', sm: '25%'},
                      width: {xs: '100%', sm: '50%'},
                      '&:hover': {
                        backgroundColor: '#334155'
                      }
                    }}>
                      <Typography variant='h5'>
                        <strong>{post.title}</strong>
                      </Typography>
                      <Typography variant='subtitle1'>
                        <strong>Created:</strong> <em>{post.created}</em>
                      </Typography>
                    </Card></Link>
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
