import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    const baseStyles = 'inline-flex items-center justify-center font-display font-bold rounded-2xl transition-colors focus:outline-none focus:ring-4 focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-math-blue text-white hover:bg-blue-600 focus:ring-math-blue/50 shadow-[0_6px_0_0_#2563EB] hover:shadow-[0_4px_0_0_#2563EB] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px]',
      secondary: 'bg-math-yellow text-amber-950 hover:bg-yellow-400 focus:ring-math-yellow/50 shadow-[0_6px_0_0_#D97706] hover:shadow-[0_4px_0_0_#D97706] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px]',
      danger: 'bg-math-red text-white hover:bg-red-600 focus:ring-math-red/50 shadow-[0_6px_0_0_#DC2626] hover:shadow-[0_4px_0_0_#DC2626] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px]',
      success: 'bg-math-green text-white hover:bg-emerald-600 focus:ring-math-green/50 shadow-[0_6px_0_0_#059669] hover:shadow-[0_4px_0_0_#059669] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px]',
      outline: 'border-4 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200/50 shadow-[0_6px_0_0_#cbd5e1] hover:shadow-[0_4px_0_0_#cbd5e1] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px]'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-lg',
      lg: 'px-8 py-4 text-2xl',
      xl: 'px-12 py-6 text-4xl w-full'
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
