import axiosInstance from '@/configs/instance'
import type { ReaderTypes, UpdateReaderTypesById } from '@/types/reader-types.type'

export const readerTypeApi = {
	// lấy danh sách loại độc giả ko phân trang
	getReaderTypes: async (): Promise<ReaderTypes[]> => {
		const response = await axiosInstance.get('/api/reader-types/all')
		return response.data
	},
	// cập nhật loại độc giả theo id
	updateReaderTypesById: async (id: string, data: UpdateReaderTypesById): Promise<ReaderTypes> => {
		const res = await axiosInstance.patch(`/api/reader-types/${id}`, data)
		return res.data
	}
}
