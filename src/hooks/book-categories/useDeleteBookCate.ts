import { bookCategoryApi } from '@/apis/book-category.api'
import { useMutation } from '@tanstack/react-query'

export const useDeleteBookCategory = () => {
	return useMutation({
		mutationKey: [bookCategoryApi.deleteBookCategory.name],
		mutationFn: (id: string) => bookCategoryApi.deleteBookCategory(id)
	})
}
