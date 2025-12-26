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
    sample_size: number
    power_user_count: number
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
  power_users: Array<{
    fid: number
    username: string
    display_name: string
    pfp_url: string
    follower_count: number
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
  const [signedInFid, setSignedInFid] = useState<number | null>(null)

  const effectiveFid = signedInFid
  const effectiveAddress = signedInAddress
  const isAuthorized = !!(effectiveFid || effectiveAddress)

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

      const recoveredAddress = await recoverMessageAddress({
        message: result.message,
        signature: result.signature as `0x${string}`,
      })

      if (recoveredAddress) {
        setSignedInAddress(recoveredAddress)
      }

      if (fcUser?.fid) {
        setSignedInFid(fcUser.fid)
      }
    } catch (err) {
      console.error('Farcaster Sign In Failed:', err)
    }
  }

  const fetchDashboardData = useCallback(async () => {
    if (!isAuthorized) return

    setLoading(true)
    setError(null)

    try {
      const queryParams = effectiveFid
        ? `fid=${effectiveFid}`
        : `address=${effectiveAddress}`

      const response = await fetch(`/api/dashboard?${queryParams}&days=${timeRange}`)

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
  }, [isAuthorized, effectiveFid, effectiveAddress, timeRange])

  useEffect(() => {
    if (isAuthorized) {
      fetchDashboardData()
    }
  }, [isAuthorized, timeRange, fetchDashboardData])

  return (
    <div className="min-h-screen bg-[#020617]">
      <Header />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {!isAuthorized ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-8 border border-indigo-500/20 shadow-[0_0_50px_-12px_rgba(99,102,241,0.5)]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 8V12L15 15" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Smarter <span className="text-indigo-500">Growth</span> <br />Insights for Farcaster
            </h1>
            <p className="text-xl text-slate-400 mb-10 font-medium max-w-xl mx-auto leading-relaxed">
              Verify your most active followers, detect power users, and understand your community engagement at a glance.
            </p>

            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-xl w-full max-w-md">
              {fcUser ? (
                <div className="space-y-4">
                  <button onClick={handleSignIn} className="btn btn-primary w-full py-4 text-lg">
                    Sign In with Farcaster
                  </button>
                  <p className="text-sm text-slate-500 font-medium">Logged in as @{fcUser.username}</p>
                </div>
              ) : (
                <div className="text-slate-400 py-4 font-medium flex items-center justify-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Please open in Warpcast or Supercast
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {loading && !data && (
              <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
              </div>
            )}

            {error && (
              <div className="card border-red-500/20 bg-red-500/5 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  ❌
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
                <p className="text-red-400/80 mb-6">{error}</p>
                <button onClick={fetchDashboardData} className="btn bg-white/10 hover:bg-white/20 text-white border border-white/10">
                  Try Again
                </button>
              </div>
            )}

            {data && (
              <>
                {/* Profile Header */}
                <div className="card relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="relative">
                      <Image
                        src={data.user.pfp_url || '/default-avatar.svg'}
                        alt={data.user.display_name}
                        width={120}
                        height={120}
                        className="avatar"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-[#020617] p-1.5 rounded-xl border border-white/10 shadow-xl">
                        <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">
                          FC
                        </div>
                      </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        <div>
                          <h2 className="text-4xl font-black text-white mb-1 tracking-tight">
                            {data.user.display_name}
                          </h2>
                          <p className="text-indigo-400 font-bold tracking-wide">
                            @{data.user.username}
                          </p>
                        </div>
                        <div className="flex gap-4 md:ml-auto">
                          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-center min-w-[120px]">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Followers</p>
                            <p className="text-xl font-black text-white">{data.user.follower_count.toLocaleString()}</p>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-center min-w-[120px]">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Following</p>
                            <p className="text-xl font-black text-white">{data.user.following_count.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-400 text-lg max-w-2xl font-medium leading-relaxed">
                        {data.user.bio || 'Professional Farcaster user exploring the ecosystem.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Stats & Insights */}
                  <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <StatsCard
                        title="Real Community"
                        value={data.stats.total_followers.toLocaleString()}
                        icon="👥"
                        subtitle="Total followers on-chain"
                      />
                      <StatsCard
                        title="Active Audience"
                        value={data.stats.active_followers.toLocaleString()}
                        icon="⚡"
                        subtitle={`Analyzed ${data.stats.sample_size} recent followers`}
                      />
                      <StatsCard
                        title="Engagement"
                        value={`${data.stats.activity_rate}%`}
                        icon="📈"
                        subtitle="Engagement rate in sample"
                      />
                      <StatsCard
                        title="Influencers"
                        value={data.stats.power_user_count}
                        icon="🌟"
                        subtitle="Power users in your network"
                      />
                    </div>

                    {/* Top Active Followers Section */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">🔥</span>
                          Top Engagers
                        </h3>
                        <div className="flex gap-1.5 p-1 bg-slate-900 border border-white/5 rounded-xl">
                          {[7, 14, 30].map((days) => (
                            <button
                              key={days}
                              onClick={() => setTimeRange(days as 7 | 14 | 30)}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === days
                                ? 'bg-indigo-500 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white'
                                }`}
                            >
                              {days}d
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.active_followers.slice(0, 10).map((follower) => (
                          <FollowerCard key={follower.fid} follower={follower} />
                        ))}
                        {data.active_followers.length === 0 && (
                          <div className="col-span-2 card border-dashed border-white/10 bg-transparent py-12 text-center text-slate-500 font-medium">
                            No recent activity found in the selected time range.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar - Power Users */}
                  <div className="space-y-8">
                    <div className="card h-full">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 text-sm">👑</span>
                        Power Followers
                      </h3>
                      <div className="space-y-5">
                        {data.power_users.map((pu) => (
                          <div key={pu.fid} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-3 rounded-2xl transition-colors -mx-3">
                            <Image
                              src={pu.pfp_url || '/default-avatar.svg'}
                              alt={pu.username}
                              width={48}
                              height={48}
                              className="rounded-xl border border-white/10"
                            />
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm font-bold text-white truncate">{pu.display_name}</p>
                              <p className="text-xs text-indigo-400 font-medium">@{pu.username}</p>
                              <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tight">
                                {pu.follower_count.toLocaleString()} followers
                              </p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              →
                            </div>
                          </div>
                        ))}
                        {data.power_users.length === 0 && (
                          <p className="text-sm text-slate-500 font-medium text-center py-8">
                            No power users found in the sample.
                          </p>
                        )}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Engagement Tips</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-xs text-slate-400 font-medium">
                            💡 Replying to <span className="text-indigo-400">@{data.power_users[0]?.username || 'power users'}</span> can help boost your reach.
                          </div>
                          <div className="p-3 bg-purple-500/5 rounded-xl border border-purple-500/10 text-xs text-slate-400 font-medium">
                            ⚡ Your engagement rate is <span className="text-purple-400">{data.stats.activity_rate}%</span>. Try casting more in niches!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-10 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm font-semibold tracking-wide flex items-center justify-center gap-2">
            Built for the <span className="text-indigo-400">Farcaster</span> economy
          </p>
        </div>
      </footer>
    </div>
  )
}
