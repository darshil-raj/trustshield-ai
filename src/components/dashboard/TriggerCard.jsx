import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Wind, Sun, AlertTriangle, Play, CheckCircle, Brain, Cloud, Database, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

const icons = {
  CloudRain,
  Wind,
  Sun,
  AlertTriangle
};

const TriggerCard = ({ 
  trigger,
  onSimulate,
  isSimulating
}) => {
  const Icon = icons[trigger.icon] || CloudRain;
  const [showDetails, setShowDetails] = useState(false);
  
  const isActive = trigger.status === 'active';
  const isTriggered = trigger.status === 'triggered';
  
  const statusColors = {
    normal: 'success',
    active: 'warning',
    triggered: 'error'
  };

  // AI verification data sources
  const dataSources = [
    { icon: Cloud, label: 'Weather API', status: 'connected' },
    { icon: Database, label: 'Zone Risk Model', status: 'connected' },
    { icon: MapPin, label: 'Historical Pattern', status: 'connected' }
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        bg-surface border rounded-xl p-5 relative overflow-hidden
        ${isTriggered ? 'border-error shadow-lg shadow-error/10' : 'border-border card-hover'}
        ${isActive ? 'border-warning shadow-lg shadow-warning/10' : ''}
        ${!isTriggered && !isActive ? 'hover:shadow-xl hover:shadow-accent/5' : ''}
      `}
    >
      {/* Glow Effect for Active/Triggered */}
      {(isActive || isTriggered) && (
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl ${
          isTriggered ? 'bg-error/10' : 'bg-warning/10'
        }`} />
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${
            isTriggered ? 'bg-error-dim text-error' : 
            isActive ? 'bg-warning-dim text-warning' : 
            'bg-surface-2 text-text-secondary'
          }`}>
            <Icon size={22} />
          </div>
          
          <Badge variant={statusColors[trigger.status]}>
            {isTriggered ? 'Triggered' : isActive ? 'Active' : 'Normal'}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-text-primary mb-1 flex items-center gap-2">
          {trigger.name}
          {!isTriggered && (
            <Brain size={14} className="text-accent" />
          )}
        </h3>
        <p className="text-sm text-text-secondary mb-3">{trigger.description}</p>
        
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="text-text-tertiary">Threshold: {trigger.threshold}</span>
          <span className={`font-mono font-medium ${
            isActive || isTriggered ? 'text-error' : 'text-text-primary'
          }`}>
            Current: {trigger.currentValue} {trigger.unit}
          </span>
        </div>
        
        {isTriggered ? (
          <div className="flex items-center gap-2 p-3 bg-success-dim rounded-lg border border-success/30">
            <CheckCircle size={18} className="text-success" />
            <div>
              <p className="text-sm font-medium text-success">Auto-Claim Generated</p>
              <p className="text-xs text-success/80">₹{trigger.payoutAmount} payout processing</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Smart Simulate Button - FEATURE 5 */}
            <Button
              variant={isActive ? 'primary' : 'secondary'}
              size="sm"
              className="w-full group"
              onClick={() => onSimulate(trigger.id)}
              loading={isSimulating}
              icon={Play}
            >
              <span className="flex items-center gap-2">
                {isActive ? `Trigger AI-Verified ${trigger.name.split(' ')[0]}` : `Simulate AI-Verified ${trigger.name.split(' ')[0]} Event`}
              </span>
            </Button>
            
            {/* Data Sources Toggle */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-center gap-1 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showDetails ? 'Hide verification sources' : 'Show AI verification sources'}
            </button>
            
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-text-tertiary mb-2">Data sources verified:</p>
                    <div className="space-y-1.5">
                      {dataSources.map((source, idx) => {
                        const SourceIcon = source.icon;
                        return (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            <SourceIcon size={12} className="text-accent" />
                            <span className="text-text-secondary">{source.label}</span>
                            <CheckCircle size={10} className="text-success ml-auto" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TriggerCard;
