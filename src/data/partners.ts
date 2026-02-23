export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: 'Trading' | 'Technology' | 'Distribution';
  description: string;
  website: string;
  country: string;
  flag: string;
}

export const partners: Partner[] = [
  {
    id: 'carbonoz',
    name: 'CARBONOZ',
    logo: '/images/partners/carbonoz.svg',
    category: 'Trading',
    description: 'Leading electricity trading platform enabling automated energy arbitrage across EU markets.',
    website: 'https://carbonoz.com',
    country: 'Germany',
    flag: '🇩🇪',
  },
  {
    id: 'catl',
    name: 'CATL',
    logo: '/images/partners/catl.svg',
    category: 'Technology',
    description: 'World\'s largest battery manufacturer. Exclusive cell supplier for LIXI systems.',
    website: 'https://catl.com',
    country: 'China',
    flag: '🇨🇳',
  },
  {
    id: 'deye',
    name: 'DEYE',
    logo: '/images/partners/deye.svg',
    category: 'Technology',
    description: 'Premium hybrid inverter manufacturer with seamless LIXI battery integration.',
    website: 'https://deye.com',
    country: 'China',
    flag: '🇨🇳',
  },
  {
    id: 'victron',
    name: 'Victron Energy',
    logo: '/images/partners/victron.svg',
    category: 'Technology',
    description: 'Professional power products with certified LIXI compatibility.',
    website: 'https://victronenergy.com',
    country: 'Netherlands',
    flag: '🇳🇱',
  },
  {
    id: 'forner',
    name: 'Förner Technik',
    logo: '/images/partners/forner.svg',
    category: 'Distribution',
    description: 'EU distribution and service center. Expert installation and support.',
    website: null,
    country: 'Germany',
    flag: '🇩🇪',
  },
  {
    id: 'buyafraction',
    name: 'buyAfraction',
    logo: '/images/partners/buyafraction.svg',
    category: 'Distribution',
    description: 'Africa distribution partner. Solar solutions across Mauritius and region.',
    website: 'https://en.solaire.mu',
    country: 'Mauritius',
    flag: '🇲🇺',
  },
  {
    id: 'caytech',
    name: 'CAYTECH',
    logo: '/images/partners/caytech.svg',
    category: 'Distribution',
    description: 'Caribbean distribution partner. Island energy solutions specialist.',
    website: 'https://caytech.biz',
    country: 'Cayman Islands',
    flag: '🇰🇾',
  },
];
