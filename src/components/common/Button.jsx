import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  onClick,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 ease-out';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98]',
    secondary: 'bg-surface-2 text-text-primary border border-border hover:border-border-2 hover:bg-surface active:scale-[0.98]',
    outline: 'bg-transparent text-accent border border-accent/30 hover:bg-accent-dim hover:border-accent active:scale-[0.98]',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-2 active:scale-[0.98]',
    danger: 'bg-error/10 text-error border border-error/30 hover:bg-error/20 active:scale-[0.98]'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };
  
  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <motion.button
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {Icon && !loading && <Icon size={size === 'sm' ? 16 : 18} />}
      {children}
    </motion.button>
  );
};

export default Button;
