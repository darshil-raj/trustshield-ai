import { motion } from 'framer-motion';

const RiskSlider = ({ 
  label, 
  value, 
  onChange, 
  options,
  description
}) => {
  const selectedIndex = options.findIndex(opt => opt.value === value);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-secondary">{label}</label>
        <span className="text-sm font-medium text-accent">
          {options[selectedIndex]?.label}
        </span>
      </div>
      
      {description && (
        <p className="text-xs text-text-tertiary">{description}</p>
      )}
      
      <div className="relative">
        <div className="flex gap-2">
          {options.map((option, index) => {
            const isSelected = index === selectedIndex;
            const isBefore = index < selectedIndex;
            
            return (
              <motion.button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={`
                  flex-1 h-2 rounded-full transition-all duration-300
                  ${isSelected ? 'bg-accent' : isBefore ? 'bg-accent/50' : 'bg-surface-2'}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            );
          })}
        </div>
        
        <div className="flex justify-between mt-2">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                text-xs transition-colors
                ${value === option.value ? 'text-accent font-medium' : 'text-text-tertiary'}
              `}
            >
              {option.shortLabel || option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskSlider;
