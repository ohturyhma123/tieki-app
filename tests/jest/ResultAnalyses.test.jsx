import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ResultAccordion from '../../frontend/components/ResultAccordion'

test('renders analysis without crashing', () => {
  const result = {
    id: 1,
    category: 'Category 1',
    textSegments: ['text 1', 'text 2'],
    listPoints: ['list item 1', 'list item 2'],
    links: [
      {
        description: 'description 1',
        link: 'link 1'
      },
      {
        description: 'description 2',
        link: 'link 2'
      }
    ]
  }

  render(<ResultAccordion result={result} />)

  const category = screen.getByText(result.category)
  expect(category).toBeInTheDocument()

  for (let index in result.textSegments.length) {
    const textSegment = screen.getByText(result.textSegments[index])
    expect(textSegment).toBeInTheDocument()
  }

  for (let index in result.listPoints.length) {
    const item = screen.getByText(result.listPoints[index])
    expect(item).toBeInTheDocument()
  }

  for (let index in result.links.length) {
    const description = result.links[index].description
    const link = result.links[index].link
    expect(description).toBeInTheDocument()
    expect(link).toBeInTheDocument()
  }
})
