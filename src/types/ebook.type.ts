import type { BookType } from './book.type'
import type { QueryParamsType } from './common.type'

export type EbookQueryParamsType = QueryParamsType

export type EBookType = {
	id: string
	book_id: string
	book: BookType
	file_path: string
	file_size: string
	file_format: string
	download_count: number
	view_count: number
	completed_read_count: number
	created_at: string
	updated_at: string
}
