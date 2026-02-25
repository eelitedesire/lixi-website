export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  fields: ProductField[];
}

export interface ProductField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: string[];
}

export const defaultCategories: ProductCategory[] = [
  {
    id: 'batteries',
    name: 'Battery Storage',
    slug: 'batteries',
    fields: [
      { name: 'voltage', label: 'Voltage', type: 'text', required: true },
      { name: 'capacity_kwh', label: 'Capacity (kWh)', type: 'number', required: true },
      { name: 'cells', label: 'Cell Type', type: 'text' },
      { name: 'nominal_voltage', label: 'Nominal Voltage', type: 'text' },
      { name: 'max_current', label: 'Max Current', type: 'text' },
      { name: 'bms', label: 'BMS', type: 'text' },
      { name: 'cycle_life', label: 'Cycle Life', type: 'text' },
      { name: 'weight_kg', label: 'Weight (kg)', type: 'number' },
      { name: 'dimensions_mm', label: 'Dimensions (mm)', type: 'text' },
      { name: 'warranty', label: 'Warranty', type: 'text' }
    ]
  },
  {
    id: 'inverters',
    name: 'Inverters',
    slug: 'inverters',
    fields: [
      { name: 'power_kw', label: 'Power (kW)', type: 'number', required: true },
      { name: 'input_voltage', label: 'Input Voltage', type: 'text' },
      { name: 'output_voltage', label: 'Output Voltage', type: 'text' },
      { name: 'efficiency', label: 'Efficiency (%)', type: 'text' },
      { name: 'mppt_trackers', label: 'MPPT Trackers', type: 'number' },
      { name: 'max_pv_input', label: 'Max PV Input', type: 'text' },
      { name: 'grid_type', label: 'Grid Type', type: 'select', options: ['On-Grid', 'Off-Grid', 'Hybrid'] },
      { name: 'weight_kg', label: 'Weight (kg)', type: 'number' },
      { name: 'dimensions_mm', label: 'Dimensions (mm)', type: 'text' },
      { name: 'warranty', label: 'Warranty', type: 'text' }
    ]
  },
  {
    id: 'solar-panels',
    name: 'Solar Panels',
    slug: 'solar-panels',
    fields: [
      { name: 'wattage', label: 'Wattage (W)', type: 'number', required: true },
      { name: 'efficiency', label: 'Efficiency (%)', type: 'text' },
      { name: 'cell_type', label: 'Cell Type', type: 'select', options: ['Monocrystalline', 'Polycrystalline', 'Thin Film'] },
      { name: 'voltage_voc', label: 'Open Circuit Voltage (Voc)', type: 'text' },
      { name: 'current_isc', label: 'Short Circuit Current (Isc)', type: 'text' },
      { name: 'temperature_coefficient', label: 'Temperature Coefficient', type: 'text' },
      { name: 'weight_kg', label: 'Weight (kg)', type: 'number' },
      { name: 'dimensions_mm', label: 'Dimensions (mm)', type: 'text' },
      { name: 'warranty', label: 'Warranty', type: 'text' }
    ]
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    fields: [
      { name: 'compatibility', label: 'Compatible With', type: 'text' },
      { name: 'specifications', label: 'Specifications', type: 'textarea' },
      { name: 'warranty', label: 'Warranty', type: 'text' }
    ]
  }
];
