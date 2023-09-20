import { useNavigate, useLocation } from 'react-router-dom'
import HomeButton from '../components/Button'

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

  return (
    <div>
      <HomeButton onClick={homeRoute} />
      <h2>Tulokset kategorioittain</h2>
      {Object.keys(categoryScores).map((category) => (
        <div key={category}>
          {category}: {categoryScores[category]}<br />
        </div>
      ))}
    </div>
  )
}

export default Results