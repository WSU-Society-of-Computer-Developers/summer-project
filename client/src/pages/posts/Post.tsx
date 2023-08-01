import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetcher } from 'utils/api'
import useSWR from 'swr'
import {
  Button,
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
import { Edit, Share, ThumbDownSharp, ThumbUpSharp } from '@mui/icons-material'

// TODO: do we want to use cache for specific pages here?

function Post() {
  const { postid } = useParams() as { postid: string }
  const [isLiked, setLiked] = useState(false)
  const { user, api } = usePocket()

  const navigate = useNavigate()

  // this is how you would do it w/ strictly backend
  // NOTE: you would have to change data to data.body (bcz we're using the backend)
  // const { data, error } = useSWR('/posts/' + postid, fetcher)
  const { data, error } = useSWR({}, () =>
    api.posts.get(postid, {
      expand: 'author,comments(post).author,likes(post)'
    })
  )
  if (error) return <div>Failed to load post.</div>
  if (!data)
    // wait until all data is loaded
    return (
      <Skeleton variant="rounded" animation="wave" width="100%">
        <div style={{ paddingTop: '15%' }} />
      </Skeleton>
    )
  const postData = data as unknown as PostType
  const comments = postData.expand?.['comments(post)']
  const likes = postData.expand?.['likes(post)']
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
      >
        <>
          {user &&
          likes?.some(({ author }) => author == user?.id) &&
          isLiked ? ( // TODO: fix this logic
            <Button
              size="small"
              onClick={async () => {
                await api.posts.unlike(postid)
                setLiked(false)
              }}
              startIcon={<ThumbDownSharp />}
            >
              Unlike
            </Button>
          ) : (
            <Button
              size="small"
              onClick={async () => {
                await api.posts.like(postid) // TODO: add error handling
                setLiked(true)
              }}
              startIcon={<ThumbUpSharp />}
            >
              Like
            </Button>
          )}
          {user?.id == postData.author && (
            <Button size="small">
              <Edit />
              &nbsp;Edit
            </Button>
          )}
          <Button
            onClick={() => {
              navigator.share({ url: window.location.href }) // THIS WILL ONLY WORK ON HTTPS
            }}
            size="small"
          >
            <Share />
            &nbsp;Share
          </Button>
        </>
      </BasicCard>
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
