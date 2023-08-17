import React, { useState } from 'react'
// import { MDCTextField } from '@material/textfield'
import { Button, Container, TextField } from '@mui/material'
import { usePocket } from '../contexts/PocketContext'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

// TODO: Extract to a separate file when we settle on our color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#7cac6c'
    },
    secondary: {
      main: '#E1C547'
    }
  }
})

interface FormData {
  email: string
  confirmEmail?: string
  password: string
}

function SignUp() {
  const navigate = useNavigate();

  // Method for rendering log in/sign up info
  const [isSigningUp, setContentVisible] = useState(true)
  const handleToggleForm = () => {
    setContentVisible((prevVisible) => !prevVisible)
  }

  const { register } = usePocket()
  const handleSignup = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault() // prevents the page from refreshing after submit
    // Get the form values using FormData
    const formData = new FormData(event?.target)

    const { email, password, confirmEmail } = Object.fromEntries(
      formData.entries()
    ) as unknown as FormData
    // validation logic:
    // TODO: move all this logic to a separate file (utils?)
    try {
      if (!email || !password || !confirmEmail) {
        throw new Error('Please fill out all fields')
      }
      if (email !== confirmEmail) {
        throw new Error('Emails do not match')
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters')
      }
      await register(email, password)
      navigate("/posts");
      alert("You're signed up!") // TODO: toast notifications (react-toastify)
    } catch (error: any) {
      if (error.data instanceof Object) {
        // checks if its a pocketbase error
        const errors = Object.values(error.data.data) as unknown as Array<{
          code: string
          message: string
        }>
        alert(errors[0].message)
        return
      }
      alert(error.message)
    }
  }

  const { login } = usePocket()
  const handleLogin = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Get the form values using FormData
    const formData = new FormData(event?.target)

    const { email, password } = Object.fromEntries(
      formData.entries()
    ) as unknown as FormData

    try {
      await login(email, password) // Attempt a login
      navigate("/posts");
      alert("You're logged in!")
    } catch (error: any) {
      if (error.data instanceof Object) {
        // checks if its a pocketbase error
        const errors = Object.values(error.data.data) as unknown as Array<{
          code: string
          message: string
        }>
        alert(errors[0].message)
        return
      }
      alert(error.message)
    }
  }
  return (
    <div data-testid="Sign Up">
      <header>
        <h1 className="mb-7 text-4xl font-bold">Sign Up to ByteBound WSU</h1>
        <h2>To register, please enter the following information</h2>
      </header>
      {/* TODO: refactor this to look more appealing https://mui.com/material-ui/react-text-field/ */}
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs" className="info-container secondary p-2">
          {isSigningUp ? (
            <form onSubmit={handleSignup}>
              {' '}
              {/*Sign up content */}
              <TextField
                label="Email Address"
                name="email"
                variant="standard"
              />
              <br />
              <TextField
                label="Confirm Email"
                name="confirmEmail"
                variant="standard"
              />
              <br />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="standard"
              />
              <br />
              <div className="text-right">
                <Button onClick={handleToggleForm} variant="text">
                  Log in
                </Button>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              {' '}
              {/*Log in content */}
              <TextField
                label="Email Address"
                name="email"
                variant="standard"
              />
              <br />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="standard"
              />
              <br />
              <div className="text-right">
                <Button onClick={handleToggleForm} variant="text">
                  Sign up
                </Button>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default SignUp
