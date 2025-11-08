import type { BookCategoryCreateType } from '@/types/book-category.type'
import { bookCategoryApi } from '@/apis/book-category.api'
import { useMutation } from '@tanstack/react-query'

export const useCreateBookCategory = () => {
	const mutation = useMutation({
		mutationFn: (data: BookCategoryCreateType) => bookCategoryApi.createBookCategory(data)
	})

	return mutation
}
