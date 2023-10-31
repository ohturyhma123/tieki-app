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

const params = {
  claims: {
    id_token: {
      uid: { essential: true }
    },
    userinfo: {
      hyGroupCn: { essential: true }
    }
  }
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
    hyGroupCn: iamGroups,
  } = userinfo

  const user = {
    username,
    iamGroups,
    isAdmin: checkAdmin(iamGroups),
  }

  done(null, user)
}

const setupAuthentication = async () => {

  const client = await getClient()

  passport.serializeUser((user, done) => {
    const { username, iamGroups, isAdmin } = user
    return done(null, { username, iamGroups, isAdmin })
  })

  passport.deserializeUser(
    async ({ iamGroups }, done) => {
      return done(null, { iamGroups })
    }
  )

  passport.use('oidc', new Strategy({ client, params }, verifyLogin))
}

export default setupAuthentication
