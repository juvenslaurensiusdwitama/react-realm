import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import Quest from './pages/Quest/Quest'
import Profile from './pages/Profile/Profile'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/quest' element={<Quest/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/shop' element={<Shop/>}/>
      </Routes>
    </>
  )
}

export default App
