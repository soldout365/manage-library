import React, { useState } from 'react'
import {
	BookOpen,
	Users,
	FileText,
	Calendar,
	Bell,
	Settings,
	Search,
	User,
	Menu,
	Home,
	Book,
	MapPin,
	Archive,
	Upload,
	AlertTriangle,
	Clock,
	CheckCircle,
	XCircle,
	Download,
	ChevronDown
} from 'lucide-react'

// Import các component đã tách

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useLogin } from '@/hooks/auth/useLogin'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
	const navigate = useNavigate()
	const { logout } = useLogin()
	const [activeModule, setActiveModule] = useState('dashboard')
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [currentUser, setCurrentUser] = useState({
		name: 'Admin',
		role: 'Quản trị viên',
		avatar: ' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1I_ZbgRygJ-yy2fIIlScWrxTZkGuZXThhA&s'
	})
	const [dashboardStats, setDashboardStats] = useState({
		totalBooks: 15420,
		totalReaders: 3280,
		activeBorrows: 890,
		overdueBooks: 45,
		todayReturns: 67,
		newRegistrations: 12
	})
	const [notifications, setNotifications] = useState([
		{ id: 1, type: 'warning', message: '45 sách quá hạn cần xử lý', time: '10 phút trước' },
		{ id: 2, type: 'info', message: '67 sách cần trả hôm nay', time: '30 phút trước' },
		{ id: 3, type: 'success', message: '12 độc giả mới đăng ký', time: '1 giờ trước' }
	])

	return (
		<div className='min-h-screen bg-gray-50 flex'>
			{/* Sidebar */}
			<div
				className={`${sidebarOpen ? 'w-64' : 'w-21.5'} bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col`}
			>
				{/* Logo */}
				<div className='p-4 border-b border-gray-200'>
					<div className='flex items-center space-x-3'>
						<div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center translate-x-1'>
							<BookOpen className='text-white' size={24} />
						</div>
						{sidebarOpen && (
							<div>
								<h1 className='text-xl font-bold text-gray-900'>Manage Lib</h1>
								<p className='text-xs text-gray-500'>Hệ thống quản lý thư viện</p>
							</div>
						)}
					</div>
				</div>
			</div>
			{/* Main Content */}
			<div className='flex-1 flex flex-col min-w-0'>
				{/* Header */}
				<header className='bg-white shadow-sm border-b border-gray-200 px-6 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<button
								onClick={() => setSidebarOpen(!sidebarOpen)}
								className='p-2 rounded-lg hover:bg-gray-100 transition-colors'
							>
								<Menu size={20} />
							</button>
							{/* Search Bar */}
							<div className='relative'>
								<Search className='absolute left-3 top-3 text-gray-400' size={18} />
								<input
									type='text'
									placeholder='Tìm kiếm nhanh...'
									className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-96'
								/>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							{/* Notifications */}
							<div className='relative'>
								<button className='p-2 rounded-lg hover:bg-gray-100 transition-colors relative'>
									<Bell size={20} />
									{notifications.length > 0 && (
										<span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
											{notifications.length}
										</span>
									)}
								</button>
							</div>
							{/* User Menu */}
							<DropdownMenu>
								<DropdownMenuTrigger className='flex items-center space-x-3 cursor-pointer'>
									<img
										src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1I_ZbgRygJ-yy2fIIlScWrxTZkGuZXThhA&s'
										alt='User'
										className='w-8 h-8 rounded-full object-cover'
									/>
									<div className='hidden sm:block'>
										<div className='text-sm font-medium'>{currentUser.name}</div>
										<div className='text-xs text-gray-500'>{currentUser.role}</div>
									</div>
									<ChevronDown size={16} className='text-gray-400' />
								</DropdownMenuTrigger>

								<DropdownMenuContent className='w-48'>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => navigate('/user-info')}>
										Thông tin cá nhân
									</DropdownMenuItem>

									<DropdownMenuItem onClick={logout} className='text-red-600'>
										Đăng xuất
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</header>
			</div>
			{/* Notifications Panel (if expanded) */}
			{notifications.length > 0 && (
				<div className='fixed top-20 right-6 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto hidden'>
					<div className='p-4 border-b border-gray-200'>
						<h3 className='font-semibold text-gray-900'>Thông báo</h3>
					</div>
					<div className='p-2'>
						{notifications.map((notification) => (
							<div
								key={notification.id}
								className={`p-3 rounded-lg mb-2 ${
									notification.type === 'warning'
										? 'bg-yellow-50 border border-yellow-200'
										: notification.type === 'error'
											? 'bg-red-50 border border-red-200'
											: 'bg-blue-50 border border-blue-200'
								}`}
							>
								<div className='flex items-start space-x-3'>
									{notification.type === 'warning' && (
										<AlertTriangle size={16} className='text-yellow-600 mt-0.5' />
									)}
									{notification.type === 'error' && (
										<XCircle size={16} className='text-red-600 mt-0.5' />
									)}
									{notification.type === 'info' && (
										<Bell size={16} className='text-blue-600 mt-0.5' />
									)}
									{notification.type === 'success' && (
										<CheckCircle size={16} className='text-green-600 mt-0.5' />
									)}
									<div className='flex-1'>
										<p className='text-sm text-gray-900'>{notification.message}</p>
										<p className='text-xs text-gray-500 mt-1'>{notification.time}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default Dashboard
