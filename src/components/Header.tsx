'use client'

import { useAccount } from 'wagmi'

export default function Header() {
    const { address, isConnected } = useAccount()

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B9D] via-[#4ECDC4] to-[#FFE66D] flex items-center justify-center shadow-xl transform group-hover:rotate-6 transition-transform duration-300">
                            <span className="text-3xl">🎯</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-black gradient-text tracking-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>Gotcha</h1>
                            <p className="text-xs font-bold text-[var(--accent-dark)] uppercase tracking-widest opacity-80">Growth Insights</p>
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
