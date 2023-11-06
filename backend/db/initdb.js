import { exec } from 'child_process'
import { MONGODB_TEST_URI } from '../util/config.js'

/**
  This file is only needed to run once: npm run init
*/
if (MONGODB_TEST_URI === '<connection_string>' || MONGODB_TEST_URI === '') {
  console.log('MONGODB_TEST_URI environment variable is not set.')
} else {
  // Imports the 3 .json files to the database using mongoimport
  // Check if the URI contains '?', if yes cut the string after, including the ?
  const index = MONGODB_TEST_URI.indexOf('?')
  const formattedURI = index !== -1 ? MONGODB_TEST_URI.slice(0, index) : MONGODB_TEST_URI
  const command1 = `mongoimport --uri ${formattedURI} --collection links --type JSON --file data/linksData.json --jsonArray --maintainInsertionOrder`

  exec(command1, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
  const command2 = `mongoimport --uri ${formattedURI} --collection statements --type JSON --file data/statementsData.json --jsonArray --maintainInsertionOrder`

  exec(command2, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
  const command3 = `mongoimport --uri ${formattedURI} --collection results --type JSON --file data/resultsData.json --jsonArray --maintainInsertionOrder`

  exec(command3, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
}
