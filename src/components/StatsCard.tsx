'use client'

interface StatsCardProps {
    title: string
    value: string | number
    icon: string
    color: 'primary' | 'secondary' | 'accent' | 'purple'
    subtitle?: string
}

const colorClasses = {
    primary: 'from-[var(--primary)] to-[var(--primary-dark)]',
    secondary: 'from-[var(--secondary)] to-[var(--secondary-dark)]',
    accent: 'from-[var(--accent)] to-[var(--accent-dark)]',
    purple: 'from-[var(--purple)] to-[var(--purple-dark)]'
}

export default function StatsCard({ title, value, icon, color, subtitle }: StatsCardProps) {
    return (
        <div className="stat-card group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-[var(--text-primary)]">{value}</h3>
                    {subtitle && (
                        <p className="text-xs text-[var(--text-muted)] mt-1">{subtitle}</p>
                    )}
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </div>
    )
}
