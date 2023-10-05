import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import unilogo from '../assets/helsinki-uni-logo.png'
import '../assets//Navbar.css'

const Navbar = () => {
  const [click, setClick] = useState(false)
  const handleClick = () => { setClick(!click) }
  const closeMobileMenu = () => { setClick(false) }

  return (
    <nav className="navbar" style={{ width: '100%' }}>
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={unilogo} className="navbar-icon" alt="unilogo" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <CloseIcon /> : <MenuIcon />}
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink
              to="/palaute"
              className='nav-links'
              onClick={closeMobileMenu}>
                Palaute
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin-login"
              className='nav-links'
              onClick={closeMobileMenu}>
                Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar