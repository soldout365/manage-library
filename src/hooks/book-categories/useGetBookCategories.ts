import type { BookCategoryParamsType } from '@/types/book-category.type'
import { bookCategoryApi } from '@/apis/book-category.api'
import { useQuery } from '@tanstack/react-query'

export const useBookCategories = (params?: BookCategoryParamsType, enabled: boolean = true) => {
	return useQuery({
		queryKey: [bookCategoryApi.getBookCategories.name, params],
		queryFn: () => bookCategoryApi.getBookCategories(params),
		enabled: enabled
	})
}
