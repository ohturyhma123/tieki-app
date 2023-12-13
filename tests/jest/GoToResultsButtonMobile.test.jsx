import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import GoToResultsButtonMobile from '../../frontend/components/GoToResultsButtonMobile.jsx'

test('renders content without crashing', () => {
  render(<GoToResultsButtonMobile/>)
})
