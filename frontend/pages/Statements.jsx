import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Paper, Typography, LinearProgress, Box, Grid, Container, Switch, FormControlLabel } from '@mui/material'
import SwipeOutlinedIcon from '@mui/icons-material/SwipeOutlined'
import getPositiveStatements from '../functions/PositiveStatements'
import getNegativeStatements from '../functions/NegativeStatements'
import selectOneStatementFromEachPositiveSet from '../functions/SelectOnePositiveStatementFromEachCategory'
import selectOneStatementFromEachNegativeSet from '../functions/SelectOneNegativeStatementFromEachCategory'
import Submit from '../components/ConfirmAlert'
import monochromeBackground from '../assets/monochrome-background.jpg'
import NextPrevButton from '../components/NextPrevButton'
import GoToResultsButtonMobile from '../components/GoToResultsButtonMobile'
import useApi from '../hooks/useApi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCreative } from 'swiper/modules'
import '../assets/Statement.css'
import '../assets/Swiper.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-creative'
import LoadingScreen from '../components/LoadingScreen'
import LoadingError from '../components/LoadingError'

const Statements = () => {
  const [selectedStatements, setSelectedStatements] = useState([])
  const [selectedStatementsCount, setSelectedStatementsCount] = useState(0)
  const [currentStatementSetIndex, setCurrentStatementSetIndex] = useState(0)
  const [visitedStatementSetIndices, setVisitedStatementSetIndices] = useState([])
  const [selectedStatementsCountHistory, setSelectedStatementsCountHistory] = useState([])
  const [isSwiping, setIsSwiping] = useState(false)
  const [selectedStatementsCountOnPage, setSelectedStatementsCountOnPage] = useState(
    Array.from({ length: 12 }, () => 0)
  )
  const { data: statementsData, loading, error } = useApi('/api/statements')

  const navigate = useNavigate()
  const { urlIndex } = useParams()
  const positiveSets = getPositiveStatements(statementsData)
  const negativeSets = getNegativeStatements(statementsData)
  const isMobile = window.innerWidth <= 480
  const currentURL = location.pathname

  /**
    This effect will run whenever the URL changes. This renders the correct statement set
    when the browser's back or forward button is clicked.
   */
  useEffect(() => {
    const newIndex = parseInt(urlIndex, 10)
    const adjustedIndex = !isNaN(newIndex) ? newIndex - 1 : 0
    if (adjustedIndex !== currentStatementSetIndex) {
      setCurrentStatementSetIndex(adjustedIndex)
      setSelectedStatementsCount(selectedStatementsCountOnPage[adjustedIndex])
    }
  }, [urlIndex, currentStatementSetIndex, selectedStatementsCountOnPage])
  /**
    Handles the event of clicking a statement.
    If statement is already selected, it deselects and counter is decremented.
    If statement is not selected and the count is less than 3, it selects the statement and increments count.
    @param {string} statementId - The id of statement being clicked.
  */

  const homeRoute = () => { navigate('/') }

  const toggleSwiping = () => {
    setIsSwiping((prevIsSwiping) => !prevIsSwiping)
  }

  const handleStatementClick = (statementId) => {
    if (selectedStatements.includes(statementId)) {
      // Statement is already selected, so unselect it and decrease the count.
      setSelectedStatements(selectedStatements.filter((id) => id !== statementId))
      setSelectedStatementsCount((prevCount) => prevCount - 1)

      // Update the count on the page accordingly.
      setSelectedStatementsCountOnPage((prevState) => ({
        ...prevState,
        [currentStatementSetIndex]: prevState[currentStatementSetIndex] - 1,
      }))
    } else {
      if (selectedStatementsCountOnPage[currentStatementSetIndex] < 3) {
        // Statement is not selected, so select it and increase the count.
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
      const countOnNextPage = selectedStatementsCountOnPage[currentStatementSetIndex + 1]
      setSelectedStatementsCount(countOnNextPage)
      navigate(`/test/${currentStatementSetIndex + 2}`)
    } else {
      Submit({ navigate, selectedStatements })
    }
  }

  /** Handles going back to the previous statement set. */
  const handlePreviousStatementSet = () => {
    if (currentStatementSetIndex > 0) {
      const previousIndex = currentStatementSetIndex - 1
      setCurrentStatementSetIndex(previousIndex)
      const previousCount = selectedStatementsCountHistory.pop()
      setSelectedStatementsCount(previousCount)
      navigate(`/test/${currentStatementSetIndex}`)
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
    Save selectedStatements and selectedStatementsCount to sessionStorage whenever they change.
  */
  useEffect(() => {
    sessionStorage.setItem('selectedStatements', JSON.stringify(selectedStatements))
  }, [selectedStatements])

  useEffect(() => {
    sessionStorage.setItem('selectedStatementsCountOnPage', JSON.stringify(selectedStatementsCountOnPage))
  }, [selectedStatementsCountOnPage])

  let statements
  let setIndex

  /** Statement sets visible on the testpage are selected based on the set index. */
  if (currentStatementSetIndex % 2 === 0) {
    setIndex = currentStatementSetIndex / 2
    statements = selectOneStatementFromEachPositiveSet(positiveSets, setIndex)
  } else {
    setIndex = (currentStatementSetIndex - 1) / 2
    statements = selectOneStatementFromEachNegativeSet(negativeSets, setIndex)
  }

  if (loading) {
    return <LoadingScreen/>
  }

  if (error) {
    return <LoadingError errorMessage={'Virhe väitteiden lataamisessa'}/>
  }

  /** Progress bar for desktop UI. */
  const LinearProgressWithLabel = (props) => {
    return (
      <Box sx={{ pt: 2.5, pb: 3, display: 'flex', alignItems: 'center' }}>
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

  /** Progress bar for togglable mobile buttons UI. */
  const LinearProgressWithLabelMobile = (props) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress sx={{ height: 4, borderRadius: 3, '& .MuiLinearProgress-bar': {
            backgroundColor: '#30ad7d',
          }, backgroundColor: '#a2a9a8' }}
          variant="determinate" {...props} />
        </Box>
      </Box>
    )
  }

  return (
    <Grid container direction="column" alignItems="center" style={{ height: '80vh' }}>
      <img
        src={monochromeBackground}
        alt="monochrome background"
        style={{ maxWidth: '100%', position: 'fixed', top: 0, left: 0, right: 0,
          width: '100%', height: '100%', zIndex: -1 }}
      />
      {isMobile ? (
        isSwiping ? (
        /**
         Swiper library instead of buttons for mobile UI.

         spaceBetween: Space between slides in px.
         speed: Transition speed in ms.
         pagination: Config for pagination.
         modules: Swiper modules to enable.
         effect: Transition effect type when changing slides.
         creativeEffect: Transition effect magnitude (x, y, z axis).
         onSlideChange: Callback for handling slide changes.
        */
          <Container sx={{ padding: 0 }}>
            <Swiper
              className="swiper"
              spaceBetween={30}
              speed={200}
              pagination={{ type: 'progressbar' }}
              modules={[Pagination, EffectCreative]}
              effect={'creative'}
              creativeEffect={{
                prev: {
                  translate: [-75, 0, 0],
                },
                next: {
                  translate: [75, 0, 0]
                },
              }}
              onSlideChange={(swiper) => {
                swiper.realIndex > swiper.previousIndex ?
                  handleNextStatementSet() :
                  handlePreviousStatementSet()
              }}>
              {statementsData.map((s, i) => (
                <SwiperSlide key={i}>
                  <Typography sx={{ mt: 1, mb: currentURL === '/test/1' ? 0.3 : 2.5, fontSize: 10,
                    fontFamily: '"Lato", sans-serif', fontStyle: 'italic', color: '#00011b' }}>
                    {`${currentStatementSetIndex + 1}/12`}
                  </Typography>
                  {currentURL === '/test/1' && (
                    <Typography sx={{ py: 1.05, ml: 0, mb: 0, mt: 0, fontSize: 17, fontFamily: '"Lato", sans-serif', color: '#00011b',
                      '@media (max-width: 340px)': { fontSize: 15 } }}>
                      <FormControlLabel
                        control={<Switch checked={isSwiping} onChange={toggleSwiping} size="small" color="success" />}
                        label={<SwipeOutlinedIcon style={{ color: isSwiping ? 'green' : 'inherit' }} />}/><br />
                        Valitse 0–3 väitettä<br />
                        Mene eteen- ja taaksepäin pyyhkäisemällä
                    </Typography>
                  )}
                  {statements.map((s) => (
                    <div
                      key={s.id}
                      className={`statement ${selectedStatements.includes(s.id) ? 'selected' : ''}`}
                      onClick={() => handleStatementClick(s.id)}>
                      <Typography sx={{ fontSize: 15.5, fontFamily: '"Lato", sans-serif', color: '#00011b',
                        '@media (max-width: 340px)': { fontSize: 13.5 } }}>
                        {s.statement}
                      </Typography>
                    </div>
                  ))}
                  {currentURL === '/test/12' && (
                    <GoToResultsButtonMobile
                      id='results-btn-mobile'
                      onClick={() => navigate('/results', { state: { selectedStatements } })}>
                      Tulokset
                    </GoToResultsButtonMobile>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
          /** End of the code for buttons view, start of togglable Swiper code. */
        ) : (
          <Container sx={{ padding: 0, textAlign: 'center' }}>
            <LinearProgressWithLabelMobile value={(currentStatementSetIndex + 1) / statementsData.length * 100 } />
            <Typography sx={{ mt: 0.5, mb: currentURL === '/test/1' ? 0.3 : 2.5, fontSize: 10,
              fontFamily: '"Lato", sans-serif', fontStyle: 'italic', color: '#00011b' }}>
              {`${currentStatementSetIndex + 1}/12`}
            </Typography>
            {currentURL === '/test/1' && (
              <Typography sx={{ py: 1.05, ml: 0, mb: 0, mt: 0, fontSize: 17, fontFamily: '"Lato", sans-serif', color: '#00011b',
                '@media (max-width: 340px)': { fontSize: 15 } }}>
                <FormControlLabel
                  control={<Switch checked={isSwiping} onChange={toggleSwiping} size="small" />}
                  label={<SwipeOutlinedIcon />}/><br />
                  Valitse 0–3 väitettä
              </Typography>
            )}
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
                <Typography sx={{ fontSize: 15.5, fontFamily: '"Lato", sans-serif', color: '#00011b',
                  '@media (max-width: 340px)': { fontSize: 13.5 } }}>
                  {s.statement}
                </Typography>
              </div>
            ))}
            <Box sx={{ display: 'flex' }}>
              {/** Renders navigation buttons based on the current URL and statement set index. */}
              {urlIndex > 0 && currentURL !== '/test/1' ? (
                <NextPrevButton id='previous-btn' onClick={handlePreviousStatementSet}>Edellinen</NextPrevButton>
              ) : (
                <NextPrevButton id='home-btn' onClick={homeRoute}>Etusivulle</NextPrevButton>
              )}
              <Box sx={{ marginLeft: 'auto' }}>
                {currentStatementSetIndex < statementsData.length - 1
                  ? <NextPrevButton id='next-btn' onClick={handleNextStatementSet}>Seuraava</NextPrevButton>
                  : <NextPrevButton id='results-btn'
                    onClick={() => navigate('/results', { state: { selectedStatements } })}>
                    Tulokset
                  </NextPrevButton>
                }
              </Box>
            </Box>
          </Container>)
      /** End of the code for mobile UI, start of desktop UI code. */
      ) : (
        <Paper
          sx={{ mt: 10.5, mb: 10, p: 6, pb: 3.5, width: '77%' , background: '#fdf3e9' }}
          variant='elevation'
        >
          <Typography sx={{ py: 2, ml: 1.3, mb: 1.3, mt: -3, fontSize: 21, fontFamily: '"Lato", sans-serif' }}>
            Valitse 0–3 väitettä, jotka kuvaavat sinua parhaiten tieteellisen tekstin kirjoittajana
          </Typography>
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
          <LinearProgressWithLabel value={(currentStatementSetIndex + 1) / statementsData.length * 100 } />
          <Box sx={{ display: 'flex' }}>
            {urlIndex > 0 && currentURL !== '/test/1' ? (
              <NextPrevButton id='previous-btn' onClick={handlePreviousStatementSet}>Edellinen</NextPrevButton>
            ) : (
              <NextPrevButton id='home-btn' onClick={homeRoute}>Etusivulle</NextPrevButton>
            )}
            <Box sx={{ marginLeft: 'auto' }}>
              {currentStatementSetIndex < statementsData.length - 1
                ? <NextPrevButton id='next-btn' onClick={handleNextStatementSet}>Seuraava</NextPrevButton>
                : <NextPrevButton id='results-btn' onClick={handleNextStatementSet}>Tulokset</NextPrevButton>
              }
            </Box>
          </Box>
        </Paper>)}
    </Grid>
  )
}

export default Statements