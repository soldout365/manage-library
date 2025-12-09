import { bookCategoryApi } from '@/apis/book-category.api'
import type { BookCategoryUpdateType } from '@/types/book-category.type'
import { useMutation } from '@tanstack/react-query'

export const useUpdateBookCategory = () => {
	return useMutation({
		mutationKey: [bookCategoryApi.updateBookCategory.name],
		mutationFn: ({ id, data }: { id: string; data: BookCategoryUpdateType }) =>
			bookCategoryApi.updateBookCategory(id, data)
	})
}
