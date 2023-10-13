import { List, ListItem, Typography, Paper, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const statementsRoute = () => { navigate('/test/0') }

  return (
    <Paper sx={{ mt: 5, mb: 10, p: 10 }} variant='elevation'>
      <Typography id='frontpageHeader' variant='h4'>Tieteellisen kirjoittamisen itsearviointitesti</Typography>
      <Typography sx={{ pt: 2 }} variant='subtitle1'>
        Tämän testin avulla voit arvioida osaamistasi tieteellisen tekstin kirjoittajana.<br />
        Testissä on väitteitä seuraavilta kirjoittamisen osa-alueilta:
      </Typography>
      <List sx={{ listStyleType: 'disc', pl: 4, mb: 2 }}>
        <ListItem dense sx={{ display: 'list-item' }}>
          <Typography>Kirjoittamiseen liittyvät tunteet ja ajatukset</Typography>
        </ListItem>
        <ListItem dense sx={{ display: 'list-item' }}>
          <Typography>Akateemiset käytänteet ja tekstilajit</Typography>
        </ListItem>
        <ListItem dense sx={{ display: 'list-item' }}>
          <Typography>Lukeminen ja lähteiden käyttö</Typography>
        </ListItem>
        <ListItem dense sx={{ display: 'list-item' }}>
          <Typography>Kirjoittaminen prosessina</Typography>
        </ListItem>
        <ListItem dense sx={{ display: 'list-item' }}>
          <Typography>Tekstin rakenne</Typography>
        </ListItem>
        <ListItem dense sx={{ display: 'list-item' }}>
          <Typography>Kielelliset seikat</Typography>
        </ListItem>
      </List>
      <Button sx={{ mr: 1 }} variant="contained" id='statementsRoute' onClick={statementsRoute}>Testiin!</Button>
    </Paper>
  )
}

export default Home