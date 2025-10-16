import './index.css'

import App from './App.tsx'
import QueryClientProvider from '@/pages/providers/query-client-provider.tsx'
import { StrictMode } from 'react'
import { Toaster } from './components/ui/sonner.tsx'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider>
			<Toaster />
			<App />
		</QueryClientProvider>
	</StrictMode>
)
