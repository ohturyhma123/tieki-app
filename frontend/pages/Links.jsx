import React from 'react'
import { Box, Link, List, ListItem, Typography, Grid, CircularProgress, Container, Paper } from '@mui/material'
import useApi from '../hooks/useApi'
import monochromeBackground from '../assets/monochrome-background.jpg'

const Links = () => {
  const { data: links, loading, error } = useApi('/api/links')

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress sx={{ mr: 2 }} />
          <Typography>Ladataan sivua...</Typography>
        </Box>
      </Grid>
    )
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <Box sx={{ p: 5 }}>
          <Typography>Virhe linkkien lataamisessa</Typography>
        </Box>
      </Grid>
    )
  }

  const formatLinkText = (text) => {
    // Check if the text ends with punctuation other than ? and remove it
    if (text.endsWith('.' || ',' || ':' || ';')) {
      text = text.slice(0, -1)
    }

    // Insert line break every 275 characters
    const chunks = text.match(/.{1,275}(\s|$)/g)
    if (chunks) {
      return chunks.map((chunk, index, array) => (
        <React.Fragment key={index}>
          {index < array.length - 1 ? (
            <>
              {chunk}<br />
            </>
          ) : (
            chunk
          )}
        </React.Fragment>
      ))
    }
    return text
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
        <Paper sx={{ m: -1, mt: 4, mb: 4, p: 3, pb: 5, background: '#FCF8F4' }} variant='elevation' elevation={10}>
          <Typography sx={{ textAlign: 'center', fontFamily: '"Lato", sans-serif', color: '#00011b', mb: 5, mt: 0.5 }} variant='h3'>Hyödyllisiä linkkejä</Typography>
          <List>
            {links.map((link, index) => (
              <ListItem key={index} id={`${index + 1}`}>
                {/** If either description or name length is over 180 chars,
                 reduce font size and insert appropriate line breaks via formatLinkText function
                */}
                {(link.description.length > 180 || link.name.length > 180) ? (
                  <Typography sx={{ fontSize: 12, fontFamily: '"Lato", sans-serif', color: '#00011b' }}>
                    {formatLinkText(link.description)}:
                    <Link sx={{ pl: 0.5 }} href={link.url} target="_blank" rel="noopener noreferrer">
                      <br />{formatLinkText(link.name)}
                    </Link>
                  </Typography>
                ) : (
                  <Typography sx={{ fontFamily: '"Lato", sans-serif', color: '#00011b' }}>
                    {formatLinkText(link.description)}:
                    {/** If description and name length sum is 175 chars or less, don't insert a line break */}
                    {((link.description + link.name).length) <= 175 ? (
                      <>
                        <Link sx={{ pl: 0.5 }} href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.name}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link sx={{ pl: 0.5 }} href={link.url} target="_blank" rel="noopener noreferrer">
                          <br />{link.name}
                        </Link>
                      </>
                    )}
                  </Typography>
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
