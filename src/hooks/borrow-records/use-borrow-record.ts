import type { EBorrowRecordStatus, QueryParamsBorrowRecordType } from '@/types/borrow-record.type'

import { borrowRecordApi } from '@/apis/borrow-record.api'
import { useQuery } from '@tanstack/react-query'

export const useBorrowRecord = (
	status: EBorrowRecordStatus,
	params?: QueryParamsBorrowRecordType,
	enabled: boolean = true
) => {
	return useQuery({
		queryKey: [borrowRecordApi.getBorrowRecords.name, status, params],
		queryFn: () => borrowRecordApi.getBorrowRecords(status, params),
		enabled: enabled && !!status
	})
}
