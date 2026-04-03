import { motion } from 'framer-motion';
import { Sparkles, Shield, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import Button from '../common/Button';

const PremiumDisplay = ({ 
  premium, 
  riskAssessment,
  isCalculating,
  onCalculate 
}) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="text-center mb-6">
        <p className="text-sm text-text-secondary mb-2">Your Weekly Premium</p>
        <motion.div
          key={premium}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl font-bold text-text-primary font-mono"
        >
          {formatCurrency(premium)}
          <span className="text-lg text-text-tertiary font-normal">/week</span>
        </motion.div>
      </div>
      
      {riskAssessment && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Risk Score */}
          <div className="bg-surface-2 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">AI Risk Score</span>
              <span className={`
                text-sm font-bold
                ${riskAssessment.score < 40 ? 'text-success' : 
                  riskAssessment.score < 70 ? 'text-warning' : 'text-error'}
              `}>
                {riskAssessment.score}/100
              </span>
            </div>
            <div className="h-2 bg-surface rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${riskAssessment.score}%` }}
                transition={{ duration: 0.5 }}
                className={`
                  h-full rounded-full
                  ${riskAssessment.score < 40 ? 'bg-success' : 
                    riskAssessment.score < 70 ? 'bg-warning' : 'bg-error'}
                `}
              />
            </div>
            <p className="text-xs text-text-tertiary mt-2">{riskAssessment.label}</p>
          </div>
          
          {/* Risk Factors */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
              Assessment Factors
            </p>
            {riskAssessment.factors.map((factor, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                <Sparkles size={14} className="text-accent" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
      <Button
        variant="primary"
        className="w-full mt-6"
        onClick={onCalculate}
        loading={isCalculating}
        icon={Sparkles}
      >
        {riskAssessment ? 'Recalculate' : 'Calculate Premium'}
      </Button>
      
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-text-tertiary">
        <div className="flex items-center gap-1">
          <Shield size={12} />
          <span>Instant coverage</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp size={12} />
          <span>AI-powered pricing</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumDisplay;
