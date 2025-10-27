import type { BookQueryParamsType, BookType } from '@/types/book.type'

import type { PaginationType } from '@/types/common.type'
import axiosInstance from '@/configs/instance'

export const bookApi = {
	// get books
	getBooks: async (params?: BookQueryParamsType): Promise<PaginationType<BookType>> => {
		const response = await axiosInstance.get<PaginationType<BookType>>('/api/books', {
			params
		})
		return response.data
	}
}
