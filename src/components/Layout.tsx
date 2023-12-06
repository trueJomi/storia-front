import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import { logoPng, logoWhitePng } from '../context/images.context'
import { MdMenu, MdLogout } from 'react-icons/md'
import { type LayoutNav } from '../models/utils/Layout.model'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../services/AuthService'

const drawerWidth = 220

interface Props {
  routes: LayoutNav[]
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children, routes }) => {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <img src={logoWhitePng} alt="logo"
        onClick={() => {
          navigate('/')
          window.scrollTo(0, 0)
        }}
        className="cursor-pointer w-20 mx-auto my-3" />
      <Divider />
      <List>
        {routes.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'initial',
                  px: 2.5
                }}
                onClick={ () => {
                  navigate(item.path)
                  setMobileOpen(false)
                  window.scrollTo(0, 0)
                } }
              >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                  color: 'white'
                }}
                className='!text-white' >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
            <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'initial',
                  px: 2.5
                }}
                onClick={ () => { void logOut() } }
              >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                  color: 'white'
                }}
                className='!text-white' >
                  <MdLogout/>
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesion" />
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        color="inherit"
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MdMenu />
          </IconButton>
          <img src={logoPng} alt="logo" onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className="cursor-pointer w-16  md:hidden" />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          PaperProps={{ sx: { backgroundColor: '#03394f', color: 'white' } }}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          PaperProps={{ sx: { backgroundColor: '#03394f', color: 'white' } }}
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Layout
