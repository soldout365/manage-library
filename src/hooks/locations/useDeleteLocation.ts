import { useMutation } from '@tanstack/react-query'
import { locationApi } from '@/apis/location.api'

export const useDeleteUser = () => {
	return useMutation({
		mutationKey: [locationApi.deleteLocation.name],
		mutationFn: (locationId: string) => locationApi.deleteLocation(locationId)
	})
}
