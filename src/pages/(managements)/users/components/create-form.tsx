import type { CreateReaderForUserType, CreateUserType } from '@/types/user.type'
import { Form, FormField } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

const registerSchema = z.object({
	userCode: z.string().min(1),
	username: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(1),
	role: z.enum(['admin', 'reader']),
	accountStatus: z.enum(['active', 'banned', 'suspended']),
	cardIssueDate: z.string().min(1),
	cardExpiryDate: z.string().min(1)
})

type RegisterSchemaType = z.infer<typeof registerSchema>

interface CreateFormProps {
	onClose?: () => void
}

const CreateForm = ({ onClose }: CreateFormProps) => {
	const queryClient = useQueryClient()

	const { type } = useQueryParams()

	const { mutate: createUserMutate, isPending, error } = useCreateUser()
	const currentYear = new Date().getFullYear()

	const [roleState, setRoleState] = useState<'reader' | 'admin'>('reader')

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			userCode: '',
			username: '',
			email: '',
			password: '',
			role: roleState,
			accountStatus: 'active',
			cardIssueDate: (() => {
				return `${currentYear}-09-02`
			})(),
			cardExpiryDate: (() => {
				return `${currentYear + 3}-05-30`
			})()
		}
	})

	// watch
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
		console.log('🚀 ~ handleSubmit ~ data:', data)
		createUserMutate(_.omit(data, ['cardIssueDate', 'cardExpiryDate']) as unknown as CreateUserType, {
			onSuccess: async (response) => {
				// tạo mới reader từ user
				const payloadCreateReader: CreateReaderForUserType = {
					// userId: response.id,
					readerTypeName: roleState === 'reader' ? 'student' : 'staff',
					cardNumber: response.userCode,
					fullName: response.username,
					cardExpiryDate: roleState === 'reader' ? data.cardExpiryDate : null,
					cardIssueDate: roleState === 'reader' ? data.cardIssueDate : null
				}

				try {
					const resposne = await userApi.createReaderForUser(response.id, payloadCreateReader)
					if (resposne) {
						await queryClient.invalidateQueries({
							queryKey: [userApi.getUsers.name]
						})
						await queryClient.invalidateQueries({
							queryKey: [readerApi.getReaders.name]
						})
						onClose?.()
						form.reset()
						setRoleState(type === 'admin' ? 'admin' : 'reader')
						toast.success('Thêm người dùng thành công', {
							description: 'Người dùng đã được thêm thành công'
						})
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

	useEffect(() => {
		form.setValue('role', roleState)
	}, [roleState, form])

	useEffect(() => {
		setRoleState(type === 'admin' ? 'admin' : 'reader')
	}, [type])

	return (
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Thêm người dùng</SheetTitle>
				<SheetDescription>Thêm người dùng mới vào hệ thống.</SheetDescription>
			</SheetHeader>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					autoComplete='off'
					className='bg-white w-full flex flex-col gap-6 mt-6 px-4 h-full'
				>
					<FormField
						control={form.control}
						name='userCode'
						render={({ field, fieldState }) => (
							<div>
								<label
									htmlFor='login-userCode'
									className='block text-sm font-medium text-gray-700 mb-1'
								>
									Mã người dùng
								</label>
								<Input
									id='login-userCode'
									placeholder='Mã người dùng'
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
						name='email'
						render={({ field, fieldState }) => (
							<div>
								<label htmlFor='login-email' className='block text-sm font-medium text-gray-700 mb-1'>
									Email
								</label>
								<Input
									id='login-email'
									placeholder='Email'
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
						name='username'
						render={({ field, fieldState }) => (
							<div>
								<label
									htmlFor='login-username'
									className='block text-sm font-medium text-gray-700 mb-1'
								>
									Tên độc giả
								</label>
								<Input
									id='login-username'
									placeholder='Tên độc giả'
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
						name='password'
						render={({ field, fieldState }) => (
							<div>
								<label
									htmlFor='login-password'
									className='block text-sm font-medium text-gray-700 mb-1'
								>
									Mật khẩu
								</label>
								<Input
									id='login-password'
									placeholder='Mật khẩu'
									type='password'
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
						name='role'
						render={({ field, fieldState }) => {
							return (
								<div>
									<label
										htmlFor='login-role'
										className='block text-sm font-medium text-gray-700 mb-1'
									>
										Quyền
									</label>
									<Select
										{...field}
										onValueChange={(value) => {
											field.onChange(value)
											return setRoleState(value as 'reader' | 'admin')
										}}
										value={roleState}
									>
										<SelectTrigger className='w-full !h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'>
											<SelectValue placeholder='Quyền' />
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
						name='accountStatus'
						render={({ field, fieldState }) => (
							<div>
								<label
									htmlFor='login-accountStatus'
									className='block text-sm font-medium text-gray-700 mb-1'
								>
									Trạng thái tài khoản
								</label>
								<Select {...field}>
									<SelectTrigger className='w-full !h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'>
										<SelectValue placeholder='Trạng thái tài khoản' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='active'>Active</SelectItem>
										<SelectItem value='banned'>Banned</SelectItem>
										<SelectItem value='suspended'>Suspended</SelectItem>
									</SelectContent>
								</Select>
								{fieldState.error && (
									<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
								)}
							</div>
						)}
					/>

					{roleState === 'reader' && (
						<>
							<FormField
								control={form.control}
								name='cardIssueDate'
								render={({ field, fieldState }) => (
									<div>
										<label
											htmlFor='login-cardIssueDate'
											className='block text-sm font-medium text-gray-700 mb-1'
										>
											Ngày cấp
										</label>
										<Input
											id='login-cardIssueDate'
											placeholder='Ngày cấp'
											type='date'
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
								name='cardExpiryDate'
								render={({ field, fieldState }) => (
									<div>
										<label
											htmlFor='login-cardExpiryDate'
											className='block text-sm font-medium text-gray-700 mb-1'
										>
											Ngày hết hạn
										</label>
										<Input
											id='login-cardExpiryDate'
											placeholder='Ngày hết hạn'
											type='date'
											className='w-full h-12 rounded-sm px-4 border border-primary focus:outline-none focus:ring-2 focus:ring-primary'
											{...field}
										/>
										{fieldState.error && (
											<div className='text-red-500 text-xs mt-1'>{fieldState.error.message}</div>
										)}
									</div>
								)}
							/>
						</>
					)}

					{/* {error && (
							<div className="text-red-500 text-sm text-center">
								{error.message}
							</div>
						)} */}
					<Button type='submit' className='h-12 rounded-sm mt-auto mb-4' disabled={false}>
						Thêm người dùng
					</Button>
				</form>
			</Form>
		</SheetContent>
	)
}

export default CreateForm
