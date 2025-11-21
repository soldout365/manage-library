import instance from '@/configs/instance'
import type { PaginationType, QueryParamsType } from '@/types/common.type'
import type { PhysicalBook } from '@/types/physical-copies.type'

export const physicalCopiesApi = {
	getPhysicalCopyByBookId: async (
		bookId: string,
		params?: QueryParamsType
	): Promise<PaginationType<PhysicalBook>> => {
		const response = await instance.get<PaginationType<PhysicalBook>>(`api/physical-copies/book/${bookId}`, {
			params
		})
		return response.data
	},
	deletePhysicalCopy: async (physicalCopyId: string): Promise<void> => {
		await instance.delete<void>(`api/physical-copies/${physicalCopyId}`)
	}
}
