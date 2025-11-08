import type { BookCreateType, BookQueryParamsType } from '@/types/book.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { bookApi } from '@/apis/book.api'
import { toast } from 'sonner'
import { useQueryParams } from '../useQueryParam'

export const useBooks = (params?: BookQueryParamsType, enabled: boolean = true) => {
	return useQuery({
		queryKey: [bookApi.getBooks.name, params],
		queryFn: () => bookApi.getBooks(params),
		enabled: enabled
	})
}

export const useDeleteBook = () => {
	const queryParams = useQueryParams() as BookQueryParamsType
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: [bookApi.deleteBook.name],
		mutationFn: (bookId: string) => bookApi.deleteBook(bookId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [bookApi.getBooks.name, queryParams]
			})
			toast.success('Xóa sách thành công', {
				description: 'Sách đã được xóa thành công'
			})
		}
	})
}

export const useGetBookById = (bookId?: string, enabled: boolean = true) => {
	return useQuery({
		queryKey: [bookApi.getBookById.name, bookId],
		queryFn: () => bookApi.getBookById(bookId as string),
		enabled: enabled && !!bookId
	})
}

export const useUpdateBook = () => {
	const queryParams = useQueryParams() as BookQueryParamsType
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: [bookApi.updateBook.name],
		mutationFn: (data: BookCreateType & { id: string }) => bookApi.updateBook(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [bookApi.getBooks.name, queryParams]
			})
			toast.success('Cập nhật sách thành công', {
				description: 'Sách đã được cập nhật thành công'
			})
		},
		onError: (error) => {
			toast.error('Cập nhật sách thất bại', {
				description: error.message
			})
		}
	})
}
