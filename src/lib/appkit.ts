import { createAppKit } from '@reown/appkit/react'
import { base } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient } from '@tanstack/react-query'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!

if (!projectId) {
    throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

export const networks = [base] as const

export const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true
})

export const queryClient = new QueryClient()

export const appkit = createAppKit({
    adapters: [wagmiAdapter],
    networks,
    projectId,
    features: {
        analytics: true
    },
    metadata: {
        name: 'Gotcha - Farcaster Growth Insights',
        description: 'Track your active followers on Farcaster',
        url: 'https://gotcha.app',
        icons: ['https://gotcha.app/icon.png']
    }
})
