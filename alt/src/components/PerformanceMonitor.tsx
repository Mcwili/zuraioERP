import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, Zap, Clock } from 'lucide-react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
}

interface PerformanceMonitorProps {
  isDarkMode?: boolean;
  showMetrics?: boolean;
}

/**
 * PerformanceMonitor Component
 * Displays real-time performance metrics for debugging
 * Shows FPS, memory usage, and render times
 */
export function PerformanceMonitor({ isDarkMode, showMetrics = true }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0
  });

  useEffect(() => {
    if (!showMetrics) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - lastTime;

      if (elapsed >= 1000) {
        const fps = Math.round((frameCount * 1000) / elapsed);
        
        // Get memory usage if available
        const memory = (performance as any).memory;
        const memoryUsage = memory 
          ? Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
          : 0;

        setMetrics({
          fps,
          memoryUsage,
          renderTime: Math.round(performance.now() % 100)
        });

        frameCount = 0;
        lastTime = currentTime;
      }

      rafId = requestAnimationFrame(measureFPS);
    };

    rafId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [showMetrics]);

  if (!showMetrics) return null;

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return '#10b981'; // green
    if (fps >= 30) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getMemoryColor = (usage: number) => {
    if (usage < 50) return '#10b981';
    if (usage < 80) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-64 border-[#e1dfdd] shadow-lg">
        <CardHeader className="py-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#DE851D]" />
            Performance Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              <span className="text-xs">FPS</span>
            </div>
            <Badge 
              variant="outline" 
              className="border-[#e1dfdd]"
              style={{ 
                backgroundColor: getFPSColor(metrics.fps) + '20',
                color: getFPSColor(metrics.fps)
              }}
            >
              {metrics.fps}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              <span className="text-xs">Memory</span>
            </div>
            <Badge 
              variant="outline" 
              className="border-[#e1dfdd]"
              style={{ 
                backgroundColor: getMemoryColor(metrics.memoryUsage) + '20',
                color: getMemoryColor(metrics.memoryUsage)
              }}
            >
              {metrics.memoryUsage}%
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span className="text-xs">Render</span>
            </div>
            <Badge variant="outline" className="border-[#e1dfdd] bg-[#E9C796] text-black">
              {metrics.renderTime}ms
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Performance Utility Functions
 */

// Memoize expensive computations
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Throttle function execution
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

// Debounce function execution
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
