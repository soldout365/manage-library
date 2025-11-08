import { useState } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { usePublishers } from '@/hooks/publishers/useGetPublishers'
import { useCreatePublisher } from '@/hooks/publishers/useCreatePublisher'
import { useUpdateUser } from '@/hooks/publishers/useUpdatePublisher'
import { useDeleteUser } from '@/hooks/publishers/useDeletePublisher'
import { useQueryClient } from '@tanstack/react-query'
import { publisherApi } from '@/apis/publisher.api'
import type { PublisherType, CreatePublisherType, PublisherParams, UpdatePublisherType } from '@/types/publisher.type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { useQueryParams } from '@/hooks/useQueryParam'
import PagiantionWapper from '@/components/pagination-wrapper'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import SearchBar from '@/components/search-bar'
import { useSearch } from '../../../hooks/useSearch'

const publisherSchema = z.object({
	publisherName: z.string().min(1, 'Tên nhà xuất bản không được để trống'),
	email: z.string().email('Email không hợp lệ').min(1, 'Email không được để trống'),
	address: z.string().min(1, 'Địa chỉ không được để trống'),
	phone: z.string().min(1, 'Số điện thoại không được để trống'),
	website: z.string().min(1, 'Website không được để trống'),
	description: z.string().optional(),
	isActive: z.boolean(),
	establishedDate: z.string().min(1, 'Ngày thành lập không được để trống'),
	country: z.string().min(1, 'Quốc gia không được để trống')
})

type PublisherFormValues = z.infer<typeof publisherSchema>

export default function ManagePublishersPage() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const params = useQueryParams()

	const publisherParams: PublisherParams = params as PublisherParams
	const { data: publishersData, isLoading, isError } = usePublishers(publisherParams)

	const publishers = publishersData?.data
	const currentMeta = publishersData?.meta
	const currentData = publishers?.length

	const { mutate: createPublisher, isPending: isCreating } = useCreatePublisher()
	const { mutate: updatePublisher, isPending: isUpdating } = useUpdateUser()
	const { mutate: deletePublisher, isPending: isDeleting } = useDeleteUser()

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedPublisher, setSelectedPublisher] = useState<PublisherType | null>(null)

	const createForm = useForm<PublisherFormValues>({
		resolver: zodResolver(publisherSchema),
		defaultValues: {
			publisherName: '',
			email: '',
			address: '',
			phone: '',
			website: '',
			description: '',
			isActive: true,
			establishedDate: '',
			country: ''
		}
	})

	const editForm = useForm<PublisherFormValues>({
		resolver: zodResolver(publisherSchema),
		defaultValues: {
			publisherName: '',
			email: '',
			address: '',
			phone: '',
			website: '',
			description: '',
			isActive: true,
			establishedDate: '',
			country: ''
		}
	})

	const handleCreate = (data: PublisherFormValues) => {
		const payload: CreatePublisherType = {
			publisherName: data.publisherName,
			email: data.email,
			address: data.address,
			phone: data.phone,
			website: data.website,
			description: data.description || null,
			isActive: data.isActive,
			establishedDate: data.establishedDate,
			country: data.country
		}

		createPublisher(payload, {
			onSuccess: () => {
				toast.success('Nhà xuất bản được tạo thành công')
				queryClient.invalidateQueries({ queryKey: [publisherApi.getPublishers.name] })
				setIsCreateDialogOpen(false)
				createForm.reset()
			},
			onError: () => {
				toast.error('Có lỗi xảy ra khi tạo nhà xuất bản')
			}
		})
	}

	const handleEdit = (publisher: PublisherType) => {
		setSelectedPublisher(publisher)
		editForm.reset({
			publisherName: publisher.publisherName,
			email: publisher.email,
			address: publisher.address,
			phone: publisher.phone,
			website: publisher.website,
			description: publisher.description || '',
			isActive: publisher.isActive,
			establishedDate: publisher.establishedDate,
			country: publisher.country
		})
		setIsEditDialogOpen(true)
	}

	const handleUpdate = (data: PublisherFormValues) => {
		if (!selectedPublisher) return

		const payload: UpdatePublisherType = {
			publisherName: data.publisherName,
			email: data.email,
			address: data.address,
			phone: data.phone,
			website: data.website,
			description: data.description || null,
			isActive: data.isActive,
			establishedDate: data.establishedDate,
			country: data.country
		}

		updatePublisher(
			{ publisherId: selectedPublisher.id, payload },
			{
				onSuccess: () => {
					toast.success('Cập nhật nhà xuất bản thành công')
					queryClient.invalidateQueries({ queryKey: [publisherApi.getPublishers.name] })
					setIsEditDialogOpen(false)
					setSelectedPublisher(null)
					editForm.reset()
				},
				onError: () => {
					toast.error('Có lỗi xảy ra khi cập nhật nhà xuất bản')
				}
			}
		)
	}

	const handleDeleteClick = (publisher: PublisherType) => {
		setSelectedPublisher(publisher)
		setIsDeleteDialogOpen(true)
	}

	const handleDelete = () => {
		if (!selectedPublisher) return

		deletePublisher(selectedPublisher.id, {
			onSuccess: () => {
				toast.success('Xóa nhà xuất bản thành công')
				queryClient.invalidateQueries({ queryKey: [publisherApi.getPublishers.name] })
				setIsDeleteDialogOpen(false)
				setSelectedPublisher(null)
			},
			onError: () => {
				toast.error('Có lỗi xảy ra khi xóa nhà xuất bản')
			}
		})
	}

	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: '/publishers',
			search: createSearchParams({
				...params,
				limit: '5',
				page: newPage.toString()
			}).toString()
		})
	}

	const { searchValue, handleKeyPress, handleSearchChange, handleSubmit } = useSearch({
		onKeyPress: (e) => {
			if (e.key === 'Enter') {
				navigate({
					pathname: '/publishers',
					search: createSearchParams({
						...params,
						page: '1',
						search: searchValue
					}).toString()
				})
			}
		},
		onSubmit: (searchValue) => {
			navigate({
				pathname: '/publishers',
				search: createSearchParams({
					...params,
					page: '1',
					search: searchValue
				}).toString()
			})
		}
	})

	if (isLoading) {
		return (
			<div className='min-h-screen bg-gray-50 p-6'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center py-8'>Đang tải dữ liệu...</div>
				</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className='min-h-screen bg-gray-50 p-6'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center py-8 text-red-600'>Có lỗi xảy ra khi tải dữ liệu</div>
				</div>
			</div>
		)
	}

	return (
		<div>
			{/* Header */}
			<div className='mb-6 flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-gray-800'>Quản lý nhà xuất bản</h1>
				<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
					<DialogTrigger asChild>
						<Button className='bg-green-600 hover:bg-green-700'>
							<Plus className='h-4 w-4 mr-2' />
							Thêm nhà xuất bản
						</Button>
					</DialogTrigger>
					<DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
						<DialogHeader>
							<DialogTitle>Thêm nhà xuất bản mới</DialogTitle>
							<DialogDescription>Nhập thông tin nhà xuất bản mới vào form bên dưới</DialogDescription>
						</DialogHeader>
						<Form {...createForm}>
							<form onSubmit={createForm.handleSubmit(handleCreate)} className='space-y-4'>
								<FormField
									control={createForm.control}
									name='publisherName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tên nhà xuất bản</FormLabel>
											<FormControl>
												<Input placeholder='Nhập tên nhà xuất bản' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='grid grid-cols-2 gap-4'>
									<FormField
										control={createForm.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input type='email' placeholder='email@example.com' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={createForm.control}
										name='phone'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Số điện thoại</FormLabel>
												<FormControl>
													<Input placeholder='0123456789' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={createForm.control}
									name='address'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Địa chỉ</FormLabel>
											<FormControl>
												<Input placeholder='Nhập địa chỉ' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='grid grid-cols-2 gap-4'>
									<FormField
										control={createForm.control}
										name='website'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Website</FormLabel>
												<FormControl>
													<Input placeholder='https://example.com' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={createForm.control}
										name='country'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Quốc gia</FormLabel>
												<FormControl>
													<Input placeholder='Nhập quốc gia' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={createForm.control}
									name='establishedDate'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ngày thành lập</FormLabel>
											<FormControl>
												<Input type='date' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={createForm.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Mô tả</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Nhập mô tả nhà xuất bản'
													className='min-h-[100px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={createForm.control}
									name='isActive'
									render={({ field }) => (
										<FormItem className='flex items-center gap-2'>
											<FormControl>
												<input
													type='checkbox'
													checked={field.value}
													onChange={field.onChange}
													className='h-4 w-4'
												/>
											</FormControl>
											<FormLabel className='!mt-0'>Đang hoạt động</FormLabel>
											<FormMessage />
										</FormItem>
									)}
								/>
								<DialogFooter>
									<Button
										type='button'
										variant='outline'
										onClick={() => setIsCreateDialogOpen(false)}
									>
										Hủy
									</Button>
									<Button type='submit' disabled={isCreating}>
										{isCreating ? 'Đang tạo...' : 'Tạo nhà xuất bản'}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>

			<SearchBar
				searchValue={searchValue}
				onSearchChange={handleSearchChange}
				onKeyPress={handleKeyPress}
				onSubmit={handleSubmit}
			/>
			{/* Stats Section */}
			<div className='mb-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Tổng số</h3>
					<p className='text-2xl font-bold text-gray-800'>{publishers?.length || 0}</p>
				</div>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Đang hoạt động</h3>
					<p className='text-2xl font-bold text-green-600'>
						{publishers?.filter((p) => p.isActive).length || 0}
					</p>
				</div>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Không hoạt động</h3>
					<p className='text-2xl font-bold text-red-600'>
						{publishers?.filter((p) => !p.isActive).length || 0}
					</p>
				</div>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Số quốc gia</h3>
					<p className='text-2xl font-bold text-blue-600'>
						{publishers ? new Set(publishers.map((p) => p.country)).size : 0}
					</p>
				</div>
			</div>

			{/* Table */}
			<div className='bg-white rounded-lg shadow overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên nhà xuất bản</TableHead>
							<TableHead>Địa chỉ</TableHead>
							<TableHead>Liên hệ</TableHead>
							<TableHead>Quốc gia</TableHead>
							<TableHead>Ngày thành lập</TableHead>
							<TableHead>Trạng thái</TableHead>
							<TableHead className='text-right'>Hành động</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{publishers && publishers.length > 0 ? (
							publishers.map((publisher) => (
								<TableRow key={publisher.id}>
									<TableCell className='font-medium'>{publisher.publisherName}</TableCell>
									<TableCell className='max-w-xs'>
										<div className='truncate'>{publisher.address}</div>
									</TableCell>
									<TableCell>
										<div className='text-sm'>
											<div>{publisher.phone}</div>
											<div className='text-blue-600 truncate max-w-[150px]'>
												{publisher.email}
											</div>
											<a
												href={publisher.website}
												target='_blank'
												rel='noopener noreferrer'
												className='text-blue-600 hover:underline truncate block max-w-[150px]'
											>
												Website
											</a>
										</div>
									</TableCell>
									<TableCell>{publisher.country}</TableCell>
									<TableCell>
										{new Date(publisher.establishedDate).toLocaleDateString('vi-VN')}
									</TableCell>
									<TableCell>
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												publisher.isActive
													? 'bg-green-100 text-green-800'
													: 'bg-red-500 text-gray-50'
											}`}
										>
											{publisher.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
										</span>
									</TableCell>
									<TableCell className='text-right'>
										<div className='flex justify-end gap-2'>
											<Button
												onClick={() => handleEdit(publisher)}
												size='icon'
												variant='ghost'
												className='text-green-600 hover:bg-blue-50 hover:text-green-800'
											>
												<Edit className='h-4 w-4' />
											</Button>
											<Button
												onClick={() => handleDeleteClick(publisher)}
												size='icon'
												variant='ghost'
												className='text-red-600 hover:bg-red-50 hover:text-red-700'
											>
												<Trash2 className='h-4 w-4' />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell className='text-center py-8' colSpan={7}>
									Không tìm thấy nhà xuất bản nào
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			<PagiantionWapper currentData={currentData} onChangePage={handleChangePage} currentMeta={currentMeta} />

			{/* Edit Dialog */}
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
					<DialogHeader>
						<DialogTitle>Chỉnh sửa nhà xuất bản</DialogTitle>
						<DialogDescription>Cập nhật thông tin nhà xuất bản</DialogDescription>
					</DialogHeader>
					<Form {...editForm}>
						<form onSubmit={editForm.handleSubmit(handleUpdate)} className='space-y-4'>
							<FormField
								control={editForm.control}
								name='publisherName'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên nhà xuất bản</FormLabel>
										<FormControl>
											<Input placeholder='Nhập tên nhà xuất bản' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={editForm.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type='email' placeholder='email@example.com' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={editForm.control}
									name='phone'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Số điện thoại</FormLabel>
											<FormControl>
												<Input placeholder='0123456789' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={editForm.control}
								name='address'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Địa chỉ</FormLabel>
										<FormControl>
											<Input placeholder='Nhập địa chỉ' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='grid grid-cols-2 gap-4'>
								<FormField
									control={editForm.control}
									name='website'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Website</FormLabel>
											<FormControl>
												<Input placeholder='https://example.com' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={editForm.control}
									name='country'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Quốc gia</FormLabel>
											<FormControl>
												<Input placeholder='Nhập quốc gia' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={editForm.control}
								name='establishedDate'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ngày thành lập</FormLabel>
										<FormControl>
											<Input type='date' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={editForm.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mô tả</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Nhập mô tả nhà xuất bản'
												className='min-h-[100px]'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={editForm.control}
								name='isActive'
								render={({ field }) => (
									<FormItem className='flex items-center gap-2'>
										<FormControl>
											<input
												type='checkbox'
												checked={field.value}
												onChange={field.onChange}
												className='h-4 w-4'
											/>
										</FormControl>
										<FormLabel className='!mt-0'>Đang hoạt động</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type='button' variant='outline' onClick={() => setIsEditDialogOpen(false)}>
									Hủy
								</Button>
								<Button type='submit' disabled={isUpdating}>
									{isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Xác nhận xóa nhà xuất bản</AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc chắn muốn xóa nhà xuất bản "{selectedPublisher?.publisherName}"? Hành động này
							không thể hoàn tác.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Hủy</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isDeleting}
							className='bg-red-600 hover:bg-red-700'
						>
							{isDeleting ? 'Đang xóa...' : 'Xóa'}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
