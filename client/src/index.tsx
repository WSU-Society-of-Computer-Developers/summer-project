import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'App'
import { BrowserRouter } from 'react-router-dom'
import { PocketProvider } from 'contexts/PocketContext'
import { ThemeProvider } from '@mui/material'
import { theme } from 'Theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmationProvider } from 'contexts/ConfirmContext'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <PocketProvider>
      <ThemeProvider theme={theme}>
        <ConfirmationProvider>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={7500}
            draggable
            pauseOnHover
            theme="dark"
          />
        </ConfirmationProvider>
      </ThemeProvider>
    </PocketProvider>
  </BrowserRouter>
)
