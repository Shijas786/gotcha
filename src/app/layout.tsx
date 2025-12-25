'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { wagmiAdapter } from '@/lib/wagmi'
import './globals.css'

// Import the modal creation (this initializes AppKit)
import '@/lib/appkit'

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config
  )

  return (
    <html lang="en">
      <head>
        <title>Gotcha - Farcaster Growth Insights</title>
        <meta name="description" content="Track your active followers on Farcaster" />
      </head>
      <body>
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
