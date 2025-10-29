import { useState, useEffect, useMemo } from 'react'
import { Edit, Trash2, Plus, Search, X } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { useGetLocations } from '@/hooks/locations/useGetLocations'
import { useSearchLocation } from '@/hooks/locations/useSearchLocation'
import { useCreateLocation } from '@/hooks/locations/useCreateLocation'
import { useUpdateLocation } from '@/hooks/locations/useUpdateLocation'
import { useDeleteUser } from '@/hooks/locations/useDeleteLocation'
import { useQueryClient } from '@tanstack/react-query'
import { locationApi } from '@/apis/loaction.api'
import type { LocationType, CreateLocationType, UpdateLocationType } from '@/types/location.type'
import type { QueryParamsType } from '@/types/common.type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { useQueryParams } from '@/hooks/useQueryParam'
import PagiantionWapper from '@/components/pagination-wrapper'
import { createSearchParams, useNavigate } from 'react-router-dom'

const locationSchema = z.object({
	name: z.string().min(1, 'Tên vị trí không được để trống'),
	description: z.string().min(1, 'Mô tả không được để trống'),
	floor: z.number().min(0, 'Tầng phải là số không âm'),
	section: z.string().min(1, 'Khu vực không được để trống'),
	shelf: z.string().min(1, 'Kệ không được để trống'),
	isActive: z.boolean()
})

type LocationFormValues = z.infer<typeof locationSchema>

// Custom hook để handle debounce
function useDebounce<T>(value: T, delay: number = 500): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => clearTimeout(timer)
	}, [value, delay])

	return debouncedValue
}

export default function ManageLocationsPage() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const params = useQueryParams()

	// State cho search
	const [searchQuery, setSearchQuery] = useState('')
	const debouncedSearch = useDebounce(searchQuery, 3000)
	const [immediateSearch, setImmediateSearch] = useState('')

	// Sử dụng immediateSearch nếu có (khi bấm Enter), nếu không thì dùng debouncedSearch
	const activeSearch = immediateSearch || debouncedSearch

	// Tính toán isSearchMode từ activeSearch
	const isSearchMode = useMemo(() => activeSearch.trim().length > 0, [activeSearch])

	// Lấy page từ URL params hoặc mặc định là 1
	const currentPage = useMemo(() => {
		return parseInt(params.page as string) || 1
	}, [params.page])

	// Get locations bình thường (khi không search)
	const {
		data: locationsData,
		isLoading: isLoadingLocations,
		isError: isErrorLocations
	} = useGetLocations(
		params as QueryParamsType,
		!isSearchMode // Chỉ enabled khi không search
	)

	// Search locations (khi có search query)
	const {
		data: searchData,
		isLoading: isLoadingSearch,
		isError: isErrorSearch
	} = useSearchLocation(
		{
			q: activeSearch,
			page: currentPage,
			limit: 5
		},
		isSearchMode // Chỉ enabled khi đang search
	)

	// Tính toán data hiển thị
	const displayData = isSearchMode ? searchData : locationsData
	const locations = displayData?.data
	const currentMeta = displayData?.meta
	const currentData = locations?.length
	const isLoading = isSearchMode ? isLoadingSearch : isLoadingLocations
	const isError = isSearchMode ? isErrorSearch : isErrorLocations

	// Mutations
	const { mutate: createLocation, isPending: isCreating } = useCreateLocation()
	const { mutate: updateLocation, isPending: isUpdating } = useUpdateLocation()
	const { mutate: deleteLocation, isPending: isDeleting } = useDeleteUser()

	// Dialog states
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null)

	const createForm = useForm<LocationFormValues>({
		resolver: zodResolver(locationSchema),
		defaultValues: {
			name: '',
			description: '',
			floor: 0,
			section: '',
			shelf: '',
			isActive: true
		}
	})

	const editForm = useForm<LocationFormValues>({
		resolver: zodResolver(locationSchema),
		defaultValues: {
			name: '',
			description: '',
			floor: 0,
			section: '',
			shelf: '',
			isActive: true
		}
	})

	// Hàm invalidate queries thông minh
	const invalidateLocationQueries = () => {
		if (isSearchMode) {
			queryClient.invalidateQueries({ queryKey: ['searchLocations'] })
		} else {
			queryClient.invalidateQueries({ queryKey: [locationApi.getLocations.name] })
		}
	}

	const handleCreate = (data: LocationFormValues) => {
		const payload: CreateLocationType = {
			name: data.name,
			description: data.description,
			floor: data.floor,
			section: data.section,
			shelf: data.shelf,
			isActive: data.isActive
		}

		createLocation(payload, {
			onSuccess: () => {
				toast.success('Vị trí kệ sách được tạo thành công')
				invalidateLocationQueries()
				setIsCreateDialogOpen(false)
				createForm.reset()
			},
			onError: () => {
				toast.error('Có lỗi xảy ra khi tạo vị trí kệ sách')
			}
		})
	}

	const handleEdit = (location: LocationType) => {
		setSelectedLocation(location)
		editForm.reset({
			name: location.name,
			description: location.description,
			floor: location.floor,
			section: location.section,
			shelf: location.shelf,
			isActive: location.isActive
		})
		setIsEditDialogOpen(true)
	}

	const handleUpdate = (data: LocationFormValues) => {
		if (!selectedLocation) return

		const payload: UpdateLocationType = {
			name: data.name,
			description: data.description,
			floor: data.floor,
			section: data.section,
			shelf: data.shelf,
			isActive: data.isActive
		}

		updateLocation(
			{ locationId: selectedLocation.id, payload },
			{
				onSuccess: () => {
					toast.success('Cập nhật vị trí kệ sách thành công')
					invalidateLocationQueries()
					setIsEditDialogOpen(false)
					setSelectedLocation(null)
					editForm.reset()
				},
				onError: () => {
					toast.error('Có lỗi xảy ra khi cập nhật vị trí kệ sách')
				}
			}
		)
	}

	const handleDeleteClick = (location: LocationType) => {
		setSelectedLocation(location)
		setIsDeleteDialogOpen(true)
	}

	const handleDelete = () => {
		if (!selectedLocation) return

		deleteLocation(selectedLocation.id, {
			onSuccess: () => {
				toast.success('Xóa vị trí kệ sách thành công')
				invalidateLocationQueries()
				setIsDeleteDialogOpen(false)
				setSelectedLocation(null)
			},
			onError: () => {
				toast.error('Có lỗi xảy ra khi xóa vị trí kệ sách')
			}
		})
	}

	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: '/locations',
			search: createSearchParams({
				...params,
				page: newPage.toString()
			}).toString()
		})
	}

	// Hàm clear search được tối ưu
	const handleClearSearch = () => {
		setSearchQuery('')
		setImmediateSearch('')
		// Reset về trang 1 khi clear search
		if (currentPage !== 1) {
			navigate({
				pathname: '/locations',
				search: createSearchParams({
					...params,
					page: '1'
				}).toString()
			})
		}
	}

	// Hàm xử lý khi bấm Enter
	const handleSearchEnter = () => {
		setImmediateSearch(searchQuery)
	}

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
				<h1 className='text-2xl font-bold text-gray-800'>Quản lý kệ sách</h1>
				<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
					<DialogTrigger asChild>
						<Button className='bg-green-600 hover:bg-green-700'>
							<Plus className='h-4 w-4 mr-2' />
							Thêm vị trí
						</Button>
					</DialogTrigger>
					<DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
						<DialogHeader>
							<DialogTitle>Thêm vị trí kệ sách mới</DialogTitle>
							<DialogDescription>Nhập thông tin vị trí kệ sách mới vào form bên dưới</DialogDescription>
						</DialogHeader>
						<Form {...createForm}>
							<form onSubmit={createForm.handleSubmit(handleCreate)} className='space-y-4'>
								<FormField
									control={createForm.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tên vị trí</FormLabel>
											<FormControl>
												<Input placeholder='Nhập tên vị trí' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='grid grid-cols-3 gap-4'>
									<FormField
										control={createForm.control}
										name='floor'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tầng</FormLabel>
												<FormControl>
													<Input
														type='number'
														placeholder='0'
														{...field}
														onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={createForm.control}
										name='section'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Khu vực</FormLabel>
												<FormControl>
													<Input placeholder='VD: A, B, C' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={createForm.control}
										name='shelf'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Kệ</FormLabel>
												<FormControl>
													<Input placeholder='VD: 01, 02, 03' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={createForm.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Mô tả</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Nhập mô tả vị trí kệ sách'
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
										{isCreating ? 'Đang tạo...' : 'Tạo vị trí'}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>

			{/* Search Bar với loading indicator */}
			<div className='mb-6'>
				<div className='flex gap-2'>
					<div className='relative flex-1'>
						<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
						<Input
							type='text'
							placeholder='Tìm kiếm vị trí kệ sách theo tên...'
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value)
								setImmediateSearch('')
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault()
									handleSearchEnter()
								}
							}}
							className='pl-10 pr-10 h-10'
						/>
						{searchQuery && (
							<Button
								variant='ghost'
								size='icon'
								onClick={handleClearSearch}
								className='absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
								aria-label='Clear search'
							>
								<X className='h-4 w-4' />
							</Button>
						)}
					</div>

					<Button variant='default' className='px-6 h-10 flex items-center gap-2' onClick={handleSearchEnter}>
						<Search className='h-4 w-4' />
						Tìm kiếm
					</Button>
				</div>

				{/* Loading indicator khi đang search */}
				{isSearchMode && isLoadingSearch && (
					<div className='mt-2 flex items-center gap-2 text-sm text-muted-foreground'>
						<div className='h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin' />
						<span>Đang tìm kiếm...</span>
					</div>
				)}
			</div>

			{/* Stats Section */}
			<div className='mb-6 grid grid-cols-1 md:grid-cols-4 gap-4'>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Tổng số</h3>
					<p className='text-2xl font-bold text-gray-800'>{locations?.length || 0}</p>
				</div>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Đang hoạt động</h3>
					<p className='text-2xl font-bold text-green-600'>
						{locations?.filter((l) => l.isActive).length || 0}
					</p>
				</div>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Không hoạt động</h3>
					<p className='text-2xl font-bold text-red-600'>
						{locations?.filter((l) => !l.isActive).length || 0}
					</p>
				</div>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Số tầng</h3>
					<p className='text-2xl font-bold text-blue-600'>
						{locations ? new Set(locations.map((l) => l.floor)).size : 0}
					</p>
				</div>
			</div>

			{/* Table */}
			<div className='bg-white rounded-lg shadow overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên vị trí</TableHead>
							<TableHead>Tầng</TableHead>
							<TableHead>Khu vực</TableHead>
							<TableHead>Kệ</TableHead>
							<TableHead>Mô tả</TableHead>
							<TableHead>Trạng thái</TableHead>
							<TableHead className='text-right'>Hành động</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{locations && locations.length > 0 ? (
							locations.map((location) => (
								<TableRow key={location.id}>
									<TableCell className='font-medium'>{location.name}</TableCell>
									<TableCell>Tầng {location.floor}</TableCell>
									<TableCell>{location.section}</TableCell>
									<TableCell>{location.shelf}</TableCell>
									<TableCell className='max-w-xs'>
										<div className='truncate'>{location.description}</div>
									</TableCell>
									<TableCell>
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												location.isActive
													? 'bg-green-100 text-green-800'
													: 'bg-red-500 text-gray-50'
											}`}
										>
											{location.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
										</span>
									</TableCell>
									<TableCell className='text-right'>
										<div className='flex justify-end gap-2'>
											<Button
												onClick={() => handleEdit(location)}
												size='icon'
												variant='ghost'
												className='text-green-600 hover:bg-blue-50 hover:text-green-800'
											>
												<Edit className='h-4 w-4' />
											</Button>
											<Button
												onClick={() => handleDeleteClick(location)}
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
									{isSearchMode
										? `Không tìm thấy vị trí kệ sách nào với từ khóa "${activeSearch}"`
										: 'Không tìm thấy vị trí kệ sách nào'}
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
						<DialogTitle>Chỉnh sửa vị trí kệ sách</DialogTitle>
						<DialogDescription>Cập nhật thông tin vị trí kệ sách</DialogDescription>
					</DialogHeader>
					<Form {...editForm}>
						<form onSubmit={editForm.handleSubmit(handleUpdate)} className='space-y-4'>
							<FormField
								control={editForm.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên vị trí</FormLabel>
										<FormControl>
											<Input placeholder='Nhập tên vị trí' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='grid grid-cols-3 gap-4'>
								<FormField
									control={editForm.control}
									name='floor'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tầng</FormLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='0'
													{...field}
													onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={editForm.control}
									name='section'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Khu vực</FormLabel>
											<FormControl>
												<Input placeholder='VD: A, B, C' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={editForm.control}
									name='shelf'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Kệ</FormLabel>
											<FormControl>
												<Input placeholder='VD: 01, 02, 03' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={editForm.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mô tả</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Nhập mô tả vị trí kệ sách'
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
						<AlertDialogTitle>Xác nhận xóa vị trí kệ sách</AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc chắn muốn xóa vị trí "{selectedLocation?.name}"? Hành động này không thể hoàn
							tác.
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
