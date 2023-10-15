import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import logo from '../assets/helsinki-uni-logo-white.png'
import '../assets//Navbar.css'
import { AppBar, Typography, styled } from '@mui/material'

const Navbar = () => {
  const [click, setClick] = useState(false)
  const handleClick = () => { setClick(!click) }
  const closeMobileMenu = () => { setClick(false) }

  const Title = styled(Typography)(({ theme }) => ({
    fontFamily: '"Lato", sans-serif',
    fontSize: '30px',
    color: '#fff',
    fontWeight: 'bold',
    margin: theme.spacing(2, 0, 0, 7),
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      margin: theme.spacing(2.3, 0, 0, -10.5)
    }
  }))

  return (
    <AppBar className="navbar" style={{ width: '100%', background: '#00011b' }}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={logo} className="navbar-icon" alt="logo" />
        </Link>
        <Title variant="h6">
          Tieteellisen kirjoittamisen itsearviointitesti
        </Title>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <CloseIcon /> : <MenuIcon />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink
              to="/links"
              className='nav-links'
              onClick={closeMobileMenu}>
                Hyödyllisiä linkkejä
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/feedback"
              className='nav-links'
              onClick={closeMobileMenu}>
                Palaute
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/haka-login"
              className='nav-links'
              onClick={closeMobileMenu}>
                Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </AppBar>
  )
}

export default Navbar