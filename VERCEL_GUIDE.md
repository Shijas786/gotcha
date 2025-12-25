# 🚀 Vercel Deployment - Complete Guide

## ✅ What's Already Configured

Your project is **100% ready** for Vercel deployment!

### Files Included:
- ✅ `vercel.json` - Vercel configuration
- ✅ `VERCEL.md` - Deployment documentation
- ✅ `deploy-vercel.sh` - Automated deployment script
- ✅ Deploy button in `README.md`
- ✅ Environment variables documented

---

## 🎯 Three Ways to Deploy

### Option 1: One-Click Deploy (Easiest) 🖱️

1. Go to your GitHub repo: https://github.com/Shijas786/gotcha
2. Click the **"Deploy with Vercel"** button in README
3. Follow Vercel's prompts
4. Add environment variables when prompted:
   - `NEXT_PUBLIC_PROJECT_ID` = `812a62e6f9c92367f945c42fbf5ffcf2`
   - `NEYNAR_API_KEY` = `585F5AB6-CC33-482B-9D76-39E80DEB5004`
5. Done! ✅

### Option 2: Automated Script 🤖

```bash
./deploy-vercel.sh
```

This script will:
- Check Vercel CLI installation
- Login to Vercel (if needed)
- Deploy your project
- Show next steps

### Option 3: Manual CLI 💻

```bash
# 1. Login to Vercel
vercel login

# 2. Deploy (preview)
vercel

# 3. Set environment variables in dashboard
# Go to: https://vercel.com/dashboard
# Project Settings → Environment Variables

# 4. Deploy to production
vercel --prod
```

---

## 🔑 Environment Variables

Add these in Vercel Dashboard:

| Variable | Value | Type |
|----------|-------|------|
| `NEXT_PUBLIC_PROJECT_ID` | `812a62e6f9c92367f945c42fbf5ffcf2` | Public |
| `NEYNAR_API_KEY` | `585F5AB6-CC33-482B-9D76-39E80DEB5004` | Secret |

### How to Add:
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each variable
5. Select "Production", "Preview", and "Development"
6. Save

---

## 📊 Deployment Status

After deployment, you'll get:

- **Preview URL**: `https://gotcha-[hash].vercel.app`
- **Production URL**: `https://gotcha-shijas786.vercel.app` (or custom domain)
- **Auto-deploys**: Every push to `main` branch

---

## 🔄 Auto-Deploy Setup

Vercel will automatically deploy when you:

1. **Push to main** → Production deployment
2. **Push to develop** → Preview deployment
3. **Create PR** → Preview deployment
4. **Merge PR** → Production deployment

---

## 🎨 Custom Domain (Optional)

1. Go to Vercel Dashboard
2. Project Settings → Domains
3. Add your domain (e.g., `gotcha.yourdomain.com`)
4. Update DNS records as instructed
5. SSL certificate auto-generated ✅

---

## 🐛 Troubleshooting

### Build Fails?
- Check Node.js version (needs 20+)
- Verify environment variables are set
- Check build logs in Vercel dashboard

### API Errors?
- Verify `NEYNAR_API_KEY` is correct
- Verify `NEXT_PUBLIC_PROJECT_ID` is correct
- Check API key hasn't expired

### Wallet Connection Issues?
- Verify Reown project ID is correct
- Check Base network configuration
- Test with different wallets

---

## 📈 After Deployment

### Test Your App:
1. Visit your Vercel URL
2. Click "Connect Wallet"
3. Connect via WalletConnect
4. Verify Farcaster profile loads
5. Check follower insights

### Monitor:
- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Deployments → View Logs
- **Performance**: Vercel Dashboard → Speed Insights

---

## 🎉 Quick Start Commands

```bash
# Deploy preview
vercel

# Deploy production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Open in browser
vercel open
```

---

## 📝 Deployment Checklist

Before deploying:
- ✅ Code pushed to GitHub
- ✅ Environment variables ready
- ✅ Node.js 20+ specified in `.nvmrc`
- ✅ `vercel.json` configured
- ✅ API keys valid

After deploying:
- ✅ Add environment variables in Vercel
- ✅ Test wallet connection
- ✅ Test Farcaster integration
- ✅ Check all features work
- ✅ Set up custom domain (optional)

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Your GitHub Repo**: https://github.com/Shijas786/gotcha
- **Deploy Button**: In your README.md

---

## 💡 Pro Tips

1. **Preview Deployments**: Every branch gets a preview URL
2. **Environment Variables**: Can be different for production/preview
3. **Analytics**: Free analytics included
4. **Edge Functions**: Automatically optimized
5. **CDN**: Global CDN for fast loading

---

## 🚀 Ready to Deploy?

Choose your method:

**Easiest**: Click the deploy button in README  
**Automated**: Run `./deploy-vercel.sh`  
**Manual**: Run `vercel` command

Your app will be live in minutes! 🎉

---

**Need help?** Check VERCEL.md or Vercel documentation.
