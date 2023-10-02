import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Statements from './pages/Statements'
import Results from './pages/Results'
import Links from './pages/Links'

const App = () => {
  /** Client-side routing setup that redirects to home if the url path isn't /test or /results */
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Statements />} />
        <Route path="/results" element={<Results />} />
        <Route path="/links" element={<Links />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App