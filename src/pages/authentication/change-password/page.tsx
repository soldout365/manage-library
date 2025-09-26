'use client'

import { useChangePassword } from '@/hooks/auth/useChangePassword'
import { required } from '@/lib/validate'
import type { ChangePasswordForm } from '@/types/auth.type'
import type React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const ChangePasswordPage: React.FC = () => {
	const { changePasswordAsync, isLoading, reset } = useChangePassword()

	const [showCurrentPass, setShowCurrentPass] = useState(false)
	const [showNewPass, setShowNewPass] = useState(false)
	const [showConfirmPass, setShowConfirmPass] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		reset: resetForm
	} = useForm<ChangePasswordForm>({
		defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' }
	})

	const newPassword = watch('newPassword')
	const confirmNewPassword = watch('confirmNewPassword')

	const onSubmit = async (data: ChangePasswordForm) => {
		if (data.newPassword !== data.confirmNewPassword) {
			toast.error('Mật khẩu xác nhận không khớp!')
			return
		}
		const data2 = { currentPassword: data.currentPassword, newPassword: data.newPassword }
		changePasswordAsync(data2, {
			onSuccess: () => {
				console.log('fdsd')
				resetForm()
				reset() // Reset mutation state
			}
		})
	}

	return (
		<div className='h-screen max-h-screen overflow-hidden flex'>
			{/* Left background image */}
			<div
				className='hidden lg:block flex-1 bg-cover bg-center bg-no-repeat relative'
				style={{
					backgroundImage: 'url(https://i.postimg.cc/MZ7dYZLS/backgrundimg.webp)'
				}}
			>
				<div className='absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-amber-50/20'></div>

				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='text-center text-white max-w-md mx-auto px-8'>
						<div className='bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10'>
							<h2 className='text-3xl font-bold mb-4 drop-shadow-lg'>Chào mừng đến với</h2>
							<h3 className='text-4xl font-extrabold mb-6 text-amber-200 drop-shadow-lg'>Thư Viện Số</h3>
							<p className='text-lg opacity-90 drop-shadow leading-relaxed'>
								Khám phá kho tàng tri thức vô tận cùng hệ thống quản lý thư viện hiện đại và thông minh
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Form */}
			<div className='w-full lg:flex-1 lg:max-w-md xl:max-w-lg bg-gradient-to-bl from-amber-50/95 to-orange-50/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 relative overflow-hidden'>
				{/* Background decor */}
				<div className='absolute inset-0 opacity-10'>
					<div className='absolute top-16 right-8 w-20 h-20 sm:w-24 sm:h-24 border-2 border-amber-600 rounded-full'></div>
					<div className='absolute top-40 left-8 sm:left-12 w-12 h-12 sm:w-16 sm:h-16 border border-amber-500 rounded-lg rotate-45'></div>
					<div className='absolute bottom-32 right-12 sm:right-16 w-10 h-10 sm:w-12 sm:h-12 border border-amber-600 rounded-full'></div>
					<div className='absolute bottom-48 left-6 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 border-2 border-orange-500 rounded-lg rotate-12'></div>
				</div>

				{/* Main card */}
				<div className='w-full max-w-sm bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 relative z-10 mx-auto'>
					{/* Header */}
					<div className='text-center space-y-3 p-8 pb-6'>
						<div className='w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-4'>
							<svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
								/>
							</svg>
						</div>
						<h1 className='text-2xl font-bold text-gray-800 leading-tight'>Đổi mật khẩu</h1>
						<p className='text-amber-700 text-sm font-medium'>Cập nhật mật khẩu cho tài khoản của bạn</p>
					</div>

					{/* Form content */}
					<div className='p-8 pt-2 max-h-[calc(100vh-200px)] overflow-y-auto'>
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
							{/* Current password */}
							<div>
								<label
									htmlFor='currentPassword'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Mật khẩu hiện tại
								</label>
								<div className='relative'>
									<input
										id='currentPassword'
										type={showCurrentPass ? 'text' : 'password'}
										{...register('currentPassword', required('Vui lòng nhập mật khẩu hiện tại'))}
										className='w-full h-12 px-4 pr-12 border border-amber-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all duration-200'
										placeholder='Nhập mật khẩu hiện tại...'
									/>
									<button
										type='button'
										onClick={() => setShowCurrentPass(!showCurrentPass)}
										className='absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors'
									>
										{showCurrentPass ? (
											<svg
												className='w-5 h-5'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
												/>
											</svg>
										) : (
											<svg
												className='w-5 h-5'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
												/>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
												/>
											</svg>
										)}
									</button>
								</div>
							</div>

							{/* New password */}
							<div>
								<label htmlFor='newPassword' className='block text-sm font-semibold text-gray-700 mb-2'>
									Mật khẩu mới
								</label>
								<div className='relative'>
									<input
										id='newPassword'
										type={showNewPass ? 'text' : 'password'}
										{...register('newPassword', required('Vui lòng nhập mật khẩu mới'))}
										className='w-full h-12 px-4 pr-12 border border-amber-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all duration-200'
										placeholder='Nhập mật khẩu mới...'
									/>
									<button
										type='button'
										onClick={() => setShowNewPass(!showNewPass)}
										className='absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors'
									>
										{showNewPass ? (
											<svg
												className='w-5 h-5'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
												/>
											</svg>
										) : (
											<svg
												className='w-5 h-5'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
												/>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
												/>
											</svg>
										)}
									</button>
								</div>
							</div>

							{/* Confirm password */}
							<div>
								<label
									htmlFor='confirmNewPassword'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Xác nhận mật khẩu mới
								</label>
								<div className='relative'>
									<input
										id='confirmNewPassword'
										type={showConfirmPass ? 'text' : 'password'}
										{...register('confirmNewPassword', required('Vui lòng xác nhận mật khẩu mới'))}
										className='w-full h-12 px-4 pr-12 border border-amber-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all duration-200'
										placeholder='Nhập lại mật khẩu mới...'
									/>
									<button
										type='button'
										onClick={() => setShowConfirmPass(!showConfirmPass)}
										className='absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors'
									>
										{showConfirmPass ? (
											<svg
												className='w-5 h-5'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
												/>
											</svg>
										) : (
											<svg
												className='w-5 h-5'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
												/>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
												/>
											</svg>
										)}
									</button>
								</div>
							</div>

							{/* Indicator */}
							{confirmNewPassword && (
								<div
									className={`text-sm ${newPassword === confirmNewPassword ? 'text-green-600' : 'text-red-600'}`}
								>
									{newPassword === confirmNewPassword ? '✓ Mật khẩu khớp' : '✗ Mật khẩu không khớp'}
								</div>
							)}

							<button
								type='submit'
								disabled={isLoading}
								className='w-full h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-amber-200 rounded-xl'
							>
								{isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChangePasswordPage
