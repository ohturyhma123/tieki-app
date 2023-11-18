import { Box, Typography, List, ListItemText, Container, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import GoToTestButton from '../components/GoToTestButton'
import homeBackground from '../assets/home-background.jpg'
import monochromeBackground from '../assets/monochrome-background.jpg'
import CustomBox from '../components/CustomBox'
import SchoolIcon from '@mui/icons-material/School'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemMobile from '../components/ListItemMobile'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Home = () => {
  const isMobile = window.innerWidth <= 480
  const backgroundStyle = {
    maxWidth: '100%', maxHeight: '100%', width: '100%', height: '100%',
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1
  }

  return (
    <Container>
      <CustomBox>
        {isMobile ? (
          <Box sx={{ flex: '1' }}>
            <img src={monochromeBackground} alt="monochrome background" style={backgroundStyle} />
            <Typography
              variant='body2'
              sx={{ fontSize: 17, fontFamily: '"Lato", sans-serif', color: '#00011b', fontWeight: '500', mb: 2, mt: 0.3, ml: 1.1 }}>
                Tämän testin avulla voit arvioida osaamistasi tieteellisen tekstin kirjoittajana.<p />
                Testissä on väitteitä seuraavilta kirjoittamisen osa-alueilta:
            </Typography>
            <List
              sx={{ flex: '1', mb: 3, mt: -1.75 }}>
              <ListItemMobile text='Kirjoittamiseen liittyvät tunteet ja ajatukset' />
              <ListItemMobile text='Akateemiset käytänteet ja tekstilajit' />
              <ListItemMobile text='Lukeminen ja lähteiden käyttö' />
              <ListItemMobile text='Kirjoittaminen prosessina' />
              <ListItemMobile text='Tekstin rakenne' />
              <ListItemMobile text='Kielelliset seikat' />
            </List>
            <Accordion sx={{ borderRadius: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ backgroundColor: '#eaf3e9', borderRadius: 0.5, px: 2 }}>
                <Typography
                  variant='body2'
                  sx={{ fontSize: 17, fontFamily: '"Lato", sans-serif', color: '#00011b' }}>
                    Ohjeita ja lisätietoa
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 2, backgroundColor: 'silk' }}>
                <Typography
                  variant='body2'
                  sx={{ fontSize: 15, fontFamily: '"Lato", sans-serif', color: '#00011b' }}>
                    Valitse joka sivulla 0-3 väitettä, jotka kuvaavat omaa tieteellisen tekstin kirjoittamistasi.
                    Liiku eteen- ja taaksepäin pyyhkäisemällä. Takaisin etusivulle pääsee logoa painamalla.<p />
                    Itsearviointitestin tekeminen vie aikaa noin 10 minuuttia. Testi on anonyymi.<p />
                    Lopuksi saat valitsemiesi väitteiden pohjalta koosteen kirjoittamisesi vahvuuksista ja kehittämiskohteista.
                    Kategoriat eivät ole toisiansa poissulkevia.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <GoToTestButton
              backgroundColor='#fff'
              color='#00011b'
              buttonText='Testiin!'
            />
          </Box>
        ) : (
          <Box sx={{ flex: '1' }}>
            <picture>
              <source media="(max-width: 1280px), (max-height: 720px)" srcSet={monochromeBackground} />
              <img src={homeBackground} alt="background with markers" style={backgroundStyle} />
              {/**
               Photo: Karolina Grabowska / Pexels
               License: "All photos and videos on Pexels are free to use. Attribution is not required. You can modify the photos and videos from Pexels."
              */}
            </picture>
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
          </Box>)}
      </CustomBox>
    </Container>
  )
}

export default Home