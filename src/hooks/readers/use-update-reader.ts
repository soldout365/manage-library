import { readerApi } from '@/apis/reader.api'
import { type UpdateReaderType } from '@/types/reader.type'
import { useMutation } from '@tanstack/react-query'

export const useUpdateReader = () => {
	return useMutation({
		mutationKey: [readerApi.updateReader.name],
		mutationFn: ({ readerId, data }: { readerId: string; data: UpdateReaderType }) =>
			readerApi.updateReader(readerId, data)
	})
}
