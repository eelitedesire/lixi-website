import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, glass = false, hover = false, className, ...props }, ref) => {
    const baseStyles = 'rounded-xl p-6';
    const glassStyles = glass ? 'glass' : 'bg-brand-grey border border-brand-greyMid';
    const hoverStyles = hover ? 'hover:scale-105 hover:border-brand-green transition-all duration-300 cursor-pointer' : '';

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={clsx(baseStyles, glassStyles, hoverStyles, className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
