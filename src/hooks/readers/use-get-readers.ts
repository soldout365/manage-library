import type { GetReadersParamsType } from '@/types/reader.type'
import { readerApi } from '@/apis/reader.api'
import { useQuery } from '@tanstack/react-query'

export const useGetReaders = (params?: GetReadersParamsType, enabled: boolean = true) => {
	return useQuery({
		queryKey: [readerApi.getReaders.name, params],
		queryFn: () => readerApi.getReaders(params),
		enabled: enabled
	})
}
