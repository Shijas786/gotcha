import { cookieStorage, createStorage, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { createConfig } from 'wagmi'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!

if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

export const networks = [base] as const

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http()
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  })
})
