# Vercel Deployment

This project is configured for deployment on Vercel.

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Shijas786/gotcha)

## Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_PROJECT_ID` - Your Reown project ID
- `NEYNAR_API_KEY` - Your Neynar API key

5. Deploy to production:
```bash
vercel --prod
```

## Environment Variables

Make sure to add these in your Vercel project settings:

```
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
NEYNAR_API_KEY=your_neynar_api_key
```

## Auto-Deploy

Once connected to GitHub, Vercel will automatically deploy:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

## Custom Domain

Add your custom domain in Vercel project settings → Domains
