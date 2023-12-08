import { useNavigate } from 'react-router-dom'
import { Button, styled } from '@mui/material'

const LargeButton = ({ backgroundColor, color, buttonText }) => {
  const StyledButton = styled(Button)( () => ({
    backgroundColor: backgroundColor,
    color: color,
    borderColor: backgroundColor,
    fontWeight: '700',
    fontSize: '24px',
    fontFamily: '"Lato", sans-serif',
    cursor: 'pointer',
    padding: '0.7rem 3.3rem',
    borderRadius: '30px',
    textTransform: 'none',
    border: '2px solid',
    marginTop: '5px',
    '&:hover': {
      backgroundColor: color,
      color: backgroundColor,
      borderColor: color
    },
    '@media (max-width: 480px)': {
      display: 'flex',
      margin: 'auto',
      fontSize: '24px',
      marginTop: '30px',
      marginBottom: '30px',
      padding: '0.7rem 3.7rem',
    }
  }))

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/test/1')
  }

  return <StyledButton id='statementsRoute' onClick={handleClick}>{buttonText}</StyledButton>
}

export default LargeButton