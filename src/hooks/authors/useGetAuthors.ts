import { authorApi } from '@/apis/author.api'
import type { GetAuthorsParamsType } from '@/types/author.type'
import { useQuery } from '@tanstack/react-query'

export const useGetAuthors = (params?: GetAuthorsParamsType) => {
	return useQuery({
		queryKey: [authorApi.getAuthors.name, params],
		queryFn: async () => await authorApi.getAuthors(params)
	})
}
