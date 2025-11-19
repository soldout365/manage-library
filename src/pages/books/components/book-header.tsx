import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import type { EBookType } from '@/types/book.type'

const BookHeader = ({ title, bookType }: { title?: string; bookType?: EBookType }) => {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-col space-x-4 gap-y-5'>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href='/books' className='flex items-center gap-x-2'>
								<span>Quản lý sách</span>
							</BreadcrumbLink>
						</BreadcrumbItem>

						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{title || ''}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div>
					<h1 className='text-3xl font-bold mb-3'>
						{bookType === 'ebook' ? 'Chi tiết Sách Điện tử' : 'Chi tiết Sách Vật Lý'}
					</h1>
					<p className='text-muted-foreground'>
						Quản lý các phiên bản {bookType === 'ebook' ? 'ebook' : 'bản sao vật lý'} của sách
					</p>
				</div>
			</div>
		</div>
	)
}

export default BookHeader
