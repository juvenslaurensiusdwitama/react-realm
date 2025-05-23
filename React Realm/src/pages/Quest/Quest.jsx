import Menu from "../../components/Menu"
import bgQuest from '../../assets/bg-quest.png'

const Quest = () => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgQuest})` }}
    >
      <Menu />
      Quest
    </div>
  )
}

export default Quest