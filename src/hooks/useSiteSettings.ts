import { useState, useEffect } from 'react';
import { api } from '@/services/api';

export const useSiteSettings = () => {
  const [settings, setSettings] = useState({
    logoUrl: '/images/logo.png',
    siteName: 'LIXI',
    tagline: 'Premium lithium battery storage and solar solutions. Advanced LiFePO4 systems for homes, businesses, and microgrids.',
    linkedinUrl: 'https://linkedin.com',
    ctaButtonText: 'Get Started',
    ctaButtonUrl: '/quote',
    location1Flag: '🇱🇮',
    location1Region: 'EU',
    location1Name: 'HelioAegis GmbH i. G.',
    location1Address: 'Grossfeld 36\n9492 Eschen\nLiechtenstein',
    location2Flag: '🇲🇺',
    location2Region: 'AFRICA',
    location2Name: 'buyAfraction Limited',
    location2Address: 'Château La Mare Ronde\n30513 Grand Baie\nMauritius\nBRN: C20173696',
    location3Flag: '🇰🇾',
    location3Region: 'CARIBBEAN',
    location3Name: 'Caytech Limited',
    location3Address: 'P.O. BOX 8\nCayman Brac\nKY2-2201\nCayman Islands',
    carbonozText: 'Powered by CARBONOZ Smart Buying Platform',
    copyrightText: 'HelioAegis GmbH i.G. All rights reserved.',
  });

  useEffect(() => {
    api.getSiteSettings().then(data => {
      if (data.length > 0) setSettings(data[0]);
    }).catch(() => {});
  }, []);

  return settings;
};
