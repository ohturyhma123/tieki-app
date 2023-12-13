import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import NotAdmin from '../../frontend/components/NotAdmin.jsx'

test('renders content without crashing', () => {
  render(<NotAdmin/>)
})

test('renders with the correct message', () => {
  const message = 'Tämä sivu on vain ylläpitäjille'

  const { getByText } = render(<NotAdmin/>)

  const element = getByText(message)

  expect(element).toBeInTheDocument()
})
