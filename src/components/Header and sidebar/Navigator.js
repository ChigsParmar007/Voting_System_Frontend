import * as React from 'react'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import DnsRoundedIcon from '@mui/icons-material/DnsRounded'
import ContactPageIcon from '@mui/icons-material/ContactPage';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout'
import HowToVoteSharpIcon from '@mui/icons-material/HowToVoteSharp';
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import { useNavigate } from 'react-router-dom'
import { signoutUser } from '../../store/userSlice'
import { useDispatch } from 'react-redux'

const categories = [
    {
        id: 'Vote',
        children: [
            { id: 'Profile', icon: <AccountBoxSharpIcon /> },
            { id: 'Results', icon: <DnsRoundedIcon /> },
            { id: 'ContactUs', icon: <ContactPageIcon /> },
            { id: 'AboutUs', icon: <InfoIcon /> },
            { id: 'Logout', icon: <LogoutIcon /> }
        ]
    }
]

const item = {
    py: '5px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
}

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 3,
    px: 3,
}

const Navigator = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { ...other } = props

    const onClickHeaderHandler = (arg) => {
        if (arg === 'Profile') navigate('/profile')
        if (arg === 'Results') navigate('/result')
        if (arg === 'ContactUs') navigate('/contactus')
        if (arg === 'AboutUs') navigate('/aboutus')
        if (arg === 'Logout') {
            dispatch(signoutUser())
            navigate('/')
        }
    }

    const homeHandler = () => {
        navigate('/')
    }

    return (
        <Drawer variant='permanent' sx={{ bgcolor: '#101F33' }} {...other}>
            <List disablePadding >
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    Voting System
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }} onClick={homeHandler}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                {
                    categories.map(({ id, children }) => (
                        <Box key={id} sx={{ bgcolor: '#101F33' }}>
                            <ListItem sx={{ py: 2, px: 3 }}>
                                <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                            </ListItem>
                            {
                                children.map(({ id: childId, icon, active }) => (
                                    <ListItem disablePadding key={childId}>
                                        <ListItemButton selected={active} sx={item} onClick={() => onClickHeaderHandler(childId)}>
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText>{childId}</ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                            <Divider sx={{ mt: 2 }} />
                        </Box>
                    ))
                }
            </List>
        </Drawer>
    )
}

export default Navigator