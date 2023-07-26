import React from 'react'
import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import { fetcher } from 'utils/api'
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

function Post() {
  const { postid } = useParams()
  const navigate = useNavigate()
  const { data: postData, error: postError } = useSWR(
    `/posts/${postid}`,
    fetcher
  )
  const { data: userData, error: userError } = useSWR(
    () => '/users/' + postData.userId,
    fetcher
  )
  const { data: commentsData, error: commentsError } = useSWR(
    `/posts/${postid}/comments`,
    fetcher
  )
  if (!postData || !userData || !commentsData)
    // wait until all data is loaded
    return (
      <Skeleton variant="rounded" animation="wave" width="100%">
        <div style={{ paddingTop: '15%' }} />
      </Skeleton>
    )
  if (postError || userError || commentsError)
    return <div>Failed to load post.</div>
  return (
    <>
      <BasicCard
        title={postData.title}
        caption={userData.name}
        body={postData.body}
      />
      <h2 className="mt-3 text-4xl font-bold text-white">Comments</h2>
      <List>
        {commentsData.map((comment: any) => (
          <ListItem
            onClick={() => {
              navigate(`/users/${comment.userId}`)
              // Not implemented yet (will have to do this on our end later)
            }}
            key={comment.id}
            className="cursor-pointer hover:bg-gray-800"
          >
            <ListItemAvatar>
              <Avatar
                alt={userData.name}
                variant="rounded"
                src={`https://api.dicebear.com/6.x/identicon/png?seed=${comment.email}`}
              />
            </ListItemAvatar>
            <ListItemText>{comment.body}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default Post
