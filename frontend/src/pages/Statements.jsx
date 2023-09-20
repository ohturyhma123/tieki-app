import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import statementsData from '../data/statementsData.json'
import HomeButton from '../components/Button'
import '../assets/Statement.css'

const Statements = () => {
  const [selectedStatements, setSelectedStatements] = useState([])
  const [selectedStatementsCount, setSelectedStatementsCount] = useState(0)
  const [currentStatementSetIndex, setCurrentStatementSetIndex] = useState(0)

  const navigate = useNavigate()
  const homeRoute = () => { navigate('/') }

  const handleStatementClick = (statementId) => {
    if (selectedStatements.includes(statementId)) {
      setSelectedStatements(selectedStatements.filter((id) => id !== statementId))
      setSelectedStatementsCount(selectedStatementsCount - 1)
    } else {
      if (selectedStatementsCount < 3) {
        setSelectedStatements([...selectedStatements, statementId])
        setSelectedStatementsCount(selectedStatementsCount + 1)
    }}
  }

  const handleNextStatementSet = () => {
    if (currentStatementSetIndex < statementsData.length - 1) {
      setCurrentStatementSetIndex(currentStatementSetIndex + 1)
      setSelectedStatementsCount(0)
    } else {
      navigate('/results', { state: { selectedStatements, statementsData }
    })}
  }

  const getCurrentStatementSet = () => {
    return statementsData[currentStatementSetIndex].statements
  }

  const statements = getCurrentStatementSet()

  return (
    <div>
      <HomeButton onClick={homeRoute} />
      <h2>Väittämäsetti {currentStatementSetIndex + 1}/{statementsData.length}</h2>
      <p><i>Voit valita enintään kolme vaihtoehtoa.</i></p>
      {statements.map((s) => (
        <div
          key={s.id}
          className={`statement ${selectedStatements.includes(s.id) ? 'selected' : ''}`}
          onClick={() => handleStatementClick(s.id)}>
          {s.statement}
        </div>
      ))}
      <p>
        {currentStatementSetIndex < statementsData.length - 1
        ? <button onClick={handleNextStatementSet}>Seuraava</button>
        : <button onClick={handleNextStatementSet}>Tulokset</button>
        }
      </p>
    </div>
  )
}

export default Statements
