import { Typography, ListItemText } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'

const ListItemMobile = ({ text }) => {
  return (
    <ListItem sx={{ margin: '-10px 0' }}>
      <ListItemIcon sx={{ color: '#00011b', marginRight: '-8px', marginLeft: '-10px' }}>
        <SchoolIcon style={{ fontSize: '15px' }} />
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <Typography
            variant='body2'
            style={{ color: '#00011b', fontSize: '13.5px', fontFamily: '"Lato", sans-serif', fontStyle: 'italic', fontWeight: '500', marginLeft: -23 }}>
            {text}
          </Typography>
        }/>
    </ListItem>
  )
}

export default ListItemMobile