import { borrowRecordApi } from '@/apis/borrow-record.api'
import { useQuery } from '@tanstack/react-query'

export const useStatBorrowRecord = (enabled: boolean = true) => {
	return useQuery({
		queryKey: [borrowRecordApi.getStatBorrowRecord.name],
		queryFn: borrowRecordApi.getStatBorrowRecord,
		enabled
	})
}
