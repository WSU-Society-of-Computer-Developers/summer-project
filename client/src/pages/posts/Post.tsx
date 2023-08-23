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
  Skeleton,
  TextareaAutosize
} from '@mui/material'
import BasicCard from 'components/PostContent'
import { usePocket } from 'contexts/PocketContext'
import { CommentType } from 'types/Comment'
import { PostType } from 'types/Post'
import useSWRMutation from 'swr/mutation'
import ProfilePic from 'components/ProfilePic'
import {
  DeleteForeverOutlined,
  Edit,
  SendSharp,
  Share,
  ThumbDownSharp,
  ThumbUpSharp
} from '@mui/icons-material'
import { LikeType } from 'types/Like'
import { useTheme } from '@mui/material'
import { toast } from 'react-toastify'

// TODO: do we want to use cache for specific pages here?

function Post() {
  const { postid } = useParams() as { postid: string }
  const theme = useTheme()
  const [likes, setLikes] = useState<LikeType[] | []>([])
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [isLiking, setIsLiking] = useState<boolean>(false)
  const { user, api } = usePocket()
  const replyField = React.useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  // this is how you would do it w/ strictly backend
  // NOTE: you would have to change data to data.body (bcz we're using the backend)
  // const { data, error, mutate } = useSWR(
  //   `/posts/${postid}?expand=author,comments(post).author,likes(post)`,
  //   fetcher
  // )

  //const random = React.useRef(Date.now()) // used to force refresh the data (im starting to regret using swr)
  const { data, error, mutate } = useSWR(postid, () =>
    api.posts.get(postid, {
      expand: 'author,comments(post).author,likes(post)'
    })
  )
  // const { trigger } = useSWRMutation()
  // https://dev.to/franciscomendes10866/how-to-use-pocketbase-database-with-react-2gg9
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
                      try {
                        await api.posts.unlike(
                          likes.find((like) => like.author === user.id)!.id // find our like record id
                        )
                        await mutate() // triggers a reload of new data
                        // TODO: find a better way to show updated like data
                        // await mutate(
                        //   () => ({
                        //     ...{
                        //       expand: {
                        //         'likes(post)': postData.expand['likes(post)']
                        //       }
                        //     },
                        //     ...postData
                        //   }), // this doesnt do anything?
                        //   {
                        //     revalidate: true,
                        //     populateCache: true,
                        //     rollbackOnError: true
                        //   }
                        // )
                      } catch (err: any) {
                        console.error(err)
                      }
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
                    style={{
                      pointerEvents: isLiking ? 'none' : 'auto',
                      cursor: isLiking ? 'not-allowed' : 'pointer'
                    }}
                    onClick={async () => {
                      setIsLiking(true)
                      await api.posts.like(postid) // TODO: add error handling
                      // setLikes((prev) => [
                      //   ...prev,
                      //   {
                      //     id: 'temp',
                      //     author: user?.id,
                      //     post: postid,
                      //     created: new Date(),
                      //     updated: new Date(),
                      //     expand: {
                      //       author: user,
                      //       post: postData
                      //     }
                      //   }
                      // ])
                      // wait for 2 seconds before refreshing with sleep
                      await new Promise((resolve) => setTimeout(resolve, 2000))
                      setIsLiking(false)
                      await mutate() // triggers a reload of new data
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
      <h2 className="mt-3 text-3xl font-bold text-white">Comments</h2>
      <List>
        {comments ? (
          comments.map((comment: CommentType) => (
            <ListItem
              key={comment.id}
              // className="cursor-pointer hover:bg-slate-700"
            >
              <ListItemAvatar
                onClick={() => {
                  navigate(`/users/${comment.author}`)
                }}
              >
                <ProfilePic user={comment.expand.author} />
              </ListItemAvatar>
              <ListItemText>
                <strong>
                  <span
                    onClick={() => {
                      navigate(`/users/${comment.author}`)
                    }}
                    className="cursor-pointer hover:underline"
                  >
                    {comment.expand.author.email}{' '}
                  </span>
                  {user && comment.expand.author.id == user!.id && (
                    <DeleteForeverOutlined
                      color="secondary"
                      className="cursor-pointer hover:text-red-400"
                      onClick={() => {
                        // DELETE COMMENT api
                      }}
                    />
                  )}
                </strong>
                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
              </ListItemText>
            </ListItem>
          ))
        ) : (
          <div>No comments yet!</div>
        )}
        {user && (
          <>
            <textarea
              id="message"
              ref={replyField}
              disabled={isReplying}
              rows={4}
              style={{ backgroundColor: theme.palette.background.paper }}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
            <Button
              startIcon={<SendSharp />}
              style={{ pointerEvents: isReplying ? 'none' : 'auto' }}
              onClick={async () => {
                try {
                  const comment = replyField.current?.value
                  if (!comment) {
                    throw new Error('Comment cannot be empty')
                  }
                  if (comment.length > 500) {
                    throw new Error('Comment cannot be longer than 500 chars')
                  }
                  if (comment.length < 5) {
                    throw new Error('Comment cannot be shorter than 5 chars')
                  }
                  // check if the same comment has already been said by the same person
                  const existingComment = comments.find(
                    (c) => c.content == comment && c.author == user?.id
                  )
                  if (existingComment) {
                    throw new Error('You have already said that!')
                  }
                  setIsReplying(true)
                  await toast.promise(api.posts.addComment(postid, comment), {
                    pending: 'Sending...',
                    success: 'Comment added',
                    error: {
                      render({ data }: any) {
                        return data.message || 'Failed to add comment'
                      }
                    }
                  })
                  // sleep for 1 seconds before refreshing
                  await new Promise((resolve) => setTimeout(resolve, 1000))
                  setIsReplying(false)
                  await mutate()
                } catch (err: any) {
                  console.error(err)
                  toast.error(err.message)
                  // TODO: handle errors (w toast)
                }
              }}
            >
              Reply
            </Button>
          </>
        )}
      </List>
    </>
  )
}

export default Post
