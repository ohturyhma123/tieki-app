import { Box, List, ListItem, Typography, Container, CircularProgress, Grid } from '@mui/material'
import useAdminCheck from '../hooks/useAdminCheck'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import EditObject from '../components/EditObject'
import CustomBox from '../components/CustomBox'

const Edit = () => {
  const { isAdmin, loading, error } = useAdminCheck()

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <picture>
          <source media="(max-width: 1200px), (max-height: 700px)" srcSet={monochromeBackground} />
          <img
            src={homeBackground}
            alt="homeBackground"
            style={{ maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: 0, left: 0, right: 0,
              width: '100%', height: '100%', zIndex: -1 }}
          />
        </picture>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress sx={{ mr: 2 }} />
          <Typography>Ladataan sivua...</Typography>
        </Box>
      </Grid>
    )
  }

  if (!isAdmin) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <picture>
          <source media="(max-width: 1200px), (max-height: 700px)" srcSet={monochromeBackground} />
          <img
            src={homeBackground}
            alt="homeBackground"
            style={{ maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: 0, left: 0, right: 0,
              width: '100%', height: '100%', zIndex: -1 }}
          />
        </picture>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Tämä sivu on vain ylläpitäjille</Typography>
        </Box>
      </Grid>
    )
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <picture>
          <source media="(max-width: 1200px), (max-height: 700px)" srcSet={monochromeBackground} />
          <img
            src={homeBackground}
            alt="homeBackground"
            style={{ maxWidth: '100%', maxHeight: '100%', position: 'absolute', top: 0, left: 0, right: 0,
              width: '100%', height: '100%', zIndex: -1 }}
          />
        </picture>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>Virhe käyttäjän oikeuksien tarkistuksessa</Typography>
        </Box>
      </Grid>
    )
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
                    />
                    <Box sx={{ marginBottom: '10px' }} />
                    <EditObject
                      backgroundColor='#fff'
                      color='#00011b'
                      buttonText='Muokkaa analyyseja'
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