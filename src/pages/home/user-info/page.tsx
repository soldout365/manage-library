import { useState } from 'react'
import { User, Edit2, Save, X, Calendar, Users, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function UserInfoPage() {
	const [isEditing, setIsEditing] = useState(false)
	const [userInfo, setUserInfo] = useState({
		name: 'Admin',
		email: 'admin@gmeo.com',
		gender: 'Nam',
		birthDate: '3 tháng 6, 2025'
	})

	const navigate = useNavigate()

	const [tempInfo, setTempInfo] = useState({ ...userInfo })

	const handleEdit = () => {
		setTempInfo({ ...userInfo })
		setIsEditing(true)
	}

	const handleSave = () => {
		setUserInfo({ ...tempInfo })
		setIsEditing(false)
	}

	const handleCancel = () => {
		setTempInfo({ ...userInfo })
		setIsEditing(false)
	}

	const handleChange = (field, value) => {
		setTempInfo((prev) => ({ ...prev, [field]: value }))
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Header */}
			<header className='bg-white shadow-sm border-b'>
				<div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center'>
							<BookOpen className='text-white' size={24} />
						</div>
						<h1 className='text-lg font-semibold text-gray-800'>Manage Lib</h1>
					</div>
					<div className='flex items-center gap-4'>
						<button className='text-gray-600 hover:text-gray-800'>Trang chủ</button>
						<button className='text-gray-600 hover:text-gray-800'>Tài liệu</button>
						<div className='flex items-center gap-2 text-green-600 font-medium'>
							<User className='w-4 h-4' />
							<span>{userInfo.name}</span>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 py-8'>
				<div className='bg-white rounded-lg shadow-sm'>
					<div className='border-b px-6 py-4'>
						<h2 className='text-xl font-semibold text-gray-800'>Trang cá nhân</h2>
					</div>

					<div className='p-6'>
						<div className='flex gap-8'>
							{/* Left Sidebar */}
							<div className='w-64 flex-shrink-0'>
								<div className='flex flex-col items-center'>
									<div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4'>
										<User className='w-12 h-12 text-green-600' />
									</div>
									<h3 className='font-semibold text-gray-800 mb-1'>{userInfo.name}</h3>
									<p className='text-sm text-gray-500 mb-6'>admin@gmail.com</p>
								</div>

								<nav className='space-y-1'>
									<button className='w-full text-left px-4 py-2 text-green-600 bg-green-50 rounded-lg flex items-center gap-3'>
										<User className='w-4 h-4' />
										<span className='text-sm font-medium'>Thông tin cá nhân</span>
									</button>
									<button className='w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-3'>
										<Edit2 className='w-4 h-4' />
										<span className='text-sm'>Lịch sử học</span>
									</button>
									<button className='w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-3'>
										<Users className='w-4 h-4' />
										<span className='text-sm'>Mạng xã hội</span>
									</button>
									<button
										onClick={() => navigate('/change-password')}
										className='w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-3'
									>
										<Calendar className='w-4 h-4' />
										<span className='text-sm'>Đổi mật khẩu</span>
									</button>
								</nav>
							</div>

							{/* Main Content Area */}
							<div className='flex-1'>
								<div className='flex items-center justify-between mb-6'>
									<h3 className='text-lg font-semibold text-gray-800'>Thông tin cá nhân</h3>
									{!isEditing ? (
										<button
											onClick={handleEdit}
											className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
										>
											<Edit2 className='w-4 h-4' />
											<span>Chỉnh sửa</span>
										</button>
									) : (
										<div className='flex gap-2'>
											<button
												onClick={handleSave}
												className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
											>
												<Save className='w-4 h-4' />
												<span>Lưu</span>
											</button>
											<button
												onClick={handleCancel}
												className='flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
											>
												<X className='w-4 h-4' />
												<span>Hủy</span>
											</button>
										</div>
									)}
								</div>

								<div className='grid grid-cols-2 gap-6'>
									{/* Tên đầy đủ */}
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Tên đầy đủ
										</label>
										{isEditing ? (
											<input
												type='text'
												value={tempInfo.name}
												onChange={(e) => handleChange('name', e.target.value)}
												className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
											/>
										) : (
											<p className='text-gray-900'>{userInfo.name}</p>
										)}
									</div>

									{/* Email */}
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
										{isEditing ? (
											<input
												type='email'
												value={tempInfo.email}
												onChange={(e) => handleChange('email', e.target.value)}
												className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
											/>
										) : (
											<p className='text-gray-900'>{userInfo.email}</p>
										)}
									</div>

									{/* Giới tính */}
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Giới tính
										</label>
										{isEditing ? (
											<select
												value={tempInfo.gender}
												onChange={(e) => handleChange('gender', e.target.value)}
												className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
											>
												<option value='Nam'>Nam</option>
												<option value='Nữ'>Nữ</option>
											</select>
										) : (
											<p className='text-gray-900'>{userInfo.gender}</p>
										)}
									</div>

									{/* Ngày tham gia */}
									<div>
										<label className='block text-sm font-medium text-gray-700 mb-2'>
											Ngày tham gia
										</label>
										{isEditing ? (
											<input
												type='text'
												value={tempInfo.birthDate}
												onChange={(e) => handleChange('birthDate', e.target.value)}
												className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
											/>
										) : (
											<p className='text-gray-900'>{userInfo.birthDate}</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
