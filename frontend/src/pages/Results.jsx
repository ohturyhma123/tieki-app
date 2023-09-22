import { useNavigate, useLocation } from 'react-router-dom'
import resultsData from '../data/resultsData.json'
import HomeButton from '../components/Button'
import ResultBlock from '../components/ResultBlock'

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const homeRoute = () => { navigate('/') }

  const calculateScore = () => {
    const statementsData = location.state.statementsData
    const selectedStatements = location.state.selectedStatements
    let categoryScores = {}
  
    statementsData.forEach((categoryData) => {
      categoryScores[categoryData.category] = 0
    })

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

  const categoryScores = calculateScore()

  const getResults = () => {

    const positiveCategories = Object.keys(categoryScores).filter((category) => categoryScores[category] >= 2)
    const negativeCategories = Object.keys(categoryScores).filter((category) => categoryScores[category] <= -2)

    const positiveResults = resultsData.filter((result) => positiveCategories.includes(result.category) && result.positive)
    const negativeResults = resultsData.filter((result) => negativeCategories.includes(result.category) && result.positive === false)

    return [positiveResults, negativeResults]
  }

  const [positiveResults, negativeResults] = getResults()

  return (
    <div>
      <HomeButton onClick={homeRoute} />
      <h2>Tulokset kategorioittain</h2>
      {Object.keys(categoryScores).map((category) => (
        <div key={category}>
          {category}: {categoryScores[category]}<br />
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