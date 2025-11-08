import instance from '@/configs/instance'
import type { ImageType } from '@/types/image.type'

export const imageApi = {
	// upload image
	uploadImage: async (file: File): Promise<ImageType> => {
		const formData = new FormData()
		formData.append('file', file)

		const response = await instance.post('/api/images/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		return response.data
	}
}
