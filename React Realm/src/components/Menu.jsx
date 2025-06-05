import { useNavigate } from 'react-router-dom';
import Home from '../assets/home.png'
import Quest from '../assets/quest.png'
import Shop from '../assets/shop.png'
import Logout from '../assets/logout.png'

const Menu = () => {
    const navigate = useNavigate();
    const onLogout = () =>{
        sessionStorage.clear();
        navigate('/login')
    }

    return (
        <div className="flex items-center gap-5 py-10">
            <img src={Home} alt="Home" className="cursor-pointer h-[60px]" onClick={() => navigate('/')} />
            <img src={Quest} alt="Quest" className="cursor-pointer h-[60px]" onClick={() => navigate('/quest')} />
            <img src={Shop} alt="Shop" className="cursor-pointer h-[60px]" onClick={() => navigate('/shop')} />
            <img src={Logout} alt="Logout" className="cursor-pointer h-[52px]" onClick={() => onLogout()} />
        </div>
    )
}

export default Menu