import { Link } from 'react-router-dom'
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
import DashboardOverview from './overview/page'
import BooksManagement from './manage-book/page'
import ReadersManagement from './manage-reader/page'
import BorrowManagement from './manage-borrow/page'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { useLogin } from '@/hooks/auth/useLogin'

const Dashboard = () => {
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

	const modules = [
		{ id: 'dashboard', name: 'Tổng quan', icon: Home, color: 'bg-blue-500' },
		{ id: 'books', name: 'Quản lý sách', icon: Book, color: 'bg-green-500' },
		{ id: 'readers', name: 'Quản lý độc giả', icon: Users, color: 'bg-purple-500' },
		{ id: 'borrow', name: 'Mượn trả sách', icon: Calendar, color: 'bg-orange-500' },
		{ id: 'authors', name: 'Tác giả', icon: User, color: 'bg-indigo-500' },
		{ id: 'categories', name: 'Thể loại', icon: Archive, color: 'bg-pink-500' },
		{ id: 'publishers', name: 'NXB', icon: FileText, color: 'bg-yellow-500' },
		{ id: 'ebooks', name: 'E-books', icon: Download, color: 'bg-cyan-500' },
		{ id: 'reservations', name: 'Đặt trước', icon: Clock, color: 'bg-red-500' },
		{ id: 'fines', name: 'Phạt', icon: AlertTriangle, color: 'bg-amber-500' },
		{ id: 'locations', name: 'Vị trí kệ', icon: MapPin, color: 'bg-teal-500' },
		{ id: 'uploads', name: 'Tải lên', icon: Upload, color: 'bg-gray-500' },
		{ id: 'notifications', name: 'Thông báo', icon: Bell, color: 'bg-rose-500' },
		{ id: 'settings', name: 'Cài đặt', icon: Settings, color: 'bg-slate-500' }
	]

	const renderContent = () => {
		switch (activeModule) {
			case 'dashboard':
				return <DashboardOverview dashboardStats={dashboardStats} currentUser={currentUser} />
			case 'books':
				return <BooksManagement />
			case 'readers':
				return <ReadersManagement />
			case 'borrow':
				return <BorrowManagement />
			default:
				return (
					<div className='space-y-6'>
						<h1 className='text-3xl font-bold text-gray-900 capitalize'>
							{modules.find((m) => m.id === activeModule)?.name || 'Module'}
						</h1>
						<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center'>
							<div className='max-w-md mx-auto'>
								<div className='mb-4'>
									{React.createElement(modules.find((m) => m.id === activeModule)?.icon || Settings, {
										size: 64,
										className: 'mx-auto text-gray-400'
									})}
								</div>
								<h3 className='text-xl font-semibold text-gray-900 mb-2'>
									{modules.find((m) => m.id === activeModule)?.name}
								</h3>
								<p className='text-gray-600 mb-6'>
									Giao diện cho module này đang được phát triển với đầy đủ các tính năng từ API.
								</p>
								<button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors'>
									Xem chi tiết
								</button>
							</div>
						</div>
					</div>
				)
		}
	}

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
				{/* Navigation */}
				<nav className='flex-1 p-4 space-y-2'>
					{modules.map((module) => {
						const Icon = module.icon
						const isActive = activeModule === module.id
						return (
							<button
								key={module.id}
								onClick={() => setActiveModule(module.id)}
								className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
									isActive
										? 'bg-blue-50 text-blue-700 border border-blue-200'
										: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
								}`}
							>
								<div className={`p-1 rounded ${isActive ? 'bg-blue-100' : ''}`}>
									<Icon size={18} />
								</div>
								{sidebarOpen && <span className='font-medium text-sm'>{module.name}</span>}
							</button>
						)
					})}
				</nav>
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
									<DropdownMenuItem onClick={() => toast.success('Thông tin cá nhân')}>
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
				{/* Page Content */}
				<main className='flex-1 p-6 overflow-auto'>{renderContent()}</main>
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
