'use client'

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-[var(--border)] shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B9D] via-[#4ECDC4] to-[#FFE66D] flex items-center justify-center shadow-lg">
                            <span className="text-xl">🎯</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-[#2D3748] tracking-tight leading-none" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Gotcha
                            </h1>
                            <p className="text-[9px] font-bold text-[#FF6B9D] uppercase tracking-widest">Growth Insights</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
