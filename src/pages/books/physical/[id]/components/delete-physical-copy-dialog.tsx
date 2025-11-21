import { physicalCopiesApi } from '@/apis/physical-copies.api'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle
} from '@/components/ui/dialog'
import type { PhysicalBook } from '@/types/physical-copies.type'
import { useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface DeletePhysicalCopyDialogProps {
	open: boolean
	physicalCopy: PhysicalBook | null
	onClose: () => void
}

const DeletePhysicalCopyDialog = ({ open, physicalCopy, onClose }: DeletePhysicalCopyDialogProps) => {
	const queryClient = useQueryClient()

	const handleDeletePhysicalBook = async () => {
		try {
			if (!physicalCopy) return

			await physicalCopiesApi.deletePhysicalCopy(physicalCopy.id)
			toast.success('Xóa bản photo vật lý thành công.')
			onClose()
			await queryClient.invalidateQueries({
				queryKey: [physicalCopiesApi.getPhysicalCopyByBookId.name]
			})
		} catch (error) {
			console.log(error)
			toast.error('Xóa bản photo vật lý thất bại. Vui lòng thử lại.')
		}
	}
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<AlertDialogHeader>
					<DialogTitle>Xác nhận xóa</DialogTitle>
					<DialogDescription>
						Bạn có chắc chắn muốn xóa ebook này không? Hành động này không thể hoàn tác.
					</DialogDescription>
				</AlertDialogHeader>
				{physicalCopy && (
					<div className='bg-gray-50 p-4 rounded-lg'>
						<div className='text-sm space-y-2'>
							<div>
								<span className='text-gray-600'>Định dạng: </span>
								<span className='font-medium'>{physicalCopy.barcode}</span>
							</div>
							<div>
								<span className='text-gray-600'> Price: </span>
								<span className='font-medium'>{Number(physicalCopy.purchase_price)}</span>
							</div>
						</div>
					</div>
				)}
				<DialogFooter className='mt-4'>
					<DialogClose asChild>
						<Button variant='outline'>Hủy</Button>
					</DialogClose>
					<Button variant='destructive' className='gap-1' onClick={handleDeletePhysicalBook}>
						<Trash2 size={16} />
						Xóa ebook
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default DeletePhysicalCopyDialog
