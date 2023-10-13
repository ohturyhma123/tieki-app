import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import logo from '../assets/helsinki-uni-logo.png'
import '../assets//Navbar.css'
import { AppBar, Typography } from '@mui/material'

const Navbar = () => {
  const [click, setClick] = useState(false)
  const handleClick = () => { setClick(!click) }
  const closeMobileMenu = () => { setClick(false) }

  return (
    <AppBar className="navbar" style={{ width: '100%', background: '#353132' }}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={logo} className="navbar-icon" alt="logo" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <CloseIcon /> : <MenuIcon />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink
              to="/links"
              className='nav-links'
              onClick={closeMobileMenu}
            >
              <Typography sx={{ color: 'white' }}  variant='body1'>Linkit</Typography>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/feedback"
              className='nav-links'
              onClick={closeMobileMenu}
            >
              <Typography sx={{ color: 'white' }}  variant='body1'>Palaute</Typography>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/haka-login"
              className='nav-links'
              onClick={closeMobileMenu}
            >
              <Typography sx={{ color: 'white' }}  variant='body1'>Admin</Typography>
            </NavLink>
          </li>
        </ul>
      </div>
    </AppBar>
  )
}

export default Navbar