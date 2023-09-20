import '../assets/Buttons.css'

const HomeButton = ({ onClick }) => {
  return (
    <button className="home-btn" onClick={onClick}>
      Etusivulle
    </button>
  )
}

export default HomeButton