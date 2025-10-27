import { userApi } from '@/apis/user.api'
import { useMutation } from '@tanstack/react-query'

export const useDeleteUser = () => {
	return useMutation({
		mutationKey: [userApi.deleteUser.name],
		mutationFn: (userId: string) => userApi.deleteUser(userId)
	})
}
