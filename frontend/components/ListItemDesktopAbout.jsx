import { Typography, ListItemText, Link } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'

const ListItemDesktopAbout = ({ text, link }) => {
  return (
    <ListItem sx={{ margin: '-4px 0' }}>
      <ListItemIcon sx={{ color: '#00011b' }}>
        <SchoolIcon style={{ fontSize: '17px' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant='body2'
            style={{ color: '#00011b', fontSize: '17px', fontFamily: '"Lato", sans-serif', fontWeight: '500', marginLeft: -23 }}>
            {text}{' '}
            (<Link href={link} target="_blank" rel="noopener noreferrer">GitHub</Link>)
          </Typography>
        }/>
    </ListItem>
  )
}

export default ListItemDesktopAbout