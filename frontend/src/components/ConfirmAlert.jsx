import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import '../assets/ConfirmAlert.css'

/**
  Alert for confirming if an user wants to submit the test and proceed to results page.
*/
const Submit = ({ navigate, selectedStatements, statementsData }) => {
  confirmAlert({
    title: 'Lopeta testi',
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
        tabIndex: 0
      }
    ]
  })
}

export default Submit
