import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'

import React from 'react'

const queryClient = new QueryClient()

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
	return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>
}

export default QueryClientProvider
