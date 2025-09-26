//hook đen page den api
//
import { authApis } from '@/apis/auth.api'
import type { ChangePasswordForm, ChangePasswordRequest } from '@/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useChangePassword = () => {
	const navigate = useNavigate()
	const mutation = useMutation({
		mutationKey: ['changePassword'],
		mutationFn: async (payload: ChangePasswordRequest) => {
			return await authApis.changepassword(payload)
		},
		onSuccess: (data) => {
			console.log(data)
			toast.success('Đổi mật khẩu thành công!')
			navigate('/login')
		},
		onError: (error: any) => {
			console.log(error)
			// Handle different error cases based on status code
			if (error?.response?.status === 401) {
				toast.error('Mật khẩu hiện tại không chính xác')
			} else {
				toast.error('Đổi mật khẩu thất bại. Vui lòng thử lại!')
			}
		}
	})

	return {
		changePassword: mutation.mutate,
		changePasswordAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
		reset: mutation.reset
	}
}
