'use client'

interface StatsCardProps {
    title: string
    value: string | number
    icon: string
    subtitle?: string
}

export default function StatsCard({ title, value, icon, subtitle }: StatsCardProps) {
    return (
        <div className="card border-white/5 bg-slate-900/40 hover:bg-slate-900/60 group">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <span className="text-xl">{icon}</span>
                </div>
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
            </div>

            <div className="flex items-baseline gap-2">
                <h3 className="stat-value text-white">{value}</h3>
            </div>

            {subtitle && (
                <p className="text-sm text-slate-500 mt-2 font-medium">{subtitle}</p>
            )}

            {/* Progress bar simulation for polish */}
            <div className="mt-4 w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-2/3 group-hover:w-3/4 transition-all duration-500"></div>
            </div>
        </div>
    )
}
