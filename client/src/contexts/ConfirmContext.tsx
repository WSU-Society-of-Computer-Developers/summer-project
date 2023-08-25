import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

import { createContext, useContext, useState } from 'react'

interface ConfirmationContextType {
  confirm: (title: string, message: string) => Promise<boolean>
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(
  undefined
)

export const useConfirmation = (): ConfirmationContextType => {
  const context = useContext(ConfirmationContext)
  if (!context) {
    throw new Error(
      'useConfirmation must be used within a ConfirmationProvider'
    )
  }
  return context
}

interface ConfirmationProviderProps {
  children: React.ReactNode
}

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({
  children
}) => {
  const [promise, setPromise] = useState<
    | {
        resolve: (value: boolean) => void
        title: string
        message: string
      }
    | undefined
  >()

  const confirm = (title: string, message: string): Promise<boolean> =>
    new Promise((resolve) => {
      setPromise({ resolve, title, message })
    })

  const handleClose = () => {
    setPromise(undefined)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise !== undefined} fullWidth>
      <DialogTitle>{promise?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{promise?.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm}>Yes</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      <ConfirmationDialog />
    </ConfirmationContext.Provider>
  )
}
