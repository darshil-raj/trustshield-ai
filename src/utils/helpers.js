// Format currency in Indian Rupees
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date));
};

// Format time
export const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

// Calculate premium based on risk factors
export const calculatePremium = (zoneRisk, workHours, weatherRisk) => {
  const basePremium = 49;
  
  const riskMultipliers = {
    zone: { low: 1, medium: 1.4, high: 1.9 },
    hours: { part_time: 0.8, full_time: 1, overtime: 1.2 },
    weather: { low: 0.9, medium: 1, high: 1.3 }
  };
  
  const premium = Math.round(
    basePremium * 
    riskMultipliers.zone[zoneRisk] * 
    riskMultipliers.hours[workHours] * 
    riskMultipliers.weather[weatherRisk]
  );
  
  return premium;
};

// Generate unique ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Calculate trust score based on claim history
export const calculateTrustScore = (claims, totalPayouts) => {
  const baseScore = 75;
  const claimPenalty = claims.filter(c => c.status === 'rejected').length * 5;
  const payoutBonus = Math.min(totalPayouts / 1000, 10);
  
  return Math.min(Math.max(baseScore - claimPenalty + payoutBonus, 0), 100);
};

// Get risk level color
export const getRiskColor = (level) => {
  const colors = {
    low: 'success',
    medium: 'warning',
    high: 'error'
  };
  return colors[level] || 'text-secondary';
};

// Simulate AI risk assessment
export const simulateRiskAssessment = (zone, hours) => {
  const zoneRisks = {
    low: { score: 25, label: 'Low Risk' },
    medium: { score: 55, label: 'Moderate Risk' },
    high: { score: 85, label: 'High Risk' }
  };
  
  const hourMultiplier = {
    part_time: 0.8,
    full_time: 1,
    overtime: 1.2
  };
  
  const baseRisk = zoneRisks[zone] || zoneRisks.medium;
  const adjustedScore = Math.min(Math.round(baseRisk.score * hourMultiplier[hours]), 100);
  
  return {
    score: adjustedScore,
    label: adjustedScore < 40 ? 'Low Risk' : adjustedScore < 70 ? 'Moderate Risk' : 'High Risk',
    factors: [
      'Historical weather patterns in zone',
      'Traffic congestion data',
      'Platform order density analysis',
      'Local event calendar monitoring'
    ]
  };
};

// Generate demo claims
export const generateDemoClaims = () => {
  return [
    {
      id: 'CLM001',
      type: 'auto',
      trigger: 'Heavy Rainfall',
      amount: 400,
      status: 'paid',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      processedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'CLM002',
      type: 'auto',
      trigger: 'High AQI',
      amount: 300,
      status: 'paid',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      processedDate: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'CLM003',
      type: 'auto',
      trigger: 'Extreme Heat',
      amount: 350,
      status: 'processing',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
