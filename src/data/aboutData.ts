export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface Value {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image?: string;
  };
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  values: Value[];
  story: {
    title: string;
    paragraphs: string[];
  };
  team: TeamMember[];
  timeline: Milestone[];
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export const defaultAboutData: AboutData = {
  hero: {
    title: 'Powering the Future',
    subtitle: 'of Sustainable Energy',
    description: 'LIXI Energy Systems is a premium provider of lithium battery storage solutions, part of the HelioAegis GmbH group based in Liechtenstein.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&q=85'
  },
  mission: {
    title: 'Our Mission',
    description: 'To accelerate the global transition to renewable energy by providing safe, reliable, and profitable energy storage solutions that empower individuals and businesses to achieve energy independence.'
  },
  vision: {
    title: 'Our Vision',
    description: 'A world where clean, sustainable energy is accessible to everyone, powered by cutting-edge battery technology and intelligent energy management systems.'
  },
  values: [
    { id: '1', icon: 'Zap', title: 'Innovation', description: 'Pushing boundaries with cutting-edge LiFePO4 technology' },
    { id: '2', icon: 'Shield', title: 'Safety', description: 'Industry-leading safety standards in every product' },
    { id: '3', icon: 'Users', title: 'Customer Focus', description: 'Dedicated support across three continents' },
    { id: '4', icon: 'Leaf', title: 'Sustainability', description: 'Committed to environmental responsibility' }
  ],
  story: {
    title: 'Our Story',
    paragraphs: [
      'Founded as part of the HelioAegis GmbH group in Liechtenstein, LIXI Energy Systems emerged from a vision to democratize access to premium energy storage solutions.',
      'We recognized that the future of energy lies not just in generation, but in intelligent storage and distribution. Our team of engineers and energy experts developed the LIXI product line to meet the demanding needs of modern energy consumers.',
      'Today, we serve customers across Europe, Africa, and the Caribbean through our network of dedicated service centers, providing world-class battery storage solutions backed by local expertise and support.'
    ]
  },
  team: [],
  timeline: [
    { id: '1', year: '2020', title: 'Company Founded', description: 'HelioAegis GmbH established in Liechtenstein' },
    { id: '2', year: '2021', title: 'LIXI Brand Launch', description: 'Introduced premium LiFePO4 battery systems' },
    { id: '3', year: '2022', title: 'Global Expansion', description: 'Service centers opened in EU, Africa, and Caribbean' },
    { id: '4', year: '2023', title: 'CARBONOZ Integration', description: 'Launched electricity trading platform' },
    { id: '5', year: '2024', title: '1,200+ Installations', description: 'Reached milestone of systems deployed worldwide' }
  ],
  stats: [
    { value: '1,200+', label: 'Systems Installed' },
    { value: '15 MW', label: 'Total Capacity' },
    { value: '3', label: 'Continents' },
    { value: '99.9%', label: 'Uptime' }
  ]
};
