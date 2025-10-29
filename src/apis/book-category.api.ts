import type {
	BookCategoryCreateType,
	BookCategoryParamsType,
	BookCategoryType,
	BookCategoryUpdateType,
	SearchBookCategoryParamsType
} from '@/types/book-category.type'

import axiosInstance from '@/configs/instance'
import type { PaginationType } from '@/types/common.type'

export const bookCategoryApi = {
	// get book categories
	getBookCategories: async (params?: BookCategoryParamsType): Promise<PaginationType<BookCategoryType>> => {
		const response = await axiosInstance.get<PaginationType<BookCategoryType>>('/api/book-categories', {
			params
		})
		return response.data
	},
	createBookCategory: async (data: BookCategoryCreateType): Promise<BookCategoryType> => {
		const response = await axiosInstance.post<BookCategoryType>('/api/book-categories', data)
		return response.data
	},
	updateBookCategory: async (id: string, data: BookCategoryUpdateType): Promise<BookCategoryType> => {
		const response = await axiosInstance.patch<BookCategoryType>(`/api/book-categories/${id}`, data)
		return response.data
	},
	deleteBookCategory: async (id: string): Promise<void> => {
		await axiosInstance.delete<void>(`/api/book-categories/${id}`)
	},
	searchBookcategory: async (params: SearchBookCategoryParamsType): Promise<PaginationType<BookCategoryType>> => {
		const response = await axiosInstance.get('/api/book-categories/search', {
			params
		})
		return response.data
	}
}
