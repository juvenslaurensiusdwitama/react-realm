import Menu from '../../components/Menu'
import bgHome from '../../assets/bg-home.jpg'

const Home = () => {
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgHome})` }}
        >
            <Menu/>
            HOME
        </div>
    )
}

export default Home