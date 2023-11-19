import { Link, useLocation } from 'react-router-dom'
import ResultAccordion from '../components/ResultAccordion'
import RadarChart from '../components/RadarChart'
import monochromeBackground from '../assets/monochrome-background.jpg'
import { Box, Paper, Typography, Grid, Container, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import * as htmlToImage from 'html-to-image'
import CalculateCategoryScores from '../functions/CalculateCategoryScores'
import GetResults from '../functions/GetResults'
import useApi from '../hooks/useApi'

const Results = () => {

  const [imgSource, setImageSource] = useState(null)

  useEffect(() => {

    const fetchImage = async () => {

      const chart = document.getElementsByClassName('radarchart').radarchart
      const image = await htmlToImage.toPng(chart)
      setImageSource(image)
    }
    fetchImage()
  })

  const { data: statementsData, loading: loadingStatements, error: errorStatements } = useApi('/api/statements')
  const { data: resultsData, loading: loadingResults, error: errorResults } = useApi('/api/results')

  const location = useLocation()

  if (!location.state) {
    return <div></div>
  }

  /** Calculate and store category scores outside of JSX to prevent redundant calls with each render. */
  const scores = CalculateCategoryScores(location.state.selectedStatements, statementsData)

  const sumScores = {}
  Object.entries(scores).forEach(([key, value]) => {
    sumScores[key] = value[0]+value[1]
  })

  const [positiveResults, negativeResults] = GetResults(scores, resultsData)

  let strengthText = null
  let weaknessText = null

  if (positiveResults.length < 1) {
    strengthText = <Typography sx={{ pt: 2, pb: 1, textAlign: 'center' }} variant='h5' className='strengths'>Valintojesi perusteella sinulla ei ole vahvuuksia.</Typography>
  }
  if (negativeResults.length < 1) {
    weaknessText = <Typography sx={{ pt: 2, pb: 1, textAlign: 'center' }} variant='h5' className='weaknesses'>Valintojesi perusteella sinulla ei ole kehityskohteita.</Typography>
  }

  if (loadingStatements || loadingResults) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <img
          src={monochromeBackground}
          alt="monochromeBackground"
          style={{ maxWidth: '100%', position: 'fixed', top: 0, left: 0, right: 0,
            width: '100%', height: '100%', zIndex: -1 }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CircularProgress sx={{ mr: 2 }} />
          <Typography>Ladataan sivua...</Typography>
        </Box>
      </Grid>
    )
  }

  if (errorStatements || errorResults) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <img
          src={monochromeBackground}
          alt="monochromeBackground"
          style={{ maxWidth: '100%', position: 'fixed', top: 0, left: 0, right: 0,
            width: '100%', height: '100%', zIndex: -1 }}
        />
        <Box sx={{ p: 5 }}>
          <Typography>Virhe tulosten lataamisessa</Typography>
        </Box>
      </Grid>
    )
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <img
        src={monochromeBackground}
        alt="monochromeBackground"
        style={{ maxWidth: '100%', position: 'fixed', top: 0, left: 0, right: 0,
          width: '100%', height: '100%', zIndex: -1 }}
      />
      <Container maxWidth='xl'>
        <Paper sx={{ m: -1, mt: 3, mb: 5, p: 2, pb: 7, background: '#FCF8F4' }} variant='elevation' elevation={10}>
          {positiveResults.length > 0 || negativeResults.length > 0
            ?
            <div>
              <Grid container direction="column" spacing={10} justifyContent="center">
                <Grid item>
                  <Link id='to_pdfview' to={'/pdfview'} target='_blank' state={{ selectedStatements: location.state.selectedStatements, imgSrc: imgSource }}>
                    <Typography sx={{ textAlign: 'right' }}>Näytä tulokset PDF-tiedostona</Typography>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={4} justifyContent="center">
                  <Typography sx={{ textAlign: 'center', color: '#323E45', mb: 15 }} variant='h2'>Tulokset</Typography>
                  <Typography sx={{ fontSize: '18px', textAlign: 'center', color: '#323E45', mb: 4 }} variant='body2'>
                    <strong>Tästä koosteesta näet, mitä kirjoittamisen osa-alueita painotit valinnoissasi.</strong>
                  </Typography>
                  <Typography sx={{ fontSize: '18px', textAlign: 'center', color: '#323E45' }} variant='body2'>
                    Tulokset näyttävät ensin vahvuutesi kirjoittajana ja sitten alueet, joissa tarvitset harjoitusta.
                  </Typography>
                  <Typography sx={{ fontSize: '18px', textAlign: 'center', color: '#323E45',  mt: 4, mb: 15, lineHeight: 2 }} variant='body2'>
                    Voit saada vahvuuksiin ja kehittämiskohteisiin saman osa-alueen, jos olet painottanut sitä aluetta valinnoissasi.<br/>
                    Tämä tarkoittaa, että pidät sitä tärkeänä: hallitset siihen kuuluvia asioita jo paljon, mutta haluat kehittyä yhä paremmaksi.<br/>
                    Lue tuloksesi ja niistä annetut tulkinnat huolellisesti ja hyödynnä niitä tarpeen mukaan.
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <RadarChart categories={Object.keys(sumScores)} results={Object.values(sumScores)}/>
                  </Box>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={10} justifyContent="center">
                <Grid item xs={12} sm={10} md={10} lg={7} >
                  <div>
                    <Typography sx={{ py: 2, px:0, my: 2, textAlign: 'center', color: '#323E45' }} variant='h4' className='strengths'>Vahvuudet</Typography>
                    {strengthText}
                    {positiveResults.map((result) => <ResultAccordion key={result.id} result={result} color={'#d3e8df'} />)}
                  </div>
                  <div>
                    <Typography sx={{ py: 2, px:0, mt: 4, mb: 2, textAlign: 'center', color: '#323E45' }} variant='h4' className='weaknesses'>Kehityskohteet</Typography>
                    {weaknessText}
                    {negativeResults.map((result) => <ResultAccordion key={result.id} result={result} color={'bisque'}/>)}
                  </div>
                </Grid>
              </Grid>
              <Grid sx={{ my: 3 }} container direction="column" spacing={10} justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4} justifyContent="center">
                  <Typography sx={{ fontSize: '18px', textAlign: 'center', color: '#323E45' }} variant='body2'>
                    Voit tallentaa koosteen itsellesi <Link id='to_pdfview' to={'/pdfview'} state={{ selectedStatements: location.state.selectedStatements, imgSrc: imgSource }}>pdf-muodossa.</Link>
                  </Typography>
                  <Typography sx={{ fontSize: '18px', textAlign: 'center', color: '#323E45' }} variant='body2'>
                    Voit halutessasi <Link to="https://elomake.helsinki.fi/lomakkeet/126370/lomake.html" target="_blank" rel='noopener noreferrer'>antaa palautetta</Link> testin tekijöille. Kiitos!
                  </Typography>
                </Grid>
              </Grid>
            </div>
            :
            <Box>
              <Typography sx={{ pt: 2 }} variant='h4'>Et valinnut tarpeeksi väitteitä, jotta koosteen voisi muodostaa</Typography>
              <Typography sx={{ pt: 2, pb: 10 }} variant='h5'>Voit tehdä testin uudelleen ja valita tällä kertaa enemmän väitteitä.</Typography>
              <Typography variant='h5' >Hyödyllisiä linkkejä löydät <Link to='/links'>linkkisivulta</Link></Typography>
            </Box>
          }
        </Paper>
      </Container>
    </Grid>
  )
}

export default Results