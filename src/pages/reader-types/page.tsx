import { useState } from 'react'
import { Edit, Save, X } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useGetReaderTypes } from '@/hooks/reader-types/useGetReaderTypes'
import { useUpdateReaderTypesById } from '@/hooks/reader-types/useUpdateReaderTypeById'
import { useQueryClient } from '@tanstack/react-query'
import { readerTypeApi } from '@/apis/reader-type.api'
import type { ReaderTypes } from '@/types/reader-types.type'
import { getReaderTypeDisplayName } from '@/utils/getReaderTypeDisplayName'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'

const updateReaderTypeSchema = z.object({
	typeName: z.string().min(1, 'Tên loại độc giả không được để trống'),
	maxBorrowLimit: z.number().min(1, 'Giới hạn mượn phải lớn hơn 0'),
	borrowDurationDays: z.number().min(1, 'Thời gian mượn phải lớn hơn 0'),
	description: z.string().min(1, 'Mô tả không được để trống')
})

type UpdateReaderTypeFormValues = z.infer<typeof updateReaderTypeSchema>

export default function ReaderTypesPage() {
	const queryClient = useQueryClient()
	const { data: readerTypes, isLoading, isError } = useGetReaderTypes()
	const { mutate: updateReaderTypes, isPending } = useUpdateReaderTypesById()

	const [editingId, setEditingId] = useState<string | null>(null)

	const form = useForm<UpdateReaderTypeFormValues>({
		resolver: zodResolver(updateReaderTypeSchema),
		defaultValues: {
			typeName: '',
			maxBorrowLimit: 0,
			borrowDurationDays: 0,
			description: ''
		}
	})

	const handleEdit = (readerType: ReaderTypes) => {
		setEditingId(readerType.id)
		form.reset({
			typeName: readerType.typeName,
			maxBorrowLimit: readerType.maxBorrowLimit,
			borrowDurationDays: readerType.borrowDurationDays,
			description: readerType.description
		})
	}

	const onSubmit = (id: string) => {
		form.handleSubmit((data) => {
			updateReaderTypes(
				{ id, payload: data },
				{
					onSuccess: () => {
						toast.success('Cập nhật loại độc giả thành công')
						queryClient.invalidateQueries({ queryKey: [readerTypeApi.getReaderTypes.name] })
						setEditingId(null)
						form.reset()
					},
					onError: () => {
						toast.error('Có lỗi xảy ra khi cập nhật loại độc giả')
					}
				}
			)
		})()
	}

	const handleCancel = () => {
		setEditingId(null)
		form.reset({
			typeName: '',
			maxBorrowLimit: 0,
			borrowDurationDays: 0,
			description: ''
		})
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
			<div>
				{/* Header */}
				<div className='mb-6'>
					<h1 className='text-2xl font-bold text-gray-500'>Cài đặt quyền mượn sách</h1>
				</div>

				{/* Table */}
				<div className='bg-white rounded-lg shadow'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Loại độc giả</TableHead>
								<TableHead>Giới hạn mượn</TableHead>
								<TableHead>Thời gian mượn</TableHead>
								<TableHead>Mô tả</TableHead>
								<TableHead className='text-right'>Hành động</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{readerTypes && readerTypes.length > 0 ? (
								readerTypes.map((readerType) => (
									<TableRow key={readerType.id}>
										{editingId === readerType.id ? (
											<>
												<TableCell>
													<Form {...form}>
														<FormField
															control={form.control}
															name='typeName'
															render={() => (
																<FormItem>
																	<FormControl>
																		<Badge>
																			<span className='font-medium'>
																				{getReaderTypeDisplayName(
																					readerType.typeName
																				)}
																			</span>
																		</Badge>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</Form>
												</TableCell>
												<TableCell>
													<Form {...form}>
														<FormField
															control={form.control}
															name='maxBorrowLimit'
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<div className='flex items-center gap-2'>
																			<Input
																				type='number'
																				{...field}
																				onChange={(e) =>
																					field.onChange(
																						parseInt(e.target.value) || 0
																					)
																				}
																				className='w-20'
																			/>
																			<span className='text-sm text-gray-600'>
																				cuốn
																			</span>
																		</div>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</Form>
												</TableCell>
												<TableCell>
													<Form {...form}>
														<FormField
															control={form.control}
															name='borrowDurationDays'
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<div className='flex items-center gap-2'>
																			<Input
																				type='number'
																				{...field}
																				onChange={(e) =>
																					field.onChange(
																						parseInt(e.target.value) || 0
																					)
																				}
																				className='w-20'
																			/>
																			<span className='text-sm text-gray-600'>
																				ngày
																			</span>
																		</div>
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</Form>
												</TableCell>
												<TableCell>
													<Form {...form}>
														<FormField
															control={form.control}
															name='description'
															render={({ field }) => (
																<FormItem>
																	<FormControl>
																		<Input {...field} className='w-full' />
																	</FormControl>
																	<FormMessage />
																</FormItem>
															)}
														/>
													</Form>
												</TableCell>
												<TableCell className='text-right'>
													<div className='flex justify-end gap-2'>
														<Button
															onClick={() => onSubmit(readerType.id)}
															size='icon'
															variant='ghost'
															className='text-green-600 hover:bg-green-50 hover:text-green-300 cursor-pointer'
															disabled={isPending}
														>
															<Save size={18} />
														</Button>
														<Button
															onClick={handleCancel}
															size='icon'
															variant='ghost'
															className='text-red-600 hover:bg-red-50 hover:text-red-700'
															disabled={isPending}
														>
															<X size={18} />
														</Button>
													</div>
												</TableCell>
											</>
										) : (
											<>
												<TableCell>
													<div className='flex items-center gap-2'>
														<Badge className=' bg-green-500 hover:bg-green-600'>
															<span className='font-medium'>
																{getReaderTypeDisplayName(readerType.typeName)}
															</span>
														</Badge>
													</div>
												</TableCell>
												<TableCell>{readerType.maxBorrowLimit} cuốn</TableCell>
												<TableCell>{readerType.borrowDurationDays} ngày</TableCell>
												<TableCell className='text-gray-600'>
													{readerType.description}
												</TableCell>
												<TableCell className='text-right'>
													<Button
														onClick={() => handleEdit(readerType)}
														size='icon'
														variant='ghost'
														className='text-green-600 hover:bg-blue-50 hover:text-green-800'
													>
														<Edit className='h-4 w-4' />
														<span className='sr-only'>Chỉnh sửa loại độc giả</span>
													</Button>
												</TableCell>
											</>
										)}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell className='text-center py-8' colSpan={5}>
										Không có loại độc giả nào
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}
