import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const statementsRoute = () => { navigate('/test') }
  const linksRoute = () => { navigate('/links') }

  return (
    <div>
      <h1>Tieteellisen kirjoittamisen itsearviointitesti</h1>
      <p>
        Tämän testin avulla voit arvioida osaamistasi tieteellisen tekstin kirjoittajana.<br />
        Testissä on väitteitä seuraavilta kirjoittamisen osa-alueilta:
      </p>
      <ul>
        <li>Kirjoittamiseen liittyvät tunteet ja ajatukset</li>
        <li>Akateemiset käytänteet ja tekstilajit</li>
      </ul>
      <button id='statementsRoute' onClick={statementsRoute}>Testiin!</button>
      <button id='linksRoute' onClick={linksRoute}>Linkkejä</button>
    </div>
  )
}

export default Home