export interface Project {
  id: string;
  title: string;
  location: string;
  country: string;
  flag: string;
  category: 'Residential' | 'Commercial' | 'Industrial';
  system: string;
  capacity: string;
  image: string;
  images?: string[];
  year: number;
  description: string;
}

export const projects: Project[] = [
  {
    id: 'villa-mauritius',
    title: 'Luxury Villa Solar System',
    location: 'Grand Baie',
    country: 'Mauritius',
    flag: '🇲🇺',
    category: 'Residential',
    system: 'LIXI Stack 48V',
    capacity: '28 kWh',
    image: 'https://en.solaire.mu/assets/images/gallery03/57ecb79a.jpg?v=05a98448',
    year: 2024,
    description: 'Complete off-grid solution with 2x LIXI Stack systems and 12kW solar array for beachfront luxury villa.',
  },
  {
    id: 'hotel-cayman',
    title: 'Boutique Hotel Energy Storage',
    location: 'Cayman Brac',
    country: 'Cayman Islands',
    flag: '🇰🇾',
    category: 'Commercial',
    system: 'LIXI Pro Rack 192V',
    capacity: '61.44 kWh',
    image: 'https://caytech.biz/assets/images/image04.jpg?v=06c01298',
    year: 2024,
    description: '3x Pro Rack systems with CARBONOZ trading, reducing energy costs by 40% for 24-room boutique hotel.',
  },
  {
    id: 'factory-germany',
    title: 'Manufacturing Plant Microgrid',
    location: 'Kesseling',
    country: 'Germany',
    flag: '🇩🇪',
    category: 'Industrial',
    system: 'LIXI Mega 400V',
    capacity: '225 kWh',
    image: 'https://en.solaire.mu/assets/images/gallery02/c524d2b4.jpg?v=05a98448',
    year: 2023,
    description: '2x LIXI Mega systems with 150kW solar, providing 24/7 clean power for precision manufacturing facility.',
  },
  {
    id: 'farm-mauritius',
    title: 'Agricultural Processing Facility',
    location: 'Pamplemousses',
    country: 'Mauritius',
    flag: '🇲🇺',
    category: 'Commercial',
    system: 'LIXI Pro Rack 192V',
    capacity: '40.96 kWh',
    image: 'https://en.solaire.mu/assets/images/image01.jpg?v=05a98448',
    year: 2023,
    description: 'Hybrid system powering cold storage and processing equipment with 99.9% uptime.',
  },
  {
    id: 'residence-germany',
    title: 'Smart Home Energy Hub',
    location: 'Frankfurt',
    country: 'Germany',
    flag: '🇩🇪',
    category: 'Residential',
    system: 'LIXI Stack 48V',
    capacity: '42 kWh',
    image: 'https://media.licdn.com/dms/image/v2/D4D22AQEHMteLLwFvUQ/feedshare-shrink_1280/B4DZv6Zn3ZHEAc-/0/1769432580422?e=1773273600&v=beta&t=Tt2KawzU9-NDn7KpX6fq7bEDVGX95zP16n8m7knfQC4',
    year: 2024,
    description: '3x stacked systems with EV charging integration and full home automation.',
  },
  {
    id: 'resort-cayman',
    title: 'Eco-Resort Power System',
    location: 'Little Cayman',
    country: 'Cayman Islands',
    flag: '🇰🇾',
    category: 'Commercial',
    system: 'LIXI Mega 400V',
    capacity: '112.5 kWh',
    image: 'https://media.licdn.com/dms/image/v2/D4D22AQEmb0hPRoSXAQ/feedshare-shrink_800/B4DZv6ZnbaJMAg-/0/1769432578206?e=1773273600&v=beta&t=sTokD5lGSN1ybOeay3MeOKJ_-00ZYy39szjhVzG4nvA',
    year: 2023,
    description: 'Island resort achieving 85% solar fraction with LIXI Mega and 80kW PV array.',
  },
];
