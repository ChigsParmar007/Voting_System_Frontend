import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import HelpIcon from '@mui/icons-material/Help'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Menu, MenuItem } from '@mui/material'
import image from '../../image/default.png'
import { useNavigate } from 'react-router-dom'
import { signoutUser } from '../../store/userSlice'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function Header(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { firstName, lastName } = useSelector(state => state.user.user)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const { isLoggedin } = useSelector(state => state.user)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = (data) => {
        if (data === 'Logout') {
            dispatch(signoutUser())
            navigate('/')
        }
        if (data === 'Profile') {
            navigate('/profile')
        }
        setAnchorElUser(null)
    }

    return (
        <>
            <AppBar
                component='div'
                color='primary'
                position='static'
                elevation={5}
                sx={{ zIndex: 0 }}
            >
                <Toolbar>
                    <Grid container alignItems='center' spacing={1}>
                        <Grid item xs>
                            <Typography color='inherit' variant='h5' component='h1'>
                                Welcome {firstName} {lastName}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title='Help'>
                                <IconButton color='inherit'>
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title='Alerts • No alerts'>
                                <IconButton color='inherit'>
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            {/* <IconButton color='inherit' sx={{ p: 0.5 }}>
                                <Avatar src='/static/images/avatar/1.jpg' alt='My Avatar' />
                            </IconButton> */}
                            <Toolbar disableGutters>
                                {
                                    isLoggedin &&
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title='Open settings'>
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <Avatar alt='Image' src={image} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id='menu-appbar'
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={() => handleCloseUserMenu('')}
                                        >
                                            {
                                                settings.map((setting) => (
                                                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                                        <Typography textAlign='center'>{setting}</Typography>
                                                    </MenuItem>
                                                ))
                                            }
                                        </Menu>
                                    </Box>
                                }
                            </Toolbar>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
}

export default Header