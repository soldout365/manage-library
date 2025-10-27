import { useState, useEffect } from 'react'
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
import { useGetAuthors } from '@/hooks/authors/useGetAuthors'
import { useSearchAuthors } from '@/hooks/authors/useSearchAuthor'
import { useCreateAthor } from '@/hooks/authors/useCreateAuthor'
import { useUpdateAuthorById } from '@/hooks/authors/useUpdateAuthorById'
import { useDeleteAuthorById } from '@/hooks/authors/useDeleteAuthorById'
import { useQueryClient } from '@tanstack/react-query'
import { authorApi } from '@/apis/author.api'
import type { AuthorType, CreateAuthorPayload, GetAuthorsParamsType, UpdateAuthorPayload } from '@/types/author.type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { useQueryParams } from '@/hooks/useQueryParam'
import PagiantionWapper from '@/components/pagination-wrapper'
import { createSearchParams, useNavigate } from 'react-router-dom'

const authorSchema = z.object({
	author_name: z.string().min(1, 'Tên tác giả không được để trống'),
	nationality: z.string().min(1, 'Quốc tịch không được để trống'),
	bio: z.string().min(1, 'Tiểu sử không được để trống')
})

type AuthorFormValues = z.infer<typeof authorSchema>

export default function ManageAuthors() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const params = useQueryParams()
	//
	// State cho search
	const [searchQuery, setSearchQuery] = useState('')
	const [debouncedSearch, setDebouncedSearch] = useState('')
	const [searchPage, setSearchPage] = useState(1)
	const [isSearchMode, setIsSearchMode] = useState(false)

	// Debounce search query
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchQuery)
			if (searchQuery.trim()) {
				setIsSearchMode(true)
				setSearchPage(1) // Reset về trang 1 khi search mới
			} else {
				setIsSearchMode(false)
			}
		}, 2000)

		return () => clearTimeout(timer)
	}, [searchQuery])

	// Get authors bình thường (khi không search)
	const {
		data: authorsData,
		isLoading: isLoadingAuthors,
		isError: isErrorAuthors
	} = useGetAuthors(isSearchMode ? undefined : (params as GetAuthorsParamsType))

	// Search authors (khi có search query)
	const {
		data: searchData,
		isLoading: isLoadingSearch,
		isError: isErrorSearch
	} = useSearchAuthors({
		q: debouncedSearch,
		page: searchPage,
		limit: 10
	})

	//  data sử dụng
	const displayData = isSearchMode ? searchData : authorsData

	const authors = displayData?.data

	const currentMeta = displayData?.meta

	const currentData = authors?.length

	const isLoading = isSearchMode ? isLoadingSearch : isLoadingAuthors

	const isError = isSearchMode ? isErrorSearch : isErrorAuthors

	//

	const { mutate: createAuthor, isPending: isCreating } = useCreateAthor()
	const { mutate: updateAuthor, isPending: isUpdating } = useUpdateAuthorById()
	const { mutate: deleteAuthor, isPending: isDeleting } = useDeleteAuthorById()

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedAuthor, setSelectedAuthor] = useState<AuthorType | null>(null)

	const createForm = useForm<AuthorFormValues>({
		resolver: zodResolver(authorSchema),
		defaultValues: {
			author_name: '',
			nationality: '',
			bio: ''
		}
	})

	const editForm = useForm<AuthorFormValues>({
		resolver: zodResolver(authorSchema),
		defaultValues: {
			author_name: '',
			nationality: '',
			bio: ''
		}
	})

	const handleCreate = (data: AuthorFormValues) => {
		const payload: CreateAuthorPayload = {
			author_name: data.author_name,
			nationality: data.nationality,
			bio: data.bio
		}

		createAuthor(payload, {
			onSuccess: () => {
				toast.success('Tác giả được tạo thành công')
				queryClient.invalidateQueries({ queryKey: [authorApi.getAuthors.name] })
				queryClient.invalidateQueries({ queryKey: ['searchAuthors'] })
				setIsCreateDialogOpen(false)
				createForm.reset()
			},
			onError: () => {
				toast.error('Có lỗi xảy ra khi tạo tác giả')
			}
		})
	}

	const handleEdit = (author: AuthorType) => {
		setSelectedAuthor(author)
		editForm.reset({
			author_name: author.author_name,
			nationality: author.nationality,
			bio: author.bio
		})
		setIsEditDialogOpen(true)
	}

	const handleUpdate = (data: AuthorFormValues) => {
		if (!selectedAuthor) return

		const payload: UpdateAuthorPayload = {
			author_name: data.author_name,
			nationality: data.nationality,
			bio: data.bio
		}

		updateAuthor(
			{ id: selectedAuthor.id, payload },
			{
				onSuccess: () => {
					toast.success('Cập nhật tác giả thành công')
					queryClient.invalidateQueries({ queryKey: [authorApi.getAuthors.name] })
					queryClient.invalidateQueries({ queryKey: ['searchAuthors'] })
					setIsEditDialogOpen(false)
					setSelectedAuthor(null)
					editForm.reset()
				},
				onError: () => {
					toast.error('Có lỗi xảy ra khi cập nhật tác giả')
				}
			}
		)
	}

	const handleDeleteClick = (author: AuthorType) => {
		setSelectedAuthor(author)
		setIsDeleteDialogOpen(true)
	}

	const handleDelete = () => {
		if (!selectedAuthor) return

		deleteAuthor(selectedAuthor.id, {
			onSuccess: () => {
				toast.success('Xóa tác giả thành công')
				queryClient.invalidateQueries({ queryKey: [authorApi.getAuthors.name] })
				queryClient.invalidateQueries({ queryKey: ['searchAuthors'] })
				setIsDeleteDialogOpen(false)
				setSelectedAuthor(null)
			},
			onError: () => {
				toast.error('Có lỗi xảy ra khi xóa tác giả')
			}
		})
	}

	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: '/authors',
			search: createSearchParams({
				...params,
				page: newPage.toString()
			}).toString()
		})
	}
	//
	const handleClearSearch = () => {
		setSearchQuery('')
		setDebouncedSearch('')
		setIsSearchMode(false)
		setSearchPage(1)
	}
	//
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
				<h1 className='text-2xl font-bold text-gray-800'>Quản lý tác giả</h1>
				<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
					<DialogTrigger asChild>
						<Button className='bg-green-600 hover:bg-green-700'>
							<Plus className='h-4 w-4 mr-2' />
							Thêm tác giả
						</Button>
					</DialogTrigger>
					<DialogContent className='max-w-2xl'>
						<DialogHeader>
							<DialogTitle>Thêm tác giả mới</DialogTitle>
							<DialogDescription>Nhập thông tin tác giả mới vào form bên dưới</DialogDescription>
						</DialogHeader>
						<Form {...createForm}>
							<form onSubmit={createForm.handleSubmit(handleCreate)} className='space-y-4'>
								<FormField
									control={createForm.control}
									name='author_name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tên tác giả</FormLabel>
											<FormControl>
												<Input placeholder='Nhập tên tác giả' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={createForm.control}
									name='nationality'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Quốc tịch</FormLabel>
											<FormControl>
												<Input placeholder='Nhập quốc tịch' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={createForm.control}
									name='bio'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tiểu sử</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Nhập tiểu sử tác giả'
													className='min-h-[120px]'
													{...field}
												/>
											</FormControl>
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
										{isCreating ? 'Đang tạo...' : 'Tạo tác giả'}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>

			{/* Search Bar */}
			<div className='mb-6 bg-white rounded-lg shadow p-4'>
				<div className='relative'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
					<Input
						type='text'
						placeholder='Tìm kiếm tác giả theo tên...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='pl-10 pr-10'
					/>
					{searchQuery && (
						<button
							onClick={handleClearSearch}
							className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
						>
							<X className='h-4 w-4' />
						</button>
					)}
				</div>
			</div>

			{/* Table */}
			<div className='bg-white rounded-lg shadow'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên tác giả</TableHead>
							<TableHead>Quốc tịch</TableHead>
							<TableHead>Tiểu sử</TableHead>
							<TableHead className='text-right'>Hành động</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{authors && authors.length > 0 ? (
							authors.map((author) => (
								<TableRow key={author.id}>
									<TableCell className='font-medium'>{author.author_name}</TableCell>
									<TableCell>{author.nationality}</TableCell>
									<TableCell className='max-w-md'>
										<div className='truncate'>{author.bio}</div>
									</TableCell>
									<TableCell className='text-right'>
										<div className='flex justify-end gap-2'>
											<Button
												onClick={() => handleEdit(author)}
												size='icon'
												variant='ghost'
												className='text-green-600 hover:bg-blue-50 hover:text-green-800'
											>
												<Edit className='h-4 w-4' />
											</Button>
											<Button
												onClick={() => handleDeleteClick(author)}
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
								<TableCell className='text-center py-8' colSpan={4}>
									{isSearchMode
										? `Không tìm thấy tác giả nào với từ khóa "${debouncedSearch}"`
										: 'Không tìm thấy tác giả nào'}
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
				<DialogContent className='max-w-2xl'>
					<DialogHeader>
						<DialogTitle>Chỉnh sửa tác giả</DialogTitle>
						<DialogDescription>Cập nhật thông tin tác giả</DialogDescription>
					</DialogHeader>
					<Form {...editForm}>
						<form onSubmit={editForm.handleSubmit(handleUpdate)} className='space-y-4'>
							<FormField
								control={editForm.control}
								name='author_name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tên tác giả</FormLabel>
										<FormControl>
											<Input placeholder='Nhập tên tác giả' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={editForm.control}
								name='nationality'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Quốc tịch</FormLabel>
										<FormControl>
											<Input placeholder='Nhập quốc tịch' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={editForm.control}
								name='bio'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tiểu sử</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Nhập tiểu sử tác giả'
												className='min-h-[120px]'
												{...field}
											/>
										</FormControl>
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
						<AlertDialogTitle>Xác nhận xóa tác giả</AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc chắn muốn xóa tác giả "{selectedAuthor?.author_name}"? Hành động này không thể
							hoàn tác.
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
