import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import ListItemDesktopHome from '../../frontend/components/ListItemDesktopHome.jsx'

test('renders content without crashing', () => {
  render(<ListItemDesktopHome/>)
})

test('renders with the correct message', () => {
  const message = 'List item number 1'

  const { getByText } = render(<ListItemDesktopHome text={message} />)

  const element = getByText(message)

  expect(element).toBeInTheDocument()
})
