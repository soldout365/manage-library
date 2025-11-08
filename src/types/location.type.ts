import type { QueryParamsType } from './common.type'

export type LocationType = {
	id: string
	name: string
	slug: string
	description: string
	floor: number
	section: string
	shelf: string
	isActive: boolean
	createdAt: string
	updatedAt: string
}
export type CreateLocationType = Pick<LocationType, 'name' | 'description' | 'floor' | 'section' | 'shelf' | 'isActive'>

export type UpdateLocationType = Partial<CreateLocationType>

export type SearchLocationParamsType = QueryParamsType & {
	q: string
}
