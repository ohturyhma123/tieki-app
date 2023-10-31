import { Link, List, ListItem, Typography } from '@mui/material'
import AdminCheck from '../functions/AdminCheck'

const Edit = () => {
  const isAdmin = AdminCheck()

  if (!isAdmin) {
    // Wait for server to check admin status
    return null
  }

  return (
    <div>
      <Typography sx={{ pb: 3 }} variant='h3'>Muokkaus sivu</Typography>
      <List>
        <ListItem>
          <Typography>
            <Link sx={{ pl: 0.5 }} href="/edit/links" >Muokkaa linkkejä</Link>
          </Typography>
        </ListItem>
      </List>
    </div>
  )
}

export default Edit