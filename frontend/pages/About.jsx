import { Box, Container, Grid, Link, List, Paper, Typography } from '@mui/material'
import monochromeBackground from '../assets/monochrome-background.jpg'
import ListItemDesktopAbout from '../components/ListItemDesktopAbout'

const About = () => {
  return (
    <Grid container direction="column">
      <img
        src={monochromeBackground}
        alt="monochrome background"
        style={{ maxWidth: '100%', position: 'fixed', top: 0, left: 0, right: 0,
          width: '100%', height: '100%', zIndex: -1 }}
      />
      <Grid item>
        <Container maxWidth='lg'>
          <Paper sx={{ m: -1, mt: 3, mb: 5, mx: 'auto', p: 2, pb: 5, background: '#FCF8F4', width: '100%' }} variant='elevation' elevation={10}>
            <Box>
              <Typography sx={{ pt: 3, pl: 2.5, fontFamily: '"Lato", sans-serif' }} variant='h6'>
                Tieteellisen kirjoittamisen itsearviointitestin sisällön on tuottanut Helsingin yliopiston kielikeskuksen äidinkielen ja finskan yksikkö.
                Testi julkaistiin alun perin vuonna 2013.<p />
                Testin uusitun version laativat seuraavat Helsingin yliopiston tietojenkäsittelytieteen kandiohjelman
                Ohjelmistotuotantoprojekti-kurssin opiskelijat syksyllä 2023:
              </Typography>
              <Typography sx={{ pl: 2.5, fontFamily: '"Lato", sans-serif' }}>
                <List
                  sx={{ flex: '1', mb: 3, mt: 0.5, ml: 1 }}>
                  <ListItemDesktopAbout text='Ilkka Luukkonen' link='https://github.com/ilkkaluu' />
                  <ListItemDesktopAbout text='Janika Kalliokoski' link='https://github.com/janikakalliokoski' />
                  <ListItemDesktopAbout text='Juska Juselius' link='https://github.com/Jusq17' />
                  <ListItemDesktopAbout text='Kristian Kataja' link='https://github.com/katajak' />
                  <ListItemDesktopAbout text='Nikita Essine' link='https://github.com/nikitaessine' />
                  <ListItemDesktopAbout text='Patrik Alanen' link='https://github.com/alanenpa' />
                  <ListItemDesktopAbout text='Wäinö Everhall' link='https://github.com/weverhall' />
                  <ListItemDesktopAbout text='Ohjaaja: Sini Arkko' link='https://github.com/SiniCode' />
                </List>
              </Typography>
              <Typography sx={{ pl: 2.5, fontFamily: '"Lato", sans-serif' }} variant='h5'>
                <Link
                  href='https://elomake.helsinki.fi/lomakkeet/126370/lomake.html'
                  rel='noopener noreferrer'
                  target="_blank">
                  Anna palautetta testistä
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  )
}

export default About