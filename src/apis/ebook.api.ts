import type { EbookCreateType, EbookQueryParamsType, EBookType } from '@/types/ebook.type'
import type { PaginationType } from '@/types/common.type'
import instance from '@/configs/instance'

export const ebookApi = {
	// get ebook by book id
	getEbookByBookId: async (bookId: string, params?: EbookQueryParamsType): Promise<PaginationType<EBookType>> => {
		const response = await instance.get<PaginationType<EBookType>>(`/api/ebooks/book/${bookId}`, {
			params
		})

		return response.data
	},

	// increase ebook download count
	increaseDownloadCount: async (ebookId: string) => {
		const response = await instance.post(`/api/ebooks/${ebookId}/increment-downloads`, {})
		return response.data
	},

	// create ebookApi
	createEbook: async (data: EbookCreateType): Promise<EBookType> => {
		const response = await instance.post('/api/ebooks', data)
		return response.data
	},
	//delete ebook
	deleteEbook: async (ebookId: string): Promise<void> => {
		const response = await instance.delete(`/api/ebooks/${ebookId}`)
		return response.data
	}
}
