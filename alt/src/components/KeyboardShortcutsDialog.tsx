import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Keyboard } from "lucide-react";
import { formatShortcut } from "../hooks/useKeyboardShortcuts";

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
  category?: string;
}

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shortcuts: KeyboardShortcut[];
  isDarkMode?: boolean;
}

export function KeyboardShortcutsDialog({ 
  open, 
  onOpenChange, 
  shortcuts,
  isDarkMode = false 
}: KeyboardShortcutsDialogProps) {
  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    const category = shortcut.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(shortcut);
    return acc;
  }, {} as Record<string, KeyboardShortcut[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl max-h-[80vh] overflow-y-auto"
        style={{
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e1dfdd'
        }}
      >
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(222, 133, 29, 0.1)' }}
            >
              <Keyboard className="h-6 w-6" style={{ color: '#DE851D' }} />
            </div>
            <DialogTitle style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
              Keyboard Shortcuts
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category}>
              <h3 
                className="text-sm font-semibold mb-3"
                style={{ color: isDarkMode ? '#ffffff' : '#000000' }}
              >
                {category}
              </h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg"
                    style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f5f5f5' }}
                  >
                    <span 
                      className="text-sm"
                      style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-gray-dark)' }}
                    >
                      {shortcut.description}
                    </span>
                    <div className="flex gap-1">
                      {formatShortcut(shortcut).split(' + ').map((key, i, arr) => (
                        <div key={i} className="flex items-center gap-1">
                          <Badge
                            variant="outline"
                            className="text-xs px-2 py-1"
                            style={{
                              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#e1dfdd',
                              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#ffffff',
                              color: isDarkMode ? '#ffffff' : '#000000'
                            }}
                          >
                            {key}
                          </Badge>
                          {i < arr.length - 1 && (
                            <span 
                              className="text-xs"
                              style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'var(--color-gray-dark)' }}
                            >
                              +
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div 
          className="mt-6 p-4 rounded-lg text-sm"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(222, 133, 29, 0.1)' : 'rgba(222, 133, 29, 0.1)',
            color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-gray-dark)'
          }}
        >
          <strong style={{ color: '#DE851D' }}>Tip:</strong> Press <Badge variant="outline" className="mx-1">Shift</Badge> + <Badge variant="outline" className="mx-1">?</Badge> anytime to view this help dialog.
        </div>
      </DialogContent>
    </Dialog>
  );
}
