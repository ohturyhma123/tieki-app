import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import '../assets/EditLinks.css'

const baseUrl = '/api/links'

const EditLinks = () => {
  const [links, setLinks] = useState([])

  const navigate = useNavigate()

  /**
   * Fetch links from the backend when the component is mounted.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        setLinks(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  /**
   * Update the name of the link with the given id.
   */
  const handleNameChange = (id, newName) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, name: newName } : link
    )
    setLinks(updatedLinks)
  }

  /**
   * Update the description of the link with the given id.
   */
  const handleDescriptionChange = (id, newDescription) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, description: newDescription } : link
    )
    setLinks(updatedLinks)
  }

  /**
   * Update the url of the link with the given id.
   */
  const handleUrlChange = (id, newUrl) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, url: newUrl } : link
    )
    setLinks(updatedLinks)
  }

  /**
   * Save the updated links to the backend.
   */
  const handleSaveClick = async () => {
    try {
      // Update links on the backend
      await axios.put(baseUrl, links, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      navigate('/edit')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="editLinksContainer">
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Muokkaa linkkejä
        </h1>
        {links.map((link) => (
          <div key={link.id} style={{ marginBottom: '20px', display: 'flex' }}>
            <TextField
              id={`name-${link.id}`}
              label="Linkin nimi"
              variant="outlined"
              value={link.name}
              onChange={(e) => handleNameChange(link.id, e.target.value)}
              style={{ marginRight: '20px', resize: 'both' }}
            />
            <TextField
              id={`description-${link.id}`}
              label="Kuvaus"
              variant="outlined"
              value={link.description}
              onChange={(e) => handleDescriptionChange(link.id, e.target.value)}
              style={{ marginRight: '20px' }}
            />
            <TextField
              id={`url-${link.id}`}
              label="Linkin URL"
              variant="outlined"
              value={link.url}
              onChange={(e) => handleUrlChange(link.id, e.target.value)}
              style={{ marginRight: '20px' }}
            />
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveClick}
          style={{ backgroundColor: '#00000', marginBottom: '20px' }}
        >
        Tallenna
        </Button>
      </div>
    </div>
  )
}

export default EditLinks
