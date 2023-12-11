import { Box } from '@mui/material'
import { Document, Page, Text, PDFViewer, StyleSheet, Link, Image } from '@react-pdf/renderer'
import { useLocation } from 'react-router-dom'
import CalculateCategoryScores from '../functions/CalculateCategoryScores'
import GetResults from '../functions/GetResults'
import useApi from '../hooks/useApi'
import LoadingScreen from '../components/LoadingScreen'
import LoadingError from '../components/LoadingError'

const PDFView = () => {

  const location = useLocation()
  const { data: statementsData, loading: loadingStatements, error: errorStatements } = useApi('/api/statements')
  const { data: resultsData, loading: loadingResults, error: errorResults } = useApi('/api/results')
  const scores = CalculateCategoryScores(location.state.selectedStatements, statementsData)
  const imgSrc = location.state.imgSrc
  const [positiveResults, negativeResults] = GetResults(scores, resultsData)
  const isMobile = window.innerWidth <= 768

  const onRenderDocument = ({ blob  }) => {
    var blobUrl = URL.createObjectURL(blob)
    saveDocument(blobUrl, 'Tieteellisen kirjoittamisen itsearviointitesti.pdf')
  }

  const saveDocument = (function () {
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.style = 'display: none'
    return function (blob, fileName) {
      a.href = blob
      a.download = fileName
      a.click()
      window.URL.revokeObjectURL(blob)
    }
  }())

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
        <Document renderMode="svg" onRender={ (blob) => onRenderDocument(blob) }>
          <Page size={'A4'} style={styles.body}>
            <Text style={styles.header}>Tulokset</Text>
            <Image src={imgSrc}></Image>
            {positiveResults.length > 0
              ?
              <div>
                <Text style={styles.title}>Vahvuudet</Text>
                {positiveResults.map(result => <Result key={result.id} result={result} />)}
              </div>
              : null
            }
            <Text style={ { paddingVertical: 25 } }> </Text>
            {negativeResults.length > 0
              ?
              <div>
                <Text style={styles.title}>Kehityskohteet</Text>
                {negativeResults.map(result => <Result key={result.id} result={result} />)}
              </div>
              : null
            }
          </Page>
        </Document>
      </PDFViewer>
    )
  }

  const View = () => {
    return(
      <PDFViewer width={'100%'} height={'100%'} >
        <Document renderMode="svg" onRender={ (blob) => onRenderDocument(blob) }>
          <Page size={'A4'} style={styles.body}>
            <Image src={imgSrc}></Image>
            {positiveResults.length > 0
              ?
              <div>
                <Text style={styles.title}>Vahvuudet</Text>
                {positiveResults.map(result => <Result key={result.id} result={result} />)}
              </div>
              : null
            }
            <Text style={ { paddingVertical: 25 } }> </Text>
            {negativeResults.length > 0
              ?
              <div>
                <Text style={styles.title}>Kehityskohteet</Text>
                {negativeResults.map(result => <Result key={result.id} result={result} />)}
              </div>
              : null
            }
          </Page>
        </Document>
      </PDFViewer>
    )
  }

  const styles = StyleSheet.create({
    body: {
      padding: 50
    },
    header: {
      fontSize: 24
    },
    title: {
      fontSize: 20,
      overFlowWrap: 'break word'
    },
    subtitle: {
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      wordBreak: 'break-word',
      marginTop: 10,
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
    return <LoadingScreen/>
  }

  if (errorStatements || errorResults) {
    return <LoadingError errorMessage={'Virhe tulosten lataamisessa'}/>
  }

  if (isMobile) {
    return(
      <View></View>
    )
  }

  return (
    <Box sx={{ height: 1000 }} >
      <PDFViewerView/>
    </Box>
  )
}

export default PDFView
