import { Box, Typography, List, ListItemText, Container } from '@mui/material'
import GoToTestButton from '../components/GoToTestButton'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import CustomBox from '../components/CustomBox'
import SchoolIcon from '@mui/icons-material/School'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'

const Home = () => {
  const isMobile = window.innerWidth <= 480
  const backgroundStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  }

  return (
    <Box sx={{ flex: '1' }}>
      {isMobile ? (
        <img src={monochromeBackground} alt="background"
          style={backgroundStyle} />
      ) : (
        <picture>
          <source media="(max-width: 1280px), (max-height: 720px)" srcSet={monochromeBackground} />
          <img src={homeBackground} alt="background"
            style={backgroundStyle} />
        </picture>)}
      <Container>
        <CustomBox>
          <Box sx={{ flex: '1' }}>
            <Typography
              variant='body2'
              sx={{ fontSize: '20px', fontFamily: '"Lato", sans-serif', color: '#00011b', fontWeight: '500', mb: 2, mt: 5.2, ml: 2 }}>
                Tämän testin avulla voit arvioida osaamistasi tieteellisen tekstin kirjoittajana.<br />
                Testissä on väitteitä seuraavilta kirjoittamisen osa-alueilta:
            </Typography>
            <List
              variant='body2'
              sx={{ flex: '1', fontSize: '20px', fontFamily: '"Lato", sans-serif', color: '#00011b', fontWeight: '500', mb: 2, mt: 0.5, ml: 2 }}>
              <ListItem><ListItemIcon sx={{ color: '#00011b' }}><SchoolIcon /></ListItemIcon><ListItemText primary='Kirjoittamiseen liittyvät tunteet ja ajatukset' /> </ListItem>
              <ListItem><ListItemIcon sx={{ color: '#00011b' }}><SchoolIcon /></ListItemIcon><ListItemText primary='Akateemiset käytänteet ja tekstilajit' /> </ListItem>
              <ListItem><ListItemIcon sx={{ color: '#00011b' }}><SchoolIcon /></ListItemIcon><ListItemText primary='Lukeminen ja lähteiden käyttö' /> </ListItem>
              <ListItem><ListItemIcon sx={{ color: '#00011b' }}><SchoolIcon /></ListItemIcon><ListItemText primary='Kirjoittaminen prosessina' /> </ListItem>
              <ListItem><ListItemIcon sx={{ color: '#00011b' }}><SchoolIcon /></ListItemIcon><ListItemText primary='Tekstin rakenne' /> </ListItem>
              <ListItem><ListItemIcon sx={{ color: '#00011b' }}><SchoolIcon /></ListItemIcon><ListItemText primary='Kielelliset seikat' /> </ListItem>
            </List>
            <GoToTestButton
              backgroundColor='#fff'
              color='#00011b'
              buttonText='Testiin!'
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  )
}

export default Home