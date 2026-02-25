export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  badge?: string;
  image?: string;
}

export interface ServiceRegion {
  id: string;
  name: string;
  flag: string;
  title: string;
  subtitle: string;
  description: string[];
  image?: string;
  packages: ServicePackage[];
  contactEmail: string;
  contactPhone?: string;
  address: string;
}

export interface ServicePageSettings {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaUrl: string;
  };
  whyChoose: {
    title: string;
    subtitle: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export const defaultPageSettings: ServicePageSettings = {
  hero: {
    badge: 'Global Solar Solutions',
    title: 'Solar Energy',
    subtitle: 'Across Three Continents',
    description: 'Turn-key solar solutions with LIXI battery storage for Europe, Caribbean, and Africa. Professional installation, monitoring, and lifetime support.',
    ctaText: 'Schedule Consultation',
    ctaUrl: 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt'
  },
  whyChoose: {
    title: 'Why Choose LIXI',
    subtitle: 'Industry-leading technology and support',
    features: [
      { icon: 'Sun', title: 'Premium Components', description: 'CATL batteries, Growatt inverters, 450W panels' },
      { icon: 'Battery', title: 'Scalable Storage', description: 'From 5kWh to 225kWh+ battery capacity' },
      { icon: 'Zap', title: 'Smart Monitoring', description: 'Real-time performance tracking and alerts' }
    ]
  }
};

export const defaultServiceData: ServiceRegion[] = [
  {
    id: 'europe',
    name: 'Europe',
    flag: '🇪🇺',
    title: 'Solar Energy for Europe',
    subtitle: 'Advanced PV System Repowering & BESS Integration',
    description: [
      'Transform aging solar installations into high-performance energy systems. We specialize in repowering existing PV plants with state-of-the-art inverters, optimized system design, and modern monitoring solutions.',
      'By integrating Battery Energy Storage Systems (BESS), we unlock new revenue streams through energy trading, peak shaving, and enhanced self-consumption capabilities.'
    ],
    contactEmail: 'eu-office@carbonoz.com',
    address: 'Hardtstr. 31, 53506 Kesseling, Germany',
    packages: []
  },
  {
    id: 'caribbean',
    name: 'Caribbean',
    flag: '🇰🇾',
    title: 'Solar Energy for the Caribbean',
    subtitle: 'Hybrid Solar Systems for Island Living',
    description: [
      'CAYTECH Cayman Islands delivers reliable on-grid and off-grid solar hybrid systems with premium LIXI battery storage. Make your electricity bill enjoyable again.',
      'Experience energy independence with our eco-friendly solutions designed specifically for Caribbean climate and lifestyle.'
    ],
    contactEmail: 'support@caytech.biz',
    contactPhone: '+1 (345) 948-1234',
    address: 'P.O. BOX 8, 145 Fish Bowl Loop, Cayman Brac, KY2-2201',
    packages: [
      {
        id: 'sun-lizzard',
        name: 'SUN LIZZARD',
        description: 'Perfect for small to medium households with 3 AC units, refrigerator, washer, and water pump.',
        price: 6000,
        features: [
          'Hybrid MPP Infinisolar Inverter',
          '450W Monocrystalline Panels',
          '6,000W Total PV Power',
          'Grid-tied with battery backup',
          'Solar Assistant Monitoring'
        ]
      },
      {
        id: 'sun-iguana',
        name: 'SUN IGUANA',
        description: 'Advanced system for larger homes with 5-ton AC, EV charging, and complete energy independence.',
        price: 15000,
        badge: 'PREMIUM',
        features: [
          'Hybrid Growatt/Generac Inverter',
          '450W Monocrystalline Panels',
          '8,000W - 50,000W Scalable',
          'Stackable LIXI Lithium Battery',
          'Off-grid Capable',
          'EV Charging Ready'
        ]
      }
    ]
  },
  {
    id: 'africa',
    name: 'Africa',
    flag: '🇲🇺',
    title: 'Solar Energy for Africa',
    subtitle: 'Renewable Energy Revolution with CATL Storage',
    description: [
      'Solaire Mauritius leads the renewable energy transformation across Africa with affordable hybrid systems featuring industry-leading CATL lithium storage.',
      'Join our customers achieving 90% energy self-sufficiency including EV charging. Be part of the decentralized energy future today.'
    ],
    contactEmail: 'mu-office@carbonoz.com',
    address: 'Château La Mare Ronde, Grand Baie, 30513 Mauritius',
    packages: [
      {
        id: 'solaire-1',
        name: 'Solaire 1',
        description: 'Ideal starter system for small households with 2 AC units, refrigerator, washer, and water pump.',
        price: 5000,
        features: [
          'Hybrid MPP/Growatt Inverter',
          '450W Monocrystalline Panels',
          '5,000W Total PV Power',
          'Compatible with CATL Batteries',
          'Solar Assistant Monitoring',
          'Electric Scooter Charging'
        ]
      },
      {
        id: 'solaire-2',
        name: 'Solaire 2',
        description: 'Complete energy solution for larger homes with 3+ AC units, pool, and full appliance coverage.',
        price: 12000,
        badge: 'PREMIUM',
        features: [
          'High Performance Deye Inverter',
          '450W Monocrystalline Panels',
          '5,000W - 50,000W Scalable',
          'CATL 14kWh Lithium Battery',
          'LIXI Solar Storage Compatible',
          'EV Charging Ready',
          'Full Off-grid Capability'
        ]
      }
    ]
  }
];
