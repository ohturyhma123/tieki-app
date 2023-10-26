import statementsData from '../data/statementsData.json'

/**
  Calculates category scores based on user selected statements.
  @returns {Object} - Object containing scores by category.
*/
const calculateCategoryScores = (selectedStatements) => {
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

export default calculateCategoryScores