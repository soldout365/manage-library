import axiosInstance from '@/configs/instance'
import type {
	ChangePasswordRequest,
	ForgotPasswordRequest,
	ForgotPasswordResponse,
	LoginRequest,
	LoginResponse,
	ResetPasswordRequest,
	ResetPasswordResponse
} from '@/types/auth.type'

export const authApis = {
	login: async (payload: LoginRequest): Promise<LoginResponse> => {
		const res = await axiosInstance.post<LoginResponse>('/api/auth/login', payload)
		console.log('Login API Response:', res)
		return res.data
	},
	changepassword: async (payload: ChangePasswordRequest) => {
		const res = await axiosInstance.post('/api/auth/change-password', payload)
		return res.data
	},
	forgotpassword: async (payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
		const res = await axiosInstance.post('/api/auth/forgot-password', payload)
		return res.data
	},
	resetpassword: async (payload: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
		const res = await axiosInstance.post('/api/auth/reset-password', payload)
		return res.data
	}
}
