import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import CustomBox from '../../frontend/components/CustomBox.jsx'

test('renders content without crashing', () => {
  render(<CustomBox/>)
})
