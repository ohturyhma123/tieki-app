import { Link, List, ListItem, Typography } from '@mui/material'
import useAdminCheck from '../hooks/useAdminCheck'

const Edit = () => {
  const { isAdmin, loading, error } = useAdminCheck()

  if (loading) {
    return <div>Ladataan sivua...</div>
  }

  if (!isAdmin) {
    return <div>Käyttö estetty</div>
  }

  if (error) {
    return <div>Virhe käyttäjän oikeuksien tarkistuksessa</div>
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