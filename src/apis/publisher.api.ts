import type { CreatePublisherType, PublisherParams, PublisherType, UpdatePublisherType } from '@/types/publisher.type'

import type { PaginationType } from '@/types/common.type'
import axiosInstance from '@/configs/instance'

export const publisherApi = {
	// get publishers
	getPublishers: async (params?: PublisherParams): Promise<PaginationType<PublisherType>> => {
		const response = await axiosInstance.get<PaginationType<PublisherType>>('/api/publishers', { params })
		return response.data
	},
	createPublisher: async (payload: CreatePublisherType): Promise<PublisherType> => {
		const response = await axiosInstance.post<PublisherType>('/api/publishers', payload)
		return response.data
	},
	updatePublisher: async (publisherId: string, payload: UpdatePublisherType): Promise<PublisherType> => {
		const response = await axiosInstance.patch<PublisherType>(`/api/publishers/${publisherId}`, payload)
		return response.data
	},
	deletePublisher: async (publisherId: string): Promise<void> => {
		await axiosInstance.delete<void>(`/api/publishers/${publisherId}`)
	}
}
