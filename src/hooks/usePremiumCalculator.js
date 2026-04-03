import { useState, useCallback } from 'react';
import { calculatePremium, simulateRiskAssessment } from '../utils/helpers';

export const usePremiumCalculator = () => {
  const [inputs, setInputs] = useState({
    zoneRisk: 'medium',
    workHours: 'full_time',
    weatherRisk: 'medium'
  });
  
  const [premium, setPremium] = useState(89);
  const [riskAssessment, setRiskAssessment] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const updateInput = useCallback((key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  }, []);

  const calculate = useCallback(() => {
    setIsCalculating(true);
    
    // Simulate AI calculation delay
    setTimeout(() => {
      const newPremium = calculatePremium(
        inputs.zoneRisk,
        inputs.workHours,
        inputs.weatherRisk
      );
      
      const assessment = simulateRiskAssessment(
        inputs.zoneRisk,
        inputs.workHours
      );
      
      setPremium(newPremium);
      setRiskAssessment(assessment);
      setIsCalculating(false);
    }, 500);
  }, [inputs]);

  const reset = useCallback(() => {
    setInputs({
      zoneRisk: 'medium',
      workHours: 'full_time',
      weatherRisk: 'medium'
    });
    setPremium(89);
    setRiskAssessment(null);
  }, []);

  return {
    inputs,
    premium,
    riskAssessment,
    isCalculating,
    updateInput,
    calculate,
    reset
  };
};
