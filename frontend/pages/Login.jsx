import { Box, Link, List, ListItem, Typography, Container } from '@mui/material'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import CustomBox from '../components/CustomBox'

const Login = () => {

  return (
    <div>
      <Box sx={{ flex: '1' }}>
        <picture>
          <source media="(max-width: 1200px), (max-height: 700px)" srcSet={monochromeBackground} />
          <img
            src={homeBackground}
            alt="homeBackground"
            style={{ maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: 0, left: 0, right: 0,
              width: '100%', height: '100%', zIndex: -1 }}
          />
        </picture>
        <Container>
          <CustomBox>
            <Box sx={{ flex: '1' }}>
              <Typography sx={{ pb: 3 }} variant='h3'>Kirjaudu sisään (vain ylläpitäjät)</Typography>
              <Typography>
                <List>
                  <ListItem>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Link sx={{ pl: 0.5 }} href='/api/oidc'>HY-kirjautuminen</Link>
                      <div style={{ marginBottom: '10px' }}></div>
                      <Link sx={{ pl: 0.5 }} href="/api/logout">Kirjaudu ulos</Link>
                    </div>
                  </ListItem>
                </List>
              </Typography>
            </Box>
          </CustomBox>
        </Container>
      </Box>
    </div>
  )
}

export default Login
