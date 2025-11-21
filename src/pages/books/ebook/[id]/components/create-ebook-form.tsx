import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateEbook } from '@/hooks/ebooks/use-create-ebook'
import { useUploadFile } from '@/hooks/uploads/use-upload-file'
import type { EbookCreateType } from '@/types/ebook.type'
import type { UploadResponseType } from '@/types/upload.type'
import { useState, type ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Upload } from 'lucide-react'
import { on } from 'events'

interface CreateEbookFormProps {
	bookTitle: string
	onClose: () => void
	open: boolean
}

const CreateEbookForm = ({ bookTitle, onClose, open }: CreateEbookFormProps) => {
	const mutationUploadFile = useUploadFile()
	const mutationCreateEbook = useCreateEbook()

	const params = useParams<{ id: string }>()
	const bookId = params.id

	const [fileUploaded, setFileUploaded] = useState<UploadResponseType | null>(null)

	const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (!file) {
			toast.error('Vui lòng chọn file')
			return
		}

		if (file) {
			const formData = new FormData()
			formData.append('file', file)
			mutationUploadFile.mutate(formData, {
				onSuccess: (data) => {
					setFileUploaded(data)
				},
				onError: () => {
					toast.error('Upload file thất bại')
					onClose()
				}
			})
		}
	}

	const handleSubmit = () => {
		if (fileUploaded && bookId) {
			const payload: EbookCreateType = {
				book_id: bookId,
				file_path: fileUploaded.filePath,
				file_format: 'PDF',
				file_size: Number(fileUploaded.fileSize)
			}
			mutationCreateEbook.mutate(payload, {
				onSuccess: () => {
					toast.success('Tạo ebook thành công')
					onClose()
				},
				onError: () => {
					toast.error('Tạo ebook thất bại')
				}
			})
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
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
						<Label htmlFor='file-upload' className='text-sm font-medium'>
							Chọn file để upload
						</Label>
						<div className='relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 hover:bg-green-50/50 transition-all duration-200 cursor-pointer group'>
							<Input
								type='file'
								id='file-upload'
								className='hidden'
								accept='.pdf,.epub'
								onChange={(e) => handleUploadFile(e)}
							/>
							<label htmlFor='file-upload' className='cursor-pointer flex flex-col items-center gap-3'>
								<div className='p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors'>
									<Upload className='h-8 w-8 text-green-600' />
								</div>
								{fileUploaded ? (
									<div className='flex flex-col gap-1'>
										<span className='text-sm font-medium text-green-700'>✓ File đã chọn</span>
										<span className='text-sm text-gray-700 font-medium'>
											{fileUploaded.fileName}
										</span>
										<span className='text-xs text-gray-500'>
											{(Number(fileUploaded.fileSize) / 1024 / 1024).toFixed(2)} MB
										</span>
									</div>
								) : (
									<div className='flex flex-col gap-1'>
										<span className='text-sm font-medium text-gray-700'>
											Nhấn để chọn file hoặc kéo thả vào đây
										</span>
										<span className='text-xs text-gray-500'>Hỗ trợ định dạng PDF, EPUB</span>
									</div>
								)}
							</label>
						</div>
					</div>
				</div>

				<DialogFooter className='gap-2'>
					<DialogClose asChild>
						<Button type='button' variant='outline'>
							Hủy
						</Button>
					</DialogClose>
					<Button type='submit' className='bg-green-600 hover:bg-green-700' onClick={handleSubmit}>
						Tạo EBook
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default CreateEbookForm
