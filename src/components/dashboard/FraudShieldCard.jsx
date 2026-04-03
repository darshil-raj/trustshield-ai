import { motion } from 'framer-motion';
import { Shield, CheckCircle, MapPin, Activity, Wifi, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FraudShieldCard = () => {
  const navigate = useNavigate();

  const checks = [
    { icon: MapPin, label: 'GPS matches delivery zone', status: 'verified' },
    { icon: Activity, label: 'Movement detected', status: 'verified' },
    { icon: Wifi, label: 'Weather verified', status: 'verified' },
    { icon: Lock, label: 'No suspicious patterns', status: 'verified' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-success-dim/30 to-surface border border-success/20 rounded-2xl p-5 relative overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-success/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-success/20 rounded-xl border border-success/30">
              <Shield size={20} className="text-success" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary">Fraud Shield Status</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-success">LOW RISK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Checks */}
        <div className="space-y-2.5 mb-4">
          {checks.map((check, index) => {
            const Icon = check.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2.5"
              >
                <CheckCircle size={14} className="text-success flex-shrink-0" />
                <Icon size={14} className="text-text-tertiary flex-shrink-0" />
                <span className="text-sm text-text-secondary">{check.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Key Message */}
        <div className="p-3 bg-surface/50 rounded-xl border border-success/10 mb-4">
          <p className="text-xs text-text-secondary leading-relaxed">
            <span className="text-success font-semibold">Multi-signal validation</span> prevents GPS spoofing 
            and coordinated fraud attacks.
          </p>
        </div>

        {/* View Details Link */}
        <button
          onClick={() => navigate('/fraud-shield')}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-success/10 hover:bg-success/20 border border-success/20 rounded-xl text-success text-sm font-medium transition-colors"
        >
          View Full Analysis
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default FraudShieldCard;
