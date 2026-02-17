import { Minus, Square, X } from "lucide-react";
import { Button } from "./ui/button";

interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
}

export function WindowFrame({ title, children }: WindowFrameProps) {
  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden shadow-2xl h-full flex flex-col">
      {/* Windows-style title bar */}
      <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-sm"></div>
          </div>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-primary-foreground/10"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-primary-foreground/10"
          >
            <Square className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-destructive text-destructive-foreground"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}