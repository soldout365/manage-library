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
