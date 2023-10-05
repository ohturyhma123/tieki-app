import { useLocation } from 'react-router-dom'
import resultsData from '../data/resultsData.json'
import ResultBlock from '../components/ResultBlock'
import RadarChart from '../components/RadarChart'
import Grid from '@mui/material/Grid'

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

  const getResults = () => {
    const positiveCategories = Object.keys(scores).filter((category) => scores[category][0] >= 2)
    const negativeCategories = Object.keys(scores).filter((category) => scores[category][1] <= -2)

    const positiveResults = resultsData.filter((result) => positiveCategories.includes(result.category) && result.positive)
    const negativeResults = resultsData.filter((result) => negativeCategories.includes(result.category) && result.positive === false)

    return [positiveResults, negativeResults]
  }

  const [positiveResults, negativeResults] = getResults()

  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} md={3}>
        <div>
          <h2>Tulokset kategorioittain</h2>
          {Object.keys(scores).map((category) => (
            <div key={category}>
              {category}: {sumScores[category]}<br />
            </div>
          ))}
          <RadarChart categories={Object.keys(sumScores)} results={Object.values(sumScores)}/>
        </div>
      </Grid>

      <Grid item xs={12} md={3}>
        <div>
          <h2>Vahvuudet</h2>
          {positiveResults.map((result) => <ResultBlock key={result.id} result={result} />)}
          <h2>Heikkoudet</h2>
          {negativeResults.map((result) => <ResultBlock key={result.id} result={result} />)}
        </div>
      </Grid>
    </Grid>
  )
}

export default Results