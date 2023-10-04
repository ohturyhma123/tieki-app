import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import statementsData from '../data/statementsData.json'
import getPositiveStatements from '../components/PositiveStatements'
import getNegativeStatements from '../components/NegativeStatements'
import selectOneStatementFromEachPositiveSet from '../components/SelectOnePositiveStatementFromEachCategory'
import selectOneStatementFromEachNegativeSet from '../components/SelectOneNegativeStatementFromEachCategory'
import '../assets/Statement.css'

const Statements = () => {
  const [selectedStatements, setSelectedStatements] = useState([])
  const [selectedStatementsCount, setSelectedStatementsCount] = useState(0)
  const [currentStatementSetIndex, setCurrentStatementSetIndex] = useState(0)

  const navigate = useNavigate()

  const positiveSets = getPositiveStatements(statementsData)
  const negativeSets = getNegativeStatements(statementsData)

  /**
    Handles the event of clicking a statement.
    If statement is already selected, it deselects and counter is decremented.
    If statement is not selected and the count is less than 3, it selects the statement and increments count.
    @param {string} statementId - The id of statement being clicked.
  */
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

  /**
    Handles advancing to the next statement set or navigating to the results page.
    If at the last statement set, it navigates to the results page with the data and state of selected statements.
    Otherwise, moves to the next set and resets selected statements count.
  */
  const handleNextStatementSet = () => {
    if (currentStatementSetIndex < statementsData.length - 1) {
      setCurrentStatementSetIndex(currentStatementSetIndex + 1)
      setSelectedStatementsCount(0)
    } else {
      navigate('/results', { state: { selectedStatements, statementsData }
      })}
  }

  let statements
  let setIndex

  /**
    Statement sets visible on the testpage are selected based on the set index.
  */
  if (currentStatementSetIndex % 2 === 0) {
    setIndex = currentStatementSetIndex / 2
    statements = selectOneStatementFromEachPositiveSet(positiveSets, setIndex)
  } else {
    setIndex = (currentStatementSetIndex - 1) / 2
    statements = selectOneStatementFromEachNegativeSet(negativeSets, setIndex)
  }

  return (
    <div>
      <h2>Väittämäsetti {currentStatementSetIndex + 1}/{statementsData.length}</h2>
      <p><i>Voit valita enintään kolme vaihtoehtoa.</i></p>
      {/**
        Iterate through the array and create an element for each statement.
        Conditionally add the "selected" CSS class if the statement is in the "selectedStatements" array.
      */}
      {statements.map((s) => (
        <div
          key={s.id}
          className={`statement ${selectedStatements.includes(s.id) ? 'selected' : ''}`}
          onClick={() => handleStatementClick(s.id)}>
          {s.statement}
        </div>
      ))}
      {/** Using ternary conditional operators, show different button text when there are no statement sets left */}
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
