import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "react-query";
import App from './App.tsx'
import { AppContextProvider } from './contexts/AppContext.tsx';
import React from 'react';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
          <App />
          </AppContextProvider>
        </QueryClientProvider>

  </StrictMode>,
)
