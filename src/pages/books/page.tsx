import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { createSearchParams, useNavigate } from 'react-router-dom'

import BookForm from './components/book-form'
import type { BookQueryParamsType } from '@/types/book.type'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/page-header'
import PagiantionWapper from '@/components/pagination-wrapper'
import { Plus } from 'lucide-react'
import SearchBar from '@/components/search-bar'
import TableBook from './components/table-book'
import { useBooks } from '@/hooks/books/useGetBooks'
import { useQueryParams } from '@/hooks/useQueryParam'
import { useSearch } from '@/hooks/useSearch'
import { useState } from 'react'
import { usePublishers } from '@/hooks/publishers/useGetPublishers'
import { useGetAuthors } from '@/hooks/authors/useGetAuthors'

const BookManagement = () => {
	const navigate = useNavigate()
	const params = useQueryParams()
	const [isCreateSheetOpen, setIsCreateSheetOpen] = useState<boolean>(false)

	// data publishers
	const { data: publisherData } = usePublishers({ page: 1, limit: 11 }, isCreateSheetOpen)
	const publishers = publisherData?.data
	// data authors
	const { data: authorData } = useGetAuthors({ page: 1, limit: 10 })
	const authors = authorData?.data

	const { data: bookData } = useBooks(params as BookQueryParamsType)
	const books = bookData?.data

	// handle change page
	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: '/books',
			search: createSearchParams({
				...params,
				limit: '5',
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

	return (
		<>
			<PageHeader
				title='Quản lý sách'
				renderActions={
					<Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
						<SheetTrigger asChild>
							<Button>
								<Plus className='mr-2 h-4 w-4' />
								Thêm sách
							</Button>
						</SheetTrigger>

						<BookForm publishers={publishers} authors={authors} />
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
