import '@testing-library/jest-dom'
import getPositiveStatements from '../../frontend/functions/PositiveStatements'
import getNegativeStatements from '../../frontend/functions/NegativeStatements'
import selectOneStatementFromEachNegativeSet from '../../frontend/functions/SelectOneNegativeStatementFromEachCategory'
import selectOneStatementFromEachPositiveSet from '../../frontend/functions/SelectOnePositiveStatementFromEachCategory'

const testStatements = [
  {
    'category': 'Category 1',
    'boolean': true,
    'statements': [
      {
        'id': 1,
        'statement': 'Statement 1',
        'value': 1
      },
      {
        'id': 2,
        'statement': 'Statement 2',
        'value': 1
      }
    ]
  },
  {
    'category': 'Category 1',
    'boolean': false,
    'statements': [
      {
        'id': 3,
        'statement': 'Statement 3',
        'value': -1
      },
      {
        'id': 4,
        'statement': 'Statement 4',
        'value': -1
      }
    ]
  },
  {
    'category': 'Category 2',
    'boolean': true,
    'statements': [
      {
        'id': 5,
        'statement': 'Statement 5',
        'value': 1
      },
      {
        'id': 6,
        'statement': 'Statement 6',
        'value': 1
      }
    ]
  },
  {
    'category': 'Category 2',
    'boolean': false,
    'statements': [
      {
        'id': 7,
        'statement': 'Statement 7',
        'value': -1
      },
      {
        'id': 8,
        'statement': 'Statement 8',
        'value': -1
      }
    ]
  },
]

test('selects negative statements only', () => {
  const expectedOutput = [
    {
      'category': 'Category 1',
      'boolean': false,
      'statements': [
        {
          'id': 3,
          'statement': 'Statement 3',
          'value': -1
        },
        {
          'id': 4,
          'statement': 'Statement 4',
          'value': -1
        }
      ]
    },
    {
      'category': 'Category 2',
      'boolean': false,
      'statements': [
        {
          'id': 7,
          'statement': 'Statement 7',
          'value': -1
        },
        {
          'id': 8,
          'statement': 'Statement 8',
          'value': -1
        }
      ]
    }
  ]
  const result = getNegativeStatements(testStatements)
  expect(result).toEqual(expectedOutput)
})

test('selects positive statements only', () => {
  const expectedOutput = [
    {
      'category': 'Category 1',
      'boolean': true,
      'statements': [
        {
          'id': 1,
          'statement': 'Statement 1',
          'value': 1
        },
        {
          'id': 2,
          'statement': 'Statement 2',
          'value': 1
        }
      ]
    },
    {
      'category': 'Category 2',
      'boolean': true,
      'statements': [
        {
          'id': 5,
          'statement': 'Statement 5',
          'value': 1
        },
        {
          'id': 6,
          'statement': 'Statement 6',
          'value': 1
        }
      ]
    }
  ]
  const result = getPositiveStatements(testStatements)
  expect(result).toEqual(expectedOutput)
})

test('select one negative statement from each category based on index', () => {
  const expectedOutput = [
    {
      'id': 3,
      'statement': 'Statement 3',
      'value': -1
    },
    {
      'id': 7,
      'statement': 'Statement 7',
      'value': -1
    }
  ]
  const negativeSets = getNegativeStatements(testStatements)
  const result = selectOneStatementFromEachNegativeSet(negativeSets, 0)
  expect(result).toEqual(expectedOutput)
})

test('select one positive statement from each category based on index', () => {
  const expectedOutput = [
    {
      'id': 2,
      'statement': 'Statement 2',
      'value': 1
    },
    {
      'id': 6,
      'statement': 'Statement 6',
      'value': 1
    }
  ]
  const positiveSets = getPositiveStatements(testStatements)
  const result = selectOneStatementFromEachPositiveSet(positiveSets, 1)
  expect(result).toEqual(expectedOutput)
})