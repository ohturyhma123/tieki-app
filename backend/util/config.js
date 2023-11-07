import * as dotenv from 'dotenv'

dotenv.config()

export const inDevelopment = process.env.NODE_ENV === 'development'

export const inStaging = process.env.STAGING === 'true'

export const inProduction = !inStaging && process.env.NODE_ENV === 'production'

export const inTestMode = process.env.NODE_ENV === 'test'

export const MONGODB_URI = process.env.MONGODB_URI || ''

export const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI || ''

export const OIDC_ISSUER = inProduction
  ? 'https://login.helsinki.fi/.well-known/openid-configuration'
  : 'https://login-test.it.helsinki.fi/.well-known/openid-configuration'

export const OIDC_CLIENT_ID = process.env.OIDC_CLIENT_ID || ''

export const OIDC_CLIENT_SECRET = process.env.OIDC_CLIENT_SECRET || ''

export const OIDC_REDIRECT_URI = process.env.OIDC_REDIRECT_URI || ''

export const SESSION_SECRET = process.env.SESSION_SECRET || ''
