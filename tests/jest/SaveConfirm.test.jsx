import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import SaveConfirm from '../../frontend/components/SaveConfirm.jsx'

test('renders content without crashing', () => {
  render(<SaveConfirm open={true} onClose={() => {}} />)
})

test('renders with the correct message', () => {
  const message1 = 'Tiedot tallennettu onnistuneesti'
  const message2 = 'OK'

  const { getByText } = render(<SaveConfirm open={true} onClose={() => {}} />)

  const element1 = getByText(message1)
  const element2 = getByText(message2)

  expect(element1).toBeInTheDocument()
  expect(element2).toBeInTheDocument()
})
