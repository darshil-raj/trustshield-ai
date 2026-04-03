import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({ 
  label,
  error,
  helperText,
  options = [],
  className = '',
  placeholder = 'Select an option',
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
        <select
          ref={ref}
          className={`
            w-full bg-surface border rounded-lg px-4 py-3 pr-10
            text-text-primary appearance-none cursor-pointer
            transition-all duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-accent/10
            hover:border-border-2
            ${error ? 'border-error focus:border-error' : 'border-border focus:border-accent/50'}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="bg-surface text-text-primary"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
          <ChevronDown size={18} />
        </div>
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

Select.displayName = 'Select';

export default Select;
