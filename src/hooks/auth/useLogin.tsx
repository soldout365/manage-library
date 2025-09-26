// ko dc long nhau
// call truc tiep den api

import { authApis } from '@/apis/auth.api'
import { userApis } from '@/apis/user.api'
import { useAuthStore } from '@/stores/auth.store'
import type { LoginRequest } from '@/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
	const navigate = useNavigate()
	const { setToken, setUser, clearAuth } = useAuthStore()

	const result = useMutation({
		mutationKey: ['login'],
		mutationFn: async (payload: LoginRequest) => {
			return await authApis.login(payload)

			//return gi thi data ben duoi success nhan vao
		},

		onSuccess: async (data) => {
			try {
				const userInfo = await userApis.getInfoCurrentUser(data.access_token)
				console.log(data)

				if (userInfo.role !== 'admin') {
					clearAuth()
					alert('Chỉ admin mới có thể đăng nhập!')
					navigate('/login')
					return
				}
				setToken(data.access_token)
				setUser(userInfo)
				navigate('/')
			} catch (error) {
				clearAuth()
				navigate('/login')
			}
		},

		onError: (error) => {
			clearAuth()
		}
	})

	const logout = () => {
		clearAuth()
		navigate('/login')
	}
	return { ...result, logout }
}
