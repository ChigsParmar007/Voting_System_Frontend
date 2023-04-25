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
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import CategoryDropdown from '../UI/CategoryDropdown'
import { useDispatch } from 'react-redux'
import { signupUser } from '../../store/userSlice'

const theme = createTheme()

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDOB] = useState(new Date().toJSON().slice(0, 10))
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [category, setCategory] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [pinCode, setPinCode] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [voterIdCard, setVoterIdCard] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const setCategoryHandler = (category) => {
        setCategory(category)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {
            firstName,
            lastName,
            gender,
            dob,
            age,
            phone,
            email,
            category,
            address,
            state,
            city,
            pinCode,
            aadharCard,
            voterIdCard,
            password,
            passwordConfirm
        }
        console.log(data)
        const response = await dispatch(signupUser(data))
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
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign up
                    </Typography>
                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='given-name'
                                    name='firstName'
                                    required
                                    fullWidth
                                    id='firstName'
                                    label='First Name'
                                    autoFocus
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id='lastName'
                                    label='Last Name'
                                    name='lastName'
                                    autoComplete='family-name'
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel id='demo-controlled-radio-buttons-group'>Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                    name='row-radio-buttons-group'
                                    onChange={e => setGender(e.target.value)}
                                >
                                    <FormControlLabel value='Male' control={<Radio />} label='Male' />
                                    <FormControlLabel value='Female' control={<Radio />} label='Female' />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label='Date of Birth'
                                    id='dob'
                                    name='dob'
                                    type='date'
                                    onChange={e => setDOB(e.target.value)}
                                    value={dob}
                                    focused={false}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id='age'
                                    label='Age'
                                    name='age'
                                    type='number'
                                    onChange={e => setAge(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name='phone'
                                    label='Phone Number'
                                    type='number'
                                    id='phone'
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <CategoryDropdown categoryData={setCategoryHandler} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='address'
                                    label='Address'
                                    name='address'
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='state'
                                    label='State'
                                    name='state'
                                    onChange={e => setState(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='city'
                                    label='City'
                                    name='city'
                                    onChange={e => setCity(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='pinCode'
                                    label='Pin Code'
                                    name='pinCode'
                                    type='number'
                                    onChange={e => setPinCode(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='aadharcard'
                                    label='Aadhar Card'
                                    name='aadharcard'
                                    onChange={e => setAadharCard(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='voteridcard'
                                    label='Voter Id Card Number'
                                    name='voteridcard'
                                    onChange={e => setVoterIdCard(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name='passwordConfirm'
                                    label='Password Confirm'
                                    type='password'
                                    id='passwordConfirm'
                                    autoComplete='new-password'
                                    onChange={e => setPasswordConfirm(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link to='/' variant='body2'>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Signup