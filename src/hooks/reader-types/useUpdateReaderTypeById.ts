import { readerTypeApi } from '@/apis/reader-type.api'
import type { UpdateReaderTypesById } from '@/types/reader-types.type'
import { useMutation } from '@tanstack/react-query'

export const useUpdateReaderTypesById = () => {
	return useMutation({
		mutationKey: [readerTypeApi.updateReaderTypesById.name],
		mutationFn: async ({ id, payload }: { id: string; payload: UpdateReaderTypesById }) =>
			await readerTypeApi.updateReaderTypesById(id, payload)
	})
}
