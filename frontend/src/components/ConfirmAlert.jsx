import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import '../assets/ConfirmAlert.css'

/**
  Alert for confirming if an user wants to submit the test and proceed to results page.
*/
const Submit = ({ navigate, selectedStatements, statementsData }) => {
  const isMobile = window.innerWidth <= 768

  confirmAlert({
    message: 'Oletko varma, että haluat lopettaa testin?',
    buttons: [
      {
        className: 'yes-btn',
        label: 'Kyllä',
        onClick: () => navigate('/results', { state: { selectedStatements, statementsData }
        }),
        tabIndex: 0
      },
      {
        className: 'no-btn',
        label: 'Ei',
        onClick: isMobile ? () => navigate('/test/11', { state: { selectedStatements, statementsData } }) : null,
        tabIndex: 0
      }
    ]
  })
}

export default Submit
