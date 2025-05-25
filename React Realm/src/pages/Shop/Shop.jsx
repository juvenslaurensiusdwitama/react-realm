import Menu from "../../components/Menu"
import bgShop from '../../assets/bg-shop.jpg'
import ShopList from "./components/ShopList"

const Shop = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${bgShop})` }}
    >
      <Menu />
      <ShopList />
    </div>
  )
}

export default Shop