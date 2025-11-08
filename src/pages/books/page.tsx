import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { createSearchParams, useNavigate } from 'react-router-dom'

import BookForm from './components/forms/book-form'
import type { BookQueryParamsType } from '@/types/book.type'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/page-header'
import PagiantionWapper from '@/components/pagination-wrapper'
import { Plus } from 'lucide-react'
import SearchBar from '@/components/search-bar'
import TableBook from './components/table-book'
import { useGetAuthors } from '@/hooks/authors/useGetAuthors'
import { useBookCategories } from '@/hooks/book-categories/useGetBookCategories'
import { useBookStore } from '@/stores/book-store'
import { useBooks } from '@/hooks/books/useGetBooks'
import { useEffect } from 'react'
import { usePublishers } from '@/hooks/publishers/useGetPublishers'
import { useQueryParams } from '@/hooks/useQueryParam'
import { useSearch } from '@/hooks/useSearch'

const BookManagement = () => {
	const navigate = useNavigate()
	const params = useQueryParams()

	const { setPublishers, setAuthors, setBookCategories, isCreateBook, setIsCreateBook, isEditBook } = useBookStore()

	const { data: bookData } = useBooks(params as BookQueryParamsType)
	const books = bookData?.data

	// handle change page
	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: '/books',
			search: createSearchParams({
				...params,
				page: newPage.toString()
			}).toString()
		})
	}

	// search
	const { searchValue, handleKeyPress, handleSearchChange, handleSubmit } = useSearch({
		onKeyPress: (e) => {
			if (e.key === 'Enter') {
				navigate({
					pathname: '/books',
					search: createSearchParams({
						...params,
						page: '1',
						q: searchValue
					}).toString()
				})
			}
		},
		onSubmit: (searchValue) => {
			navigate({
				pathname: '/books',
				search: createSearchParams({
					...params,
					page: '1',
					q: searchValue
				}).toString()
			})
		}
	})

	// data publishers
	const { data: publisherData, isSuccess: isSuccessPublisher } = usePublishers(
		{ page: 1, limit: 1000 },
		isCreateBook || isEditBook
	)
	// data authors
	const { data: authorData, isSuccess: isSuccessAuthor } = useGetAuthors(
		{ page: 1, limit: 1000 },
		isCreateBook || isEditBook
	)

	// data book categories
	const { data: bookCategoryData, isSuccess: isSuccessBookCategory } = useBookCategories(
		{ page: 1, limit: 1000 },
		isCreateBook || isEditBook
	)

	useEffect(() => {
		if (isSuccessPublisher && publisherData) {
			setPublishers(publisherData.data || [])
		}
		if (isSuccessAuthor && authorData) {
			setAuthors(authorData.data || [])
		}
		if (isSuccessBookCategory && bookCategoryData) {
			setBookCategories(bookCategoryData.data || [])
		}
	}, [
		isSuccessPublisher,
		isSuccessAuthor,
		isSuccessBookCategory,
		publisherData,
		authorData,
		bookCategoryData,
		setPublishers,
		setAuthors,
		setBookCategories
	])

	return (
		<>
			<PageHeader
				title='Quản lý sách'
				renderActions={
					<Sheet open={isCreateBook} onOpenChange={setIsCreateBook}>
						<SheetTrigger asChild>
							<Button>
								<Plus className='mr-2 h-4 w-4' />
								Thêm sách
							</Button>
						</SheetTrigger>

						<BookForm onClose={() => setIsCreateBook(false)} />
					</Sheet>
				}
			/>

			{/* search bar */}
			<SearchBar
				searchValue={searchValue}
				onSearchChange={handleSearchChange}
				onKeyPress={handleKeyPress}
				onSubmit={handleSubmit}
			/>

			<TableBook books={books || []} renderActions={() => <></>} />

			{/* pagination */}
			<PagiantionWapper
				currentData={books?.length || 0}
				onChangePage={handleChangePage}
				currentMeta={bookData?.meta}
			/>
		</>
	)
}

export default BookManagement
