import { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'green' | 'yellow' | 'blue';
}

const Badge = ({ children, variant = 'default', className, ...props }: BadgeProps) => {
  const variants = {
    default: 'bg-brand-greyMid text-brand-white',
    green: 'bg-brand-green text-brand-black',
    yellow: 'bg-solar-yellow text-brand-black',
    blue: 'bg-solar-blue text-white',
  };

  return (
    <span
      className={clsx(
        'inline-block px-3 py-1 rounded-full text-sm font-bold',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
