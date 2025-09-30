export type UserType = {
	id: string
	userCode: string
	username: string
	email: string
	role: 'admin' | 'reader'
	accountStatus: 'active' | 'suspended' | 'banned'
	lastLogin: string
	createdAt: string
	updatedAt: string
}

export interface CurrentUserResponse {
	id: string
	userCode: string
	username: string
	email: string
	role: 'admin' | 'reader'
	accountStatus: 'active' | 'suspended' | 'banned'
	lastLogin: string
	createdAt: string
	updatedAt: string
}

export interface UpdateUserRequest {
	username?: string
	userCode?: string
}
export interface UpdateUserInfoForm {
	fullName: string
	userCode: string
	email: string
	gender: string
	dob: string
	phone: string
	address: string
	cardIssueDate: string
	cardExpiryDate: string
}
