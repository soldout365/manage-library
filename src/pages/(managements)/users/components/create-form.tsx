import {
	EAccountStatus,
	ERole,
	type CreateReaderForUserType,
	type CreateUserType,
	type UpdateUserType
} from '@/types/user.type'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import _ from 'lodash'
import { readerApi } from '@/apis/reader.api'
import { toast } from 'sonner'
import { useCreateUser } from '@/hooks/users/use-create-user'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useQueryParams } from '@/hooks/useQueryParam'
import { userApi } from '@/apis/user.api'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateReader } from '@/hooks/readers/use-update-reader'
import type { UpdateReaderType } from '@/types/reader.type'
import { useUpdateUser } from '@/hooks/users/use-update.user'

const registerSchema = z
	.object({
		userCode: z.string().min(1),
		username: z.string().min(1),
		email: z.email(),
		password: z.string().min(1),
		role: z.enum(['admin', 'reader']),
		accountStatus: z.enum(['active', 'banned', 'suspended']),

		cardIssueDate: z.string().optional(), // ← Thêm .optional()
		cardExpiryDate: z.string().optional() // ← Thêm .optional()
	})
	.refine(
		(data) => {
			// Nếu role là reader thì bắt buộc phải có card dates
			if (data.role === 'reader') {
				return data.cardIssueDate && data.cardExpiryDate
			}
			return true
		},
		{
			message: 'Card dates are required for readers',
			path: ['cardIssueDate']
		}
	)

type RegisterSchemaType = z.infer<typeof registerSchema>

interface CreateFormProps {
	onClose?: () => void
	mode?: 'create' | 'edit' | 'edit-admin'
	defaultValues?: Partial<RegisterSchemaType> & { readerTypeId?: string }
	readerId?: string
	userId?: string
}

const CreateForm = ({ onClose, mode, defaultValues, readerId, userId }: CreateFormProps) => {
	const queryClient = useQueryClient()
	const { type } = useQueryParams()
	const { mutate: createUserMutate } = useCreateUser()
	const { mutate: updateReader } = useUpdateReader()
	const { mutate: updateUser } = useUpdateUser()

	const currentYear = new Date().getFullYear()
	const [roleState, setRoleState] = useState<'reader' | 'admin'>('reader')

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(registerSchema),
		defaultValues: defaultValues || {
			userCode: '',
			username: '',
			email: '',
			password: '',
			role: roleState,
			accountStatus: 'active',
			cardIssueDate: `${currentYear}-09-02`,
			cardExpiryDate: `${currentYear + 3}-05-30`
		}
	})

	const watchCardIssueDate = form.watch('cardIssueDate')

	useEffect(() => {
		if (watchCardIssueDate) {
			const issueDate = new Date(watchCardIssueDate)
			const issueYear = issueDate.getFullYear()
			const expiryYear = issueYear + 3
			form.setValue('cardExpiryDate', `${expiryYear}-05-30`)
		}
	}, [watchCardIssueDate, form])

	const handleSubmit = (data: RegisterSchemaType) => {
		//edit thẻ reader của user
		if (mode === 'edit' && readerId) {
			const payload: UpdateReaderType = {
				fullName: data.username,
				cardNumber: data.userCode,
				cardIssueDate: data.cardIssueDate,
				cardExpiryDate: data.cardExpiryDate || '',
				isActive: data.accountStatus === 'active'
			}
			updateReader(
				{ readerId, data: payload },
				{
					onSuccess: async (respo) => {
						try {
							const minidata: UpdateUserType = {
								username: data.username || '',
								role: data.role as ERole,
								userCode: data.userCode,
								email: data.email,
								accountStatus: data.accountStatus as EAccountStatus
							}
							const res = await userApi.updateUser(respo.user.id, minidata)
							if (res) {
								toast.success('Cập nhật thành công độc giả ')
								queryClient.invalidateQueries({ queryKey: [readerApi.getReaders.name] })
								onClose?.()
							}
						} catch (error) {
							console.log(error)
							toast.error('Cập nhật thất bại')
						}
					},
					onError: () => toast.error('Cập nhật thất bại')
				}
			)
		}
		//edit admin
		// else if (mode === 'edit-admin' && userId) {
		// 	const payload: UpdateUserType = {
		// 		username: data.username,
		// 		userCode: data.userCode,
		// 		email: data.email,
		// 		password: data.password,
		// 		role: data.role as ERole,
		// 		accountStatus: data.accountStatus as EAccountStatus
		// 	}
		// 	updateUser(
		// 		{ userId, data: payload },
		// 		{
		// 			onSuccess: async (respon) => {
		// 				try {
		// 					const reader = await readerApi.getReaderByUserId(userId)
		// 					const data1: UpdateReaderType = {
		// 						cardNumber: respon.userCode,
		// 						fullName: respon.username || data.username,
		// 						cardExpiryDate: roleState === 'reader' ? (data.cardExpiryDate ?? null) : null,
		// 						cardIssueDate: roleState === 'reader' ? data.cardIssueDate : null,
		// 						isActive: respon.accountStatus === 'active',
		// 						dob: '',
		// 						gender: '',
		// 						address: '',
		// 						phone: ''
		// 					}
		// 					const res = await readerApi.updateReader(reader.id, data1)
		// 					if (res) {
		// 						toast.success('Cập nhật thành công quản trị viên ')
		// 						queryClient.invalidateQueries({ queryKey: [userApi.getUsers.name] })
		// 						queryClient.invalidateQueries({ queryKey: [readerApi.getReaders.name] })
		// 						onClose?.()
		// 					}
		// 				} catch (error) {
		// 					console.log(error)
		// 				}
		// 			},
		// 			onError: () => toast.error('Cập nhật thất bại')
		// 		}
		// 	)
		// }
		else if (mode === 'edit-admin' && userId) {
			const payload: UpdateUserType = {
				username: data.username,
				userCode: data.userCode,
				email: data.email,
				password: data.password,
				role: data.role as ERole,
				accountStatus: data.accountStatus as EAccountStatus
			}
			updateUser(
				{ userId, data: payload },
				{
					onSuccess: async (respon) => {
						try {
							// Lấy thông tin reader hiện tại
							const reader = await readerApi.getReaderByUserId(userId)

							if (reader) {
								const data1: UpdateReaderType = {
									cardNumber: respon.userCode,
									fullName: data.username, // Sử dụng username từ form data
									cardExpiryDate: reader.cardExpiryDate, // Giữ nguyên thông tin cũ
									cardIssueDate: reader.cardIssueDate, // Giữ nguyên thông tin cũ
									isActive: respon.accountStatus === 'active'
								}

								const res = await readerApi.updateReader(reader.id, data1)
								if (res) {
									toast.success('Cập nhật thành công quản trị viên')
									await queryClient.invalidateQueries({ queryKey: [userApi.getUsers.name] })
									await queryClient.invalidateQueries({ queryKey: [readerApi.getReaders.name] })
									onClose?.()
								}
							} else {
								// Nếu không có reader (trường hợp admin không có thẻ reader)
								toast.success('Cập nhật thành công quản trị viên')
								await queryClient.invalidateQueries({ queryKey: [userApi.getUsers.name] })
								onClose?.()
							}
						} catch (error) {
							console.log('Error updating reader:', error)
							// Vẫn hiển thị thành công vì user đã được cập nhật
							toast.success('Cập nhật thành công quản trị viên')
							await queryClient.invalidateQueries({ queryKey: [userApi.getUsers.name] })
							onClose?.()
						}
					},
					onError: () => toast.error('Cập nhật thất bại')
				}
			)
		}
		//create user + thẻ reader
		else if (mode === 'create') {
			createUserMutate(_.omit(data, ['cardIssueDate', 'cardExpiryDate']) as unknown as CreateUserType, {
				onSuccess: async (response) => {
					const payloadCreateReader: CreateReaderForUserType = {
						readerTypeName: roleState === 'reader' ? 'student' : 'staff',
						cardNumber: response.userCode,
						fullName: response.username,
						cardExpiryDate: roleState === 'reader' ? (data.cardExpiryDate ?? null) : null,
						cardIssueDate: roleState === 'reader' ? data.cardIssueDate : null
					}

					try {
						const resposne = await userApi.createReaderForUser(response.id, payloadCreateReader)
						if (resposne) {
							await queryClient.invalidateQueries({ queryKey: [userApi.getUsers.name] })
							await queryClient.invalidateQueries({ queryKey: [readerApi.getReaders.name] })
							onClose?.()
							form.reset()
							setRoleState(type === 'admin' ? 'admin' : 'reader')
							toast.success('Thêm người dùng thành công')
						}
					} catch (error) {
						console.log('🚀 ~ handleSubmit ~ error:', error)
					}
				},
				onError: (error) => {
					toast.error('Thêm người dùng thất bại', {
						description: error.message
					})
				}
			})
		}
	}
	// Khi props defaultValues thay đổi (edit user khác hoặc mở dialog), reset lại form
	useEffect(() => {
		if (defaultValues) {
			form.reset({
				...form.getValues(), // giữ state hiện tại
				...defaultValues // ghi đè giá trị mới từ props
			})
		}
	}, [defaultValues, form])

	useEffect(() => {
		form.setValue('role', roleState)
	}, [roleState, form])

	useEffect(() => {
		setRoleState(type === 'admin' ? 'admin' : 'reader')
	}, [type])

	console.log('errors', form.formState.errors)

	return (
		<SheetContent className='p-0'>
			<ScrollArea className='h-[90vh]'>
				<div className='p-6 space-y-6'>
					<SheetHeader>
						<SheetTitle>
							{mode === 'edit' || mode === 'edit-admin' ? 'Cập nhật người dùng' : 'Thêm người dùng'}
						</SheetTitle>
						<SheetDescription>
							{mode === 'edit' || mode === 'edit-admin'
								? 'Chỉnh sửa thông tin người dùng hiện có trong hệ thống.'
								: 'Thêm người dùng mới vào hệ thống.'}
						</SheetDescription>
					</SheetHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
							<Card>
								<CardHeader>
									<CardTitle>Thông tin tài khoản</CardTitle>
								</CardHeader>
								<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='userCode'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Mã người dùng</FormLabel>
												<FormControl>
													<Input placeholder='Nhập mã người dùng' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input placeholder='example@email.com' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tên độc giả</FormLabel>
												<FormControl>
													<Input placeholder='Nhập tên độc giả' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='password'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Mật khẩu</FormLabel>
												<FormControl>
													<Input type='password' placeholder='Nhập mật khẩu' {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Quyền & Trạng thái</CardTitle>
								</CardHeader>
								<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<FormField
										control={form.control}
										name='role'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Quyền</FormLabel>
												<FormControl>
													<Select
														value={roleState}
														onValueChange={(value) => {
															field.onChange(value)
															setRoleState(value as 'reader' | 'admin')
														}}
													>
														<SelectTrigger>
															<SelectValue placeholder='Chọn quyền' />
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
										name='accountStatus'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Trạng thái</FormLabel>
												<FormControl>
													<Select value={field.value} onValueChange={field.onChange}>
														<SelectTrigger>
															<SelectValue placeholder='Chọn trạng thái' />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value='active'>Active</SelectItem>
															<SelectItem value='banned'>Banned</SelectItem>
															<SelectItem value='suspended'>Suspended</SelectItem>
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							{roleState === 'reader' && (
								<>
									<Separator />
									<Card>
										<CardHeader>
											<CardTitle>Thông tin thẻ độc giả</CardTitle>
										</CardHeader>
										<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-4'>
											<FormField
												control={form.control}
												name='cardIssueDate'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Ngày cấp</FormLabel>
														<FormControl>
															<Input type='date' {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name='cardExpiryDate'
												render={({ field }) => (
													<FormItem>
														<FormLabel>Ngày hết hạn</FormLabel>
														<FormControl>
															<Input type='date' {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</CardContent>
									</Card>
								</>
							)}

							<Button type='submit' className='w-full h-11 font-medium'>
								{mode === 'edit' || mode === 'edit-admin' ? 'Cập nhật người dùng' : 'Thêm người dùng'}
							</Button>
						</form>
					</Form>
				</div>
			</ScrollArea>
		</SheetContent>
	)
}

export default CreateForm
