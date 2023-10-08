import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

/**
  Alert for confirming if an user wants to submit the test and proceed to results page.
*/
const Submit = ({ navigate, selectedStatements, statementsData }) => {
  confirmAlert({
    title: 'Lopeta testi',
    message: 'Oletko varma, että haluat lopettaa testin?',
    buttons: [
      {
        label: 'Kyllä',
        onClick: () => navigate('/results', { state: { selectedStatements, statementsData }
        })
      },
      {
        label: 'Ei'
      }
    ]
  })
}

export default Submit
