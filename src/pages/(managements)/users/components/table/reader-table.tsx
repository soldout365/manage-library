import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'
import type { ReaderType } from '@/types/reader.type'
import { formatDate } from '@/utils/format-date'
import { getReaderTypeDisplayName } from '../../../../../utils/getReaderTypeDisplayName'
import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'lucide-react'
import { useDeleteReaderByReaderId } from '@/hooks/readers/use-delete-reader-by-readerid'
import { useQueryClient } from '@tanstack/react-query'
import { readerApi } from '@/apis/reader.api'
import { toast } from 'sonner'
import { useState } from 'react'
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
import { Sheet } from '@/components/ui/sheet'
import CreateForm from '../create-form'
interface ReaderTableProps {
	readers: ReaderType[]
	// renderActions: (reader: ReaderType) => React.ReactNode
}
const ReaderTable = ({ readers }: ReaderTableProps) => {
	const queryClient = useQueryClient()

	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedReader, setSelectedReader] = useState<ReaderType | null>(null)

	const { mutate: deleteReader, isPending: isDeleting } = useDeleteReaderByReaderId()

	const handleDeleteClick = (reader: ReaderType) => {
		setSelectedReader(reader)
		setIsDeleteDialogOpen(true)
	}

	const handleDelete = () => {
		if (!selectedReader) return

		deleteReader(selectedReader.id, {
			onSuccess: () => {
				toast.success('Xóa độc giả thành công')
				queryClient.invalidateQueries({ queryKey: [readerApi.getReaders.name] })
				setIsDeleteDialogOpen(false)
				setSelectedReader(null)
			},
			onError: () => {
				toast.error('Có lỗi xảy ra khi xóa độc giả')
			}
		})
	}

	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Mã người dùng</TableHead>
						<TableHead>Tên người dùng</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Quyền người dùng</TableHead>
						<TableHead>Loại độc giả</TableHead>
						<TableHead>Trạng thái</TableHead>
						<TableHead>Ngày cấp thẻ</TableHead>
						<TableHead>Ngày hết hạn</TableHead>
						<TableHead className='text-right'>Hành động</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{readers && readers.length > 0 ? (
						readers.map((reader) => {
							return (
								<TableRow key={reader.id}>
									<TableCell className='font-medium'>{reader.cardNumber}</TableCell>
									<TableCell>{reader.user.username}</TableCell>
									<TableCell>{reader.user.email}</TableCell>
									<TableCell>
										<Badge className='bg-green-500 hover:bg-green-600'>Độc giả</Badge>
									</TableCell>
									<TableCell>{getReaderTypeDisplayName(reader.readerType.typeName)}</TableCell>
									<TableCell>
										<Badge
											className={
												reader.isActive
													? 'bg-green-500 hover:bg-green-600'
													: 'bg-red-500 hover:bg-red-600'
											}
										>
											{reader.isActive ? 'Hoạt động' : 'Bị khóa'}
										</Badge>
									</TableCell>
									<TableCell>{formatDate(reader.cardIssueDate || '')}</TableCell>
									<TableCell>{formatDate(reader.cardExpiryDate || '')}</TableCell>
									<TableCell className='text-right'>
										<div className='flex justify-end space-x-1'>
											<Button
												variant='ghost'
												size='sm'
												className='h-8 w-8 p-0 text-primary hover:text-primary'
												onClick={() => {
													setSelectedReader(reader)
													setIsEditDialogOpen(true)
												}}
											>
												<Edit className='h-4 w-4' />
												<span className='sr-only'>Chỉnh sửa người dùng</span>
											</Button>
											<Button
												variant='ghost'
												size='sm'
												className='h-8 w-8 p-0 text-destructive hover:text-destructive'
												onClick={() => handleDeleteClick(reader)}
											>
												<Trash className='h-4 w-4' />
												<span className='sr-only'>Xóa người dùng</span>
											</Button>
										</div>
									</TableCell>
								</TableRow>
							)
						})
					) : (
						<TableRow>
							<TableCell className='text-center py-8' colSpan={9}>
								Không có người dùng nào
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{/* /* Delete Confirmation Dialog */}
			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Xác nhận xóa độc giả</AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc chắn muốn xóa độc giả "{selectedReader?.cardNumber}"? Hành động này không thể
							hoàn tac.
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
			</AlertDialog>{' '}
			{/** edit form */}
			<Sheet open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<CreateForm
					mode='edit'
					readerId={selectedReader?.id || ''}
					defaultValues={{
						userCode: selectedReader?.cardNumber || '',
						username: selectedReader?.fullName || '',
						email: selectedReader?.user.email || '',
						password: '',
						role: 'reader',
						accountStatus: selectedReader?.isActive ? 'active' : 'banned',
						cardIssueDate: selectedReader?.cardIssueDate?.split('T')[0] || '',
						cardExpiryDate: selectedReader?.cardExpiryDate?.split('T')[0] || '',
						readerTypeId: selectedReader?.readerType.id || ''
					}}
					onClose={() => setIsEditDialogOpen(false)}
				/>
			</Sheet>
		</div>
	)
}

export default ReaderTable
