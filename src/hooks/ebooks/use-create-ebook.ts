import type { EBookType, EbookCreateType, EbookQueryParamsType } from '@/types/ebook.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ebookApi } from '@/apis/ebook.api'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useQueryParams } from '@/hooks/useQueryParam'

export const useCreateEbook = () => {
	const queryClient = useQueryClient()
	const params = useParams()
	const bookId = params.id

	const queryParams = useQueryParams() as EbookQueryParamsType

	return useMutation({
		mutationKey: [ebookApi.createEbook.name],
		mutationFn: (payload: EbookCreateType) => ebookApi.createEbook(payload),
		onSuccess: (data: EBookType) => {
			console.log('🚀 ~ useCreateEbook ~ data:', data)
			queryClient.invalidateQueries({
				queryKey: [ebookApi.getEbookByBookId.name, bookId, queryParams]
			})
		},
		onError: () => {
			toast.error('Tạo ebook thất bại')
		}
	})
}
