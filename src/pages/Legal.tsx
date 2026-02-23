import { Helmet } from 'react-helmet-async';

export const Privacy = () => (
  <>
    <Helmet><title>Privacy Policy | LIXI</title></Helmet>
    <div className="pt-20 bg-brand-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-24 prose prose-invert">
        <h1 className="font-display text-h2 text-brand-white">Privacy Policy</h1>
        <p className="text-brand-white/70">Last updated: January 2024</p>
        <p className="text-brand-white/70">LIXI Energy Systems respects your privacy. This policy outlines how we collect, use, and protect your personal information.</p>
      </div>
    </div>
  </>
);

export const Terms = () => (
  <>
    <Helmet><title>Terms of Service | LIXI</title></Helmet>
    <div className="pt-20 bg-brand-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-24 prose prose-invert">
        <h1 className="font-display text-h2 text-brand-white">Terms of Service</h1>
        <p className="text-brand-white/70">Last updated: January 2024</p>
        <p className="text-brand-white/70">By using LIXI Energy Systems services, you agree to these terms and conditions.</p>
      </div>
    </div>
  </>
);

export const NotFound = () => (
  <>
    <Helmet><title>404 - Page Not Found | LIXI</title></Helmet>
    <div className="pt-20 bg-brand-black min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-9xl font-display text-brand-green mb-4">404</div>
        <h1 className="font-display text-h3 text-brand-white mb-4">Battery Depleted</h1>
        <p className="text-brand-white/70 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="inline-block bg-brand-green text-brand-black font-bold px-8 py-4 rounded-lg hover:scale-105 transition-transform">
          Return Home
        </a>
      </div>
    </div>
  </>
);
