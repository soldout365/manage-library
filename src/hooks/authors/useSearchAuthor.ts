import { useQuery } from '@tanstack/react-query'
import { authorApi } from '@/apis/author.api'
import type { SearchAuthorsParamsType } from '@/types/author.type'

export const useSearchAuthors = (params: SearchAuthorsParamsType) => {
	return useQuery({
		queryKey: ['searchAuthors', params],
		queryFn: () => authorApi.searchAuthors(params),
		enabled: !!params.q && params.q.trim().length > 0,
		staleTime: 2000
	})
}
