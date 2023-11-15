import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'
import { MONGODB_TEST_URI, MONGODB_URI, inTestMode } from './config.js'

const MongoDBStoreSession = MongoDBStore(session)

const store = new MongoDBStoreSession({
  uri: inTestMode ? MONGODB_TEST_URI : MONGODB_URI,
  collection: 'sessions',
})

export default store
