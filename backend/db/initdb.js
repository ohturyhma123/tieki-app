import { exec } from 'child_process'
import { MONGODB_URI } from '../util/config.js'

/**
  This file is only needed to run once: npm run init
*/

// Imports the 3 .json files to the database using mongoimport
if (MONGODB_URI !== '') {
  // Check if the URI contains '?', if yes cut the string after, including the ?
  const index = MONGODB_URI.indexOf('?')
  const formattedURI = index !== -1 ? MONGODB_URI.slice(0, index) : MONGODB_URI
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
} else {
  console.log('MONGODB_URI environment variable is not set.')
}
