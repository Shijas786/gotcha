'use client'

import { type ReactNode } from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Gotcha - Farcaster Growth Insights</title>
        <meta name="description" content="Track your active followers on Farcaster" />

        {/* Farcaster Mini App Metadata */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://gotcha-base.vercel.app/og-image.png" />
        <meta property="fc:frame:button:1" content="Open App" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="https://gotcha-base.vercel.app" />

        {/* Open Graph */}
        <meta property="og:title" content="Gotcha - Farcaster Growth Insights" />
        <meta property="og:description" content="Track your active followers on Farcaster" />
        <meta property="og:image" content="https://gotcha-base.vercel.app/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gotcha - Farcaster Growth Insights" />
        <meta name="twitter:description" content="Track your active followers on Farcaster" />
        <meta name="twitter:image" content="https://gotcha-base.vercel.app/og-image.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
