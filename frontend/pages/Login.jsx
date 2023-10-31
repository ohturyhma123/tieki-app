import { Link, Typography } from '@mui/material'

const Login = () => {

  return (
    <div>
      <Typography sx={{ pb: 3 }} variant='h3'>Kirjaudu sisään (vain ylläpitäjät)</Typography>
      <Typography>
        <Link sx={{ pl: 0.5 }} href='/api/oidc'>HY-kirjautuminen</Link>
        <Link sx={{ pl: 0.5 }} href="/api/logout" >Kirjaudu ulos</Link>
      </Typography>
    </div>
  )
}

export default Login
