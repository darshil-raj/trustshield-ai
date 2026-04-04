import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Plus, Minus, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import Card from '../common/Card';

const scoreFactors = [
  { 
    type: 'positive', 
    points: 20, 
    label: 'Consistent delivery activity',
    description: 'Regular work patterns detected over past 30 days'
  },
  { 
    type: 'positive', 
    points: 15, 
    label: 'Weather conditions verified',
    description: 'Independent weather API confirms heavy rainfall in zone'
  },
  { 
    type: 'positive', 
    points: 10, 
    label: 'Normal movement patterns',
    description: 'GPS data shows typical delivery route behavior'
  },
  { 
    type: 'negative', 
    points: -8, 
    label: 'Claim during low activity hours',
    description: 'Event detected during historically slower period'
  },
  { 
    type: 'negative', 
    points: -10, 
    label: 'Minor GPS inconsistency',
    description: 'Brief signal loss during heavy rain (expected)'
  }
];

const TrustScoreBreakdown = ({ score = 77 }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const positiveFactors = scoreFactors.filter(f => f.type === 'positive');
  const negativeFactors = scoreFactors.filter(f => f.type === 'negative');
  const totalPositive = positiveFactors.reduce((sum, f) => sum + f.points, 0);
  const totalNegative = negativeFactors.reduce((sum, f) => sum + f.points, 0);

  return (
    <Card className="relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-dim rounded-lg">
              <Brain size={20} className="text-accent" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                Verification Confidence Score
                <Sparkles size={14} className="text-accent" />
              </h3>
              <p className="text-sm text-text-secondary">Calculated using multi-signal validation including GPS, weather, and behavior</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-text-primary font-mono">{score}</p>
              <p className="text-xs text-text-tertiary">out of 100</p>
            </div>
            {isExpanded ? <ChevronUp size={20} className="text-text-tertiary" /> : <ChevronDown size={20} className="text-text-tertiary" />}
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-border space-y-4">
                {/* Positive Factors */}
                <div>
                  <p className="text-xs font-medium text-success uppercase tracking-wider mb-3">
                    Positive Signals (+{totalPositive})
                  </p>
                  <div className="space-y-2">
                    {positiveFactors.map((factor, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-success-dim/30 rounded-lg border border-success/10"
                      >
                        <Plus size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-text-primary">{factor.label}</span>
                            <span className="text-sm font-bold text-success">+{factor.points}</span>
                          </div>
                          <p className="text-xs text-text-tertiary mt-1">{factor.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Negative Factors */}
                <div>
                  <p className="text-xs font-medium text-error uppercase tracking-wider mb-3">
                    Risk Signals ({totalNegative})
                  </p>
                  <div className="space-y-2">
                    {negativeFactors.map((factor, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (positiveFactors.length + index) * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-error-dim/30 rounded-lg border border-error/10"
                      >
                        <Minus size={16} className="text-error mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-text-primary">{factor.label}</span>
                            <span className="text-sm font-bold text-error">{factor.points}</span>
                          </div>
                          <p className="text-xs text-text-tertiary mt-1">{factor.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Final Score */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between p-4 bg-accent-dim rounded-xl border border-accent/20">
                    <span className="font-semibold text-text-primary">Final Verification Confidence</span>
                    <span className="text-2xl font-bold text-accent font-mono">{score}/100</span>
                  </div>
                  <p className="text-xs text-text-tertiary text-center mt-3">
                    Don't trust claims. Verify reality.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default TrustScoreBreakdown;
