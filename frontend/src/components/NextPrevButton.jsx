import { Button, styled } from '@mui/material'

const NextPrevButton = styled(Button)( () => ({
  backgroundColor: '#fff',
  color: '#00011b',
  borderColor: '#fff',
  fontWeight: '700',
  fontSize: '17px',
  fontFamily: '"Lato", sans-serif',
  cursor: 'pointer',
  padding: '0.5rem 1.3rem',
  borderRadius: '24px',
  textTransform: 'none',
  border: '2px solid',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#00011b',
    borderColor: '#00011b'
  }
}))

export default NextPrevButton