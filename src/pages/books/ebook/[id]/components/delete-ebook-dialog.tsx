import { ebookApi } from '@/apis/ebook.api'
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
import type { EBookType } from '@/types/ebook.type'
import { useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface DeleteEbookDialogProps {
	open: boolean
	ebook: EBookType | null
	onClose: () => void
}

const DeleteEbookDialog = ({ open, ebook, onClose }: DeleteEbookDialogProps) => {
	const queryClient = useQueryClient()

	const handleDeleteEbook = async () => {
		try {
			if (!ebook) return

			await ebookApi.deleteEbook(ebook.id)
			toast.success('Xóa ebook thành công.')
			onClose()
			await queryClient.invalidateQueries({
				queryKey: [ebookApi.getEbookByBookId.name]
			})
		} catch (error) {
			console.log(error)
			toast.error('Xóa ebook thất bại. Vui lòng thử lại.')
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
				{ebook && (
					<div className='bg-gray-50 p-4 rounded-lg'>
						<div className='text-sm space-y-2'>
							<div>
								<span className='text-gray-600'>Định dạng: </span>
								<span className='font-medium'>{ebook.file_format}</span>
							</div>
							<div>
								<span className='text-gray-600'>Kích thước: </span>
								<span className='font-medium'>{Number(ebook.file_size)}</span>
							</div>
						</div>
					</div>
				)}
				<DialogFooter className='mt-4'>
					<DialogClose asChild>
						<Button variant='outline'>Hủy</Button>
					</DialogClose>
					<Button variant='destructive' className='gap-1' onClick={handleDeleteEbook}>
						<Trash2 size={16} />
						Xóa ebook
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default DeleteEbookDialog
