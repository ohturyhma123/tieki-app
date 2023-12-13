import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import NotAdminLogout from '../../frontend/components/NotAdminLogout.jsx'

test('renders content without crashing', () => {
  render(<NotAdminLogout/>)
})

test('renders with the correct message', () => {
  const message1 = 'Tämä sivu on vain ylläpitäjille'
  const message2 = 'Kirjaudu ulos'

  const { getByText } = render(<NotAdminLogout/>)

  const element1 = getByText(message1)
  const element2 = getByText(message2)

  expect(element1).toBeInTheDocument()
  expect(element2).toBeInTheDocument()
})
