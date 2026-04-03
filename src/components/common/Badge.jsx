const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const variants = {
    default: 'bg-surface-2 text-text-secondary border-border',
    success: 'bg-success-dim text-success border-success/30',
    error: 'bg-error-dim text-error border-error/30',
    warning: 'bg-warning-dim text-warning border-warning/30',
    info: 'bg-info-dim text-info border-info/30',
    accent: 'bg-accent-dim text-accent border-accent/30'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };
  
  return (
    <span className={`
      inline-flex items-center gap-1.5 font-medium rounded-full border
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;
