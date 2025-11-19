import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { AuthorBookRefType } from '@/types/author.type'
import type { BookType } from '@/types/book.type'
import { FileText } from 'lucide-react'

interface BookCardInfoProps {
	bookData?: BookType
}

const BookCardInfo = ({ bookData }: BookCardInfoProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='flex items-center space-x-2'>
					<FileText className='h-5 w-5' />
					<span>Thông tin sách</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<h3 className='font-semibold text-lg mb-2'>{bookData?.title}</h3>
						<p className='text-muted-foreground'>ISBN: {bookData?.isbn}</p>
						{bookData?.description && <p className='text-sm mt-2'>{bookData?.description}</p>}
					</div>
					<div className='space-y-2'>
						<div className='flex justify-between'>
							<span className='text-muted-foreground'>Tác giả:</span>
							<span>
								{bookData?.authors?.map((author: AuthorBookRefType) => author.author_name).join(', ') ||
									'Chưa có'}
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-muted-foreground'>Thể loại:</span>
							<span>{bookData?.mainCategory?.name || 'Chưa có'}</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-muted-foreground'>Nhà xuất bản:</span>
							<span>{bookData?.publisher?.publisherName || 'Chưa có'}</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-muted-foreground'>Năm xuất bản:</span>
							<span>{bookData?.publish_year}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default BookCardInfo
