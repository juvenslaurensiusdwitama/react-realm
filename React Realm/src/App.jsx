import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import Quest from './pages/Quest/Quest'
import NotFound from './components/NotFound'
import QuestRoutes from './pages/Quest/components/QuestRoutes'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import PrivateRoute from './pages/Auth/PrivateRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/quest' element={<Quest/>}/>
          <Route path='/quest/:id' element={<QuestRoutes/>}/>
          <Route path='/shop' element={<Shop/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
