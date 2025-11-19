import { useGetBookById } from '@/hooks/books/useGetBooks'
import { useParams } from 'react-router-dom'
import PhysicalCopyListCard from './components/physical-copy-list-card'
import { usePhysicalCopies } from '@/hooks/physical-copies/use-physical-copies'
import BookCardInfo from '../../components/book-card-info'
import BookHeader from '../../components/book-header'

const PhysicalPage = () => {
	const { id: bookId } = useParams()

	// get ebook by book id
	const { data: physicalCopyData } = usePhysicalCopies(bookId as string)

	// book by id
	const { data: bookData } = useGetBookById(bookId as string)

	return (
		<div className='space-y-6'>
			<BookHeader title={bookData?.title || ''} bookType={bookData?.book_type} />

			<BookCardInfo bookData={bookData} />

			<PhysicalCopyListCard physicalCopyData={physicalCopyData} bookTitle={bookData?.title || ''} />
		</div>
	)
}

export default PhysicalPage
