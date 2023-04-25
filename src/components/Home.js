import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import axios from 'axios'
import { Button, CardActions, CardContent, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

const Home = () => {
    const [result, setResult] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://127.0.0.1:5000/api/result/getall')
            const data = await response.data
            setResult(data)
            console.log(data)
        }

        fetchData()
    }, [])

    const onClickHandler = async (electionId) => {
        navigate(`/addvote/${electionId}`)
    }

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        result.map((item, index) => (
                            <Grid item xs={6} key={index}>
                                <Item>
                                    <CardContent>
                                        <Typography variant='h5' component='div'>
                                            {item.electionId.electionFor}
                                        </Typography>
                                        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                            {(new Date(item.electionId.electionDate).toJSON().slice(0, 10))}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                                            Total Votes: {item.totalVotes}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {item.electionId.descrption}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size='small' onClick={() => onClickHandler(item.electionId._id)}>Learn More</Button>
                                    </CardActions>
                                </Item>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </div>
    )
}

export default Home