import axiosInstance from '@/configs/instance'
import type {
	AuthorType,
	CreateAuthorPayload,
	GetAuthorsParamsType,
	SearchAuthorsParamsType,
	UpdateAuthorPayload
} from '@/types/author.type'
import type { PaginationType } from '@/types/common.type'
import type { AxiosResponse } from 'axios'

export const authorApi = {
	getAuthors: async (params?: GetAuthorsParamsType): Promise<PaginationType<AuthorType>> => {
		const res = await axiosInstance.get('/api/authors', { params })
		return res.data
	},
	createAuthor: async (payload: CreateAuthorPayload): Promise<AxiosResponse<AuthorType>> => {
		return await axiosInstance.post('/api/authors', payload)
	},
	updateAuthor: async (id: string, payload: UpdateAuthorPayload): Promise<AuthorType> => {
		const response = await axiosInstance.patch(`/api/authors/${id}`, payload)
		return response.data
	},
	deleteAuthor: async (id: string) => {
		await axiosInstance.delete(`/api/authors/${id}`)
	},
	searchAuthors: async (params: SearchAuthorsParamsType): Promise<PaginationType<AuthorType>> => {
		const { q, page = 1, limit = 10 } = params

		const response = await axiosInstance.get('/api/authors/search', {
			params: {
				q,
				page,
				limit
			}
		})

		return response.data
	}
}
