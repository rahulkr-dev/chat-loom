import { useAuthStore } from "@/store/useAuthStore"
import {Navigate, Outlet} from "react-router-dom"
const AuthLayout= () => {
  const {auth} = useAuthStore();
  if(auth) return <Navigate to={"/"} />
  return <Outlet />
}


export default AuthLayout