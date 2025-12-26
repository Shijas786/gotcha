'use client'

import Link from 'next/link'

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <path d="M12 8V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white tracking-tight leading-none font-outfit">
                                Gotcha
                            </span>
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Growth Intel</span>
                        </div>
                    </Link>

                    {/* Navigation/Actions */}
                    <div className="hidden sm:flex items-center gap-6">
                        <nav className="flex items-center gap-6 mr-6 border-r border-white/10 pr-6">
                            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Dashboard</a>
                            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Activity</a>
                            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Trends</a>
                        </nav>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-slate-700 transition-colors cursor-pointer">
                            👤
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
