/**
  Gets positive and negative results based on scores.
  @returns {positiveResults} - Object containing positive results, sorted by category scores
  @returns {negativeResults} - Object containing negative results, sorted by category scores.
*/
const GetResults = (scores, resultsData) => {

  /** Get the categories by using their scores */
  const positiveCategories = Object.keys(scores).filter((category) => scores[category][0] >= 2)
  const negativeCategories = Object.keys(scores).filter((category) => scores[category][1] <= -2)

  /** Give each category in resultsData its score in a new attribute called scores */
  resultsData.forEach((result) => {
    result.scores = scores[result.category]
  })

  /** Filter results based on positive and negative categories */
  const positiveResults = resultsData.filter((result) => positiveCategories.includes(result.category) && result.positive)
  const negativeResults = resultsData.filter((result) => negativeCategories.includes(result.category) && result.positive === false)

  /** Sort the results based on their scores */
  positiveResults.sort((a,b) => b.scores[0] - a.scores[0])
  negativeResults.sort((a,b) => a.scores[1] - b.scores[1])

  return [positiveResults, negativeResults]
}

export default GetResults