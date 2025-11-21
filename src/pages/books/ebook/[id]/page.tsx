import UsersLoadingSkeleton from '@/components/LoadingSkeleton'
import { useGetBookById } from '@/hooks/books/useGetBooks'
import { useEbookByBookId } from '@/hooks/ebooks/use-ebooks'
import { useQueryParams } from '@/hooks/useQueryParam'
import type { EbookQueryParamsType } from '@/types/ebook.type'
import { useParams } from 'react-router-dom'
import BookHeader from '../../components/book-header'
import BookCardInfo from '../../components/book-card-info'
import EbookListCard from './components/ebook-list-card'

const EbookPage = () => {
	const { id: bookId } = useParams()

	const queryParams = useQueryParams() as EbookQueryParamsType

	// get ebook by book id
	const { data: ebookData, isLoading: isEbookLoading } = useEbookByBookId(bookId as string, queryParams)

	// book by id
	const { data: bookData } = useGetBookById(bookId as string)

	if (isEbookLoading) {
		return <UsersLoadingSkeleton />
	}

	return (
		<div className='space-y-6'>
			<BookHeader title={bookData?.title || ''} />

			<BookCardInfo bookData={bookData} />

			<EbookListCard ebookData={ebookData} bookTitle={bookData?.title || ''} params={queryParams} />
		</div>
	)
}

export default EbookPage
