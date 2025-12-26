import { createAppKit } from '@reown/appkit/react'
import { base } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'
import { wagmiAdapter, projectId } from './wagmi'

export const queryClient = new QueryClient()

// Create the modal
export const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [base],
    defaultNetwork: base,
    metadata: {
        name: 'Gotcha',
        description: 'Farcaster Growth Insights',
        url: 'https://gotcha-base.vercel.app',
        icons: ['https://gotcha-base.vercel.app/icon.svg']
    },
    features: {
        analytics: true
    }
})
