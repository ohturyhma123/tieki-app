import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import statementsData from '../data/statementsData.json'
import getPositiveStatements from '../components/PositiveStatements'
import getNegativeStatements from '../components/NegativeStatements'
import selectOneStatementFromEachPositiveSet from '../components/SelectOnePositiveStatementFromEachCategory'
import selectOneStatementFromEachNegativeSet from '../components/SelectOneNegativeStatementFromEachCategory'
import Submit from '../components/ConfirmAlert'
import '../assets/Statement.css'
import { Paper, Typography, Button, LinearProgress, Box } from '@mui/material'

const Statements = () => {
  const { urlIndex } = useParams()

  const [selectedStatements, setSelectedStatements] = useState([])
  const [selectedStatementsCount, setSelectedStatementsCount] = useState(0)
  const [currentStatementSetIndex, setCurrentStatementSetIndex] = useState(0)
  const [visitedStatementSetIndices, setVisitedStatementSetIndices] = useState([])
  const [selectedStatementsCountHistory, setSelectedStatementsCountHistory] = useState([])
  const [selectedStatementsCountOnPage, setSelectedStatementsCountOnPage] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0
  })

  const navigate = useNavigate()

  const positiveSets = getPositiveStatements(statementsData)
  const negativeSets = getNegativeStatements(statementsData)

  /**
    This effect will run whenever the URL changes. This renders the correct statement set
    when the browser's back or forward button is clicked.
   */
  useEffect(() => {
    const newIndex = parseInt(urlIndex, 10)
    if (!isNaN(newIndex) && newIndex !== currentStatementSetIndex) {
      setCurrentStatementSetIndex(newIndex)
      setSelectedStatementsCount(selectedStatementsCountOnPage[newIndex])
    }
  }, [urlIndex, currentStatementSetIndex, selectedStatementsCountOnPage])

  /**
    Handles the event of clicking a statement.
    If statement is already selected, it deselects and counter is decremented.
    If statement is not selected and the count is less than 3, it selects the statement and increments count.
    @param {string} statementId - The id of statement being clicked.
  */
  const handleStatementClick = (statementId) => {
    if (selectedStatements.includes(statementId)) {
      // Statement is already selected, so unselect it and decrease the count
      setSelectedStatements(selectedStatements.filter((id) => id !== statementId))
      setSelectedStatementsCount((prevCount) => prevCount - 1)

      // Update the count on the page accordingly
      setSelectedStatementsCountOnPage((prevState) => ({
        ...prevState,
        [currentStatementSetIndex]: prevState[currentStatementSetIndex] - 1,
      }))
    } else {
      if (selectedStatementsCount < 3) {
        // Statement is not selected, so select it and increase the count
        setSelectedStatements((prevStatements) => [...prevStatements, statementId])
        setSelectedStatementsCount((prevCount) => {
          setSelectedStatementsCountOnPage((prevState) => ({
            ...prevState,
            [currentStatementSetIndex]: prevState[currentStatementSetIndex] + 1,
          }))
          return prevCount + 1
        })
      }
    }
  }

  const handleStatementKeyDown = (e, statementId) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      handleStatementClick(statementId)
    }
  }

  /**
    Handles advancing to the next statement set or navigating to the results page.
    If at the last statement set, it navigates to the results page with the data and state of selected statements.
    Before navigating to results page, an alert appears to confirm.
    Otherwise, moves to the next set and resets selected statements count.
  */
  const handleNextStatementSet = () => {
    if (currentStatementSetIndex < statementsData.length - 1) {
      setVisitedStatementSetIndices([...visitedStatementSetIndices, currentStatementSetIndex])
      setSelectedStatementsCountHistory([...selectedStatementsCountHistory, selectedStatementsCount])
      setCurrentStatementSetIndex(currentStatementSetIndex + 1)
      const countOnNextPage = selectedStatementsCountOnPage[currentStatementSetIndex+1]
      setSelectedStatementsCount(countOnNextPage)

      navigate(`/test/${currentStatementSetIndex + 1}`)
    } else {
      Submit({ navigate, selectedStatements, statementsData })
    }
  }

  /**
    Handles going back to the previous statement set.
  */
  const handlePreviousStatementSet = () => {
    if (urlIndex > 0) {
      const previousIndex = urlIndex - 1
      setCurrentStatementSetIndex(previousIndex)
      const previousCount = selectedStatementsCountHistory.pop()
      setSelectedStatementsCount(previousCount)
      navigate(-1)
    }
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

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress sx={{ height: 12, borderRadius: 1 }} color='success' variant="determinate" {...props} />
        </Box>
        <Box sx={{ width: 50 }}>
          <Typography variant="body2" color="text.secondary">
            {`${currentStatementSetIndex + 1} / ${statementsData.length}`}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Paper
      sx={{ mt: 5, mb: 10, p: 10, pb: 4, height: '75%', width: '80%' }}
      variant='elevation'
    >
      <Typography variant='h5'>Väittämäsetti {currentStatementSetIndex + 1}/{statementsData.length}</Typography>
      <Typography sx={{ py: 2, fontStyle: 'italic' }}>Voit valita enintään kolme vaihtoehtoa.</Typography>
      {/**
        Iterate through the array and create an element for each statement.
        Conditionally add the "selected" CSS class if the statement is in the "selectedStatements" array.
      */}
      {statements.map((s) => (
        <div
          key={s.id}
          className={`statement ${selectedStatements.includes(s.id) ? 'selected' : ''}`}
          onClick={() => handleStatementClick(s.id)}
          onKeyDown={e => handleStatementKeyDown(e, s.id)}
          tabIndex={0}>
          <Typography sx={{ fontSize: 14 }}>{s.statement}</Typography>
        </div>
      ))}
      {/** Using ternary conditional operators, show different button text when there are no statement sets left */}
      <p>
        {urlIndex > 0 && (
          <Button id='previous-btn' sx={{ mr: 1 }} variant="contained" onClick={handlePreviousStatementSet}>Edellinen</Button>
        )}
        {currentStatementSetIndex < statementsData.length - 1
          ? <Button id='next-btn' variant="contained" onClick={handleNextStatementSet}>Seuraava</Button>
          : <Button id='results-btn' variant="contained" onClick={handleNextStatementSet}>Tulokset</Button>
        }
        <LinearProgressWithLabel value={(currentStatementSetIndex + 1) / statementsData.length * 100 } />
      </p>
    </Paper>
  )
}

export default Statements
