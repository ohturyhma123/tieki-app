import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LoadingError from '../../frontend/components/LoadingError.jsx'

test('renders content without crashing', () => {
  render(<LoadingError/>)
})

test('renders with the correct error message', () => {
  const errorMessage = 'Error message 123'

  const { getByText } = render(<LoadingError errorMessage={errorMessage} />)

  const errorElement = getByText(errorMessage)

  expect(errorElement).toBeInTheDocument()
})
