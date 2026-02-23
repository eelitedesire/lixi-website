# Product Images Setup

## Required Images

Place product photos in `public/images/products/` with these exact filenames:

1. **lixi-stack-48v.jpg** - LIXI Stack 48V battery system
2. **lixi-pro-rack-192v.jpg** - LIXI Pro Rack 192V system  
3. **lixi-mega-400v.jpg** - LIXI Mega 400V cabinet

## Image Specifications

- **Format**: JPG or PNG
- **Dimensions**: 1200x800px minimum (3:2 aspect ratio)
- **File size**: < 500KB each (optimize for web)
- **Background**: Clean, professional (white or neutral)
- **Angle**: Front or 3/4 view showing full product

## Quick Setup

```bash
# Place your images here:
public/images/products/lixi-stack-48v.jpg
public/images/products/lixi-pro-rack-192v.jpg
public/images/products/lixi-mega-400v.jpg
```

## Temporary Placeholder

Until you add real photos, the site will show:
- Gray placeholder boxes with proper aspect ratio
- All functionality works normally
- Images load with lazy loading when added

## Where Images Appear

Product images display on:
- ✅ Home page (product cards)
- ✅ Products page (product grid)
- ✅ Product detail pages (hero image)

## Image Optimization Tips

```bash
# Optimize images before adding (optional)
# Using ImageMagick:
convert input.jpg -resize 1200x800^ -gravity center -extent 1200x800 -quality 85 output.jpg

# Or use online tools:
# - TinyPNG.com
# - Squoosh.app
# - ImageOptim (Mac)
```

## Alternative: Use Placeholder Service

For testing, you can temporarily use placeholder images:

Edit `src/data/products.ts` and change image URLs to:
```typescript
image: 'https://placehold.co/1200x800/1a1f1b/00c853?text=LIXI+Stack'
```

But replace with real photos before production deployment.
