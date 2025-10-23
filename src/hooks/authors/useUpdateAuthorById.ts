import { authorApi } from '@/apis/author.api'
import type { UpdateAuthorPayload } from '@/types/author.type'
import { useMutation } from '@tanstack/react-query'

export const useUpdateAuthorById = () => {
	return useMutation({
		mutationKey: [authorApi.updateAuthor.name],
		mutationFn: async ({ id, payload }: { id: string; payload: UpdateAuthorPayload }) =>
			await authorApi.updateAuthor(id, payload)
	})
}
