import type { CreateUserType } from '@/types/user.type'
import { useMutation } from '@tanstack/react-query'
import { userApi } from '@/apis/user.api'

export const useCreateUser = () => {
	const mutation = useMutation({
		mutationFn: (data: CreateUserType) => userApi.createUser(data)
	})

	return mutation
}
