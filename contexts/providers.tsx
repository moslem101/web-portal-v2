'use client'

import { ReactNode } from 'react'
import { SearchFilterProvider } from './pages/homepage/search-filter-context'
// Import other providers as needed, for example:
// import { AuthProvider } from './AuthContext'
// import { ThemeProvider } from './ThemeContext'

interface ProvidersProps {
  children: ReactNode
}

/**
 * Combined Providers component that wraps the application with all necessary context providers
 */
export function ContextProviders({ children }: ProvidersProps) {
  return (
    // Nest providers inside each other, with the most global one at the top
    <SearchFilterProvider>
      {/* Add other providers here as needed */}
      {/* <AuthProvider> */}
      {/* <ThemeProvider> */}
      {children}
      {/* </ThemeProvider> */}
      {/* </AuthProvider> */}
    </SearchFilterProvider>
  )
}
