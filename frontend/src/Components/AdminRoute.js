import { Outlet,Navigate } from "react-router-dom"
import { UseSelector, useSelector } from "react-redux"


const AdminRoute = () => {
    const {userInfo} = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' replace />;
    
  
}

export default AdminRoute;