const GetResults = (scores, resultsData) => {

  const positiveCategories = Object.keys(scores).filter((category) => scores[category][0] >= 2)
  const negativeCategories = Object.keys(scores).filter((category) => scores[category][1] <= -2)

  resultsData.forEach((result) => {
    result.scores = scores[result.category]
  })

  const positiveResults = resultsData.filter((result) => positiveCategories.includes(result.category) && result.positive)
  const negativeResults = resultsData.filter((result) => negativeCategories.includes(result.category) && result.positive === false)

  positiveResults.sort((a,b) => b.scores[0] - a.scores[0])
  negativeResults.sort((a,b) => a.scores[1] - b.scores[1])

  return [positiveResults, negativeResults]
}

export default GetResults