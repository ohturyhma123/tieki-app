import { Box, Container, Grid, Link, List, ListItem, Paper, Typography } from '@mui/material'
import monochromeBackground from '../assets/monochrome-background.jpg'

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
              <Typography sx={{ pt: 3, pl: 2 }} variant='h6'>
                Tieteellisen kirjoittamisen itsearviointitestin sisällön on tuottanut Helsingin yliopiston kielikeskuksen äidinkielen ja finskan yksikkö.
                Testi julkaistiin alun perin vuonna 2013. Testin uusitun version laativat seuraavat Helsingin yliopiston tietojenkäsittelytieteen kandiohjelman
                ohjelmistotuotantoprojekti-kurssin opiskelijat syksyllä 2023:
              </Typography>
              <Typography sx={{ pl: 2 }} variant='subtitle1'>
                <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
                  <ListItem sx={{ display: 'list-item' }}>Ilkka Luukkonen (<Link href='https://github.com/ilkkaluu'>GitHub</Link>) </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>Janika Kalliokoski (<Link href='https://github.com/janikakalliokoski'>GitHub</Link>) </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>Juska Juselius (<Link href='https://github.com/Jusq17'>GitHub</Link>) </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>Kristian Kataja (<Link href='https://github.com/katajak'>GitHub</Link>) </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>Nikita Essine (<Link href='https://github.com/nikitaessine'>GitHub</Link>) </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>Patrik Alanen (<Link href='https://github.com/alanenpa'>GitHub</Link>) </ListItem>
                  <ListItem sx={{ display: 'list-item' }}>Wäinö Everhall (<Link href='https://github.com/weverhall'>GitHub</Link>) </ListItem>
                </List>
              </Typography>
              <Typography sx={{ pl: 5 }} variant='h6'>
                <Link
                  href='https://elomake.helsinki.fi/lomakkeet/126370/lomake.html'
                  rel='noopener noreferrer'
                  target="_blank">
                  Anna palautetta
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