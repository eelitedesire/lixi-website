# LIXI Energy Systems - Full-Stack Solar Energy Website

Premium lithium battery storage and solar solutions brand. Production-grade React + TypeScript + Tailwind CSS website with AWS backend.

## 🏗️ Architecture

```
┌─────────────────┐
│   CloudFront    │  CDN + SSL
└────────┬────────┘
         │
┌────────▼────────┐
│  AWS Amplify    │  Frontend Hosting
│  (React SPA)    │
└────────┬────────┘
         │
┌────────▼────────┐
│  API Gateway    │  REST API
└────────┬────────┘
         │
┌────────▼────────┐
│  Lambda Funcs   │  Serverless Backend
│  - quote        │
│  - contact      │
│  - newsletter   │
└────────┬────────┘
         │
    ┌────▼────┬────────────┐
    │         │            │
┌───▼───┐ ┌──▼──┐   ┌─────▼─────┐
│DynamoDB│ │ SES │   │  Pinpoint │
│ (Data) │ │(Mail)│   │(Analytics)│
└────────┘ └─────┘   └───────────┘
```

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS v3** - Utility-first styling
- **Framer Motion** - Animations
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **React Hook Form + Zod** - Form validation
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **React Helmet Async** - SEO meta tags

### Backend (AWS)
- **API Gateway** - REST API endpoints
- **Lambda** - Serverless functions (Node.js)
- **DynamoDB** - NoSQL database
- **SES** - Email service
- **Amplify** - Frontend hosting & CI/CD
- **SAM** - Infrastructure as Code

### Canvas Animations
- **ParticleField** - Hero background with electron/photon simulation
- **BatteryCell** - LiFePO4 cell cross-section with Li+ ion migration
- **SolarArray** - Isometric solar panels with MPPT visualization
- **InverterFlow** - Real-time power flow topology with CARBONOZ trading

## 📁 Project Structure

```
lixi-website/
├── src/
│   ├── animations/          # Canvas animation classes
│   │   ├── BatteryCell.ts
│   │   ├── SolarArray.ts
│   │   ├── InverterFlow.ts
│   │   └── ParticleField.ts
│   ├── components/
│   │   ├── ui/              # Button, Card, Badge, Input
│   │   ├── layout/          # Navbar, Footer, CustomCursor, etc.
│   │   └── sections/        # Reusable page sections
│   ├── pages/               # All route pages
│   ├── hooks/               # useCountUp, useCanvas
│   ├── data/                # products, faqs, blog, serviceCenters
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # Helper functions
│   └── styles/              # Global CSS
├── backend/                 # AWS Lambda functions (separate repo recommended)
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- AWS CLI (for backend deployment)
- AWS SAM CLI (for local Lambda testing)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd lixi-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment variables**
Create `.env` file in root:
```env
VITE_API_URL=http://localhost:3000/api
VITE_AWS_REGION=eu-central-1
VITE_PINPOINT_APP_ID=your-pinpoint-app-id
```

4. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5173`

### Development Commands

```bash
npm run dev          # Start dev server with HMR
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Design System

### Colors
```js
brand: {
  black:    '#060a07',  // Primary background
  green:    '#00c853',  // Primary brand color
  greenDim: '#00963e',  // Hover states
  lime:     '#b8ff00',  // Accents
  white:    '#f0f4ee',  // Text
  grey:     '#1a1f1b',  // Cards
  greyMid:  '#2e342f',  // Borders
}
solar: {
  yellow:  '#ffd600',   // Sun/electrons
  orange:  '#ff6d00',   // Energy flow
  blue:    '#0091ea',   // Solar panels
}
```

### Typography
- **Display**: Bebas Neue (headings, hero text)
- **Body**: DM Sans (paragraphs, UI)
- **Mono**: JetBrains Mono (technical specs)

### Breakpoints
- Mobile: 320px – 767px
- Tablet: 768px – 1023px
- Desktop: 1024px – 1439px
- Wide: 1440px+

## 🌐 Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with hero, products, features |
| `/products` | Products | Product catalog with comparison table |
| `/products/:slug` | ProductDetail | Individual product pages |
| `/solutions` | Solutions | Solutions overview |
| `/solutions/:type` | SolutionDetail | Residential/Commercial/Industrial |
| `/trading` | Trading | CARBONOZ electricity trading platform |
| `/technology` | Technology | Canvas animations + tech deep dive |
| `/service` | Service | Service plans & warranty |
| `/about` | About | Company information |
| `/contact` | Contact | Contact form + service centers |
| `/quote` | Quote | Multi-step quote wizard |
| `/blog` | Blog | Blog index |
| `/blog/:slug` | BlogPost | Individual blog posts |
| `/faq` | FAQ | Accordion FAQ with schema markup |
| `/legal/privacy` | Privacy | Privacy policy |
| `/legal/terms` | Terms | Terms of service |

## 🚢 Deployment

### Frontend (AWS Amplify)

1. **Connect repository to Amplify**
```bash
aws amplify create-app --name lixi-energy --repository <git-url>
```

2. **Configure build settings**
Amplify will auto-detect Vite. Build settings:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

3. **Set environment variables in Amplify Console**
- `VITE_API_URL`
- `VITE_AWS_REGION`
- `VITE_PINPOINT_APP_ID`

4. **Deploy**
```bash
git push origin main
```
Amplify auto-deploys on push.

### Backend (AWS SAM)

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Build SAM application**
```bash
sam build
```

3. **Deploy**
```bash
sam deploy --guided
```

Follow prompts:
- Stack name: `lixi-backend`
- Region: `eu-central-1`
- Confirm changes: Y
- Allow SAM CLI IAM role creation: Y
- Save arguments to config: Y

4. **Note API Gateway URL**
Update frontend `.env` with deployed API URL.

### Database Setup (DynamoDB)

Tables are auto-created by SAM template:
- `lixi-leads` - Quote requests
- `lixi-contacts` - Contact form submissions
- `lixi-newsletter` - Email subscriptions

### Email Setup (SES)

1. **Verify sender email**
```bash
aws ses verify-email-identity --email-address info@lixi.de
```

2. **Move out of sandbox** (for production)
Request production access in SES console to send to any email.

## 📊 Analytics & Monitoring

### AWS Pinpoint
- Track page views
- Monitor user journeys
- A/B testing capabilities

### CloudWatch
- Lambda function logs
- API Gateway metrics
- Error tracking

## 🔒 Security

- All API endpoints use CORS
- Rate limiting via DynamoDB TTL
- Input validation with Zod
- XSS protection via React
- HTTPS enforced via CloudFront
- Environment variables for secrets

## ⚡ Performance

### Optimizations Implemented
- Code splitting with React.lazy()
- Image lazy loading
- Font preconnect & display swap
- Canvas animations pause when tab hidden
- Debounced window resize handlers
- Framer Motion viewport detection
- Bundle size < 200KB gzipped

### Core Web Vitals Targets
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## 🧪 Testing

```bash
# Unit tests (add as needed)
npm run test

# E2E tests (add Playwright/Cypress)
npm run test:e2e
```

## 📝 Content Management

### Adding Products
Edit `src/data/products.ts` and add new product object.

### Adding Blog Posts
Edit `src/data/blog.ts` and add new post object.

### Adding FAQs
Edit `src/data/faqs.ts` and add new FAQ object.

### Updating Service Centers
Edit `src/data/serviceCenters.ts`.

## 🐛 Troubleshooting

### Canvas animations not rendering
- Check browser console for errors
- Ensure `useCanvas` hook is properly initialized
- Verify canvas ref is attached to element

### API calls failing
- Check CORS configuration in API Gateway
- Verify Lambda function permissions
- Check CloudWatch logs for errors

### Build errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check TypeScript errors: `npx tsc --noEmit`

## 📞 Support

- **Email**: info@helioaegis.com
- **EU**: eu@lixi.de
- **Africa**: africa@lixi.de
- **Caribbean**: caribbean@lixi.de

## 📄 License

Proprietary - HelioAegis GmbH i.G.

## 🙏 Credits

- Design inspired by Sunrun, SunPower, GSL Energy
- CATL battery cells
- CARBONOZ trading platform integration
- Service centers: Förner Technik (DE), buyAfraction (MU), CAYTECH (KY)

---

Built with ⚡ by LIXI Energy Systems
# lixi-website
