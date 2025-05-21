import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-center">
            <ul className="flex gap-5">
                <li className="cursor-pointer" onClick={() => navigate('/')}>Home</li>
                <li className="cursor-pointer" onClick={() => navigate('/quest')}>Quest</li>
                <li className="cursor-pointer" onClick={() =>navigate('/profile')}>Profile</li>
                <li className="cursor-pointer" onClick={() => navigate('/shop')}>Shop</li>
            </ul>
        </div>
    )
}

export default Menu