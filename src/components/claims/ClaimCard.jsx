import { motion } from 'framer-motion';
import { Zap, Clock, CheckCircle, XCircle, CloudRain, Wind, Sun, AlertTriangle } from 'lucide-react';
import Badge from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/helpers';

const triggerIcons = {
  'Heavy Rainfall': CloudRain,
  'High AQI': Wind,
  'Extreme Heat': Sun,
  'Curfew/Strike': AlertTriangle
};

const statusConfig = {
  processing: { 
    icon: Clock, 
    variant: 'warning', 
    label: 'Processing',
    bgColor: 'bg-warning-dim'
  },
  paid: { 
    icon: CheckCircle, 
    variant: 'success', 
    label: 'Paid',
    bgColor: 'bg-success-dim'
  },
  rejected: { 
    icon: XCircle, 
    variant: 'error', 
    label: 'Rejected',
    bgColor: 'bg-error-dim'
  }
};

const ClaimCard = ({ claim }) => {
  const TriggerIcon = triggerIcons[claim.trigger] || Zap;
  const status = statusConfig[claim.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-border rounded-xl p-5 card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${status.bgColor}`}>
            <TriggerIcon size={20} className={`text-${status.variant}`} />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">{claim.trigger}</h4>
            <p className="text-xs text-text-tertiary">{formatDate(claim.date)}</p>
          </div>
        </div>
        
        <Badge variant={status.variant}>
          <StatusIcon size={12} />
          {status.label}
        </Badge>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="text-xs text-text-tertiary mb-1">Verified Payout</p>
          <p className="text-xl font-bold text-text-primary font-mono">
            {formatCurrency(claim.amount)}
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-text-tertiary mb-1">Event ID</p>
          <p className="text-sm font-mono text-text-secondary">{claim.id}</p>
        </div>
      </div>
      
      {claim.type === 'auto' && (
        <div className="mt-4 flex items-center gap-2 text-xs text-text-tertiary">
          <Zap size={12} className="text-accent" />
          <span>System-generated after multi-signal validation</span>
        </div>
      )}
      
      {claim.processedDate && (
        <div className="mt-3 pt-3 border-t border-border text-xs text-text-tertiary">
          Processed on {formatDate(claim.processedDate)}
        </div>
      )}
    </motion.div>
  );
};

export default ClaimCard;
