'use client'


export default function Header() {

    return (
        <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm pt-[env(safe-area-inset-top)]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B9D] via-[#4ECDC4] to-[#FFE66D] flex items-center justify-center shadow-lg">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-black text-[#2D3748] tracking-tight leading-none" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                                Gotcha
                            </h1>
                            <p className="text-[10px] font-bold text-[#FF6B9D] uppercase tracking-widest mt-1">Growth Insights</p>
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
