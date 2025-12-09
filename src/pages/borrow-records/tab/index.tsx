import { CalendarIcon, EyeIcon, PencilIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TabsContent, TabsList, TabsTrigger, Tabs as TabsUI } from '@/components/ui/tabs'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { EBorrowRecordStatus } from '@/types/borrow-record.type'
import dayjs from 'dayjs'
import { formatDate } from '@/utils/format-date'
import { useBorrowRecord } from '@/hooks/borrow-records/use-borrow-record'
import { useQueryParams } from '@/hooks/useQueryParam'

const Tabs = () => {
	const queryParams = useQueryParams()
	const navigate = useNavigate()

	const status = (queryParams.status as EBorrowRecordStatus) || EBorrowRecordStatus.BORROWED

	const { data: borrowRecordData } = useBorrowRecord(status, queryParams)
	const borrowRecords = borrowRecordData?.data || []
	console.log('🚀 ~ Tabs ~ borrowRecords:', borrowRecords)

	const handleChangeTab = (value: EBorrowRecordStatus) => {
		navigate({
			pathname: '/borrow-records',
			search: createSearchParams({
				...queryParams,
				page: '1',
				status: value
			}).toString()
		})
	}

	return (
		<TabsUI
			value={status || EBorrowRecordStatus.BORROWED}
			onValueChange={(value) => handleChangeTab(value as EBorrowRecordStatus)}
		>
			<TabsList>
				<TabsTrigger value={EBorrowRecordStatus.BORROWED}>Đang mượn</TabsTrigger>
				<TabsTrigger value={EBorrowRecordStatus.RETURNED}>Đã trả</TabsTrigger>
				<TabsTrigger value={EBorrowRecordStatus.OVERDUE}>Quá hạn</TabsTrigger>
			</TabsList>

			<TabsContent value={EBorrowRecordStatus.BORROWED}>
				<div className=''>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>
									<input type='checkbox' />
								</TableHead>
								<TableHead>Sách</TableHead>
								<TableHead>Độc giả</TableHead>
								<TableHead>Ngày mượn</TableHead>
								<TableHead>Hạn trả</TableHead>
								<TableHead>Thời gian</TableHead>
								<TableHead>Ngày trả</TableHead>
								<TableHead>Hành động</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{borrowRecords.map((borrowRecord) => {
								return (
									<TableRow key={borrowRecord.id}>
										{/* checkbox */}
										<TableCell>
											<input type='checkbox' />
										</TableCell>

										{/* book */}
										<TableCell>
											<div className='flex items-center flex-1 gap-2'>
												<img
													src={borrowRecord.physicalCopy.book.cover_image}
													alt={borrowRecord.physicalCopy.book.title}
													className='w-10 h-14 object-cover rounded-md'
												/>
												<div className='flex flex-col'>
													<p className='text-sm font-medium'>
														{borrowRecord.physicalCopy.book.title}
													</p>
													<p className='text-sm text-muted-foreground'>
														{borrowRecord.physicalCopy.book.isbn}
													</p>
												</div>
											</div>
										</TableCell>

										{/* reader */}
										<TableCell>
											<div className='flex flex-col'>
												<p className='text-sm font-medium'>
													{borrowRecord.reader.fullName || 'Không có tên'}
												</p>
												<p className='text-sm text-muted-foreground'>
													{borrowRecord.reader.cardNumber}
												</p>
											</div>
										</TableCell>

										{/* ngay muon */}
										<TableCell>
											<p className='text-sm font-medium'>
												{dayjs(borrowRecord.borrow_date).format('DD/MM/YYYY')}
											</p>
										</TableCell>

										{/* han tra */}
										<TableCell>
											<p className='text-sm font-medium'>{formatDate(borrowRecord.due_date)}</p>
										</TableCell>

										{/* thoi gian */}
										<TableCell>
											<p className='text-sm font-medium'>
												{dayjs(borrowRecord.due_date).diff(dayjs(borrowRecord.borrow_date), 'day')} ngày
											</p>
										</TableCell>

										{/* ngay tra */}
										<TableCell>
											<p className='text-sm font-medium'>
												{formatDate(borrowRecord.return_date)}
											</p>
										</TableCell>

										{/* hanh dong */}
										<TableCell>
											<Button variant='outline'>
												<EyeIcon className='w-4 h-4' />
											</Button>
											<Button variant='outline'>
												<PencilIcon className='w-4 h-4' />
											</Button>
											<Button variant='outline'>
												<CalendarIcon className='w-4 h-4' />
											</Button>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</TabsContent>

			<TabsContent value={EBorrowRecordStatus.RETURNED}>
				<div>
					<h1>Đã trả</h1>
				</div>
			</TabsContent>
			<TabsContent value={EBorrowRecordStatus.OVERDUE}>
				<div>
					<h1>Quá hạn</h1>
				</div>
			</TabsContent>
		</TabsUI>
	)
}

export default Tabs
