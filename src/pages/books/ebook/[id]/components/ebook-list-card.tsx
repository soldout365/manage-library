import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, Edit, FileText, Plus, Trash2 } from 'lucide-react'

import { ebookApi } from '@/apis/ebook.api'
import { uploadApi } from '@/apis/upload.api'
import { Button } from '@/components/ui/button'
import type { PaginationType } from '@/types/common.type'
import type { EBookType } from '@/types/ebook.type'
import { DialogClose } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { toast } from 'sonner'
import CreateEbookForm from './create-ebook-form'
import DeleteEbookDialog from './delete-ebook-dialog'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import PaginationWrapper from '@/components/pagination-wrapper'

interface EbookListCardProps {
	ebookData?: PaginationType<EBookType>
	bookTitle: string
	params?: any
}

const EbookListCard = ({ ebookData, bookTitle, params }: EbookListCardProps) => {
	const { id } = useParams()

	const navigate = useNavigate()
	//state for ebook download dialog
	const [ebookState, setEbookState] = useState<{
		open: boolean
		ebook: EBookType | null
	}>({
		open: false,
		ebook: null
	})

	//state for create ebook form
	const [createEbookOpen, setCreateEbookOpen] = useState(false)

	//state for delete ebook dialog
	const [deleteEbookState, setDeleteEbookState] = useState<{
		open: boolean
		ebook: EBookType | null
	}>({
		open: false,
		ebook: null
	})

	if (!ebookData) return null

	const hasEBook = ebookData?.meta?.totalItems > 0
	const ebooks = ebookData?.data || []

	// format file size
	const formatFileSize = (size: number) => {
		if (size === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
		const i = Math.floor(Math.log(size) / Math.log(k))
		const parsedSize = parseFloat((size / Math.pow(k, i)).toFixed(2))
		return `${parsedSize} ${sizes[i]}`
	}

	const handleDownload = async () => {
		try {
			if (!ebookState.ebook) return

			const ebook = ebookState.ebook

			const slug = ebook.file_path.replace('files/', '').split('.').slice(0, -1).join('')

			const uploadInfo = await uploadApi.getBySlug(slug)

			if (uploadInfo) {
				const blob = await uploadApi.downloadById(uploadInfo.id)

				const url = window.URL.createObjectURL(blob)

				const link = document.createElement('a')

				link.href = url
				link.download = uploadInfo.originalName || 'ebook-download'
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
				window.URL.revokeObjectURL(url)

				//increase download count
				await ebookApi.increaseDownloadCount(ebook.id)

				toast.success('Đã tải xuống ebook...')

				setEbookState({ open: false, ebook: null })
			}
		} catch (error) {
			console.log(error)
			toast.error('Tải xuống ebook thất bại. Vui lòng thử lại.')
		}
	}

	//handle change page
	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: `/books/ebook/${id}`,
			search: createSearchParams({
				...params,
				page: newPage.toString()
			}).toString()
		})
	}

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center justify-between w-full'>
					<CardTitle className='flex items-center gap-2'>
						<Download size={20} />
						<span>Danh sách Ebook {ebookData?.meta.totalItems} bản</span>
					</CardTitle>

					{hasEBook && (
						<Button onClick={() => setCreateEbookOpen(true)}>
							<Plus className='size-4' />
							Tạo ebook mới
						</Button>
					)}
				</div>
			</CardHeader>

			<CardContent>
				{!hasEBook && (
					<div className='flex items-center gap-y-4 flex-col py-8'>
						<FileText className='size-12 text-muted-foreground' />
						<h3 className='text-lg font-semibold'>Chưa có ebook nào</h3>
						<p className='text-muted-foreground'>
							Sách này chưa có phiên bản ebook. Hãy tạo ebook đầu tiên.
						</p>

						<Button onClick={() => setCreateEbookOpen(true)}>
							<Plus className='size-4' />
							Tạo ebook mới
						</Button>
					</div>
				)}

				{hasEBook && (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Định dạng</TableHead>
								<TableHead>Kích thước</TableHead>
								<TableHead>Lượt tải</TableHead>
								<TableHead>Ngày tạo</TableHead>
								<TableHead className='w-[140px] text-center'>Hành động</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ebooks.map((ebook) => (
								<TableRow key={ebook.id}>
									<TableCell className='font-medium'>{ebook.file_format}</TableCell>
									<TableCell>{formatFileSize(Number(ebook.file_size))}</TableCell>
									<TableCell>
										<div className='flex gap-1 items-center'>
											<Download size={12} />
											{ebook.download_count}
										</div>
									</TableCell>
									<TableCell>{new Date(ebook.created_at).toLocaleDateString('vi-VN')}</TableCell>
									<TableCell>
										<div className='flex items-center gap-2'>
											<Button variant={'ghost'} size={'sm'}>
												<Edit />
											</Button>
											<Button
												variant={'ghost'}
												size={'sm'}
												onClick={() => setEbookState({ open: true, ebook })}
												disabled={ebookState.open}
											>
												<Download />
											</Button>
											<Button
												variant={'ghost'}
												size={'sm'}
												className='text-destructive hover:text-destructive hover:bg-red-50'
												onClick={() => setDeleteEbookState({ open: true, ebook })}
											>
												<Trash2 />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>

			<Dialog open={ebookState.open} onOpenChange={(open) => setEbookState({ open, ebook: null })}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Xác nhận tải xuống</DialogTitle>
						<DialogDescription>Bạn có chắc chắn muốn tải xuống ebook này không?</DialogDescription>
					</DialogHeader>
					{ebookState.ebook && (
						<div>
							<h4 className='text-lg font-semibold'>{bookTitle}</h4>
							<div className='grid grid-cols-2 text-sm mt-4 gap-2'>
								<div>
									<span className='text-gray-600'>Định dạng:</span>
									<span className='text-gray-600 font-medium'>{ebookState.ebook.file_format}</span>
								</div>
								<div>
									<span className='text-gray-600'>Kích thước:</span>
									<span className='text-gray-600 font-medium'>
										{formatFileSize(Number(ebookState.ebook.file_size))}
									</span>
								</div>
								<div>
									<span className='text-gray-600'>Lượt tải:</span>
									<span className='text-gray-600 font-medium'>{ebookState.ebook.download_count}</span>
								</div>
								<div>
									<span className='text-gray-600'>Ngày tạo:</span>
									<span className='text-gray-600 font-medium'>
										{new Date(ebookState.ebook.created_at).toLocaleDateString('vi-VN')}
									</span>
								</div>
							</div>
						</div>
					)}
					<DialogFooter className='mt-4'>
						<DialogClose asChild>
							<Button variant='outline'>Hủy</Button>
						</DialogClose>
						<Button type='submit' className='gap-1' onClick={handleDownload}>
							<Download size={16} />
							Tải xuống
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<CreateEbookForm open={createEbookOpen} onClose={() => setCreateEbookOpen(false)} bookTitle={bookTitle} />
			<DeleteEbookDialog
				open={deleteEbookState.open}
				ebook={deleteEbookState.ebook}
				onClose={() => setDeleteEbookState({ open: false, ebook: null })}
			/>
			{/* pagination */}
			<PaginationWrapper
				currentData={ebooks?.length || 0}
				onChangePage={handleChangePage}
				currentMeta={ebookData?.meta}
			/>
		</Card>
	)
}

export default EbookListCard
