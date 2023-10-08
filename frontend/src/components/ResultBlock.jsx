import { useState } from 'react'
import '../assets/Statement.css'
import { Link, Typography } from '@mui/material'

const ResultBlock = ({ result }) => {

  const [toggle, setToggle] = useState(false)
  const handleToggle = () => setToggle(!toggle)
  const handleToggleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      handleToggle()
    }
  }

  return(
    <>
      <Typography>{result.category}</Typography>
      <p onClick={handleToggle} onKeyDown={handleToggleKeyDown} tabIndex={0} className="statement analysis">
        <Typography>{toggle ? '> Piilota analyysi' : '> Näytä analyysi'}</Typography>
      </p>
      <section key={result.id} className={toggle ? 'statement' : ''}>
        {toggle
          ? result.textSegments.map((result, index) => <Typography variant='body2' key={index}>{result}</Typography>)
          : null
        }
        <ul>
          {result.listPoints && toggle
            ? result.listPoints.map((item, index) => <li key={index}>{item}</li>)
            : null
          }
        </ul>
        {result.links && toggle
          ? result.links.map((link, index) => {
            return(
              <div key={index}>
                <Typography variant='body2'>{link.description}</Typography>
                <Link sx={{ wordWrap: 'break-word' }} variant="body2" href={link.link}>{link.link}</Link>
              </div>
            )
          })
          : null
        }
      </section>
    </>
  )
}

export default ResultBlock