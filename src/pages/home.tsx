import { Button } from '@/components/ui/button'
import { useLogin } from '@/hooks/auth/useLogin'
import { useAuthStore } from '@/stores/auth.store'

const HomePage = () => {
	const { logout } = useLogin()
	const { user } = useAuthStore()

	return (
		<div className='h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
			{/* Welcome Section */}
			<div className='text-center mb-8'>
				<h1 className='text-4xl font-bold text-gray-800 mb-4'>Chào mừng đến với Thư Viện Số</h1>
				{user && (
					<div className='bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md mb-6'>
						<p className='text-lg text-gray-700'>
							Xin chào, <span className='font-semibold text-blue-600'>{user.username}</span>!
						</p>
						<p className='text-sm text-gray-600'>
							Role: <span className='font-medium text-green-600'>{user.role}</span>
						</p>
						<p className='text-xs text-gray-500 mt-1'>User ID: {user.userCode}</p>
					</div>
				)}
			</div>

			{/* Navigation Buttons */}
			<div className='space-y-4 flex flex-col items-center'>
				{/* Dashboard/Features buttons */}
				<div className='flex gap-4 mb-6'>
					<Button className='bg-green-600 hover:bg-green-700 text-white px-6 py-3'>Quản lý sách</Button>
					<Button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-3'>
						Quản lý người dùng
					</Button>
					<Button className='bg-amber-600 hover:bg-amber-700 text-white px-6 py-3'>Báo cáo</Button>
				</div>

				{/* Logout Button */}
				<Button
					className='bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg'
					onClick={logout}
				>
					🚪 Đăng xuất
				</Button>
			</div>

			{/* Footer info */}
			<div className='mt-12 text-center text-sm text-gray-500'>
				<p>Hệ thống quản lý thư viện số</p>
				<p>Phiên bản 6.9.3.6</p>
			</div>
		</div>
	)
}

export default HomePage
