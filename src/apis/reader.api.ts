import type { CreateReaderType, GetReadersParamsType, ReaderType, UpdateReaderType } from '@/types/reader.type'

import type { AxiosResponse } from 'axios'
import type { PaginationType } from '@/types/common.type'
import instance from '@/configs/instance'

export const readerApi = {
	// tạo hồ sơ độc giả mới
	createReader: async (data: CreateReaderType): Promise<AxiosResponse<ReaderType>> => {
		return await instance.post('/api/readers', data)
	},

	// lấy thông tin độc giả
	getReaderByUserId: async (userId: string): Promise<ReaderType> => {
		const response = await instance.get(`/api/readers/user/${userId}`)
		return response.data
	},

	// cập nhật thông tin độc giả
	updateReader: async (readerId: string, data: UpdateReaderType): Promise<ReaderType> => {
		const response = await instance.patch(`/api/readers/${readerId}`, data)
		return response.data
	},

	// get readers
	getReaders: async (parmas?: GetReadersParamsType): Promise<PaginationType<ReaderType>> => {
		const response = await instance.get('/api/readers', { params: parmas })
		return response.data
	}
}
