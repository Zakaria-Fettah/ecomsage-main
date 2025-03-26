
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ThemeButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ThemeButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled = false,
  type = 'button'
}: ThemeButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all overflow-hidden";
  
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border hover:bg-muted/30 text-foreground",
    ghost: "hover:bg-muted/30 text-foreground"
  };
  
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5 h-9",
    md: "text-sm px-4 py-2 h-10",
    lg: "text-base px-5 py-2.5 h-12"
  };
  
  const disabledStyles = disabled 
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";
  
  // Effet d'ondulation au clic
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.width = '250px';
    ripple.style.height = '250px';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transition = 'transform 0.6s, opacity 0.6s';
    ripple.style.opacity = '1';
    
    button.appendChild(ripple);
    
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(1)';
      ripple.style.opacity = '0';
    });
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    if (onClick) onClick();
  };
  
  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={handleRipple}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyles,
        className
      )}
    >
      {children}
    </button>
  );
};

export default ThemeButton;
