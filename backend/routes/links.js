import express from 'express'
import Link from '../db/models/LinkModel.js'

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
linksRouter.put('/', async (req, res) => {
  const updatedLinks = req.body

  try {
    for (const updatedLink of updatedLinks) {
      await Link.findOneAndUpdate({ id: updatedLink.id }, updatedLink)
    }
    res.json({ message: 'Links updated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update links' })
  }
})

export default linksRouter
