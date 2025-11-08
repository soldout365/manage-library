import { useMutation } from '@tanstack/react-query'
import { publisherApi } from '@/apis/publisher.api'

export const useDeleteUser = () => {
	return useMutation({
		mutationKey: [publisherApi.deletePublisher.name],
		mutationFn: (publisheId: string) => publisherApi.deletePublisher(publisheId)
	})
}
