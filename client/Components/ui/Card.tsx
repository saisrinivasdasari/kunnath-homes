import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ 
  children, 
  className = '',
  hoverable = false,
  ...props 
}: CardProps) {
  
  return (
    <div 
      className={`bg-bg-card rounded-2xl border border-border overflow-hidden transition-all duration-200 ${hoverable ? 'hover:shadow-hover hover:-translate-y-1' : 'shadow-soft'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
