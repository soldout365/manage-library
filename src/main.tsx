import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
// import { AuthProvider } from './contexts/auth-context.context.tsx'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false
		}
	}
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
			<Toaster />
		</QueryClientProvider>
	</StrictMode>
)
