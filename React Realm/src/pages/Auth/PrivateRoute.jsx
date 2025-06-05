import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const isLogin = sessionStorage.getItem('isLogin')
  if (!isLogin) {
    return <Navigate to={'/login'} />
  } else {
    return <Outlet />
  }
}

export default PrivateRoute