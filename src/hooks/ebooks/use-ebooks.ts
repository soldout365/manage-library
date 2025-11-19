import type { EbookQueryParamsType } from '@/types/ebook.type'
import { ebookApi } from '@/apis/ebook.api'
import { useQuery } from '@tanstack/react-query'

export const useEbookByBookId = (bookId: string, params?: EbookQueryParamsType, enabled: boolean = true) => {
	return useQuery({
		queryKey: [ebookApi.getEbookByBookId.name, bookId, params],
		queryFn: () => ebookApi.getEbookByBookId(bookId, params),
		enabled: enabled && !!bookId
	})
}
