import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Shield, Clock, IndianRupee } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const IncomeLossEstimator = ({ 
  dailyEarnings = 800, 
  hoursLost = 3, 
  payoutAmount = 400,
  triggerName = 'Heavy Rain'
}) => {
  const hourlyRate = dailyEarnings / 10; // Assuming 10-hour work day
  const incomeLoss = Math.round(hourlyRate * hoursLost);
  const coverageAmount = Math.min(payoutAmount, incomeLoss);
  const protectionPercentage = Math.round((coverageAmount / incomeLoss) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-surface to-surface-2 border border-accent/20 rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-accent-dim rounded-xl">
            <IndianRupee size={22} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Income Impact Today</h3>
            <p className="text-sm text-text-secondary">Real-time loss calculation</p>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-surface/50 rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-text-secondary mb-1">
              <TrendingUp size={14} />
              <span className="text-xs">Verified Daily Income</span>
            </div>
            <p className="text-2xl font-bold text-text-primary font-mono">
              {formatCurrency(dailyEarnings)}
              <span className="text-sm text-text-tertiary font-normal">/day</span>
            </p>
          </div>

          <div className="bg-surface/50 rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-text-secondary mb-1">
              <Clock size={14} />
              <span className="text-xs">Hours Lost</span>
            </div>
            <p className="text-2xl font-bold text-error font-mono">
              {hoursLost} hrs
            </p>
            <p className="text-xs text-text-tertiary">Due to {triggerName}</p>
          </div>
        </div>

        {/* Loss vs Coverage */}
        <div className="bg-surface rounded-xl p-5 border border-border mb-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-text-secondary mb-1">Verified Income Impact</p>
              <p className="text-3xl font-bold text-error font-mono">
                {formatCurrency(incomeLoss)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary mb-1">Payout Amount</p>
              <p className="text-3xl font-bold text-success font-mono">
                {formatCurrency(coverageAmount)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-surface-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${protectionPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute h-full bg-gradient-to-r from-success to-accent rounded-full"
            />
          </div>
        </div>

        {/* Protection Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-success-dim border border-success/30 rounded-xl p-4 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield size={18} className="text-success" />
            <span className="text-success font-semibold">Real-time loss detected!</span>
          </div>
          <p className="text-2xl font-bold text-success">
            {protectionPercentage}% of verified impact covered
          </p>
          <p className="text-sm text-success/80 mt-1">
            Payout triggered after validation: {formatCurrency(coverageAmount)}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IncomeLossEstimator;
