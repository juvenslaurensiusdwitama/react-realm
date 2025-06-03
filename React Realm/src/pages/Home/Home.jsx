import Menu from '../../components/Menu'
import bgHome from '../../assets/bg-home.jpg'

const Home = () => {
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgHome})` }}
        >
            <Menu/>
            <div className='my-8 bg-slate-900/80 h-[620px] w-[600px] backdrop-blur-xs 
                rounded-[8px] text-white py-4 px-6 flex flex-col justify-between'
            >
                <div className='flex justify-between'>
                    <div className='flex flex-col'>
                        <h1 className='text-[18px]'>Username</h1>
                        <div className='flex gap-2 text-[14px]'>
                            <p>Level 10</p>
                            <p>214 exp / 344 exp</p>
                        </div>
                        <p>Progress Bar</p>
                    </div>
                    <div>
                        <p>Points</p>
                        <p>Badge</p>
                        <p>Thropy</p>
                    </div>
                </div>
                <div className='w-full flex justify-around'>
                    <p>char</p>
                    <p>char</p>
                </div>
                <div>tes</div>
            </div>
        </div>
    )
}

export default Home