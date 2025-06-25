import bgAuth from '../../assets/bg-auth.jpg'

const WebAlert = () => {
  return (
    <div className='text-center hide-on-bigger h-screen bg-cover bg-center flex justify-center items-center'
        style={{ backgroundImage: `url(${bgAuth})` }}
    >
        <div className='flex flex-col items-center justify-center bg-slate-500/70 backdrop-blur-xs px-3 pt-2 pb-3 rounded-[8px] w-[300px]'>
            <h1 className='text-white text-[32px]'>React Realm ⚔️</h1>
            <h1 className='text-white text-[18px]'>Hello Adventurer!  For the best experience, explore React Realm on a desktop or laptop 🖥️👀</h1>
        </div>
    </div>
  )
}

export default WebAlert