'use client'

import type React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const ForgotPassPage: React.FC = () => {
	const [email, setEmail] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		toast.success(`Reset link sent to ${email}`)
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

			{/* Right side - Forgot Password Form - Full width on mobile */}
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
						<h1 className='text-2xl font-bold text-gray-800 leading-tight'>Yêu cầu đặt lại mật khẩu</h1>
						<p className='text-amber-700 text-sm font-medium'>Nhập email để nhận mã đặt lại mật khẩu</p>
					</div>

					{/* Form */}
					<div className='p-8 pt-2 max-h-[calc(100vh-200px)] overflow-y-auto'>
						<form onSubmit={handleSubmit} className='space-y-6'>
							<div>
								<label htmlFor='email' className='block text-sm font-semibold text-gray-700 mb-2 pl-1'>
									Địa chỉ Email
								</label>
								<input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full h-12 px-4 border border-amber-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all duration-200'
									placeholder='Nhập địa chỉ email...'
								/>
							</div>

							<button
								type='submit'
								className='w-full h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-amber-200 rounded-xl'
							>
								Gửi mã đặt lại mật khẩu
							</button>
						</form>

						{/* Back to Login Link */}
						<Link to='/login'>
							<div className='text-center mt-6'>
								<button className='text-sm text-amber-600 hover:text-amber-800 hover:underline transition-colors duration-200 font-medium'>
									← Quay lại đăng nhập
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

						{/* Alternative Actions */}
						<div className='space-y-4 mt-8'>
							<Link
								to='/reset-password'
								className='w-full h-12 border border-amber-300 hover:bg-amber-50 hover:border-amber-400 transition-all duration-200 bg-white/70 backdrop-blur-sm rounded-xl flex items-center justify-center text-amber-700 font-medium'
							>
								Đặt lại mật khẩu
							</Link>
							{/* <Link
								to='/login'
								className='w-full h-12 border border-amber-300 hover:bg-amber-50 hover:border-amber-400 transition-all duration-200 bg-white/70 backdrop-blur-sm rounded-xl flex items-center justify-center text-amber-700 font-medium'
							>
								Đã có mật khẩu? ĐĂNG NHẬP NGAY
							</Link> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassPage
