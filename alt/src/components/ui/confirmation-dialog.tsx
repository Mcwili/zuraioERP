import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import * as LucideIcons from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: "destructive" | "warning" | "info" | "success";
  isDarkMode?: boolean;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "warning",
  isDarkMode = false
}: ConfirmationDialogProps) {
  const getIcon = () => {
    switch (variant) {
      case 'destructive':
        return LucideIcons.Trash2;
      case 'warning':
        return LucideIcons.AlertTriangle;
      case 'info':
        return LucideIcons.Info;
      case 'success':
        return LucideIcons.CheckCircle2;
      default:
        return LucideIcons.AlertTriangle;
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'destructive':
        return "#d13438";
      case 'warning':
        return "#f59e0b";
      case 'info':
        return "#3b82f6";
      case 'success':
        return "#5ebc67";
      default:
        return "#f59e0b";
    }
  };

  const IconComponent = getIcon();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        style={{
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e1dfdd'
        }}
      >
        <AlertDialogHeader>
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: variant === 'destructive' 
                  ? 'rgba(209, 52, 56, 0.1)' 
                  : variant === 'warning'
                  ? 'rgba(245, 158, 11, 0.1)'
                  : variant === 'success'
                  ? 'rgba(94, 188, 103, 0.1)'
                  : 'rgba(59, 130, 246, 0.1)'
              }}
            >
              <IconComponent className="h-6 w-6" style={{ color: getIconColor() }} />
            </div>
            <div className="flex-1">
              <AlertDialogTitle style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription 
                className="mt-2"
                style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-gray-dark)' }}
              >
                {description}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            style={{
              border: '1px solid #e1dfdd',
              color: '#000000',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            style={{
              border: variant === 'destructive' ? '1px solid #d13438' : '1px solid #e1dfdd',
              color: variant === 'destructive' ? '#ffffff' : '#000000',
              backgroundColor: variant === 'destructive' ? '#d13438' : 'transparent'
            }}
            onMouseEnter={(e) => {
              if (variant === 'destructive') {
                e.currentTarget.style.backgroundColor = '#b02a2e';
              } else {
                e.currentTarget.style.backgroundColor = '#E9C796';
              }
            }}
            onMouseLeave={(e) => {
              if (variant === 'destructive') {
                e.currentTarget.style.backgroundColor = '#d13438';
              } else {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}