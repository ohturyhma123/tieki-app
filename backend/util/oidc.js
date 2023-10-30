import {
  Issuer,
  Strategy
} from 'openid-client'
import passport from 'passport'

import UserModel from '../db/models/UserModel.js'
import dotenv from 'dotenv'
dotenv.config()

const OIDC_ISSUER = 'https://login-test.it.helsinki.fi/.well-known/openid-configuration'
const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID
const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET
const OIDC_REDIRECT_URI = process.env.OIDC_REDIRECT_URI

const params = {
  claims: {
    id_token: {
      uid: { essential: true },
      hyPersonSisuId: { essential: true },
    },
    userinfo: {
      email: { essential: true },
      hyGroupCn: { essential: true },
      preferredLanguage: null,
    },
  },
}

const checkAdmin = (iamGroups) => iamGroups.includes('tieki123')

const getClient = async () => {
  const issuer = await Issuer.discover(OIDC_ISSUER)

  const client = new issuer.Client({
    client_id: OIDC_CLIENT_ID,
    client_secret: OIDC_CLIENT_SECRET,
    redirect_uris: [OIDC_REDIRECT_URI],
    response_types: ['code'],
  })

  return client
}

const verifyLogin = async (
  _tokenSet,
  userinfo,
  done ) => {
    console.log('verifyLogin')
  const {
    uid: username,
    hyPersonSisuId: id,
    email,
    hyGroupCn: iamGroups,
    preferredLanguage: language,
  } = userinfo


  await UserModel.findOneAndUpdate({ username }, { ...UserModel }, { upsert: true })

  done(null, UserModel)
}
const setupAuthentication = async () => {

    console.log('setupAuthentication')
  const client = await getClient()

  passport.serializeUser((user, done) => {
    const { username, iamGroups, isAdmin } = user
    return done(null, { username, iamGroups, isAdmin })
  })

  passport.deserializeUser(
    async (
      { username, iamGroups },
      done
    ) => {
      const user = await UserModel.findOne({ username }).lean()

      if (!user) return done(new Error('User not found'))

      return done(null, { ...user, iamGroups })
    }
  )

  passport.use('oidc', new Strategy({ client, params }, verifyLogin))
}

export default setupAuthentication