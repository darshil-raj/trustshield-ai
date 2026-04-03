import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
};

const Alert = ({ 
  type = 'info',
  title,
  message,
  onClose,
  className = ''
}) => {
  const Icon = icons[type];
  
  const variants = {
    success: 'bg-success-dim border-success/30 text-success',
    error: 'bg-error-dim border-error/30 text-error',
    warning: 'bg-warning-dim border-warning/30 text-warning',
    info: 'bg-info-dim border-info/30 text-info'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        rounded-lg border p-4
        ${variants[type]}
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        <Icon size={20} className="mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-medium mb-1">{title}</h4>
          )}
          {message && (
            <p className="text-sm opacity-90">{message}</p>
          )}
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const AlertContainer = ({ alerts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-full max-w-sm">
      <AnimatePresence>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => onRemove(alert.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Alert;
