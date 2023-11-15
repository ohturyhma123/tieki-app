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

export default linksRouter
