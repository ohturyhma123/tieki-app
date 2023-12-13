import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import GoToTestButton from '../../frontend/components/GoToTestButton.jsx'

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }))

test('renders content without crashing', () => {
  render(<GoToTestButton/>)
})
