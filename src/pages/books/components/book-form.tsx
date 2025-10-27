import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const bookSchema = z.object({
	title: z.string().min(1),
	isbn: z.string().min(1),
	publish_year: z.number().min(1),
	edition: z.string().min(1),
	description: z.string().min(1),
	cover_image: z.string().min(1),
	language: z.string().min(1),
	page_count: z.number().min(1),
	book_type: z.string().min(1),
	physical_type: z.string().min(1),
	publisher_id: z.string().min(1),
	category_id: z.string().min(1),
	main_category_id: z.string().min(1),
	author_ids: z.array(z.string()).min(1),
	grade_level_ids: z.array(z.string()).min(1)
})

type BookSchemeType = z.infer<typeof bookSchema>

const BookForm = () => {
	const form = useForm<BookSchemeType>({
		resolver: zodResolver(bookSchema),
		defaultValues: {}
	})

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Thêm sách</SheetTitle>
				<SheetDescription>Thêm sách mới vào hệ thống.</SheetDescription>
			</SheetHeader>

			<Form {...form}>
				<form
					// onSubmit={form.handleSubmit(handleSubmit)}
					autoComplete='off'
					className='bg-white w-full flex flex-col gap-6 mt-6 px-4 h-full'
				>
					<FormField
						control={form.control}
						name='title'
						render={({ field, fieldState }) => (
							<div>
								<label htmlFor='book-title' className='block text-sm font-medium text-gray-700 mb-1'>
									Tên sách
								</label>
								<Input
									id='book-title'
									placeholder='Tên sách'
									type='text'
									className='w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'
									autoFocus
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
						name='isbn'
						render={({ field, fieldState }) => (
							<div>
								<label htmlFor='book-isbn' className='block text-sm font-medium text-gray-700 mb-1'>
									ISBN
								</label>
								<Input
									id='book-isbn'
									placeholder='ISBN'
									type='text'
									className='w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'
									autoFocus
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
									type='text'
									className='w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'
									autoFocus
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
						render={({ field, fieldState }) => {
							return (
								<div>
									<label
										htmlFor='book-publisher_id'
										className='block text-sm font-medium text-gray-700 mb-1'
									>
										Nhà xuất bản
									</label>
									<Select
										{...field}
										onValueChange={(value) => {
											field.onChange(value)
										}}
									>
										<SelectTrigger className='w-full !h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'>
											<SelectValue placeholder='Nhà xuất bản' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='admin'>Admin</SelectItem>
											<SelectItem value='reader'>Reader</SelectItem>
										</SelectContent>
									</Select>
									{fieldState.error && (
										<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
									)}
								</div>
							)
						}}
					/>

					<FormField
						control={form.control}
						name='author_ids'
						render={({ field, fieldState }) => {
							return (
								<div>
									<label
										htmlFor='book-author_ids'
										className='block text-sm font-medium text-gray-700 mb-1'
									>
										Tác giả
									</label>
									<Select
										value={''}
										onValueChange={(value) => {
											field.onChange(value.split(','))
										}}
									>
										<SelectTrigger className='w-full !h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'>
											<SelectValue placeholder='Tác giả' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='admin'>Admin</SelectItem>
											<SelectItem value='reader'>Reader</SelectItem>
										</SelectContent>
									</Select>
									{fieldState.error && (
										<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
									)}
								</div>
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
											<SelectItem value='1'>Toán học</SelectItem>
											<SelectItem value='2'>Vật lý</SelectItem>
											<SelectItem value='3'>Hóa học</SelectItem>
											<SelectItem value='4'>Sinh học</SelectItem>
											<SelectItem value='5'>Ngữ văn</SelectItem>
											<SelectItem value='6'>Lịch sử</SelectItem>
											<SelectItem value='7'>Địa lý</SelectItem>
											<SelectItem value='8'>Giáo dục công dân</SelectItem>
											<SelectItem value='9'>Khoa học tự nhiên</SelectItem>
											<SelectItem value='10'>Khoa học xã hội</SelectItem>
										</SelectContent>
									</Select>
									{fieldState.error && (
										<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
									)}
								</div>
							)
						}}
					/>

					<FormField
						control={form.control}
						name='cover_image'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ảnh bìa</FormLabel>
								<FormControl>
									<div className='space-y-2'>
										<div className='flex items-center space-x-2'>
											<Input
												type='file'
												accept='image/*'
												// onChange={handleFileChange}
												className='flex-1 w-full'
											/>
										</div>
										{/* <Input
										placeholder="Hoặc nhập URL ảnh bìa"
										{...field}
										onChange={(e) => {
											field.onChange(e.target.value);
											setPreviewUrl(e.target.value);
										}}
									/> */}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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

					<Button type='submit' className='h-12 rounded-sm mt-auto mb-4' disabled={false}>
						Thêm sách
					</Button>
				</form>
			</Form>
		</SheetContent>
	)
}

export default BookForm
