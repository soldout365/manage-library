export type ReaderTypes = {
	id: string
	typeName: string
	maxBorrowLimit: number
	borrowDurationDays: number
	lateReturnFinePerDay: number
	description: string
	createdAt: string
	updatedAt: string
}

export type UpdateReaderTypesById = Pick<
	ReaderTypes,
	'typeName' | 'maxBorrowLimit' | 'borrowDurationDays' | 'description'
>
