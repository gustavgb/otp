import React from 'react'
import { AccountCircle, Add, Edit, MoreVert } from '@mui/icons-material'
import {
  AppBar,
  ButtonBase,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material'
import { signOut } from '@utils/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'

const routeNames = {
  '/new': 'Add account',
  '/edit': 'Edit accounts',
  '/trash': 'Trashed accounts',
  '/export': 'Export data'
}

interface AppBarProps {
  loggedIn?: boolean
  vaultUnlocked?: boolean
  username?: string
}
export default function CustomAppBar({
  vaultUnlocked = false,
  loggedIn = false,
  username = ''
}: AppBarProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const routeName = routeNames[pathname] || ''

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    signOut()
    handleClose()
  }

  const menuNavigate = path => () => {
    navigate(path)
    handleClose()
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <ButtonBase
            onClick={() => navigate('/')}
            sx={{ display: { xs: routeName ? 'none' : 'block', md: 'inline' } }}
          >
            <Typography variant="h6" noWrap>
              One Time Passwords
            </Typography>
          </ButtonBase>
          <Typography variant="h6" component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
            {routeName && <>&nbsp;&rarr;&nbsp;</>}
          </Typography>
          <Typography variant="h6" component="span">
            {routeName}
          </Typography>
          <Grid item flexGrow={1} />
          {loggedIn && (
            <>
              {vaultUnlocked && (
                <>
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="add account"
                    onClick={() => navigate('/new')}
                    sx={{ display: { xs: 'none', md: 'block' } }}
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="edit accounts"
                    onClick={() => navigate('/edit')}
                    sx={{ display: { xs: 'none', md: 'block' } }}
                  >
                    <Edit />
                  </IconButton>
                </>
              )}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle sx={{ display: { xs: 'none', md: 'block' } }} />
                <MoreVert sx={{ display: { xs: 'block', md: 'none' } }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Box p={1}>
                  <Typography variant="body1" color="textSecondary">
                    Signed in as {username}
                  </Typography>
                </Box>
                <Divider />
                {vaultUnlocked && [
                  <MenuItem
                    key="home"
                    sx={{ justifyContent: 'center', display: { xs: 'flex', md: 'none' } }}
                    onClick={menuNavigate('/')}
                  >
                    Home
                  </MenuItem>,
                  <MenuItem
                    key="add"
                    sx={{ justifyContent: 'center', display: { xs: 'flex', md: 'none' } }}
                    onClick={menuNavigate('/new')}
                  >
                    Add account
                  </MenuItem>,
                  <MenuItem
                    key="edit"
                    sx={{ justifyContent: 'center', display: { xs: 'flex', md: 'none' } }}
                    onClick={menuNavigate('/edit')}
                  >
                    Edit accounts
                  </MenuItem>,
                  <MenuItem
                    key="trash"
                    sx={{ justifyContent: 'center' }}
                    onClick={menuNavigate('/trash')}
                  >
                    Trashed accounts
                  </MenuItem>,
                  <MenuItem
                    key="export"
                    sx={{ justifyContent: 'center' }}
                    onClick={menuNavigate('/export')}
                  >
                    Export data
                  </MenuItem>
                ]}
                <MenuItem sx={{ justifyContent: 'center' }} onClick={handleSignOut}>
                  Sign out
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
