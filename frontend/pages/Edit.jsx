import { Box, List, ListItem, Typography, Container } from '@mui/material'
import useAdminCheck from '../hooks/useAdminCheck'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import EditObject from '../components/EditObject'
import LoginButton from '../components/LoginButton'
import CustomBox from '../components/CustomBox'
import LoadingScreen from '../components/LoadingScreen'
import LoadingError from '../components/LoadingError'
import NotAdminLogout from '../components/NotAdminLogout'

const Edit = () => {
  const { isAdmin, loading, error } = useAdminCheck()

  if (loading) {
    return <LoadingScreen/>
  }

  if (!isAdmin) {
    return <NotAdminLogout/>
  }

  if (error) {
    return <LoadingError errorMessage={'Virhe käyttäjän oikeuksien tarkistuksessa'}/>
  }

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
              <Typography sx={{ pb: 3 }} variant='h3'>Muokkaussivu</Typography>
              <List>
                <ListItem>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <EditObject
                      backgroundColor='#fff'
                      color='#00011b'
                      buttonText='Muokkaa linkkejä'
                      href='/edit/links'
                    />
                    <Box sx={{ marginBottom: '10px' }} />
                    <EditObject
                      backgroundColor='#fff'
                      color='#00011b'
                      buttonText='Muokkaa väittämiä'
                      href='/edit/statements'
                    />
                    <Box sx={{ marginBottom: '10px' }} />
                    <EditObject
                      backgroundColor='#fff'
                      color='#00011b'
                      buttonText='Muokkaa analyyseja'
                      href='/edit/results'
                    />
                    <Box sx={{ marginBottom: '10px' }} />
                    <LoginButton backgroundColor='#fff'
                      color='#00011b'
                      buttonText='Kirjaudu ulos'
                      href='/api/logout'
                    />
                  </Box>
                </ListItem>
              </List>
            </Box>
          </CustomBox>
        </Container>
      </Box>
    </div>
  )
}

export default Edit