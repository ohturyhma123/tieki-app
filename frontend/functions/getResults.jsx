import resultsData from '../../data/resultsData.json'

const getResults = (scores) => {
  const positiveCategories = Object.keys(scores).filter((category) => scores[category][0] >= 2)
  const negativeCategories = Object.keys(scores).filter((category) => scores[category][1] <= -2)

  const positiveResults = resultsData.filter((result) => positiveCategories.includes(result.category) && result.positive)
  const negativeResults = resultsData.filter((result) => negativeCategories.includes(result.category) && result.positive === false)

  return [positiveResults, negativeResults]
}

export default getResults