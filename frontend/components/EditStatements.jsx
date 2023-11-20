import { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import '../assets/EditLinks.css'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import useAdminCheck from '../hooks/useAdminCheck'
import getPositiveStatements from '../functions/PositiveStatements'
import getNegativeStatements from '../functions/NegativeStatements'
import SaveConfirm from './SaveConfirm'
import SaveError from './SaveError'

const baseUrl = '/api/statements'

const EditStatements = () => {
  const [statementSets, setStatementSets] = useState([])
  const [openSaveConfirm, setOpenSaveConfirm] = useState(false)
  const [hasError, setHasError] = useState(false)

  const positiveStatements = getPositiveStatements(statementSets)
  const negativeStatements = getNegativeStatements(statementSets)

  /**
   * Fetch statements from the backend when the component is mounted.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl)
        setStatementSets(response.data)
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
   * Update the name of the statement with the given id.
   */
  const handleStatementChange = (setId, statementId, newStatement) => {
    const updatedStatements = statementSets.map((statementSet) =>
      statementSet._id === setId
        ?
        { ...statementSet, statements: statementSet.statements.map((statement) => statement.id === statementId ? { ...statement, statement: newStatement } : statement) }
        : statementSet
    )
    setStatementSets(updatedStatements)
  }

  /**
   * Save the updated statements to the backend.
   */
  const handleSaveClick = async () => {

    try {
      //throw new Error('Simulated error')
      // Update links on the backend
      await axios.put(baseUrl, statementSets, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setOpenSaveConfirm(true)
      ///navigate('/edit')
    } catch (error) {
      setHasError(true)
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
        <h1 style={{ fontSize: '34px', fontWeight: 'bold', marginBottom: '20px', fontFamily: '"Lato", sans-serif' }}>Muokkaa väittämiä</h1>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '40px', fontFamily: '"Lato", sans-serif', color: 'darkgreen' }}>Positiiviset väittämät</h1>

        {positiveStatements.map((statementSet) => {
          return(
            <div key={statementSet.category}>
              <Accordion key={statementSet.id} style={{
                marginBottom: '20px',
                backgroundColor: '#f8f8f8',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: 'none',
              }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                  <Typography>{statementSet.category}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                  {statementSet.statements.map((statement, index) => {
                    return(
                      <TextField
                        key={statement.id}
                        id={`statement-${index+1}`}
                        label={`Väite ${index+1}`}
                        variant="outlined"
                        value={statement.statement}
                        onChange={(e) => handleStatementChange(statementSet._id, statement.id, e.target.value)}
                        style={{ marginBottom: '20px' }}
                      />
                    )
                  })}
                </AccordionDetails>
              </Accordion>
            </div>
          )
        })}

        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '40px', marginTop: '40px', fontFamily: '"Lato", sans-serif', color: 'darkred' }}>Negatiiviset väittämät</h1>
        {negativeStatements.map((statementSet) => {
          return(
            <div key={statementSet.category}>
              <Accordion key={statementSet.id} style={{
                marginBottom: '20px',
                backgroundColor: '#f8f8f8',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: 'none',
              }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                  <Typography>{statementSet.category}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                  {statementSet.statements.map((statement, index) => {
                    return(
                      <TextField
                        key={statement.id}
                        id={`statement-${index+1}`}
                        label={`Väite ${index+1}`}
                        variant="outlined"
                        value={statement.statement}
                        onChange={(e) => handleStatementChange(statementSet._id, statement.id, e.target.value)}
                        style={{ marginBottom: '20px' }}
                      />
                    )
                  })}
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

export default EditStatements
