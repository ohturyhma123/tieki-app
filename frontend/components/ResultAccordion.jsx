import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link, List, ListItem } from '@mui/material'

const ResultAccordion = ({ result, color, index }) => {

  const analysisId = `analysis${index}`

  return (
    <Accordion sx={{ borderRadius: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          backgroundColor: color,
          borderRadius: 2,
          py: 1,
          px: 2,
        }}
      >
        <Typography sx={{ fontFamily: '"Lato", sans-serif' }} variant='h5' className={analysisId}>{result.category}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 2, backgroundColor: 'silk' }}>
        {result.textSegments.map((result) => <Typography variant='body1' key={result} paragraph>{result}</Typography>)}
        <List sx = {{
          listStyleType: 'disc',
          pl: 4
        }}>
          {result.listPoints.map((item, index) => <ListItem sx={{ pl: 0, display: 'list-item' }} key={index}><Typography variant='body1'>{item}</Typography></ListItem>)}
        </List>
        {result.links.map((link, index) => {
          return(
            <div key={index}>
              <Typography variant='body1'>{link.description}</Typography>
              <Link sx={{ overflowWrap: 'break-word' }} variant='body1' className="link" href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</Link>
            </div>
          )
        })}
      </AccordionDetails>
    </Accordion>
  )
}

export default ResultAccordion