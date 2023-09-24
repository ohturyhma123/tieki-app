import { useNavigate, useLocation } from 'react-router-dom'
import resultsData from '../data/resultsData.json'
import HomeButton from '../components/Button'
import ResultBlock from '../components/ResultBlock'

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const homeRoute = () => { navigate('/') }

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
      categoryScores[categoryData.category] = 0
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
          categoryScores[categoryData.category] += statement.value
        }
      }
    })
    return categoryScores
  }

  /** Calculate and store category scores outside of JSX to prevent redundant calls with each render. */
  const scores = calculateScore()

  const getResults = () => {
    const positiveCategories = Object.keys(scores).filter((category) => scores[category] >= 2)
    const negativeCategories = Object.keys(scores).filter((category) => scores[category] <= -2)

    const positiveResults = resultsData.filter((result) => positiveCategories.includes(result.category) && result.positive)
    const negativeResults = resultsData.filter((result) => negativeCategories.includes(result.category) && result.positive === false)

    return [positiveResults, negativeResults]
  }

  const [positiveResults, negativeResults] = getResults()

  return (
    <div>
      <HomeButton onClick={homeRoute} />
      <h2>Tulokset kategorioittain</h2>
      {/**
        Object.keys(scores) returns an array of category names from the object,
        and .map((category) iterates through the array to render a list of categories and their scores.
      */}
      {Object.keys(scores).map((category) => (
        <div key={category}>
          {category}: {scores[category]}<br />
        </div>
      ))}
      <h2>Vahvuudet</h2>
      {positiveResults.map((result) => <ResultBlock key={result.id} result={result} />)}
      <h2>Heikkoudet</h2>
      {negativeResults.map((result) => <ResultBlock key={result.id} result={result} />)}
    </div>
  )
}

export default Results