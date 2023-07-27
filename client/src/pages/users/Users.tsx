import React from 'react'
import useSWR from 'swr'
import { fetcher } from 'utils/api'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import WorkIcon from '@mui/icons-material/Work'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import Spinner from 'components/Spinner'
import { UserType } from 'types/User'
import { getAvatarURL, getFileURL } from 'utils'
import { Link } from 'react-router-dom'

function Users() {
  // get list of users from our api using swr and fetcher
  const { data, error, isLoading } = useSWR('/users', fetcher)
  if (isLoading) return <Spinner />
  if (error) return <div>Failed to load users.</div>
  return (
    <div data-testid="Posts">
      <div className="m-5">
        <h1 className="mb-5 text-4xl font-bold text-white">Users</h1>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {data?.body.map((user: UserType) => (
            <Link to={`/users/${user.id}`} key={user.id}>
              <ListItem className="cursor-pointer hover:bg-slate-100">
                <ListItemAvatar>
                  <Avatar
                    alt={user.email}
                    variant="square"
                    src={getAvatarURL(user)}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ color: 'black' }}
                  primary={user.name || user.email}
                  secondary={
                    'Created ' + new Date(user.created).toLocaleDateString()
                  }
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    </div>
  )
}

export default Users
