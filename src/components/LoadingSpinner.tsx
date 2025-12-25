'use client'

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="flex gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-[var(--primary)] loading-dot"></div>
                <div className="w-4 h-4 rounded-full bg-[var(--secondary)] loading-dot"></div>
                <div className="w-4 h-4 rounded-full bg-[var(--accent)] loading-dot"></div>
            </div>
            <p className="text-[var(--text-secondary)] font-medium">Loading your insights...</p>
        </div>
    )
}
