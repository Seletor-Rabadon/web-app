import * as React from 'react';
import { cn } from '@/lib/utils/tailwind';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: any;
  endIcon?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className='relative w-full'>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            startIcon ? 'pl-8' : '',
            endIcon ? 'pr-8' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {StartIcon && (
          <StartIcon className='absolute left-1.5 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 peer-focus:text-gray-900' />
        )}
        {EndIcon && (
          <EndIcon className='absolute right-1.5 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500 peer-focus:text-gray-900' />
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
