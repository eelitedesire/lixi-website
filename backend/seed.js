import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const FRONTEND_DATA = path.join(__dirname, '../src/data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const seedData = async () => {
  try {
    // Blog posts
    const blog = await import(path.join(FRONTEND_DATA, 'blog.ts'));
    fs.writeFileSync(path.join(DATA_DIR, 'blog.json'), JSON.stringify(blog.blogPosts.map(p => ({ ...p, id: p.slug })), null, 2));
    console.log('✓ Seeded blog posts');

    // Products
    const products = await import(path.join(FRONTEND_DATA, 'products.ts'));
    fs.writeFileSync(path.join(DATA_DIR, 'products.json'), JSON.stringify(products.products.map(p => ({ ...p, id: p.slug })), null, 2));
    console.log('✓ Seeded products');

    // Service Packages
    const servicePackages = await import(path.join(FRONTEND_DATA, 'servicePackages.ts'));
    fs.writeFileSync(path.join(DATA_DIR, 'services.json'), JSON.stringify(servicePackages.servicePackages, null, 2));
    console.log('✓ Seeded service packages');

    // Projects
    const projects = await import(path.join(FRONTEND_DATA, 'projects.ts'));
    fs.writeFileSync(path.join(DATA_DIR, 'projects.json'), JSON.stringify(projects.projects, null, 2));
    console.log('✓ Seeded projects');

    // Users
    const users = await import(path.join(FRONTEND_DATA, 'users.ts'));
    fs.writeFileSync(path.join(DATA_DIR, 'users.json'), JSON.stringify(users.users, null, 2));
    console.log('✓ Seeded users');

    // Shopping
    const shopping = await import(path.join(FRONTEND_DATA, 'shopping.ts'));
    fs.writeFileSync(path.join(DATA_DIR, 'shopping.json'), JSON.stringify(shopping.shoppingItems, null, 2));
    console.log('✓ Seeded shopping items');

    // Solutions
    const solutions = await import(path.join(FRONTEND_DATA, 'solutions.ts'));
    fs.writeFileSync(path.join(DATA_DIR, 'solutions.json'), JSON.stringify(solutions.solutions, null, 2));
    console.log('✓ Seeded solutions');

    // Partners
    const partners = await import(path.join(FRONTEND_DATA, 'partners.ts'));
    fs.writeFileSync(path.join(DATA_DIR, 'partners.json'), JSON.stringify(partners.partners, null, 2));
    console.log('✓ Seeded partners');

    // Hero
    const heroData = [{
      id: 'hero',
      badge: 'Enterprise Energy Solutions',
      title: 'LIXI Solar &',
      titleHighlight: 'Electricity Storage',
      description: 'Discover the power and reliability of cutting-edge LIXI battery technology. Advanced lithium batteries designed for modern life, offering unmatched safety, longevity, and efficiency.',
      primaryButtonText: 'Get Started',
      primaryButtonUrl: 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt',
      secondaryButtonText: 'Explore Products',
      secondaryButtonUrl: '/products',
      stat1Value: '8000+',
      stat1Label: 'Charge Cycles',
      stat2Value: '112.5',
      stat2Label: 'kWh Max',
      stat3Value: '3',
      stat3Label: 'Continents',
      productName: 'LIXI Stack 48V',
      productSubtitle: 'Residential System',
      productCapacity: '14 kWh',
      productVoltage: '48V',
      productAmperage: '280Ah',
      productCells: 'CATL',
      productImage: '/images/battery-rack.jpg',
    }];
    fs.writeFileSync(path.join(DATA_DIR, 'hero.json'), JSON.stringify(heroData, null, 2));
    console.log('✓ Seeded hero');

    // What We Do
    const whatWeDoData = [
      {
        id: 'solar-storage',
        title: 'SOLAR STORAGE',
        description: 'LiFePO4 battery banks store excess solar energy during the day and power your home at night.',
        image: '/images/solar-panels-roof.jpg',
        icon: 'Battery',
        fullDescription: 'Our advanced LiFePO4 battery systems are specifically designed to maximize your solar investment. Store excess energy generated during peak sunlight hours and use it when you need it most - during evenings, cloudy days, or power outages.\n\nWith CATL premium cells and intelligent BMS, our systems ensure optimal performance and longevity.',
        benefits: [
          'Store up to 112.5 kWh of solar energy',
          '8,000+ charge cycles for 20+ years of use',
          'Seamless integration with existing solar systems',
          'Real-time monitoring via mobile app',
          'Automatic backup during grid outages'
        ],
        bookingUrl: 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt'
      },
      {
        id: 'energy-freedom',
        title: 'ENERGY FREEDOM',
        description: 'Combine solar panels with LIXI batteries to cover 80–100% of your electricity needs.',
        image: '/images/family-home-solar.jpg',
        icon: 'Sun',
        fullDescription: 'Achieve true energy independence with our complete solar + storage solutions. Our systems are designed to maximize self-consumption and minimize grid dependency.\n\nWhether residential, commercial, or industrial, we provide scalable solutions tailored to your energy needs.',
        benefits: [
          'Reduce electricity bills by 60-90%',
          'Protection against rising energy costs',
          'Increase property value',
          'Reduce carbon footprint',
          'Energy security and independence'
        ],
        bookingUrl: 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt'
      },
      {
        id: 'electricity-trading',
        title: 'ELECTRICITY TRADING',
        description: 'CARBONOZ platform enables automated electricity trading. Buy power when prices are low, maximize your savings.',
        image: '/images/energy-trading.jpg',
        icon: 'TrendingDown',
        fullDescription: 'Turn your LIXI battery into a revenue-generating asset with CARBONOZ automated trading platform. Our AI-powered system monitors electricity prices across EU markets 24/7 and executes optimal buy/sell decisions.\n\nEarn 15-30% annual returns while contributing to grid stability.',
        benefits: [
          'Automated 24/7 trading across EU markets',
          '15-30% annual returns on battery investment',
          'No manual intervention required',
          'Real-time price monitoring and execution',
          'Contribute to renewable energy grid stability'
        ],
        bookingUrl: 'https://calendly.com/felix-zuckschwerdt-diplomatic-council/meeting-felix-zuckschwerdt'
      }
    ];
    fs.writeFileSync(path.join(DATA_DIR, 'whatwedo.json'), JSON.stringify(whatWeDoData, null, 2));
    console.log('✓ Seeded what we do');

    // Cell Technology
    const cellTechData = [{
      id: 'celltech',
      badge: 'Cell Technology',
      title: 'Premium CATL Cells',
      description: 'Every LIXI battery uses certified CATL lithium iron phosphate (LiFePO4) cells — the same manufacturer trusted by Tesla, BMW, and Volkswagen.',
      image: '/images/catl-factory.jpg',
      cardLabel: 'CELL SUPPLIER',
      cardTitle: 'CATL',
      cardSubtitle: "World's #1 Battery Manufacturer",
      feature1Icon: '🔒',
      feature1Title: 'Thermal Safe',
      feature1Body: 'LFP chemistry eliminates thermal runaway risk',
      feature2Icon: '♻️',
      feature2Title: '8,000+ Cycles',
      feature2Body: 'More than 20 years of daily cycling',
      feature3Icon: '⚡',
      feature3Title: 'Stable Voltage',
      feature3Body: 'Flat discharge curve from 100% to 20%',
      feature4Icon: '🌱',
      feature4Title: 'Eco-Friendly',
      feature4Body: 'Non-toxic, fully recyclable materials',
    }];
    fs.writeFileSync(path.join(DATA_DIR, 'celltech.json'), JSON.stringify(cellTechData, null, 2));
    console.log('✓ Seeded cell technology');

    // Site Settings
    const siteSettingsData = [{
      id: 'sitesettings',
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
    }];
    fs.writeFileSync(path.join(DATA_DIR, 'sitesettings.json'), JSON.stringify(siteSettingsData, null, 2));
    console.log('✓ Seeded site settings');

    // Footer
    const footerData = [{
      id: 'footer',
      logoUrl: '/images/logo.png',
      siteName: 'LIXI',
      tagline: 'Premium lithium battery storage and solar solutions. Advanced LiFePO4 systems for homes, businesses, and microgrids.',
      socialMedia: [
        { icon: 'Linkedin', url: 'https://linkedin.com' },
        { icon: 'Twitter', url: 'https://twitter.com' },
      ],
      productLinks: [
        { label: 'LIXI Stack 48V', url: '/products/stack-48v' },
        { label: 'LIXI Pro Rack 192V', url: '/products/pro-rack-192v' },
        { label: 'LIXI Mega 400V', url: '/products/mega-400v' },
        { label: 'Compare All', url: '/products' },
      ],
      solutionLinks: [
        { label: 'Residential', url: '/solutions/residential' },
        { label: 'Commercial', url: '/solutions/commercial' },
        { label: 'Industrial', url: '/solutions/industrial' },
      ],
      companyLinks: [
        { label: 'About Us', url: '/about' },
        { label: 'Projects', url: '/projects' },
        { label: 'Partners', url: '/partners' },
        { label: 'Technology', url: '/technology' },
        { label: 'Blog', url: '/blog' },
      ],
      locations: [
        { flag: '🇱🇮', region: 'EU', name: 'HelioAegis GmbH i. G.', address: 'Grossfeld 36\n9492 Eschen\nLiechtenstein' },
        { flag: '🇲🇺', region: 'AFRICA', name: 'buyAfraction Limited', address: 'Grand Baie\nMauritius' },
        { flag: '🇰🇾', region: 'CARIBBEAN', name: 'Caytech Limited', address: 'Cayman Brac\nCayman Islands' },
      ],
      carbonozText: 'Powered by CARBONOZ Smart Buying Platform',
      copyrightText: 'HelioAegis GmbH i.G. All rights reserved.',
    }];
    fs.writeFileSync(path.join(DATA_DIR, 'footer.json'), JSON.stringify(footerData, null, 2));
    console.log('✓ Seeded footer');

    // About
    const about = await import(path.join(FRONTEND_DATA, 'about.ts'));
    fs.writeFileSync(path.join(DATA_DIR, 'about.json'), JSON.stringify(about.aboutSections, null, 2));
    console.log('✓ Seeded about sections');

    // Quotes (empty initially)
    fs.writeFileSync(path.join(DATA_DIR, 'quotes.json'), JSON.stringify([], null, 2));
    console.log('✓ Initialized quotes');

    console.log('\n✅ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
