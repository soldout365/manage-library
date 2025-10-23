import { userApi } from '@/apis/user.api'
import { useQuery } from '@tanstack/react-query'

export const useGetMe = (token?: string, enabled: boolean = true) => {
	return useQuery({
		queryKey: [userApi.getUser.name, token],
		queryFn: () => userApi.getUser(token!),
		enabled: enabled && !!token
	})
}
