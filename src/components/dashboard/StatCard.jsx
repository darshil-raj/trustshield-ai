import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = 'accent',
  className = ''
}) => {
  const colorClasses = {
    accent: 'bg-accent-dim text-accent',
    success: 'bg-success-dim text-success',
    error: 'bg-error-dim text-error',
    warning: 'bg-warning-dim text-warning',
    info: 'bg-info-dim text-info'
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`
        bg-surface border border-border rounded-xl p-6
        card-hover
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <h3 className="text-2xl font-bold text-text-primary mt-2">{value}</h3>
          {subtitle && (
            <p className="text-sm text-text-tertiary mt-1">{subtitle}</p>
          )}
          
          {trend && (
            <div className={`flex items-center gap-1 mt-3 text-sm ${
              trend === 'up' ? 'text-success' : 'text-error'
            }`}>
              {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
