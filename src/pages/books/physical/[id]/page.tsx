import UsersLoadingSkeleton from '@/components/LoadingSkeleton'
import { usePhysicalCopies } from '@/hooks/physical-copies/use-physical-copies'
import { useQueryParams } from '@/hooks/useQueryParam'
import { useParams } from 'react-router-dom'
import BookHeader from '../../components/book-header'
import BookCardInfo from '../../components/book-card-info'
import PhysicalCopyListCard from './components/physical-copy-list-card'
import { useGetBookById } from '@/hooks/books/useGetBooks'
import type { PhysicalCopyQueryParamsType } from '@/types/physical-copies.type'

const PhysicalPage = () => {
	const { id: bookId } = useParams()
	const params = useQueryParams()

	// get ebook by book id
	const { data: physicalCopyData, isLoading: isPhysicalCopyLoading } = usePhysicalCopies(
		bookId as string,
		params as PhysicalCopyQueryParamsType
	)

	// book by id
	const { data: bookData } = useGetBookById(bookId as string)

	if (isPhysicalCopyLoading) {
		return <UsersLoadingSkeleton />
	}

	return (
		<div className='space-y-6'>
			<BookHeader title={bookData?.title || ''} />

			<BookCardInfo bookData={bookData} />

			<PhysicalCopyListCard
				physicalCopyData={physicalCopyData}
				bookTitle={bookData?.title || ''}
				params={params}
			/>
		</div>
	)
}

export default PhysicalPage
