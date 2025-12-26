import { NextRequest, NextResponse } from 'next/server'
import { getUserByAddress, getUserByFid, getFollowers, analyzeFollowerActivity, FarcasterUser } from '@/lib/neynar'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const address = searchParams.get('address')
    const fidParam = searchParams.get('fid')
    const days = parseInt(searchParams.get('days') || '7')

    if (!address && !fidParam) {
        return NextResponse.json(
            { error: 'Address or FID parameter is required' },
            { status: 400 }
        )
    }

    try {
        let user: FarcasterUser | null = null

        if (fidParam) {
            user = await getUserByFid(parseInt(fidParam))
        } else if (address) {
            user = await getUserByAddress(address)
        }

        if (!user) {
            const idType = fidParam ? `FID ${fidParam}` : `address ${address}`
            return NextResponse.json(
                { error: `No Farcaster profile found for ${idType}` },
                { status: 404 }
            )
        }

        // Get followers
        const followers = await getFollowers(user.fid, 100)

        // Analyze follower activity
        const activeFollowers = await analyzeFollowerActivity(followers, days)

        return NextResponse.json({
            user: {
                fid: user.fid,
                username: user.username,
                display_name: user.display_name,
                pfp_url: user.pfp_url,
                follower_count: user.follower_count,
                following_count: user.following_count,
                bio: user.bio
            },
            stats: {
                total_followers: followers.length,
                active_followers: activeFollowers.length,
                activity_rate: followers.length > 0
                    ? Math.round((activeFollowers.length / followers.length) * 100)
                    : 0
            },
            active_followers: activeFollowers
        })
    } catch (error) {
        console.error('Error fetching dashboard data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard data' },
            { status: 500 }
        )
    }
}
