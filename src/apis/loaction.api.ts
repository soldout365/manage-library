import type { PaginationType, QueryParamsType } from '@/types/common.type'
import axiosInstance from '@/configs/instance'
import type {
	CreateLocationType,
	LocationType,
	SearchLocationParamsType,
	UpdateLocationType
} from '@/types/location.type'

export const locationApi = {
	// get location
	getLocations: async (params?: QueryParamsType): Promise<PaginationType<LocationType>> => {
		const response = await axiosInstance.get<PaginationType<LocationType>>('/api/locations', { params })
		return response.data
	},
	createLocation: async (payload: CreateLocationType): Promise<LocationType> => {
		const response = await axiosInstance.post<LocationType>('/api/locations', payload)
		return response.data
	},
	updateLocation: async (locationId: string, payload: UpdateLocationType): Promise<LocationType> => {
		const response = await axiosInstance.patch<LocationType>(`/api/locations/${locationId}`, payload)
		return response.data
	},
	deleteLocation: async (locationId: string): Promise<void> => {
		await axiosInstance.delete<void>(`/api/locations/${locationId}`)
	},
	searchLocations: async (params: SearchLocationParamsType): Promise<PaginationType<LocationType>> => {
		const response = await axiosInstance.get<PaginationType<LocationType>>('/api/locations/search', {
			params
		})
		return response.data
	}
}
