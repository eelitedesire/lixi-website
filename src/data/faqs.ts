export interface FAQ {
  category: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    category: 'General',
    question: 'What is LIXI Energy Systems?',
    answer: 'LIXI Energy Systems is a premium provider of lithium battery storage and solar solutions, offering advanced LiFePO4 systems for residential, commercial, and industrial applications. We specialize in 48V, 192V, and 400V battery systems with CATL-certified cells.'
  },
  {
    category: 'General',
    question: 'Where do you deliver?',
    answer: 'We deliver throughout the EU, Africa (via our Mauritius center), and the Caribbean (via our Cayman Islands center). Contact your regional service center for specific delivery timelines.'
  },
  {
    category: 'General',
    question: 'What is the warranty period?',
    answer: 'All LIXI systems come with a 1-year standard warranty. Extended warranty and Express service plans are available for enhanced coverage and priority support.'
  },
  {
    category: 'General',
    question: 'How long does installation take?',
    answer: 'Typical residential installations take 1-2 days. Commercial and industrial systems may require 3-7 days depending on system size and complexity. Our certified installers handle all aspects of the installation.'
  },
  {
    category: 'Battery',
    question: 'What is LiFePO4 battery chemistry?',
    answer: 'LiFePO4 (Lithium Iron Phosphate) is the safest and most stable lithium battery chemistry. It offers superior thermal stability, longer cycle life (6000-8000+ cycles), and no risk of thermal runaway compared to NMC batteries.'
  },
  {
    category: 'Battery',
    question: 'How long do LIXI batteries last?',
    answer: 'LIXI batteries are rated for 6000-8000+ cycles depending on the model. At one cycle per day, this translates to 16-22 years of service life. Real-world lifespan depends on usage patterns and depth of discharge.'
  },
  {
    category: 'Battery',
    question: 'Can I expand my system later?',
    answer: 'Yes! LIXI Stack systems are modular and stackable up to 14 units. LIXI Pro Rack supports up to 20 parallel systems. LIXI Mega can be configured in multi-cabinet installations for massive capacity.'
  },
  {
    category: 'Battery',
    question: 'What temperature range can LIXI batteries operate in?',
    answer: 'LIXI Stack operates from -30°C to +60°C (discharge) and -5°C to +60°C (charge). LIXI Mega operates from -25°C to +55°C with intelligent thermal management. All systems include BMS temperature protection.'
  },
  {
    category: 'Battery',
    question: 'Are the battery cells replaceable?',
    answer: 'Yes, LIXI Stack features user-replaceable CATL cells. Our Express service plan includes instant cell replacement with 24-hour response time. This extends system life and reduces total cost of ownership.'
  },
  {
    category: 'Battery',
    question: 'What is the depth of discharge (DoD)?',
    answer: 'LIXI batteries support 80-90% DoD depending on the model. The BMS automatically manages DoD to optimize cycle life. You can configure DoD limits via the monitoring interface.'
  },
  {
    category: 'Solar',
    question: 'Do I need solar panels to use LIXI batteries?',
    answer: 'No, LIXI batteries work with or without solar panels. They can store grid electricity during off-peak hours for use during peak times, or participate in CARBONOZ electricity trading without solar.'
  },
  {
    category: 'Solar',
    question: 'Which inverters are compatible?',
    answer: 'LIXI systems are compatible with all major hybrid inverter brands including DEYE, Sunsynk, Growatt, Victron, MPP Solar, GoodWe, SMA, and Solis. We provide pre-configured communication protocols for seamless integration.'
  },
  {
    category: 'Solar',
    question: 'Can LIXI work with my existing solar system?',
    answer: 'Yes! LIXI batteries can be retrofitted to existing solar installations. For systems over 10 years old, our "Repower" program helps modernize your setup with battery storage and CARBONOZ trading capability.'
  },
  {
    category: 'Solar',
    question: 'What is MPPT and why does it matter?',
    answer: 'MPPT (Maximum Power Point Tracking) is a technology that optimizes solar panel output by continuously adjusting voltage and current. All LIXI-compatible inverters include advanced MPPT controllers for maximum energy harvest.'
  },
  {
    category: 'Trading',
    question: 'What is CARBONOZ electricity trading?',
    answer: 'CARBONOZ is an automated electricity trading platform that buys and sells power on your behalf using your battery storage. It monitors real-time electricity prices and executes trades to maximize your revenue.'
  },
  {
    category: 'Trading',
    question: 'How much can I earn from electricity trading?',
    answer: 'Earnings vary based on your location, battery capacity, and local electricity price volatility. Typical users see 15-30% additional returns on their battery investment annually. CARBONOZ provides real-time profit tracking.'
  },
  {
    category: 'Trading',
    question: 'Do I need solar panels for CARBONOZ trading?',
    answer: 'No, CARBONOZ works with battery-only systems. The platform buys electricity when prices are low and sells when prices are high, profiting from price arbitrage regardless of solar generation.'
  },
  {
    category: 'Trading',
    question: 'Is electricity trading legal in my country?',
    answer: 'CARBONOZ currently operates in EU markets where electricity trading is regulated and legal. Availability depends on your country\'s energy market structure. Contact us to check eligibility in your region.'
  },
  {
    category: 'Service',
    question: 'What is included in the Express service plan?',
    answer: 'Express service includes: instant cell replacement, 24-hour response time, remote monitoring with alerts, priority technical support, annual system health checks, and extended warranty coverage.'
  },
  {
    category: 'Service',
    question: 'Can I monitor my system remotely?',
    answer: 'Yes, all LIXI systems include remote monitoring via WiFi, 4G, or LAN connectivity. The mobile app and web dashboard show real-time power flow, battery status, solar production, and trading activity.'
  },
  {
    category: 'Service',
    question: 'What happens if a component fails?',
    answer: 'Standard warranty covers component replacement. Express service plan provides 24-hour response with instant cell replacement. Our service centers stock all critical components for minimal downtime.'
  },
  {
    category: 'Shipping',
    question: 'How are LIXI systems shipped?',
    answer: 'Systems are shipped via freight on pallets with full insurance. Residential systems (LIXI Stack) typically arrive within 2-3 weeks. Commercial and industrial systems are coordinated with your installation schedule.'
  },
  {
    category: 'Shipping',
    question: 'What are the shipping costs?',
    answer: 'Shipping costs vary by destination and system size. EU deliveries start from €200. Contact your regional service center for an exact quote including delivery to your location.'
  },
  {
    category: 'Shipping',
    question: 'Do you handle customs and import duties?',
    answer: 'For EU deliveries, no customs duties apply. For Africa and Caribbean, our regional partners handle all customs clearance. Import duties vary by country and are the responsibility of the buyer.'
  }
];
