import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Download, Edit, FileText, Plus, Trash2, Upload } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import type { EBookType } from '@/types/ebook.type'
import type { PaginationType } from '@/types/common.type'
import { useState } from 'react'
import { uploadApi } from '@/apis/upload.api'
import { ebookApi } from '@/apis/ebook.api'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'

interface EbookListCardProps {
	ebookData?: PaginationType<EBookType>
	bookTitle: string
}

const EbookListCard = ({ ebookData, bookTitle }: EbookListCardProps) => {
	const queryClient = useQueryClient()
	const [ebookState, setEbookState] = useState<{
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

				queryClient.invalidateQueries({
					queryKey: [ebookApi.getEbookByBookId.name, ebook.book_id]
				})

				toast.success('Đã tải xuống ebook...')

				setEbookState({ open: false, ebook: null })
			}
		} catch (error) {
			console.log(error)
			toast.error('Tải xuống ebook thất bại. Vui lòng thử lại.')
		}
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
						<Dialog>
							<DialogTrigger asChild>
								<Button>
									<Plus className='size-4' />
									Tạo ebook mới
								</Button>
							</DialogTrigger>

							<DialogContent className='sm:max-w-[500px]'>
								<DialogHeader>
									<DialogTitle>Tạo ebook mới</DialogTitle>
									<DialogDescription>
										<p> Thêm phiên bản ebook cho sách {bookTitle}</p>
									</DialogDescription>
								</DialogHeader>

								<div className='space-y-4 py-4'>
									{/* File Upload Section */}
									<div className='space-y-2'>
										<Label htmlFor='file-upload'>Chọn file để upload</Label>
										<div className='border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent transition-colors cursor-pointer'>
											<Input
												type='file'
												id='file-upload'
												className='hidden'
												accept='.pdf,.epub'
											/>
											<label
												htmlFor='file-upload'
												className='cursor-pointer flex flex-col items-center gap-2'
											>
												<Upload className='h-12 w-12 text-muted-foreground' />
												<span className='text-sm text-muted-foreground'>
													Choose File{' '}
													<span className='text-muted-foreground/60'>No file chosen</span>
												</span>
											</label>
										</div>
									</div>

									{/* Format Selection */}
									<div className='space-y-2'>
										<Label htmlFor='format'>Định dạng</Label>
										<Select defaultValue='pdf'>
											<SelectTrigger id='format'>
												<SelectValue placeholder='Chọn định dạng' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='pdf'>pdf</SelectItem>
												<SelectItem value='epub'>epub</SelectItem>
												<SelectItem value='docs'>docs</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<DialogFooter className='gap-2'>
									<DialogClose asChild>
										<Button type='button' variant='outline'>
											Hủy
										</Button>
									</DialogClose>
									<Button type='submit' className='bg-green-600 hover:bg-green-700'>
										Tạo EBook
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
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

						<Dialog>
							<DialogTrigger asChild>
								<Button>
									<Plus className='size-4' />
									Tạo ebook mới
								</Button>
							</DialogTrigger>

							<DialogContent className='sm:max-w-[500px]'>
								<DialogHeader>
									<DialogTitle>Tạo ebook mới</DialogTitle>
									<DialogDescription>
										<p> Thêm phiên bản ebook cho sách {bookTitle}</p>
									</DialogDescription>
								</DialogHeader>

								<div className='space-y-4 py-4'>
									{/* File Upload Section */}
									<div className='space-y-2'>
										<Label htmlFor='file-upload'>Chọn file để upload</Label>
										<div className='border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent transition-colors cursor-pointer'>
											<Input
												type='file'
												id='file-upload'
												className='hidden'
												accept='.pdf,.epub'
											/>
											<label
												htmlFor='file-upload'
												className='cursor-pointer flex flex-col items-center gap-2'
											>
												<Upload className='h-12 w-12 text-muted-foreground' />
												<span className='text-sm text-muted-foreground'>
													Choose File{' '}
													<span className='text-muted-foreground/60'>No file chosen</span>
												</span>
											</label>
										</div>
									</div>

									{/* Format Selection */}
									<div className='space-y-2'>
										<Label htmlFor='format'>Định dạng</Label>
										<Select defaultValue='pdf'>
											<SelectTrigger id='format'>
												<SelectValue placeholder='Chọn định dạng' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='pdf'>pdf</SelectItem>
												<SelectItem value='epub'>epub</SelectItem>
												<SelectItem value='docs'>docs</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>

								<DialogFooter className='gap-2'>
									<DialogClose asChild>
										<Button type='button' variant='outline'>
											Hủy
										</Button>
									</DialogClose>
									<Button type='submit' className='bg-green-600 hover:bg-green-700'>
										Tạo EBook
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
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
		</Card>
	)
}

export default EbookListCard
