'use client'

import { useEffect, useState, useCallback } from 'react'
import { sdk } from '@farcaster/frame-sdk'
import { recoverMessageAddress } from 'viem'
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

interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<7 | 14 | 30>(7)
  const [fcUser, setFcUser] = useState<FarcasterUser | null>(null)
  const [signedInAddress, setSignedInAddress] = useState<string | null>(null)

  // Exclusive Farcaster Sign In address
  const effectiveAddress = signedInAddress

  useEffect(() => {
    const init = async () => {
      const context = await sdk.context
      if (context?.user) {
        setFcUser(context.user)
      }
      await sdk.actions.ready()
    }
    init()
  }, [])

  const handleSignIn = async () => {
    try {
      const result = await sdk.actions.signIn({
        nonce: Math.random().toString(36).substring(2),
        acceptAuthAddress: true
      })

      console.log('Farcaster Sign In Success:', result)

      const recoveredAddress = await recoverMessageAddress({
        message: result.message,
        signature: result.signature as `0x${string}`,
      })

      if (recoveredAddress) {
        setSignedInAddress(recoveredAddress)
      }
    } catch (err) {
      console.error('Farcaster Sign In Failed:', err)
    }
  }

  const fetchDashboardData = useCallback(async () => {
    if (!effectiveAddress) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/dashboard?address=${effectiveAddress}&days=${timeRange}`)

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
  }, [effectiveAddress, timeRange])

  useEffect(() => {
    if (effectiveAddress) {
      fetchDashboardData()
    } else {
      setData(null)
      setError(null)
    }
  }, [effectiveAddress, timeRange, fetchDashboardData])

  return (
    <div className="min-h-screen relative">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute top-[10%] left-[5%] text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>🎯</div>
        <div className="absolute top-[20%] right-[10%] text-6xl opacity-20 animate-bounce" style={{ animationDuration: '4s' }}>📊</div>
        <div className="absolute bottom-[20%] left-[15%] text-6xl opacity-20 animate-bounce" style={{ animationDuration: '5s' }}>⚡</div>
        <div className="absolute bottom-[10%] right-[15%] text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3.5s' }}>🌟</div>

        {/* Floating Bubbles */}
        <div className="absolute top-[30%] left-[20%] w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-[40%] right-[25%] w-48 h-48 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <main className="relative z-10 pt-16">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!effectiveAddress ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="space-y-6 max-w-2xl px-4 py-12 card backdrop-blur-xl bg-white/40 border-white/40">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl flex items-center justify-center text-5xl mx-auto shadow-2xl transform hover:rotate-12 transition-transform duration-300">
                  🎯
                </div>
                <h2 className="text-5xl font-bold gradient-text pb-2">Welcome to Gotcha</h2>
                <p className="text-xl text-[var(--text-secondary)] font-medium">
                  The most vibrant way to track your Farcaster growth.
                  Sign in to see who&apos;s really engaging with you!
                </p>
                <div className="flex flex-col items-center gap-4 pt-4">
                  {fcUser ? (
                    <>
                      <button
                        onClick={handleSignIn}
                        className="btn btn-primary text-xl px-10 py-4"
                      >
                        Sign in with Farcaster
                      </button>
                      <p className="text-sm text-[var(--text-muted)] font-bold">
                        Logged in as @{fcUser.username}
                      </p>
                    </>
                  ) : (
                    <div className="card bg-amber-50 border-amber-200 text-amber-800 p-6">
                      <p className="font-bold mb-2">🚀 Almost there!</p>
                      <p>Please open this app inside a Farcaster client (Warpcast/Supercast) to sign in.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
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
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-[var(--text-primary)]">
                              {data.user.follower_count.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                              <span className="mr-1">👥</span>Followers
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-[var(--text-primary)]">
                              {data.user.following_count.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                              <span className="mr-1">👀</span>Following
                            </span>
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
        </div>
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
