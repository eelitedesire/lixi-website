export interface ServicePackage {
  id: string;
  region: string;
  flag: string;
  title: string;
  description: string;
  packages: {
    name: string;
    subtitle: string;
    description: string;
    features: string[];
    isAdvanced?: boolean;
  }[];
  serviceCenter: {
    name: string;
    address: string;
    email: string;
    website?: string;
  };
}

export const servicePackages: ServicePackage[] = [
  {
    id: 'europe',
    region: 'Europe',
    flag: '🇪🇺',
    title: 'Solar Energy for Europe',
    description: 'Solar plants lose efficiency and revenue potential over time. We repower existing PV systems by offering turn-key solutions including finance, upgrading inverters, optimizing system design and modernizing monitoring.',
    packages: [],
    serviceCenter: {
      name: 'Förner Technik',
      address: 'Hardtstr. 31, 53506 Kesseling, Germany',
      email: 'eu-office@carbonoz.com',
    },
  },
  {
    id: 'caribbean',
    region: 'Caribbean',
    flag: '🇰🇾',
    title: 'Solar Energy for the Caribbean',
    description: 'CAYTECH Cayman Islands is a CARBONOZ group member and your trustworthy Solar System partner in the Cayman Islands.',
    packages: [
      {
        name: 'SUN LIZZARD',
        subtitle: 'Solar Kit Basic',
        description: 'Ideal for small to medium energy households with 3 split AC units, refrigerator, washer, and water pump.',
        features: [
          'Hybrid MPP Infinisolar On-Grid Inverter',
          '450W Mono Panels',
          'Total PV Power: 6,000 Watts',
          'Works without lithium batteries',
          'Solar Assistant monitoring',
        ],
      },
      {
        name: 'SUN IGUANA',
        subtitle: 'Solar Kit Advanced',
        description: 'For larger households with 5-ton split AC, refrigerator, washer, water pump, and EV charging.',
        features: [
          'Hybrid Growatt or Generac Inverter',
          '450W Mono Panels',
          'Total PV: 8,000W - 50,000W',
          'Stackable LIXI Lithium Battery',
          'Off-grid capable',
          'EV charging ready',
        ],
        isAdvanced: true,
      },
    ],
    serviceCenter: {
      name: 'CAYTECH Ltd.',
      address: 'P.O. BOX 8, 145 Fish Bowl Loop, Cayman Brac, KY2-2201, Cayman Islands',
      email: 'support@caytech.biz',
      website: 'https://caytech.biz',
    },
  },
  {
    id: 'africa',
    region: 'Africa',
    flag: '🇲🇺',
    title: 'Solar Energy for Africa',
    description: 'Solaire Mauritius is a CARBONOZ group member committed to spearheading the renewable energy revolution in Africa.',
    packages: [
      {
        name: 'Solaire 1',
        subtitle: 'Solar Kit Basic',
        description: 'Ideal for small households with 2 air-conditioning devices, refrigerator, washer and water pump.',
        features: [
          'Hybrid MPP or Growatt Inverter',
          '450W Mono Panels',
          'Total PV Power: 5,000 Watts',
          'Works with/without CATL batteries',
          'Solar Assistant monitoring',
          'Charge electric scooter',
        ],
      },
      {
        name: 'Solaire 2',
        subtitle: 'Solar Kit Advanced',
        description: 'For larger households with 3+ AC units, dishwasher, washer, refrigerator, water pump and pool.',
        features: [
          'High Performance Deye Inverter',
          '450W Mono Panels',
          'Total PV: 5,000W - 50,000W',
          'CATL Lithium Battery 14kWh',
          'LIXI Solar Storage',
          'EV charging ready',
          'Off-grid capable',
        ],
        isAdvanced: true,
      },
    ],
    serviceCenter: {
      name: 'buyAfraction Ltd.',
      address: 'Château La Mare Ronde, Avenue Du Château, Chemin Vingt Pieds, 30513 Grand Baie, Mauritius',
      email: 'mu-office@carbonoz.com',
      website: 'https://en.solaire.mu',
    },
  },
];
