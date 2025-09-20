import { useAuthStore } from '@/stores/auth.store'
import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
	const { accessToken } = useAuthStore()
	if (!accessToken) return <Navigate to='/login' />
	return <>{children}</>
}

export default PrivateRouter
