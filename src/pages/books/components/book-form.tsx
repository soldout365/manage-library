import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpen } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import type { PublisherType } from '@/types/publisher.type'
import type { AuthorType } from '@/types/author.type'
import { Combobox } from '@/components/ui/combobox'
import { useState } from 'react'

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

type BookFormProps = {
	publishers?: PublisherType[]
	authors?: AuthorType[]
}

const BookForm = ({ publishers, authors }: BookFormProps) => {
	const form = useForm<BookSchemeType>({
		resolver: zodResolver(bookSchema),
		defaultValues: {}
	})

	const [authorSearchQuery, setAuthorSearchQuery] = useState<string>('')

	const filteredAuthors =
		authors?.filter((author) => {
			if (!authorSearchQuery.trim()) return authors
			return author.author_name.toLowerCase().includes(authorSearchQuery.toLowerCase())
		}) || []

	return (
		<SheetContent side='right' className='!w-[40vw] !max-w-[40vw]'>
			<Card className='shadow-lg border-none rounded-2xl'>
				<CardHeader className='flex flex-row items-center gap-3'>
					<BookOpen className='w-6 h-6 text-primary' />
					<div>
						<CardTitle className='text-xl font-semibold text-primary'>Thêm sách</CardTitle>
						<CardDescription>Nhập đầy đủ thông tin sách bên dưới</CardDescription>
					</div>
				</CardHeader>
				<Separator />
				<CardContent>
					<ScrollArea className='h-[85vh] pr-10 '>
						<Form {...form}>
							<form autoComplete='off' className='grid grid-cols-1 md:grid-cols-2 gap-6 py-6 pl-1'>
								{/* --- Các input cơ bản --- */}
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tên sách</FormLabel>
											<FormControl>
												<Input {...field} placeholder='Tên sách' className='rounded-lg h-11' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='isbn'
									render={({ field }) => (
										<FormItem>
											<FormLabel>ISBN</FormLabel>
											<FormControl>
												<Input {...field} placeholder='ISBN' className='rounded-lg h-11' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='publish_year'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Năm xuất bản</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='VD: 2025'
													type='number'
													className='rounded-lg h-11'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='edition'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tái bản</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='Lần tái bản'
													className='rounded-lg h-11'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='language'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Ngôn ngữ</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='VD: Tiếng Việt'
													className='rounded-lg h-11'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='page_count'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Số trang</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='Số trang'
													type='number'
													className='rounded-lg h-11'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* --- Selects --- */}
								<FormField
									control={form.control}
									name='publisher_id'
									render={({ field }) => (
										<FormItem>
											<FormLabel
												htmlFor='book-publisher_id'
												className='block text-sm font-medium text-gray-700 mb-1'
											>
												Nhà xuất bản
											</FormLabel>
											<FormControl>
												<Combobox
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
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='author_ids'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tác giả</FormLabel>
											<FormControl>
												<Select onValueChange={(value) => field.onChange(value.split(','))}>
													<SelectTrigger className='rounded-lg h-11'>
														<SelectValue placeholder='Chọn tác giả' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='admin'>Admin</SelectItem>
														<SelectItem value='reader'>Reader</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='book_type'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Loại sách</FormLabel>
											<FormControl>
												<Select onValueChange={field.onChange} value={field.value}>
													<SelectTrigger className='rounded-lg h-11'>
														<SelectValue placeholder='Chọn loại sách' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='ebook'>Sách điện tử</SelectItem>
														<SelectItem value='physical'>Sách vật lý</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='physical_type'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Loại vật lý</FormLabel>
											<FormControl>
												<Select onValueChange={field.onChange} value={field.value}>
													<SelectTrigger className='rounded-lg h-11'>
														<SelectValue placeholder='Chọn loại vật lý' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='borrowable'>Có thể mượn</SelectItem>
														<SelectItem value='library_use'>Đọc tại chỗ</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='main_category_id'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Danh mục chính</FormLabel>
											<FormControl>
												<Select onValueChange={field.onChange} value={field.value}>
													<SelectTrigger className='rounded-lg h-11'>
														<SelectValue placeholder='Chọn danh mục' />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value='1'>Toán học</SelectItem>
														<SelectItem value='2'>Vật lý</SelectItem>
														<SelectItem value='3'>Hóa học</SelectItem>
														<SelectItem value='4'>Sinh học</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* --- Ảnh bìa & mô tả --- */}
								<FormField
									control={form.control}
									name='cover_image'
									render={({ field }) => (
										<FormItem className='md:col-span-2'>
											<FormLabel>Ảnh bìa</FormLabel>
											<FormControl>
												<Input
													type='file'
													accept='image/*'
													className='rounded-lg cursor-pointer'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem className='md:col-span-2'>
											<FormLabel>Mô tả</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													rows={4}
													placeholder='Nhập mô tả về sách'
													className='rounded-lg resize-none'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type='submit'
									className='col-span-2 mt-6 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white'
								>
									Thêm sách
								</Button>
							</form>
						</Form>
					</ScrollArea>
				</CardContent>
			</Card>
		</SheetContent>
	)
}

export default BookForm
