# 🚀 Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps.

#### Steps:

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Gotcha Farcaster app"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Import Project"
- Select your GitHub repository
- Add environment variables:
  - `NEXT_PUBLIC_PROJECT_ID`: 812a62e6f9c92367f945c42fbf5ffcf2
  - `NEYNAR_API_KEY`: 585F5AB6-CC33-482B-9D76-39E80DEB5004
- Click "Deploy"

3. **Done!** Your app will be live at `your-app.vercel.app`

#### Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_PROJECT_ID
vercel env add NEYNAR_API_KEY

# Deploy to production
vercel --prod
```

### Option 2: Netlify

1. **Build the app**
```bash
npm run build
```

2. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag and drop the `.next` folder
- Or connect your GitHub repo
- Add environment variables in Netlify dashboard

### Option 3: Railway

1. **Install Railway CLI**
```bash
npm i -g @railway/cli
```

2. **Deploy**
```bash
railway login
railway init
railway up
```

3. **Add environment variables**
```bash
railway variables set NEXT_PUBLIC_PROJECT_ID=812a62e6f9c92367f945c42fbf5ffcf2
railway variables set NEYNAR_API_KEY=585F5AB6-CC33-482B-9D76-39E80DEB5004
```

### Option 4: Docker

1. **Create Dockerfile**
```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

2. **Build and run**
```bash
docker build -t gotcha .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_PROJECT_ID=812a62e6f9c92367f945c42fbf5ffcf2 \
  -e NEYNAR_API_KEY=585F5AB6-CC33-482B-9D76-39E80DEB5004 \
  gotcha
```

## Environment Variables

Make sure to set these in your deployment platform:

```env
NEXT_PUBLIC_PROJECT_ID=812a62e6f9c92367f945c42fbf5ffcf2
NEYNAR_API_KEY=585F5AB6-CC33-482B-9D76-39E80DEB5004
```

⚠️ **Important**: 
- `NEXT_PUBLIC_*` variables are exposed to the browser
- `NEYNAR_API_KEY` is server-side only (safe)

## Custom Domain

### Vercel
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to "Domain settings"
2. Add custom domain
3. Update DNS records

## Performance Optimization

### 1. Enable Caching
The app already has caching configured:
- API responses: 5-10 minutes
- Static assets: Automatic via Next.js

### 2. Image Optimization
Next.js automatically optimizes images from:
- Neynar CDN
- Other allowed domains

### 3. Analytics
Enable Vercel Analytics:
```bash
npm install @vercel/analytics
```

Add to `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Monitoring

### Vercel
- Built-in analytics
- Real-time logs
- Performance insights

### External Options
- [Sentry](https://sentry.io) - Error tracking
- [LogRocket](https://logrocket.com) - Session replay
- [Datadog](https://datadoghq.com) - Full monitoring

## Security Checklist

- ✅ API keys in environment variables
- ✅ Server-side API calls only
- ✅ No sensitive data in client code
- ✅ HTTPS enabled (automatic on Vercel/Netlify)
- ✅ CORS configured properly
- ✅ Rate limiting on API routes (consider adding)

## Post-Deployment

### 1. Test the App
- Connect wallet
- Verify Farcaster profile loads
- Check follower insights
- Test time range filters

### 2. Monitor Performance
- Check load times
- Monitor API response times
- Watch for errors

### 3. Share!
- Share on Farcaster
- Tweet about it
- Add to your portfolio

## Troubleshooting

### Build Fails
- Check Node.js version (must be 20+)
- Verify all dependencies installed
- Check for TypeScript errors

### API Errors
- Verify environment variables are set
- Check Neynar API key is valid
- Monitor rate limits

### Wallet Connection Issues
- Verify Reown project ID is correct
- Check network configuration (Base)
- Test with different wallets

## Scaling Considerations

As your app grows:

1. **Add Rate Limiting**
```typescript
// lib/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})
```

2. **Add Database** (for caching)
- Upstash Redis
- Vercel KV
- PostgreSQL

3. **Add Queue System** (for heavy processing)
- Vercel Queue
- BullMQ
- Inngest

## Cost Estimates

### Vercel (Hobby - Free)
- ✅ Free for personal projects
- ✅ Unlimited bandwidth
- ✅ Automatic SSL
- ✅ Analytics included

### Vercel (Pro - $20/month)
- More team features
- Advanced analytics
- Password protection

### API Costs
- Neynar: Check their pricing
- Reown: Free tier available

## Support

If you encounter issues:
1. Check the logs in your deployment platform
2. Review the [README.md](./README.md)
3. Check [Next.js docs](https://nextjs.org/docs)
4. Review [Reown docs](https://docs.reown.com)

---

**Ready to deploy? Start with Vercel for the easiest experience!** 🚀
