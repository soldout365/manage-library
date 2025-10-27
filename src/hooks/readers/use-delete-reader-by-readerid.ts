import { readerApi } from '@/apis/reader.api'
import { useMutation } from '@tanstack/react-query'

export const useDeleteReaderByReaderId = () => {
	return useMutation({
		mutationKey: [readerApi.deleteReaderByReaderId.name],
		mutationFn: (readerId: string) => readerApi.deleteReaderByReaderId(readerId)
	})
}
