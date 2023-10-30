import { Box } from '@mui/material'
import { Document, Page, Text, PDFViewer, StyleSheet, Link, Image } from '@react-pdf/renderer'
import { useLocation } from 'react-router-dom'
import calculateCategoryScores from '../functions/CalculateCategoryScores'
import getResults from '../functions/getResults'

const PDFView = () => {
  const location = useLocation()
  const scores = calculateCategoryScores(location.state.selectedStatements)
  const imgSrc = location.state.imgSrc
  const [positiveResults, negativeResults] = getResults(scores)

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

  return (
    <Box sx={{ height: 1000 }} >
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
    </Box>
  )
}

export default PDFView
