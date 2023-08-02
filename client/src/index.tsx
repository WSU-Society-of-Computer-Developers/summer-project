import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'App'
import { BrowserRouter } from 'react-router-dom'
import { PocketProvider } from 'contexts/PocketContext'
import { ThemeProvider } from '@mui/material'
import { theme } from 'Theme'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <PocketProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PocketProvider>
  </BrowserRouter>
)
