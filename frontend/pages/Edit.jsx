import { Box, List, ListItem, Typography, Container } from '@mui/material'
import useAdminCheck from '../hooks/useAdminCheck'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import EditObject from '../components/EditObject'
import CustomBox from '../components/CustomBox'

const Edit = () => {
  const { isAdmin, loading, error } = useAdminCheck()

  if (loading) {
    return <div>Ladataan sivua...</div>
  }

  if (!isAdmin) {
    return <div>Käyttö estetty</div>
  }

  if (error) {
    return <div>Virhe käyttäjän oikeuksien tarkistuksessa</div>
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
              <Typography sx={{ pb: 3 }} variant='h3'>Muokkaus sivu</Typography>
              <List>
                <ListItem>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <EditObject
                      backgroundColor='#fff'
                      color='#00011b'
                      buttonText='Muokkaa linkkejä'
                      href='/edit/links'
                    />
                    <div style={{ marginBottom: '10px' }}></div>
                    <EditObject
                      backgroundColor='#fff'
                      color='#00011b'
                      buttonText='Muokkaa väittämiä'
                      href='/edit/statements'
                    />
                    <div style={{ marginBottom: '10px' }}></div>
                    <EditObject
                      backgroundColor='#fff'
                      color='#00011b'
                      buttonText='Muokkaa analyyseja'
                      href='/edit/results'
                    />
                  </div>
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