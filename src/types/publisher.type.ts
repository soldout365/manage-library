import type { QueryParamsType } from './common.type'

export type PublisherType = {
	id: string
	publisherName: string
	slug: string
	address: string
	phone: string
	email: string
	website: string
	description: string | null
	isActive: boolean
	establishedDate: string
	country: string
	createdAt: string
	updatedAt: string
}

export type PublisherBookRefType = Pick<
	PublisherType,
	| 'id'
	| 'publisherName'
	| 'slug'
	| 'address'
	| 'phone'
	| 'email'
	| 'website'
	| 'description'
	| 'isActive'
	| 'establishedDate'
	| 'country'
	| 'createdAt'
	| 'updatedAt'
>

export type PublisherParams = QueryParamsType & {
	search?: string
}
export type CreatePublisherType = Pick<
	PublisherType,
	| 'publisherName'
	| 'email'
	| 'address'
	| 'phone'
	| 'website'
	| 'description'
	| 'isActive'
	| 'establishedDate'
	| 'country'
>
export type UpdatePublisherType = Partial<CreatePublisherType>
