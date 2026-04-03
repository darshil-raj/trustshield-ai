import { motion } from 'framer-motion';
import { MapPin, Navigation, CloudRain, Wind, Sun, Radio, Database, Cloud } from 'lucide-react';

const riskZones = [
  { name: 'Andheri West', risk: 'high', icon: CloudRain, active: true },
  { name: 'Bandra', risk: 'medium', icon: Wind, active: false },
  { name: 'Dadar', risk: 'low', icon: Sun, active: false },
  { name: 'Worli', risk: 'medium', icon: Wind, active: false }
];

const LiveRiskMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-border rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent-dim rounded-lg">
            <Navigation size={18} className="text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary">Live Risk Map</h3>
            <p className="text-xs text-text-secondary">Mumbai Delivery Zones</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-text-tertiary font-medium">LIVE</span>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="relative h-48 bg-surface-2">
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Zone Markers */}
        <div className="absolute inset-0 p-4">
          {/* Andheri West - High Risk */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-6 left-8"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-error/20 border-2 border-error rounded-full flex items-center justify-center">
                <CloudRain size={18} className="text-error" />
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-error whitespace-nowrap">
                Andheri W.
              </span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full animate-ping" />
            </div>
          </motion.div>

          {/* Bandra - Medium Risk */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-12 right-16"
          >
            <div className="w-8 h-8 bg-warning/20 border-2 border-warning rounded-full flex items-center justify-center">
              <Wind size={16} className="text-warning" />
            </div>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-text-secondary whitespace-nowrap">
              Bandra
            </span>
          </motion.div>

          {/* Dadar - Low Risk */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-10 left-20"
          >
            <div className="w-8 h-8 bg-success/20 border-2 border-success rounded-full flex items-center justify-center">
              <Sun size={16} className="text-success" />
            </div>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-text-secondary whitespace-nowrap">
              Dadar
            </span>
          </motion.div>

          {/* Worli - Medium Risk */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-8 right-12"
          >
            <div className="w-8 h-8 bg-warning/20 border-2 border-warning rounded-full flex items-center justify-center">
              <Wind size={16} className="text-warning" />
            </div>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-text-secondary whitespace-nowrap">
              Worli
            </span>
          </motion.div>

          {/* Current Location Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-6 left-8"
          >
            <div className="w-10 h-10 border-2 border-accent rounded-full animate-ping opacity-30" />
          </motion.div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center justify-center gap-4 bg-surface/90 backdrop-blur-sm rounded-lg py-2 px-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-error rounded-full" />
              <span className="text-xs text-text-secondary">High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-warning rounded-full" />
              <span className="text-xs text-text-secondary">Medium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-success rounded-full" />
              <span className="text-xs text-text-secondary">Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zone List */}
      <div className="px-5 py-4 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          {riskZones.map((zone, index) => {
            const Icon = zone.icon;
            const riskColors = {
              high: 'bg-error/10 border-error/20 text-error',
              medium: 'bg-warning/10 border-warning/20 text-warning',
              low: 'bg-success/10 border-success/20 text-success'
            };
            
            return (
              <div
                key={index}
                className={`flex items-center gap-2 p-2.5 rounded-lg border ${riskColors[zone.risk]}`}
              >
                <Icon size={14} />
                <span className="text-xs font-medium truncate">{zone.name}</span>
                {zone.active && (
                  <span className="ml-auto w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Sources Footer */}
      <div className="px-5 py-3 bg-surface-2 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          <div className="flex items-center gap-1.5">
            <Cloud size={12} />
            <span>Weather API</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database size={12} />
            <span>AQI Monitor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Radio size={12} />
            <span>Historical Data</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveRiskMap;
