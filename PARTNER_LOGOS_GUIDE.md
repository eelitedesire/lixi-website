# Partner Logos Setup

## Required Logos

Place partner logos in `public/images/partners/` as SVG files:

1. **carbonoz.svg** - CARBONOZ trading platform
2. **catl.svg** - CATL battery manufacturer
3. **deye.svg** - DEYE inverters
4. **victron.svg** - Victron Energy
5. **forner.svg** - Förner Technik
6. **buyafraction.svg** - buyAfraction Ltd.
7. **caytech.svg** - CAYTECH Ltd.

## Logo Specifications

- **Format**: SVG (vector) preferred, or PNG with transparency
- **Dimensions**: 400x200px (2:1 aspect ratio)
- **Background**: Transparent
- **Colors**: Original brand colors or white/monochrome
- **File size**: < 50KB each

## Quick Setup

```bash
public/images/partners/
├── carbonoz.svg
├── catl.svg
├── deye.svg
├── victron.svg
├── forner.svg
├── buyafraction.svg
└── caytech.svg
```

## Logo Sources

Get official logos from:
- Partner websites (usually in press/media kits)
- Direct request from partners
- Brand guidelines pages

## Temporary Placeholders

Create simple text-based SVG placeholders:

```svg
<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="200" fill="#1a1f1b"/>
  <text x="200" y="100" font-family="Arial" font-size="32" fill="#00c853" text-anchor="middle" dominant-baseline="middle">
    PARTNER NAME
  </text>
</svg>
```

Or use placeholder service temporarily:
```typescript
logo: 'https://placehold.co/400x200/1a1f1b/00c853?text=CARBONOZ'
```

## Design Tips

- Ensure logos are readable on dark backgrounds
- Use white/light versions if available
- Maintain consistent sizing across all logos
- Test visibility at different screen sizes
