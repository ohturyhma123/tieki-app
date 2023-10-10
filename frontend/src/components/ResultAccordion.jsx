import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ResultAccordion = ({ result }) => {

  return (

    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: 'lightblue'
        }}
      >
        <Typography variant='h5'>{result.category}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {result.textSegments.map((result) => <Typography key={result} paragraph>{result}</Typography>)}
        <ul>
          {result.listPoints.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        {result.links.map((link, index) => {
          return(
            <div key={index}>
              <Typography>{link.description}</Typography>
              <a className="link" href={link.link}>{link.link}</a>
            </div>
          )
        })}
      </AccordionDetails>
    </Accordion>
  )
}

export default ResultAccordion