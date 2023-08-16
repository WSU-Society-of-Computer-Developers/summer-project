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

function Posts() {
  const navigate = useNavigate()
  const { data, error, isLoading } = useSWR('/posts', fetcher)
  const { user, api } = usePocket()
  const [modal, setModal] = React.useState<boolean>(false)
  const handleCreatePostSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const formData = new FormData(e.target)
    ;(async () => {
      const title: string = document.getElementById("post-title").value;
      const body: string = document.getElementById("post-body").value;
      if (!title || !body) {
        return alert("You can't leave the title or body empty")
      }
      try {
        const post = await api.posts.create(title, body)
        navigate('/posts/' + post!.id)
      } catch (error: any | ClientResponseError) {
        const { issues, message } = parseError(error)
        if (issues.length > 0) {
          alert(issues.join('\n'))
        } else {
          alert(message)
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
              <BasicTable rows={data?.body} />
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
                        <form onSubmit={handleCreatePostSubmit}>
                          <div className="mb-5">
                            <TextField
                              required
                              fullWidth
                              className='mb-5'
                              id="post-title"
                              label="Title"
                            />
                            <TextField 
                              required
                              fullWidth
                              multiline
                              id="post-body"
                              label="Body"
                            />
                            <Button type="submit">Submit</Button>
                            <Button>Clear</Button>
                          </div>
                        </form>
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
