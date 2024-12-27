import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import AppRouter from './router';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppRouter />
			<ReactQueryDevtools />
		</QueryClientProvider>
	</StrictMode>
);
