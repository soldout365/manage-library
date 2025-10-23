import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'
import type { ReaderType } from '@/types/reader.type'
import { formatDate } from '@/utils/format-date'
import { getReaderTypeDisplayName } from '../../../../../utils/getReaderTypeDisplayName'

interface ReaderTableProps {
	readers: ReaderType[]
	renderActions: (reader: ReaderType) => React.ReactNode
}
const ReaderTable = ({ readers, renderActions }: ReaderTableProps) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Mã người dùng</TableHead>
					<TableHead>Tên người dùng</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Quyền người dùng</TableHead>
					<TableHead>Loại độc giả</TableHead>
					<TableHead>Trạng thái</TableHead>
					<TableHead>Ngày cấp thẻ</TableHead>
					<TableHead>Ngày hết hạn</TableHead>
					<TableHead className='text-right'>Hành động</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{readers && readers.length > 0 ? (
					readers.map((reader) => {
						return (
							<TableRow key={reader.id}>
								<TableCell className='font-medium'>{reader.cardNumber}</TableCell>
								<TableCell>{reader.fullName}</TableCell>
								<TableCell>{reader.user.email}</TableCell>
								<TableCell>
									<Badge>Độc giả</Badge>
								</TableCell>
								<TableCell>{getReaderTypeDisplayName(reader.readerType.typeName)}</TableCell>
								<TableCell>
									<Badge>{reader.isActive ? 'Hoạt động' : 'Không hoạt động'}</Badge>
								</TableCell>
								<TableCell>{formatDate(reader.cardIssueDate || '')}</TableCell>
								<TableCell>{formatDate(reader.cardExpiryDate || '')}</TableCell>
								<TableCell className='text-right'>{renderActions(reader)}</TableCell>
							</TableRow>
						)
					})
				) : (
					<TableRow>
						<TableCell className='text-center py-8' colSpan={9}>
							Không có người dùng nào
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}

export default ReaderTable
