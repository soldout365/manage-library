import type {
	CreateReaderForUserType,
	CreateUserType,
	GetUsersParamsType,
	UpdateUserType,
	UserType
} from '@/types/user.type'

import type { PaginationType } from '@/types/common.type'
import type { ReaderType } from '@/types/reader.type'
import axiosInstance from '@/configs/instance'

export const userApi = {
	// tạo mới người dùng
	createUser: async (data: CreateUserType): Promise<UserType> => {
		const response = await axiosInstance.post('/api/users', data)
		return response.data
	},

	// tạo reader cho users
	createReaderForUser: async (userId: string, data: CreateReaderForUserType): Promise<ReaderType> => {
		const response = await axiosInstance.post(`/api/users/${userId}/reader`, data)
		return response.data
	},

	// lấy thông tin người dùng
	getUser: async (token: string): Promise<UserType> => {
		const response = await axiosInstance.get('/api/users/me', {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json'
			}
		})
		return response.data
	},

	// lấy danh sách người dùng
	getUsers: async (params?: GetUsersParamsType): Promise<PaginationType<UserType>> => {
		const response = await axiosInstance.get('/api/users', { params })
		return response.data
	},

	// cập nhật thông tin người dùng
	updateUser: async (userId: string, data: UpdateUserType): Promise<UserType> => {
		const response = await axiosInstance.patch(`/api/users/${userId}`, data)
		return response.data
	},
	deleteUser: async (id: string): Promise<void> => {
		await axiosInstance.delete(`/api/users/${id}`)
	}
}
