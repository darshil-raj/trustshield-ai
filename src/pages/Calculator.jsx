import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalculatorIcon, Info, MapPin, Clock, Cloud } from 'lucide-react';
import { usePremiumCalculator } from '../hooks/usePremiumCalculator';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import RiskSlider from '../components/calculator/RiskSlider';
import PremiumDisplay from '../components/calculator/PremiumDisplay';

const zoneOptions = [
  { value: 'low', label: 'Low Risk Zone', shortLabel: 'Low' },
  { value: 'medium', label: 'Medium Risk Zone', shortLabel: 'Medium' },
  { value: 'high', label: 'High Risk Zone', shortLabel: 'High' }
];

const hoursOptions = [
  { value: 'part_time', label: 'Part-time (4-6 hrs)', shortLabel: 'Part' },
  { value: 'full_time', label: 'Full-time (8-10 hrs)', shortLabel: 'Full' },
  { value: 'overtime', label: 'Extended (10+ hrs)', shortLabel: 'OT' }
];

const weatherOptions = [
  { value: 'low', label: 'Low Weather Risk', shortLabel: 'Low' },
  { value: 'medium', label: 'Medium Weather Risk', shortLabel: 'Medium' },
  { value: 'high', label: 'High Weather Risk', shortLabel: 'High' }
];

const Calculator = () => {
  const {
    inputs,
    premium,
    riskAssessment,
    isCalculating,
    updateInput,
    calculate
  } = usePremiumCalculator();

  // Auto-calculate on mount
  useEffect(() => {
    calculate();
  }, []);

  return (
    <div>
      <Header 
        title="Premium Calculator" 
        subtitle="Calculate your personalized weekly premium based on risk factors"
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent-dim rounded-lg">
                <CalculatorIcon size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-text-primary">Risk Assessment</h2>
                <p className="text-sm text-text-secondary">Adjust factors to see premium changes</p>
              </div>
            </div>

            <div className="space-y-8">
              <RiskSlider
                label="Zone Risk Level"
                value={inputs.zoneRisk}
                onChange={(value) => updateInput('zoneRisk', value)}
                options={zoneOptions}
                description="Based on historical weather and traffic data for your area"
              />

              <RiskSlider
                label="Work Hours"
                value={inputs.workHours}
                onChange={(value) => updateInput('workHours', value)}
                options={hoursOptions}
                description="More hours = higher exposure to risk events"
              />

              <RiskSlider
                label="Weather Risk"
                value={inputs.weatherRisk}
                onChange={(value) => updateInput('weatherRisk', value)}
                options={weatherOptions}
                description="Seasonal weather patterns in your region"
              />
            </div>

            <div className="mt-8 p-4 bg-surface-2 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-primary">How it works</p>
                  <p className="text-sm text-text-secondary mt-1">
                    Our AI analyzes multiple risk factors to calculate your personalized premium. 
                    Higher risk zones and longer work hours may increase your premium, 
                    but also provide more comprehensive coverage.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Premium Display */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PremiumDisplay
            premium={premium}
            riskAssessment={riskAssessment}
            isCalculating={isCalculating}
            onCalculate={calculate}
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Card className="text-center p-4" hover={false}>
              <MapPin size={20} className="text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-text-primary">
                {inputs.zoneRisk === 'low' ? '15' : inputs.zoneRisk === 'medium' ? '28' : '42'}
              </p>
              <p className="text-xs text-text-tertiary">Risk Events/Year</p>
            </Card>
            
            <Card className="text-center p-4" hover={false}>
              <Clock size={20} className="text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-text-primary">
                {inputs.workHours === 'part_time' ? '4-6' : inputs.workHours === 'full_time' ? '8-10' : '10+'}
              </p>
              <p className="text-xs text-text-tertiary">Hours/Day</p>
            </Card>
            
            <Card className="text-center p-4" hover={false}>
              <Cloud size={20} className="text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-text-primary">
                {inputs.weatherRisk === 'low' ? '12' : inputs.weatherRisk === 'medium' ? '24' : '36'}
              </p>
              <p className="text-xs text-text-tertiary">Rainy Days/Year</p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Calculator;
