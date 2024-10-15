import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"


const PrivateRoutes = () => {
    const user = useSelector((state) => state.auth.user);
    return user ? <Outlet/> : <Navigate to='/dashboard'/>
}

export default PrivateRoutes