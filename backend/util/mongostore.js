import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'
import { MONGODB_URI } from './config.js'

const MongoDBStoreSession = MongoDBStore(session)

const store = new MongoDBStoreSession({
  uri: MONGODB_URI,
  collection: 'sessions',
})

export default store
