import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { Document, Page, Text, PDFViewer, StyleSheet, Link, PDFDownloadLink, Image } from '@react-pdf/renderer'
import { useLocation } from 'react-router-dom'
import CalculateCategoryScores from '../functions/CalculateCategoryScores'
import GetResults from '../functions/GetResults'
import useApi from '../hooks/useApi'

const PDFView = () => {

  const location = useLocation()
  const { data: statementsData, loading: loadingStatements, error: errorStatements } = useApi('/api/statements')
  const { data: resultsData, loading: loadingResults, error: errorResults } = useApi('/api/results')
  const scores = CalculateCategoryScores(location.state.selectedStatements, statementsData)
  const imgSrc = location.state.imgSrc
  const [positiveResults, negativeResults] = GetResults(scores, resultsData)
  const isMobile = window.innerWidth <= 768

  const Result = ({ result }) => {
    return (
      <div>
        <Text style={styles.subtitle} key={result.id}>{result.category}</Text>
        {result.textSegments.map((textSegment) => <Text style={styles.segment} key={textSegment}>{textSegment}</Text>)}
        <ul style={styles.list}>
          {result.listPoints.map((item, index) =>
            <li style={styles.listItem} key={index}>
              <Text>-  {item}</Text>
            </li>
          )}
          {result.links.map((link, index) => (
            <div style={styles.link} key={index}>
              <Text>{link.description}</Text>
              <Link href={link.link}>{link.link}</Link>
            </div>
          ))}
        </ul>
      </div>
    )
  }

  const PDFViewerView = () => {
    return(
      <PDFViewer width={'100%'} height={'100%'} >
        <Document>
          <Page size={'A4'} style={styles.body}>
            <Image src={imgSrc}></Image>
            <Text style={styles.title}>Vahvuudet</Text>
            {positiveResults.map(result => <Result key={result.id} result={result} />)}
            <Text style={ { paddingVertical: 25 } }> </Text>
            <Text style={styles.title}>Kehityskohteet</Text>
            {negativeResults.map(result => <Result key={result.id} result={result} />)}
          </Page>
        </Document>
      </PDFViewer>
    )
  }

  const View = () => {
    return(
      <Document>
        <Page size={'A4'} style={styles.body}>
          <Image src={imgSrc}></Image>
          <Text style={styles.title}>Vahvuudet</Text>
          {positiveResults.map(result => <Result key={result.id} result={result} />)}
          <Text style={ { paddingVertical: 25 } }> </Text>
          <Text style={styles.title}>Kehityskohteet</Text>
          {negativeResults.map(result => <Result key={result.id} result={result} />)}
        </Page>
      </Document>
    )
  }

  const styles = StyleSheet.create({
    body: {
      padding: 50
    },
    title: {
      fontSize: 20
    },
    subtitle: {
      fontSize: 14,
      marginLeft: 12,
      paddingTop: 20,
      paddingBottom: 1
    },
    segment: {
      fontSize: 12,
      paddingTop: 7
    },
    list: {
      paddingTop: 7
    },
    listItem: {
      fontSize: 12,
      paddingLeft: 15,
      paddingTop: 2
    },
    link: {
      fontSize: 12,
      paddingTop: 7
    }
  })

  if (loadingStatements || loadingResults) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
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
        <Box sx={{ p: 5 }}>
          <Typography>Virhe tulosten lataamisessa</Typography>
        </Box>
      </Grid>
    )
  }

  if (isMobile) {
    return(
      <div>
        <Typography variant="h5">PDF-näkymä ei tue mobiililaitteita. Lataa PDF alla olevasta linkistä!</Typography>
        <PDFDownloadLink document={<View/>} fileName="somename.pdf">
          {({ blob, url, isLoading, error }) =>
            isLoading ? 'Loading document...' : 'Download now!'
          }
        </PDFDownloadLink>
      </div>
    )
  }

  return (
    <Box sx={{ height: 1000 }} >
      <PDFViewerView/>
    </Box>
  )
}

export default PDFView
