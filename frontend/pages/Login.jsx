import { Box, List, ListItem, Typography, Container, Grid } from '@mui/material'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import CustomBox from '../components/CustomBox'
import LoginButton from '../components/LoginButton'

const Login = () => {
  return (
    <Grid>
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
              <Typography sx={{ pb: 3, mt: 2, fontFamily: '"Lato", sans-serif' }} variant='h3'>
                Kirjaudu sisään muokkaussivulle<br />
                (vain ylläpitäjät)
              </Typography>
              <List>
                <ListItem>
                  <LoginButton backgroundColor='#fff'
                    color='#00011b'
                    buttonText='HY-kirjautuminen'
                    href='/api/oidc'
                  />
                </ListItem>
              </List>
            </Box>
          </CustomBox>
        </Container>
      </Box>
    </Grid>
  )
}

export default Login
