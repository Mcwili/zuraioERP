import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Check, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLanguage } from '../utils/i18n';
import { useClickOutside } from '../hooks/useClickOutside';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  users: number;
  permissions: string[];
  isSystem?: boolean;
}

interface RoleEditPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  isNewRole: boolean;
  roleName: string;
  roleDescription: string;
  selectedPermissions: string[];
  onRoleNameChange: (value: string) => void;
  onRoleDescriptionChange: (value: string) => void;
  onTogglePermission: (permission: string) => void;
  onSave: () => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
  assignedUsers?: number;
}

export function RoleEditPanel({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  isNewRole,
  roleName,
  roleDescription,
  selectedPermissions,
  onRoleNameChange,
  onRoleDescriptionChange,
  onTogglePermission,
  onSave,
  onSelectAll,
  onSelectNone,
  assignedUsers = 0
}: RoleEditPanelProps) {
  const { t } = useLanguage();
  
  // Generate permission labels based on current language
  const getPermissionLabel = (perm: string): string => {
    const permMap: Record<string, string> = {
      create: t.tenantAdmin.roleManagement.permCreate,
      read: t.tenantAdmin.roleManagement.permRead,
      update: t.tenantAdmin.roleManagement.permUpdate,
      delete: t.tenantAdmin.roleManagement.permDelete,
      manage_users: t.tenantAdmin.roleManagement.permManageUsers,
      manage_settings: t.tenantAdmin.roleManagement.permManageSettings,
      manage_roles: t.tenantAdmin.roleManagement.permManageRoles,
      view_reports: t.tenantAdmin.roleManagement.permViewReports,
      export_data: t.tenantAdmin.roleManagement.permExportData,
      import_data: t.tenantAdmin.roleManagement.permImportData
    };
    return permMap[perm] || perm;
  };
  
  // Ref for the panel
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Close panel when clicking outside
  useClickOutside(panelRef, () => {
    if (isOpen) {
      onClose();
    }
  }, isOpen);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Transparent Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent z-[39]"
            onClick={onClose}
          />
          
          <motion.div
            ref={panelRef}
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
            className="fixed right-0 top-16 bottom-0 z-40 flex flex-col w-full sm:w-[400px]"
            style={{
              backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
              boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
              borderLeft: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e1dfdd'
            }}
          >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-4 flex-shrink-0"
            style={{
              height: '57px',
              backgroundColor: '#DE851D',
              borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e1dfdd'
            }}
          >
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5" style={{ color: '#000000' }} />
              <h2 className="font-medium" style={{ color: '#000000' }}>
                {isNewRole ? t.tenantAdmin.roleManagement.newRole : t.tenantAdmin.roleManagement.editRole}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:border hover:border-black hover:bg-transparent transition-colors"
            >
              <X className="h-4 w-4" style={{ color: '#000000' }} />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <style>{`
              .flex-1.overflow-y-auto.px-6.py-6::-webkit-scrollbar {
                width: 8px;
                background: transparent;
              }
              .flex-1.overflow-y-auto.px-6.py-6::-webkit-scrollbar-thumb {
                background: #e1dfdd;
                border-radius: 4px;
              }
              .flex-1.overflow-y-auto.px-6.py-6::-webkit-scrollbar-thumb:hover {
                background: #d1cfcd;
              }
            `}</style>
            <div className="space-y-6">
              {/* Subtitle */}
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                {t.tenantAdmin.roleManagement.subtitle}
              </p>

              {/* Grundinformationen */}
              <div className="space-y-4">
                <h3 className="font-medium">{t.tenantAdmin.roleManagement.basicInfo}</h3>

                <div className="space-y-2">
                  <Label htmlFor="role-name">{t.tenantAdmin.roleManagement.roleNameLabel}</Label>
                  <Input 
                    id="role-name"
                    placeholder={t.tenantAdmin.roleManagement.roleNamePlaceholder}
                    value={roleName}
                    onChange={(e) => onRoleNameChange(e.target.value)}
                    className="hover:border-[#E9C796] transition-colors"
                    style={{
                      borderColor: '#e1dfdd'
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role-description">{t.tenantAdmin.roleManagement.descriptionLabel}</Label>
                  <Textarea 
                    id="role-description"
                    placeholder={t.tenantAdmin.roleManagement.descriptionPlaceholder}
                    value={roleDescription}
                    onChange={(e) => onRoleDescriptionChange(e.target.value)}
                    className="hover:border-[#E9C796] transition-colors"
                    style={{
                      borderColor: '#e1dfdd'
                    }}
                  />
                </div>

                {!isNewRole && (
                  <div className="space-y-2">
                    <Label>{t.tenantAdmin.roleManagement.usersLabel}</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div 
                          className="text-sm font-medium cursor-pointer hover:bg-[#E9C796] transition-colors px-3 py-2 rounded border"
                          style={{
                            borderColor: '#e1dfdd'
                          }}
                        >
                          {assignedUsers} {t.tenantAdmin.roleManagement.assignedUsers.split(' ')[1]}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                        align="start"
                        className="w-64 max-h-64 overflow-y-auto"
                        style={{
                          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                          borderColor: '#e1dfdd'
                        }}
                      >
                        <style>{`
                          [data-radix-scroll-area-viewport] {
                            background: transparent !important;
                          }
                          ::-webkit-scrollbar {
                            width: 8px;
                            background: transparent;
                          }
                          ::-webkit-scrollbar-thumb {
                            background: #e1dfdd;
                            border-radius: 4px;
                          }
                          ::-webkit-scrollbar-thumb:hover {
                            background: #d1cfcd;
                          }
                        `}</style>
                        {(() => {
                          // Mock-Nutzer basierend auf der Rolle
                          const usersByRole: { [key: string]: string[] } = {
                            "Admin": ["Max Müller", "Anna Schmidt", "Thomas Weber"],
                            "Power User": ["Sarah Johnson", "Michael Brown", "Emma Davis", "Daniel Wilson", "Olivia Taylor", "James Anderson", "Sophia Martinez", "Lucas Garcia", "Isabella Rodriguez", "Noah Lee", "Mia White", "Ethan Harris"],
                            "Content Manager": ["Julia Fischer", "Martin Klein", "Laura Hoffmann", "Sebastian Koch", "Maria Becker"],
                            "Viewer": ["Hannah Stewart", "Nathan Morris"]
                          };
                          const users = usersByRole[roleName] || [];
                          return users.length > 0 ? (
                            users.map((userName) => (
                              <DropdownMenuItem 
                                key={userName}
                                className="hover:bg-[#E9C796] focus:bg-[#E9C796] data-[highlighted]:bg-[#E9C796] transition-colors cursor-pointer"
                              >
                                {userName}
                              </DropdownMenuItem>
                            ))
                          ) : (
                            <DropdownMenuItem disabled>
                              {t.tenantAdmin.roleManagement.noUsersAssigned}
                            </DropdownMenuItem>
                          );
                        })()}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>

              {/* Berechtigungen */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{t.tenantAdmin.roleManagement.permissionsLabel}</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={onSelectAll}
                      className="h-8 text-xs hover:bg-[#E9C796] transition-colors"
                    >
                      {t.tenantAdmin.roleManagement.selectAll}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={onSelectNone}
                      className="h-8 text-xs hover:bg-[#E9C796] transition-colors"
                    >
                      {t.tenantAdmin.roleManagement.selectNone}
                    </Button>
                  </div>
                </div>

                {/* Basis-Berechtigungen */}
                <div 
                  className="space-y-3 p-4 rounded-lg"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb',
                    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e1dfdd'
                  }}
                >
                  <h4 className="text-sm font-medium">{t.tenantAdmin.roleManagement.basicPermissions}</h4>
                  <div className="space-y-3">
                    {['create', 'read', 'update', 'delete'].map((perm) => (
                      <div key={perm} className="flex items-center gap-2 hover:bg-[#E9C796] transition-colors rounded px-2 py-1 -mx-2">
                        <Checkbox
                          id={`perm-${perm}`}
                          checked={selectedPermissions.includes(perm)}
                          onCheckedChange={() => onTogglePermission(perm)}
                          className="hover:bg-[#E9C796] data-[state=checked]:bg-[#E9C796] data-[state=checked]:border-[#E9C796] data-[state=checked]:text-black transition-colors"
                          style={{
                            borderColor: selectedPermissions.includes(perm) ? '#E9C796' : '#e1dfdd'
                          }}
                        />
                        <Label 
                          htmlFor={`perm-${perm}`}
                          className="cursor-pointer flex-1"
                        >
                          {getPermissionLabel(perm)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verwaltungsrechte */}
                <div 
                  className="space-y-3 p-4 rounded-lg"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb',
                    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e1dfdd'
                  }}
                >
                  <h4 className="text-sm font-medium">{t.tenantAdmin.roleManagement.adminRights}</h4>
                  <div className="space-y-3">
                    {['manage_users', 'manage_settings', 'manage_roles', 'view_reports'].map((perm) => (
                      <div key={perm} className="flex items-center gap-2 hover:bg-[#E9C796] transition-colors rounded px-2 py-1 -mx-2">
                        <Checkbox
                          id={`perm-${perm}`}
                          checked={selectedPermissions.includes(perm)}
                          onCheckedChange={() => onTogglePermission(perm)}
                          className="hover:bg-[#E9C796] data-[state=checked]:bg-[#E9C796] data-[state=checked]:border-[#E9C796] data-[state=checked]:text-black transition-colors"
                          style={{
                            borderColor: selectedPermissions.includes(perm) ? '#E9C796' : '#e1dfdd'
                          }}
                        />
                        <Label 
                          htmlFor={`perm-${perm}`}
                          className="cursor-pointer flex-1"
                        >
                          {getPermissionLabel(perm)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Datenrechte */}
                <div 
                  className="space-y-3 p-4 rounded-lg"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb',
                    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e1dfdd'
                  }}
                >
                  <h4 className="text-sm font-medium">{t.tenantAdmin.roleManagement.dataRights}</h4>
                  <div className="space-y-3">
                    {['export_data', 'import_data'].map((perm) => (
                      <div key={perm} className="flex items-center gap-2 hover:bg-[#E9C796] transition-colors rounded px-2 py-1 -mx-2">
                        <Checkbox
                          id={`perm-${perm}`}
                          checked={selectedPermissions.includes(perm)}
                          onCheckedChange={() => onTogglePermission(perm)}
                          className="hover:bg-[#E9C796] data-[state=checked]:bg-[#E9C796] data-[state=checked]:border-[#E9C796] data-[state=checked]:text-black transition-colors"
                          style={{
                            borderColor: selectedPermissions.includes(perm) ? '#E9C796' : '#e1dfdd'
                          }}
                        />
                        <Label 
                          htmlFor={`perm-${perm}`}
                          className="cursor-pointer flex-1"
                        >
                          {getPermissionLabel(perm)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div 
            className="flex-shrink-0 p-6 flex gap-3"
            style={{
              borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e1dfdd'
            }}
          >
            <Button
              onClick={onClose}
              className="flex-1 bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={onSave}
              className="flex-1 bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.save}
            </Button>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}