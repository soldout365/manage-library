import React from 'react'
import { Book, Users, Calendar, Plus, UserCheck, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'

const DashboardOverview = ({ dashboardStats, currentUser }) => {
	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-3xl font-bold text-gray-900'>Tổng quan hệ thống</h1>
					<p className='text-gray-600 mt-2'>Chào mừng trở lại, {currentUser.name}</p>
				</div>
				<div className='flex space-x-3'>
					<button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors'>
						<Plus size={18} />
						<span>Thêm sách mới</span>
					</button>
				</div>
			</div>
			{/* Stats Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6'>
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-sm text-gray-600'>Tổng sách</p>
							<p className='text-2xl font-bold text-gray-900'>
								{dashboardStats.totalBooks.toLocaleString()}
							</p>
						</div>
						<div className='bg-blue-100 p-3 rounded-lg'>
							<Book className='text-blue-600' size={24} />
						</div>
					</div>
				</div>
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-sm text-gray-600'>Độc giả</p>
							<p className='text-2xl font-bold text-gray-900'>
								{dashboardStats.totalReaders.toLocaleString()}
							</p>
						</div>
						<div className='bg-purple-100 p-3 rounded-lg'>
							<Users className='text-purple-600' size={24} />
						</div>
					</div>
				</div>
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-sm text-gray-600'>Đang mượn</p>
							<p className='text-2xl font-bold text-gray-900'>{dashboardStats.activeBorrows}</p>
						</div>
						<div className='bg-green-100 p-3 rounded-lg'>
							<Calendar className='text-green-600' size={24} />
						</div>
					</div>
				</div>
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-sm text-gray-600'>Quá hạn</p>
							<p className='text-2xl font-bold text-red-600'>{dashboardStats.overdueBooks}</p>
						</div>
						<div className='bg-red-100 p-3 rounded-lg'>
							<AlertTriangle className='text-red-600' size={24} />
						</div>
					</div>
				</div>
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-sm text-gray-600'>Trả hôm nay</p>
							<p className='text-2xl font-bold text-gray-900'>{dashboardStats.todayReturns}</p>
						</div>
						<div className='bg-orange-100 p-3 rounded-lg'>
							<RefreshCw className='text-orange-600' size={24} />
						</div>
					</div>
				</div>
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-sm text-gray-600'>Đăng ký mới</p>
							<p className='text-2xl font-bold text-green-600'>{dashboardStats.newRegistrations}</p>
						</div>
						<div className='bg-green-100 p-3 rounded-lg'>
							<UserCheck className='text-green-600' size={24} />
						</div>
					</div>
				</div>
			</div>
			{/* Quick Actions & Recent Activity */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Quick Actions */}
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
					<h3 className='text-lg font-semibold mb-4'>Thao tác nhanh</h3>
					<div className='grid grid-cols-2 gap-4'>
						<button className='p-4 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center'>
							<Plus className='mx-auto text-blue-600 mb-2' size={24} />
							<span className='text-sm text-blue-600 font-medium'>Thêm sách</span>
						</button>
						<button className='p-4 border-2 border-dashed border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-center'>
							<Users className='mx-auto text-purple-600 mb-2' size={24} />
							<span className='text-sm text-purple-600 font-medium'>Thêm độc giả</span>
						</button>
						<button className='p-4 border-2 border-dashed border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-center'>
							<Calendar className='mx-auto text-green-600 mb-2' size={24} />
							<span className='text-sm text-green-600 font-medium'>Mượn sách</span>
						</button>
						<button className='p-4 border-2 border-dashed border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors text-center'>
							<RefreshCw className='mx-auto text-orange-600 mb-2' size={24} />
							<span className='text-sm text-orange-600 font-medium'>Trả sách</span>
						</button>
					</div>
				</div>
				{/* Recent Activity */}
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
					<h3 className='text-lg font-semibold mb-4'>Hoạt động gần đây</h3>
					<div className='space-y-4'>
						<div className='flex items-center space-x-3 p-3 bg-green-50 rounded-lg'>
							<CheckCircle className='text-green-600' size={20} />
							<div className='flex-1'>
								<p className='text-sm font-medium'>Trả sách thành công</p>
								<p className='text-xs text-gray-500'>Nguyễn Văn A - "Lập trình JavaScript"</p>
							</div>
							<span className='text-xs text-gray-400'>2 phút trước</span>
						</div>
						<div className='flex items-center space-x-3 p-3 bg-blue-50 rounded-lg'>
							<Book className='text-blue-600' size={20} />
							<div className='flex-1'>
								<p className='text-sm font-medium'>Sách mới được thêm</p>
								<p className='text-xs text-gray-500'>"Học máy cơ bản" - NXB Giáo dục</p>
							</div>
							<span className='text-xs text-gray-400'>15 phút trước</span>
						</div>
						<div className='flex items-center space-x-3 p-3 bg-purple-50 rounded-lg'>
							<Users className='text-purple-600' size={20} />
							<div className='flex-1'>
								<p className='text-sm font-medium'>Độc giả mới đăng ký</p>
								<p className='text-xs text-gray-500'>Trần Thị B - Sinh viên</p>
							</div>
							<span className='text-xs text-gray-400'>1 giờ trước</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardOverview
