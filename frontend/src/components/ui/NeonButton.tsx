import React from 'react';

export interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'orange' | 'cyan' | 'pink' | 'gold';
  glow?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  variant = 'green',
  glow = true,
  className = '',
  ...props
}) => {
  const variantStyles: Record<string, string> = {
    green: 'border-neon-green text-neon-green hover:bg-neon-green hover:text-black',
    orange: 'border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-white',
    cyan: 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black',
    pink: 'border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white',
    gold: 'border-neon-yellow text-neon-yellow hover:bg-neon-yellow hover:text-black',
  };

  const glowStyles: Record<string, string> = {
    green: 'hover:shadow-neon-green',
    orange: 'hover:shadow-neon-orange',
    cyan: 'hover:shadow-neon-cyan',
    pink: 'hover:shadow-neon-pink',
    gold: 'hover:shadow-neon-yellow',
  };

  return (
    <button
      className={`px-5 py-2.5 rounded-lg border font-semibold text-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${variantStyles[variant]} ${glow ? glowStyles[variant] : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
