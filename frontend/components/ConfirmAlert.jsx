import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import '../assets/ConfirmAlert.css'

/**
  Alert for confirming if an user wants to submit the test and proceed to results page.
*/
const Submit = ({ navigate, selectedStatements }) => {
  const isMobile = window.innerWidth <= 480

  if (!isMobile) {
    confirmAlert({
      message: 'Haluatko siirtyä tuloksiin?',
      buttons: [
        {
          className: 'yes-btn',
          label: 'Kyllä',
          onClick: () => navigate('/results', { state: { selectedStatements } }),
          tabIndex: 0
        },
        {
          className: 'no-btn',
          label: 'En',
          onClick: () => navigate('/test/12', { state: { selectedStatements } }),
          tabIndex: 0
        }
      ]
    })
  }
}

export default Submit
