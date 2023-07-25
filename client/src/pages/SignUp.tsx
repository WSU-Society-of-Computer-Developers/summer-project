import React from 'react'
// import { MDCTextField } from '@material/textfield'
import { Button, Container, TextField } from '@mui/material'
import './SignUp.css'

interface SignUpData {
  email: string
  username: string
  password: string
  confirmPassword: string
}

function SignUp() {
  // type for form event
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault() // prevents the page from refreshing after submit
    // Get the form values using FormData
    const formData = new FormData(event?.target)

    const { username, email, password, confirmPassword } = Object.fromEntries(
      formData.entries()
    ) as unknown as SignUpData
    // validation logic:
    // TODO: move all this logic to a separate file (utils?)
    try {
      if (!username || !email || !password || !confirmPassword) {
        throw new Error('Please fill out all fields')
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters')
      }
      alert("You're signed up!")
      // TODO: sign up in pb
    } catch (error: unknown) {
      alert(error.message)
    }
  }
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">Sign Up to ByteBound WSU</h1>
        <h2>To register, please enter the following information</h2>
      </header>
      {/* TODO: refactor this to look more appealing https://mui.com/material-ui/react-text-field/ */}
      <Container className="info-container">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            name="email"
            variant="standard"
            color="secondary"
          />
          <TextField label="Username" name="username" variant="standard" />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="standard"
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="standard"
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  )
}

export default SignUp
