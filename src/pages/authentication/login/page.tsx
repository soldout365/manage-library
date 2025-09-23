import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useLogin } from '@/hooks/auth/useLogin'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const loginFormSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.'
	}),
	password: z.string().min(6, {
		message: 'Mật khẩu phải có ít nhất 6 ký tự.'
	})
})

const LoginPage = () => {
	const [showPass, setShowPass] = useState(false)

	const { mutate: login, isPending, error } = useLogin()

	// 1. Define your form.
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: '',
			password: ''
		}
	})

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
		login(
			{
				username: values.username,
				password: values.password
			},
			{
				onError: () => toast.error('Đăng nhập thất bại !')
			}
		)
	}

	return (
		<div
			className='h-screen max-h-screen overflow-hidden flex'
			style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}
		>
			{/* Left side - Background Image - Hidden on mobile */}
			<div
				className='hidden lg:block flex-1 bg-cover bg-center bg-no-repeat relative'
				style={{
					backgroundImage: 'url(https://i.postimg.cc/MZ7dYZLS/backgrundimg.webp)'
				}}
			>
				{/* Overlay gradient để tăng độ tương phản */}
				<div className='absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-amber-50/20'></div>

				{/* Welcome content */}
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

			{/* Right side - Login Form - Full width on mobile */}
			<div className='w-full lg:flex-1 lg:max-w-md xl:max-w-lg bg-gradient-to-bl from-amber-50/95 to-orange-50/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 relative overflow-hidden'>
				{/* Background pattern for form side */}
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
									d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
								/>
							</svg>
						</div>
						<h1 className='text-2xl font-bold text-gray-800 leading-tight'>
							Đăng nhập quản lý
							<br />
							thư viện
						</h1>
						<p className='text-amber-700 text-sm font-medium'>Quản lý sách, người dùng và mượn trả</p>
					</div>

					{/* Form */}
					<div className='p-8 pt-2 max-h-[calc(100vh-200px)] overflow-y-auto'>
						{/* ✅ Hiển thị error message nếu có */}
						{error && (
							<div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center'>
								<p className='text-red-600 text-sm font-medium'>{'Đăng nhập thất bại'}</p>
							</div>
						)}

						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-sm font-semibold text-gray-700'>
												Tài khoản
											</FormLabel>
											<FormControl>
												<Input
													placeholder='Nhập tài khoản...'
													{...field}
													disabled={isPending}
													className='h-12 border-amber-200 focus-visible:ring-amber-500 focus-visible:border-amber-500 bg-white/80 backdrop-blur-sm'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-sm font-semibold text-gray-700'>
												Mật khẩu
											</FormLabel>
											<FormControl>
												<div className='relative'>
													<Input
														type={showPass ? 'text' : 'password'}
														placeholder='Nhập mật khẩu...'
														{...field}
														disabled={isPending}
														className='h-12 pr-12 border-amber-200 focus-visible:ring-amber-500 focus-visible:border-amber-500 bg-white/80 backdrop-blur-sm'
													/>
													<button
														type='button'
														onClick={() => setShowPass(!showPass)}
														className='absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors'
														disabled={isPending}
													>
														{showPass ? <EyeOff size={20} /> : <Eye size={20} />}
													</button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Submit Button */}
								<Button
									type='submit'
									disabled={isPending}
									className='w-full h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-amber-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed'
								>
									{isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
								</Button>
							</form>
						</Form>

						{/* Forgot Password Link */}

						<Link to='/forgot-password'>
							<div className='text-right mt-6'>
								<button
									className='text-sm text-amber-600 hover:text-amber-800 hover:underline transition-colors duration-200 font-medium disabled:opacity-50'
									disabled={isPending}
								>
									Quên mật khẩu?
								</button>
							</div>
						</Link>

						{/* Divider */}
						<div className='relative mt-8'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t border-amber-200' />
							</div>
							<div className='relative flex justify-center text-xs uppercase'>
								<span className='bg-white px-3 py-1 text-amber-700 font-medium rounded-full'>hoặc</span>
							</div>
						</div>

						{/* Social Login Buttons */}
						<div className='space-y-4 mt-8'>
							<Button
								type='button'
								variant='outline'
								className='w-full h-12 border-amber-300 hover:bg-amber-50 hover:border-amber-400 transition-all duration-200 bg-white/70 backdrop-blur-sm rounded-xl'
								onClick={() => console.log('Login with Google')}
								disabled={isPending}
							>
								<svg className='mr-3 h-5 w-5' viewBox='0 0 24 24'>
									<path
										fill='#EA4335'
										d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
									/>
									<path
										fill='#34A853'
										d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
									/>
									<path
										fill='#FBBC05'
										d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
									/>
									<path
										fill='#EA4335'
										d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
									/>
								</svg>
								<span className='text-gray-700 font-medium'>Đăng nhập với GuluGulu</span>
							</Button>

							<Button
								type='button'
								className='w-full h-12 bg-[#1877F2] hover:bg-[#166FE5] text-white transition-colors duration-200 rounded-xl font-medium'
								onClick={() => console.log('Login with Facebook')}
								disabled={isPending}
							>
								<svg className='mr-3 h-5 w-5 fill-current' viewBox='0 0 24 24'>
									<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
								</svg>
								Đăng nhập với Facebook
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
