import { Link, useLocation } from 'react-router-dom'
import resultsData from '../data/resultsData.json'
import ResultAccordion from '../components/ResultAccordion'
import RadarChart from '../components/RadarChart'
import monochromeBackground from '../assets/monochrome-background.jpg'
import { Box, Paper, Typography, Grid, Container } from '@mui/material'

const Results = () => {
  const location = useLocation()
  /**
    Calculates category scores based on user selected statements.
    @returns {Object} - Object containing scores by category.
  */
  const calculateScore = () => {
    /** Use location.state to retrieve statementsData and selectedStatements. */
    const statementsData = location.state.statementsData
    const selectedStatements = location.state.selectedStatements

    /** Initialize an object with category names as keys and 0 as the values. */
    let categoryScores = {}
    statementsData.forEach((categoryData) => {
      categoryScores[categoryData.category] = [0,0]
    })

    /**
      Calculate category scores by iterating through each selected statement id.
      For each category, find the statement with the matching id,
      and add the statement's value to the respective category's score.
    */
    selectedStatements.forEach((statementId) => {
      for (const categoryData of statementsData) {
        const statement = categoryData.statements.find((s) => s.id === statementId)
        if (categoryData.statements.find((s) => s.id === statementId)) {
          if(statement.value > 0) {
            categoryScores[categoryData.category][0] += statement.value
          }
          else {
            categoryScores[categoryData.category][1] += statement.value
          }
        }
      }
    })
    return categoryScores
  }

  /** Calculate and store category scores outside of JSX to prevent redundant calls with each render. */
  const scores = calculateScore()
  const sumScores = {}

  Object.entries(scores).forEach(([key, value]) => {
    sumScores[key] = value[0]+value[1]
  })

  /** Calculates which categories have enough statements selected to be shown on the resultpage. */
  const getResults = () => {
    const positiveCategories = Object.keys(scores).filter((category) => scores[category][0] >= 2)
    const negativeCategories = Object.keys(scores).filter((category) => scores[category][1] <= -2)

    const positiveResults = resultsData.filter((result) => positiveCategories.includes(result.category) && result.positive)
    const negativeResults = resultsData.filter((result) => negativeCategories.includes(result.category) && result.positive === false)

    return [positiveResults, negativeResults]
  }

  const [positiveResults, negativeResults] = getResults()

  let strengthText = null
  let weaknessText = null

  if (positiveResults.length < 1) {
    strengthText = <Typography sx={{ pt: 2, pb: 1, textAlign: 'center' }} variant='h5' className='strengths'>Valintojesi perusteella sinulla ei ole vahvuuksia.</Typography>
  }
  if (negativeResults.length < 1) {
    weaknessText = <Typography sx={{ pt: 2, pb: 1, textAlign: 'center' }} variant='h5' className='weaknesses'>Valintojesi perusteella sinulla ei ole kehityskohteita.</Typography>
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <img
        src={monochromeBackground}
        alt="monochromeBackground"
        style={{ maxWidth: '100%', position: 'fixed', top: 0, left: 0, right: 0,
          width: '100%', height: '100%', zIndex: -1 }}
      />
      <Container maxWidth='xl'>
        <Paper sx={{ m: -1, mt: 3, mb: 5, p: 2, pb: 7, background: '#FCF8F4' }} variant='elevation' elevation={10}>
          {positiveResults.length > 0 || negativeResults.length > 0
            ?
            <div>
              <Grid container direction="row" spacing={10} justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4}>
                  <Typography sx={{ pt: 8, textAlign: 'center', color: '#323E45' }} variant='h3'>Tulokset</Typography>
                  <RadarChart categories={Object.keys(sumScores)} results={Object.values(sumScores)}/>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={10} justifyContent="center">
                <Grid item xs={12} sm={10} md={10} lg={7} >
                  <div>
                    <Typography sx={{ py: 2, px:0, my: 2, textAlign: 'center', color: '#323E45' }} variant='h4' className='strengths'>Vahvuudet</Typography>
                    {strengthText}
                    {positiveResults.map((result) => <ResultAccordion key={result.id} result={result} color={"#d3e8df"} />)}
                  </div>
                  <div>
                    <Typography sx={{ py: 2, px:0, mt: 4, mb: 2, textAlign: 'center', color: '#323E45' }} variant='h4' className='weaknesses'>Kehityskohteet</Typography>
                    {weaknessText}
                    {negativeResults.map((result) => <ResultAccordion key={result.id} result={result} color={"bisque"}/>)}
                  </div>
                </Grid>
              </Grid>
            </div>
            :
            <Box>
              <Typography sx={{ pt: 2, pb: 5 }} variant='h4' >Et valinnut tarpeeksi väittämiä analyysin muodostamiseen.</Typography>
              <Typography variant='h5' >Hyödyllisiä linkkejä löydät <Link to='/links'>linkkisivulta</Link></Typography>
            </Box>
          }
        </Paper>
      </Container>
    </Grid>
  )
}

export default Results