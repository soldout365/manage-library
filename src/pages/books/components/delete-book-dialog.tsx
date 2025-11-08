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

import type { BookType } from '@/types/book.type'

interface DeleteBookDialogProps {
	book: BookType
	open: boolean
	onOpenChange: (open: boolean) => void
	onDelete: () => void
}

const DeleteBookDialog = ({ book, open, onOpenChange, onDelete }: DeleteBookDialogProps) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Xác nhận xóa sách?</AlertDialogTitle>
					<AlertDialogDescription>
						Bạn có chắc chắn muốn xóa sách <strong>{book.title}</strong> này không?
						<br />
						Hành động này không thể hoàn tác và sách sẽ bị xóa vĩnh viễn.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Hủy</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>Xóa</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default DeleteBookDialog
