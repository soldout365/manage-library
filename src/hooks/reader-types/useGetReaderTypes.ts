import { readerTypeApi } from '@/apis/reader-type.api'
import { useQuery } from '@tanstack/react-query'

export const useGetReaderTypes = () => {
	return useQuery({
		queryKey: [readerTypeApi.getReaderTypes.name],
		queryFn: async () => await readerTypeApi.getReaderTypes()
	})
}
