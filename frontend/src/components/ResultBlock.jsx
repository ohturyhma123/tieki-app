import { useState } from "react"
import '../assets/Statement.css'

const ResultBlock = ({result}) => {

    const [toggle, setToggle] = useState(false)
    const handleToggle = () => setToggle(!toggle)

    return(
        <>
            <h3>{result.category}</h3>
            <p onClick={handleToggle} className="statement">{toggle ? '> piilota tulokset' : '> nää tulokset'}</p>
            <div key={result.id}>
                {toggle
                  ? result.textSegments.map((result) => <p className="selected" key={result.id}>{result}</p>)
                  : null
                }
            </div>
        </>
    )
}

export default ResultBlock