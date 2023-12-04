import { Link, List, ListItem, Typography, Grid, Container, Paper } from '@mui/material'
import useApi from '../hooks/useApi'
import monochromeBackground from '../assets/monochrome-background.jpg'
import LoadingScreen from '../components/LoadingScreen'
import LoadingError from '../components/LoadingError'

const Links = () => {
  const { data: links, loading, error } = useApi('/api/links')
  const isMobile = window.innerWidth <= 480

  if (loading) {
    return <LoadingScreen/>
  }

  if (error) {
    return <LoadingError errorMessage={'Virhe linkkien lataamisessa'}/>
  }

  const formatLinkText = (text) => {
    /** Remove whitespace from the beginning and the end of text. */
    const trimmed = text.trim()
    /** Check if the text ends with punctuation other than ? and remove it. */
    return trimmed.replace(/[.,:;]$/, '')
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <img
        src={monochromeBackground}
        alt="monochrome background"
        style={{ maxWidth: '100%', position: 'fixed', top: 0, left: 0, right: 0,
          width: '100%', height: '100%', zIndex: -1 }}
      />
      <Container maxWidth='xl'>
        <Paper sx={{ m: isMobile ? 0 : -1, mt: 4, mb: 4, p: isMobile ? 2 : 3, pb: 5, background: '#FCF8F4' }}
          variant='elevation' elevation={10}>
          <Typography sx={{ textAlign: 'center', fontFamily: '"Lato", sans-serif', color: '#00011b', mb: isMobile ? 3 : 5, mt: 0.5 }}
            variant='h3'>Hyödyllisiä linkkejä</Typography>
          <List>
            {links.map((link, index) => (
              <ListItem key={index} id={`${index + 1}`}>
                {/** Handle line breaks for mobile UI. */}
                {isMobile ? (
                  <Typography sx={{ fontSize: 14, fontFamily: '"Lato", sans-serif', color: '#00011b' }}>
                    {formatLinkText(link.description).slice(-1) === '?' ?
                      formatLinkText(link.description) :
                      formatLinkText(link.description) + ':'}
                    <Link sx={{ pl: 0.5 }} href={link.url} target="_blank" rel="noopener noreferrer">
                      {(link.description + link.name).length <= 60 && (link.description + link.name).length >= 35 ? (
                        <><br />{link.name}</>
                      ) : (
                        <>{link.name}</>
                      )}
                    </Link>
                  </Typography>
                  /** End of the code for mobile UI, start of desktop UI code. */
                ) : (
                  /** Reduce font size if either description or name length is over 180 chars. */
                  (link.description.length > 180 || link.name.length > 180) ? (
                    <Typography sx={{ fontSize: 12.5, fontFamily: '"Lato", sans-serif', color: '#00011b' }}>
                      {formatLinkText(link.description).slice(-1) === '?' ?
                        formatLinkText(link.description) :
                        formatLinkText(link.description) + ':'}
                      <Link sx={{ pl: 0.5 }} href={link.url} target="_blank" rel="noopener noreferrer">
                        <br />{link.name}
                      </Link>
                    </Typography>
                  ) : (
                    /** If description and name length sum is 175 chars or less, don't insert a line break (and vice versa). */
                    <Typography sx={{ fontFamily: '"Lato", sans-serif', color: '#00011b' }}>
                      {formatLinkText(link.description).slice(-1) === '?' ?
                        formatLinkText(link.description) :
                        formatLinkText(link.description) + ':'}
                      {((link.description + link.name).length) <= 175 ? (
                        <Link sx={{ pl: 0.5 }} href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.name}
                        </Link>
                      ) : (
                        <Link sx={{ pl: 0.5 }} href={link.url} target="_blank" rel="noopener noreferrer">
                          <br />{link.name}
                        </Link>
                      )}
                    </Typography>
                  )
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Grid>
  )
}

export default Links
