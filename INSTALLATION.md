# Installation Verification Checklist

Run through this checklist to ensure everything is set up correctly.

## ✅ Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)

## ✅ Installation Steps

```bash
# 1. Navigate to project
cd /Users/digitalaxis/Desktop/lixi-website

# 2. Install dependencies
npm install

# 3. Verify installation
npm list --depth=0
```

Expected packages:
- react@18.2.0
- react-dom@18.2.0
- react-router-dom@6.21.0
- framer-motion@10.16.16
- tailwindcss@3.4.0
- typescript@5.2.2
- vite@5.0.8
- And 20+ more...

## ✅ Start Development Server

```bash
npm run dev
```

Expected output:
```
VITE v5.0.8  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

## ✅ Browser Tests

Open http://localhost:5173 and verify:

### Homepage (/)
- [ ] Animated particle background loads
- [ ] "SOLAR STORAGE REDEFINED" headline visible
- [ ] Green brand colors throughout
- [ ] Custom cursor follows mouse
- [ ] Floating stats badges animate in
- [ ] Product cards display (3 cards)
- [ ] Scroll animations trigger
- [ ] Footer loads with service centers

### Navigation
- [ ] Navbar is sticky on scroll
- [ ] Navbar becomes solid after scrolling
- [ ] Dropdown menus work (Products, Solutions)
- [ ] Mobile menu works (< 1024px width)
- [ ] "Get Quote" button visible
- [ ] All nav links work

### Products Page (/products)
- [ ] 3 product cards display
- [ ] Comparison table shows
- [ ] Hover effects work on cards
- [ ] Click through to product detail works

### Product Detail (/products/stack-48v)
- [ ] Product name and specs display
- [ ] Technical specifications table loads
- [ ] Compatible inverters show
- [ ] "Request Quote" button works

### Trading Page (/trading)
- [ ] Live price chart displays
- [ ] Chart updates every 5 seconds
- [ ] "How It Works" cards show
- [ ] All content loads

### Technology Page (/technology)
- [ ] Battery Cell animation plays
- [ ] Solar Array animation plays
- [ ] Inverter Flow animation plays
- [ ] All 3 canvases render correctly
- [ ] Animations are smooth (30+ fps)

### Quote Page (/quote)
- [ ] Step 1 form displays
- [ ] Progress bar shows
- [ ] Can navigate between steps
- [ ] Validation works (try submitting empty)
- [ ] Step 4 shows summary
- [ ] Submit shows success message

### Blog Page (/blog)
- [ ] 6 blog posts display
- [ ] Category badges show
- [ ] Click through to post works

### Blog Post (/blog/lifepo4-vs-nmc)
- [ ] Full article content displays
- [ ] Back button works
- [ ] Reading time shows
- [ ] Content is formatted

### FAQ Page (/faq)
- [ ] Category filters work
- [ ] Accordion opens/closes
- [ ] All 24 questions display
- [ ] Search/filter works

### Contact Page (/contact)
- [ ] Contact form displays
- [ ] Service center cards show
- [ ] Form validation works
- [ ] Submit shows toast notification

### About Page (/about)
- [ ] Company info displays
- [ ] Content is readable
- [ ] Links work

### Service Page (/service)
- [ ] Service plan cards display
- [ ] Content loads

### Solutions Pages
- [ ] /solutions shows 3 options
- [ ] /solutions/residential loads
- [ ] /solutions/commercial loads
- [ ] /solutions/industrial loads

### Legal Pages
- [ ] /legal/privacy loads
- [ ] /legal/terms loads

### 404 Page
- [ ] Visit /nonexistent-page
- [ ] Custom 404 displays
- [ ] "Return Home" button works

## ✅ Responsive Design Tests

Test at these breakpoints:

### Mobile (375px)
- [ ] Hamburger menu appears
- [ ] Cards stack vertically
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Forms work

### Tablet (768px)
- [ ] 2-column layouts work
- [ ] Navigation adapts
- [ ] Images scale properly

### Desktop (1440px)
- [ ] Full layout displays
- [ ] Max-width containers center
- [ ] All features accessible

## ✅ Performance Tests

### Lighthouse Audit (Chrome DevTools)
```bash
# Open Chrome DevTools (F12)
# Go to Lighthouse tab
# Run audit
```

Target scores:
- [ ] Performance: > 80
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Canvas Performance
- [ ] Animations run at 30+ fps
- [ ] No lag when scrolling
- [ ] Animations pause when tab hidden
- [ ] Resize window - animations adapt

## ✅ Console Checks

Open browser console (F12) and verify:
- [ ] No red errors
- [ ] No 404s for assets
- [ ] No CORS errors
- [ ] React DevTools detects app

## ✅ Build Test

```bash
npm run build
```

Expected output:
```
vite v5.0.8 building for production...
✓ XXX modules transformed.
dist/index.html                   X.XX kB
dist/assets/index-XXXXX.css      XX.XX kB
dist/assets/index-XXXXX.js      XXX.XX kB
✓ built in XXXms
```

Verify:
- [ ] Build completes without errors
- [ ] dist/ folder created
- [ ] Files are minified

## ✅ Preview Build

```bash
npm run preview
```

- [ ] Production build runs
- [ ] Site works same as dev
- [ ] No console errors

## 🐛 Common Issues

### Issue: Port 5173 in use
**Solution:**
```bash
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Issue: Module not found
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Canvas blank
**Solution:**
- Hard refresh (Cmd+Shift+R)
- Check console for errors
- Verify you're on correct page

### Issue: Styles not loading
**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Issue: TypeScript errors
**Solution:**
```bash
npx tsc --noEmit
# Fix reported errors
```

## ✅ Backend Setup (Optional for Local)

If you want to test backend locally:

```bash
cd backend

# Install dependencies for each function
cd functions/quote && npm install && cd ../..
cd functions/contact && npm install && cd ../..
cd functions/newsletter && npm install && cd ../..

# Start local API
sam local start-api
```

## 📊 Final Checklist

- [ ] All pages load without errors
- [ ] All animations work smoothly
- [ ] Forms validate correctly
- [ ] Navigation works on all devices
- [ ] Console is clean (no errors)
- [ ] Build completes successfully
- [ ] Performance is acceptable
- [ ] Ready for deployment

## 🎉 Success!

If all checks pass, your LIXI Energy Systems website is ready!

**Next Steps:**
1. Review QUICKSTART.md for usage
2. Read DEPLOYMENT.md for going live
3. Check PROJECT_SUMMARY.md for features

**Start Developing:**
```bash
npm run dev
# Edit files in src/
# Changes auto-reload
```

---

**Installation Complete!** ✅

For questions, see README.md or check code comments.
