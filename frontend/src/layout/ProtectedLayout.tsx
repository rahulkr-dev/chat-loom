import { useAuthStore } from '@/store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedLayout = () => {
  const {auth} = useAuthStore()
  if(!auth){
    return <Navigate to={'/login'} />
  }
  return (
    <Outlet />
  )
}

export default ProtectedLayout