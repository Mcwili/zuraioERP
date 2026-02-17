import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';

export interface TourStep {
  id: string;
  target: string; // CSS selector
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ProductTourProps {
  steps: TourStep[];
  onComplete?: () => void;
  onSkip?: () => void;
  isOpen?: boolean;
  isDarkMode?: boolean;
  tourId: string; // Unique ID to track completion
}

/**
 * ProductTour Component
 * Provides interactive product tours for onboarding
 * Features:
 * - Step-by-step guidance
 * - Spotlight effect on elements
 * - Progress tracking
 * - Skip/Complete actions
 */
export function ProductTour({
  steps,
  onComplete,
  onSkip,
  isOpen: controlledIsOpen,
  isDarkMode,
  tourId
}: ProductTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [elementPosition, setElementPosition] = useState<DOMRect | null>(null);

  // Check if tour has been completed
  useEffect(() => {
    const completedTours = JSON.parse(localStorage.getItem('completedTours') || '[]');
    if (!completedTours.includes(tourId) && controlledIsOpen !== false) {
      setIsOpen(true);
    }
  }, [tourId, controlledIsOpen]);

  // Update element position when step changes
  useEffect(() => {
    if (!isOpen || !steps[currentStep]) return;

    const updatePosition = () => {
      const element = document.querySelector(steps[currentStep].target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setElementPosition(rect);
        
        // Scroll element into view
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen, currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Mark tour as completed
    const completedTours = JSON.parse(localStorage.getItem('completedTours') || '[]');
    if (!completedTours.includes(tourId)) {
      localStorage.setItem('completedTours', JSON.stringify([...completedTours, tourId]));
    }
    setIsOpen(false);
    onComplete?.();
  };

  const handleSkip = () => {
    setIsOpen(false);
    onSkip?.();
  };

  if (!isOpen || !steps[currentStep]) return null;

  const step = steps[currentStep];
  const position = step.position || 'bottom';

  // Calculate tooltip position
  const getTooltipStyle = (): React.CSSProperties => {
    if (!elementPosition) return { display: 'none' };

    const offset = 16;
    let style: React.CSSProperties = {
      position: 'fixed',
      zIndex: 10001,
      maxWidth: '350px'
    };

    switch (position) {
      case 'top':
        style.top = elementPosition.top - offset;
        style.left = elementPosition.left + elementPosition.width / 2;
        style.transform = 'translate(-50%, -100%)';
        break;
      case 'bottom':
        style.top = elementPosition.bottom + offset;
        style.left = elementPosition.left + elementPosition.width / 2;
        style.transform = 'translateX(-50%)';
        break;
      case 'left':
        style.top = elementPosition.top + elementPosition.height / 2;
        style.left = elementPosition.left - offset;
        style.transform = 'translate(-100%, -50%)';
        break;
      case 'right':
        style.top = elementPosition.top + elementPosition.height / 2;
        style.left = elementPosition.right + offset;
        style.transform = 'translateY(-50%)';
        break;
    }

    return style;
  };

  // Spotlight effect style
  const getSpotlightStyle = (): React.CSSProperties => {
    if (!elementPosition) return { display: 'none' };

    return {
      position: 'fixed',
      top: elementPosition.top - 8,
      left: elementPosition.left - 8,
      width: elementPosition.width + 16,
      height: elementPosition.height + 16,
      border: '2px solid #DE851D',
      borderRadius: '8px',
      boxShadow: '0 0 0 4px rgba(222, 133, 29, 0.2), 0 0 0 9999px rgba(0, 0, 0, 0.5)',
      zIndex: 10000,
      pointerEvents: 'none',
      transition: 'all 0.3s ease'
    };
  };

  return (
    <>
      {/* Backdrop & Spotlight */}
      <div style={getSpotlightStyle()} />

      {/* Tooltip Card */}
      <Card 
        className="border-[#DE851D] shadow-xl"
        style={getTooltipStyle()}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm">{step.title}</h3>
                  <Badge 
                    variant="outline" 
                    className="border-[#e1dfdd] bg-[#E9C796] text-black text-xs"
                  >
                    {currentStep + 1} / {steps.length}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="h-6 w-6 p-0 hover:bg-[#E9C796]"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            {/* Optional Action */}
            {step.action && (
              <Button
                variant="outline"
                size="sm"
                onClick={step.action.onClick}
                className="w-full border-[#e1dfdd] hover:bg-[#E9C796] text-black text-xs"
              >
                {step.action.label}
              </Button>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#e1dfdd]">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="text-xs hover:bg-[#E9C796]"
              >
                <ChevronLeft className="h-3 w-3 mr-1" />
                Previous
              </Button>

              {/* Progress dots */}
              <div className="flex gap-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: index === currentStep ? '#DE851D' : '#e1dfdd'
                    }}
                  />
                ))}
              </div>

              <Button
                size="sm"
                onClick={handleNext}
                className="bg-[#DE851D] hover:bg-[#E9C796] text-black border border-[#e1dfdd] text-xs"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Finish
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

/**
 * Hook to manage tour state
 */
export function useTour(tourId: string) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const completedTours = JSON.parse(localStorage.getItem('completedTours') || '[]');
    setIsOpen(!completedTours.includes(tourId));
  }, [tourId]);

  const startTour = () => {
    // Remove from completed tours to restart
    const completedTours = JSON.parse(localStorage.getItem('completedTours') || '[]');
    const filtered = completedTours.filter((id: string) => id !== tourId);
    localStorage.setItem('completedTours', JSON.stringify(filtered));
    setIsOpen(true);
  };

  const completeTour = () => {
    const completedTours = JSON.parse(localStorage.getItem('completedTours') || '[]');
    if (!completedTours.includes(tourId)) {
      localStorage.setItem('completedTours', JSON.stringify([...completedTours, tourId]));
    }
    setIsOpen(false);
  };

  return {
    isOpen,
    startTour,
    completeTour
  };
}
