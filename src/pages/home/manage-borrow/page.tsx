import { Calendar, RefreshCw, AlertTriangle, Clock, CheckCircle } from 'lucide-react'

const BorrowManagement = () => {
	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold text-gray-900'>Mượn trả sách</h1>
				<div className='flex space-x-3'>
					<button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2'>
						<Calendar size={18} />
						<span>Mượn sách mới</span>
					</button>
					<button className='bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2'>
						<RefreshCw size={18} />
						<span>Trả sách</span>
					</button>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-sm text-gray-600'>Đang mượn</p>
							<p className='text-2xl font-bold text-blue-600'>890</p>
						</div>
						<Calendar className='text-blue-600' size={32} />
					</div>
				</div>
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-sm text-gray-600'>Quá hạn</p>
							<p className='text-2xl font-bold text-red-600'>45</p>
						</div>
						<AlertTriangle className='text-red-600' size={32} />
					</div>
				</div>
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-sm text-gray-600'>Trả hôm nay</p>
							<p className='text-2xl font-bold text-green-600'>67</p>
						</div>
						<CheckCircle className='text-green-600' size={32} />
					</div>
				</div>
				<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='text-sm text-gray-600'>Chờ phê duyệt</p>
							<p className='text-2xl font-bold text-yellow-600'>23</p>
						</div>
						<Clock className='text-yellow-600' size={32} />
					</div>
				</div>
			</div>
			<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
				<p className='text-gray-600'>
					Giao diện quản lý mượn trả với danh sách chi tiết, tìm kiếm, và các thao tác nhanh...
				</p>
			</div>
		</div>
	)
}

export default BorrowManagement
