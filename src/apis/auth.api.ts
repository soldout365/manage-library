import axiosInstance from '@/configs/instance'
import type { LoginRequest, LoginResponse } from '@/types/auth.type'

export const authApis = {
	login: async (payload: LoginRequest): Promise<LoginResponse> => {
		const res = await axiosInstance.post<LoginResponse>('/auth/login', payload)
		console.log('Login API Response:', res)
		return res.data
	}
}
