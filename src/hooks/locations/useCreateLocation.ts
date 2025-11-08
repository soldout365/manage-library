import { useMutation } from '@tanstack/react-query'
import type { CreateLocationType } from '@/types/location.type'
import { locationApi } from '@/apis/loaction.api'

export const useCreateLocation = () => {
	const mutation = useMutation({
		mutationFn: (payload: CreateLocationType) => locationApi.createLocation(payload)
	})

	return mutation
}
