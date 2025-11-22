import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryParams } from '../useQueryParam'
import { physicalCopiesApi } from '@/apis/physical-copies.api'
import type { CreatePhysicalBookReq, CreatePhysicalBookRes } from '@/types/physical-copies.type'
import { useParams } from 'react-router-dom'

export const useCreatePhysicalCopy = () => {
	//
	const queryClient = useQueryClient()

	const queryParams = useQueryParams()

	const params = useParams<{ id: string }>()
	const bookId = params.id
	return useMutation({
		mutationKey: [physicalCopiesApi.createPhysicalCopy.name],
		mutationFn: async (data: CreatePhysicalBookReq) => physicalCopiesApi.createPhysicalCopy(data),

		onSuccess: (data: CreatePhysicalBookRes) => {
			queryClient.invalidateQueries({
				queryKey: [physicalCopiesApi.getPhysicalCopyByBookId.name, bookId, queryParams]
			})
		},
		onError: () => {
			console.log('Error create physical copy')
		}
	})
}
