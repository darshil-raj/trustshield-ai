import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const AlertBanner = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mb-6"
      >
        <div className={`
          rounded-xl p-4 border
          ${alert.type === 'payout' 
            ? 'bg-success-dim border-success/30' 
            : 'bg-error-dim border-error/30'
          }
        `}>
          <div className="flex items-start gap-4">
            <div className={`
              p-2 rounded-lg flex-shrink-0
              ${alert.type === 'payout' ? 'bg-success/20' : 'bg-error/20'}
            `}>
              {alert.type === 'payout' ? (
                <CheckCircle className="text-success" size={24} />
              ) : (
                <AlertTriangle className="text-error" size={24} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className={`
                font-semibold
                ${alert.type === 'payout' ? 'text-success' : 'text-error'}
              `}>
                {alert.title}
              </h4>
              <p className="text-sm mt-1 opacity-90">
                {alert.message}
              </p>
              
              {alert.payoutAmount && (
                <div className="flex items-center gap-2 mt-3">
                  <Zap size={16} className="text-success" />
                  <span className="font-mono font-bold text-success">
                    {formatCurrency(alert.payoutAmount)} auto-payout initiated
                  </span>
                </div>
              )}
            </div>
            
            <button 
              onClick={onClose}
              className="flex-shrink-0 p-1 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlertBanner;
