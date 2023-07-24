import React from 'react'
import {MDCTextField} from '@material/textfield'
import { Container, TextField } from '@mui/material'
import "./SignUp.css"

function SignUp() {
    return (
        <>
        <header>
            <h1 className="text-4xl font-bold">Sign Up to ByteBound WSU</h1>
            <h2>To register, please enter the following information</h2>
        </header>
        <Container className='info-container'>
            <TextField label="Email Address" variant="standard" color='secondary' />
            <TextField label="Username" variant="standard" />
            <TextField label="Password" variant="standard" />
        </Container>
        </>
    );
}

export default SignUp;