# LIXI Energy Systems - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

```bash
cd /Users/digitalaxis/Desktop/lixi-website
npm install
```

This installs all required packages (~200MB).

### Step 2: Start Development Server (30 seconds)

```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 3: Open in Browser (10 seconds)

Open http://localhost:5173 in your browser.

You should see the LIXI homepage with:
- Animated particle field background
- "SOLAR STORAGE REDEFINED" hero text
- Green brand colors
- Smooth animations

### Step 4: Test Navigation (2 minutes)

Click through these pages to verify everything works:

1. **Products** - See 3 battery systems
2. **Products → LIXI Stack** - View product details
3. **Trading** - See live price chart
4. **Technology** - Watch 3 canvas animations
5. **Quote** - Try the 4-step wizard
6. **Blog** - Browse articles
7. **FAQ** - Test accordion
8. **Contact** - View form

## ✅ What Should Work

### Working Immediately
- ✅ All page navigation
- ✅ All animations
- ✅ Responsive design (resize browser)
- ✅ Custom cursor (move mouse)
- ✅ Hover effects
- ✅ Form validation (try submitting empty forms)
- ✅ Quote wizard flow
- ✅ FAQ accordion
- ✅ Blog posts

### Not Working Yet (Needs Backend)
- ❌ Quote form submission (shows success toast but doesn't save)
- ❌ Contact form submission (shows success toast but doesn't save)
- ❌ Email notifications

## 🎨 Key Features to Test

### 1. Hero Animation
- Move your mouse around the hero section
- Particles should follow/avoid cursor
- Scroll down to see smooth transitions

### 2. Canvas Animations (Technology Page)
- **Battery Cell**: Watch Li+ ions migrate
- **Solar Array**: See sun move and photons fall
- **Inverter Flow**: Observe power flow with animated particles

### 3. Quote Wizard
- Go to `/quote`
- Fill out 4 steps
- See validation errors if you skip fields
- Submit to see success animation

### 4. Responsive Design
- Resize browser window
- Mobile menu appears < 1024px
- Cards stack on mobile
- Text scales appropriately

### 5. Custom Cursor
- Move mouse around
- Hover over buttons/links
- Cursor should scale up on hover

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Canvas animations not showing
- Check browser console (F12)
- Try refreshing the page
- Ensure you're on Technology page

### Styles not loading
```bash
# Rebuild Tailwind
npm run dev
# Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
```

## 📝 Making Changes

### Update Product Data
Edit `src/data/products.ts`

### Add Blog Post
Edit `src/data/blog.ts`

### Change Colors
Edit `tailwind.config.js`

### Modify Pages
Edit files in `src/pages/`

### Add Components
Create in `src/components/`

## 🚢 Ready to Deploy?

See `DEPLOYMENT.md` for full deployment instructions.

Quick version:
1. Push code to Git
2. Deploy backend: `cd backend && sam deploy --guided`
3. Connect Amplify to Git repo
4. Set environment variables
5. Deploy!

## 📚 Documentation

- **README.md** - Full project documentation
- **DEPLOYMENT.md** - Deployment instructions
- **PROJECT_SUMMARY.md** - What's been built

## 🎯 Next Steps

1. ✅ Test all pages locally
2. ✅ Customize content in `src/data/`
3. ✅ Add real product images to `public/`
4. ✅ Update service center info
5. ✅ Deploy backend to AWS
6. ✅ Deploy frontend to Amplify
7. ✅ Test live site

## 💡 Tips

- **Hot Module Replacement**: Changes auto-reload in browser
- **TypeScript**: Hover over variables to see types
- **Console**: Check browser console for errors
- **Network Tab**: Monitor API calls (when backend is deployed)
- **React DevTools**: Install browser extension for debugging

## 🎉 You're Ready!

The site is fully functional for local development. All pages work, animations run smoothly, and the design is production-ready.

When you're ready to go live, follow the deployment guide.

---

**Need Help?**
- Check browser console for errors
- Review code comments
- See README.md for architecture details
- Check DEPLOYMENT.md for AWS setup

**Happy Building! ⚡**
