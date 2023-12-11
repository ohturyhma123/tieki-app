import { Button, styled } from '@mui/material'

const GoToResultsButtonMobile = styled(Button)(() => ({
  backgroundColor: '#fff',
  color: '#00011b',
  borderColor: '#fff',
  fontWeight: '700',
  fontSize: '24px',
  fontFamily: '"Lato", sans-serif',
  cursor: 'pointer',
  borderRadius: '30px',
  textTransform: 'none',
  border: '2px solid',
  '@media (max-width: 480px)': {
    display: 'flex',
    margin: 'auto',
    fontSize: '24px',
    marginTop: '30px',
    marginBottom: '20px',
    padding: '0.7rem 3.7rem',
  },
}))


export default GoToResultsButtonMobile