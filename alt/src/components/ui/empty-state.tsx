import { ReactNode } from "react";
import { Button } from "./button";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  children?: ReactNode;
  className?: string;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  children,
  className = "" 
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {Icon && (
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: '#f5f5f5' }}
        >
          <Icon className="h-8 w-8" style={{ color: '#DE851D' }} />
        </div>
      )}
      
      <h3 className="font-semibold mb-2" style={{ color: '#000000' }}>
        {title}
      </h3>
      
      {description && (
        <p className="text-sm max-w-md mb-6" style={{ color: 'var(--color-gray-dark)' }}>
          {description}
        </p>
      )}
      
      {action && (
        <Button
          onClick={action.onClick}
          className="gap-2"
          style={{
            border: '1px solid #e1dfdd',
            color: '#000000',
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#E9C796';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {action.icon && <action.icon className="h-4 w-4" />}
          {action.label}
        </Button>
      )}
      
      {children}
    </div>
  );
}
