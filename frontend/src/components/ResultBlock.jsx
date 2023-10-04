import { useState } from 'react'
import '../assets/Statement.css'
import '../assets/Link.css'

const ResultBlock = ({ result }) => {

  const [toggle, setToggle] = useState(false)
  const handleToggle = () => setToggle(!toggle)

  return(
    <>
      <h3>{result.category}</h3>
      <p onClick={handleToggle} className="statement">{toggle ? '> piilota analyysi' : '> nää analyysi'}</p>
      <div key={result.id} className={toggle ? 'statement' : ''}>
        {toggle
          ? result.textSegments.map((result,index) => <p key={index}>{result}</p>)
          : null
        }
        <ul>
          {result.listPoints && toggle
            ? result.listPoints.map((item, index) => <li key={index}>{item}</li>)
            : null
          }
        </ul>
        {result.links && toggle
          ? result.links.map((link) => {
            return(
              <>
                <p>{link.description}</p>
                <a className="link" href={link.link}>{link.link}</a>
              </>
            )
          })
          : null
        }
      </div>
    </>
  )
}

export default ResultBlock