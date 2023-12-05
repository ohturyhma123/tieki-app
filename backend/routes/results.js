import express from 'express'
import Result from '../db/models/ResultModel.js'
import AdminCheck from '../middleware/AdminCheck.js'

const resultsRouter = express()

resultsRouter.get('/', async (req, res) => {
  try {
    const resultsData = await Result.find().sort({ 'id': 1 })
    res.json(resultsData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

resultsRouter.put('/', AdminCheck, async (req, res) => {
  const updatedResults = req.body

  try {
    for (const updatedResult of updatedResults) {
      for (const segment of updatedResult.textSegments) {
        if (segment.length === 0) {
          throw new Error('Segment can not be empty')
        }
      }
      await Result.findOneAndUpdate({ id: updatedResult.id }, updatedResult)
    }
    res.json({ message: 'results updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update results' })
  }
})

resultsRouter.post('/:resultId/links', AdminCheck, async (req, res) => {
  const resultId = req.params.resultId
  const newLinkData = req.body

  try {
    const resultsData = await Result.find().sort({ 'id': 1 })

    // finds the link with highest id
    let maxId = -1
    // eslint-disable-next-line no-unused-vars
    let maxIdLink = null

    resultsData.forEach(item => {
      if (item.links && item.links.length > 0) {
        item.links.forEach(link => {
          if (link.id > maxId) {
            maxId = link.id
            maxIdLink = link
          }
        })
      }
    })

    // Sets id for the new link
    newLinkData.id = maxId + 1

    // Find the result by ID
    const result = await Result.findOne({ id: resultId })

    if (!result) {
      return res.status(404).json({ error: 'Result not found' })
    }

    // Add the new link to the result
    result.links.push(newLinkData)

    // Save the updated result
    await result.save()

    res.json({ message: 'Link added successfully', result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to add link' })
  }
})

resultsRouter.delete('/:resultId/links/:linkId', AdminCheck, async (req, res) => {
  const resultId = req.params.resultId
  const linkId = req.params.linkId

  try {
    // Find the result by ID
    const result = await Result.findOne({ id: resultId })

    if (!result) {
      return res.status(404).json({ error: 'Result not found' })
    }

    const resultLinks = result.links

    // Find the index of the link with the specified linkId
    const linkToDelete = resultLinks.findIndex(link => link.id === parseInt(linkId))

    if (linkToDelete === -1) {
      return res.status(404).json({ error: 'Link not found' })
    }

    // Remove the link at the specified index
    result.links.splice(linkToDelete, 1)

    // Save the updated result
    await result.save()

    res.json({ message: 'Link deleted successfully', result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete link' })
  }
})

export default resultsRouter
