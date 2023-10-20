import { useNavigate } from 'react-router-dom'
import { Button, styled } from '@mui/material'

const LargeButton = ({ backgroundColor, color, buttonText }) => {
  const StyledButton = styled(Button)( () => ({
    backgroundColor: backgroundColor,
    color: color,
    borderColor: backgroundColor,
    fontWeight: '700',
    fontSize: '20px',
    fontFamily: '"Lato", sans-serif',
    cursor: 'pointer',
    padding: '0.5rem 2.25rem',
    borderRadius: '24px',
    textTransform: 'none',
    border: '2px solid',
    '&:hover': {
      backgroundColor: color,
      color: backgroundColor,
      borderColor: color
    },
    '@media (max-width: 960px)': {
      display: 'flex',
      margin: 'auto',
      fontSize: '22px',
      marginTop: '50px',
      padding: '0.75rem 4.5rem',
    }
  }))

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/test/0')
  }

  return <StyledButton id='statementsRoute' onClick={handleClick}>{buttonText}</StyledButton>
}

export default LargeButton