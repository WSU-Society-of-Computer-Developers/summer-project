import * as React from 'react'
import { Modal as MuiModal, Box, useTheme } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: JSX.Element | JSX.Element[]
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const theme = useTheme()
  return (
    <div>
      <MuiModal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            [theme.breakpoints.down('sm')]: {
              maxHeight: '93vh',
              width: '100%'
            },
            [theme.breakpoints.up('md')]: {
              maxHeight: '93vh', // Set the maximum height for scrolling
              width: '85%'
            },
            bgcolor: '#1e1e1e',
            maxHeight: '100vh',
            width: '85%',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: 'auto' // Make the content scrollable
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 7,
              right: 7,
              fontSize: 8
            }}
          >
            <div onClick={onClose}>
              <CloseIcon
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    color: 'gray'
                  }
                }}
              />
            </div>
          </div>
          {children}
        </Box>
      </MuiModal>
    </div>
  )
}
