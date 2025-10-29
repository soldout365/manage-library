import { useMemo, useState } from 'react'
import { Edit, Trash2, Plus, Search, X } from 'lucide-react'
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
import { useBookCategories } from '@/hooks/book-categories/useGetBookCategories'
import { useCreateBookCategory } from '@/hooks/book-categories/useCreateLocation'
import { useUpdateBookCategory } from '@/hooks/book-categories/useUpdateLocation'
import { useDeleteBookCategory } from '@/hooks/book-categories/useDeleteLocation'
import { useQueryClient } from '@tanstack/react-query'
import { bookCategoryApi } from '@/apis/book-category.api'
import type { BookCategoryType, BookCategoryCreateType, BookCategoryUpdateType } from '@/types/book-category.type'
import type { QueryParamsType } from '@/types/common.type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { useQueryParams } from '@/hooks/useQueryParam'
import PagiantionWapper from '@/components/pagination-wrapper'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchBookCategory } from '@/hooks/book-categories/useSearchBookCategory'

const categorySchema = z.object({
	name: z.string().min(1, 'Tên thể loại không được để trống'),
	parent_id: z.string().optional().nullable()
})

type CategoryFormValues = z.infer<typeof categorySchema>

export default function ManageBookCategoriesPage() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const params = useQueryParams()

	// State cho search
	const [searchQuery, setSearchQuery] = useState('')
	const [immediateSearch, setImmediateSearch] = useState('')

	const debouncedSearch = useDebounce(searchQuery, 3600)
	// Sử dụng immediateSearch nếu có (khi bấm Enter), nếu không thì dùng debouncedSearch
	const activeSearch = immediateSearch || debouncedSearch

	// Tính toán isSearchMode từ activeSearch
	const isSearchMode = useMemo(() => activeSearch.trim().length > 0, [activeSearch])
	// Lấy page từ URL params hoặc mặc định là 1
	const currentPage = useMemo(() => {
		return parseInt(params.page as string) || 1
	}, [params.page])

	const {
		data: bookCategoriesData,
		isLoading: isLoadingBookCategories,
		isError: isErrorBookCategories
	} = useBookCategories(params as QueryParamsType, !isSearchMode)

	// Search locations (khi có search query)
	const {
		data: searchData,
		isLoading: isLoadingSearch,
		isError: isErrorSearch
	} = useSearchBookCategory(
		{
			q: debouncedSearch,
			page: currentPage,
			limit: 5
		},
		isSearchMode // Chỉ enabled khi đang search
	)

	const displayData = isSearchMode ? searchData : bookCategoriesData
	const categories = displayData?.data
	const currentMeta = bookCategoriesData?.meta
	const currentData = categories?.length

	const isLoading = isSearchMode ? isLoadingSearch : isLoadingBookCategories
	const isError = isSearchMode ? isErrorSearch : isErrorBookCategories

	const { mutate: createCategory, isPending: isCreating } = useCreateBookCategory()
	const { mutate: updateCategory, isPending: isUpdating } = useUpdateBookCategory()
	const { mutate: deleteCategory, isPending: isDeleting } = useDeleteBookCategory()

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState<BookCategoryType | null>(null)

	const createForm = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: '',
			parent_id: null
		}
	})

	const editForm = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: '',
			parent_id: null
		}
	})

	const handleCreate = (data: CategoryFormValues) => {
		const payload: BookCategoryCreateType = {
			name: data.name,
			parent_id: data.parent_id || null
		}

		createCategory(payload, {
			onSuccess: () => {
				toast.success('Thể loại được tạo thành công')
				queryClient.invalidateQueries({ queryKey: [bookCategoryApi.getBookCategories.name] })
				setIsCreateDialogOpen(false)
				createForm.reset()
			},
			onError: () => {
				toast.error('Có lỗi xảy ra khi tạo thể loại')
			}
		})
	}

	const handleEdit = (category: BookCategoryType) => {
		setSelectedCategory(category)
		editForm.reset({
			name: category.name,
			parent_id: category.parent_id
		})
		setIsEditDialogOpen(true)
	}

	const handleUpdate = (data: CategoryFormValues) => {
		if (!selectedCategory) return

		const payload: BookCategoryUpdateType = {
			name: data.name,
			parent_id: data.parent_id || null
		}

		updateCategory(
			{ id: selectedCategory.id, data: payload },
			{
				onSuccess: () => {
					toast.success('Cập nhật thể loại thành công')
					queryClient.invalidateQueries({ queryKey: [bookCategoryApi.getBookCategories.name] })
					setIsEditDialogOpen(false)
					setSelectedCategory(null)
					editForm.reset()
				},
				onError: () => {
					toast.error('Có lỗi xảy ra khi cập nhật thể loại')
				}
			}
		)
	}

	const handleDeleteClick = (category: BookCategoryType) => {
		setSelectedCategory(category)
		setIsDeleteDialogOpen(true)
	}

	const handleDelete = () => {
		if (!selectedCategory) return

		deleteCategory(selectedCategory.id, {
			onSuccess: () => {
				toast.success('Xóa thể loại thành công')
				queryClient.invalidateQueries({ queryKey: [bookCategoryApi.getBookCategories.name] })
				setIsDeleteDialogOpen(false)
				setSelectedCategory(null)
			},
			onError: () => {
				toast.error('Có lỗi xảy ra khi xóa thể loại')
			}
		})
	}

	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: '/book-categories',
			search: createSearchParams({
				...params,
				limit: '5',
				page: newPage.toString()
			}).toString()
		})
	}
	// Hàm clear search được tối ưu
	const handleClearSearch = () => {
		setSearchQuery('')
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

	const getParentCategoryName = (parentId: string | null) => {
		if (!parentId) return 'Không có'
		const parent = categories?.find((cat) => cat.id === parentId)
		return parent?.name || 'Không xác định'
	}

	const rootCategories = categories?.filter((cat) => !cat.parent_id) || []
	const childCategories = categories?.filter((cat) => cat.parent_id) || []

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
				<h1 className='text-2xl font-bold text-gray-800'>Quản lý thể loại sách</h1>
				<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
					<DialogTrigger asChild>
						<Button className='bg-green-600 hover:bg-green-700'>
							<Plus className='h-4 w-4 mr-2' />
							Thêm thể loại
						</Button>
					</DialogTrigger>
					<DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
						<DialogHeader>
							<DialogTitle>Thêm thể loại mới</DialogTitle>
							<DialogDescription>Nhập thông tin thể loại mới vào form bên dưới</DialogDescription>
						</DialogHeader>
						<Form {...createForm}>
							<form onSubmit={createForm.handleSubmit(handleCreate)} className='space-y-4'>
								<FormField
									control={createForm.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tên thể loại</FormLabel>
											<FormControl>
												<Input placeholder='Nhập tên thể loại' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={createForm.control}
									name='parent_id'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Thể loại cha (tùy chọn)</FormLabel>
											<Select
												onValueChange={(value) =>
													field.onChange(value === 'none' ? null : value)
												}
												value={field.value || 'none'}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Chọn thể loại cha' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='none'>Không có</SelectItem>
													{categories?.map((cat) => (
														<SelectItem key={cat.id} value={cat.id}>
															{cat.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
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
										{isCreating ? 'Đang tạo...' : 'Tạo thể loại'}
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
			<div className='mb-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Tổng số thể loại</h3>
					<p className='text-2xl font-bold text-gray-800'>{categories?.length || 0}</p>
				</div>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Thể loại gốc</h3>
					<p className='text-2xl font-bold text-green-600'>{rootCategories.length}</p>
				</div>
				<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center'>
					<h3 className='text-sm font-medium text-gray-500 mb-1'>Thể loại con</h3>
					<p className='text-2xl font-bold text-blue-600'>{childCategories.length}</p>
				</div>
			</div>

			{/* Table */}
			<div className='bg-white rounded-lg shadow overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên thể loại</TableHead>
							<TableHead>Thể loại cha</TableHead>
							<TableHead>Ngày tạo</TableHead>
							<TableHead>Ngày cập nhật</TableHead>
							<TableHead className='text-right'>Hành động</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{categories && categories.length > 0 ? (
							categories.map((category) => (
								<TableRow key={category.id}>
									<TableCell className='font-medium'>{category.name}</TableCell>
									<TableCell>
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												category.parent_id
													? 'bg-blue-100 text-blue-800'
													: 'bg-gray-100 text-gray-800'
											}`}
										>
											{getParentCategoryName(category.parent_id)}
										</span>
									</TableCell>
									<TableCell>{new Date(category.createdAt).toLocaleDateString('vi-VN')}</TableCell>
									<TableCell>{new Date(category.updatedAt).toLocaleDateString('vi-VN')}</TableCell>
									<TableCell className='text-right'>
										<div className='flex justify-end gap-2'>
											<Button
												onClick={() => handleEdit(category)}
												size='icon'
												variant='ghost'
												className='text-green-600 hover:bg-blue-50 hover:text-green-800'
											>
												<Edit className='h-4 w-4' />
											</Button>
											<Button
												onClick={() => handleDeleteClick(category)}
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
								<TableCell className='text-center py-8' colSpan={5}>
									Không tìm thấy thể loại nào
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
						<DialogTitle>Chỉnh sửa thể loại</DialogTitle>
						<DialogDescription>Cập nhật thông tin thể loại</DialogDescription>
					</DialogHeader>
					<Form {...editForm}>
						<form onSubmit={editForm.handleSubmit(handleUpdate)} className='space-y-4'>
							<FormField
								control={editForm.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên thể loại</FormLabel>
										<FormControl>
											<Input placeholder='Nhập tên thể loại' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={editForm.control}
								name='parent_id'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Thể loại cha (tùy chọn)</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(value === 'none' ? null : value)}
											value={field.value || 'none'}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Chọn thể loại cha' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='none'>Không có</SelectItem>
												{categories
													?.filter((cat) => cat.id !== selectedCategory?.id)
													.map((cat) => (
														<SelectItem key={cat.id} value={cat.id}>
															{cat.name}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
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
						<AlertDialogTitle>Xác nhận xóa thể loại</AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc chắn muốn xóa thể loại "{selectedCategory?.name}"? Hành động này không thể hoàn
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
