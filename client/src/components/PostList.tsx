import React from 'react'
import { PostType } from 'types/Post'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import ProfilePic from './ProfilePic'
import { useNavigate } from 'react-router-dom'
import { CommentSharp, ThumbUpSharp } from '@mui/icons-material'

interface PostListProps {
  post: PostType
}

function PostList({
  post: {
    title,
    id,
    expand: { author, 'likes(post)': likes, 'comments(post)': comments }
  }
}: PostListProps) {
  const navigate = useNavigate()
  return (
    <List
      onClick={() => {
        // go to specific post page
        navigate(`/posts/${id}`)
      }}
      className="cursor-pointer hover:bg-slate-700"
      sx={{ width: '100%', bgcolor: 'background.paper' }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <ProfilePic
            // @ts-expect-error user expansion happens regardless
            user={author}
          />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {author?.name || author?.email}
              </Typography>
              {likes && (
                <span>
                  {` • `}{' '}
                  <ThumbUpSharp sx={{ fontSize: 14, marginTop: -0.5 }} />{' '}
                  {`${likes?.length}`}
                </span>
              )}
              {comments && (
                <span>
                  {` • `}{' '}
                  <CommentSharp sx={{ fontSize: 14, marginTop: -0.25 }} />{' '}
                  {`${comments?.length}`}
                </span>
              )}
            </React.Fragment>
          }
        />
      </ListItem>
      {/* <Divider variant="inset" component="li" /> */}
    </List>
  )
}

export default PostList
