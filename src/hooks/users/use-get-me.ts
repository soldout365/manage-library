import { userApi } from '@/apis/user.api'
import { useQuery } from '@tanstack/react-query'

export const useGetMe = (enabled: boolean = true) => {
	return useQuery({
		queryKey: [userApi.getUser.name],
		queryFn: () => userApi.getUser(),
		enabled
	})
}
