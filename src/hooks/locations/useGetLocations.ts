import { useQuery } from '@tanstack/react-query'
import type { QueryParamsType } from '@/types/common.type'
import { locationApi } from '@/apis/loaction.api'

export const useGetLocations = (params?: QueryParamsType, enabled: boolean = true) => {
	return useQuery({
		queryKey: [locationApi.getLocations.name, params],
		queryFn: () => locationApi.getLocations(params),
		enabled: enabled
	})
}
