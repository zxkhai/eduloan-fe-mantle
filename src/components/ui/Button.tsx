import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 shadow-sm btn';

    const variants = {
      primary:
        'text-white btn-primary hover:-translate-y-0.5',
      secondary: 'text-[#03345a] glass border-2 border-white/20 hover:border-[#39bfff]/40 hover:shadow-lg focus:ring-2 focus:ring-[#39bfff]/20',
      ghost: 'text-[#03345a] glass-soft bg-transparent hover:backdrop-blur-sm focus:ring-2 focus:ring-[#39bfff]/16',
      danger: 'text-white bg-gradient-to-r from-[#ff7a7a] to-[#ff5a5a] hover:shadow-lg hover:-translate-y-0.5',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
