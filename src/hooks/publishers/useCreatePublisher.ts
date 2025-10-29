import { useMutation } from '@tanstack/react-query'
import type { CreatePublisherType } from '@/types/publisher.type'
import { publisherApi } from '@/apis/publisher.api'

export const useCreatePublisher = () => {
	const mutation = useMutation({
		mutationFn: (payload: CreatePublisherType) => publisherApi.createPublisher(payload)
	})

	return mutation
}
