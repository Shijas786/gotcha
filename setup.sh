#!/bin/bash

echo "🎯 Gotcha - Farcaster Growth Insights Setup"
echo "==========================================="
echo ""

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="20.9.0"

echo "📦 Checking Node.js version..."
echo "Current: v$NODE_VERSION"
echo "Required: v$REQUIRED_VERSION or higher"
echo ""

# Compare versions
if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version is too old!"
    echo ""
    echo "Please upgrade Node.js to v20.9.0 or higher."
    echo ""
    echo "Options:"
    echo "1. Using nvm (recommended):"
    echo "   nvm install 20"
    echo "   nvm use 20"
    echo ""
    echo "2. Download from: https://nodejs.org/"
    echo ""
    exit 1
fi

echo "✅ Node.js version is compatible!"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "🚀 To start the development server, run:"
    echo "   npm run dev"
    echo ""
    echo "Then open http://localhost:3000 in your browser"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
