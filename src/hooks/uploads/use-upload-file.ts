import { uploadApi } from '@/apis/upload.api'
import { useMutation } from '@tanstack/react-query'

export const useUploadFile = () => {
	return useMutation({
		mutationKey: [uploadApi.upload.name],
		mutationFn: (data: FormData) => uploadApi.upload(data)
	})
}
