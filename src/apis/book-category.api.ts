import type { BookCategoryParamsType, BookCategoryType } from '@/types/book-category.type'

import type { PaginationType } from '@/types/common.type'
import axiosInstance from '@/configs/instance'

export const bookCategoryApi = {
	// get book categories
	getBookCategories: async (params?: BookCategoryParamsType): Promise<PaginationType<BookCategoryType>> => {
		const response = await axiosInstance.get<PaginationType<BookCategoryType>>('/api/book-categories', {
			params
		})
		return response.data
	}
}
