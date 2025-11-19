import { locationApi } from '../../apis/location.api'
import { useMutation } from '@tanstack/react-query'
import type { UpdateLocationType } from '@/types/location.type'

export const useUpdateLocation = () => {
	return useMutation({
		mutationKey: [locationApi.updateLocation.name],
		mutationFn: ({ locationId, payload }: { locationId: string; payload: UpdateLocationType }) =>
			locationApi.updateLocation(locationId, payload)
	})
}
