'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { sdk } from '@farcaster/frame-sdk'
import Header from '@/components/Header'
import StatsCard from '@/components/StatsCard'
import FollowerCard from '@/components/FollowerCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import Image from 'next/image'

interface DashboardData {
  user: {
    fid: number
    username: string
    display_name: string
    pfp_url: string
    follower_count: number
    following_count: number
    bio?: string
  }
  stats: {
    total_followers: number
    active_followers: number
    activity_rate: number
  }
  active_followers: Array<{
    fid: number
    username: string
    display_name: string
    pfp_url: string
    casts_count: number
    likes_count: number
    replies_count: number
    last_active: string
    activity_score: number
  }>
}

export default function Home() {
  const { address, isConnected } = useAccount()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<7 | 14 | 30>(7)

  useEffect(() => {
    const init = async () => {
      await sdk.actions.ready()
    }
    init()
  }, [])

  const fetchDashboardData = useCallback(async () => {
    if (!address) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/dashboard?address=${address}&days=${timeRange}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch data')
      }

      const dashboardData = await response.json()
      setData(dashboardData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [address, timeRange])

  useEffect(() => {
    if (isConnected && address) {
      fetchDashboardData()
    } else {
      setData(null)
      setError(null)
    }
  }, [address, isConnected, timeRange, fetchDashboardData])

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {!isConnected && (
          <div className="text-center py-20">
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] flex items-center justify-center shadow-2xl animate-pulse">
                <span className="text-6xl">🎯</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 gradient-text">
              Welcome to Gotcha
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Discover who your most active followers are on Farcaster.
              Track engagement, identify superfans, and grow your community! 🚀
            </p>
            <div className="inline-block">
              <appkit-button />
            </div>
          </div>
        )}

        {/* Dashboard */}
        {isConnected && (
          <>
            {loading && <LoadingSpinner />}

            {error && (
              <div className="card bg-red-50 border-red-200 text-center py-12">
                <span className="text-6xl mb-4 block">😕</span>
                <h3 className="text-xl font-semibold text-red-800 mb-2">Oops!</h3>
                <p className="text-red-600 mb-2">{error}</p>
                {error.includes('No Farcaster profile') && (
                  <p className="text-sm text-red-500 mt-2">
                    💡 Make sure your wallet is linked to a Farcaster account
                  </p>
                )}
                <button
                  onClick={fetchDashboardData}
                  className="btn btn-primary mt-4"
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && data && (
              <>
                {/* Profile Header */}
                <div className="card mb-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <Image
                      src={data.user.pfp_url || '/default-avatar.svg'}
                      alt={data.user.display_name}
                      width={96}
                      height={96}
                      className="avatar"
                    />
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-1">
                        {data.user.display_name}
                      </h2>
                      <p className="text-lg text-[var(--text-secondary)] mb-2">
                        @{data.user.username}
                      </p>
                      {data.user.bio && (
                        <p className="text-[var(--text-secondary)] mb-3">{data.user.bio}</p>
                      )}
                      <div className="flex gap-4">
                        <div>
                          <span className="font-bold text-[var(--text-primary)]">
                            {data.user.follower_count.toLocaleString()}
                          </span>
                          <span className="text-[var(--text-muted)] ml-1">followers</span>
                        </div>
                        <div>
                          <span className="font-bold text-[var(--text-primary)]">
                            {data.user.following_count.toLocaleString()}
                          </span>
                          <span className="text-[var(--text-muted)] ml-1">following</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Range Filter */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    📊 Activity Insights
                  </h3>
                  <div className="flex gap-2">
                    {[7, 14, 30].map((days) => (
                      <button
                        key={days}
                        onClick={() => setTimeRange(days as 7 | 14 | 30)}
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${timeRange === days
                          ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-md'
                          : 'bg-white text-[var(--text-secondary)] border-2 border-[var(--border)] hover:border-[var(--primary)]'
                          }`}
                      >
                        {days} days
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <StatsCard
                    title="Total Followers"
                    value={data.stats.total_followers.toLocaleString()}
                    icon="👥"
                    color="primary"
                    subtitle="Your community size"
                  />
                  <StatsCard
                    title="Active Followers"
                    value={data.stats.active_followers.toLocaleString()}
                    icon="⚡"
                    color="secondary"
                    subtitle={`Last ${timeRange} days`}
                  />
                  <StatsCard
                    title="Activity Rate"
                    value={`${data.stats.activity_rate}%`}
                    icon="📈"
                    color="accent"
                    subtitle="Engagement percentage"
                  />
                </div>

                {/* Active Followers List */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                    🌟 Top Active Followers
                  </h3>
                  {data.active_followers.length === 0 ? (
                    <div className="card text-center py-12">
                      <span className="text-6xl mb-4 block">🔍</span>
                      <p className="text-[var(--text-secondary)]">
                        No active followers found in the last {timeRange} days
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {data.active_followers.map((follower) => (
                        <FollowerCard key={follower.fid} follower={follower} />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[var(--border)] mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--text-muted)]">
            Built with 💜 for the Farcaster community
          </p>
        </div>
      </footer>
    </div>
  )
}
