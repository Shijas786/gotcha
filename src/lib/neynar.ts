const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY!
const NEYNAR_BASE_URL = 'https://api.neynar.com/v2'

export interface FarcasterUser {
    fid: number
    username: string
    display_name: string
    pfp_url: string
    follower_count: number
    following_count: number
    bio?: string
    verified_addresses?: {
        eth_addresses: string[]
    }
}

export interface FollowerActivity {
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

export interface ActivityStats {
    total_followers: number
    active_followers: number
    activity_rate: number
}

interface Cast {
    timestamp: string
    parent_hash?: string
    reactions?: {
        likes_count?: number
    }
}

export async function getUserByAddress(address: string): Promise<FarcasterUser | null> {
    try {
        const response = await fetch(
            `${NEYNAR_BASE_URL}/farcaster/user/bulk-by-address?addresses=${address}`,
            {
                headers: {
                    'api_key': NEYNAR_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        )

        if (!response.ok) {
            console.error('Failed to fetch user:', response.statusText)
            return null
        }

        const data = await response.json()

        if (!data || Object.keys(data).length === 0) {
            return null
        }

        const addressData = data[address.toLowerCase()]
        if (!addressData || addressData.length === 0) {
            return null
        }

        return addressData[0]
    } catch (error) {
        console.error('Error fetching user by address:', error)
        return null
    }
}

export async function getUserByFid(fid: number): Promise<FarcasterUser | null> {
    try {
        const response = await fetch(
            `${NEYNAR_BASE_URL}/farcaster/user/bulk?fids=${fid}`,
            {
                headers: {
                    'api_key': NEYNAR_API_KEY,
                    'Content-Type': 'application/json'
                },
                next: { revalidate: 300 } // Cache for 5 minutes
            }
        )

        if (!response.ok) {
            console.error('Failed to fetch user:', response.statusText)
            return null
        }

        const data = await response.json()
        return data.users?.[0] || null
    } catch (error) {
        console.error('Error fetching user by FID:', error)
        return null
    }
}

export async function getFollowers(fid: number, limit: number = 100): Promise<FarcasterUser[]> {
    try {
        const response = await fetch(
            `${NEYNAR_BASE_URL}/farcaster/followers?fid=${fid}&limit=${limit}`,
            {
                headers: {
                    'api_key': NEYNAR_API_KEY,
                    'Content-Type': 'application/json'
                },
                next: { revalidate: 600 } // Cache for 10 minutes
            }
        )

        if (!response.ok) {
            console.error('Failed to fetch followers:', response.statusText)
            return []
        }

        const data = await response.json()
        return data.users || []
    } catch (error) {
        console.error('Error fetching followers:', error)
        return []
    }
}

export async function getUserCasts(fid: number, limit: number = 25): Promise<Cast[]> {
    try {
        const response = await fetch(
            `${NEYNAR_BASE_URL}/farcaster/feed/user/${fid}?limit=${limit}`,
            {
                headers: {
                    'api_key': NEYNAR_API_KEY,
                    'Content-Type': 'application/json'
                },
                next: { revalidate: 300 }
            }
        )

        if (!response.ok) {
            return []
        }

        const data = await response.json()
        return data.casts || []
    } catch (error) {
        console.error('Error fetching user casts:', error)
        return []
    }
}

export async function analyzeFollowerActivity(
    followers: FarcasterUser[],
    daysBack: number = 7
): Promise<FollowerActivity[]> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysBack)

    const activities: FollowerActivity[] = []

    // Process followers in batches to avoid rate limits
    for (const follower of followers.slice(0, 50)) { // Limit to 50 for performance
        try {
            const casts = await getUserCasts(follower.fid, 25)

            let castsCount = 0
            let repliesCount = 0
            let likesCount = 0
            let lastActive = new Date(0)

            casts.forEach((cast: Cast) => {
                const castDate = new Date(cast.timestamp)

                if (castDate > cutoffDate) {
                    if (cast.parent_hash) {
                        repliesCount++
                    } else {
                        castsCount++
                    }

                    if (castDate > lastActive) {
                        lastActive = castDate
                    }
                }

                // Approximate likes from reactions
                if (cast.reactions?.likes_count) {
                    likesCount += cast.reactions.likes_count
                }
            })

            const activityScore = castsCount * 3 + repliesCount * 2 + likesCount * 1

            if (activityScore > 0) {
                activities.push({
                    fid: follower.fid,
                    username: follower.username,
                    display_name: follower.display_name,
                    pfp_url: follower.pfp_url,
                    casts_count: castsCount,
                    likes_count: likesCount,
                    replies_count: repliesCount,
                    last_active: lastActive.toISOString(),
                    activity_score: activityScore
                })
            }
        } catch (error) {
            console.error(`Error analyzing follower ${follower.fid}:`, error)
        }
    }

    // Sort by activity score
    return activities.sort((a, b) => b.activity_score - a.activity_score)
}
