import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ListItemDesktop from '../../frontend/components/ListItemDesktop.jsx'

test('renders content without crashing', () => {
  render(<ListItemDesktop/>)
})

test('renders with the correct message', () => {
  const message = 'List item number 1'

  const { getByText } = render(<ListItemDesktop text={message} />)

  const element = getByText(message)

  expect(element).toBeInTheDocument()
})
