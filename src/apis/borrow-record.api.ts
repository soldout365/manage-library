import type { PaginationType } from '@/types/common.type'
import instance from '@/configs/instance'
import type {
	BorrowRecordType,
	EBorrowRecordStatus,
	QueryParamsBorrowRecordType,
	StatBorrowRecordType
} from '@/types/borrow-record.type'

export const borrowRecordApi = {
	getStatBorrowRecord: async (): Promise<StatBorrowRecordType> => {
		const response = await instance.get<StatBorrowRecordType>('/api/borrow-records/stats')
		return response.data
	},

	getBorrowRecords: async (
		status: EBorrowRecordStatus,
		params?: QueryParamsBorrowRecordType
	): Promise<PaginationType<BorrowRecordType>> => {
		const response = await instance.get<PaginationType<BorrowRecordType>>(`/api/borrow-records/status/${status}`, {
			params
		})
		return response.data
	}
}
