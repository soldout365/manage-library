import { useMutation } from '@tanstack/react-query'

import { imageApi } from '@/apis/image.api'
import { toast } from 'sonner'

export const useUploadImage = () => {
	// const queryClient = useQueryClient();

	const mutationUploadImage = useMutation({
		mutationFn: async (file: File) => {
			// validate file
			if (!file.type.startsWith('image/')) {
				throw new Error('File is not an image')
			}

			// validate file size
			if (file.size > 10 * 1024 * 1024) {
				throw new Error('File ảnh không được lớn hơn 10MB')
			}

			// upload image
			const response = await imageApi.uploadImage(file)

			return response
		},
		onSuccess: (data) => {
			console.log('🚀 ~ useUploadImage ~ data:', data)
		},
		onError: (error) => {
			console.log('🚀 ~ useUploadImage ~ error:', error)
			toast.error('Upload ảnh thất bại', {
				description: error.message
			})
		}
	})

	return mutationUploadImage
}
