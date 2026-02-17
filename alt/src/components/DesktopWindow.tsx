import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { Minus, Square, X, Maximize2 } from "lucide-react";

interface DesktopWindowProps {
  id: string;
  title: string;
  icon?: React.ComponentType<any>;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isMinimized?: boolean;
  isMaximized?: boolean;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  zIndex: number;
  isActive: boolean;
}

export function DesktopWindow({
  id,
  title,
  icon: Icon,
  children,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 800, height: 600 },
  isMinimized = false,
  isMaximized = false,
  onMinimize,
  onMaximize,
  onClose,
  onFocus,
  zIndex,
  isActive
}: DesktopWindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [resizeDirection, setResizeDirection] = useState<string>("");

  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-title') || (e.target as HTMLElement).closest('.window-title')) {
      onFocus(id);
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  }, [position, onFocus, id]);

  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    onFocus(id);
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  }, [size, onFocus, id]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }

      if (isResizing && !isMaximized) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = position.x;
        let newY = position.y;

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(300, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(200, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes('w')) {
          const widthDelta = resizeStart.width - deltaX;
          if (widthDelta >= 300) {
            newWidth = widthDelta;
            newX = position.x + deltaX;
          }
        }
        if (resizeDirection.includes('n')) {
          const heightDelta = resizeStart.height - deltaY;
          if (heightDelta >= 200) {
            newHeight = heightDelta;
            newY = position.y + deltaY;
          }
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection("");
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, resizeDirection, position, isMaximized]);

  if (isMinimized) {
    return null;
  }

  const windowStyle = isMaximized
    ? { 
        position: 'fixed' as const, 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: 'calc(100vh - 48px)', // 48px for taskbar
        zIndex 
      }
    : {
        position: 'absolute' as const,
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex
      };

  return (
    <div
      ref={windowRef}
      className={`select-none transition-all duration-200 ${
        isActive ? '' : ''
      }`}
      style={{
        ...windowStyle,
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: isActive 
          ? '0 16px 64px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 120, 212, 0.1)'
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Window Header */}
      <div 
        className="window-title flex items-center justify-between px-4 py-3 cursor-move backdrop-blur-sm border-b border-white/20"
        style={{
          background: isActive 
            ? 'linear-gradient(135deg, rgba(0, 120, 212, 0.1) 0%, rgba(255, 255, 255, 0.8) 100%)'
            : 'rgba(248, 248, 248, 0.8)',
          borderRadius: '12px 12px 0 0'
        }}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-4 w-4 text-primary" />}
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-md hover:bg-yellow-100 hover:text-yellow-600 transition-all duration-150"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(id);
            }}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-md hover:bg-green-100 hover:text-green-600 transition-all duration-150"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(id);
            }}
          >
            {isMaximized ? <Square className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-md hover:bg-red-100 hover:text-red-600 transition-all duration-150"
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Window Content */}
      <div 
        className="flex-1 overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.98)'
        }}
      >
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize opacity-30 hover:opacity-60 transition-opacity duration-200"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            style={{
              background: 'linear-gradient(-45deg, transparent 40%, rgba(156, 163, 175, 0.4) 40%, rgba(156, 163, 175, 0.4) 60%, transparent 60%)',
              borderRadius: '0 0 12px 0'
            }}
          />
          
          {/* Edges */}
          <div
            className="absolute top-0 left-2 right-2 h-1 cursor-n-resize"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
        </>
      )}
    </div>
  );
}