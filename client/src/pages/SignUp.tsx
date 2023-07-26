import React from 'react'
// import { MDCTextField } from '@material/textfield'
import { Button, Container, TextField } from '@mui/material'
import { usePocket } from '../contexts/PocketContext'

interface SignUpData {
  email: string
  username: string
  password: string
  confirmPassword: string
}

function SignUp() {
  const { register } = usePocket()
  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
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
      await register(email, password) // TODO: remove username from register
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
  return (
    <>
      <header>
        <h1 className="mb-7 text-4xl font-bold">Sign Up to ByteBound WSU</h1>
        <h2>To register, please enter the following information</h2>
      </header>
      {/* TODO: refactor this to look more appealing https://mui.com/material-ui/react-text-field/ */}
      <Container maxWidth="sm" className="info-container secondary">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            name="email"
            variant="standard"
            color="secondary"
          /><br />
          <TextField label="Username" name="username" variant="standard" /> <br />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="standard"
          /><br />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="standard"
          /><br />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </>
  )
}

export default SignUp
