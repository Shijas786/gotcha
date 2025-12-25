# 🎯 Gotcha - Farcaster Growth Insights

A Farcaster-native growth insights app that helps you discover and track your most active followers.

![Gotcha Banner](https://img.shields.io/badge/Built%20for-Farcaster-7C65C1?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Shijas786/gotcha&env=NEXT_PUBLIC_PROJECT_ID,NEYNAR_API_KEY&envDescription=API%20keys%20required%20for%20Reown%20and%20Neynar&envLink=https://github.com/Shijas786/gotcha%23environment-variables)

## ✨ Features

- 🔐 **Wallet Connection** - Seamless wallet connection via Reown (WalletConnect)
- 👤 **Farcaster Profile** - Automatic profile fetching using your connected wallet
- 📊 **Activity Analytics** - Track follower engagement across:
  - 📝 Posts (casts)
  - 💬 Comments (replies)
  - ❤️ Likes and reactions
- ⏰ **Time-based Filtering** - View activity for 7, 14, or 30 days
- 🏆 **Top Active Followers** - Ranked list of your most engaged followers
- 🎨 **Cartoon-friendly UI** - Clean, vibrant, and fun design

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.9.0
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd gotcha
```

2. Install dependencies:
```bash
npm install
```

3. Environment variables are already configured in `.env.local`:
```env
NEXT_PUBLIC_PROJECT_ID=812a62e6f9c92367f945c42fbf5ffcf2
NEYNAR_API_KEY=585F5AB6-CC33-482B-9D76-39E80DEB5004
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Wallet**: Reown AppKit (WalletConnect)
- **Blockchain**: Base Mainnet
- **Farcaster API**: Neynar
- **State Management**: React Hooks + TanStack Query

## 📁 Project Structure

```
gotcha/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── dashboard/
│   │   │       └── route.ts          # Dashboard API endpoint
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout with providers
│   │   └── page.tsx                  # Main dashboard page
│   ├── components/
│   │   ├── Header.tsx                # App header with wallet button
│   │   ├── StatsCard.tsx             # Statistics card component
│   │   ├── FollowerCard.tsx          # Active follower card
│   │   └── LoadingSpinner.tsx        # Loading animation
│   └── lib/
│       ├── appkit.ts                 # Reown AppKit configuration
│       ├── wagmi.ts                  # Wagmi configuration
│       └── neynar.ts                 # Neynar API utilities
├── public/
│   └── default-avatar.svg            # Default avatar image
├── .env.local                        # Environment variables
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Pink gradient (#FF6B9D)
- **Secondary**: Teal (#4ECDC4)
- **Accent**: Yellow (#FFE66D)
- **Purple**: Lavender (#A78BFA)

### Typography
- **Headings**: Fredoka (playful, cartoon-friendly)
- **Body**: Outfit (clean, modern)

### Components
- Rounded corners (12-32px)
- Soft shadows
- Smooth hover animations
- Gradient backgrounds
- Emoji icons for visual appeal

## 🔧 How It Works

1. **Connect Wallet**: User connects their wallet using Reown
2. **Fetch Profile**: App queries Neynar API to get Farcaster profile linked to the wallet address
3. **Get Followers**: Fetches the user's follower list (up to 100)
4. **Analyze Activity**: For each follower, analyzes recent activity:
   - Fetches recent casts
   - Counts posts, replies, and likes
   - Calculates activity score: `posts × 3 + replies × 2 + likes × 1`
5. **Display Insights**: Shows ranked list of active followers with detailed stats

## 📊 Activity Scoring

Followers are ranked by an activity score calculated as:
```
Activity Score = (Posts × 3) + (Replies × 2) + (Likes × 1)
```

This weights posting and engagement more heavily than passive likes.

## 🔐 API Endpoints

### GET `/api/dashboard`

Fetches dashboard data for a connected wallet.

**Query Parameters:**
- `address` (required): Wallet address
- `days` (optional): Time range in days (7, 14, or 30, default: 7)

**Response:**
```json
{
  "user": {
    "fid": 12345,
    "username": "username",
    "display_name": "Display Name",
    "pfp_url": "https://...",
    "follower_count": 1000,
    "following_count": 500,
    "bio": "Bio text"
  },
  "stats": {
    "total_followers": 100,
    "active_followers": 45,
    "activity_rate": 45
  },
  "active_followers": [
    {
      "fid": 67890,
      "username": "active_user",
      "display_name": "Active User",
      "pfp_url": "https://...",
      "casts_count": 10,
      "likes_count": 25,
      "replies_count": 8,
      "last_active": "2025-12-25T10:00:00Z",
      "activity_score": 72
    }
  ]
}
```

## 🚧 Limitations

- Analyzes up to 50 followers (to avoid rate limits)
- Fetches up to 25 recent casts per follower
- Activity analysis is based on observable on-chain Farcaster actions only
- No fake or estimated metrics

## 🔮 Future Enhancements

- [ ] Pagination for more followers
- [ ] Export insights as CSV/PDF
- [ ] Follower growth trends over time
- [ ] Engagement rate comparisons
- [ ] Direct messaging to top followers
- [ ] Customizable activity scoring weights

## 📝 License

MIT License - feel free to use this project for your own Farcaster analytics!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💜 Built for Farcaster

This app is built specifically for the Farcaster community with love and care. All data is fetched from real Farcaster activity - no fake analytics!

---

**Note**: Make sure you have Node.js >= 20.9.0 installed. The current system has Node.js 18.20.8 which is not compatible with Next.js 16.
