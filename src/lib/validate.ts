// Rule: bắt buộc nhập
export const required = (message = 'This field is required') => ({
	validate: (value: string) => {
		if (!value || value.trim() === '') {
			return message
		}
		return true
	}
})

// Rule: kiểm tra với regex (ví dụ email, số điện thoại)
export const regexp = (type: 'email' | 'phone') => {
	const patterns = {
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex email
		phone: /^[0-9]{10}$/ // Regex phone
	}
	return patterns[type] //
}

// Rule: confirm 2 trường giống nhau (ví dụ password và confirm password)
export const confirm = (fieldName: string, message = 'Values do not match') => ({
	validate: (value: string, allValues: Record<string, any>) => {
		if (value !== allValues[fieldName]) {
			return message
		}
		return true
	}
})
