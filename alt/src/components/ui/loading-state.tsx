import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingState({ message, size = "md", className = "" }: LoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin`} style={{ color: '#DE851D' }} />
      {message && (
        <p className="mt-4 text-sm" style={{ color: 'var(--color-gray-dark)' }}>
          {message}
        </p>
      )}
    </div>
  );
}

interface TableLoadingStateProps {
  columns: number;
  rows?: number;
}

export function TableLoadingState({ columns, rows = 5 }: TableLoadingStateProps) {
  return (
    <div className="w-full space-y-3 py-4">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 items-center">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              style={{ width: `${100 / columns}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface CardLoadingStateProps {
  count?: number;
}

export function CardLoadingState({ count = 3 }: CardLoadingStateProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}
