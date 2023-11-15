import express from 'express'
import Link from '../db/models/LinkModel.js'
import AdminCheck from '../middleware/AdminCheck.js'

const linksRouter = express()

linksRouter.get('/', async (req, res) => {
  try {
    const linksData = await Link.find()
    res.json(linksData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to retrieve data' })
  }
})

// PUT endpoint to update links
linksRouter.put('/', AdminCheck, async (req, res) => {
  const updatedLinks = req.body

  try {
    for (const updatedLink of updatedLinks) {
      if (updatedLink.name.length === 0) {
        throw new Error('Name can not be empty')
      }
      if (updatedLink.url.length === 0) {
        throw new Error('Link can not be empty')
      }
      await Link.findOneAndUpdate({ id: updatedLink.id }, updatedLink)
    }
    res.json({ message: 'Links updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update links' })
  }
})

// POST endpoint to create a new link
linksRouter.post('/', AdminCheck, async (req, res) => {
  const newLinkData = req.body

  try {
    if (!newLinkData.name || !newLinkData.url) {
      throw new Error('Name and URL cannot be empty')
    }

    // Get the link with the highest id
    const lastLink = await Link.findOne().sort({ id: -1 })

    // Add 1 to the highest id for the new link
    newLinkData.id = lastLink ? lastLink.id + 1 : 1

    const newLink = new Link(newLinkData)
    const savedLink = await newLink.save()

    res.json(savedLink)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create link' })
  }
})

// DELETE endpoint to delete a link
linksRouter.delete('/:id', AdminCheck, async (req, res) => {
  const id = req.params.id

  try {
    await Link.findOneAndDelete({ id: id })

    res.json({ message: 'Link deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete link' })
  }
})
export default linksRouter
