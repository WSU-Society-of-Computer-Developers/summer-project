// https://mui.com/material-ui/react-card/
import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Edit, Share, ThumbUpSharp } from '@mui/icons-material'
import { usePocket } from 'contexts/PocketContext'
import { UserType } from 'types/User'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import ProfilePic from './ProfilePic'

interface BasicCardProps {
  title: string
  caption: string
  body: string
  author: UserType
  children?: JSX.Element | JSX.Element[]
}

export default function BasicCard({
  title,
  caption,
  body,
  author,
  children
}: BasicCardProps) {
  const { user } = usePocket()
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid direction="row" alignItems="center" container>
          <Grid item sx={{ marginRight: 1 }} xs="auto">
            <ProfilePic user={author} />
          </Grid>
          <Grid item xs="auto">
            <Typography variant="h5" component="div">
              <span>{title}</span>
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              className="hover:underline"
              gutterBottom
            >
              <Link to={`/user/${author.id}`}>{caption}</Link>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </Typography>
      </CardContent>
      <CardActions>{children}</CardActions>
    </Card>
  )
}
