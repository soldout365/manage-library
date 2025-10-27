import type { PublisherParams, PublisherType } from '@/types/publisher.type'

import type { PaginationType } from '@/types/common.type'
import axiosInstance from '@/configs/instance'

export const publisherApi = {
	// get publishers
	getPublishers: async (params?: PublisherParams): Promise<PaginationType<PublisherType>> => {
		const response = await axiosInstance.get<PaginationType<PublisherType>>('/api/publishers', { params })
		return response.data
	}
}
