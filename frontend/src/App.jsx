import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Statements from './pages/Statements'
import Results from './pages/Results'
import Links from './pages/Links'
import Grid from '@mui/material/Grid'
import Navbar from './components/Navbar'

const App = () => {
  /**
    Client-side routing setup that redirects to home if the url path isn't /test, /links or /results
    Material UI components are used to improve the site's layout and navigation
  */
  return (
    <BrowserRouter>
      <Grid item className="navbar-container">
        <Navbar></Navbar>
      </Grid>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:urlIndex" element={<Statements />} />
        <Route path="/results" element={<Results />} />
        <Route path="/links" element={<Links />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App