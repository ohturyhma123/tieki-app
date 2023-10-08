import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

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
