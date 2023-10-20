import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Paper, Typography, Button, LinearProgress, Box, Grid, styled } from '@mui/material'
import statementsData from '../data/statementsData.json'
import getPositiveStatements from '../functions/PositiveStatements'
import getNegativeStatements from '../functions/NegativeStatements'
import selectOneStatementFromEachPositiveSet from '../functions/SelectOnePositiveStatementFromEachCategory'
import selectOneStatementFromEachNegativeSet from '../functions/SelectOneNegativeStatementFromEachCategory'
import Submit from '../components/ConfirmAlert'
import monochromeBackground from '../assets/monochrome-background.jpg'
import '../assets/Statement.css'

const Statements = () => {
  const { urlIndex } = useParams()

  const [selectedStatements, setSelectedStatements] = useState([])
  const [selectedStatementsCount, setSelectedStatementsCount] = useState(0)
  const [currentStatementSetIndex, setCurrentStatementSetIndex] = useState(0)
  const [visitedStatementSetIndices, setVisitedStatementSetIndices] = useState([])
  const [selectedStatementsCountHistory, setSelectedStatementsCountHistory] = useState([])
  const [selectedStatementsCountOnPage, setSelectedStatementsCountOnPage] = useState(
    Array.from({ length: 12 }, () => 0)
  )

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
      if (selectedStatementsCountOnPage[currentStatementSetIndex] < 3) {
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

  /**
    Loads selectedStatements and selectedStatementsCount from sessionStorage on component mount
    when reloading the page.
  */
  useEffect(() => {
    const savedStatements = sessionStorage.getItem('selectedStatements')
    const savedCounts = sessionStorage.getItem('selectedStatementsCountOnPage')

    if (savedStatements) {
      setSelectedStatements(JSON.parse(savedStatements))
    }
    if (savedCounts) {
      setSelectedStatementsCountOnPage(JSON.parse(savedCounts))
    }
  }, [])

  /**
    Save selectedStatements and selectedStatementsCount to sessionStorage whenever they change
  */
  useEffect(() => {
    sessionStorage.setItem('selectedStatements', JSON.stringify(selectedStatements))
  }, [selectedStatements])

  useEffect(() => {
    sessionStorage.setItem('selectedStatementsCountOnPage', JSON.stringify(selectedStatementsCountOnPage))
  }, [selectedStatementsCountOnPage])

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

  const LinearProgressWithLabel = (props) => {
    return (
      <Box sx={{ pt: 2, pb: 3, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress sx={{ height: 15, borderRadius: 3, '& .MuiLinearProgress-bar': {
            backgroundColor: '#40c178',
          }, backgroundColor: 'lightgrey' }}
          variant="determinate" {...props} />
        </Box>
        <Box sx={{ width: 48 }}>
          <Typography variant="body2">
            {`${currentStatementSetIndex + 1} / ${statementsData.length}`}
          </Typography>
        </Box>
      </Box>
    )
  }

  const NextPrevButton = styled(Button)( () => ({
    backgroundColor: '#fff',
    color: '#00011b',
    borderColor: '#fff',
    fontWeight: '700',
    fontSize: '17px',
    fontFamily: '"Lato", sans-serif',
    cursor: 'pointer',
    padding: '0.5rem 1.3rem',
    borderRadius: '24px',
    textTransform: 'none',
    border: '2px solid',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#00011b',
      borderColor: '#00011b'
    }
  }))

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
      <img
        src={monochromeBackground}
        alt="monochromeBackground"
        style={{ maxWidth: '100%', position: 'fixed', top: 0, left: 0, right: 0,
          width: '100%', height: '100%', zIndex: -1 }}
      />
      <Paper
        sx={{ mt: 10.5, mb: 10, p: 6, pb: 3.5, height: '100%', width: '79%' , background: '#fdf3e9' }}
        variant='elevation'
      >
        <Typography sx={{ py: 2, ml: 0.7, mb: 1.3, mt: -2.5, fontStyle: 'italic', fontSize: '22px', fontFamily: '"Lato", sans-serif' }}>
          Valitse 0–3 väitettä, jotka kuvaavat sinua parhaiten tieteellisen tekstin kirjoittajana
        </Typography>
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
            <Typography sx={{ fontSize: 17, fontFamily: '"Lato", sans-serif' }}>{s.statement}</Typography>
          </div>
        ))}
        {/** Using ternary conditional operators, show different button text when there are no statement sets left */}
          <LinearProgressWithLabel value={(currentStatementSetIndex + 1) / statementsData.length * 100 } />
          <Box sx={{ display: 'flex' }}>
            {urlIndex > 0 && (
              <NextPrevButton id='previous-btn' sx={{ mr: 1 }} onClick={handlePreviousStatementSet}>Edellinen</NextPrevButton>
            )}
            <Box sx={{ marginLeft: 'auto' }}>
              {currentStatementSetIndex < statementsData.length - 1
                ? <NextPrevButton id='next-btn' onClick={handleNextStatementSet}>Seuraava</NextPrevButton>
                : <NextPrevButton id='results-btn' onClick={handleNextStatementSet}>Tulokset</NextPrevButton>
              }
            </Box>
          </Box>
      </Paper>
    </Grid>
  )
}

export default Statements