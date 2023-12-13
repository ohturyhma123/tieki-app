import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import NextPrevButton from '../../frontend/components/NextPrevButton.jsx'

test('renders content without crashing', () => {
  render(<NextPrevButton/>)
})
