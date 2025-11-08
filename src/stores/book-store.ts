import type { AuthorType } from '@/types/author.type'
import type { BookCategoryType } from '@/types/book-category.type'
import type { BookType } from '@/types/book.type'
import type { PublisherType } from '@/types/publisher.type'
import { create } from 'zustand'

export type BookStoreState = {
	publishers: PublisherType[]
	authors: AuthorType[]
	bookCategories: BookCategoryType[]

	selectedBook: BookType | null
	isEditBook: boolean
	isCreateBook: boolean
}

export type BookStoreAction = {
	setPublishers: (publishers: PublisherType[]) => void
	setAuthors: (authors: AuthorType[]) => void
	setBookCategories: (bookCategories: BookCategoryType[]) => void

	setSelectedBook: (book: BookType | null) => void
	setIsEditBook: (isEditBook: boolean) => void
	setIsCreateBook: (isCreateBook: boolean) => void
}

export const bookStore = create<BookStoreState & BookStoreAction>()((set) => ({
	// initial state
	publishers: [],
	authors: [],
	bookCategories: [],
	selectedBook: null,
	isEditBook: false,
	isCreateBook: false,

	// actions
	setPublishers: (publishers: PublisherType[]) => set({ publishers }),
	setAuthors: (authors: AuthorType[]) => set({ authors }),
	setBookCategories: (bookCategories: BookCategoryType[]) => set({ bookCategories }),
	setSelectedBook: (book: BookType | null) => set({ selectedBook: book }),
	setIsEditBook: (isEditBook: boolean) => set({ isEditBook }),
	setIsCreateBook: (isCreateBook: boolean) => set({ isCreateBook })
}))

// shallow compare
export const useBookStore = () => bookStore((state) => state)
