import { Link, useLocation } from 'react-router-dom'
import ResultAccordion from '../components/ResultAccordion'
import RadarChart from '../components/RadarChart'
import monochromeBackground from '../assets/monochrome-background.jpg'
import { Box, Paper, Typography, Grid, Container, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { useEffect, useState } from 'react'
import * as htmlToImage from 'html-to-image'
import CalculateCategoryScores from '../functions/CalculateCategoryScores'
import GetResults from '../functions/GetResults'
import useApi from '../hooks/useApi'
import LoadingScreen from '../components/LoadingScreen'
import LoadingError from '../components/LoadingError'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Results = () => {
  const [imgSource, setImageSource] = useState(null)
  const isMobile = window.innerWidth <= 480

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

  /** Create and object called sumScores that has the sum of the negative and positive statements for each category.
      This object is used when displaying the radarchart.
  */
  const sumScores = {}
  Object.entries(scores).forEach(([key, value]) => {
    sumScores[key] = value[0]+value[1]
  })

  /** Get the positive and negative results that are displayed on the page */
  const [positiveResults, negativeResults] = GetResults(scores, resultsData)

  let strengthText = null
  let weaknessText = null

  if (positiveResults.length < 1) {
    strengthText = <Typography sx={{ pt: 2, pb: 1, textAlign: 'center' }} variant='h6' className='strengths'>Valitettavasti valitsit liian vähän väitteitä. Tee testi uudelleen ja huomioi myös väitteet, jotka kuvaavat vahvuuksiasi kirjoittajana ja niitä asioita, jotka jo sujuvat.</Typography>
  }
  if (negativeResults.length < 1) {
    weaknessText = <Typography sx={{ pt: 2, pb: 1, textAlign: 'center' }} variant='h5' className='weaknesses'>Valintojesi perusteella sinulla ei ole kehityskohteita.</Typography>
  }

  if (loadingStatements || loadingResults) {
    return <LoadingScreen/>
  }

  if (errorStatements || errorResults) {
    return <LoadingError errorMessage={'Virhe tulosten lataamisessa'}/>
  }

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <img
        src={monochromeBackground}
        alt="monochrome background"
        style={{ maxWidth: '100%', position: 'fixed', top: 0, left: 0, right: 0,
          width: '100%', height: '100%', zIndex: -1 }}
      />
      <Container maxWidth='xl'>
        <Paper sx={{ m: -1, mt: 3, mb: 5, p: 2, pb: 7, background: '#FCF8F4' }} variant='elevation' elevation={10}>
          {positiveResults.length > 0 || negativeResults.length > 0
            ?
            <div>
              <Grid container direction={{ xs: 'row', md: 'column' }} spacing={10} justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4} justifyContent="center">
                  <Typography sx={{ textAlign: 'center', color: '#00011b', mb: isMobile ? 3 : 5, mt: 2.5 }} variant={isMobile ? 'h3' : 'h2'}>Tulokset</Typography>
                  <Typography sx={{ fontSize: isMobile ? '17px' : '18px', fontFamily: '"Lato", sans-serif', textAlign: 'center', color: '#00011b', mb: 4 }} variant='body2'>
                    <strong>Tästä koosteesta näet, mitä kirjoittamisen osa-alueita painotit valinnoissasi.</strong>
                  </Typography>
                  { isMobile ? (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ backgroundColor: '#8463f321', borderRadius: 0.5, px: 2 }}
                      >
                        <Typography sx={{ fontSize: '17px', fontFamily: '"Lato", sans-serif', color: '#00011b', textAlign: 'center'  }} variant='body2'>
                          Lisätietoa tuloksista
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography sx={{ fontSize: isMobile ? '15px' : '18px', fontFamily: '"Lato", sans-serif', color: '#00011b', mt: 0.8 }} variant='body2'>
                          Tulokset näyttävät ensin vahvuutesi kirjoittajana ja sitten alueet, joissa tarvitset harjoitusta.<p />
                          Voit saada vahvuuksiin ja kehittämiskohteisiin saman osa-alueen, jos olet painottanut sitä aluetta valinnoissasi.
                          Tämä tarkoittaa, että pidät sitä tärkeänä: hallitset siihen kuuluvia asioita jo paljon, mutta haluat kehittyä yhä paremmaksi.<p />
                          Lue tuloksesi ja niistä annetut tulkinnat huolellisesti ja hyödynnä niitä tarpeen mukaan.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <><Typography sx={{ fontSize: isMobile ? '17px' : '18px', fontFamily: '"Lato", sans-serif', color: '#00011b', textAlign: 'center'  }} variant='body2'>
                        Tulokset näyttävät ensin vahvuutesi kirjoittajana ja sitten alueet, joissa tarvitset harjoitusta.
                    </Typography><Typography sx={{ fontSize: isMobile ? '17px' : '18px', fontFamily: '"Lato", sans-serif', textAlign: 'center', color: '#00011b', mt: 4, mb: 5, lineHeight: 2 }} variant='body2'>
                          Voit saada vahvuuksiin ja kehittämiskohteisiin saman osa-alueen, jos olet painottanut sitä aluetta valinnoissasi.<br />
                          Tämä tarkoittaa, että pidät sitä tärkeänä: hallitset siihen kuuluvia asioita jo paljon, mutta haluat kehittyä yhä paremmaksi.<br />
                          Lue tuloksesi ja niistä annetut tulkinnat huolellisesti ja hyödynnä niitä tarpeen mukaan.
                    </Typography></>
                  )}
                  <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
                    <RadarChart categories={Object.keys(sumScores)} results={Object.values(sumScores)}/>
                  </Box>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={10} justifyContent="center">
                <Grid item xs={12} sm={10} md={10} lg={7} >
                  <div>
                    <Typography sx={{ mb: 3, mt: isMobile ? -32 : 5, textAlign: 'center', fontFamily: '"Lato", sans-serif', color: '#00011b' }} variant='h4' className='strengths'>Vahvuudet</Typography>
                    {strengthText}
                    {positiveResults.map((result, index) => <ResultAccordion key={result.id} result={result} color={'#d3e8df'} index={index} />)}
                  </div>
                  <div>
                    <Typography sx={{ mb: 3, mt: 9, textAlign: 'center', fontFamily: '"Lato", sans-serif', color: '#00011b' }} variant='h4' className='weaknesses'>Kehityskohteet</Typography>
                    {weaknessText}
                    {negativeResults.map((result) => <ResultAccordion key={result.id} result={result} color={'bisque'}/>)}
                  </div>
                </Grid>
              </Grid>
              <Grid sx={{ my: 1, mt: isMobile ?  -4 : 3.5 }} container direction="column" spacing={12} justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4} justifyContent="center">
                  {!isMobile
                    ?
                    <Typography sx={{ fontSize: isMobile ? '13px' : '18px', fontFamily: '"Lato", sans-serif', textAlign: 'center', color: '#00011b' }} variant='body2'>
                        Voit tallentaa koosteen itsellesi <Link id='to_pdfview' to={'/pdfview'} state={{ selectedStatements: location.state.selectedStatements, imgSrc: imgSource }}>pdf-muodossa</Link>.
                    </Typography>
                    :
                    <Typography sx={{ pb: '6px', fontSize: '13px', fontFamily: '"Lato", sans-serif', textAlign: 'center', color: '#182024' }} variant='body2'>
                      <strong>Tulokset eivät tallennu, joten otathan koosteesta tarvittaessa kuvakaappauksen.</strong>
                    </Typography>
                  }
                  <Typography sx={{ mt: '3px', fontSize: isMobile ? '13px' : '18px', fontFamily: '"Lato", sans-serif', textAlign: 'center', color: '#00011b' }} variant='body2'>
                    Voit palata <Link to='/'>etusivulle</Link> tehdäksesi testin uudelleen.
                  </Typography>
                  <Typography sx={{ mt: '3px', fontSize: isMobile ? '13px' : '18px', fontFamily: '"Lato", sans-serif', textAlign: 'center', color: '#00011b' }} variant='body2'>
                    Voit halutessasi <Link to="https://elomake.helsinki.fi/lomakkeet/126370/lomake.html"
                      target="_blank" rel='noopener noreferrer'>antaa palautetta</Link> testin tekijöille. Kiitos!
                  </Typography>
                </Grid>
              </Grid>
            </div>
            :
            <Box>
              <Typography sx={{ fontFamily: '"Lato", sans-serif', pt: 3, pb: 4, pl: 2 }} variant='h4'>Et valinnut tarpeeksi väitteitä, jotta koosteen voisi muodostaa.</Typography>
              <Typography sx={{ fontFamily: '"Lato", sans-serif', pt: 2, pb: 4, pl: 2  }} variant='h5'>Palaa <Link to='/'>etusivulle</Link> tehdäksesi testin uudelleen.</Typography><p />
              <Typography sx={{ fontFamily: '"Lato", sans-serif', pl: 2, mb: -1 }} variant='h5' >Hyödyllisiä linkkejä löydät <Link to='/links'>linkkisivulta</Link>.</Typography>
            </Box>
          }
        </Paper>
      </Container>
    </Grid>
  )
}

export default Results
