import { Box, Grid, Typography } from '@mui/material'
import monochromeBackground from '../assets/monochrome-background.jpg'

const LoadingError = ({ errorMessage }) => {
  const backgroundStyle = {
    maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%',
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1
  }
  return (
    <Grid container justifyContent="center" alignItems="center" style={backgroundStyle}>
      <img
        src={monochromeBackground}
        alt="monochromeBackground"
        style={backgroundStyle}
      />
      <Box sx={{ p: 5 }}>
        <Typography sx={{ fontSize: 17, fontFamily: '"Lato", sans-serif', color: '#00011b' }}>{errorMessage || 'Virhe'}</Typography>
      </Box>
    </Grid>
  )
}

export default LoadingError