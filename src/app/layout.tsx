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

        {/* Farcaster Mini App Metadata */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://gotcha-jade.vercel.app/og-image.png" />
        <meta property="fc:frame:button:1" content="Open App" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="https://gotcha-jade.vercel.app" />

        {/* Open Graph */}
        <meta property="og:title" content="Gotcha - Farcaster Growth Insights" />
        <meta property="og:description" content="Track your active followers on Farcaster" />
        <meta property="og:image" content="https://gotcha-jade.vercel.app/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gotcha - Farcaster Growth Insights" />
        <meta name="twitter:description" content="Track your active followers on Farcaster" />
        <meta name="twitter:image" content="https://gotcha-jade.vercel.app/og-image.png" />
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
