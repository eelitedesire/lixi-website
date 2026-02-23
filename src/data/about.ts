export interface AboutContent {
  id: string;
  section: string;
  content: string;
}

export const aboutSections: AboutContent[] = [
  { id: '1', section: 'Mission', content: 'Empowering the world with clean energy.' },
  { id: '2', section: 'Vision', content: 'A sustainable future for all.' },
];
