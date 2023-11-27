import { Box, Grid, Typography } from '@mui/material'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'

const NotAdmin = () => {
  const backgroundStyle = {
    maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%',
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1
  }
  return (
    <Grid container justifyContent="center" alignItems="center" style={backgroundStyle}>
      <picture>
        <source media="(max-width: 1200px), (max-height: 700px)" srcSet={monochromeBackground} />
        <img
          src={homeBackground}
          alt="homeBackground"
          style={backgroundStyle}
        />
      </picture>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 17, fontFamily: '"Lato", sans-serif', color: '#00011b' }}>Tämä sivu on vain ylläpitäjille</Typography>
      </Box>
    </Grid>
  )
}

export default NotAdmin