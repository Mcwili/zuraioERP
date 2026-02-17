import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { UserPlus, Edit, MoreVertical, Trash2, Shield, Users as UsersIcon } from "lucide-react";
import { useLanguage, useExtendedTranslations } from "../utils/i18n";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { RoleEditPanel } from "./RoleEditPanel";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

interface Role {
  id: number;
  name: string;
  description: string;
  users: number;
  permissions: string[];
  isSystem?: boolean;
  responsibility?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  source: string;
  role: string;
  status: string;
  lastLogin: string;
  syncedAt?: string;
  groups: string[];
  departments: string[];
}

interface ResponsibilitiesSettingsProps {
  isDarkMode?: boolean;
  onNavigate?: (section: string) => void;
}

export function ResponsibilitiesSettings({ isDarkMode = false, onNavigate }: ResponsibilitiesSettingsProps) {
  const { t } = useLanguage();
  const tExt = useExtendedTranslations();
  
  // Mock user data
  const defaultUsers: User[] = [
    { id: 1, name: "Rolf Müller", email: "rolf.mueller@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 2 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 2, name: "Marianne Locher", email: "marianne.locher@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 3 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 3, name: "Gregor Keist", email: "gregor.keist@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 1 Stunde", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 4, name: "Daniel Hanselmann", email: "daniel.hanselmann@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 5 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 5, name: "Roland Steiner", email: "roland.steiner@rmbgroup.ch", source: "azure", role: "Admin", status: "active", lastLogin: "vor 1 Stunde", syncedAt: "29.10.2025, 14:30", groups: ["Administrators", "Products"], departments: ["Produkte"] },
    { id: 6, name: "Benjamin Koch", email: "benjamin.koch@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 4 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Management"], departments: ["Management"] },
    { id: 7, name: "Pascal Koch", email: "pascal.koch@rmbgroup.ch", source: "azure", role: "Power User", status: "active", lastLogin: "vor 2 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Management", "Purchasing", "Logistics", "Engineering"], departments: ["Management", "Einkauf", "Logistik", "Technik"] },
  ];

  const getUserCountByRole = (roleName: string) => {
    return defaultUsers.filter(user => user.role === roleName).length;
  };

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Systemkonformität",
      description: "Technische und rechtliche Konformität des KI-Systems",
      users: 0,
      permissions: ["Systemarchitektur", "Compliance-Prüfung", "Zertifizierung", "Risikobewertung"],
      isSystem: true,
      responsibility: "Anbieter"
    },
    {
      id: 2,
      name: "Nutzungskonformität",
      description: "Richtiger Einsatz in HR, Normen etc.",
      users: 0,
      permissions: ["HR-Richtlinien", "Anwendungsstandards", "Prozesskonformität", "Best Practices"],
      isSystem: true,
      responsibility: "Tenant"
    },
    {
      id: 3,
      name: "Schulung",
      description: "Aufklärung über KI-Einsatz und Grenzen",
      users: 0,
      permissions: ["Mitarbeiterschulung", "Dokumentation", "Awareness-Programme", "Workshops"],
      isSystem: true,
      responsibility: "Beide"
    },
    {
      id: 4,
      name: "Datenschutzrolle",
      description: "Klare Regelung via AVV",
      users: 0,
      permissions: ["DSGVO-Compliance", "AVV-Verwaltung", "Datenschutzaudit", "Privacy-Kontrolle"],
      isSystem: true,
      responsibility: "Beide"
    },
    {
      id: 5,
      name: "Supportzugriff",
      description: "Nur mit vertraglicher Absicherung",
      users: 0,
      permissions: ["Vertragsmanagement", "Zugriffssteuerung", "SLA-Überwachung", "Eskalation"],
      isSystem: true,
      responsibility: "Tenant"
    },
    {
      id: 6,
      name: "Betroffeneninfo",
      description: "Datenschutzerklärung und Transparenzpflicht",
      users: 0,
      permissions: ["Informationspflicht", "Transparenzdokumentation", "Betroffenenrechte", "Kommunikation"],
      isSystem: true,
      responsibility: "Tenant"
    },
    {
      id: 7,
      name: "Technische Dokumentation",
      description: "System- vs. Nutzungsebene differenzieren",
      users: 0,
      permissions: ["Systemdokumentation", "Nutzerdokumentation", "Versionsverwaltung", "Änderungsprotokoll"],
      isSystem: true,
      responsibility: "Beide"
    }
  ]);

  const [showRoleSheet, setShowRoleSheet] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isNewRole, setIsNewRole] = useState(false);
  const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const permissionLabels: Record<string, string> = {
    create: "Erstellen",
    read: "Lesen",
    update: "Bearbeiten",
    delete: "Löschen",
    manage_users: "Benutzer verwalten",
    manage_settings: "Einstellungen verwalten",
    manage_roles: "Rollen verwalten",
    view_reports: "Berichte ansehen",
    export_data: "Daten exportieren",
    import_data: "Daten importieren"
  };

  const availablePermissions = Object.keys(permissionLabels);

  const handleCreateRole = () => {
    setIsNewRole(true);
    setEditingRole(null);
    setRoleName("");
    setRoleDescription("");
    setSelectedPermissions([]);
    setShowRoleSheet(true);
  };

  const handleEditRole = (role: Role) => {
    setIsNewRole(false);
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setSelectedPermissions(role.permissions);
    setShowRoleSheet(true);
  };

  const handleDuplicateRole = (role: Role) => {
    setIsNewRole(true);
    setEditingRole(null);
    setRoleName(`${role.name} (Kopie)`);
    setRoleDescription(role.description);
    setSelectedPermissions(role.permissions);
    setShowRoleSheet(true);
  };

  const handleSaveRole = () => {
    if (isNewRole) {
      const newRole: Role = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        name: roleName,
        description: roleDescription,
        users: 0,
        permissions: selectedPermissions
      };
      setRoles([...roles, newRole]);
    } else if (editingRole) {
      setRoles(roles.map(r => 
        r.id === editingRole.id 
          ? { ...r, name: roleName, description: roleDescription, permissions: selectedPermissions }
          : r
      ));
    }
    setShowRoleSheet(false);
  };

  const handleDeleteRole = (roleId: number) => {
    setRoleToDelete(roleId);
    setDeleteRoleDialogOpen(true);
  };

  const confirmDeleteRole = () => {
    if (roleToDelete !== null) {
      setRoles(roles.filter(r => r.id !== roleToDelete));
      setRoleToDelete(null);
    }
    setDeleteRoleDialogOpen(false);
  };

  const togglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleSelectAllPermissions = () => {
    setSelectedPermissions(availablePermissions);
  };

  const handleSelectNoPermissions = () => {
    setSelectedPermissions([]);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Settings Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <UsersIcon className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          Verantwortlichkeiten
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 sm:px-6 md:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Verantwortlichkeiten (Rollen & Rechte) */}
            <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-semibold" style={{ color: '#000000' }}>Verantwortlichkeiten</CardTitle>
                    <CardDescription style={{ color: '#000000' }}>Verwalten Sie Rollen und deren Berechtigungen</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Verantwortlichkeiten</TableHead>
                      <TableHead>Beschreibung</TableHead>
                      <TableHead>Verantwortung</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id} className="hover:bg-[#E9C796] transition-colors">
                        <TableCell className="pl-6">
                          <span className="font-medium">{role.name}</span>
                        </TableCell>
                        <TableCell>
                          <span style={{ color: 'var(--foreground-muted)' }}>{role.description}</span>
                        </TableCell>
                        <TableCell>
                          <span 
                            className="px-2 py-1 rounded text-xs border"
                            style={{ 
                              border: '1px solid #e1dfdd',
                              backgroundColor: 'transparent'
                            }}
                          >
                            {role.responsibility || "Beide"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Role Edit Panel */}
      <RoleEditPanel
        isOpen={showRoleSheet}
        onClose={() => setShowRoleSheet(false)}
        isNewRole={isNewRole}
        roleName={roleName}
        setRoleName={setRoleName}
        roleDescription={roleDescription}
        setRoleDescription={setRoleDescription}
        selectedPermissions={selectedPermissions}
        togglePermission={togglePermission}
        handleSelectAllPermissions={handleSelectAllPermissions}
        handleSelectNoPermissions={handleSelectNoPermissions}
        handleSaveRole={handleSaveRole}
        permissionLabels={permissionLabels}
        availablePermissions={availablePermissions}
        isDarkMode={isDarkMode}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteRoleDialogOpen} onOpenChange={setDeleteRoleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.tenantAdmin.userManagement.roles.deleteRole}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.tenantAdmin.userManagement.roles.deleteRoleConfirm}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.tenantAdmin.userManagement.users.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteRole}>
              {t.tenantAdmin.userManagement.roles.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}