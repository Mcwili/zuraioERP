import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Trash2, 
  UserX, 
  UserCheck, 
  Download, 
  X,
  Folder,
  Shield
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface BulkActionsBarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onDelete: () => void;
  onDeactivate?: () => void;
  onActivate?: () => void;
  onExport?: () => void;
  onMoveToFolder?: () => void;
  onChangeRole?: () => void;
  isDarkMode?: boolean;
}

export function BulkActionsBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  onDelete,
  onDeactivate,
  onActivate,
  onExport,
  onMoveToFolder,
  onChangeRole,
  isDarkMode = false
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 shadow-lg rounded-lg border px-4 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-5"
      style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e1dfdd',
        minWidth: '500px'
      }}
    >
      {/* Selection Count */}
      <div className="flex items-center gap-2">
        <Badge 
          variant="outline"
          className="text-sm px-3 py-1"
          style={{
            borderColor: '#DE851D',
            backgroundColor: 'rgba(222, 133, 29, 0.1)',
            color: '#DE851D'
          }}
        >
          {selectedCount} selected
        </Badge>
        {selectedCount < totalCount && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            className="text-xs h-7"
            style={{
              color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-gray-dark)'
            }}
          >
            Select all {totalCount}
          </Button>
        )}
      </div>

      {/* Divider */}
      <div 
        className="h-8 w-px"
        style={{ backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e1dfdd' }}
      />

      {/* Actions */}
      <div className="flex items-center gap-2 flex-1">
        {onActivate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onActivate}
            className="gap-2 h-8"
            style={{
              border: '1px solid #e1dfdd',
              color: '#000000',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E9C796';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <UserCheck className="h-3.5 w-3.5" />
            Activate
          </Button>
        )}

        {onDeactivate && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDeactivate}
            className="gap-2 h-8"
            style={{
              border: '1px solid #e1dfdd',
              color: '#000000',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E9C796';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <UserX className="h-3.5 w-3.5" />
            Deactivate
          </Button>
        )}

        {onChangeRole && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onChangeRole}
            className="gap-2 h-8"
            style={{
              border: '1px solid #e1dfdd',
              color: '#000000',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E9C796';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Shield className="h-3.5 w-3.5" />
            Change Role
          </Button>
        )}

        {onMoveToFolder && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveToFolder}
            className="gap-2 h-8"
            style={{
              border: '1px solid #e1dfdd',
              color: '#000000',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E9C796';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Folder className="h-3.5 w-3.5" />
            Move
          </Button>
        )}

        {onExport && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onExport}
            className="gap-2 h-8"
            style={{
              border: '1px solid #e1dfdd',
              color: '#000000',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E9C796';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="gap-2 h-8"
          style={{
            border: '1px solid #d13438',
            color: '#ffffff',
            backgroundColor: '#d13438'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#b02a2e';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#d13438';
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onDeselectAll}
        className="h-8 w-8"
        style={{
          color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'var(--color-gray-dark)'
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
