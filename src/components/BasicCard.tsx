// https://mui.com/material-ui/react-card/
import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Share } from '@mui/icons-material'

interface BasicCardProps {
  title: string
  caption: string
  body: string
  children?: JSX.Element | JSX.Element[]
}

export default function BasicCard({
  title,
  caption,
  body,
  children
}: BasicCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {caption}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
      <CardActions>
        {children}
        <Button
          onClick={() => {
            navigator.share({ url: window.location.href }) // THIS WILL ONLY WORK ON HTTPS
          }}
          size="small"
        >
          <Share /> Share
        </Button>
      </CardActions>
    </Card>
  )
}
