import { authApis } from '@/apis/auth.api'
import type { ResetPasswordRequest } from '@/types/auth.type'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useResetPassword = () => {
	const navigate = useNavigate()
	const mutation = useMutation({
		mutationKey: ['resetPassword'],
		mutationFn: async (payload: ResetPasswordRequest) => {
			return await authApis.resetpassword(payload)
		},
		onSuccess: (data) => {
			console.log(data)
			toast.success('Đặt lại mật khẩu thành công!')
			navigate('/')
		},
		onError: () => {
			toast.error('Có lỗi xảy ra. Vui lòng thử lại sau!')
		}
	})
	return {
		resetPasswordAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isSuccess: mutation.isSuccess,
		isError: mutation.isError,
		error: mutation.error,
		reset: mutation.reset
	}
}
