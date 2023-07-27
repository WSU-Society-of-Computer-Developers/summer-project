import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { pbFetchers } from 'utils/api'
import useSWR from 'swr'
import {
  Avatar,
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

function Post() {
  const { postid } = useParams()
  const { pb } = usePocket()

  const navigate = useNavigate()
  const { data, error } = useSWR(
    {
      pb,
      collection: 'posts',
      id: postid,
      query: { expand: 'author,comments.author,likes' }
    },
    pbFetchers.getOne
  )

  if (!data)
    // wait until all data is loaded
    return (
      <Skeleton variant="rounded" animation="wave" width="100%">
        <div style={{ paddingTop: '15%' }} />
      </Skeleton>
    )
  if (error) return <div>Failed to load post.</div>
  const postData = data as unknown as PostType
  const comments = postData.expand?.comments
  return (
    <>
      <BasicCard
        title={postData.title}
        caption={
          postData.expand.author?.name || postData.expand.author?.email || ''
        }
        body={postData.content}
      />
      <h2 className="mt-3 text-4xl font-bold text-white">Comments</h2>
      <List>
        {comments &&
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
                <Avatar
                  alt={comment.expand.author.email}
                  variant="rounded"
                  src={`https://api.dicebear.com/6.x/identicon/png?seed=${comment.expand.author.email}`}
                />
              </ListItemAvatar>
              <ListItemText>
                <strong>{comment.expand.author.email}</strong>
                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
              </ListItemText>
            </ListItem>
          ))}
      </List>
    </>
  )
}

export default Post
