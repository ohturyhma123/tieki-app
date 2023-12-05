import { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import '../assets/EditLinks.css'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import useAdminCheck from '../hooks/useAdminCheck'
import SaveConfirm from './SaveConfirm'
import SaveError from './SaveError'
import LoadingScreen from './LoadingScreen'
import LoadingError from './LoadingError'
import NotAdmin from './NotAdmin'

const baseUrl = '/api/results'

const EditResults = () => {
  const [results, setResults] = useState([])

  const positiveResults = results.filter((result) => result.positive === true)
  const negativeResults = results.filter((result) => result.positive === false)
  const [openSaveConfirm, setOpenSaveConfirm] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [newLinkDescription, setNewLinkDescription] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')


  /**
   * Fetch results from the backend when the component is mounted.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        setResults(response.data)
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
   * Update the textsegment with the given id.
   */
  const handleTextSegmentChange = (setId, textSegmentId, newtextSegment) => {

    const updatedResult = results.filter((result) => result._id === setId)
    updatedResult[0].textSegments[textSegmentId] = newtextSegment

    const updatedResults = results.map((result) =>
      result._id === setId
        ? updatedResult[0]
        : result
    )

    setResults(updatedResults)
  }

  const handleListPointChange = (setId, listPointId, newlistPoint) => {

    const updatedResult = results.filter((result) => result._id === setId)
    updatedResult[0].listPoints[listPointId] = newlistPoint

    const updatedResults = results.map((result) =>
      result._id === setId
        ? updatedResult[0]
        : result
    )

    setResults(updatedResults)
  }

  const handleLinkDescriptionChange = (setId, linkId, newLink) => {

    const updatedResult = results.filter((result) => result._id === setId)
    updatedResult[0].links[linkId].description = newLink

    const updatedResults = results.map((result) =>
      result._id === setId
        ? updatedResult[0]
        : result
    )

    setResults(updatedResults)
  }

  const handleLinkChange = (setId, linkId, newLink) => {

    const updatedResult = results.filter((result) => result._id === setId)
    updatedResult[0].links[linkId].link = newLink

    const updatedResults = results.map((result) =>
      result._id === setId
        ? updatedResult[0]
        : result
    )

    setResults(updatedResults)
  }

  /**
   * Save the updated results to the backend.
   */
  const handleSaveClick = async () => {
    try {
      // Update results on the backend
      await axios.put(baseUrl, results, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setOpenSaveConfirm(true)
    } catch (error) {
      setHasError(true)
    }
  }

  const handleAddLink = async (resultId) => {
    // Check if the input is empty
    if (!newLinkDescription || !newLinkUrl) {
      setHasError(true)
      return
    }

    // Create a new link object
    const newLink = {
      description: newLinkDescription,
      link: newLinkUrl,
    }

    try {
      // Make a POST request to the server
      const response = await fetch(`/api/results/${resultId}/links`, { // Modify this line as needed to get the correct result id
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLink),
      })

      // Check if the request was successful
      if (response.ok) {
        // Get the updated result from the response
        const updatedResult = await response.json()

        // Update the state
        const resultsCopy = [...results]
        const resultIndex = resultsCopy.findIndex(result => result.id === updatedResult.result.id)
        resultsCopy[resultIndex] = updatedResult.result
        setResults(resultsCopy)

        // Clear the input fields
        setNewLinkDescription('')
        setNewLinkUrl('')
      } else {
        setHasError(true)
      }
    } catch (error) {
      setHasError(true)
    }
  }

  const handleDeleteClick = async (resultId, linkId) => {
    try {
      // Make a DELETE request to the server
      const response = await fetch(`${baseUrl}/${resultId}/links/${linkId}`, {
        method: 'DELETE',
      })
      // Check if the request was successful
      if (response.ok) {
        // Get the updated results
        const resultsCopy = [...results]
        // Find the result that contains the link with the given id
        const result = resultsCopy.find(result =>
          result.id === resultId
        )
        // Check if result is defined
        if (result) {
          // Find the index of the link with the given id
          const linkIndex = result.links.findIndex(link => link.id === linkId)

          // Delete the link at the given index
          if (linkIndex !== -1) {
            result.links.splice(linkIndex, 1)
          }
          // Update the state
          setResults(resultsCopy)
        }
      } else {
        setHasError(true)
      }
    } catch (error) {
      setHasError(true)
    }
  }

  const { isAdmin, loading, error } = useAdminCheck()

  if (loading) {
    return <LoadingScreen/>
  }

  if (!isAdmin) {
    return <NotAdmin/>
  }

  if (error) {
    return <LoadingError errorMessage={'Virhe käyttäjän oikeuksien tarkistuksessa'}/>
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
        <h1 style={{ fontSize: '34px', fontWeight: 'bold', marginBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Muokkaa analyyseja</h1>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '40px', fontFamily: '"Lato", sans-serif', color: 'darkgreen' }}>Positiiviset analyysit</h1>

        {positiveResults.map((results) => {
          return(
            <div key={results.category}>
              <Accordion style={{
                marginBottom: '20px',
                backgroundColor: '#f8f8f8',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: 'none',
              }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                  <Typography>{results.category}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                  <Accordion style={{
                    marginBottom: '20px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: 'none',
                  }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                      <Typography>Teksti segmentit</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                      {results.textSegments.map((result, index) => {
                        return(
                          <TextField
                            key={index}
                            id={`${results._id}`}
                            label={`Teksti segmentti ${index+1}`}
                            variant="outlined"
                            value={result}
                            onChange={(e) => handleTextSegmentChange(results._id, index, e.target.value)}
                            style={{ marginBottom: '20px' }}
                          />
                        )
                      })}
                    </AccordionDetails>
                  </Accordion>
                  <p>Huom! Muista lisätä HTTP- tai HTTPS-protokolla (http:// tai https://) linkin url-osoitteen alkuun, jotta linkki toimii oikein.</p>
                  <Accordion style={{
                    marginBottom: '20px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: 'none',
                  }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                      <Typography>Linkit</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                      {(results.links)
                        ?
                        results.links.map((result, index) => {
                          return(
                            <div key={index} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                              <TextField
                                id={'linkinkuvaus'}
                                label={`Linkin kuvaus ${index+1}`}
                                variant="outlined"
                                value={result.description}
                                onChange={(e) => handleLinkDescriptionChange(results._id, index, e.target.value)}
                                style={{ marginBottom: '20px' }}
                              />
                              <TextField
                                id={`${results._id}`}
                                label={`Linkki ${index+1}`}
                                variant="outlined"
                                value={result.link}
                                onChange={(e) => handleLinkChange(results._id, index, e.target.value)}
                                style={{ marginBottom: '20px' }}
                              />
                              <Button
                                id={'poistonappi'}
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDeleteClick(results.id, result.id)}
                                style={{ marginBottom: '20px' }}
                              >
                                Poista linkki
                              </Button>
                            </div>
                          )
                        })
                        : null
                      }
                    </AccordionDetails>
                    <AccordionDetails>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <TextField
                          id="linkdesc"
                          label="Linkin kuvaus"
                          variant="outlined"
                          value={newLinkDescription}
                          onChange={(e) => setNewLinkDescription(e.target.value)}
                          style={{ marginBottom: '20px' }}
                        />
                        <TextField
                          id="linkurl"
                          label="Linkki"
                          variant="outlined"
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                          style={{ marginBottom: '20px' }}
                        />
                        <Button
                          id='addlink'
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddLink(results.id)}
                          style={{ marginBottom: '20px' }}
                        >
                              Lisää linkki
                        </Button>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            </div>
          )
        })}

        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '40px', marginTop: '40px', fontFamily: '"Lato", sans-serif', color: 'darkred' }}>Negatiiviset analyysit</h1>
        {negativeResults.map((results) => {
          return(
            <div key={results.category}>
              <Accordion style={{
                marginBottom: '20px',
                backgroundColor: '#f8f8f8',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: 'none',
              }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                  <Typography>{results.category}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                  <Accordion style={{
                    marginBottom: '20px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: 'none',
                  }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                      <Typography>Teksti segmentit</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                      {results.textSegments.map((result, index) => {
                        return(
                          <TextField
                            key={index}
                            id={`${results._id}`}
                            label={`Teksti segmentti ${index+1}`}
                            variant="outlined"
                            value={result}
                            onChange={(e) => handleTextSegmentChange(results._id, index, e.target.value)}
                            style={{ marginBottom: '20px' }}
                          />
                        )
                      })}
                    </AccordionDetails>
                  </Accordion>
                  <Accordion style={{
                    marginBottom: '20px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: 'none',
                  }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                      <Typography>Listan kohdat</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                      {(results.listPoints)
                        ?
                        results.listPoints.map((result, index) => {
                          return(
                            <TextField
                              key={index+12}
                              id={`${results._id}`}
                              label={`Listan kohta ${index+1}`}
                              variant="outlined"
                              value={result}
                              onChange={(e) => handleListPointChange(results._id, index, e.target.value)}
                              style={{ marginBottom: '20px' }}
                            />
                          )
                        })
                        : null
                      }
                    </AccordionDetails>
                  </Accordion>
                  <p>Huom! Muista lisätä HTTP- tai HTTPS-protokolla (http:// tai https://) linkin url-osoitteen alkuun, jotta linkki toimii oikein.</p>
                  <Accordion style={{
                    marginBottom: '20px',
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: 'none',
                  }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                      <Typography>Linkit</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                      {(results.links)
                        ?
                        results.links.map((result, index) => {
                          return(
                            <div key={index+24} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                              <TextField
                                id={`${results._id}`}
                                label={`Linkin kuvaus ${index+1}`}
                                variant="outlined"
                                value={result.description}
                                onChange={(e) => handleLinkDescriptionChange(results._id, index, e.target.value)}
                                style={{ marginBottom: '20px' }}
                              />
                              <TextField
                                id={`${results._id}`}
                                label={`Linkki ${index+1}`}
                                variant="outlined"
                                value={result.link}
                                onChange={(e) => handleLinkChange(results._id, index, e.target.value)}
                                style={{ marginBottom: '20px' }}
                              />
                              <Button
                                id={`delete-${index}`}
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDeleteClick(results.id, result.id)}
                                style={{ marginBottom: '20px' }}
                              >
                                Poista
                              </Button>
                            </div>
                          )
                        })
                        : null
                      }
                    </AccordionDetails>
                    <AccordionDetails>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <TextField
                          label="Linkin kuvaus"
                          variant="outlined"
                          value={newLinkDescription}
                          onChange={(e) => setNewLinkDescription(e.target.value)}
                          style={{ marginBottom: '20px' }}
                        />
                        <TextField
                          label="Linkki"
                          variant="outlined"
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                          style={{ marginBottom: '20px' }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddLink(results.id)}
                          style={{ marginBottom: '20px' }}
                        >
                              Lisää linkki
                        </Button>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            </div>
          )
        })}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveClick}
          style={{ backgroundColor: '#00000', marginBottom: '20px' }}
        >
          Tallenna
        </Button>
        <SaveConfirm open={openSaveConfirm} onClose={() => setOpenSaveConfirm(false)} />
        <SaveError open={hasError} onClose={() => setHasError(false)} />
      </div>
    </div>
  )
}

export default EditResults
