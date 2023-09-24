import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import statementsData from '../data/statementsData.json'
import HomeButton from '../components/Button'
import '../assets/Statement.css'

const getNegativeStatements = () => {
  const negativeStatementSets = []

  for (const statementSetIndex in statementsData) {
    const statementSet = statementsData[statementSetIndex]
    if (statementSet.boolean === "False") {
      negativeStatementSets.push(statementSet)
    }
  }

  return negativeStatementSets
}

const getPositiveStatements = () => {
  const positiveStatementSets = []

  for (const statementSetIndex in statementsData) {
    const statementSet = statementsData[statementSetIndex]
    if (statementSet.boolean === "True") {
      positiveStatementSets.push(statementSet)
    }
  }

  return positiveStatementSets
}

const Statements = () => {
  const [selectedStatements, setSelectedStatements] = useState([])
  const [selectedStatementsCount, setSelectedStatementsCount] = useState(0)
  const [currentStatementSetIndex, setCurrentStatementSetIndex] = useState(0)

  const navigate = useNavigate()
  const homeRoute = () => { navigate('/') }

  const positiveSets = getPositiveStatements()
  const negativeSets = getNegativeStatements()

  const selectOneStatementFromEachPositiveSet = (index) => {
    const resultSet = []
    for (const setIndex in positiveSets) {
      const set = positiveSets[setIndex].statements
      const statement = set[index]
      resultSet.push(statement)
    }
    console.log(resultSet)
    return resultSet
  }

  const selectOneStatementFromEachNegativeSet = (index) => {
    const resultSet = []
    for (const setIndex in negativeSets) {
      const set = negativeSets[setIndex].statements
      const statement = set[index]
      resultSet.push(statement)
    }
    return resultSet
  }
  
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

  if (currentStatementSetIndex % 2 === 0) {
    setIndex = currentStatementSetIndex / 2
    statements = selectOneStatementFromEachPositiveSet(setIndex)
  } else {
    setIndex = (currentStatementSetIndex - 1) / 2
    statements = selectOneStatementFromEachNegativeSet(setIndex)
  }

  return (
    <div>
      <HomeButton onClick={homeRoute} />
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
