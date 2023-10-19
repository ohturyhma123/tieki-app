import { Link, useLocation } from 'react-router-dom'
import resultsData from '../data/resultsData.json'
import ResultAccordion from '../components/ResultAccordion'
import RadarChart from '../components/RadarChart'
import { Box, Paper, Typography, Grid } from '@mui/material'

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
        const statement = categoryData.statements.find((s) => s.id == statementId)
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

  const getResults = () => {
    const positiveCategories = Object.keys(scores).filter((category) => scores[category][0] >= 2)
    const negativeCategories = Object.keys(scores).filter((category) => scores[category][1] <= -2)

    const positiveResults = resultsData.filter((result) => positiveCategories.includes(result.category) && result.positive)
    const negativeResults = resultsData.filter((result) => negativeCategories.includes(result.category) && result.positive === false)

    return [positiveResults, negativeResults]
  }

  const [positiveResults, negativeResults] = getResults()

  return (
    <Grid sx={{ background: '#FEF6E1' }} container direction="column" justifyContent="center" alignItems="center">
      <Paper sx={{ m: 10, mt: 5, mb: 40, pt: 5, p: 10 }}>
        {location.state.selectedStatements.length > 0
          ?
          <Grid container direction="row" spacing={20} justifyContent="center">
            <Grid item xs={5} md={6}>
              <div>
                <Typography sx={{ py: 2 }} variant='h4'>Tulokset kategorioittain</Typography>
                {Object.keys(scores).map((category) => (
                  <Typography sx={{ pl: 2 }} key={category}>
                    {category}: <b>{sumScores[category]}</b><br />
                  </Typography>
                ))}
                <RadarChart categories={Object.keys(sumScores)} results={Object.values(sumScores)}/>
              </div>
            </Grid>
            <Grid item xs={6} md={6}>
              <div>
                <Typography sx={{ pt: 2, pb: 1 }} variant='h5' className='strengths'>Vahvuudet</Typography>
                {positiveResults.map((result) => <ResultAccordion key={result.id} result={result} />)}
                <Typography sx={{ pt: 4, pb: 1 }} variant='h5' className='weaknesses'>Kehityskohteet</Typography>
                {negativeResults.map((result) => <ResultAccordion key={result.id} result={result} />)}
              </div>
            </Grid>
          </Grid>
          :
          <Box>
            <Typography sx={{ pt: 2, pb: 5 }} variant='h4' >Et valinnut tarpeeksi väittämiä analyysin muodostamiseen.</Typography>
            <Typography variant='h5' >Hyödyllisiä linkkejä löydät <Link to='/links'>linkkisivulta</Link></Typography>
          </Box>
        }
      </Paper>
    </Grid>
  )
}

export default Results