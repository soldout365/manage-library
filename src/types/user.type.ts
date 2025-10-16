import type { QueryParamsType } from './common.type'
import type { ReaderType } from './reader.type'

export enum EAccountStatus {
	BANNED = 'banned',
	ACTIVE = 'active',
	SUSPENDED = 'suspended'
}

export enum ERole {
	ADMIN = 'admin',
	READER = 'reader'
}

export type GetUsersParamsType = QueryParamsType & {
	type?: ERole
	search?: string
}

export type UserType = {
	id: string
	userCode: string
	username: string
	email: string
	role: ERole
	accountStatus: EAccountStatus
	lastLogin: string
	createdAt: string
	updatedAt: string
}

export type CreateUserType = Pick<UserType, 'userCode' | 'username' | 'email' | 'role' | 'accountStatus'> & {
	password: string
}

export type CreateReaderForUserType = Pick<
	ReaderType,
	'fullName' | 'dob' | 'gender' | 'address' | 'phone' | 'cardNumber' | 'cardIssueDate' | 'cardExpiryDate'
> & {
	readerTypeName: string
}

export type UpdateUserType = Pick<UserType, 'username' | 'email' | 'role' | 'accountStatus' | 'userCode'>
