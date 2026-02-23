export interface ServiceCenter {
  region: string;
  flag: string;
  name: string;
  address: string;
  phone?: string;
  email: string;
  url?: string;
  brn?: string;
}

export const serviceCenters: ServiceCenter[] = [
  {
    region: 'EU',
    flag: '🇩🇪',
    name: 'Förner Technik',
    address: 'Hardtstr. 31, 53506 Kesseling, Germany',
    phone: '+49 6940 156966',
    email: 'eu@lixi.de',
  },
  {
    region: 'Africa',
    flag: '🇲🇺',
    name: 'buyAfraction Ltd.',
    address: 'Château La Mare Ronde, Avenue Du Château, 30513 Grand Baie, Mauritius',
    email: 'africa@lixi.de',
    url: 'https://en.solaire.mu',
    brn: 'C20173696',
  },
  {
    region: 'Caribbean',
    flag: '🇰🇾',
    name: 'CAYTECH Ltd.',
    address: 'P.O. BOX 8, 145 Fish Bowl Loop, Cayman Brac, KY2-2201, Cayman Islands',
    email: 'caribbean@lixi.de',
    url: 'https://caytech.biz',
  },
  {
    region: 'Group HQ',
    flag: '🇱🇮',
    name: 'HelioAegis GmbH i.G.',
    address: 'Grossfeld 36, 9492 Eschen, Liechtenstein',
    email: 'info@helioaegis.com',
  },
];
