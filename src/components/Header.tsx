'use client'

import { useAccount } from 'wagmi'

export default function Header() {
    const { address, isConnected } = useAccount()

    return (
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b-2 border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-lg">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold gradient-text">Gotcha</h1>
                            <p className="text-xs text-[var(--text-secondary)]">Growth Insights</p>
                        </div>
                    </div>

                    {/* Wallet Connection */}
                    <div className="flex items-center gap-4">
                        {isConnected && address && (
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[var(--surface-hover)] rounded-full border-2 border-[var(--border)]">
                                <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></div>
                                <span className="text-sm font-medium text-[var(--text-secondary)]">
                                    {address.slice(0, 6)}...{address.slice(-4)}
                                </span>
                            </div>
                        )}
                        <appkit-button />
                    </div>
                </div>
            </div>
        </header>
    )
}
