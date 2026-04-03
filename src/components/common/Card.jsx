import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  gradient = false,
  onClick,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover && !onClick ? { y: -2 } : {}}
      className={`
        bg-surface border border-border rounded-xl p-6
        ${hover ? 'card-hover' : ''}
        ${gradient ? 'gradient-border' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
