import { authorApi } from '@/apis/author.api'
import { useMutation } from '@tanstack/react-query'

export const useDeleteAuthorById = () => {
	return useMutation({
		mutationKey: [authorApi.deleteAuthor.name],
		mutationFn: async (id: string) => await authorApi.deleteAuthor(id)
	})
}
