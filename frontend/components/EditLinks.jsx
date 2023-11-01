import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import '../assets/EditLinks.css'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import AdminCheck from '../functions/AdminCheck'

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
   * Prevent scrolling when the component is mounted.
   */
  
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
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

  const isAdmin = AdminCheck()

  if (!isAdmin) {
    // Wait for server to check admin status
    return null
  }

  return (
    <div className="editLinksContainer">
      <div className="centeredContent" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
        <picture>
          <source media="(max-width: 1200px), (max-height: 700px)" srcSet={monochromeBackground} />
          <img
            src={homeBackground}
            alt="homeBackground"
            style={{ maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: 0, left: 0, right: 0,
              width: '100%', height: '100%', zIndex: -1 }}
          />
        </picture>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Muokkaa linkkejä</h1>
        {links.map((link) => (
          <Accordion key={link.id} style={{
            marginBottom: '20px',
            backgroundColor: '#f8f8f8',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: 'none',
          }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
              <Typography>{link.name}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                id={`name-${link.id}`}
                label="Linkin nimi"
                variant="outlined"
                value={link.name}
                onChange={(e) => handleNameChange(link.id, e.target.value)}
                style={{ marginBottom: '20px' }}
              />
              <TextField
                id={`description-${link.id}`}
                label="Kuvaus"
                variant="outlined"
                value={link.description}
                onChange={(e) => handleDescriptionChange(link.id, e.target.value)}
                style={{ marginBottom: '20px' }}
              />
              <TextField
                id={`url-${link.id}`}
                label="Linkin URL"
                variant="outlined"
                value={link.url}
                onChange={(e) => handleUrlChange(link.id, e.target.value)}
                style={{ marginBottom: '20px' }}
              />
            </AccordionDetails>
          </Accordion>
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
