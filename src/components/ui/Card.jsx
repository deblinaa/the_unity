import React from 'react';
import { motion } from 'framer-motion';

export function Card({ children, className = '', noHover = false, ...props }) {
  return (
    <motion.div 
      whileHover={noHover ? {} : { y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-white border-t border-gray-200 flex flex-col ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`pt-6 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 className={`text-2xl font-heading font-medium text-primary-black ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`pb-6 flex-grow ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`pt-0 flex items-center ${className}`} {...props}>
      {children}
    </div>
  );
}
