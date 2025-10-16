// import { useState } from 'react'
// import { Upload, Plus, Search, Eye, Edit, Trash2, Book } from 'lucide-react'

// const BooksManagement = () => {
// 	const [books, setBooks] = useState([
// 		{
// 			id: 1,
// 			title: 'Lập trình JavaScript',
// 			author: 'Nguyễn Văn A',
// 			isbn: '9781234567890',
// 			category: 'Công nghệ',
// 			status: 'available',
// 			copies: 5
// 		},
// 		{
// 			id: 2,
// 			title: 'Học máy cơ bản',
// 			author: 'Trần Thị B',
// 			isbn: '9781234567891',
// 			category: 'Công nghệ',
// 			status: 'borrowed',
// 			copies: 3
// 		},
// 		{
// 			id: 3,
// 			title: 'Văn học Việt Nam',
// 			author: 'Lê Văn C',
// 			isbn: '9781234567892',
// 			category: 'Văn học',
// 			status: 'available',
// 			copies: 7
// 		}
// 	])
// 	return (
// 		<div className='space-y-6'>
// 			<div className='flex justify-between items-center'>
// 				<h1 className='text-3xl font-bold text-gray-900'>Quản lý sách</h1>
// 				<div className='flex space-x-3'>
// 					<button className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2'>
// 						<Upload size={18} />
// 						<span>Import</span>
// 					</button>
// 					<button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2'>
// 						<Plus size={18} />
// 						<span>Thêm sách</span>
// 					</button>
// 				</div>
// 			</div>
// 			{/* Search and Filter */}
// 			<div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
// 				<div className='flex flex-wrap gap-4'>
// 					<div className='flex-1 min-w-64'>
// 						<div className='relative'>
// 							<Search className='absolute left-3 top-3 text-gray-400' size={18} />
// 							<input
// 								type='text'
// 								placeholder='Tìm kiếm theo tên sách, tác giả, ISBN...'
// 								className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
// 							/>
// 						</div>
// 					</div>
// 					<select className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
// 						<option>Tất cả thể loại</option>
// 						<option>Công nghệ</option>
// 						<option>Văn học</option>
// 						<option>Khoa học</option>
// 					</select>
// 					<select className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
// 						<option>Tất cả trạng thái</option>
// 						<option>Có sẵn</option>
// 						<option>Đang mượn</option>
// 						<option>Bảo trì</option>
// 					</select>
// 				</div>
// 			</div>
// 			{/* Books Table */}
// 			<div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
// 				<div className='overflow-x-auto'>
// 					<table className='w-full'>
// 						<thead className='bg-gray-50 border-b border-gray-200'>
// 							<tr>
// 								<th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
// 									Thông tin sách
// 								</th>
// 								<th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>Tác giả</th>
// 								<th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>ISBN</th>
// 								<th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>Thể loại</th>
// 								<th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>Trạng thái</th>
// 								<th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>Bản sao</th>
// 								<th className='px-6 py-4 text-right text-sm font-medium text-gray-500'>Thao tác</th>
// 							</tr>
// 						</thead>
// 						<tbody className='divide-y divide-gray-200'>
// 							{books.map((book) => (
// 								<tr key={book.id} className='hover:bg-gray-50'>
// 									<td className='px-6 py-4'>
// 										<div className='flex items-center space-x-3'>
// 											<div className='w-12 h-16 bg-blue-100 rounded flex items-center justify-center'>
// 												<Book className='text-blue-600' size={20} />
// 											</div>
// 											<div>
// 												<p className='font-medium text-gray-900'>{book.title}</p>
// 												<p className='text-sm text-gray-500'>ID: {book.id}</p>
// 											</div>
// 										</div>
// 									</td>
// 									<td className='px-6 py-4 text-sm text-gray-900'>{book.author}</td>
// 									<td className='px-6 py-4 text-sm text-gray-900'>{book.isbn}</td>
// 									<td className='px-6 py-4'>
// 										<span className='inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full'>
// 											{book.category}
// 										</span>
// 									</td>
// 									<td className='px-6 py-4'>
// 										<span
// 											className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
// 												book.status === 'available'
// 													? 'bg-green-100 text-green-800'
// 													: 'bg-yellow-100 text-yellow-800'
// 											}`}
// 										>
// 											{book.status === 'available' ? 'Có sẵn' : 'Đang mượn'}
// 										</span>
// 									</td>
// 									<td className='px-6 py-4 text-sm text-gray-900'>{book.copies}</td>
// 									<td className='px-6 py-4 text-right'>
// 										<div className='flex justify-end space-x-2'>
// 											<button className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg'>
// 												<Eye size={16} />
// 											</button>
// 											<button className='p-2 text-green-600 hover:bg-green-50 rounded-lg'>
// 												<Edit size={16} />
// 											</button>
// 											<button className='p-2 text-red-600 hover:bg-red-50 rounded-lg'>
// 												<Trash2 size={16} />
// 											</button>
// 										</div>
// 									</td>
// 								</tr>
// 							))}
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>
// 			{/* Pagination */}
// 			<div className='flex justify-between items-center'>
// 				<p className='text-sm text-gray-700'>Hiển thị 1-3 trong tổng số 150 sách</p>
// 				<div className='flex space-x-2'>
// 					<button className='px-3 py-1 border border-gray-300 rounded hover:bg-gray-50'>Trước</button>
// 					<button className='px-3 py-1 bg-blue-600 text-white rounded'>1</button>
// 					<button className='px-3 py-1 border border-gray-300 rounded hover:bg-gray-50'>2</button>
// 					<button className='px-3 py-1 border border-gray-300 rounded hover:bg-gray-50'>3</button>
// 					<button className='px-3 py-1 border border-gray-300 rounded hover:bg-gray-50'>Sau</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default BooksManagement
