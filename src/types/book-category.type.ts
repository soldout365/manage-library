import type { QueryParamsType } from './common.type'

export type BookCategoryType = {
	id: string
	name: string
	parent_id: string | null
	createdAt: string
	updatedAt: string
}

export type BookCategoryBookRefType = Pick<BookCategoryType, 'id' | 'name' | 'parent_id' | 'createdAt' | 'updatedAt'>

export type BookCategoryParamsType = QueryParamsType
