import getNegativeStatements from './NegativeStatements'

const negativeSets = getNegativeStatements()

/**
   Iterates through the negative statement sets and selects one statement from each
   category.
   @param {number} index - Statements are selected from each set based on the index value.
   @returns {resultSet} - The result set that has six negative statements in total.
   One statement from each negative set.
  */
const selectOneStatementFromEachNegativeSet = (index) => {
  const resultSet = []
  for (const setIndex in negativeSets) {
    const set = negativeSets[setIndex].statements
    const statement = set[index]
    resultSet.push(statement)
  }
  return resultSet
}

export default selectOneStatementFromEachNegativeSet