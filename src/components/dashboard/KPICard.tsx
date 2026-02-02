import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'success' | 'danger' | 'warning';
  className?: string;
}

export function KPICard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon,
  variant = 'default',
  className 
}: KPICardProps) {
  const variantStyles = {
    default: 'border-white/10 bg-white/5',
    success: 'border-success/30 bg-success/10',
    danger: 'border-danger/30 bg-danger/10',
    warning: 'border-warning/30 bg-warning/10',
  };

  const valueStyles = {
    default: 'text-foreground',
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning',
  };

  return (
    <div 
      className={cn(
        "glass-card p-6 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className={cn("text-4xl font-bold tracking-tight", valueStyles[variant])}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "p-3 rounded-lg",
            variant === 'success' && "bg-success/20",
            variant === 'danger' && "bg-danger/20",
            variant === 'warning' && "bg-warning/20",
            variant === 'default' && "bg-primary/20"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              variant === 'success' && "text-success",
              variant === 'danger' && "text-danger",
              variant === 'warning' && "text-warning",
              variant === 'default' && "text-primary"
            )} />
          </div>
        )}
      </div>
    </div>
  );
}
