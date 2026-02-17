import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import type { WindowInstance } from './WindowManager';

interface DraggableWindowProps {
  window: WindowInstance;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (width: number, height: number) => void;
}

export function DraggableWindow({
  window: windowData,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize
}: DraggableWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const titleBarRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });

  // Window bounds constraints
  const getConstrainedPosition = useCallback((x: number, y: number) => {
    const windowWidth = windowData.width || 600;
    const minX = -windowWidth + 100; // Allow partial off-screen
    const maxX = (typeof window !== 'undefined' ? window.innerWidth : 1200) - 100;
    const minY = 10; // Allow positioning near the top, but keep title bar accessible
    const maxY = (typeof window !== 'undefined' ? window.innerHeight : 800) - 100;

    // Ensure we return valid numbers, not NaN
    const constrainedX = isNaN(x) ? 100 : Math.max(minX, Math.min(maxX, x));
    const constrainedY = isNaN(y) ? 100 : Math.max(minY, Math.min(maxY, y));

    return {
      x: constrainedX,
      y: constrainedY
    };
  }, [windowData.width]);

  const getConstrainedSize = useCallback((width: number, height: number) => {
    const minWidth = 250; // Smaller minimum width
    const minHeight = 180; // Smaller minimum height
    const maxWidth = (typeof window !== 'undefined' ? window.innerWidth : 1200) - windowData.x;
    const maxHeight = (typeof window !== 'undefined' ? window.innerHeight : 800) - windowData.y;

    // Ensure we return valid numbers, not NaN
    const constrainedWidth = isNaN(width) ? 480 : Math.max(minWidth, Math.min(maxWidth, width));
    const constrainedHeight = isNaN(height) ? 350 : Math.max(minHeight, Math.min(maxHeight, height));

    return {
      width: constrainedWidth,
      height: constrainedHeight
    };
  }, [windowData.x, windowData.y]);

  // Mouse move handler for dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    e.preventDefault();

    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      const newPosition = getConstrainedPosition(
        windowData.x + deltaX,
        windowData.y + deltaY
      );
      onMove(newPosition.x, newPosition.y);
      setDragStart({ x: e.clientX, y: e.clientY });
    }

    if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newSize = getConstrainedSize(
        resizeStart.width + deltaX,
        resizeStart.height + deltaY
      );
      onResize(newSize.width, newSize.height);
    }
  }, [isDragging, isResizing, dragStart, resizeStart, windowData.x, windowData.y, onMove, onResize, getConstrainedPosition, getConstrainedSize]);

  // Mouse up handler
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // Setup global mouse events
  useEffect(() => {
    if (isDragging || isResizing) {
      document.body.style.cursor = isDragging ? 'move' : 'nw-resize';
      document.body.style.userSelect = 'none';
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  // Title bar mouse down handler
  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (e.target === titleBarRef.current || (e.target as Element).closest('.title-text')) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      onFocus();
    }
  };

  // Resize handle mouse down handler
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: windowData.width,
      height: windowData.height,
      x: e.clientX,
      y: e.clientY
    });
    onFocus();
  };

  // Window click handler to bring to front
  const handleWindowClick = () => {
    onFocus();
  };

  // Don't render if minimized
  if (windowData.isMinimized) {
    return null;
  }

  // Calculate window styles
  const windowStyle = windowData.isMaximized
    ? {
        position: 'fixed' as const,
        top: 64, // Header height
        left: 0,
        width: '100%',
        height: 'calc(100vh - 64px)',
        zIndex: windowData.zIndex
      }
    : {
        position: 'absolute' as const,
        left: windowData.x,
        top: windowData.y,
        width: windowData.width,
        height: windowData.height,
        zIndex: windowData.zIndex
      };

  return (
    <div
      ref={windowRef}
      className="select-none"
      style={{
        ...windowStyle,
        background: 'var(--color-window-background)',
        border: '1px solid var(--color-window-border)',
        borderRadius: windowData.isMaximized ? '0' : '6px',
        boxShadow: windowData.isMaximized 
          ? 'none' 
          : '0 4px 24px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden'
      }}
      onClick={handleWindowClick}
    >
      {/* Title Bar */}
      <div
        ref={titleBarRef}
        className="h-8 bg-white border-b flex items-center justify-between px-3 cursor-move"
        onMouseDown={handleTitleBarMouseDown}
        style={{
          backgroundColor: 'var(--color-header-background)',
          borderBottomColor: 'var(--color-gray-medium)'
        }}
      >
        <div className="title-text flex-1 select-none pointer-events-none">
          <span className="font-medium text-sm" style={{ color: 'var(--color-header-text)' }}>{windowData.title}</span>
        </div>
        
        {/* Window Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Window Content */}
      <div 
        className="h-full overflow-auto pr-3" 
        style={{ 
          height: 'calc(100% - 32px)', // Subtract smaller title bar height
          backgroundColor: 'var(--color-card)'
        }}
      >
        {children}
      </div>

      {/* Resize Handle - positioned with more space from scroll area */}
      {!windowData.isMaximized && (
        <div
          ref={resizeHandleRef}
          className="absolute bottom-0 right-0 w-3 h-3 cursor-nw-resize bg-transparent opacity-30 hover:opacity-60 transition-all duration-200"
          onMouseDown={handleResizeMouseDown}
          style={{
            marginRight: '1px',
            marginBottom: '1px',
            borderRadius: '0 0 6px 0'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gray-light)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div
            className="w-full h-full"
            style={{
              background: `
                linear-gradient(-45deg, transparent 40%, rgba(156, 163, 175, 0.5) 40%, rgba(156, 163, 175, 0.5) 60%, transparent 60%)
              `,
              borderRadius: '0 0 6px 0'
            }}
          />
        </div>
      )}
    </div>
  );
}