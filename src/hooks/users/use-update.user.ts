import { userApi } from '@/apis/user.api';
import type { UpdateUserType } from '@/types/user.type';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUser = () => {
	return useMutation({
		mutationKey: [userApi.updateUser.name],
		mutationFn: ({ userId, data }: { userId: string; data: UpdateUserType }) =>
			userApi.updateUser(userId, data),
	});
};
