import React from 'react'
import { Button } from '@mui/material'
import { usePocket } from '../contexts/PocketContext'

function Home() {
  const { api } = usePocket()
  return (
    <div
      data-testid="Home"
      className="flex max-h-[20] flex-col items-center justify-center text-center sm:-m-12 md:-m-4 lg:-m-5 "
    >
      <h1 className="text-[4rem] font-bold text-white">ByteBound</h1>
      <p className="my-4 text-lg text-white">It&apos;s going to be awesome.</p>
      <a
        href="https://scd.cs.wayne.edu/#/project"
        target="_blank"
        rel="noreferrer"
        className="my-3 rounded-lg bg-blue-700 p-2 text-lg font-semibold text-white hover:bg-blue-900"
      >
        Get Started
      </a>
      <Button onClick={async () => {
        try {
          const postID: string = prompt('Enter the ID of the post you wish to delete.')

          await api.posts.delete(postID)
          alert('The post with ID ' + postID + ' was successfully deleted')
        } catch(error: any) {
          alert(error.message); {/* TODO: toastify */}
        }
      }}
      >
        TEST: Delete a post
      </Button>
      <Button onClick={async () => {
        try {
          const postID: string = prompt('Enter the ID of the post you wish to edit.')
          
          // Initially set the updated title/content to their original values
          let currentPostTitle = (await api.posts.get(postID)).title
          let currentPostContent = (await api.posts.get(postID)).content

          // Display the original title/content and let them update them if they want
          currentPostTitle = prompt('The current title is "' + currentPostTitle + '" Change the title to what you want it to be')
          currentPostContent = prompt('The current content is "' + currentPostContent + '" Change the content to what you want it to be')

          await api.posts.edit(postID, currentPostTitle, currentPostContent)
          alert('The post with ID ' + postID + ' was successfully edited')
        } catch(error: any) {
          alert(error.message); {/* TODO: toastify */}
        }
      }}
      >
        TEST: Edit a post
      </Button>
    </div>
  )
}

export default Home
