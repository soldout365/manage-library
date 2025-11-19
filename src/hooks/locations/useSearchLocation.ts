import { useQuery } from '@tanstack/react-query'
import type { SearchLocationParamsType } from '@/types/location.type'
import { locationApi } from '@/apis/location.api'

export const useSearchLocation = (params: SearchLocationParamsType, isSearchMode?: boolean) => {
	return useQuery({
		queryKey: [locationApi.searchLocations.name, params],
		queryFn: () => locationApi.searchLocations(params)
	})
}
