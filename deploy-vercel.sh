#!/bin/bash

echo "🚀 Gotcha - Vercel Deployment Script"
echo "====================================="
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

echo "✅ Vercel CLI is ready!"
echo ""

# Check if user is logged in
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "Please login to Vercel:"
    vercel login
else
    echo "✅ Already logged in to Vercel"
fi

echo ""
echo "📋 Environment Variables Required:"
echo "   - NEXT_PUBLIC_PROJECT_ID (your Reown project ID)"
echo "   - NEYNAR_API_KEY (your Neynar API key)"
echo ""
echo "These will be set in Vercel dashboard after deployment."
echo ""

# Deploy
echo "🚀 Deploying to Vercel..."
echo ""
vercel

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "📝 Next Steps:"
echo "1. Go to your Vercel dashboard"
echo "2. Add environment variables:"
echo "   - NEXT_PUBLIC_PROJECT_ID=812a62e6f9c92367f945c42fbf5ffcf2"
echo "   - NEYNAR_API_KEY=585F5AB6-CC33-482B-9D76-39E80DEB5004"
echo "3. Redeploy or run: vercel --prod"
echo ""
echo "🎉 Your app will be live at: https://gotcha-*.vercel.app"
