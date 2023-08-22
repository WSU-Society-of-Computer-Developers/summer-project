import { DataArrayRounded } from '@mui/icons-material'
import { Button, TextField, TextareaAutosize } from '@mui/material'
import BasicTable from 'components/BasicTable'
import Modal from 'components/Modal'
import Spinner from 'components/Spinner'
import { usePocket } from 'contexts/PocketContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from 'utils/api'
import { ClientResponseError } from 'pocketbase'
import { parseError } from 'utils'
import PostList from 'components/PostList'
import { PostType } from 'types/Post'

function Posts() {
  const navigate = useNavigate()
  const titleRef = React.useRef<HTMLInputElement>()
  const bodyRef = React.useRef<HTMLInputElement>()
  const { data, error, isLoading } = useSWR('/posts', fetcher)
  const { user, api } = usePocket()
  const [modal, setModal] = React.useState<boolean>(false)
  const handleCreatePostSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    // const formData = new FormData(e.target)
    ;(async () => {
      const title = titleRef?.current?.value
      const body = bodyRef?.current?.value
      if (!title || !body) {
        return alert("You can't leave the title or body empty")
      }
      try {
        const post = await api.posts.create(title, body)
        navigate('/posts/' + post!.id)
      } catch (error: any | ClientResponseError) {
        console.error(error)
        if (error instanceof ClientResponseError) {
          const { issues, message } = parseError(error)
          if (issues.length > 0) {
            alert(issues.join('\n'))
          } else {
            alert(message)
          }
        } else {
          alert('An unknown error occurred.')
        }
      }
      // TODO: handle responses from pb functions
    })()
  }
  if (error) return <div>Failed to load posts.</div>
  return (
    <>
      <div data-testid="Posts">
        <div className="m-5">
          <h1 className="mb-5 text-4xl font-bold text-white">Posts</h1>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {data?.body.map((post: PostType) => (
                <PostList key={post.id} post={post} />
              ))}

              {user && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setModal(true)}
                    sx={{ width: '100%' }}
                  >
                    Create
                  </Button>
                  <Modal open={modal} onClose={() => setModal(false)}>
                    <>
                      <div className="m-5">
                        <h1 className="mb-5 text-2xl font-bold text-white">
                          Create Post
                        </h1>
                        <TextField
                          required
                          fullWidth
                          className="mb-5"
                          inputRef={titleRef}
                          label="Title"
                        />
                        <TextField
                          required
                          fullWidth
                          multiline
                          inputRef={bodyRef}
                          label="Body"
                        />
                        <Button
                          className="mr-3 mt-2"
                          variant="contained"
                          onClick={handleCreatePostSubmit}
                        >
                          Submit
                        </Button>
                        <Button className="mt-2" variant="outlined">
                          Clear
                        </Button>
                      </div>
                    </>
                  </Modal>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Posts
