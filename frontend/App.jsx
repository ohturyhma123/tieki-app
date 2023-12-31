import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Statements from './pages/Statements'
import Results from './pages/Results'
import Links from './pages/Links'
import About from './pages/About'
import Edit from './pages/Edit'
import EditLinks from './components/EditLinks'
import Login from './pages/Login'
import PDFView from './pages/PDFView'
import Grid from '@mui/material/Grid'
import Navbar from './components/Navbar'
import EditStatements from './components/EditStatements'
import EditResults from './components/EditResults'

const App = () => {
  /**
    Client-side routing setup that redirects to home if the url path is undefined
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
        <Route path="/pdfview" element={<PDFView />} />
        <Route path="/links" element={<Links />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/edit/links" element={<EditLinks />} />
        <Route path="/edit/statements" element={<EditStatements />} />
        <Route path="/edit/results" element={<EditResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App