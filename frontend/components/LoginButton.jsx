import { Button, styled } from '@mui/material'

const LoginButton = ({ backgroundColor, color, buttonText, href }) => {
  const StyledButton = styled(Button)( () => ({
    backgroundColor: backgroundColor,
    color: color,
    borderColor: backgroundColor,
    fontWeight: '700',
    fontSize: '22px',
    fontFamily: '"Lato", sans-serif',
    cursor: 'pointer',
    padding: '0.6rem 1.8rem',
    borderRadius: '24px',
    textTransform: 'none',
    border: '2px solid',
    marginLeft: '-16px',
    '&:hover': {
      backgroundColor: color,
      color: backgroundColor,
      borderColor: color
    },
    '@media (max-width: 450px)': {
      display: 'flex',
      margin: 'auto'
    }
  }))

  return <StyledButton id='loginButton' href={href}>{buttonText}</StyledButton>
}

export default LoginButton