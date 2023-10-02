/**
  Iterates through the statement data and selects all positive statement sets
  based on the boolean value of the set. If True, the statement set is for
  positive statements and it gets pushed to the returnable array.
  @returns {positiveStatementSets} - all negative statement sets from categories.
*/
const getPositiveStatements = (statements) => {
  const positiveStatementSets = []

  for (const statementSetIndex in statements) {
    const statementSet = statements[statementSetIndex]
    if (statementSet.boolean === 'True') {
      positiveStatementSets.push(statementSet)
    }
  }

  return positiveStatementSets
}

export default getPositiveStatements
