import { useState } from 'react'
import type { CreatePhysicalBookReq } from '@/types/physical-copies.type'
import { useGetLocations } from '@/hooks/locations/useGetLocations'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Combobox } from '@/components/ui/combobox'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { omit } from 'lodash'
import { toast } from 'sonner'
import { useCreatePhysicalCopy } from '@/hooks/physical-copies/use-create-physical-copy'
import { useParams } from 'react-router-dom'

interface CreatePhysicalCopyFormProps {
	open: boolean
	onClose?: () => void
	bookTitle?: string
}

const CreatePhysicalCopyForm = ({ open, onClose, bookTitle }: CreatePhysicalCopyFormProps) => {
	const { mutate: createPhysicalCopy, isPending } = useCreatePhysicalCopy()
	const params = useParams<{ id: string }>()
	const bookId = params.id

	const { data: locationsData } = useGetLocations()
	const locations = locationsData?.data.map((location) => ({
		label: location.name,
		value: location.id
	}))

	const [formData, setFormData] = useState<CreatePhysicalBookReq>({
		book_id: '',
		barcode: '',
		status: '',
		purchase_date: '',
		purchase_price: 0,
		location_id: '',
		current_condition: '',
		condition_details: '',
		notes: '',
		last_checkup_date: '',
		is_archived: false
	})

	const handleInputChange = (field: keyof CreatePhysicalBookReq, value: string | number | boolean) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}))
	}

	// Mapping field names để hiển thị message rõ ràng
	const fieldLabels: Record<string, string> = {
		barcode: 'Barcode',
		status: 'Trạng thái',
		purchase_date: 'Ngày mua',
		location_id: 'Vị trí',
		current_condition: 'Tình trạng'
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validate required fields
		const requiredFields = omit(formData, [
			'book_id',
			'notes',
			'condition_details',
			'purchase_price',
			'is_archived'
		])

		for (const key in requiredFields) {
			const value = formData[key as keyof typeof formData]
			if (value === '' || value === null || value === undefined) {
				toast.error(`${fieldLabels[key] || key} không được bỏ trống`)
				return
			}
		}

		// Kiểm tra bookId
		if (!bookId) {
			toast.error('Không tìm thấy ID sách')
			return
		}

		// Gọi API tạo physical copy
		createPhysicalCopy(
			{ ...formData, book_id: bookId },
			{
				onSuccess: () => {
					toast.success('Đã tạo bản sao vật lý thành công!')
					// Reset form
					setFormData({
						book_id: '',
						barcode: '',
						status: '',
						purchase_date: '',
						purchase_price: 0,
						location_id: '',
						current_condition: '',
						condition_details: '',
						notes: '',
						last_checkup_date: '',
						is_archived: false
					})
					// Đóng dialog
					onClose?.()
				},
				onError: (error: any) => {
					toast.error(error?.response?.data?.message || 'Có lỗi xảy ra khi tạo bản sao vật lý')
				}
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-4xl max-h-[95vh] overflow-hidden flex flex-col rounded-2xl shadow-2xl border-0'>
				{/* Header with gradient */}
				<div className='relative space-y-3 pb-6 border-b border-gray-100'>
					<h2 className='text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent pt-2'>
						Tạo Bản sao Vật lý mới
					</h2>
					<p className='text-sm text-gray-600 flex items-center gap-2'>
						<span>Thêm bản sao vật lý cho sách</span>
						<span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200'>
							{bookTitle}
						</span>
					</p>
				</div>

				{/* Form - Scrollable Area with custom scrollbar */}
				<div className='flex-1 overflow-y-auto py-6 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
					<form onSubmit={handleSubmit} className='space-y-8'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{/* Barcode */}
							<div className='flex flex-col space-y-2.5 group'>
								<Label
									htmlFor='barcode'
									className='text-sm font-semibold text-gray-700 flex items-center gap-1'
								>
									Barcode <span className='text-red-500'>*</span>
								</Label>
								<Input
									id='barcode'
									type='text'
									placeholder='Nhập barcode'
									value={formData.barcode}
									onChange={(e) => handleInputChange('barcode', e.target.value)}
									className='h-12 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm hover:shadow-md'
									disabled={isPending}
								/>
							</div>

							{/* Giá bìa */}
							<div className='flex flex-col space-y-2.5 group'>
								<Label
									htmlFor='purchase_price'
									className='text-sm font-semibold text-gray-700 flex items-center gap-1'
								>
									Giá bìa <span className='text-red-500'>*</span>
								</Label>
								<Input
									id='purchase_price'
									type='number'
									placeholder='Nhập giá bìa'
									value={formData.purchase_price || ''}
									onChange={(e) => handleInputChange('purchase_price', Number(e.target.value))}
									className='h-12 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm hover:shadow-md'
									disabled={isPending}
								/>
							</div>

							{/* Ngày mua */}
							<div className='flex flex-col space-y-2.5 group'>
								<Label
									htmlFor='purchase_date'
									className='text-sm font-semibold text-gray-700 flex items-center gap-1'
								>
									Ngày mua <span className='text-red-500'>*</span>
								</Label>
								<Input
									id='purchase_date'
									type='date'
									value={formData.purchase_date}
									onChange={(e) => handleInputChange('purchase_date', e.target.value)}
									className='h-12 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm hover:shadow-md'
									disabled={isPending}
								/>
							</div>
							{/* Ngày kiểm tra cuối */}
							<div className='flex flex-col space-y-2.5 group'>
								<Label htmlFor='last_checkup_date' className='text-sm font-semibold text-gray-700'>
									Ngày kiểm tra cuối<span className='text-red-500'>*</span>
								</Label>
								<Input
									id='last_checkup_date'
									type='date'
									value={formData.last_checkup_date}
									onChange={(e) => handleInputChange('last_checkup_date', e.target.value)}
									className='h-12 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm hover:shadow-md'
									disabled={isPending}
								/>
							</div>

							{/* Vị trí */}
							<div className='flex flex-col space-y-2.5 group'>
								<Label
									htmlFor='location'
									className='text-sm font-semibold text-gray-700 flex items-center gap-1'
								>
									Vị trí <span className='text-red-500'>*</span>
								</Label>
								<Combobox
									options={locations || []}
									placeholder='Chọn vị trí'
									value={formData.location_id}
									onValueChange={(value) => handleInputChange('location_id', value)}
									className='h-12 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm hover:shadow-md'
									disabled={isPending}
								/>
							</div>

							{/* Tình trạng */}
							<div className='flex flex-col space-y-2.5 group'>
								<Label
									htmlFor='current_condition'
									className='text-sm font-semibold text-gray-700 flex items-center gap-1'
								>
									Tình trạng <span className='text-red-500'>*</span>
								</Label>
								<Select
									value={formData.current_condition}
									onValueChange={(value) => handleInputChange('current_condition', value)}
									disabled={isPending}
								>
									<SelectTrigger
										id='current_condition'
										className='h-12 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm hover:shadow-md'
									>
										<SelectValue placeholder='Chọn tình trạng' />
									</SelectTrigger>
									<SelectContent className='rounded-xl shadow-xl border-gray-100'>
										<SelectItem
											value='new'
											className='cursor-pointer hover:bg-green-50 rounded-lg my-1'
										>
											Mới
										</SelectItem>
										<SelectItem
											value='good'
											className='cursor-pointer hover:bg-green-50 rounded-lg my-1'
										>
											Tốt
										</SelectItem>
										<SelectItem
											value='worn'
											className='cursor-pointer hover:bg-green-50 rounded-lg my-1'
										>
											Cũ
										</SelectItem>
										<SelectItem
											value='damaged'
											className='cursor-pointer hover:bg-green-50 rounded-lg my-1'
										>
											Bị hỏng
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Trạng thái */}
							<div className='flex flex-col space-y-2.5 group'>
								<Label
									htmlFor='status'
									className='text-sm font-semibold text-gray-700 flex items-center gap-1'
								>
									Trạng thái <span className='text-red-500'>*</span>
								</Label>
								<Select
									value={formData.status}
									onValueChange={(value) => handleInputChange('status', value)}
									disabled={isPending}
								>
									<SelectTrigger
										id='status'
										className='h-12 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm hover:shadow-md'
									>
										<SelectValue placeholder='Chọn trạng thái' />
									</SelectTrigger>
									<SelectContent className='rounded-xl shadow-xl border-gray-100'>
										<SelectItem
											value='available'
											className='cursor-pointer hover:bg-green-50 rounded-lg my-1'
										>
											Sẵn sàng
										</SelectItem>
										<SelectItem
											value='borrowed'
											className='cursor-pointer hover:bg-green-50 rounded-lg my-1'
										>
											Đang mượn
										</SelectItem>
										<SelectItem
											value='reserved'
											className='cursor-pointer hover:bg-green-50 rounded-lg my-1'
										>
											Đã đặt trước
										</SelectItem>
										<SelectItem
											value='lost'
											className='cursor-pointer hover:bg-green-50 rounded-lg my-1'
										>
											Mất
										</SelectItem>
										<SelectItem
											value='maintenance'
											className='cursor-pointer hover:bg-green-50 rounded-lg my-1'
										>
											Bảo trì
										</SelectItem>
										<SelectItem
											value='damaged'
											className='cursor-pointer hover:bg-green-50 rounded-lg my-1'
										>
											Bị hỏng
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Ghi chú */}
							<div className='col-span-full flex flex-col space-y-2.5'>
								<Label htmlFor='notes' className='text-sm font-semibold text-gray-700'>
									Ghi chú
								</Label>
								<Textarea
									id='notes'
									placeholder='Nhập ghi chú (tùy chọn)'
									value={formData.notes || ''}
									onChange={(e) => handleInputChange('notes', e.target.value as string)}
									rows={4}
									className='resize-none border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all shadow-sm hover:shadow-md'
									disabled={isPending}
								/>
							</div>
						</div>

						{/* Footer Buttons */}
						<div className='flex justify-end gap-3 pt-6 border-t border-gray-100'>
							<Button
								type='button'
								variant='outline'
								onClick={onClose}
								className='min-w-28 h-12 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all rounded-lg font-medium'
								disabled={isPending}
							>
								Hủy
							</Button>
							<Button
								type='submit'
								className='min-w-28 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all rounded-lg'
								disabled={isPending}
							>
								{isPending ? 'Đang tạo...' : 'Tạo bản sao'}
							</Button>
						</div>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default CreatePhysicalCopyForm
