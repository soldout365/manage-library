import instance from '@/configs/instance'
import type { UploadResponseType } from '@/types/upload.type'

export const uploadApi = {
	// get file by slug
	getBySlug: async (slug: string): Promise<UploadResponseType> => {
		const response = await instance.get<UploadResponseType>(`/api/uploads/slug/${slug}`)
		return response.data
	},

	//download file by id
	downloadById: async (id: string): Promise<Blob> => {
		const response = await instance.get<Blob>(`/api/uploads/${id}/download`, {
			responseType: 'blob'
		})
		return response.data
	}
}
