import Menu from "../../components/Menu"
import bgProfile from '../../assets/bg-profile.jpg'

const Profile = () => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgProfile})` }}
    >
      <Menu />
      <h1>PROFILE</h1>
    </div>
  )
}

export default Profile