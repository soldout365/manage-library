import { Edit, Plus, Search, Trash, Upload } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import CreateForm from './components/create-form'
import { ERole } from '@/types/user.type'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/utils/format-date'
import { getReaderTypeDisplayName } from './utils/getReaderTypeDisplayName'
import { useGetReaders } from '@/hooks/readers/use-get-readers'
import { useGetUsers } from '@/hooks/users/use-get-users'
import { useNavigate } from 'react-router-dom'
import { useQueryParams } from '@/hooks/useQueryParam'
import { useState } from 'react'

const UserManagement = () => {
	const [isCreateSheetOpen, setIsCreateSheetOpen] = useState<boolean>(false)
	const { type = 'reader' } = useQueryParams()

	const navigate = useNavigate()

	const {
		data: readersData,
		isLoading: isLoadingReaders,
		isError: isErrorReaders
	} = useGetReaders({}, type === 'reader')
	const readers = readersData?.data

	const {
		data: usersData,
		isLoading: isLoadingUsers,
		isError: isErrorUsers
	} = useGetUsers({ type: ERole.ADMIN }, type === 'admin')

	const users = usersData?.data

	const handleChooseTab = (tab: string) => {
		navigate({
			pathname: '/user-management',
			search: `?type=${tab}`
		})
	}

	const handleOpenCreateSheet = () => {
		setIsCreateSheetOpen(!isCreateSheetOpen)
	}

	return (
		<>
			<div className='mb-2 flex items-center justify-between space-y-2'>
				<h1 className='text-2xl font-bold tracking-tight'>Quản lý người dùng</h1>
				<div className='flex items-center space-x-2'>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant='outline'>
								<Upload className='mr-2 h-4 w-4' />
								Import Excel
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='!w-[70vw] !max-w-[70vw]'>
							<SheetHeader>
								<SheetTitle>Import người dùng từ Excel</SheetTitle>
							</SheetHeader>
							{/* <div className="px-4">
								<ImportUsersForm
									onSubmit={onImportUsers}
									onCancel={() => setIsImportSheetOpen(false)}
									isLoading={isImporting}
								/>
							</div> */}
						</SheetContent>
					</Sheet>

					<Sheet open={isCreateSheetOpen} onOpenChange={handleOpenCreateSheet}>
						<SheetTrigger>
							<Button>
								<Plus className='mr-2 h-4 w-4' />
								Thêm người dùng
							</Button>
						</SheetTrigger>
						<CreateForm onClose={handleOpenCreateSheet} />
					</Sheet>
				</div>
			</div>
			{/* search bar */}
			<div className='mb-4'>
				<div className='flex gap-2'>
					<div className='relative flex-1'>
						<Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
						<Input
							placeholder='Tìm kiếm theo mã, tên hoặc email...'
							value={''}
							onChange={(e) => {}}
							onKeyPress={() => {}}
							className='pl-10'
						/>
					</div>
					<Button disabled={false} className='px-6'>
						<Search className='mr-2 h-4 w-4' />
						Tìm kiếm
					</Button>
				</div>
			</div>
			{/* tabs */}
			<Tabs orientation='vertical' value={type} onValueChange={handleChooseTab} className='space-y-4'>
				<div className='w-full overflow-x-auto pb-2'>
					<TabsList>
						<TabsTrigger value='reader'>Độc giả</TabsTrigger>
						<TabsTrigger value='admin'>Quản trị viên</TabsTrigger>
					</TabsList>
				</div>
			</Tabs>
			{/* content */}
			{type === 'reader' && (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Mã người dùng</TableHead>
							<TableHead>Tên người dùng</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Quyền người dùng</TableHead>
							<TableHead>Loại độc giả</TableHead>
							<TableHead>Trạng thái</TableHead>
							<TableHead>Ngày cấp thẻ</TableHead>
							<TableHead>Ngày hết hạn</TableHead>
							<TableHead className='text-right'>Hành động</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{readers && readers.length > 0 ? (
							readers.map((reader) => {
								return (
									<TableRow key={reader.id}>
										<TableCell className='font-medium'>{reader.cardNumber}</TableCell>
										<TableCell>{reader.fullName}</TableCell>
										<TableCell>{reader.user.email}</TableCell>
										<TableCell>
											<Badge>Độc giả</Badge>
										</TableCell>
										<TableCell>{getReaderTypeDisplayName(reader.readerType.typeName)}</TableCell>
										<TableCell>
											<Badge>{reader.isActive ? 'Hoạt động' : 'Không hoạt động'}</Badge>
										</TableCell>
										<TableCell>{formatDate(reader.cardIssueDate || '')}</TableCell>
										<TableCell>{formatDate(reader.cardExpiryDate || '')}</TableCell>
										<TableCell className='text-right'>
											<div className='flex justify-end space-x-1'>
												<Button
													variant='ghost'
													size='sm'
													className='h-8 w-8 p-0 text-primary hover:text-primary'
												>
													<Edit className='h-4 w-4' />
													<span className='sr-only'>Chỉnh sửa người dùng</span>
												</Button>
												<Button
													variant='ghost'
													size='sm'
													className='h-8 w-8 p-0 text-destructive hover:text-destructive'
												>
													<Trash className='h-4 w-4' />
													<span className='sr-only'>Xóa người dùng</span>
												</Button>
											</div>
										</TableCell>
									</TableRow>
								)
							})
						) : (
							<TableRow>
								<TableCell className='text-center py-8' colSpan={9}>
									Không có người dùng nào
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			)}
			{type === 'admin' && (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Mã người dùng</TableHead>
							<TableHead>Tên người dùng</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Quyền</TableHead>
							<TableHead>Trạng thái</TableHead>
							<TableHead className='text-right'>Hành động</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users && users.length > 0 ? (
							users.map((user) => {
								return (
									<TableRow key={user.id}>
										<TableCell className='font-medium'>{user.userCode}</TableCell>
										<TableCell>{user.username}</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.role}</TableCell>
										<TableCell>
											<Badge>{user.accountStatus}</Badge>
										</TableCell>
										<TableCell className='text-right'>
											<div className='flex justify-end space-x-1'>
												<Button
													variant='ghost'
													size='sm'
													className='h-8 w-8 p-0 text-primary hover:text-primary'
												>
													<Edit className='h-4 w-4' />
													<span className='sr-only'>Chỉnh sửa người dùng</span>
												</Button>
												<Button
													variant='ghost'
													size='sm'
													className='h-8 w-8 p-0 text-destructive hover:text-destructive'
												>
													<Trash className='h-4 w-4' />
													<span className='sr-only'>Xóa người dùng</span>
												</Button>
											</div>
										</TableCell>
									</TableRow>
								)
							})
						) : (
							<TableRow>
								<TableCell className='text-center py-8' colSpan={9}>
									Không có người dùng nào
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			)}
		</>
	)
}

export default UserManagement
