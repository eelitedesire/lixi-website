# Copilot Instructions for LIXI Website

## Project Overview
- **Full-stack solar energy platform**: React + TypeScript frontend (Vite, Tailwind CSS), AWS serverless backend (API Gateway, Lambda, DynamoDB, SES).
- **Frontend**: SPA in `src/` with modular pages, components, hooks, and data files. Animations in `src/animations/` use custom canvas logic.
- **Backend**: AWS Lambda functions in `backend/functions/` (Node.js), orchestrated by SAM (`backend/template.yaml`).

## Key Architectural Patterns
- **Data flow**: Frontend calls REST endpoints via `VITE_API_URL` (from `.env`), handled by API Gateway → Lambda → DynamoDB/SES.
- **State management**: Uses Zustand for global state, React Hook Form + Zod for forms/validation.
- **Content**: Products, blog posts, FAQs, etc. are managed as TypeScript objects in `src/data/`.
- **Routing**: All routes defined in `src/pages/` and mapped in React Router v6.
- **Styling**: Tailwind CSS with custom color palette (see `tailwind.config.js`).

## Developer Workflows
- **Start dev server**: `npm run dev` (Vite, HMR)
- **Build for production**: `npm run build`
- **Lint**: `npm run lint`
- **Test**: `npm run test` (unit), `npm run test:e2e` (E2E, if Playwright/Cypress added)
- **Backend build/deploy**: `cd backend && sam build && sam deploy --guided`
- **Update environment**: Edit `.env` (see README for required vars)

## Project-Specific Conventions
- **Add product/blog/faq/service center**: Edit corresponding file in `src/data/`
- **Canvas animations**: Use `useCanvas` hook and place logic in `src/animations/`
- **Admin pages**: Located in `src/admin/`, follow existing patterns for managers/editors
- **API endpoints**: Extend by adding Lambda in `backend/functions/` and updating `template.yaml`
- **Validation**: Use Zod schemas (see `src/components/ui/Input.tsx` and backend `validation.js`)

## Integration & External Services
- **AWS**: API Gateway, Lambda, DynamoDB, SES, Pinpoint (analytics), Amplify (hosting)
- **Frontend-backend contract**: API URL and region set via `.env` and Amplify Console
- **Email**: SES sender must be verified; see README for setup

## Troubleshooting & Tips
- **Canvas issues**: Check `useCanvas` and ensure refs are attached
- **API errors**: Check CORS, Lambda permissions, CloudWatch logs
- **Build errors**: Clear `node_modules` and Vite cache, check TypeScript

## References
- See `README.md` for full architecture, setup, and workflow details
- Example data: `src/data/products.ts`, `src/data/blog.ts`, `src/data/faqs.ts`
- Backend: `backend/functions/`, `backend/template.yaml`
- Styling: `tailwind.config.js`, `src/styles/globals.css`
