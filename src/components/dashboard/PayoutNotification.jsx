import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Wallet, ArrowRight } from 'lucide-react';
import { formatCurrency, formatTime } from '../../utils/helpers';
import Button from '../common/Button';

const PayoutNotification = ({ claim, onClose, onViewClaims }) => {
  return (
    <AnimatePresence>
      {claim && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-surface border border-border rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="w-20 h-20 bg-success-dim rounded-full flex items-center justify-center border-4 border-success/30"
              >
                <CheckCircle size={40} className="text-success" />
              </motion.div>
            </div>
            
            {/* Content */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Parametric Trigger Activated!
              </h3>
              <p className="text-text-secondary">
                {claim.trigger} detected in your zone. Auto-claim generated.
              </p>
            </div>
            
            {/* Payout Amount */}
            <div className="bg-surface-2 rounded-xl p-6 mb-6 text-center border border-border">
              <p className="text-sm text-text-secondary mb-1">Payout Amount</p>
              <p className="text-4xl font-bold text-success font-mono">
                {formatCurrency(claim.amount)}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3 text-sm text-text-tertiary">
                <Wallet size={14} />
                <span>Will be credited within 24 hours</span>
              </div>
            </div>
            
            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Claim ID</span>
                <span className="text-text-primary font-mono">{claim.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Trigger</span>
                <span className="text-text-primary">{claim.trigger}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Time</span>
                <span className="text-text-primary">{formatTime(claim.date)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Status</span>
                <span className="text-warning font-medium capitalize">{claim.status}</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={onClose}
              >
                Close
              </Button>
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={onViewClaims}
                icon={ArrowRight}
              >
                View Claims
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PayoutNotification;
