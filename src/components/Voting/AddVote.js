import styled from '@emotion/styled'
import { Box, Button, CardActions, CardContent, Grid, Paper, Typography } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

const AddVote = () => {
    const { electionId } = useParams()
    const [item, setItem] = useState()
    const { token } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://127.0.0.1:5000/api/result/getone/${electionId}`)
            const data = await response.data
            console.log(data)
            setItem(data)
        }
        fetchData()
    }, [electionId])

    const onClickHandler = async (id) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:5000/api/result/addvote/${electionId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.data
            console.log(data)
            if (data.message === 'Vote added Successfully') {
                toast.success('Vote added Successfully')
            }
            else {
                toast.error('Something went wrong')
            }
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
        navigate('/')
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Item>
                            <CardContent>
                                <Typography variant='h5' component='div'>
                                    {item?.electionId.electionFor}
                                </Typography>
                                <br /><br />
                                <Typography variant='body2'>
                                    {item?.electionId?.descrption}
                                </Typography>
                                <br />
                                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                    {(new Date(item?.electionId?.electionDate)?.toJSON()?.slice(0, 10))}
                                </Typography>
                            </CardContent>
                        </Item>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ width: '100%', mt: 10 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        item?.candidates.map((data, index) => (
                            <Grid item xs={6} key={index}>
                                <Item>
                                    <CardContent>
                                        <Typography variant='h5' component='div'>
                                            {data.userId.firstName} {data.userId.lastName}
                                        </Typography>
                                        <Typography variant='body2' style={{ alignContent: 'right', alignItems: 'right' }}>
                                            Age: {data?.userId?.age}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size='small' onClick={() => onClickHandler(data._id)}>Give Vote</Button>
                                    </CardActions>
                                </Item>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </>
    )
}

export default AddVote