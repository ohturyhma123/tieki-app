import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LoadingScreen from '../../frontend/components/LoadingScreen.jsx'

test('renders content without crashing', () => {
  render(<LoadingScreen/>)
})

test('renders with the correct message', () => {
  const message = 'Ladataan sivua...'

  const { getByText } = render(<LoadingScreen/>)

  const element = getByText(message)

  expect(element).toBeInTheDocument()
})
