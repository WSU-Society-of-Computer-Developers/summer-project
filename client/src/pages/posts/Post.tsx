import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetcher } from 'utils/api'
import useSWR from 'swr'
import {
  Badge,
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
import { LikeType } from 'types/Like'

// TODO: do we want to use cache for specific pages here?

function Post() {
  const { postid } = useParams() as { postid: string }
  const [likes, setLikes] = useState<LikeType[] | []>([])
  const { user, api } = usePocket()
  const navigate = useNavigate()

  // this is how you would do it w/ strictly backend
  // NOTE: you would have to change data to data.body (bcz we're using the backend)
  // const { data, error } = useSWR('/posts/' + postid, fetcher)
  //const random = React.useRef(Date.now()) // used to force refresh the data (im starting to regret using swr)
  const { data, error, mutate } = useSWR(postid, () =>
    api.posts.get(postid, {
      expand: 'author,comments(post).author,likes(post)'
    })
  )
  useEffect(() => {
    if (data) {
      setLikes(
        // TODO: find a better way to show updated like data
        ((data as unknown as PostType).expand?.['likes(post)'] as LikeType[]) ||
          []
      )
    }
  }, [data])

  if (error) return <div>Failed to load post.</div>
  if (!data)
    // wait until all data is loaded
    return (
      <Skeleton variant="rounded" animation="wave" width="100%">
        <div style={{ paddingTop: '15%' }} />
      </Skeleton>
    )
  const postData = data as unknown as PostType
  const comments = postData.expand?.['comments(post)'] as CommentType[]
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
          {user && (
            <>
              <>
                {likes!.some((like) => like.author == user?.id) ? (
                  <Button
                    size="small"
                    onClick={async () => {
                      await api.posts.unlike(
                        likes.find((like) => like.author === user.id)!.id // find our like record id
                      )
                      mutate() // triggers a reload of new data
                      // TODO: find a better way to show updated like data
                    }}
                    startIcon={
                      <Badge badgeContent={likes.length} color="secondary">
                        <ThumbDownSharp />
                      </Badge>
                    }
                  >
                    Unlike
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={async () => {
                      await api.posts.like(postid) // TODO: add error handling
                      mutate() // triggers a reload of new data
                    }}
                    startIcon={
                      <Badge
                        badgeContent={likes.length}
                        // anchorOrigin={{
                        //   vertical: 'top',
                        //   horizontal: 'left'
                        // }}
                        color="secondary"
                      >
                        <ThumbUpSharp />
                      </Badge>
                    }
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
              </>
            </>
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
              className="cursor-pointer hover:bg-slate-700"
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
