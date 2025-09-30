import { authApis } from '@/apis/auth.api'
import type { ForgotPasswordRequest } from '@/types/auth.type'
import { useMutation } from '@tanstack/react-query'

import { toast } from 'sonner'

export const useForgotPassword = () => {
	const mutation = useMutation({
		mutationKey: ['forgotPassword'],
		mutationFn: async (payload: ForgotPasswordRequest) => {
			return await authApis.forgotpassword(payload)
		},
		onSuccess: (data) => {
			toast.success('Đã gửi mã đặt lại mật khẩu đến email của bạn')
		},
		onError: (error) => {
			toast.error('Có lỗi xảy ra. Vui lòng thử lại sau!')
		}
	})
	return {
		forgotPasswordAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
		reset: mutation.reset
	}
}
