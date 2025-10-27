import type { BookQueryParamsType } from '@/types/book.type'
import { bookApi } from '@/apis/book.api'
import { useQuery } from '@tanstack/react-query'

export const useBooks = (params?: BookQueryParamsType, enabled: boolean = true) => {
	return useQuery({
		queryKey: [bookApi.getBooks.name, params],
		queryFn: () => bookApi.getBooks(params),
		enabled: enabled
	})
}
