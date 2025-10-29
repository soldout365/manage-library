import { useQuery } from '@tanstack/react-query'
import type { SearchBookCategoryParamsType } from '@/types/book-category.type'
import { bookCategoryApi } from '@/apis/book-category.api'

export const useSearchBookCategory = (params: SearchBookCategoryParamsType, isSearchMode?: boolean) => {
	return useQuery({
		queryKey: [bookCategoryApi.searchBookcategory.name, params],
		queryFn: () => bookCategoryApi.searchBookcategory(params),
		enabled: isSearchMode && !!params.q && params.q.trim().length > 0, // ✅ thêm dòng này
		staleTime: 2000
	})
}
