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
  const isMobile = window.innerWidth <= 768

  const Title = styled(Typography)(({ theme }) => ({
    fontFamily: '"Lato", sans-serif',
    fontSize: '30px',
    color: '#fff',
    display: 'flex',
    fontWeight: 'bold',
    lineHeight: '1.5',
    margin: theme.spacing(2.1, 0, 0, 3),
    padding: theme.spacing(0, 1, 0, 0),
    [theme.breakpoints.down('1150')]: {
      fontSize: '24.5px',
      margin: theme.spacing(0.5, 23, 0, -2)
    },
    [theme.breakpoints.down('962')]: {
      fontSize: '24.5px',
      margin: theme.spacing(2.5, 4, 0, -3)
    },
    [theme.breakpoints.down('632')]: {
      fontSize: '22px',
      margin: theme.spacing(0.8, 9, 0, -2)
    },
    [theme.breakpoints.down('460')]: {
      fontSize: '14.5px',
      margin: theme.spacing(2.3, 6, 0, -2)
    },
    [theme.breakpoints.down('350')]: {
      fontSize: '14px',
      margin: theme.spacing(1.1, 7, 0, -2)
    }
  }))

  return (
    <AppBar className="navbar" style={{ width: '100%', background: '#00011b' }}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={() => {
          closeMobileMenu()
        }}>
          <img src={logo} className="navbar-icon" alt="logo" />
        </Link>
        {!isMobile ? (
          <NavLink to="/" style={{ textDecoration: 'none' }} onClick={() => {
            closeMobileMenu()
          }}>
            <Title variant="h6">
              Tieteellisen kirjoittamisen itsearviointitesti
            </Title>
          </NavLink>
        ) : (
          <Title variant="h6">
            Tieteellisen kirjoittamisen itsearviointitesti
          </Title>
        )}
        <div className="menu-icon" onClick={handleClick}>
          {click ? <CloseIcon /> : <MenuIcon />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink
              to="/links"
              className='nav-links'
              onClick={closeMobileMenu}>
                Linkit
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className='nav-links'
              onClick={closeMobileMenu}>
                Tekijät
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/login"
              className='nav-links'
              onClick={closeMobileMenu}>
                Ylläpito
            </NavLink>
          </li>
        </ul>
      </div>
    </AppBar>
  )
}

export default Navbar