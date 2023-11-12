import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import '../assets/EditLinks.css'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import useAdminCheck from '../hooks/useAdminCheck'

const baseUrl = '/api/results'

const EditResults = () => {
  const [results, setResults] = useState([])

  const positiveResults = results.filter((result) => result.positive === true)
  const negativeResults = results.filter((result) => result.positive === false)

  const navigate = useNavigate()

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
      navigate('/edit')
    } catch (error) {
      throw new Error('Failed to save data')
    }
  }

  const { isAdmin, loading, error } = useAdminCheck()

  if (loading) {
    return <div>Ladataan sivua...</div>
  }

  if (!isAdmin) {
    return <div>Käyttö estetty</div>
  }

  if (error) {
    return <div>Virhe käyttäjän oikeuksien tarkistuksessa</div>
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
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '40px', fontFamily: '"Lato", sans-serif', color: "darkgreen" }}>Positiiviset analyysit</h1>

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
                            <div key={index}>
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
                            </div>
                          )
                        })
                        : null
                      }
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            </div>
          )
        })}

        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '40px', marginTop: '40px', fontFamily: '"Lato", sans-serif', color: "darkred" }}>Negatiiviset analyysit</h1>
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
                            <div key={index+24}>
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
                            </div>
                          )
                        })
                        : null
                      }
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
      </div>
    </div>
  )
}

export default EditResults
