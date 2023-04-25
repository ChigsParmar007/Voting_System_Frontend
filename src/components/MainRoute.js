import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import { useSelector } from 'react-redux'
import Aboutus from './Aboutus'
import Contactus from './Contactus'
import Profile from './user/Profile'
import Result from './Voting/Result'
import AddVote from './Voting/AddVote'

const MainRoute = () => {
    const { token } = useSelector(state => state.user)

    return (
        <>
            {!token &&
                <Routes>
                    <Route path='/' element={<Signin />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes >}

            {
                token &&
                <Routes>
                    <Route element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/result' element={<Result />} />
                        <Route path='/addvote/:electionId' element={<AddVote />} />
                        <Route path='/aboutus' element={<Aboutus />} />
                        <Route path='/contactus' element={<Contactus />} />
                    </Route>
                </Routes >
            }


        </>
    )
}

export default MainRoute