import { Typography, ListItemText } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'

const ListItemDesktop = ({ text }) => {
  return (
    <ListItem sx={{ margin: '-1px 0' }}>
      <ListItemIcon sx={{ color: '#00011b' }}>
        <SchoolIcon style={{ fontSize: '18px' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant='body2'
            style={{ color: '#00011b', fontSize: '19px', fontFamily: '"Lato", sans-serif', fontStyle: 'italic', fontWeight: '500', marginLeft: -23 }}>
            {text}
          </Typography>
        }/>
    </ListItem>
  )
}

export default ListItemDesktop