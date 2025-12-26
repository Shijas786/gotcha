'use client'

import Image from 'next/image'
import { useState } from 'react'

interface FollowerCardProps {
    follower: {
        fid: number
        username: string
        display_name: string
        pfp_url: string
        casts_count: number
        likes_count: number
        replies_count: number
        last_active: string
        activity_score: number
    }
}

export default function FollowerCard({ follower }: FollowerCardProps) {
    const [imgSrc, setImgSrc] = useState(follower.pfp_url || '/default-avatar.svg')

    return (
        <div className="card bg-slate-900/40 border-white/5 hover:border-indigo-500/30 group">
            <div className="flex items-start gap-4">
                <Image
                    src={imgSrc}
                    alt={follower.display_name}
                    width={56}
                    height={56}
                    className="rounded-xl border border-white/10 group-hover:scale-105 transition-transform"
                    onError={() => setImgSrc('/default-avatar.svg')}
                />
                <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-2">
                        <div className="overflow-hidden">
                            <h4 className="text-base font-bold text-white truncate">{follower.display_name}</h4>
                            <p className="text-xs text-indigo-400 font-bold truncate">@{follower.username}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Score</span>
                            <span className="text-sm font-black text-indigo-400">{Math.round(follower.activity_score)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="text-center bg-white/5 rounded-lg py-1.5 border border-white/5">
                            <p className="text-[9px] font-bold text-slate-500 uppercase">Casts</p>
                            <p className="text-xs font-bold text-white">{follower.casts_count}</p>
                        </div>
                        <div className="text-center bg-white/5 rounded-lg py-1.5 border border-white/5">
                            <p className="text-[9px] font-bold text-slate-500 uppercase">Likes</p>
                            <p className="text-xs font-bold text-white">{follower.likes_count}</p>
                        </div>
                        <div className="text-center bg-white/5 rounded-lg py-1.5 border border-white/5">
                            <p className="text-[9px] font-bold text-slate-500 uppercase">Replies</p>
                            <p className="text-xs font-bold text-white">{follower.replies_count}</p>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[10px] font-bold text-slate-500">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                            Active recently
                        </span>
                        <span>FID: {follower.fid}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
