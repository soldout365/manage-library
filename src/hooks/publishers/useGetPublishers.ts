import type { PublisherParams } from '@/types/publisher.type'
import { publisherApi } from '@/apis/publisher.api'
import { useQuery } from '@tanstack/react-query'

export const usePublisers = (params?: PublisherParams, enabled: boolean = true) => {
	return useQuery({
		queryKey: [publisherApi.getPublishers.name, params],
		queryFn: () => publisherApi.getPublishers(params),
		enabled: enabled
	})
}
