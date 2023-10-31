import {
  Issuer,
  Strategy
} from 'openid-client'
import passport from 'passport'
import {
  OIDC_ISSUER,
  OIDC_CLIENT_ID,
  OIDC_CLIENT_SECRET,
  OIDC_REDIRECT_URI,
} from './config.js'
import User from '../db/models/UserModel.js'

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

const checkAdmin = (iamGroups) => iamGroups.includes('grp-tieki')

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

const verifyLogin = async (_tokenSet, userinfo, done) => {
  const {
    uid: username,
    hyPersonSisuId: id,
    email,
    hyGroupCn: iamGroups,
    preferredLanguage: language,
  } = userinfo

  const user = {
    username,
    id: id || username,
    email,
    iamGroups,
    language,
    isAdmin: checkAdmin(iamGroups),
  }

  if (!user.isAdmin) {
    return done(new Error('Access Forbidden'))
  }

  await User.findOneAndUpdate({ username }, { ...user }, { upsert: true })

  done(null, user)
}

const setupAuthentication = async () => {

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
      const user = await User.findOne({ username }).lean()

      if (!user) return done(new Error('User not found'))

      return done(null, { ...user, iamGroups })
    }
  )

  passport.use('oidc', new Strategy({ client, params }, verifyLogin))
}

export default setupAuthentication
