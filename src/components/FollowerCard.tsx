'use client'

import Image from 'next/image'
import { FollowerActivity } from '@/lib/neynar'

interface FollowerCardProps {
    follower: FollowerActivity
}

function getActivityBadge(follower: FollowerActivity) {
    const { casts_count, replies_count, likes_count } = follower

    if (casts_count > 5) return { text: '🔥 Super Active', color: 'badge-primary' }
    if (replies_count > 5) return { text: '💬 Engaged', color: 'badge-secondary' }
    if (likes_count > 10) return { text: '❤️ Supporter', color: 'badge-accent' }
    return { text: '✨ Active', color: 'badge-purple' }
}

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
}

export default function FollowerCard({ follower }: FollowerCardProps) {
    const badge = getActivityBadge(follower)

    return (
        <div className="card">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <Image
                        src={follower.pfp_url || '/default-avatar.svg'}
                        alt={follower.display_name}
                        width={56}
                        height={56}
                        className="avatar"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                            <h4 className="font-semibold text-[var(--text-primary)] truncate">
                                {follower.display_name}
                            </h4>
                            <p className="text-sm text-[var(--text-secondary)]">@{follower.username}</p>
                        </div>
                        <span className={`badge ${badge.color} flex-shrink-0`}>
                            {badge.text}
                        </span>
                    </div>

                    {/* Activity Stats */}
                    <div className="flex flex-wrap gap-3 mb-2">
                        {follower.casts_count > 0 && (
                            <div className="flex items-center gap-1.5 text-sm">
                                <span className="text-lg">📝</span>
                                <span className="font-medium text-[var(--text-primary)]">{follower.casts_count}</span>
                                <span className="text-[var(--text-muted)]">posts</span>
                            </div>
                        )}
                        {follower.replies_count > 0 && (
                            <div className="flex items-center gap-1.5 text-sm">
                                <span className="text-lg">💬</span>
                                <span className="font-medium text-[var(--text-primary)]">{follower.replies_count}</span>
                                <span className="text-[var(--text-muted)]">replies</span>
                            </div>
                        )}
                        {follower.likes_count > 0 && (
                            <div className="flex items-center gap-1.5 text-sm">
                                <span className="text-lg">❤️</span>
                                <span className="font-medium text-[var(--text-primary)]">{follower.likes_count}</span>
                                <span className="text-[var(--text-muted)]">likes</span>
                            </div>
                        )}
                    </div>

                    {/* Last Active */}
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                        <span>🕐</span>
                        <span>Last active {formatTimeAgo(follower.last_active)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
