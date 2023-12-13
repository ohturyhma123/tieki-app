import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import SaveError from '../../frontend/components/SaveError.jsx'

test('renders content without crashing', () => {
  render(<SaveError open={true} onClose={() => {}} />)
})

test('renders with the correct message', () => {
  const message1 = 'Tietojen tallennus epäonnistui'
  const message2 = 'OK'

  const { getByText } = render(<SaveError open={true} onClose={() => {}} />)

  const element1 = getByText(message1)
  const element2 = getByText(message2)

  expect(element1).toBeInTheDocument()
  expect(element2).toBeInTheDocument()
})
