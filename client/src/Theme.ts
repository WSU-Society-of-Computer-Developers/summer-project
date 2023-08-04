// https://zenoo.github.io/mui-theme-creator/
import { ThemeOptions, createTheme } from '@mui/material/styles'

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#19a993'
    },
    secondary: {
      main: '#da81b0'
    },
    text: {
      primary: '#f7fcd7'
    },
    background: {
      default: '#000000',
      paper: '#11221b'
    },
    error: {
      main: '#da81b0'
    },
    warning: {
      main: '#e1c547'
    },
    success: {
      main: '#7cac6c'
    }
  }
}

export const theme = createTheme(themeOptions)
