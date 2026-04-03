import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  error,
  helperText,
  className = '',
  icon: Icon,
  ...props 
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-surface border rounded-lg px-4 py-3 
            text-text-primary placeholder:text-text-tertiary
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-accent/10
            hover:border-border-2
            ${Icon ? 'pl-11' : ''}
            ${error ? 'border-error focus:border-error' : 'border-border focus:border-accent/50'}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
