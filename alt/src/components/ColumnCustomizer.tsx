import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Columns, 
  Eye, 
  EyeOff, 
  GripVertical, 
  RotateCcw,
  Save
} from 'lucide-react';

export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
  locked?: boolean; // Cannot be hidden
  width?: number;
}

interface ColumnCustomizerProps {
  columns: ColumnConfig[];
  onChange: (columns: ColumnConfig[]) => void;
  onSave?: (columns: ColumnConfig[]) => void;
  onReset?: () => void;
  isDarkMode?: boolean;
  storageKey?: string; // For localStorage persistence
}

/**
 * ColumnCustomizer Component
 * Allows users to customize table columns:
 * - Show/hide columns
 * - Reorder columns (drag & drop)
 * - Save column preferences
 * - Reset to defaults
 */
export function ColumnCustomizer({
  columns,
  onChange,
  onSave,
  onReset,
  isDarkMode,
  storageKey
}: ColumnCustomizerProps) {
  const [localColumns, setLocalColumns] = useState<ColumnConfig[]>(columns);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const toggleColumn = (id: string) => {
    const updated = localColumns.map(col =>
      col.id === id && !col.locked ? { ...col, visible: !col.visible } : col
    );
    setLocalColumns(updated);
    onChange(updated);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...localColumns];
    const [removed] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, removed);

    setDraggedIndex(index);
    setLocalColumns(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    onChange(localColumns);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(localColumns);
    }
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(localColumns));
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  const visibleCount = localColumns.filter(col => col.visible).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-[#e1dfdd] hover:bg-[#E9C796] text-black"
        >
          <Columns className="h-4 w-4 mr-2" />
          Columns ({visibleCount}/{localColumns.length})
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Customize Columns</SheetTitle>
          <SheetDescription>
            Show, hide, and reorder table columns
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updated = localColumns.map(col => ({ ...col, visible: true }));
                setLocalColumns(updated);
                onChange(updated);
              }}
              className="flex-1 border-[#e1dfdd] hover:bg-[#E9C796] text-black text-xs"
            >
              <Eye className="h-3 w-3 mr-1" />
              Show All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex-1 border-[#e1dfdd] hover:bg-[#E9C796] text-black text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>

          <Separator className="bg-[#e1dfdd]" />

          {/* Column List */}
          <div className="space-y-2">
            <Label className="text-xs text-gray-600">
              Drag to reorder • Click to show/hide
            </Label>
            <div className="space-y-1">
              {localColumns.map((column, index) => (
                <div
                  key={column.id}
                  draggable={!column.locked}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`
                    flex items-center gap-2 p-2 rounded border border-[#e1dfdd]
                    ${column.locked ? 'bg-gray-50 cursor-not-allowed' : 'cursor-move hover:bg-[#E9C796]'}
                    ${draggedIndex === index ? 'opacity-50' : ''}
                    transition-all
                  `}
                >
                  {!column.locked && (
                    <GripVertical className="h-4 w-4 text-gray-400" />
                  )}
                  
                  <Checkbox
                    checked={column.visible}
                    onCheckedChange={() => toggleColumn(column.id)}
                    disabled={column.locked}
                    style={{
                      borderColor: '#e1dfdd',
                    }}
                  />

                  <Label className="flex-1 text-sm cursor-pointer">
                    {column.label}
                    {column.locked && (
                      <span className="ml-2 text-xs text-gray-500">(Required)</span>
                    )}
                  </Label>

                  <div className="flex items-center gap-1">
                    {column.visible ? (
                      <Eye className="h-3 w-3 text-green-600" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-[#e1dfdd]" />

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-[#DE851D] hover:bg-[#E9C796] text-black border border-[#e1dfdd]"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/**
 * Quick Column Toggle - Dropdown version
 */
export function QuickColumnToggle({
  columns,
  onChange,
  isDarkMode
}: Omit<ColumnCustomizerProps, 'onSave' | 'onReset' | 'storageKey'>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-[#e1dfdd] hover:bg-[#E9C796] text-black"
        >
          <Columns className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {columns.map(column => (
          <DropdownMenuItem
            key={column.id}
            onClick={() => {
              if (column.locked) return;
              const updated = columns.map(col =>
                col.id === column.id ? { ...col, visible: !col.visible } : col
              );
              onChange(updated);
            }}
            disabled={column.locked}
            className="focus:!bg-[#E9C796]"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-sm">{column.label}</span>
              {column.visible ? (
                <Eye className="h-3 w-3 text-green-600" />
              ) : (
                <EyeOff className="h-3 w-3 text-gray-400" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Hook to manage column state with localStorage persistence
 */
export function useColumnState(
  defaultColumns: ColumnConfig[],
  storageKey: string
): [ColumnConfig[], (columns: ColumnConfig[]) => void, () => void] {
  const getInitialColumns = (): ColumnConfig[] => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load column state:', e);
    }
    return defaultColumns;
  };

  const [columns, setColumns] = useState<ColumnConfig[]>(getInitialColumns());

  const updateColumns = (newColumns: ColumnConfig[]) => {
    setColumns(newColumns);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newColumns));
    } catch (e) {
      console.error('Failed to save column state:', e);
    }
  };

  const resetColumns = () => {
    setColumns(defaultColumns);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.error('Failed to reset column state:', e);
    }
  };

  return [columns, updateColumns, resetColumns];
}
