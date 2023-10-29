import { Link, useLocation } from 'react-router-dom'
import ResultAccordion from '../components/ResultAccordion'
import RadarChart from '../components/RadarChart'
import monochromeBackground from '../assets/monochrome-background.jpg'
import { Box, Paper, Typography, Grid, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import * as htmlToImage from 'html-to-image'
import calculateCategoryScores from '../functions/CalculateCategoryScores'
import getResults from '../functions/getResults'

const Results = () => {

  const [imgSource, setImageSource] = useState(null)

  useEffect(() => {

    const chart = document.getElementsByClassName('radarchart').radarchart
    console.log(chart)

    htmlToImage.toPng(chart)
      .then((dataUrl) => {
        console.log(dataUrl)
        setImageSource(dataUrl)
        let img = new Image()
        img.src = dataUrl
        document.body.appendChild(img)
      })

  }, [])

  const location = useLocation()

  if (!location.state) {
    return <div></div>
  }

  /** Calculate and store category scores outside of JSX to prevent redundant calls with each render. */
  const scores = calculateCategoryScores(location.state.selectedStatements)

  const sumScores = {}
  Object.entries(scores).forEach(([key, value]) => {
    sumScores[key] = value[0]+value[1]
  })

  const [positiveResults, negativeResults] = getResults(scores)

  let strengthText = null
  let weaknessText = null

  if (positiveResults.length < 1) {
    strengthText = <Typography sx={{ pt: 2, pb: 1, textAlign: 'center' }} variant='h5' className='strengths'>Valintojesi perusteella sinulla ei ole vahvuuksia.</Typography>
  }
  if (negativeResults.length < 1) {
    weaknessText = <Typography sx={{ pt: 2, pb: 1, textAlign: 'center' }} variant='h5' className='weaknesses'>Valintojesi perusteella sinulla ei ole kehityskohteita.</Typography>
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
                  <Link id='to_pdfview' to={'/pdfview'} state={{ selectedStatements: location.state.selectedStatements }}>
                    <Typography sx={{textAlign: 'right'}}>Näytä tulokset PDF-tiedostona</Typography>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={4} justifyContent="center">
                  <Typography sx={{ textAlign: 'center', color: '#323E45' }} variant='h3'>Tulokset</Typography>
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
            </div>
            :
            <Box>
              <Typography sx={{ pt: 2, pb: 5 }} variant='h4' >Et valinnut tarpeeksi väittämiä analyysin muodostamiseen.</Typography>
              <Typography variant='h5' >Hyödyllisiä linkkejä löydät <Link to='/links'>linkkisivulta</Link></Typography>
            </Box>
          }
        </Paper>
      </Container>
    </Grid>
  )
}

export default Results