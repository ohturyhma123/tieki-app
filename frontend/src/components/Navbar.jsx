import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/HomeOutlined'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const homeRoute = () => { navigate('/') }

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton
          size="medium"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit" onClick={homeRoute}>
          <HomeIcon
            sx={{ fontSize: '28px' }}
          />
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar