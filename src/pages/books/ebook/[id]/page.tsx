import BookHeader from '../../components/book-header'
import EbookListCard from './components/ebook-list-card'
import { useEbookByBookId } from '@/hooks/ebooks/use-ebooks'
import { useGetBookById } from '@/hooks/books/useGetBooks'
import { useParams } from 'react-router-dom'
import BookCardInfo from '../../components/book-card-info'

const EbookPage = () => {
	const { id: bookId } = useParams()

	// get ebook by book id
	const { data: ebookData } = useEbookByBookId(bookId as string)

	// book by id
	const { data: bookData } = useGetBookById(bookId as string)

	return (
		<div className='space-y-6'>
			<BookHeader title={bookData?.title || ''} bookType={bookData?.book_type} />

			<BookCardInfo bookData={bookData} />

			<EbookListCard ebookData={ebookData} bookTitle={bookData?.title || ''} />
		</div>
	)
}

export default EbookPage
