import { useState, useEffect } from 'react'
//import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, CircularProgress, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import '../assets/EditLinks.css'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import useAdminCheck from '../hooks/useAdminCheck'
import SaveConfirm from './SaveConfirm'
import SaveError from './SaveError'

const baseUrl = '/api/links'

const EditLinks = () => {
  const [links, setLinks] = useState([])
  const [openSaveConfirm, setOpenSaveConfirm] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [newLink, setNewLink] = useState({ name: '', description: '', url: '' })

  //const navigate = useNavigate()

  /**
   * Fetch links from the backend when the component is mounted.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        setLinks(response.data)
      } catch (error) {
        throw new Error('Failed to fetch data')
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

  const handleAddLink = async () => {
    try {
      // Save new link to the backend
      const response = await axios.post(baseUrl, newLink, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Add new link to the links array in the state
      setLinks([...links, response.data])

      // Reset new link
      setNewLink({ name: '', description: '', url: '' })
    } catch (error) {
      setHasError(true)
    }
  }

  const handleDelete = async (id) => {
    try {
      // Delete link from the backend
      await axios.delete(`${baseUrl}/${id}`)

      // Remove link from the links array in the state
      setLinks(links.filter((link) => link.id !== id))
    } catch (error) {
      setHasError(true)
    }
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
      //throw new Error('Simulated error')
      // Update links on the backend
      await axios.put(baseUrl, links, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setOpenSaveConfirm(true)
    } catch (error) {
      setHasError(true)
    }
  }

  const { isAdmin, loading, error } = useAdminCheck()

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <picture>
          <source media="(max-width: 1200px), (max-height: 700px)" srcSet={monochromeBackground} />
          <img
            src={homeBackground}
            alt="homeBackground"
            style={{ maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: 0, left: 0, right: 0,
              width: '100%', height: '100%', zIndex: -1 }}
          />
        </picture>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress sx={{ mr: 2 }} />
          <Typography>Ladataan sivua...</Typography>
        </Box>
      </Grid>
    )
  }

  if (!isAdmin) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <picture>
          <source media="(max-width: 1200px), (max-height: 700px)" srcSet={monochromeBackground} />
          <img
            src={homeBackground}
            alt="homeBackground"
            style={{ maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: 0, left: 0, right: 0,
              width: '100%', height: '100%', zIndex: -1 }}
          />
        </picture>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Tämä sivu on vain ylläpitäjille</Typography>
        </Box>
      </Grid>
    )
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <picture>
          <source media="(max-width: 1200px), (max-height: 700px)" srcSet={monochromeBackground} />
          <img
            src={homeBackground}
            alt="homeBackground"
            style={{ maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: 0, left: 0, right: 0,
              width: '100%', height: '100%', zIndex: -1 }}
          />
        </picture>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Virhe käyttäjän oikeuksien tarkistuksessa</Typography>
        </Box>
      </Grid>
    )
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
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(link.id)}
                style={{ marginTop: '20px' }}
              >
        Delete
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
        <div style={{ order: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
            style={{ backgroundColor: '#00000', marginBottom: '20px' }}
          >
      Tallenna
          </Button>
        </div>
        <TextField
          label="Uuden linkin nimi"
          variant="outlined"
          value={newLink.name}
          onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
          style={{ marginBottom: '20px' }}
          InputProps={{
            style: { backgroundColor: 'white' },
          }}
        />
        <TextField
          label="Uuden linkin kuvaus"
          variant="outlined"
          value={newLink.description}
          onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
          style={{ marginBottom: '20px' }}
          InputProps={{
            style: { backgroundColor: 'white' },
          }}
        />
        <TextField
          label="Uuden linkin URL"
          variant="outlined"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          style={{ marginBottom: '20px' }}
          InputProps={{
            style: { backgroundColor: 'white' },
          }}
        />
        <div style={{ order: 1 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddLink}
            style={{ backgroundColor: '#00000', marginBottom: '20px' }}
          >
      Lisää uusi linkki
          </Button>
        </div>
        <SaveConfirm open={openSaveConfirm} onClose={() => setOpenSaveConfirm(false)} />
        <SaveError open={hasError} onClose={() => setHasError(false)} />
      </div>
    </div>
  )
}

export default EditLinks
