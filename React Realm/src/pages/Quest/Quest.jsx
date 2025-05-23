import Menu from "../../components/Menu"
import bgQuest from '../../assets/bg-quest.png'
import QuestList from "./components/QuestList"

const Quest = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${bgQuest})` }}
    >
      <Menu />
      <QuestList/>  
    </div>
  )
}

export default Quest