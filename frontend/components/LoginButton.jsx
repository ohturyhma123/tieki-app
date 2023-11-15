import { Button, styled } from '@mui/material'

const LoginButton = ({ backgroundColor, color, buttonText, href }) => {
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
    '@media (max-width: 450px)': {
      display: 'flex',
      margin: 'auto',
      fontSize: '22px',
      marginTop: '50px',
      padding: '0.7rem 4rem',
    }
  }))

  return <StyledButton id='loginButton' href={href}>{buttonText}</StyledButton>
}

export default LoginButton