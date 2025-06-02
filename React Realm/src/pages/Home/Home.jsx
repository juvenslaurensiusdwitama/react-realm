import Menu from '../../components/Menu'
import bgHome from '../../assets/bg-home.jpg'

const Home = () => {
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgHome})` }}
        >
            <Menu/>
            <div className='my-8 bg-slate-900/80 h-[630px] w-[700px] backdrop-blur-xs 
                rounded-[8px] text-white py-4 px-6'
            >
                tes
            </div>
        </div>
    )
}

export default Home