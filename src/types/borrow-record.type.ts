import type { PhysicalBook } from './physical-copies.type'
import type { QueryParamsType } from './common.type'
import type { ReaderType } from './reader.type'
import type { UserType } from './user.type'
import type { EReservationStatus } from './reservation.type'

export type StatBorrowRecordByStatusType = {
	status: string
	count: number
}

export type StatBorrowRecordByMonthType = {
	month: string
	count: number
}

export type StatBorrowRecordByReaderTypeType = {
	readerType: string
	count: number
}

export type StatBorrowRecordByBookCategoryType = {
	category: string
	count: number
}

export type StatBorrowRecordType = {
	total: number
	byStatus: StatBorrowRecordByStatusType[]
	borrowed: number
	returned: number
	overdue: number
	renewed: number
	cancelled: number
	activeLoans: number
	overdueLoans: number
	byMonth: StatBorrowRecordByMonthType[]
	byReaderType: StatBorrowRecordByReaderTypeType[]
	byBookCategory: StatBorrowRecordByBookCategoryType[]
}

export enum EBorrowRecordStatus {
	PENDING_APPROVAL = 'pending_approval',
	BORROWED = 'borrowed',
	RETURNED = 'returned',
	OVERDUE = 'overdue',
	RENEWED = 'renewed',
	CANCELLED = 'cancelled'
}

export type BorrowRecordType = {
	id: string
	reader_id: string
	reader: ReaderType
	copy_id: string
	physicalCopy: PhysicalBook
	borrow_date: string
	due_date: string
	return_date: string
	status: EBorrowRecordStatus
	librarian_id: string
	librarian: UserType
	borrow_notes: string
	return_notes: string
	renewal_count: number
	created_at: string
	updated_at: string
}

export type QueryParamsBorrowRecordType = QueryParamsType & {
	// status?: EBorrowRecordStatus;
	id?: string
	bookId?: string
	readerId?: string
	authorId?: string
	categoryId?: string
	publisherId?: string
	userId?: string
	librarianId?: string
	borrowId?: string
	readerTypeId?: string
	gradeLevelId?: number
	reservationStatus?: EReservationStatus
	q?: string
}
