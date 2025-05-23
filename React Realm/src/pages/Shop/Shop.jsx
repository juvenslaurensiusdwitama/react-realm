import Menu from "../../components/Menu"
import bgShop from '../../assets/bg-shop.jpg'

const Shop = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: `url(${bgShop})` }}
    >
      <Menu />
      <h1>SHOP</h1>
    </div>
  )
}

export default Shop