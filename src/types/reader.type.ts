export interface ReaderType {
	id: string
	typeName: string
	maxBorrowLimit: number
}

export interface Reader {
	id: string
	user: {
		id: string
		username: string
		email: string
	}
	readerType: ReaderType
	fullName: string
	dob: string
	gender: string
	address: string
	phone: string
	cardNumber: string
	cardIssueDate: string
	cardExpiryDate: string
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export interface ReaderByUserIdResponse {
	id: string
	user: {
		id: string
		username: string
		email: string
	}
	readerType: ReaderType
	fullName: string
	dob: string
	gender: string
	address: string
	phone: string
	cardNumber: string
	cardIssueDate: string
	cardExpiryDate: string
	isActive: boolean
	createdAt: string
	updatedAt: string
}

// Update request types
export interface UpdateReaderRequest {
	readerTypeId?: string
	fullName?: string
	dob?: string
	gender?: string
	address?: string
	phone?: string
	cardNumber?: string
	cardIssueDate?: string
	cardExpiryDate?: string
	isActive?: boolean
}
