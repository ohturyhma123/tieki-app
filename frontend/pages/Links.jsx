import { Box, Link, List, ListItem, Typography, Grid, CircularProgress } from '@mui/material'
import useApi from '../hooks/useApi'

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
      return text.slice(0, -1)
    }
    return text
  }

  return (
    <Grid sx={{ background: '#FEF6E1' }} container direction="column" justifyContent="center" alignItems="center">
      <Box sx={{ p: 5 }}>
        <Typography sx={{ pb: 3 }} variant='h3'>Hyödyllisiä linkkejä</Typography>
        <List>
          {links.map((link, index) => (
            <ListItem key={index} id={`${index + 1}`}>
              <Typography>
                {formatLinkText(link.description)}:
                <Link sx={{ pl: 0.5 }} href={link.url} target="_blank" rel="noopener noreferrer">
                  ({link.name})
                </Link>
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Grid>
  )
}

export default Links
