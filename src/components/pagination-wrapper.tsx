import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'

import type { PaginationMetaType } from '@/types/common.type'
import { cn } from '@/lib/utils'

interface PagiantionWapperProps {
	currentMeta?: PaginationMetaType
	currentData?: number
	onChangePage: (page: number) => void
}

const PaginationWrapper = ({ currentMeta, currentData = 0, onChangePage }: PagiantionWapperProps) => {
	const totalPages = currentMeta?.totalPages || 0
	const currentPage = currentMeta?.page || 1

	const getVisiblePages = () => {
		const delta = 2 // số lượng trang hiển thị xung quanh trang hiện tại
		const range = [] // mảng chứa các trang hiển thị  hiện tại
		const rangeWithDots = [] // mảng chứa các trang hiển thị + dấu '...'

		/*
    ex: nếu currentPage = 5, delta = 2, totalPages = 10
    - Math.max(2, 5 - 2) = 3
    - Math.min(10 - 1, 5 + 2) = (9, 7) => 7
    */
		for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
			range.push(i)
		}

		/*
    xử lý trang đầu tiên
    ex: currentPage = 5, delta = 2, totalPages = 10
    - currentPage - delta =  5 - 2 = 3 > 2: nếu trang hiện tại cách xa trang đầu tiên: 1 và dấu ...

    */
		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...')
		} else {
			rangeWithDots.push(1)
		}

		/*
    [1, '...'],
    [3, 4, 5, 6, 7]
    => [1, '...', 3, 4, 5, 6, 7]
    */
		rangeWithDots.push(...range)

		/*
    xử lý trang cuối cùng
    ex: currentPage = 5, delta = 2, totalPages = 10
    - currentPage + delta =  5 + 2 = 7 < 10 - 1: nếu trang hiện tại cách xa trang cuối cùng: 10 và dấu ...
    => [1, '...', 3, 4, 5, 6, 7, '...', 10]
    */
		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages)
		} else {
			rangeWithDots.push(totalPages)
		}

		return rangeWithDots
	}

	const visiblePages = getVisiblePages()

	if (!currentMeta || totalPages <= 1) return null

	return (
		<div className='mt-4 space-y-4 flex items-center justify-between'>
			<div className='text-sm text-muted-foreground text-center ml-2'>
				Hiển thị {currentData || 0} of {currentMeta.totalItems}{' '}
				{currentMeta.totalPages > 1 && (
					<span>
						{' '}
						( Trang {currentMeta.page} trên {currentMeta.totalPages} )
					</span>
				)}
			</div>

			{currentMeta.totalPages > 1 && (
				<div className='w-fit'>
					<Pagination>
						<PaginationContent>
							{/* previous */}
							<PaginationItem>
								<PaginationPrevious
									onClick={() => currentMeta.hasPreviousPage && onChangePage(currentPage - 1)}
									aria-disabled={!currentMeta.hasPreviousPage}
									className={cn('cursor-pointer', {
										'opacity-50 cursor-not-allowed': !currentMeta.hasPreviousPage
									})}
								/>
							</PaginationItem>

							{visiblePages.map((page, index) => {
								return (
									<PaginationItem key={index}>
										{page === '...' ? (
											<PaginationEllipsis />
										) : (
											<PaginationLink
												className={cn('cursor-pointer', {
													'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white':
														currentPage === Number(page)
												})}
												isActive={currentPage === Number(page)}
												onClick={() => onChangePage(Number(page))}
											>
												{page}
											</PaginationLink>
										)}
									</PaginationItem>
								)
							})}

							{/* next */}
							<PaginationItem>
								<PaginationNext
									onClick={() => currentMeta.hasNextPage && onChangePage(currentPage + 1)}
									aria-disabled={!currentMeta.hasNextPage}
									className={cn('cursor-pointer', {
										'opacity-50 cursor-not-allowed': !currentMeta.hasNextPage
									})}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</div>
	)
}

export default PaginationWrapper
