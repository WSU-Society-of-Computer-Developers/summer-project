import { Avatar, Skeleton } from '@mui/material'
import React from 'react'
import { UserType } from 'types/User'
import { CommentType } from 'types/Comment'
import { getAvatarURL } from 'utils'
import { Admin, Record } from 'pocketbase'

interface ProfilePicProps {
  size?: number
  user:
    | UserType
    | { avatar: string; collectionId: string; id: string; email: string }
    | Record
    | Admin
}

function ProfilePic({ user, size }: ProfilePicProps) {
  const [loading, setLoading] = React.useState(true)
  return (
    <>
      {loading && (
        <Skeleton
          variant="rounded"
          animation="wave"
          width={size || 40}
          height={size || 40}
        />
      )}
      <Avatar
        alt={user.email}
        onLoad={() => setLoading(false)}
        variant="rounded"
        src={getAvatarURL(user)}
        sx={{
          display: loading ? 'none' : 'block',
          width: size || 40,
          height: size || 40
        }}
      />
    </>
  )
}

export default ProfilePic
