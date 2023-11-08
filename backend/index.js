import app from './app.js'
import connectToDatabase from './db/connection.js'
import setupAuthentication from './util/oidc.js'

const PORT = 3001

app.listen(PORT, async () => {
  await connectToDatabase()
  await setupAuthentication()
  console.log(`Server running on port ${PORT}`)
})
