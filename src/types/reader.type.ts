import type { QueryParamsType } from './common.type'
import type { ReaderTypes } from './reader-types.type'
import type { UserType } from './user.type'

export type GetReadersParamsType = QueryParamsType & {
	cardNumber?: string
	cardExpiryDateFrom?: string
	cardExpiryDateTo?: string
	phone?: string
	search?: string
}

export type ReaderType = {
	id: string
	user: Pick<UserType, 'id' | 'username' | 'email'>
	readerType: Pick<ReaderTypes, 'id' | 'typeName' | 'maxBorrowLimit'>
	fullName?: string
	dob?: string
	gender?: string
	address?: string
	phone?: string
	cardNumber?: string
	cardIssueDate?: string | null
	cardExpiryDate: string | null
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export type CreateReaderType = Pick<
	ReaderType,
	'fullName' | 'dob' | 'gender' | 'address' | 'phone' | 'cardNumber' | 'cardIssueDate' | 'cardExpiryDate'
> & {
	userId: string
	readerTypeId: string
}

export type UpdateReaderType = Pick<
	ReaderType,
	'fullName' | 'dob' | 'gender' | 'address' | 'phone' | 'cardNumber' | 'cardIssueDate' | 'cardExpiryDate'
> & {
	userId: string
	readerTypeId: string
}
