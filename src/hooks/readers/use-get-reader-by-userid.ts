import { readerApi } from '@/apis/reader.api';
import { useQuery } from '@tanstack/react-query';

export const useGetReaderByUserId = (
	userId: string,
	enabled: boolean = true
) => {
	return useQuery({
		queryKey: [readerApi.getReaderByUserId.name, userId],
		queryFn: () => readerApi.getReaderByUserId(userId),
		enabled: enabled && !!userId,
	});
};
