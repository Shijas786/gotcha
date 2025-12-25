# 🚀 Quick Start Guide

## Prerequisites Check

Your current Node.js version: **v18.20.8**  
Required version: **v20.9.0 or higher**

⚠️ **You need to upgrade Node.js before running this app!**

## Upgrade Node.js

### Option 1: Using nvm (Recommended)

```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 20
nvm install 20

# Use Node.js 20
nvm use 20

# Verify
node -v  # Should show v20.x.x
```

### Option 2: Direct Download

Download and install from [nodejs.org](https://nodejs.org/)

## Setup & Run

Once you have Node.js 20+:

```bash
# Run the setup script
./setup.sh

# Or manually:
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## First Time Usage

1. Click "Connect Wallet" button
2. Connect your wallet using WalletConnect
3. Make sure your wallet has a Farcaster account linked
4. View your follower insights! 🎉

## Troubleshooting

### "No Farcaster profile found"
- Make sure your wallet address is linked to a Farcaster account
- Try connecting a different wallet

### API Errors
- Check that `.env.local` exists with the API keys
- Verify your internet connection

### Build Errors
- Make sure you're using Node.js 20+
- Delete `node_modules` and `.next` folders
- Run `npm install` again

## Features to Try

1. **View Your Profile** - See your Farcaster stats
2. **Check Activity** - View follower engagement metrics
3. **Filter by Time** - Toggle between 7, 14, and 30 days
4. **Discover Superfans** - See who's most active

## Need Help?

Check the main [README.md](./README.md) for detailed documentation.

---

Built with 💜 for Farcaster
