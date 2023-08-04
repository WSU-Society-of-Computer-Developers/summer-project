import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

interface TableProps {
  rows: any[]
}

// TODO: make cells (keys) dynamic

export default function BasicTable({ rows }: TableProps) {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => {
                // go to specific post page
                navigate(`/posts/${row.id}`)
              }}
              className="cursor-pointer hover:bg-slate-700"
              sx={{
                '&:last-child td, &:last-child th': { border: 0 }
              }}
            >
              <TableCell component="th" scope="row">
                {row.expand.author?.name || row.expand.author?.email || ''}
              </TableCell>
              <TableCell>{row.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
