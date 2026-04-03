// Insurance Plans
export const INSURANCE_PLANS = [
  {
    id: 'low',
    name: 'Starter Shield',
    weeklyPremium: 49,
    coverageAmount: 2000,
    riskLevel: 'Low',
    description: 'Basic protection for low-risk zones',
    features: [
      'Income loss due to heavy rain',
      'Basic AQI coverage',
      '₹2,000 max payout per event',
      'Weekly claim limit: 2'
    ],
    color: 'success'
  },
  {
    id: 'medium',
    name: 'Pro Shield',
    weeklyPremium: 89,
    coverageAmount: 4000,
    riskLevel: 'Medium',
    description: 'Comprehensive coverage for moderate risk',
    features: [
      'All weather triggers covered',
      'AQI & Heat wave protection',
      'Curfew/Strike coverage',
      '₹4,000 max payout per event',
      'Weekly claim limit: 3'
    ],
    color: 'accent',
    recommended: true
  },
  {
    id: 'high',
    name: 'Elite Shield',
    weeklyPremium: 149,
    coverageAmount: 8000,
    riskLevel: 'High',
    description: 'Maximum protection for high-risk zones',
    features: [
      'All triggers with enhanced payout',
      'Flood & Extreme weather',
      'Priority claim processing',
      '₹8,000 max payout per event',
      'Unlimited weekly claims'
    ],
    color: 'warning'
  }
];

// Parametric Triggers
export const TRIGGERS = [
  {
    id: 'rain',
    name: 'Heavy Rainfall',
    icon: 'CloudRain',
    threshold: '> 25mm/hr',
    unit: 'mm/hr',
    currentValue: 32,
    status: 'active',
    description: 'Auto-payout when rainfall exceeds 25mm/hr',
    payoutAmount: 400,
    color: 'info'
  },
  {
    id: 'aqi',
    name: 'Air Quality Index',
    icon: 'Wind',
    threshold: '> 300 AQI',
    unit: 'AQI',
    currentValue: 180,
    status: 'normal',
    description: 'Protection when AQI reaches hazardous levels',
    payoutAmount: 300,
    color: 'warning'
  },
  {
    id: 'heat',
    name: 'Extreme Heat',
    icon: 'Sun',
    threshold: '> 40°C',
    unit: '°C',
    currentValue: 36,
    status: 'normal',
    description: 'Coverage during extreme heat waves',
    payoutAmount: 350,
    color: 'error'
  },
  {
    id: 'curfew',
    name: 'Curfew/Strike',
    icon: 'AlertTriangle',
    threshold: 'Active',
    unit: 'boolean',
    currentValue: 0,
    status: 'normal',
    description: 'Income protection during forced shutdowns',
    payoutAmount: 500,
    color: 'error'
  }
];

// Zones with risk levels
export const ZONES = [
  { id: 'andheri_west', name: 'Andheri West', city: 'Mumbai', riskLevel: 'medium' },
  { id: 'andheri_east', name: 'Andheri East', city: 'Mumbai', riskLevel: 'high' },
  { id: 'bandra', name: 'Bandra', city: 'Mumbai', riskLevel: 'medium' },
  { id: 'dadar', name: 'Dadar', city: 'Mumbai', riskLevel: 'low' },
  { id: 'worli', name: 'Worli', city: 'Mumbai', riskLevel: 'medium' },
  { id: 'borivali', name: 'Borivali', city: 'Mumbai', riskLevel: 'high' },
  { id: 'kandivali', name: 'Kandivali', city: 'Mumbai', riskLevel: 'medium' },
  { id: 'malad', name: 'Malad', city: 'Mumbai', riskLevel: 'high' },
  { id: 'goregaon', name: 'Goregaon', city: 'Mumbai', riskLevel: 'medium' },
  { id: 'jogeshwari', name: 'Jogeshwari', city: 'Mumbai', riskLevel: 'high' }
];

// Platforms
export const PLATFORMS = [
  { id: 'swiggy', name: 'Swiggy', color: '#FC8019' },
  { id: 'zomato', name: 'Zomato', color: '#E23744' }
];

// Work hours options
export const WORK_HOURS = [
  { value: 'part_time', label: 'Part-time (4-6 hrs)', hours: 5 },
  { value: 'full_time', label: 'Full-time (8-10 hrs)', hours: 9 },
  { value: 'overtime', label: 'Extended (10+ hrs)', hours: 11 }
];

// Claim status
export const CLAIM_STATUS = {
  PROCESSING: 'processing',
  PAID: 'paid',
  REJECTED: 'rejected'
};

// Demo user data
export const DEMO_USER = {
  name: 'Arjun Sharma',
  platform: 'swiggy',
  zone: 'andheri_west',
  workHours: 'full_time',
  avatar: 'AS'
};
