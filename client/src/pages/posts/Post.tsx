import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetcher } from 'utils/api'
import useSWR from 'swr'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton
} from '@mui/material'
import BasicCard from 'components/BasicCard'
import { usePocket } from 'contexts/PocketContext'
import { CommentType } from 'types/Comment'
import { PostType } from 'types/Post'
import { getAvatarURL } from 'utils'
import ProfilePic from 'components/ProfilePic'

function Post() {
  const { postid } = useParams()
  const { pb } = usePocket()

  const navigate = useNavigate()
  const { data, error } = useSWR('/posts/' + postid, fetcher)

  if (error) return <div>Failed to load post.</div>
  if (!data)
    // wait until all data is loaded
    return (
      <Skeleton variant="rounded" animation="wave" width="100%">
        <div style={{ paddingTop: '15%' }} />
      </Skeleton>
    )
  const postData = data.body as unknown as PostType
  const comments = postData.expand?.['comments(post)']
  return (
    <>
      <BasicCard
        title={postData.title}
        // TODO: migrate to display fields instead of expansions
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        author={postData.expand.author}
        caption={
          postData.expand.author?.name || postData.expand.author?.email || ''
        }
        body={postData.content}
      />
      <h2 className="mt-3 text-4xl font-bold text-white">Comments</h2>
      <List>
        {comments ? (
          comments.map((comment: CommentType) => (
            <ListItem
              onClick={() => {
                navigate(`/users/${comment.author}`)
                // Not implemented yet (will have to do this on our end later)
              }}
              key={comment.id}
              className="cursor-pointer hover:bg-gray-800"
            >
              <ListItemAvatar>
                <ProfilePic user={comment.expand.author} />
              </ListItemAvatar>
              <ListItemText>
                <strong>{comment.expand.author.email}</strong>
                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
              </ListItemText>
            </ListItem>
          ))
        ) : (
          <div>No comments yet!</div>
        )}
      </List>
    </>
  )
}

export default Post
