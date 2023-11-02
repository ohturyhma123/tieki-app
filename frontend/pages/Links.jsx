import { Box, Link, List, ListItem, Typography, Grid } from '@mui/material'
import useApi from '../hooks/useApi'

const Links = () => {
  const { data: links, loading, error } = useApi('/api/links')

  if (loading) {
    return <div>Ladataan sivua...</div>
  }

  if (!links) {
    return <div>Ladataan linkkejä...</div>
  }

  if (error) {
    return <div>Virhe linkkien lataamisessa</div>
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
