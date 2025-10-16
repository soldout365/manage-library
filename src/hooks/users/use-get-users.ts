import type { GetUsersParamsType } from '@/types/user.type';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/apis/user.api';

export const useGetUsers = (
	params?: GetUsersParamsType,
	enabled: boolean = true
) => {
	return useQuery({
		queryKey: [userApi.getUsers.name, params],
		queryFn: () => userApi.getUsers(params),
		enabled: enabled,
	});
};
