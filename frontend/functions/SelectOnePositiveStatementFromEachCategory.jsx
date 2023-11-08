/**
    Iterates through the positive statement sets and selects one statement from each
    category.
    @param {number} index - Statements are selected from each set based on the index value.
    @returns {resultSet} - The result set that has six positive statements in total.
    One statement from each positive set.
  */
const selectOneStatementFromEachPositiveSet = (positiveSets, index) => {
  const resultSet = []
  for (const setIndex in positiveSets) {
    const set = positiveSets[setIndex].statements
    const statement = set[index]
    resultSet.push(statement)
  }
  return resultSet
}

export default selectOneStatementFromEachPositiveSet
