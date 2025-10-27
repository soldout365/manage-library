export const getReaderTypeDisplayName = (readerTypeName: string) => {
	switch (readerTypeName) {
		case 'student':
			return 'Sinh viên';
		case 'teacher':
			return 'Giáo viên';
		case 'staff':
			return 'Nhân viên';
		default:
			return 'Chưa có thông tin';
	}
};
