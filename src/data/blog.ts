export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'lifepo4-vs-nmc',
    title: 'LiFePO4 vs NMC: Which Battery Chemistry Wins?',
    excerpt: 'A comprehensive comparison of the two dominant lithium battery chemistries for energy storage applications.',
    category: 'Technology',
    date: '2024-01-15',
    readTime: '8 min',
    content: `
# LiFePO4 vs NMC: Which Battery Chemistry Wins?

When choosing a battery storage system, chemistry matters. The two dominant lithium-ion chemistries are LiFePO4 (Lithium Iron Phosphate) and NMC (Nickel Manganese Cobalt). Here's what you need to know.

## Safety First

LiFePO4 is inherently safer. The phosphate bond is extremely stable and won't release oxygen even under extreme conditions. This means no thermal runaway risk. NMC batteries, while safe when properly managed, can experience thermal runaway if damaged or improperly charged.

## Cycle Life

LiFePO4 batteries deliver 6000-8000+ cycles at 80% depth of discharge. NMC typically offers 2000-3000 cycles. For daily cycling, LiFePO4 lasts 16-22 years vs 5-8 years for NMC.

## Energy Density

NMC wins on energy density, packing more kWh into less space. However, for stationary storage where space isn't critical, this advantage is less relevant than longevity and safety.

## Cost Per Cycle

While NMC may have lower upfront costs, LiFePO4's superior cycle life means lower cost per kWh cycled over the system lifetime. LIXI systems use CATL-certified LiFePO4 cells for maximum value.

## Temperature Performance

LiFePO4 performs better in extreme temperatures. LIXI batteries operate from -30°C to +60°C without degradation. NMC requires more careful thermal management.

## The Verdict

For stationary energy storage, LiFePO4 is the clear winner. Superior safety, longer life, and better temperature performance make it the professional choice. That's why LIXI exclusively uses LiFePO4 chemistry.
    `
  },
  {
    slug: 'mppt-solar-harvest',
    title: 'How MPPT Maximizes Your Solar Harvest',
    excerpt: 'Understanding Maximum Power Point Tracking and why it\'s critical for solar system efficiency.',
    category: 'Solar',
    date: '2024-01-10',
    readTime: '6 min',
    content: `
# How MPPT Maximizes Your Solar Harvest

MPPT (Maximum Power Point Tracking) is the technology that ensures you extract every possible watt from your solar panels. Here's how it works and why it matters.

## The Solar Power Curve

Solar panels have a non-linear power output curve. At any given irradiance level, there's one specific voltage/current combination that produces maximum power. This is the "maximum power point."

## The Problem

As temperature, shading, and irradiance change throughout the day, the maximum power point constantly shifts. A fixed-voltage system would miss this optimal point most of the time.

## The MPPT Solution

MPPT controllers continuously scan the panel's I-V curve and adjust the load to maintain operation at the maximum power point. This happens hundreds of times per second.

## Real-World Gains

MPPT typically improves energy harvest by 20-30% compared to PWM controllers. In cold weather or partial shading, gains can exceed 40%.

## Multiple MPPT Inputs

Advanced inverters offer multiple MPPT inputs, allowing different panel strings to operate independently. This is crucial for complex roof layouts or partial shading scenarios.

## LIXI Compatibility

All LIXI-compatible inverters (DEYE, Victron, Growatt, etc.) include advanced MPPT controllers. When paired with LIXI batteries, you get maximum solar harvest and optimal storage.
    `
  },
  {
    slug: 'electricity-trading-101',
    title: 'Electricity Trading 101: How to Profit from Your Battery',
    excerpt: 'Learn how CARBONOZ automated trading turns your battery into a revenue-generating asset.',
    category: 'Trading',
    date: '2024-01-05',
    readTime: '7 min',
    content: `
# Electricity Trading 101: How to Profit from Your Battery

Your battery isn't just backup power—it's a trading asset. Here's how CARBONOZ electricity trading generates revenue from price arbitrage.

## Price Volatility is Opportunity

Electricity prices fluctuate dramatically throughout the day. Wholesale prices can vary 10x between peak and off-peak hours. This volatility creates profit opportunities.

## The Arbitrage Strategy

CARBONOZ monitors real-time electricity prices across EU markets. When prices are low (typically overnight or during high renewable generation), it buys electricity and charges your battery. When prices spike (peak demand periods), it sells back to the grid.

## Automated Execution

The platform executes trades automatically based on sophisticated algorithms. No manual intervention required. You wake up to profits.

## Real Returns

Typical users see 15-30% annual returns on their battery investment from trading alone. This is in addition to solar self-consumption savings and backup power value.

## Grid Services

Advanced users can participate in frequency regulation and demand response programs for additional revenue streams. CARBONOZ handles all the complexity.

## Requirements

You need: a compatible battery system (all LIXI models qualify), a bidirectional inverter, and a smart meter. CARBONOZ handles market registration and compliance.

## Getting Started

LIXI Mega systems are CARBONOZ-ready out of the box. LIXI Stack and Pro Rack can be enabled with a simple software update. Contact us to register for trading access.
    `
  },
  {
    slug: 'off-grid-vs-grid-tie',
    title: 'Off-Grid vs Grid-Tie: Which System is Right for You?',
    excerpt: 'Comparing the two main solar system architectures to help you make the right choice.',
    category: 'Solar',
    date: '2023-12-28',
    readTime: '9 min',
    content: `
# Off-Grid vs Grid-Tie: Which System is Right for You?

Choosing between off-grid and grid-tie solar is one of the most important decisions in your energy journey. Here's a comprehensive comparison.

## Grid-Tie Systems

Grid-tie systems remain connected to the utility grid. Solar panels generate power during the day, excess goes to the grid (often for credit), and you draw from the grid when needed.

**Advantages:**
- Lower upfront cost (smaller battery needed)
- Net metering credits in many regions
- Grid as unlimited backup
- Simpler installation

**Disadvantages:**
- No power during grid outages (unless you add battery backup)
- Dependent on utility rates and policies
- Limited energy independence

## Off-Grid Systems

Off-grid systems are completely independent from the utility grid. All power comes from solar panels and battery storage, with optional backup generator.

**Advantages:**
- Complete energy independence
- No utility bills ever
- Power in remote locations
- Immune to grid outages

**Disadvantages:**
- Higher upfront cost (larger battery bank required)
- Must size system for worst-case scenarios
- Requires careful energy management
- Generator backup recommended

## The Hybrid Approach

Most LIXI customers choose hybrid systems: grid-connected with substantial battery backup. This provides:
- Energy independence during outages
- CARBONOZ trading revenue
- Net metering benefits
- Flexibility to go off-grid later

## Sizing Considerations

Off-grid requires 3-5 days of battery autonomy. Grid-tie with backup typically needs 1-2 days. LIXI's modular design lets you start small and expand.

## The LIXI Recommendation

For most users, a grid-tie system with LIXI battery backup offers the best of both worlds. You get energy security, trading revenue, and the flexibility to expand toward full independence over time.
    `
  },
  {
    slug: 'catl-battery-cells',
    title: 'CATL: Why We Only Use the World\'s Best Battery Cells',
    excerpt: 'Understanding why CATL cells are the gold standard for energy storage applications.',
    category: 'Technology',
    date: '2023-12-20',
    readTime: '6 min',
    content: `
# CATL: Why We Only Use the World's Best Battery Cells

LIXI systems use CATL-certified cells exclusively. Here's why we're uncompromising on cell quality.

## Who is CATL?

Contemporary Amperex Technology Co. Limited (CATL) is the world's largest battery manufacturer, supplying Tesla, BMW, Volkswagen, and virtually every major EV manufacturer.

## Quality Standards

CATL cells undergo rigorous testing:
- 100% cell screening
- Automated production with zero human handling
- Real-time quality monitoring
- Comprehensive traceability

## Performance Consistency

CATL's manufacturing precision ensures cell-to-cell variation under 1%. This is critical for battery pack longevity and BMS performance.

## Cycle Life Testing

CATL LiFePO4 cells are tested to 8000+ cycles at 90% DoD. Real-world performance often exceeds specifications due to conservative ratings.

## Safety Certification

CATL cells pass the most stringent safety tests including nail penetration, crush, overcharge, and thermal shock. Zero thermal runaway incidents in stationary storage applications.

## Supply Chain Security

CATL's massive scale ensures consistent supply and competitive pricing. This stability protects your investment.

## The LIXI Difference

While some competitors use generic cells to cut costs, LIXI invests in CATL quality. Your system will outlast cheaper alternatives by years, delivering superior total cost of ownership.
    `
  },
  {
    slug: 'deye-hybrid-inverter-setup',
    title: 'A Guide to the DEYE Hybrid Inverter Setup',
    excerpt: 'Step-by-step configuration guide for integrating DEYE inverters with LIXI battery systems.',
    category: 'Installation',
    date: '2023-12-15',
    readTime: '10 min',
    content: `
# A Guide to the DEYE Hybrid Inverter Setup

DEYE hybrid inverters are popular for their reliability and LIXI compatibility. Here's how to configure them for optimal performance.

## Pre-Installation Checklist

Before starting:
- Verify inverter model supports your battery voltage (48V/192V/400V)
- Confirm firmware is up to date
- Prepare CAN or RS485 communication cable
- Review local electrical codes

## Physical Connection

1. Mount inverter on wall with proper clearance
2. Connect DC input from solar panels
3. Connect AC output to distribution panel
4. Connect battery DC cables (observe polarity!)
5. Connect communication cable (CAN recommended)

## Communication Setup

LIXI batteries use Pylontech protocol for 48V systems and standard CAN for high-voltage systems.

**DEYE Settings:**
- Battery Type: Lithium
- Communication: CAN or RS485
- Protocol: Pylontech (for LIXI Stack) or Custom (for Pro Rack/Mega)
- Battery Voltage: Match your LIXI system

## Charge Parameters

Configure charge settings to match LIXI specifications:
- Bulk Charge Voltage: 54.0V (48V) / 233.6V (192V) / 408.8V (400V)
- Float Voltage: 53.0V (48V) / 225.6V (192V) / 396.8V (400V)
- Max Charge Current: Per LIXI BMS limits
- Temperature Compensation: Enabled

## Discharge Parameters

- Low Voltage Cutoff: 46.0V (48V) / 160V (192V) / 280V (400V)
- Max Discharge Current: Per LIXI BMS limits
- Discharge Priority: Battery First (for self-consumption)

## Grid Settings

Configure grid interaction:
- Grid Charge: Enabled (for CARBONOZ trading)
- Feed-in: Enabled (if net metering available)
- Backup Mode: UPS (for seamless transition)

## Testing

After configuration:
1. Verify BMS communication (check inverter display)
2. Test charge cycle (monitor battery voltage)
3. Test discharge cycle (apply load)
4. Verify backup transition (disconnect grid)

## Monitoring

DEYE inverters provide monitoring via:
- LCD display (real-time data)
- SOLARMAN app (remote monitoring)
- LIXI BMS app (battery-specific data)

## Troubleshooting

Common issues:
- No BMS communication: Check cable and protocol settings
- Charge current limited: Verify BMS temperature sensors
- Inverter error codes: Consult DEYE manual

## Professional Installation

While this guide covers the basics, we recommend professional installation for safety and warranty compliance. Contact your regional LIXI service center for certified installers.
    `
  }
];
