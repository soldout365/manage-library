import { authorApi } from '@/apis/author.api'
import type { CreateAuthorPayload } from '@/types/author.type'
import { useMutation } from '@tanstack/react-query'

export const useCreateAthor = () => {
	return useMutation({
		mutationKey: [authorApi.createAuthor.name],
		mutationFn: async (payload: CreateAuthorPayload) => await authorApi.createAuthor(payload)
	})
}
