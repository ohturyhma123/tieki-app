import { Box, Container, Typography } from '@mui/material'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import CustomBox from './CustomBox'
import LoginButton from './LoginButton'

const NotAdminLogout = () => {
  const backgroundStyle = {
    maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%',
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1
  }
  return (
    <div>
      <Box sx={{ flex: '1' }}>
        <picture>
          <source media="(max-width: 1200px), (max-height: 700px)" srcSet={monochromeBackground} />
          <img
            src={homeBackground}
            alt="homeBackground"
            style={backgroundStyle}
          />
        </picture>
        <Container>
          <CustomBox>
            <Box sx={{ flex: '1' }}>
              <Typography sx={{ pb: 3, fontFamily: '"Lato", sans-serif', color: '#00011b' }} variant='h3'>Tämä sivu on vain ylläpitäjille</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}></Box>
              <LoginButton backgroundColor='#fff'
                color='#00011b'
                buttonText='Kirjaudu ulos'
                href='/api/logout'
              />
            </Box>
          </CustomBox>
        </Container>
      </Box>
    </div>
  )
}

export default NotAdminLogout