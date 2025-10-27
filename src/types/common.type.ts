export type QueryParamsType = {
	page?: number;
	limit?: number;
};

export type PaginationMetaType = {
	page: number;
	limit: number;
	totalItems: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};

export type PaginationType<T> = {
	data: T[];
	meta: PaginationMetaType;
};
