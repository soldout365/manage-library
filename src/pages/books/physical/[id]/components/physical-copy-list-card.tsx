import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Download, Edit, FileText, Plus, Trash2, Upload } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import type { PaginationType } from '@/types/common.type'
import type { PhysicalBook } from '@/types/physical-copies.type'
import { getStatusTypeName } from '@/utils/getStatusTypeName'
import { statusPhysicalcopy } from '@/utils/statusPhysicalCopy'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import DeletePhysicalCopyDialog from './delete-physical-copy-dialog'
import { useState } from 'react'

import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import type { BookType } from '@/types/book.type'
import PaginationWrapper from '@/components/pagination-wrapper'

interface PhysicalCopyListCardProps {
	physicalCopyData: PaginationType<PhysicalBook> | undefined
	bookTitle?: string
	bookData?: BookType | null
	params?: any
}

const PhysicalCopyListCard = ({ physicalCopyData, bookTitle, params }: PhysicalCopyListCardProps) => {
	const navigate = useNavigate()
	const { id } = useParams()

	//state for delete physical book dialog
	const [deletePhysicalCopyState, setDeletePhysicalCopyState] = useState<{
		open: boolean
		physicalCopy: PhysicalBook | null
	}>({
		open: false,
		physicalCopy: null
	})

	//handle change page
	const handleChangePage = (newPage: number) => {
		navigate({
			pathname: `/books/physical/${id}`,
			search: createSearchParams({
				...params,
				page: newPage.toString()
			}).toString()
		})
	}

	if (!physicalCopyData) return null

	const hasPhysicalCopy = physicalCopyData?.meta?.totalItems > 0
	const physicalCopies = physicalCopyData?.data || []

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center justify-between w-full'>
					<CardTitle className='flex items-center gap-2'>
						<Download size={20} />
						<span>Danh sách Bản sao vật lý {physicalCopyData?.meta.totalItems} bản</span>
					</CardTitle>

					{/**add button */}
					{hasPhysicalCopy && (
						<Dialog>
							<DialogTrigger asChild>
								<Button>
									<Plus className='size-4' />
									Tạo bản sao vật lý
								</Button>
							</DialogTrigger>

							<DialogContent>
								<DialogHeader>
									<DialogTitle>Tạo bản sao vật lý</DialogTitle>
								</DialogHeader>

								<div>Đây là dialog của bạn.</div>
							</DialogContent>
						</Dialog>
					)}
				</div>
			</CardHeader>

			<CardContent>
				{!hasPhysicalCopy && (
					<div className='flex items-center gap-y-4 flex-col py-8'>
						<FileText className='size-12 text-muted-foreground' />
						<h3 className='text-lg font-semibold'>Chưa có bản sao vật lý nào</h3>
						<p className='text-muted-foreground'>
							Sách này chưa có phiên bản bản sao vật lý. Hãy tạo bản sao vật lý đầu tiên.
						</p>

						<Dialog>
							<DialogTrigger asChild>
								<Button>
									<Plus className='size-4' />
									Tạo bản sao vật lý
								</Button>
							</DialogTrigger>

							<DialogContent>
								<DialogHeader>
									<DialogTitle>Tạo bản sao vật lý</DialogTitle>
								</DialogHeader>

								<div>Đây là dialog của bạn.</div>
							</DialogContent>
						</Dialog>
					</div>
				)}

				{hasPhysicalCopy && (
					<div className='p-0'>
						<div className='bg-white rounded-lg shadow overflow-x-auto'>
							<Table className='min-w-[700px]'>
								<TableHeader>
									<TableRow>
										<TableHead>Trạng thái</TableHead>
										<TableHead>Tình trạng</TableHead>
										<TableHead>Barcode</TableHead>
										<TableHead>Vị trí</TableHead>
										<TableHead>Ngày mua</TableHead>
										<TableHead>Giá mua</TableHead>
										<TableHead>Chi tiết</TableHead>
										<TableHead className='w-[100px] text-center'>Thao tác</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{physicalCopies.map((physicalCopy) => (
										<TableRow key={physicalCopy.id}>
											<TableCell>
												{(() => {
													const status = statusPhysicalcopy(physicalCopy.status)
													return (
														<div
															className={`flex items-center gap-1 px-2 py-1 text-${status.color}-600 border-${status.color}-600`}
														>
															{status.icon}
															<span>{status.text}</span>
														</div>
													)
												})()}
											</TableCell>

											<TableCell>
												{(() => {
													const status = getStatusTypeName(physicalCopy.current_condition)
													return (
														<span
															className={`
          px-2 py-0.5 border text-sm font-medium rounded-full  
          ${status.color === 'green' ? 'bg-green-100 text-green-800' : ''}
          ${status.color === 'blue' ? 'bg-blue-100 text-blue-800' : ''}
          ${status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : ''}
          ${status.color === 'red' ? 'bg-red-100 text-red-800' : ''}
          ${status.color === 'gray' ? 'bg-gray-100 text-gray-800' : ''}
        `}
														>
															{status.text}
														</span>
													)
												})()}
											</TableCell>

											<TableCell>
												<div className='flex gap-1 items-center'>{physicalCopy.barcode}</div>
											</TableCell>
											<TableCell>{physicalCopy.location.name}</TableCell>
											<TableCell>
												{new Date(physicalCopy.purchase_date).toLocaleDateString('vi-VN')}
											</TableCell>
											<TableCell>{physicalCopy.purchase_price} VND</TableCell>
											<TableCell>{physicalCopy.condition_details}</TableCell>
											<TableCell>
												<div className='flex items-center gap-2 justify-end'>
													<Button variant={'ghost'} size={'sm'}>
														<Edit />
													</Button>
													<Button
														variant={'ghost'}
														size={'sm'}
														className='text-destructive hover:text-destructive hover:bg-red-50'
														onClick={() =>
															setDeletePhysicalCopyState({
																open: true,
																physicalCopy
															})
														}
													>
														<Trash2 />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				)}
			</CardContent>

			<DeletePhysicalCopyDialog
				open={deletePhysicalCopyState.open}
				physicalCopy={deletePhysicalCopyState.physicalCopy}
				onClose={() => setDeletePhysicalCopyState({ open: false, physicalCopy: null })}
			/>
			{/* pagination */}
			<PaginationWrapper
				currentData={physicalCopies?.length || 0}
				onChangePage={handleChangePage}
				currentMeta={physicalCopyData?.meta}
			/>
		</Card>
	)
}

export default PhysicalCopyListCard
