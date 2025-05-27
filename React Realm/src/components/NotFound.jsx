import { useNavigate } from 'react-router-dom'
import troll404 from '../assets/image404.png'
import bg404 from '../assets/bg404.jpg'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div 
        className="flex justify-center items-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg404})` }}
    >
        <div className='flex flex-col items-center text-[#633a1c] font-semibold text-[36px]'>
            <p className=''>Error 404</p>
            <img src={troll404} alt="" className='h-[450px]'/>
            <p>Page not found</p>
            <button onClick={() => navigate('/')} className='cursor-pointer'>Back</button>
        </div>
    </div>
  )
}

export default NotFound