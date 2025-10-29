import { useMutation } from '@tanstack/react-query'
import { publisherApi } from '@/apis/publisher.api'
import type { UpdatePublisherType } from '@/types/publisher.type'

export const useUpdateUser = () => {
	return useMutation({
		mutationKey: [publisherApi.updatePublisher.name],
		mutationFn: ({ publisherId, payload }: { publisherId: string; payload: UpdatePublisherType }) =>
			publisherApi.updatePublisher(publisherId, payload)
	})
}
