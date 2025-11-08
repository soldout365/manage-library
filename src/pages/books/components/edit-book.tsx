import BookForm from './forms/book-form'
import { Sheet } from '@/components/ui/sheet'
import { useBookStore } from '@/stores/book-store'
import { useGetBookById } from '@/hooks/books/useGetBooks'

const EditBook = () => {
	const { setIsEditBook, isEditBook, selectedBook, setSelectedBook } = useBookStore()

	// get book by id
	const { data: bookData } = useGetBookById(selectedBook?.id, isEditBook)

	return (
		<Sheet open={isEditBook} onOpenChange={setIsEditBook}>
			<BookForm
				bookData={bookData}
				onClose={() => {
					setIsEditBook(false)
					setSelectedBook(null)
				}}
			/>
		</Sheet>
	)
}

export default EditBook
