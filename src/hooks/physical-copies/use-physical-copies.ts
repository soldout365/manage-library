import { physicalCopiesApi } from '@/apis/physical-copies.api'
import type { QueryParamsType } from '@/types/common.type'
import { useQuery } from '@tanstack/react-query'

export const usePhysicalCopies = (bookId: string, params?: QueryParamsType, enabled: boolean = true) => {
	return useQuery({
		queryKey: [physicalCopiesApi.getPhysicalCopyByBookId.name, bookId, params],
		queryFn: () => physicalCopiesApi.getPhysicalCopyByBookId(bookId, params),
		enabled: enabled && !!bookId
	})
}
