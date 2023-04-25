import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const loginData = JSON.parse(localStorage.getItem('loginData'))

const initialState = loginData ? loginData : {
    isLoggedin: false,
    isLoading: false,
    token: null,
    user: {},
    error: undefined
}

export const signupUser = createAsyncThunk('users/signupUser', async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/user/signup', user)

        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const signinUser = createAsyncThunk('users/signinUser', async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/user/signin', user)

        const LoggedInUserData = {
            isLoggedin: true,
            token: response.data.token,
            user: response.data.user,
            isLoading: false,
            error: null
        }
        localStorage.setItem('loginData', JSON.stringify(LoggedInUserData))

        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const signoutUser = createAsyncThunk('users/signoutUser', async (user, { rejectWithValue }) => {
    try {
        const userData = JSON.parse(localStorage.getItem('loginData'))
        const token = userData.token

        var config = {
            method: 'get',
            url: 'http://127.0.0.1:5000/api/user/signout',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }

        const response = await axios(config)
        localStorage.removeItem('loginData')
        return response.data
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(signupUser.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true
                }
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                toast.success('Register Success')
                return {
                    ...state,
                    isLoading: false
                }
            })
            .addCase(signupUser.rejected, (state, action) => {
                toast.error(action.payload.message)
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
            })
            .addCase(signinUser.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true
                }
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                toast.success('Login Success')
                return {
                    ...state,
                    isLoading: false,
                    isLoggedin: true,
                    token: action.payload.token,
                    user: action.payload.user,
                    error: null
                }
            })
            .addCase(signinUser.rejected, (state, action) => {
                // toast.error(action.payload?.message)
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
            })
            .addCase(signoutUser.pending, (state, action) => {
                return {
                    ...state,
                    isLoading: true
                }
            })
            .addCase(signoutUser.fulfilled, (state, action) => {
                toast.success('Logout Success')
                return {
                    ...state,
                    isLoggedin: false,
                    isLoading: false,
                    currentUser: null,
                    token: null,
                    user: null,
                    error: undefined
                }
            })
            .addCase(signoutUser.rejected, (state, action) => {
                toast.error(action.payload)
                return {
                    ...state,
                    isLoggedin: false,
                    isLoading: false,
                    currentUser: null,
                    token: null,
                    user: null,
                    error: action.payload
                }
            })
    }
})

export const userActions = userSlice.actions

export default userSlice.reducer