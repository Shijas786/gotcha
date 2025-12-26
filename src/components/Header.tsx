'use client'


export default function Header() {

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

                    {/* Profile section */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#4ECDC4] flex items-center justify-center text-xl shadow-sm">
                            👤
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
