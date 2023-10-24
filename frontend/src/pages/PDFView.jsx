import { Box } from '@mui/material'
import { Document, Page, Text, PDFViewer, StyleSheet, Link } from '@react-pdf/renderer'
import { useLocation } from 'react-router-dom'
import statementsData from '../data/statementsData.json'
import resultsData from '../data/resultsData.json'

const PDFView = () => {
  const location = useLocation()

  const calculateScore = () => {
    /** Use location.state to retrieve statementsData and selectedStatements. */
    const selectedStatements = location.state.selectedStatements

    /** Initialize an object with category names as keys and 0 as the values. */
    let categoryScores = {}
    statementsData.forEach((categoryData) => {
      categoryScores[categoryData.category] = [0,0]
    })

    /**
      Calculate category scores by iterating through each selected statement id.
      For each category, find the statement with the matching id,
      and add the statement's value to the respective category's score.
    */
    selectedStatements.forEach((statementId) => {
      for (const categoryData of statementsData) {
        const statement = categoryData.statements.find((s) => s.id === statementId)
        if (categoryData.statements.find((s) => s.id === statementId)) {
          if(statement.value > 0) {
            categoryScores[categoryData.category][0] += statement.value
          }
          else {
            categoryScores[categoryData.category][1] += statement.value
          }
        }
      }
    })
    return categoryScores
  }

  const scores = calculateScore()
  const sumScores = {}

  Object.entries(scores).forEach(([key, value]) => {
    sumScores[key] = value[0]+value[1]
  })

  const getResults = () => {
    const positiveCategories = Object.keys(scores).filter((category) => scores[category][0] >= 2)
    const negativeCategories = Object.keys(scores).filter((category) => scores[category][1] <= -2)

    const positiveResults = resultsData.filter((result) => positiveCategories.includes(result.category) && result.positive)
    const negativeResults = resultsData.filter((result) => negativeCategories.includes(result.category) && result.positive === false)

    return [positiveResults, negativeResults]
  }

  const [positiveResults, negativeResults] = getResults()

  const Characteristic = ({ characteristic }) => {
    return (
      <div>
        <Text style={styles.subtitle} key={characteristic.id}>{characteristic.category}</Text>
        {characteristic.textSegments.map((segment) => <Text style={{ paddingTop: 7 }} key={segment}>{segment}</Text>)}
        <ul style={{ paddingTop: 7 }}>
          {characteristic.listPoints.map((item, index) =>
            <li style={{ paddingLeft: 40, paddingTop: 7 }} key={index}>
              <Text>-  {item}</Text>
            </li>)}
          {characteristic.links.map((link, index) => {
            return(
              <div style={{ paddingTop: 10 }} key={index}>
                <Text variant='body1'>{link.description}</Text>
                <Link href={link.link}>{link.link}</Link>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 24,
      margin: 12,
      paddingTop: 20
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 30,
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  })


  return (
    <Box sx={{ height: 1000 }} >
      <PDFViewer width={'100%'} height={'100%'} >
        <Document>
          <Page size={'A2'} style={ { paddingTop: 100, paddingBottom: 65, paddingHorizontal: 100 } }>
            <Text style={styles.header}>Vahvuudet</Text>
            {positiveResults.map(characteristic => <Characteristic key={characteristic.id} characteristic={characteristic} />)}
            <Text style={ { paddingVertical: 50 } }> </Text>
            <Text style={styles.header}>Kehityskohteet</Text>
            {negativeResults.map(characteristic => <Characteristic key={characteristic.id} characteristic={characteristic} />)}
          </Page>
        </Document>
      </PDFViewer>
    </Box>
  )
}

export default PDFView
