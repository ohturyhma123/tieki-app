import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import EditObject from '../../frontend/components/EditObject.jsx'

test('renders content without crashing', () => {
  render(<EditObject/>)
})
