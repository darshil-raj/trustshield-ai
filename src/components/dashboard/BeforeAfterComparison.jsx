import { motion } from 'framer-motion';
import { X, Check, ArrowRight, TrendingUp, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const BeforeAfterComparison = ({ 
  lossAmount = 500, 
  payoutAmount = 400,
  triggerName = 'Heavy Rain'
}) => {
  const recoveryPercentage = Math.round((payoutAmount / lossAmount) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Subtle Glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-accent-dim rounded-xl">
            <TrendingUp size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Your Protection Impact</h3>
            <p className="text-sm text-text-secondary">See how TrustShield protects your income</p>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Without TrustShield */}
          <div className="bg-error-dim/30 border border-error/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-error/20 rounded-lg">
                <X size={16} className="text-error" />
              </div>
              <span className="font-semibold text-error">Without TrustShield</span>
            </div>
            
            <p className="text-sm text-text-secondary mb-3">
              Lost income due to {triggerName}
            </p>
            
            <p className="text-3xl font-bold text-error font-mono">
              {formatCurrency(lossAmount)}
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              100% income loss
            </p>
          </div>

          {/* With TrustShield */}
          <div className="bg-success-dim/30 border border-success/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-success/20 rounded-lg">
                <Check size={16} className="text-success" />
              </div>
              <span className="font-semibold text-success">With TrustShield</span>
            </div>
            
            <p className="text-sm text-text-secondary mb-3">
              Received instant payout
            </p>
            
            <p className="text-3xl font-bold text-success font-mono">
              {formatCurrency(payoutAmount)}
            </p>
            <p className="text-xs text-text-tertiary mt-1">
              Auto-payout in 24 hours
            </p>
          </div>
        </div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-accent-dim to-accent/5 border border-accent/20 rounded-xl p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/20 rounded-xl">
                <Wallet size={24} className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Income Recovered</p>
                <p className="text-2xl font-bold text-accent">
                  {recoveryPercentage}%
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-text-secondary">You saved</p>
              <p className="text-xl font-bold text-success font-mono">
                {formatCurrency(payoutAmount)}
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-accent/10 flex items-center gap-2 text-sm text-text-secondary">
            <ArrowRight size={14} className="text-accent" />
            <span>
              Without protection, you would have lost <span className="text-error font-semibold">{formatCurrency(lossAmount)}</span> today
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BeforeAfterComparison;
