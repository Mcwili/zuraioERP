import { useEffect, useCallback } from 'react';

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

interface UseKeyboardShortcutsOptions {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
}

export function useKeyboardShortcuts({ shortcuts, enabled = true }: UseKeyboardShortcutsOptions) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Don't trigger shortcuts when typing in inputs, textareas, or contenteditable elements
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      // Allow Escape key even in input fields
      if (event.key !== 'Escape') {
        return;
      }
    }

    for (const shortcut of shortcuts) {
      const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
      const ctrlMatches = shortcut.ctrlKey === undefined || event.ctrlKey === shortcut.ctrlKey;
      const shiftMatches = shortcut.shiftKey === undefined || event.shiftKey === shortcut.shiftKey;
      const altMatches = shortcut.altKey === undefined || event.altKey === shortcut.altKey;
      const metaMatches = shortcut.metaKey === undefined || event.metaKey === shortcut.metaKey;

      if (keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches) {
        event.preventDefault();
        shortcut.action();
        break;
      }
    }
  }, [shortcuts, enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return shortcuts;
}

// Helper function to format shortcut for display
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const parts: string[] = [];
  
  if (shortcut.ctrlKey) parts.push('Ctrl');
  if (shortcut.metaKey) parts.push('⌘');
  if (shortcut.altKey) parts.push('Alt');
  if (shortcut.shiftKey) parts.push('Shift');
  
  parts.push(shortcut.key.toUpperCase());
  
  return parts.join(' + ');
}

// Predefined shortcuts for common actions
export const CommonShortcuts = {
  // Navigation
  OPEN_SEARCH: { key: 'k', ctrlKey: true, description: 'Open search' },
  CLOSE_DIALOG: { key: 'Escape', description: 'Close dialog/modal' },
  OPEN_HELP: { key: '?', shiftKey: true, description: 'Show keyboard shortcuts' },
  
  // Actions
  NEW_ITEM: { key: 'n', ctrlKey: true, description: 'Create new item' },
  SAVE: { key: 's', ctrlKey: true, description: 'Save' },
  DELETE: { key: 'Delete', description: 'Delete selected item' },
  REFRESH: { key: 'r', ctrlKey: true, description: 'Refresh' },
  
  // Selection
  SELECT_ALL: { key: 'a', ctrlKey: true, description: 'Select all' },
  DESELECT_ALL: { key: 'Escape', description: 'Deselect all' },
  
  // Table Navigation
  ARROW_UP: { key: 'ArrowUp', description: 'Move up' },
  ARROW_DOWN: { key: 'ArrowDown', description: 'Move down' },
};
