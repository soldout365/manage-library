import type { QueryParamsType } from './common.type'

export type AuthorType = {
	id: string
	author_name: string
	slug: string
	bio: string
	nationality: string
	books: string[]
	created_at: string
	updated_at: string
}

export type GetAuthorsParamsType = QueryParamsType & {
	q?: string
}

export type SearchAuthorsParamsType = Partial<GetAuthorsParamsType>

export type CreateAuthorPayload = Pick<AuthorType, 'author_name' | 'bio' | 'nationality'>

export type UpdateAuthorPayload = Partial<CreateAuthorPayload>

export type AuthorBookRefType = Pick<AuthorType, 'id' | 'author_name' | 'slug' | 'bio' | 'nationality'>
