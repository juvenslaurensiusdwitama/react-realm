import { useNavigate } from 'react-router-dom';
import Home from '../assets/home.png'
import Quest from '../assets/quest.png'
import Shop from '../assets/shop.png'

const Menu = () => {
    const navigate = useNavigate();
    return (
        <div className="flex gap-5 py-10">
            <img src={Home} alt="Home" className="cursor-pointer h-[60px]" onClick={() => navigate('/')} />
            <img src={Quest} alt="Quest" className="cursor-pointer h-[60px]" onClick={() => navigate('/quest')} />
            <img src={Shop} alt="Shop" className="cursor-pointer h-[60px]" onClick={() => navigate('/shop')} />
        </div>
    )
}

export default Menu