import type { BookCreateType, BookQueryParamsType, BookType } from '@/types/book.type'

import type { PaginationType } from '@/types/common.type'
import instance from '@/configs/instance'

export const bookApi = {
	// get books
	getBooks: async (params?: BookQueryParamsType): Promise<PaginationType<BookType>> => {
		const response = await instance.get<PaginationType<BookType>>('/api/books', {
			params
		})
		return response.data
	},

	// create book
	createBook: async (data: BookCreateType): Promise<BookType> => {
		const response = await instance.post('/api/books', data)
		return response.data
	},

	// delete book
	deleteBook: async (bookId: string): Promise<void> => {
		const response = await instance.delete(`/api/books/${bookId}`)
		return response.data
	},

	// get book by id
	getBookById: async (bookId: string): Promise<BookType> => {
		const response = await instance.get(`/api/books/${bookId}`)
		return response.data
	},

	// update book
	updateBook: async (data: BookCreateType & { id: string }): Promise<BookType> => {
		const response = await instance.patch(`/api/books/${data.id}`, data)
		return response.data
	}
}
