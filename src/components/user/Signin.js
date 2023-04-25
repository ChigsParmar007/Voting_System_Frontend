import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { signinUser } from '../../store/userSlice'
import { useDispatch } from 'react-redux'

const theme = createTheme()

const Signin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let errors = 0

    const validateInputs = () => {
        if (email.length === 0) {
            toast.error('Please enter your email')
            errors++
            return
        }
        if (password.length === 0) {
            toast.error('Please enter your password')
            errors++
            return
        }
        if (password.length < 8 || password.length > 20) {
            toast.error('Password must be between 8 and 20 characters')
            errors++
            return
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        validateInputs()

        if (errors > 0) {
            return
        }

        const user = {
            email,
            password
        }
        const response = await dispatch(signinUser(user))
        console.log(response)
        if (response.meta.requestStatus === 'fulfilled') {
            navigate('/')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='email'
                            label='Email'
                            id='email'
                            onChange={e => setEmail(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            id='password'
                            onChange={e => setPassword(e.target.value)}
                            type='password'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* <Link href='#' variant='body2'>
                                    Forgot password?
                                </Link> */}
                            </Grid>
                            <Grid item>
                                <Link to='/signup' variant='body2'>
                                    {'Don`t have an account? Sign Up'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Signin