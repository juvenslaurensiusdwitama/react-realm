import bg1 from '../../assets/bg1.jpg'
import Menu from '../../components/Menu'

const Home = () => {
    return (
        <div
            className="h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bg1})` }}
        >
            <Menu/>
        </div>
    )
}

export default Home