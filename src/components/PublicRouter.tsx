import { useAuthStore } from '@/stores/auth.store'
import { Navigate } from 'react-router-dom'

const PublicRouter = ({ children }: { children: React.ReactNode }) => {
	const { accessToken } = useAuthStore()
	if (accessToken) return <Navigate to='/' />
	return <>{children}</>
}

export default PublicRouter
