import { Box, styled, Typography, List, ListItemText, Container } from '@mui/material'
import LargeButton from '../components/LargeButton'
import homeBackground from '../assets/home-background.jpg'
import CustomBox from '../components/CustomBox'

const Home = () => {
  const Title = styled(Typography)(({ theme }) => ({
    fontFamily: '"Lato", sans-serif',
    fontSize: '74px',
    color: '#000336',
    fontWeight: 'bold',
    margin: theme.spacing(4.4, 0, 2.5, 1.2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '40px',
      margin: theme.spacing(1, 0, -2, 2)
    }
  }))

  return (
    <Box sx={{ flex: '1' }}>
      <img
        src={homeBackground}
        alt="homeBackground"
        style={{ maxWidth: '100%', position: 'absolute', top: 75, left: 0, right: 0,
          height: 'calc(100vh - 75px)', zIndex: -1 }}
      />
      <Container>
        <CustomBox>
          <Box sx={{ flex: '1' }}>
            <Title variant='h1'>
              Tieteellisen kirjoittamisen itsearviointitesti
            </Title>
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