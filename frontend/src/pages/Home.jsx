import { Box, Typography, List, ListItemText, Container } from '@mui/material'
import LargeButton from '../components/LargeButton'
import homeBackground from '../assets/home-background.jpg'
import smallHomeBackground from '../assets/small-home-background.jpg'
import CustomBox from '../components/CustomBox'

const Home = () => {
  return (
    <Box sx={{ flex: '1' }}>
      <picture>
        <source media="(max-width: 960px)" srcSet={smallHomeBackground} />
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
            <Typography
              variant='body2'
              sx={{ fontSize: '20px', fontFamily: '"Lato", sans-serif', color: '#000336', fontWeight: '500', mb: 2, mt: 5.2, ml: 2 }}>
                Tämän testin avulla voit arvioida osaamistasi tieteellisen tekstin kirjoittajana.<br />
                Testissä on väitteitä seuraavilta kirjoittamisen osa-alueilta:
              <List sx={{ mt: 0.5, ml: 0.2 }}>
                <ListItemText primary="Kirjoittamiseen liittyvät tunteet ja ajatukset" />
                <ListItemText primary="Akateemiset käytänteet ja tekstilajit" />
                <ListItemText primary="Lukeminen ja lähteiden käyttö" />
                <ListItemText primary="Kirjoittaminen prosessina" />
                <ListItemText primary="Tekstin rakenne" />
                <ListItemText primary="Kielelliset seikat" />
              </List>
            </Typography>
            <LargeButton
              backgroundColor='#fff'
              color='#001220'
              buttonText='Testiin!'
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  )
}

export default Home