import { Pencil, Trash } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'
import BookCover from '@/components/book-cover'
import { EBookType, type BookType } from '@/types/book.type'
import { Button } from '@/components/ui/button'
import DeleteBookDialog from './delete-book-dialog'
import EditBook from './edit-book'
import { useBookStore } from '@/stores/book-store'
import { useDeleteBook } from '@/hooks/books/useGetBooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface TableBookProps {
	books: BookType[]
	renderActions: (book: BookType) => React.ReactNode
}

const TableBook = ({ books, renderActions }: TableBookProps) => {
	const navigate = useNavigate()
	const [bookDelete, setBookDelete] = useState<{
		book: BookType
		isOpen: boolean
	} | null>(null)

	const { setIsEditBook, isEditBook, setSelectedBook } = useBookStore()

	// hook xóa sách
	const { mutate: deleteBook } = useDeleteBook()

	// hàm mở dialog xóa sách
	const handleOpenDeleteDialog = (book: BookType) => {
		setBookDelete({ book, isOpen: true })
	}

	// hàm xóa sách
	const handleDeleteBook = async (book: BookType) => {
		deleteBook(book.id, {
			onSuccess: () => {
				setBookDelete(null)
			}
		})
	}

	const handleViewBook = (book: BookType) => {
		if (book.book_type === EBookType.EBOOK) {
			navigate(`/books/ebook/${book.id}`)
		} else {
			navigate(`/books/physical/${book.id}`)
		}
	}

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Ảnh bìa</TableHead>
						<TableHead>Tên sách</TableHead>
						<TableHead>ISBN</TableHead>
						<TableHead>Tác giả</TableHead>
						<TableHead>Loại sách</TableHead>
						<TableHead>Thể loại</TableHead>
						<TableHead>Nhà xuất bản</TableHead>
						<TableHead>Năm xuất bản</TableHead>
						<TableHead className='text-right'>Hành động</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{books.length === 0 ? (
						<TableRow>
							<TableCell colSpan={9} className='text-center py-8'>
								Không có sách nào
							</TableCell>
						</TableRow>
					) : (
						books.map((book) => (
							<TableRow key={book.id}>
								<TableCell>
									<BookCover
										src={book.cover_image as string | undefined}
										alt={book.title}
										size='md'
									/>
								</TableCell>
								<TableCell className='font-medium'>
									<div className='flex flex-col'>
										<button
											className='text-left font-semibold hover:text-blue-600 hover:underline transition-colors cursor-pointer'
											onClick={() => handleViewBook(book)}
										>
											{book.title}
										</button>
										{book.description && (
											<span className='text-sm text-muted-foreground line-clamp-1 truncate w-[150px]'>
												{book.description}
											</span>
										)}
									</div>
								</TableCell>
								<TableCell className='font-mono text-sm'>{book.isbn}</TableCell>
								<TableCell>
									{book.authors && book.authors.length > 0 ? (
										<div className='space-y-1'>
											{book.authors.map((author) => (
												<div key={author.id} className='text-sm'>
													{author.author_name}
												</div>
											))}
										</div>
									) : (
										<span className='text-muted-foreground text-sm'>-</span>
									)}
								</TableCell>
								<TableCell>
									<div className='space-y-1'>
										<Badge variant={book.book_type === 'physical' ? 'default' : 'secondary'}>
											{book.book_type === 'physical' ? 'Sách in' : 'Sách điện tử'}{' '}
											{book.book_type === 'physical'
												? book.physical_type === 'borrowable'
													? ' (Có thể mượn)'
													: ' (Không thể mượn)'
												: ''}
										</Badge>
									</div>
								</TableCell>
								<TableCell>{book.mainCategory?.name || '-'}</TableCell>
								<TableCell>{book.publisher?.publisherName || '-'}</TableCell>
								<TableCell>{book.publish_year}</TableCell>
								<TableCell className='text-right'>
									<div className='flex justify-end space-x-1'>
										<Button
											variant='ghost'
											size='sm'
											className='h-8 w-8 p-0 text-primary hover:text-primary'
											onClick={() => {
												setSelectedBook(book)
												setIsEditBook(true)
											}}
										>
											<Pencil className='h-4 w-4' />
										</Button>

										<Button
											variant='ghost'
											size='sm'
											onClick={() => handleOpenDeleteDialog(book)}
											className='h-8 w-8 p-0 text-destructive hover:text-destructive'
										>
											<Trash className='h-4 w-4' />
											<span className='sr-only'>Xóa sách</span>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			{/* dialog xóa sách */}
			{bookDelete && (
				<DeleteBookDialog
					book={bookDelete.book}
					open={bookDelete.isOpen}
					onOpenChange={() => setBookDelete(null)}
					onDelete={() => handleDeleteBook(bookDelete.book)}
				/>
			)}

			{/* edit */}
			{isEditBook && <EditBook />}
		</>
	)
}

export default TableBook
