import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import RadarChart from '../../frontend/src/components/RadarChart.jsx'
import splitLongStrings from '../../frontend/src/functions/splitLongStrings.jsx'

test('renders content without crashing', () => {
  const categories = ['Category 1', 'Category 2', 'Category 3']
  const results = [2, 0, -2]
  render(<RadarChart categories={categories} results={results} />)
})

test('should split long strings into chunks', () => {
  const maxLength = 20
  const input = ['Here is a long string that should be splitted', 'Not long']
  const expectedOutput = [
    ['Here is a long', 'string that should', 'be splitted'],
    ['Not long']
  ]
  const result = splitLongStrings(input, maxLength)
  expect(result).toEqual(expectedOutput)
})

test('should not split short strings', () => {
  const maxLength = 20
  const input = ['Short string 1', 'Short string 2']
  const expectedOutput = [['Short string 1'], ['Short string 2']]
  const result = splitLongStrings(input, maxLength)
  expect(result).toEqual(expectedOutput)
})