import { useNavigate } from 'react-router-dom'
import troll404 from '../assets/image404.png'
import bg404 from '../assets/bg404.jpg'
import backToHome from '../assets/back home.png'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div 
        className="flex justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg404})` }}
    >
        <div className='flex flex-col items-center gap-1'>
            <img src={troll404} alt="" className='h-[450px] mt-10'/>
            <div className='flex gap-4 items-center'>
              <img src={backToHome} onClick={() => navigate('/')} className='cursor-pointer h-[50px]'/>
            </div>
        </div>
    </div>
  )
}

export default NotFound