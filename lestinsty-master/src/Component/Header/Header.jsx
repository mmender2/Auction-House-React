import * as React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import logo from '../../assets/logoJim.svg'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { NavLink, useNavigate } from 'react-router-dom'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'
import { useDispatch, useSelector } from 'react-redux'
import './header.css'
import { signOut } from 'firebase/auth'
import { auth } from '../../Config/FirebaseConfig'
import { logoutUser } from '../../globalState/authSlice'

function HideOnScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const drawerWidth = 280
const navItems = ['Home', 'About', 'Contact']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function DrawerAppBar(props) {
  const dispatch = useDispatch()
  let [userInfo, setUserInfo] = React.useState({})
  let userData = useSelector((state) => {
    return state.authReducer
  })

  React.useEffect(() => {
    setUserInfo(userData.user)
  }, [userData.user])
  // console.log(userData)

  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          display: { xs: 'block', sm: 'block' },
          width: { xs: '200px', sm: '250px', margin: '10px auto' },
          padding: '5px 0px',
        }}
      >
        <NavLink to="/">
          <img style={{ width: '100%', height: '100%' }} src={logo} alt="" />
        </NavLink>
      </Typography>
      <Divider />
      <div className="mobViewNavLinks">
        <NavLink
          className={({ isActive }) =>
            !isActive ? '  headLink' : 'headLink activeLink'
          }
          to={'/'}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            !isActive ? '  headLink' : 'headLink activeLink'
          }
          to={'/products'}
        >
          Products
        </NavLink>
        {userData.user?.name ? (
          <NavLink
            className={({ isActive }) =>
              !isActive ? '  headLink' : 'headLink activeLink'
            }
            to={'/user'}
          >
            Profile
          </NavLink>
        ) : null}
      </div>
    </Box>
  )

  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // navigate working
  let navigate = useNavigate()
  const handleNavigate = (event) => {
    navigate(event)
  }

  // logout user
  const handleLogout = () => {
    signOut(auth)
      .then((res) => {
        dispatch(logoutUser())
        handleNavigate('/')
      })
      .catch((err) => {
        console.log('logout error')
      })
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <HideOnScroll {...props}>
        <AppBar
          component="nav"
          sx={{
            position: 'fixed',
            background: 'white',
            boxShadow: 'none',
            borderBottom: '1px solid rgb(238, 235, 235)',
          }}
        >
          <Toolbar
            sx={{
              maxWidth: 1300,
              margin: 'auto',
              width: '100%',
              height: 90,
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              color="error"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: 'none', xs: 'flex' },
                justifyContent: 'flex-start',
                width: 'fit-content',
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                // flexGrow: 0,
                display: { xs: 'none', sm: 'flex' },
                width: 'fit-content',
                justifyContent: 'flex-start',
              }}
            >
              <NavLink
                className={({ isActive }) =>
                  !isActive ? '  headLink' : 'headLink activeLink'
                }
                to={'/'}
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  !isActive ? '  headLink' : 'headLink activeLink'
                }
                to={'/products'}
              >
                Products
              </NavLink>
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: { xs: 'block', sm: 'block' },
                width: { xs: '140px', sm: '250px' },
                // height: '100%',
                padding: '5px 0px',
              }}
            >
              <NavLink to="/">
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={logo}
                  alt=""
                />
              </NavLink>
            </Typography>
            {!userData.isAuthenticated ? (
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: 'flex', sm: 'flex' },
                  width: { xs: 'fit-content', sm: 'fit-content' },
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="text"
                  color="error"
                  sx={{
                    textTransform: 'capitalize',
                    display: { xs: 'none', sm: 'block' },
                    fontWeight: '700',
                  }}
                  onClick={() => handleNavigate('/signup')}
                >
                  Create an account
                </Button>
                <Drawer />
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginLeft: '10px', fontWeight: '700' }}
                  onClick={() => handleNavigate('/login')}
                >
                  Login
                </Button>
              </Box>
            ) : (
              // {/* setting  */}

              <Box
                sx={{
                  flexGrow: 0,
                  width: { xs: 'fit-content', sm: 'fit-content' },
                  justifyContent: { xs: 'flex-end' },
                  display: { xs: 'flex' },
                }}
              >
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      sx={{ color: 'white', background: 'var(--red)' }}
                      src={
                        userInfo?.photo
                          ? userInfo.photo
                          : 'https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png'
                      }
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu()
                      handleNavigate('/user')
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu()
                      handleLogout()
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* mob view drawer  */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default DrawerAppBar
