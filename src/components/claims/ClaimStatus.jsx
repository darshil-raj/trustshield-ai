import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

const steps = [
  { id: 'triggered', label: 'Trigger Detected', icon: CheckCircle },
  { id: 'processing', label: 'Processing', icon: Clock },
  { id: 'verified', label: 'Verified', icon: CheckCircle },
  { id: 'paid', label: 'Paid', icon: CheckCircle }
];

const ClaimStatus = ({ currentStep = 'processing' }) => {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted ? '#22c55e' : '#1a1a25',
                  borderColor: isCompleted ? '#22c55e' : '#ffffff10'
                }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  border-2 transition-colors duration-300
                  ${isCompleted ? 'text-white' : 'text-text-tertiary'}
                  ${isCurrent ? 'ring-4 ring-success/20' : ''}
                `}
              >
                <Icon size={18} />
              </motion.div>
              
              <span className={`
                text-xs mt-2 font-medium
                ${isCompleted ? 'text-success' : 'text-text-tertiary'}
              `}>
                {step.label}
              </span>
              
              {index < steps.length - 1 && (
                <div className={`
                  absolute h-0.5 w-16
                  ${index < currentIndex ? 'bg-success' : 'bg-border'}
                `}
                style={{ 
                  left: `calc(${(index + 0.5) * 25}% + 20px)`,
                  top: '20px'
                }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClaimStatus;
