import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Shield, AlertCircle, ArrowRight, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { INSURANCE_PLANS } from '../utils/constants';
import { formatCurrency } from '../utils/helpers';

const PlanSelection = () => {
  const navigate = useNavigate();
  const { actions } = useApp();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPlan = async (plan) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    actions.setPlan(plan);
    actions.addNotification({
      type: 'success',
      title: 'Plan Selected!',
      message: `You've selected the ${plan.name} plan.`
    });
    
    // Initialize demo claims
    actions.initializeDemoData();
    
    navigate('/dashboard');
  };

  const exclusions = [
    'Health or medical expenses',
    'Vehicle damage or repair',
    'Accident or injury coverage',
    'Third-party liability'
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="accent" className="mb-4">
            <Sparkles size={12} />
            Real-Time Verification System
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Choose Your Verification Plan
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Select a plan that fits your risk profile. All payouts are triggered only after 
            multi-signal validation of real-world conditions.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {INSURANCE_PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`
                  h-full relative
                  ${plan.recommended ? 'ring-2 ring-accent' : ''}
                  ${selectedPlan?.id === plan.id ? 'border-accent' : ''}
                `}
                hover={true}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">Recommended</Badge>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
                  <p className="text-text-secondary text-sm mt-1">{plan.description}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-text-primary font-mono">
                      {formatCurrency(plan.weeklyPremium)}
                    </span>
                    <span className="text-text-tertiary">/week</span>
                  </div>
                  <p className="text-sm text-text-tertiary mt-1">
                    Up to {formatCurrency(plan.coverageAmount)} coverage
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-success-dim mt-0.5">
                        <Check size={12} className="text-success" />
                      </div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  variant={selectedPlan?.id === plan.id ? 'primary' : 'secondary'}
                  className="w-full"
                  onClick={() => handleSelectPlan(plan)}
                  loading={isLoading && selectedPlan?.id === plan.id}
                >
                  {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Exclusions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-border rounded-xl p-6 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={20} className="text-warning" />
            <h3 className="font-semibold text-text-primary">What's NOT Covered</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {exclusions.map((exclusion, index) => (
              <div key={index} className="flex items-center gap-2 text-text-secondary">
                <X size={14} className="text-error flex-shrink-0" />
                <span className="text-sm">{exclusion}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-tertiary mt-4">
            This is an income protection plan only. For health and accident coverage, 
            please consult with your platform's insurance partners.
          </p>
        </motion.div>

        {/* Trust Badge */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-text-tertiary">
            <Shield size={16} />
            <span className="text-sm">Don't trust claims. Verify reality.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
