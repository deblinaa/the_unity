import React from 'react';
import { motion } from 'framer-motion';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-black text-white hover:bg-neutral-dark focus:ring-primary-black',
    accent: 'bg-accent-yellow text-primary-black hover:bg-[#E6C000] focus:ring-accent-yellow',
    ghost: 'bg-transparent text-primary-black hover:bg-neutral-light focus:ring-gray-200',
    outline: 'bg-transparent border border-primary-black text-primary-black hover:bg-primary-black hover:text-white focus:ring-primary-black',
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
