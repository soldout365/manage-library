import axiosInstance from '@/configs/instance'
import type { ReaderType, UpdateReaderRequest } from '@/types/reader.type'

export const readerApis = {
	getReaderByUserId: async (userId: string): Promise<ReaderType> => {
		const res = await axiosInstance.get(`/readers/user/${userId}`)
		return res.data
	},

	updateReader: async (readerId: string, data: UpdateReaderRequest): Promise<ReaderType> => {
		const res = await axiosInstance.put(`/readers/${readerId}`, data)
		return res.data
	}
}
