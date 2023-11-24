import Link from './models/LinkModel.js'
import Result from './models/ResultModel.js'
import Statement from './models/StatementModel.js'
import linksData from '../../data/linksData.json' assert { type: 'json' }
import resultsData from '../../data/resultsData.json' assert { type: 'json' }
import statementsData from '../../data/statementsData.json' assert { type: 'json' }
import { connectToDatabase, disconnectFromDatabase } from './connection.js'
import { MONGODB_URI } from '../util/config.js'

/**
  This file is only needed to run once: npm run init
*/
const insertData = async () => {
  if (MONGODB_URI === '<connection_string>' || MONGODB_URI === '') {
    console.log('MONGODB_URI environment variable is not set.')
  } else {
    try {
      await connectToDatabase()

      // Drop existing collections
      await Link.collection.drop();
      await Result.collection.drop();
      await Statement.collection.drop();

      // Insert data into the collections
      await Link.insertMany(linksData)
      console.log('linksData.json inserted successfully')
      await Result.insertMany(resultsData)
      console.log('resultsData.json inserted successfully')
      await Statement.insertMany(statementsData)
      console.log('statementsData.json inserted successfully')

    } catch (error) {
      console.error('Error inserting data:', error)
    } finally {
      await disconnectFromDatabase()
    }
  }
}

insertData()
