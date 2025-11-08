import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { EPhysicalType, type BookCreateType, type BookType, type EBookType } from '@/types/book.type'
import { useEffect, useMemo, useState } from 'react'

import { bookApi } from '@/apis/book.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateBook } from '@/hooks/books/useGetBooks'
import { useUploadImage } from '@/hooks/uploads/use-upload-image'
import { useQueryParams } from '@/hooks/useQueryParam'
import { useBookStore } from '@/stores/book-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import FormFieldComp from './form-field'
import { SearchableAuthorSelectV2 } from '../searchable-author-select-v2'
import { SearchablePublisherSelect } from '../searchable-publisher-select'

const bookSchema = z.object({
	title: z.string().min(1),
	isbn: z.string().min(1),
	publish_year: z.number().min(1),
	description: z.optional(z.string()),
	cover_image: z.string().min(1),
	language: z.string().min(1),
	page_count: z.number().min(1),
	book_type: z.enum(['physical', 'ebook']),
	physical_type: z.enum(['borrowable', 'library_use']).optional(),
	publisher_id: z.string().min(1),
	category_id: z.optional(z.string().min(1)),
	main_category_id: z.string().min(1),
	author_ids: z.array(z.string()).min(1),
	grade_level_ids: z.optional(z.array(z.string()).min(1))
})

export type BookSchemeType = z.infer<typeof bookSchema>

type BookFormProps = {
	onClose?: () => void
	bookData?: BookType
}

const BookForm = ({ onClose, bookData }: BookFormProps) => {
	const { authors, publishers, bookCategories } = useBookStore()
	console.log('🚀 ~ BookForm ~ bookCategories:', bookCategories)

	const queryClient = useQueryClient()
	const queryParams = useQueryParams()

	const form = useForm<BookSchemeType>({
		resolver: zodResolver(bookSchema),
		defaultValues: {}
	})

	const bookType = form.watch('book_type')

	const [authorSearchQuery, setAuthorSearchQuery] = useState<string>('')
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// upload image
	const { mutate: mutationUploadImage } = useUploadImage()
	const { mutate: mutationUpdateBook } = useUpdateBook()

	const allAuthorsOptions = useMemo(() => {
		const staticOptions = authors?.map((author) => {
			return {
				value: author.id,
				label: author.author_name
			}
		})

		if (authorSearchQuery.trim()) {
			return staticOptions?.filter((author) =>
				author.label.toLowerCase().includes(authorSearchQuery.toLowerCase().trim())
			)
		} else {
			return staticOptions
		}
	}, [authors, authorSearchQuery])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file) {
			setSelectedFile(file)
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
			form.setValue('cover_image', url)
		}
	}

	const handleRemoveCoverImage = () => {
		form.setValue('cover_image', '')
		setPreviewUrl(null)
		setSelectedFile(null)
	}

	const onSubmit = async (book: BookSchemeType) => {
		// upload image
		if (bookData) {
			// edit
			if (selectedFile) {
				mutationUploadImage(selectedFile, {
					onSuccess: async (data) => {
						try {
							book.cover_image = data.cloudinaryUrl
							const response = await bookApi.updateBook({
								...book,
								id: bookData?.id
							} as BookCreateType & {
								id: string
							})
							if (response) {
								await queryClient.invalidateQueries({
									queryKey: [bookApi.getBooks.name, queryParams]
								})

								// reset form
								form.reset()
								setPreviewUrl(null)
								setSelectedFile(null)
								setAuthorSearchQuery('')

								// close sheet
								onClose?.()
							}
						} catch (error) {
							toast.error('Cập nhật sách thất bại')
						}
					}
				})
			} else {
				mutationUpdateBook({ ...book, id: bookData?.id } as BookCreateType & {
					id: string
				})
			}
		} else {
			setIsLoading(true)
			if (selectedFile) {
				mutationUploadImage(selectedFile, {
					onSuccess: async (data) => {
						// update payload cover_image
						const payload = {
							...book,
							cover_image: data.cloudinaryUrl
						} as BookCreateType

						try {
							const response = await bookApi.createBook(payload)
							if (response) {
								await queryClient.invalidateQueries({
									queryKey: [bookApi.getBooks.name]
								})

								// reset form
								form.reset()
								setPreviewUrl(null)
								setSelectedFile(null)
								setAuthorSearchQuery('')

								// close sheet
								onClose?.()
							}
						} catch (error) {
							console.log('🚀 ~ onSubmit ~ error:', error)
						}
					},
					onError: (error) => {
						console.log('🚀 ~ handleSubmit ~ error:', error)
					},
					onSettled: () => {
						setIsLoading(false)
					}
				})
			}
		}
	}

	useEffect(() => {
		if (bookData) {
			form.setValue('title', bookData.title)
			form.setValue('isbn', bookData.isbn)
			form.setValue('publish_year', bookData.publish_year)
			form.setValue('description', bookData.description || '')
			form.setValue('cover_image', bookData.cover_image || '')
			form.setValue('language', bookData.language)
			form.setValue('page_count', bookData.page_count)
			form.setValue('book_type', bookData.book_type as EBookType)
			form.setValue('physical_type', (bookData.physical_type as EPhysicalType) || EPhysicalType.BORROWABLE)
			form.setValue('main_category_id', bookData.main_category_id)
			form.setValue('publisher_id', bookData.publisher_id)
			form.setValue(
				'author_ids',
				bookData.authors.map((author) => author.id)
			)
		}
	}, [bookData, form])

	return (
		<SheetContent className='h-[100vh]'>
			<SheetHeader>
				<SheetTitle>{bookData ? 'Chỉnh sách' : 'Thêm sách'}</SheetTitle>
				<SheetDescription>
					{bookData ? `Chỉnh sửa sách: ${bookData?.title}` : 'Thêm sách mới vào hệ thống.'}
				</SheetDescription>
			</SheetHeader>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					autoComplete='off'
					className='bg-white w-full flex flex-col gap-6 mt-6 px-4 h-[calc(100vh-82px)] overflow-y-auto'
				>
					<FormFieldComp control={form.control} name='title' label='Tên sách'>
						{(field) => (
							<Input
								id='book-title'
								placeholder='Tên sách'
								type='text'
								className='w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'
								autoFocus
								{...field}
							/>
						)}
					</FormFieldComp>

					<FormFieldComp control={form.control} name='isbn' label='ISBN'>
						{(field) => (
							<Input
								id='book-isbn'
								placeholder='ISBN'
								type='text'
								className='w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'
								autoFocus
								{...field}
							/>
						)}
					</FormFieldComp>

					<FormField
						control={form.control}
						name='publish_year'
						render={({ field, fieldState }) => (
							<div>
								<label
									htmlFor='book-publish_year'
									className='block text-sm font-medium text-gray-700 mb-1'
								>
									Năm xuất bản
								</label>
								<Input
									id='book-publish_year'
									placeholder='Năm xuất bản'
									type='number'
									className='w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'
									autoFocus
									{...field}
									onChange={(e) => {
										field.onChange(Number(e.target.value))
									}}
								/>
								{fieldState.error && (
									<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
								)}
							</div>
						)}
					/>

					<FormField
						control={form.control}
						name='language'
						render={({ field, fieldState }) => (
							<div>
								<label htmlFor='book-edition' className='block text-sm font-medium text-gray-700 mb-1'>
									Ngôn ngữ
								</label>
								<Input
									id='book-language'
									placeholder='Ngôn ngữ'
									type='text'
									className='w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'
									{...field}
								/>
								{fieldState.error && (
									<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
								)}
							</div>
						)}
					/>

					<FormField
						control={form.control}
						name='page_count'
						render={({ field, fieldState }) => (
							<div>
								<label
									htmlFor='book-page_count'
									className='block text-sm font-medium text-gray-700 mb-1'
								>
									Số trang
								</label>
								<Input
									id='book-page_count'
									placeholder='Số trang'
									type='number'
									className='w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'
									{...field}
									onChange={(e) => {
										field.onChange(Number(e.target.value))
									}}
								/>
								{fieldState.error && (
									<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
								)}
							</div>
						)}
					/>

					<FormField
						control={form.control}
						name='publisher_id'
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel className='block text-sm font-medium text-gray-700 mb-1'>
										Nhà xuất bản
									</FormLabel>
									<SearchablePublisherSelect
										options={
											publishers?.map((publisher) => ({
												value: publisher.id,
												label: publisher.publisherName
											})) || []
										}
										value={field.value}
										onValueChange={field.onChange}
										placeholder='Chọn nhà xuất bản'
										searchPlaceholder='Tìm nhà xuất bản'
										emptyText='Không tìm thấy nhà xuất bản'
									/>
								</FormItem>
							)
						}}
					/>

					<FormField
						control={form.control}
						name='author_ids'
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel className='block text-sm font-medium text-gray-700 mb-1'>
										Tác giả
									</FormLabel>
									<SearchableAuthorSelectV2
										options={allAuthorsOptions || []}
										onValueChange={(value) => {
											console.log('🟢 Value changed:', value)
											const currentIds = field.value || []
											if (!currentIds.includes(value)) {
												field.onChange([...currentIds, value])
											}
											setAuthorSearchQuery('')
										}}
										onValueSearch={setAuthorSearchQuery}
										placeholder='Chọn tác giả'
										searchPlaceholder='Tìm kiếm tác giả'
										isLoading={false}
										emptyText='Không tìm thấy tác giả'
									/>

									{/* Danh sách tác giả đã chọn */}
									{field.value && field.value?.length > 0 && (
										<div className='mt-2 space-y-1'>
											{field.value.map((authorId) => {
												const author = authors?.find((authorItem) => authorItem.id === authorId)

												return (
													<div
														key={author?.id}
														className='flex items-center justify-between p-2 rounded bg-muted gap-2'
													>
														<span className='text-sm'>{author?.author_name}</span>
														<Button
															type='button'
															variant='ghost'
															size='sm'
															className='p-0 h-4 w-4'
															onClick={() => {
																field.onChange(
																	field.value?.filter((id) => id !== authorId)
																)
															}}
														>
															<X className='w-4 h-4' />
														</Button>
													</div>
												)
											})}
										</div>
									)}
								</FormItem>
							)
						}}
					/>

					<FormField
						control={form.control}
						name='book_type'
						render={({ field, fieldState }) => {
							return (
								<div>
									<label
										htmlFor='book-book_type'
										className='block text-sm font-medium text-gray-700 mb-1'
									>
										Loại sách
									</label>
									<Select
										{...field}
										onValueChange={(value) => {
											field.onChange(value)
										}}
									>
										<SelectTrigger className='w-full !h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'>
											<SelectValue placeholder='Loại sách' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='ebook'>Sách điện tử</SelectItem>
											<SelectItem value='physical'>Sách vật lý</SelectItem>
										</SelectContent>
									</Select>
									{fieldState.error && (
										<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
									)}
								</div>
							)
						}}
					/>

					{bookType === 'physical' && (
						<FormField
							control={form.control}
							name='physical_type'
							render={({ field, fieldState }) => {
								return (
									<div>
										<label
											htmlFor='book-physical_type'
											className='block text-sm font-medium text-gray-700 mb-1'
										>
											Loại sách vật lý
										</label>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger className='w-full !h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'>
													<SelectValue placeholder='Chọn loại vật lý' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='borrowable'>Có thể mượn</SelectItem>
												<SelectItem value='library_use'>Chỉ đọc tại thư viện</SelectItem>
											</SelectContent>
										</Select>
										{fieldState.error && (
											<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
										)}
									</div>
								)
							}}
						/>
					)}

					<FormField
						control={form.control}
						name='main_category_id'
						render={({ field, fieldState }) => {
							return (
								<div>
									<label
										htmlFor='book-main_category_id'
										className='block text-sm font-medium text-gray-700 mb-1'
									>
										Danh mục chính
									</label>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger className='w-full !h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'>
												<SelectValue placeholder='Chọn danh mục chính' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{bookCategories?.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{fieldState.error && (
										<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
									)}
								</div>
							)
						}}
					/>

					<FormFieldComp control={form.control} name='cover_image' label='Ảnh bìa'>
						{(field) => (
							<div className='space-y-2'>
								<div className='flex items-center space-x-2'>
									<Input
										type='file'
										accept='image/*'
										onChange={(e) => handleFileChange(e)}
										className='flex-1 w-full'
									/>
								</div>

								{(previewUrl || field.value) && (
									<div className='relative h-40 w-40 border rounded-md overflow-hidden'>
										<img
											src={previewUrl || (field.value as string)}
											alt='preview'
											className='w-full h-full object-cover'
										/>

										<button
											type='button'
											className='absolute top-2 right-2 h-6 w-6 flex items-center justify-center rounded-full bg-white border border-gray-500 shadow'
											onClick={handleRemoveCoverImage}
										>
											<X className='w-4 h-4 text-red-500' />
										</button>
									</div>
								)}
							</div>
						)}
					</FormFieldComp>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mô tả</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Nhập mô tả về sách'
										className='resize-none w-full'
										rows={4}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='h-12 rounded-sm mb-4 w-full' disabled={isLoading}>
						{isLoading ? 'Đang thêm sách...' : bookData ? 'Chỉnh sửa sách' : 'Thêm sách'}
					</Button>
				</form>
			</Form>
		</SheetContent>
	)
}

export default BookForm
