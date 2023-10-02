import statementsData from '../data/statementsData.json'

/**
  Iterates through the statement data and selects all negative statement sets
  based on the boolean value of the set. If False, the statement set is for
  negative statements and it gets pushed to the returnable array.
  @returns {negativeStatementSets} - all negative statement sets from categories.
*/
const getNegativeStatements = () => {
  const negativeStatementSets = []

  for (const statementSetIndex in statementsData) {
    const statementSet = statementsData[statementSetIndex]
    if (statementSet.boolean === 'False') {
      negativeStatementSets.push(statementSet)
    }
  }

  return negativeStatementSets
}

export default getNegativeStatements
