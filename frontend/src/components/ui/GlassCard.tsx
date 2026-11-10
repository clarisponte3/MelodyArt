import React from 'react';

export interface GlassCardProps {
  children: React.ReactNode;
  accent?: 'cyan' | 'pink' | 'gold';
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  accent = 'cyan',
  className = '',
}) => {
  const accentClasses = {
    cyan: 'glass-panel',
    pink: 'glass-panel-pink',
    gold: 'glass-panel-gold',
  };

  return (
    <div className={`p-6 rounded-xl transition-all duration-300 ${accentClasses[accent]} ${className}`}>
      {children}
    </div>
  );
};
