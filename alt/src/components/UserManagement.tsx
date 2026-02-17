import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Alert, AlertDescription } from "./ui/alert";
import { Checkbox } from "./ui/checkbox";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RoleEditPanel } from "./RoleEditPanel";
import { LoadingState, TableLoadingState } from "./ui/loading-state";
import { EmptyState } from "./ui/empty-state";
import { ConfirmationDialog } from "./ui/confirmation-dialog";
import { BulkActionsBar } from "./BulkActionsBar";
import { DsgvoManagementPage } from "./DsgvoManagementPage";
import { useLanguage, useExtendedTranslations } from "../utils/i18n";
import { 
  UserPlus, 
  Search, 
  MoreVertical, 
  Shield, 
  Edit, 
  Trash2,
  Download,
  Upload,
  CheckCircle2,
  XCircle,
  RefreshCw,
  AlertTriangle,
  Users,
  Cloud,
  User,
  Lock,
  ExternalLink,
  FileText,
  UserCheck,
  Merge,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  X,
  Building2,
  Plus,
  Check,
  Maximize2
} from "lucide-react";

type UserSource = "local" | "azure" | "google";
type UserStatus = "active" | "inactive" | "locked";
type UserApproval = "authorized" | "not_authorized";

interface User {
  id: number;
  name: string;
  email: string;
  source: UserSource;
  role: string;
  approval?: UserApproval;
  status: UserStatus;
  lastLogin: string;
  syncedAt?: string;
  groups?: string[];
  isDuplicate?: boolean;
  departments?: string[];
}

interface UserManagementProps {
  section: string;
  isDarkMode?: boolean;
  onPanelOpen?: (panelName: string) => void;
  panelZIndex?: Record<string, number>;
  allUsers?: User[];
  onUsersChange?: (users: User[]) => void;
}

interface Department {
  id: number;
  name: string;
  promptCategories: string[];
  status: "active" | "inactive";
  users: number;
  assignedUsers?: string[];
}

export function UserManagement({ section, isDarkMode, onPanelOpen, panelZIndex, allUsers: propAllUsers, onUsersChange }: UserManagementProps) {
  const { t } = useLanguage();
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: "Vertrieb",
      promptCategories: ["Markt & Wettbewerb", "Planung & Umsetzung", "Strategie & Wachstum", "Vertrieb", "Kundenservice", "Lernen & Wissen", "Organisation & Zusammenarbeit", "Coaching & Entwicklung", "Prompt-Erstellung & Optimierung", "Qualitäts- & Ausgabeverbesserung", "Kritische Analyse & Vorfragen"],
      status: "active",
      users: 7,
      assignedUsers: ["Rolf Müller", "Marianne Locher", "Gregor Keist", "Daniel Hanselmann", "Andy Haas", "Samuel Mattmüller", "Martin Keist"]
    },
    {
      id: 2,
      name: "Management",
      promptCategories: ["Markt & Wettbewerb", "Strategie & Wachstum", "Vertrieb", "Kundenservice", "Finanzen & Reporting", "Lernen & Wissen", "Organisation & Zusammenarbeit", "Coaching & Entwicklung", "Prompt-Erstellung & Optimierung", "Qualitäts- & Ausgabeverbesserung", "Kritische Analyse & Vorfragen"],
      status: "active",
      users: 3,
      assignedUsers: ["Benjamin Koch", "Pascal Koch", "Andy Haas"]
    },
    {
      id: 3,
      name: "Logistik",
      promptCategories: ["Planung & Umsetzung", "Kundenservice", "Lernen & Wissen", "Organisation & Zusammenarbeit", "Coaching & Entwicklung", "Prompt-Erstellung & Optimierung", "Qualitäts- & Ausgabeverbesserung", "Kritische Analyse & Vorfragen"],
      status: "active",
      users: 2,
      assignedUsers: ["Pascal Koch", "Marko Vukic"]
    },
    {
      id: 4,
      name: "Produkte",
      promptCategories: ["Markt & Wettbewerb", "Planung & Umsetzung", "Lernen & Wissen", "Organisation & Zusammenarbeit", "Coaching & Entwicklung", "Prompt-Erstellung & Optimierung", "Qualitäts- & Ausgabeverbesserung", "Kritische Analyse & Vorfragen"],
      status: "active",
      users: 1,
      assignedUsers: ["Roland Steiner"]
    },
    {
      id: 5,
      name: "Einkauf",
      promptCategories: ["Markt & Wettbewerb", "Lernen & Wissen", "Coaching & Entwicklung", "Prompt-Erstellung & Optimierung", "Qualitäts- & Ausgabeverbesserung", "Kritische Analyse & Vorfragen"],
      status: "active",
      users: 1,
      assignedUsers: ["Pascal Koch"]
    },
    {
      id: 6,
      name: "Technik",
      promptCategories: ["Planung & Umsetzung", "Kundenservice", "Lernen & Wissen", "Coaching & Entwicklung", "Prompt-Erstellung & Optimierung", "Qualitäts- & Ausgabeverbesserung", "Kritische Analyse & Vorfragen"],
      status: "active",
      users: 2,
      assignedUsers: ["Pascal Koch", "Silvio Müller"]
    },
    {
      id: 7,
      name: "Marketing",
      promptCategories: ["Markt & Wettbewerb", "Vertrieb", "Kundenservice"],
      status: "active",
      users: 3,
      assignedUsers: ["Andy Haas", "Murat Oetzi", "Ali Bonemi"]
    },
    {
      id: 8,
      name: "Planung",
      promptCategories: ["Markt & Wettbewerb", "Planung & Umsetzung", "Lernen & Wissen", "Coaching & Entwicklung", "Prompt-Erstellung & Optimierung", "Qualitäts- & Ausgabeverbesserung", "Kritische Analyse & Vorfragen"],
      status: "active",
      users: 1,
      assignedUsers: ["Micha Graf"]
    },
    {
      id: 9,
      name: "Finanzen",
      promptCategories: ["Markt & Wettbewerb", "Strategie & Wachstum", "Finanzen & Reporting", "Lernen & Wissen", "Organisation & Zusammenarbeit", "Coaching & Entwicklung", "Prompt-Erstellung & Optimierung", "Qualitäts- & Ausgabeverbesserung", "Kritische Analyse & Vorfragen"],
      status: "active",
      users: 1,
      assignedUsers: ["Patrick Berther"]
    },
    {
      id: 10,
      name: "IT",
      promptCategories: ["Planung & Umsetzung", "Lernen & Wissen", "Coaching & Entwicklung"],
      status: "active",
      users: 1,
      assignedUsers: ["Stefan Seiler"]
    },
    {
      id: 11,
      name: "Produktion",
      promptCategories: ["Planung & Umsetzung", "Kundenservice", "Lernen & Wissen"],
      status: "active",
      users: 4,
      assignedUsers: ["Fritz Baumann", "Susanne Meier", "Stefanie Gruber", "Svenja Josip"]
    },
    {
      id: 12,
      name: "Digitalisierung",
      promptCategories: ["Planung & Umsetzung", "Lernen & Wissen", "Coaching & Entwicklung"],
      status: "active",
      users: 1,
      assignedUsers: ["Lara Huber"]
    },
    {
      id: 13,
      name: "Projekte",
      promptCategories: ["Planung & Umsetzung", "Organisation & Zusammenarbeit"],
      status: "active",
      users: 1,
      assignedUsers: ["Monika Frey"]
    },
    {
      id: 14,
      name: "Entwicklung",
      promptCategories: ["Planung & Umsetzung", "Lernen & Wissen", "Coaching & Entwicklung"],
      status: "active",
      users: 2,
      assignedUsers: ["Ana Kuzic", "Ariton Vukic"]
    }
  ]);

  if (section === "users") {
    return <UsersPage isDarkMode={isDarkMode} onPanelOpen={onPanelOpen} panelZIndex={panelZIndex} allUsers={propAllUsers} onUsersChange={onUsersChange} departments={departments} />;
  } else if (section === "dsgvo") {
    return <DsgvoManagementPage isDarkMode={isDarkMode} onPanelOpen={onPanelOpen} panelZIndex={panelZIndex} allUsers={propAllUsers} onUsersChange={onUsersChange} />;
  } else if (section === "roles") {
    return <RolesPage isDarkMode={isDarkMode} onPanelOpen={onPanelOpen} panelZIndex={panelZIndex} allUsers={propAllUsers} />;
  } else if (section === "departments") {
    return <DepartmentsPage isDarkMode={isDarkMode} onPanelOpen={onPanelOpen} panelZIndex={panelZIndex} allUsers={propAllUsers} departments={departments} onDepartmentsChange={setDepartments} />;
  }
  return <UsersPage isDarkMode={isDarkMode} onPanelOpen={onPanelOpen} panelZIndex={panelZIndex} allUsers={propAllUsers} onUsersChange={onUsersChange} departments={departments} />;
}

function UsersPage({ isDarkMode, onPanelOpen, panelZIndex, allUsers: propAllUsers, onUsersChange, departments: propDepartments }: { isDarkMode?: boolean; onPanelOpen?: (panelName: string) => void; panelZIndex?: Record<string, number>; allUsers?: User[]; onUsersChange?: (users: User[]) => void; departments?: Department[] }) {
  const { t } = useLanguage();
  const te = useExtendedTranslations();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showMergeBanner, setShowMergeBanner] = useState(true);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success">("idle");
  const [isMaximized, setIsMaximized] = useState(false);
  const [isTableMaximized, setIsTableMaximized] = useState(false);
  
  // Loading and Confirmation States
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });
  const [deactivateConfirmation, setDeactivateConfirmation] = useState<{ open: boolean; user: User | null }>({ open: false, user: null });
  
  // Bulk Selection State
  const [selectedUserIds, setSelectedUserIds] = useState<Set<number>>(new Set());
  const [bulkDeleteConfirmation, setBulkDeleteConfirmation] = useState(false);
  const [bulkDeactivateConfirmation, setBulkDeactivateConfirmation] = useState(false);
  const [bulkActivateConfirmation, setBulkActivateConfirmation] = useState(false);
  
  // Sorting & Filtering State
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sourceFilter, setSourceFilter] = useState<UserSource[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<UserStatus[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);
  const [approvalFilter, setApprovalFilter] = useState<UserApproval[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  // Available departments list - use from props or fallback to default
  const availableDepartments = propDepartments 
    ? propDepartments.map(dept => dept.name)
    : [
      "Management",
      "Recht",
      "Finanzen",
      "Personal",
      "Vertrieb",
      "Marketing",
      "Produkte",
      "Einkauf",
      "Entwicklung",
      "Projekte",
      "Planung",
      "Produktion",
      "Technik",
      "Logistik",
      "IT",
      "Digitalisierung",
      "Umwelt"
    ];

  // Use prop data if available, otherwise fall back to local state with initial data
  const defaultUsers: User[] = [
    { 
      id: 1, 
      name: "Rolf Müller", 
      email: "rolf.mueller@rmbgroup.ch", 
      source: "azure",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 2 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 2, 
      name: "Marianne Locher", 
      email: "marianne.locher@rmbgroup.ch", 
      source: "azure",
      role: "User",
      approval: "not_authorized",
      status: "active",
      lastLogin: "vor 3 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 3, 
      name: "Gregor Keist", 
      email: "gregor.keist@rmbgroup.ch", 
      source: "azure",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 1 Stunde",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 4, 
      name: "Daniel Hanselmann", 
      email: "daniel.hanselmann@rmbgroup.ch", 
      source: "azure",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 5 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 5, 
      name: "Roland Steiner", 
      email: "roland.steiner@rmbgroup.ch", 
      source: "azure",
      role: "Admin",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 1 Stunde",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Administrators", "Products"],
      departments: ["Produkte"]
    },
    { 
      id: 6, 
      name: "Benjamin Koch", 
      email: "benjamin.koch@rmbgroup.ch", 
      source: "azure",
      role: "User",
      approval: "not_authorized",
      status: "active",
      lastLogin: "vor 4 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Management"],
      departments: ["Management"]
    },
    { 
      id: 7, 
      name: "Pascal Koch", 
      email: "pascal.koch@rmbgroup.ch", 
      source: "azure",
      role: "Power User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 2 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Management", "Purchasing", "Logistics", "Engineering"],
      departments: ["Management", "Einkauf", "Logistik", "Technik"]
    },
    { 
      id: 8, 
      name: "Andy Haas", 
      email: "andy.haas@rmbgroup.ch", 
      source: "azure",
      role: "User",
      approval: "not_authorized",
      status: "active",
      lastLogin: "vor 6 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Management", "Sales", "Marketing"],
      departments: ["Management", "Vertrieb", "Marketing"]
    },
    { 
      id: 9, 
      name: "Marko Vukic", 
      email: "marko.vukic@rmbgroup.ch", 
      source: "azure",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 1 Tag",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Logistics"],
      departments: ["Logistik"]
    },
    { 
      id: 10, 
      name: "Micha Graf", 
      email: "micha.graf@rmbgroup.ch", 
      source: "azure",
      role: "User",
      approval: "not_authorized",
      status: "active",
      lastLogin: "vor 8 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Planning"],
      departments: ["Planung"]
    },
    { 
      id: 11, 
      name: "Patrick Berther", 
      email: "patrick.berther@rmbgroup.ch", 
      source: "azure",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 3 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Finance"],
      departments: ["Finanzen"]
    },
    { 
      id: 12, 
      name: "Samuel Mattmüller", 
      email: "samuel.mattmueller@rmbgroup.ch", 
      source: "azure",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 5 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 13, 
      name: "Martin Keist", 
      email: "martin.keist@rmbgroup.ch", 
      source: "azure",
      role: "Power User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 2 Stunden",
      syncedAt: "29.10.2025, 14:30",
      groups: ["Sales"],
      departments: ["Vertrieb"]
    },
    { 
      id: 14, 
      name: "Silvio Müller", 
      email: "silvio.mueller@rmbgroup.ch", 
      source: "local",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 3 Stunden",
      groups: [],
      departments: ["Technik"]
    },
    { 
      id: 15, 
      name: "Stefan Seiler", 
      email: "stefan.seiler@rmbgroup.ch", 
      source: "local",
      role: "User",
      approval: "not_authorized",
      status: "active",
      lastLogin: "vor 1 Stunde",
      groups: [],
      departments: ["IT"]
    },
    { 
      id: 16, 
      name: "Fritz Baumann", 
      email: "fritz.baumann@rmbgroup.ch", 
      source: "local",
      role: "Power User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 5 Stunden",
      groups: [],
      departments: ["Produktion"]
    },
    { 
      id: 17, 
      name: "Susanne Meier", 
      email: "susanne.meier@rmbgroup.ch", 
      source: "local",
      role: "User",
      approval: "not_authorized",
      status: "active",
      lastLogin: "vor 2 Stunden",
      groups: [],
      departments: ["Produktion"]
    },
    { 
      id: 18, 
      name: "Stefanie Gruber", 
      email: "stefanie.gruber@rmbgroup.ch", 
      source: "local",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 4 Stunden",
      groups: [],
      departments: ["Produktion"]
    },
    { 
      id: 19, 
      name: "Lara Huber", 
      email: "lara.huber@rmbgroup.ch", 
      source: "local",
      role: "Power User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 1 Stunde",
      groups: [],
      departments: ["Digitalisierung"]
    },
    { 
      id: 20, 
      name: "Monika Frey", 
      email: "monika.frey@rmbgroup.ch", 
      source: "local",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 6 Stunden",
      groups: [],
      departments: ["Projekte"]
    },
    { 
      id: 21, 
      name: "Ana Kuzic", 
      email: "ana.kuzic@rmbgroup.ch", 
      source: "local",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 3 Stunden",
      groups: [],
      departments: ["Entwicklung"]
    },
    { 
      id: 22, 
      name: "Svenja Josip", 
      email: "svenja.josip@rmbgroup.ch", 
      source: "local",
      role: "Power User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 2 Stunden",
      groups: [],
      departments: ["Produktion"]
    },
    { 
      id: 23, 
      name: "Ariton Vukic", 
      email: "ariton.vukic@rmbgroup.ch", 
      source: "local",
      role: "User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 5 Stunden",
      groups: [],
      departments: ["Entwicklung"]
    },
    { 
      id: 24, 
      name: "Murat Oetzi", 
      email: "murat.oetzi@rmbgroup.ch", 
      source: "local",
      role: "User",
      approval: "not_authorized",
      status: "active",
      lastLogin: "vor 4 Stunden",
      groups: [],
      departments: ["Marketing"]
    },
    { 
      id: 25, 
      name: "Ali Bonemi", 
      email: "Ali.bonemi@rmbgroup.ch", 
      source: "local",
      role: "Power User",
      approval: "authorized",
      status: "active",
      lastLogin: "vor 1 Stunde",
      groups: [],
      departments: ["Marketing"]
    },
  ];

  const [localUsers, setLocalUsers] = useState<User[]>(defaultUsers);
  const allUsers = propAllUsers || localUsers; // 25 Benutzer inklusive 12 neue lokale Benutzer
  const setAllUsers = onUsersChange || setLocalUsers;

  // Mark duplicate users (same name AND email)
  const usersWithDuplicateMarks = allUsers.map(user => {
    const duplicateCount = allUsers.filter(u => 
      u.name === user.name && u.email === user.email
    ).length;
    return {
      ...user,
      isDuplicate: duplicateCount > 1
    };
  });

  const filteredUsers = usersWithDuplicateMarks.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply column filters
    const matchesSource = sourceFilter.length === 0 || sourceFilter.includes(user.source);
    const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.role);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(user.status);
    const matchesDepartment = departmentFilter.length === 0 || 
                              (user.departments && user.departments.some(dept => departmentFilter.includes(dept)));
    
    // Calculate effective approval status (with fallback for Admin/Power User)
    const effectiveApproval = user.approval || (user.role === 'Admin' || user.role === 'Power User' ? 'authorized' : 'not_authorized');
    const matchesApproval = approvalFilter.length === 0 || approvalFilter.includes(effectiveApproval as UserApproval);
    
    let matchesTab = true;
    if (activeTab === "local") matchesTab = user.source === "local";
    if (activeTab === "sso") matchesTab = user.source === "azure" || user.source === "google";
    if (activeTab === "inactive") matchesTab = user.status === "inactive" || user.status === "locked";
    
    return matchesSearch && matchesTab && matchesSource && matchesRole && matchesStatus && matchesDepartment && matchesApproval;
  }).sort((a, b) => {
    if (!sortColumn) return 0;
    
    let aVal: any = a[sortColumn as keyof User];
    let bVal: any = b[sortColumn as keyof User];
    
    // Handle sorting
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal);
    }
    
    return 0;
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction or clear
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const toggleSourceFilter = (source: UserSource) => {
    setSourceFilter(prev => 
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
  };

  const toggleRoleFilter = (role: string) => {
    setRoleFilter(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const toggleStatusFilter = (status: UserStatus) => {
    setStatusFilter(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const toggleApprovalFilter = (approval: UserApproval) => {
    setApprovalFilter(prev => 
      prev.includes(approval) ? prev.filter(a => a !== approval) : [...prev, approval]
    );
  };
  
  // Bulk Action Handlers
  const handleSelectAll = () => {
    const allIds = new Set(filteredUsers.map(u => u.id));
    setSelectedUserIds(allIds);
  };
  
  const handleDeselectAll = () => {
    setSelectedUserIds(new Set());
  };
  
  const handleToggleUser = (userId: number) => {
    setSelectedUserIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };
  
  const handleBulkDelete = () => {
    const selectedUsers = allUsers.filter(u => selectedUserIds.has(u.id));
    const updatedUsers = allUsers.filter(u => !selectedUserIds.has(u.id));
    setAllUsers(updatedUsers);
    setSelectedUserIds(new Set());
    setBulkDeleteConfirmation(false);
  };
  
  const handleBulkActivate = () => {
    const updatedUsers = allUsers.map(u => 
      selectedUserIds.has(u.id) ? { ...u, status: 'active' as UserStatus } : u
    );
    setAllUsers(updatedUsers);
    setSelectedUserIds(new Set());
    setBulkActivateConfirmation(false);
  };
  
  const handleBulkDeactivate = () => {
    const updatedUsers = allUsers.map(u => 
      selectedUserIds.has(u.id) ? { ...u, status: 'inactive' as UserStatus } : u
    );
    setAllUsers(updatedUsers);
    setSelectedUserIds(new Set());
    setBulkDeactivateConfirmation(false);
  };
  
  const handleBulkExport = () => {
    const selectedUsers = allUsers.filter(u => selectedUserIds.has(u.id));
    const csvContent = [
      ['Name', 'Email', 'Source', 'Role', 'Status', 'Last Login'],
      ...selectedUsers.map(u => [u.name, u.email, u.source, u.role, u.status, u.lastLogin])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleDepartmentFilter = (department: string) => {
    setDepartmentFilter(prev => 
      prev.includes(department) ? prev.filter(d => d !== department) : [...prev, department]
    );
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-3 w-3 ml-1" />;
    if (sortDirection === 'asc') return <ArrowUp className="h-3 w-3 ml-1" />;
    return <ArrowDown className="h-3 w-3 ml-1" />;
  };

  const getUserSourceBadge = (source: UserSource) => {
    if (source === "local") {
      return (
        <Badge variant="outline" className="gap-1 border-[#e1dfdd] bg-transparent text-black">
          <User className="h-3 w-3" />
          {t.tenantAdmin.userManagement.users.localUser}
        </Badge>
      );
    } else if (source === "azure") {
      return (
        <Badge variant="outline" className="gap-1 border-[#e1dfdd] bg-transparent text-black">
          <Cloud className="h-3 w-3 text-black" />
          {t.tenantAdmin.userManagement.users.azureAD}
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="gap-1 border-[#e1dfdd] bg-transparent text-black">
          <svg className="h-3 w-3 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t.tenantAdmin.userManagement.users.googleIdentity}
        </Badge>
      );
    }
  };

  const handleSync = () => {
    setSyncStatus("syncing");
    setTimeout(() => {
      setSyncStatus("success");
      setTimeout(() => setSyncStatus("idle"), 3000);
    }, 2000);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setSelectedDepartments(user.departments || []);
    setShowUserDrawer(true);
    if (onPanelOpen) {
      onPanelOpen('userEdit');
    }
  };

  const handleDuplicateUser = (user: User) => {
    // Create a duplicate user with all fields except name and email
    const duplicatedUser: User = {
      ...user,
      id: Math.max(...allUsers.map(u => u.id)) + 1,
      name: "", // Clear name
      email: "", // Clear email
    };
    setSelectedUser(duplicatedUser);
    setShowUserDrawer(true);
    if (onPanelOpen) {
      onPanelOpen('userEdit');
    }
  };

  const handleNewUser = () => {
    const newUser: User = {
      id: Math.max(...allUsers.map(u => u.id)) + 1,
      name: "",
      email: "",
      role: "Viewer",
      status: "active" as UserStatus,
      source: "local" as UserSource,
      lastLogin: "—",
      isDuplicate: false
    };
    setSelectedUser(newUser);
    setShowUserDrawer(true);
    if (onPanelOpen) {
      onPanelOpen('userEdit');
    }
  };

  const handleMergeAllDuplicates = () => {
    // Find all duplicate users (cloud-based users marked as duplicates)
    const duplicateUsers = usersWithDuplicateMarks.filter(u => u.isDuplicate);
    
    // For each duplicate, find and remove the local user with the same email
    const emailsToMerge = duplicateUsers.map(u => u.email);
    
    // Remove local users that have a cloud duplicate
    const mergedUsers = allUsers.filter(user => {
      // Keep cloud users (they are the source of truth)
      if (user.source === 'azure' || user.source === 'google') {
        return true;
      }
      // Remove local users if they have a cloud duplicate
      if (user.source === 'local' && emailsToMerge.includes(user.email)) {
        return false;
      }
      // Keep all other local users
      return true;
    }).map(user => {
      // Remove isDuplicate flag from merged users
      if (user.isDuplicate) {
        return { ...user, isDuplicate: false };
      }
      return user;
    });
    
    // Update the user list
    if (onUsersChange) {
      onUsersChange(mergedUsers);
    }
    
    // Hide the merge banner
    setShowMergeBanner(false);
  };

  const handleMergeSingleUser = (duplicateUser: User) => {
    // This function merges a single duplicate user
    // Find the local user with the same email
    const mergedUsers = allUsers.filter(user => {
      // Remove the local user with the same email as the duplicate
      if (user.source === 'local' && user.email === duplicateUser.email) {
        return false;
      }
      return true;
    }).map(user => {
      // Remove isDuplicate flag from this specific user
      if (user.id === duplicateUser.id && user.isDuplicate) {
        return { ...user, isDuplicate: false };
      }
      return user;
    });
    
    // Update the user list
    if (onUsersChange) {
      onUsersChange(mergedUsers);
    }
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;

    // Get values from form inputs
    const nameInput = document.getElementById('user-name') as HTMLInputElement;
    const emailInput = document.getElementById('user-email') as HTMLInputElement;
    const roleSelect = document.querySelector('[id="user-role"]') as HTMLButtonElement;
    const statusSwitch = document.querySelector('button[role="switch"]') as HTMLButtonElement;

    const updatedUser: User = {
      ...selectedUser,
      name: nameInput?.value || selectedUser.name,
      email: emailInput?.value || selectedUser.email,
      status: statusSwitch?.getAttribute('data-state') === 'checked' ? 'active' : 'inactive',
      lastLogin: selectedUser.lastLogin || t.tenantAdmin.userManagement.users.neverLoggedIn,
      departments: selectedDepartments,
    };

    // Check if user exists in list
    const existingIndex = allUsers.findIndex(u => u.id === selectedUser.id);
    
    if (existingIndex >= 0) {
      // Update existing user
      const newUsers = [...allUsers];
      newUsers[existingIndex] = updatedUser;
      setAllUsers(newUsers);
    } else {
      // Add new user
      setAllUsers([...allUsers, updatedUser]);
    }

    // Close drawer
    setShowUserDrawer(false);
    setSelectedDepartments([]);
  };

  return (
    <div 
      className="flex-1 flex flex-col overflow-hidden"
      style={isMaximized ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#FFFFFF'
      } : undefined}
    >
      {/* Users Header */}
      <div 
        className="h-14 flex items-center gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <Users className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
        <h2 className="font-medium" style={{ color: '#000000' }}>
          {t.tenantAdmin.userManagement.users.title}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div 
        className="flex-1 overflow-auto" 
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#e1dfdd transparent'
        }}
      >
        <style>{`
          .flex-1.overflow-auto::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .flex-1.overflow-auto::-webkit-scrollbar-track {
            background: transparent;
          }
          .flex-1.overflow-auto::-webkit-scrollbar-thumb {
            background: #e1dfdd;
            border-radius: 4px;
          }
          .flex-1.overflow-auto::-webkit-scrollbar-thumb:hover {
            background: #d1cfcd;
          }
        `}</style>
        <div className="px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="shadow-sm" style={{ border: '1px solid #e1dfdd', backgroundColor: '#FFFFFF' }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.userManagement.users.title}</p>
                      <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                        {allUsers.length}
                      </p>
                    </div>
                    <Users className="h-8 w-8" style={{ color: '#000000' }} />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="shadow-sm cursor-pointer transition-all" 
                style={{ 
                  border: '1px solid #e1dfdd',
                  backgroundColor: statusFilter.includes('active') ? '#E9C796' : '#FFFFFF'
                }}
                onClick={() => toggleStatusFilter('active')}
                onMouseEnter={(e) => {
                  if (!statusFilter.includes('active')) {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!statusFilter.includes('active')) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.userManagement.users.active}</p>
                      <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                        {allUsers.filter(u => u.status === 'active').length}
                      </p>
                    </div>
                    <CheckCircle2 
                      className="h-8 w-8" 
                      style={{ color: '#000000' }} 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="shadow-sm cursor-pointer transition-all" 
                style={{ 
                  border: '1px solid #e1dfdd',
                  backgroundColor: statusFilter.includes('inactive') ? '#E9C796' : '#FFFFFF'
                }}
                onClick={() => toggleStatusFilter('inactive')}
                onMouseEnter={(e) => {
                  if (!statusFilter.includes('inactive')) {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!statusFilter.includes('inactive')) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>{t.tenantAdmin.userManagement.users.inactive}</p>
                      <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                        {allUsers.filter(u => u.status === 'inactive').length}
                      </p>
                    </div>
                    <XCircle 
                      className="h-8 w-8" 
                      style={{ color: '#000000' }} 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="shadow-sm cursor-pointer transition-all" 
                style={{ 
                  border: '1px solid #e1dfdd',
                  backgroundColor: statusFilter.includes('locked') ? '#E9C796' : '#FFFFFF'
                }}
                onClick={() => toggleStatusFilter('locked')}
                onMouseEnter={(e) => {
                  if (!statusFilter.includes('locked')) {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!statusFilter.includes('locked')) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm" style={{ color: '#000000' }}>{t.locked}</p>
                      <p className="text-2xl mt-1" style={{ color: '#000000' }}>
                        {allUsers.filter(u => u.status === 'locked').length}
                      </p>
                    </div>
                    <Lock 
                      className="h-8 w-8" 
                      style={{ color: '#000000' }} 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 🧩 1. Toolbar / Action Row */}
            <Card className="shadow-sm mb-3" style={{ border: '1px solid #e1dfdd' }}>
              <CardContent className="!pt-3 !pb-3 px-[24px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex-1 min-w-[250px] relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--foreground-muted)' }} />
                    <Input 
                      placeholder={t.tenantAdmin.userManagement.users.searchPlaceholder}
                      className="pl-9 h-8"
                      style={{ borderColor: '#e1dfdd' }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="gap-2 text-black border-[#e1dfdd] hover:bg-[#E9C796] h-8"
                    onClick={handleNewUser}
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    {t.tenantAdmin.userManagement.users.newUser}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2 text-black border-[#e1dfdd] hover:bg-[#E9C796] h-8"
                    onClick={handleSync}
                    disabled={syncStatus === "syncing"}
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${syncStatus === "syncing" ? "animate-spin" : ""}`} />
                    {t.tenantAdmin.userManagement.users.syncUsers}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 text-black border-[#e1dfdd] hover:bg-[#E9C796] h-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        {t.tenantAdmin.userManagement.users.actions}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="focus:!bg-[#E9C796]">
                        <Download className="h-4 w-4 mr-2" />
                        {t.tenantAdmin.userManagement.users.exportCSVExcel}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:!bg-[#E9C796]">
                        <Upload className="h-4 w-4 mr-2" />
                        {t.tenantAdmin.userManagement.users.import}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:!bg-[#E9C796]">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        {t.tenantAdmin.userManagement.users.manualSync}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:!bg-[#E9C796]">
                        <FileText className="h-4 w-4 mr-2" />
                        {t.tenantAdmin.userManagement.users.viewSyncLogs}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Sync Success Toast */}
                {syncStatus === "success" && (
                  <Alert className="mt-3 border-[#e1dfdd] bg-[#E9C796] py-2">
                    <CheckCircle2 className="h-4 w-4 text-black" />
                    <AlertDescription className="text-sm">
                      <strong>{t.tenantAdmin.userManagement.users.syncSuccess}</strong> — {t.tenantAdmin.userManagement.users.syncSuccessDetails}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* 🔁 4. Merge Banner */}
            {showMergeBanner && filteredUsers.some(u => u.isDuplicate) && (
              <Alert className="border-[#e1dfdd] bg-white py-2">
                <AlertDescription className="flex items-center justify-between text-sm">
                  <span className="text-black p-[0px] mx-[8px] my-[0px]">
                    <strong>{t.duplicatesFound}</strong> — {t.duplicatesMessage}
                  </span>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" className="gap-2 text-black border-[#e1dfdd] hover:bg-[#E9C796] h-8" onClick={handleMergeAllDuplicates}>
                      <Merge className="h-3.5 w-3.5" />
                      {t.tenantAdmin.userManagement.users.merge}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowMergeBanner(false)} className="gap-2 text-black border-[#e1dfdd] hover:bg-[#E9C796] h-8">
                      {t.ignore}
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* 📋 3. User Table */}
            <Card
              style={isTableMaximized ? {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                margin: 0,
                borderRadius: 0,
                display: 'flex',
                flexDirection: 'column'
              } : undefined}
            >
              <CardHeader className="py-3" style={{ flexShrink: 0 }}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{t.tenantAdmin.userManagement.users.title} ({filteredUsers.length})</CardTitle>
                    <CardDescription className="text-xs">
                      {activeTab === "all" && t.allRegisteredUsers}
                      {activeTab === "local" && t.localUsers}
                      {activeTab === "sso" && t.ssoUsers}
                      {activeTab === "inactive" && t.inactiveUsers}
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => setIsTableMaximized(!isTableMaximized)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#E9C796] transition-colors border border-[#e1dfdd]"
                    title={isTableMaximized ? t.minimize : t.maximize}
                  >
                    <Maximize2 className="h-4 w-4" style={{ color: '#000000' }} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="py-0" style={isTableMaximized ? { flex: 1, overflow: 'auto' } : undefined}>
                <div className="overflow-x-auto" style={isTableMaximized ? { height: '100%' } : undefined}>
                  <Table className="table-fixed">
                  <TableHeader>
                    <TableRow className="h-8">
                      <TableHead className="w-[40px] text-xs text-black">
                        <Checkbox
                          checked={selectedUserIds.size === filteredUsers.length && filteredUsers.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleSelectAll();
                            } else {
                              handleDeselectAll();
                            }
                          }}
                          style={{
                            borderColor: '#e1dfdd',
                          }}
                        />
                      </TableHead>
                      <TableHead className="w-[160px] text-xs text-black">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                          onClick={() => handleSort('name')}
                        >
                          {t.tenantAdmin.userManagement.users.name}
                          {getSortIcon('name')}
                        </Button>
                      </TableHead>
                      <TableHead className="w-[250px] text-xs text-black">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                          onClick={() => handleSort('email')}
                        >
                          {t.tenantAdmin.userManagement.users.email}
                          {getSortIcon('email')}
                        </Button>
                      </TableHead>
                      <TableHead className="w-[130px] text-xs text-black">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            >
                              {t.tenantAdmin.userManagement.users.source}
                              <Filter className={`h-3 w-3 ml-1 ${sourceFilter.length > 0 ? 'text-[#DE851D]' : 'text-black'}`} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => handleSort('source')}>
                              <div className="flex items-center w-full">
                                {getSortIcon('source')}
                                <span className="ml-2">{t.sort}</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => setSourceFilter([])}>
                              {t.resetFilter}
                            </DropdownMenuItem>
                            <div className="border-t my-1" />
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleSourceFilter('local')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: sourceFilter.includes('local') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${sourceFilter.includes('local') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {sourceFilter.includes('local') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <User className="h-3 w-3 mr-2" />
                                {t.localUser}
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleSourceFilter('azure')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: sourceFilter.includes('azure') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${sourceFilter.includes('azure') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {sourceFilter.includes('azure') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <Cloud className="h-3 w-3 mr-2" />
                                Azure AD
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleSourceFilter('google')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: sourceFilter.includes('google') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${sourceFilter.includes('google') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {sourceFilter.includes('google') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <svg className="h-3 w-3 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google Identity
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableHead>
                      <TableHead className="w-[100px] text-xs text-black">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            >
                              {t.tenantAdmin.userManagement.users.role}
                              <Filter className={`h-3 w-3 ml-1 ${roleFilter.length > 0 ? 'text-[#DE851D]' : 'text-black'}`} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => handleSort('role')}>
                              <div className="flex items-center w-full">
                                {getSortIcon('role')}
                                <span className="ml-2">{t.sort}</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => setRoleFilter([])}>
                              {t.resetFilter}
                            </DropdownMenuItem>
                            <div className="border-t my-1" />
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleRoleFilter('Admin')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: roleFilter.includes('Admin') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${roleFilter.includes('Admin') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {roleFilter.includes('Admin') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                Admin
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleRoleFilter('Power User')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: roleFilter.includes('Power User') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${roleFilter.includes('Power User') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {roleFilter.includes('Power User') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                Power User
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleRoleFilter('User')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: roleFilter.includes('User') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${roleFilter.includes('User') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {roleFilter.includes('User') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                User
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleRoleFilter('Viewer')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: roleFilter.includes('Viewer') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${roleFilter.includes('Viewer') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {roleFilter.includes('Viewer') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                Viewer
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableHead>
                      <TableHead className="w-[120px] text-xs text-black">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            >
                              {t.tenantAdmin.userManagement.users.approval || "Freigabe"}
                              <Filter className={`h-3 w-3 ml-1 ${approvalFilter.length > 0 ? 'text-[#DE851D]' : 'text-black'}`} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => setApprovalFilter([])}>
                              {t.resetFilter}
                            </DropdownMenuItem>
                            <div className="border-t my-1" />
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleApprovalFilter('authorized')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: approvalFilter.includes('authorized') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${approvalFilter.includes('authorized') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {approvalFilter.includes('authorized') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                {te.authorized || "Berechtigt"}
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleApprovalFilter('not_authorized')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: approvalFilter.includes('not_authorized') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${approvalFilter.includes('not_authorized') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {approvalFilter.includes('not_authorized') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                {te.notAuthorized || "Nicht berechtigt"}
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableHead>
                      <TableHead className="w-[120px] text-xs text-black">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            >
                              {t.tenantAdmin.userManagement.users.department}
                              <Filter className={`h-3 w-3 ml-1 ${departmentFilter.length > 0 ? 'text-[#DE851D]' : 'text-black'}`} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => setDepartmentFilter([])}>
                              {t.resetFilter}
                            </DropdownMenuItem>
                            <div className="border-t my-1" />
                            {availableDepartments.map(dept => (
                              <DropdownMenuItem key={dept} className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleDepartmentFilter(dept)}>
                                <div className="flex items-center w-full">
                                  <div 
                                    className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                    style={{ 
                                      backgroundColor: departmentFilter.includes(dept) ? '#E9C796' : 'transparent',
                                      border: `1.5px solid ${departmentFilter.includes(dept) ? '#E9C796' : '#e1dfdd'}`
                                    }}
                                  >
                                    {departmentFilter.includes(dept) && (
                                      <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  {dept}
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableHead>
                      <TableHead className="w-[110px] text-xs text-black">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-0 hover:bg-transparent flex items-center text-black"
                            >
                              {t.tenantAdmin.userManagement.users.status}
                              <Filter className={`h-3 w-3 ml-1 ${statusFilter.length > 0 ? 'text-[#DE851D]' : 'text-black'}`} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => handleSort('status')}>
                              <div className="flex items-center w-full">
                                {getSortIcon('status')}
                                <span className="ml-2">{t.sort}</span>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onClick={() => setStatusFilter([])}>
                              {t.resetFilter}
                            </DropdownMenuItem>
                            <div className="border-t my-1" />
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleStatusFilter('active')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: statusFilter.includes('active') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${statusFilter.includes('active') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {statusFilter.includes('active') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <CheckCircle2 className="h-3 w-3 mr-2 text-green-600" />
                                {t.tenantAdmin.userManagement.users.active}
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleStatusFilter('inactive')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: statusFilter.includes('inactive') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${statusFilter.includes('inactive') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {statusFilter.includes('inactive') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <XCircle className="h-3 w-3 mr-2" style={{ color: 'var(--foreground-muted)' }} />
                                {t.tenantAdmin.userManagement.users.inactive}
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:!bg-[#E9C796]" onSelect={(e) => e.preventDefault()} onClick={() => toggleStatusFilter('locked')}>
                              <div className="flex items-center w-full">
                                <div 
                                  className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                  style={{ 
                                    backgroundColor: statusFilter.includes('locked') ? '#E9C796' : 'transparent',
                                    border: `1.5px solid ${statusFilter.includes('locked') ? '#E9C796' : '#e1dfdd'}`
                                  }}
                                >
                                  {statusFilter.includes('locked') && (
                                    <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <Lock className="h-3 w-3 mr-2 text-red-600" />
                                {t.locked}
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableHead>
                      <TableHead className="w-[120px] text-black">{t.tenantAdmin.userManagement.users.lastLogin}</TableHead>
                      <TableHead className="w-[140px] text-black">{t.tenantAdmin.userManagement.users.syncedAt}</TableHead>
                      <TableHead className="w-[40px] text-black">{t.tenantAdmin.userManagement.users.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={10}>
                          <TableLoadingState columns={10} rows={5} />
                        </TableCell>
                      </TableRow>
                    ) : filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10}>
                          <EmptyState
                            icon={Users}
                            title={t.tenantAdmin.userManagement.users.noUsersFound || "No users found"}
                            description={searchQuery ? "Try adjusting your search criteria" : "Get started by adding your first user"}
                            action={!searchQuery ? {
                              label: t.tenantAdmin.userManagement.users.addUser || "Add User",
                              onClick: () => {
                                setSelectedUser(null);
                                setShowUserDrawer(true);
                              },
                              icon: UserPlus
                            } : undefined}
                          />
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                      <TableRow 
                        key={user.id}
                        className={`hover:bg-[#E9C796] transition-colors ${user.isDuplicate ? "bg-white" : ""}`}
                      >
                        <TableCell className="w-[40px] py-2">
                          <Checkbox
                            checked={selectedUserIds.has(user.id)}
                            onCheckedChange={() => handleToggleUser(user.id)}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              borderColor: '#e1dfdd',
                            }}
                          />
                        </TableCell>
                        <TableCell className="w-[160px] py-2 break-words">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-black break-words">{user.name}</span>
                            {user.isDuplicate && (
                              <Badge variant="outline" className="border-[#e1dfdd] bg-[#E9C796] text-black shrink-0">
                                {t.duplicate}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="w-[250px] text-xs py-2 text-black break-words">
                          {user.email}
                        </TableCell>
                        <TableCell className="w-[130px] py-2">
                          {getUserSourceBadge(user.source)}
                        </TableCell>
                        <TableCell className="w-[100px] py-2">
                          <Badge 
                            variant="outline"
                            className="border-[#e1dfdd] bg-transparent text-black"
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="w-[120px] py-2">
                          <Badge 
                            variant="outline"
                            className="border-[#e1dfdd] bg-transparent text-black"
                          >
                            {(user.approval === 'authorized' || (!user.approval && (user.role === 'Admin' || user.role === 'Power User'))) ? (te.authorized || 'Berechtigt') : (te.notAuthorized || 'Nicht berechtigt')}
                          </Badge>
                        </TableCell>
                        <TableCell className="w-[120px] py-2">
                          {user.departments && user.departments.length > 0 ? (
                            user.departments.length === 1 ? (
                              <Badge 
                                variant="outline"
                                className="border-[#e1dfdd] bg-transparent text-black"
                              >
                                {user.departments[0]}
                              </Badge>
                            ) : (
                              <Popover>
                                <PopoverTrigger>
                                  <Badge 
                                    variant="outline"
                                    className="border-[#e1dfdd] bg-transparent text-black cursor-pointer hover:bg-[#E9C796] transition-colors"
                                  >
                                    {user.departments.length} {t.departments}
                                  </Badge>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 p-3" align="start">
                                  <div className="space-y-2">
                                    <div className="text-sm font-medium">{t.departments}</div>
                                    <div className="flex flex-col gap-1.5">
                                      {user.departments.map((dept, index) => (
                                        <div 
                                          key={index}
                                          className="text-sm px-2 py-1"
                                        >
                                          {dept}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="w-[110px] py-2">
                          {user.status === 'active' ? (
                            <Badge className="gap-1 bg-transparent text-black border-[#e1dfdd]">
                              <CheckCircle2 className="h-3 w-3" />
                              {t.tenantAdmin.userManagement.users.active}
                            </Badge>
                          ) : user.status === 'locked' ? (
                            <Badge className="gap-1" style={{ backgroundColor: '#E9C796', color: '#000000', border: '1px solid #e1dfdd' }}>
                              <Lock className="h-3 w-3" />
                              {t.locked}
                            </Badge>
                          ) : (
                            <Badge className="gap-1" style={{ backgroundColor: '#E9C796', color: '#000000', border: '1px solid #e1dfdd' }}>
                              <XCircle className="h-3 w-3" />
                              {t.tenantAdmin.userManagement.users.inactive}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="w-[120px] text-xs py-2 text-black break-words">
                          {user.lastLogin}
                        </TableCell>
                        <TableCell className="w-[140px] text-xs py-2 text-black break-words">
                          {user.syncedAt || "—"}
                        </TableCell>
                        <TableCell className="w-[40px] py-2">
                          <div className="flex items-center justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6 border border-transparent hover:border-black hover:bg-transparent shrink-0"
                                >
                                  <MoreVertical className="h-3.5 w-3.5 text-black" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem 
                                  className="focus:!bg-[#E9C796]"
                                  onClick={() => handleEditUser(user)}
                                >
                                  <Edit className="h-3.5 w-3.5 mr-2" />
                                  {t.tenantAdmin.userManagement.users.edit}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="focus:!bg-[#E9C796]"
                                  onClick={() => handleDuplicateUser(user)}
                                >
                                  <UserCheck className="h-3.5 w-3.5 mr-2" />
                                  {t.tenantAdmin.userManagement.users.duplicate}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="focus:!bg-[#E9C796]"
                                  onClick={handleNewUser}
                                >
                                  <UserPlus className="h-3.5 w-3.5 mr-2" />
                                  {t.tenantAdmin.userManagement.users.newUser}
                                </DropdownMenuItem>
                                {user.isDuplicate && (
                                  <DropdownMenuItem 
                                    className="focus:!bg-[#E9C796]"
                                    onClick={() => handleMergeSingleUser(user)}
                                  >
                                    <Merge className="h-3.5 w-3.5 mr-2" />
                                    {t.tenantAdmin.userManagement.users.merge}
                                  </DropdownMenuItem>
                                )}
                                <div className="border-t my-1" />
                                <DropdownMenuItem className="focus:!bg-[#E9C796] text-black">
                                  <Trash2 className="h-3.5 w-3.5 mr-2" />
                                  {t.tenantAdmin.userManagement.users.delete}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                    )}
                  </TableBody>
                </Table>
                </div>
              </CardContent>
            </Card>




          </div>
        </div>
      </div>

      {/* Transparent Overlay for Right Side Panel */}
      {showUserDrawer && (
        <div 
          className="fixed inset-0 bg-transparent"
          style={{ zIndex: 9 }}
          onClick={() => setShowUserDrawer(false)}
        />
      )}

      {/* Right Side Panel - User Edit */}
      <div 
        className="flex flex-col transition-all duration-300 ease-in-out overflow-hidden border-l absolute top-0 right-0 bottom-0"
        style={{ 
          width: showUserDrawer ? '400px' : '0px',
          borderColor: showUserDrawer ? '#e1dfdd' : 'transparent',
          backgroundColor: '#FFFFFF',
          zIndex: panelZIndex?.['userEdit'] || 10
        }}
      >
        {showUserDrawer && selectedUser && (
          <div className="flex-1 flex flex-col h-full">
            {/* Panel Header */}
            <div 
              className="flex items-center justify-between px-6 border-b gap-3"
              style={{ 
                height: '57px',
                borderColor: '#e1dfdd',
                backgroundColor: '#DE851D'
              }}
            >
              <div className="flex items-center gap-3">
                <Edit className="h-5 w-5 flex-shrink-0 text-black" />
                <h3 className="font-medium text-black">
                  {t.editUser}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowUserDrawer(false);
                  setSelectedDepartments([]);
                }}
                className="h-8 w-8 hover:border hover:border-black hover:bg-transparent transition-colors"
              >
                <X className="h-4 w-4" style={{ color: '#000000' }} />
              </Button>
            </div>

            {/* Panel Content - Scrollable */}
            <div 
              className="flex-1 overflow-auto px-6 py-6"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#e1dfdd transparent'
              }}
            >
              <style>
                {`
                  .flex-1.overflow-auto.px-6::-webkit-scrollbar {
                    width: 8px;
                  }
                  .flex-1.overflow-auto.px-6::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .flex-1.overflow-auto.px-6::-webkit-scrollbar-thumb {
                    background-color: #e1dfdd;
                    border-radius: 4px;
                  }
                  .flex-1.overflow-auto.px-6::-webkit-scrollbar-thumb:hover {
                    background-color: #d1cfcd;
                  }
                `}
              </style>

              <div className="space-y-8">
                {/* Profilinformationen */}
                <div className="space-y-5">
                  <h3 className="font-medium text-base" style={{ color: 'var(--color-gray-dark)' }}>
                    {t.profileInformation}
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-name">{t.tenantAdmin.userManagement.users.name}</Label>
                    <Input 
                      id="user-name" 
                      defaultValue={selectedUser.name}
                      disabled={selectedUser.source !== 'local'}
                    />
                    {selectedUser.source !== 'local' && (
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {t.tenantAdmin.userManagement.users.syncFromDirectory}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-email">E-Mail</Label>
                    <Input 
                      id="user-email" 
                      defaultValue={selectedUser.email}
                      disabled={selectedUser.source !== 'local'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.tenantAdmin.userManagement.users.source}</Label>
                    <div>
                      {getUserSourceBadge(selectedUser.source)}
                    </div>
                  </div>

                  {selectedUser.source !== 'local' && (
                    <Button variant="outline" size="sm" className="gap-2 text-black border-[#e1dfdd] hover:bg-[#E9C796]">
                      <ExternalLink className="h-4 w-4" />
                      {t.tenantAdmin.userManagement.users.openInDirectory}
                    </Button>
                  )}
                </div>

                <Separator style={{ borderColor: '#e1dfdd' }} />

                {/* Zugriffsrechte & Rollen */}
                <div className="space-y-5">
                  <h3 className="font-medium text-base" style={{ color: 'var(--color-gray-dark)' }}>
                    {t.tenantAdmin.userManagement.users.accessRightsAndRoles}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{t.tenantAdmin.userManagement.users.status}</Label>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        {t.tenantAdmin.userManagement.users.setUserStatus}
                      </p>
                    </div>
                    <Switch defaultChecked={selectedUser.status === 'active'} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-role">{t.tenantAdmin.userManagement.users.role}</Label>
                    <Select defaultValue={selectedUser.role.toLowerCase().replace(' ', '_')}>
                      <SelectTrigger id="user-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">{t.tenantAdmin.userManagement.users.roleAdmin}</SelectItem>
                        <SelectItem value="power_user">{t.tenantAdmin.userManagement.users.rolePowerUser}</SelectItem>
                        <SelectItem value="user">{t.tenantAdmin.userManagement.users.roleUser}</SelectItem>
                        <SelectItem value="viewer">{t.tenantAdmin.userManagement.users.roleViewer}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="user-approval">{t.tenantAdmin.userManagement.users.approval || "Freigabe"}</Label>
                    <Select defaultValue={selectedUser.approval || 'authorized'}>
                      <SelectTrigger id="user-approval">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="authorized">{te.authorized || "Berechtigt"}</SelectItem>
                        <SelectItem value="not_authorized">{te.notAuthorized || "Nicht berechtigt"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t.tenantAdmin.userManagement.users.departments}</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full justify-between border-[#e1dfdd] hover:bg-[#E9C796]"
                        >
                          <span className="text-sm">
                            {selectedDepartments.length === 0 
                              ? t.tenantAdmin.userManagement.users.selectDepartments
                              : `${selectedDepartments.length} ${t.tenantAdmin.userManagement.users.selected}`}
                          </span>
                          <Building2 className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-[350px]">
                        {availableDepartments.map((dept) => (
                          <DropdownMenuItem
                            key={dept}
                            className="focus:!bg-[#E9C796]"
                            onSelect={(e) => e.preventDefault()}
                            onClick={() => {
                              if (selectedDepartments.includes(dept)) {
                                setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
                              } else {
                                setSelectedDepartments([...selectedDepartments, dept]);
                              }
                            }}
                          >
                            <div className="flex items-center w-full">
                              <div 
                                className="h-3.5 w-3.5 mr-2 rounded flex items-center justify-center"
                                style={{ 
                                  backgroundColor: selectedDepartments.includes(dept) ? '#E9C796' : 'transparent',
                                  border: `1.5px solid ${selectedDepartments.includes(dept) ? '#E9C796' : '#e1dfdd'}`
                                }}
                              >
                                {selectedDepartments.includes(dept) && (
                                  <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              {dept}
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {selectedDepartments.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedDepartments.map((dept, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="border-[#e1dfdd] bg-transparent text-black"
                          >
                            {dept}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>{t.tenantAdmin.userManagement.users.lastLogin}</Label>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      {selectedUser.lastLogin}
                    </p>
                  </div>

                  {selectedUser.groups && selectedUser.groups.length > 0 && (
                    <div className="space-y-2">
                      <Label>Zugehörige Gruppen</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.groups.map((group, idx) => (
                          <Badge key={idx} variant="outline" className="border-[#e1dfdd] bg-transparent text-black">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div 
              className="px-6 py-4 border-t"
              style={{ borderColor: '#e1dfdd' }}
            >
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#e1dfdd',
                    color: 'black',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => {
                    setShowUserDrawer(false);
                    setSelectedDepartments([]);
                  }}
                >
                  {t.tenantAdmin.userManagement.departments.cancel}
                </Button>
                <Button 
                  className="flex-1"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#e1dfdd',
                    color: 'black',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={handleSaveUser}
                >
                  {t.tenantAdmin.userManagement.departments.save}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteConfirmation.open}
        onOpenChange={(open) => setDeleteConfirmation({ open, user: null })}
        title={t.tenantAdmin.userManagement.users.deleteUser || "Delete User"}
        description={`Are you sure you want to delete ${deleteConfirmation.user?.name}? This action cannot be undone.`}
        confirmLabel={t.tenantAdmin.userManagement.users.delete || "Delete"}
        cancelLabel={t.cancel || "Cancel"}
        onConfirm={() => {
          if (deleteConfirmation.user) {
            // Handle delete logic here
            const updatedUsers = allUsers.filter(u => u.id !== deleteConfirmation.user?.id);
            setAllUsers(updatedUsers);
            if (onUsersChange) {
              onUsersChange(updatedUsers);
            }
          }
          setDeleteConfirmation({ open: false, user: null });
        }}
        variant="destructive"
        isDarkMode={isDarkMode}
      />

      {/* Deactivate Confirmation Dialog */}
      <ConfirmationDialog
        open={deactivateConfirmation.open}
        onOpenChange={(open) => setDeactivateConfirmation({ open, user: null })}
        title="Deactivate User"
        description={`Are you sure you want to deactivate ${deactivateConfirmation.user?.name}? They will no longer be able to access the system.`}
        confirmLabel="Deactivate"
        cancelLabel={t.cancel || "Cancel"}
        onConfirm={() => {
          if (deactivateConfirmation.user) {
            // Handle deactivate logic here
            const updatedUsers = allUsers.map(u => 
              u.id === deactivateConfirmation.user?.id 
                ? { ...u, status: 'inactive' as UserStatus }
                : u
            );
            setAllUsers(updatedUsers);
            if (onUsersChange) {
              onUsersChange(updatedUsers);
            }
          }
          setDeactivateConfirmation({ open: false, user: null });
        }}
        variant="warning"
        isDarkMode={isDarkMode}
      />
      
      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedUserIds.size}
        onDelete={() => setBulkDeleteConfirmation(true)}
        onActivate={() => setBulkActivateConfirmation(true)}
        onDeactivate={() => setBulkDeactivateConfirmation(true)}
        onExport={handleBulkExport}
        onCancel={handleDeselectAll}
        isDarkMode={isDarkMode}
      />
      
      {/* Bulk Delete Confirmation */}
      <ConfirmationDialog
        open={bulkDeleteConfirmation}
        onOpenChange={setBulkDeleteConfirmation}
        title="Delete Users"
        description={`Are you sure you want to delete ${selectedUserIds.size} user${selectedUserIds.size > 1 ? 's' : ''}? This action cannot be undone.`}
        confirmLabel="Delete All"
        cancelLabel="Cancel"
        onConfirm={handleBulkDelete}
        variant="destructive"
        isDarkMode={isDarkMode}
      />
      
      {/* Bulk Activate Confirmation */}
      <ConfirmationDialog
        open={bulkActivateConfirmation}
        onOpenChange={setBulkActivateConfirmation}
        title="Activate Users"
        description={`Are you sure you want to activate ${selectedUserIds.size} user${selectedUserIds.size > 1 ? 's' : ''}?`}
        confirmLabel="Activate All"
        cancelLabel="Cancel"
        onConfirm={handleBulkActivate}
        variant="default"
        isDarkMode={isDarkMode}
      />
      
      {/* Bulk Deactivate Confirmation */}
      <ConfirmationDialog
        open={bulkDeactivateConfirmation}
        onOpenChange={setBulkDeactivateConfirmation}
        title="Deactivate Users"
        description={`Are you sure you want to deactivate ${selectedUserIds.size} user${selectedUserIds.size > 1 ? 's' : ''}? They will no longer be able to access the system.`}
        confirmLabel="Deactivate All"
        cancelLabel="Cancel"
        onConfirm={handleBulkDeactivate}
        variant="warning"
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

interface Role {
  id: number;
  name: string;
  description: string;
  users: number;
  permissions: string[];
  isSystem?: boolean;
}

function RolesPage({ isDarkMode, onPanelOpen, panelZIndex, allUsers: propAllUsers }: { isDarkMode?: boolean; onPanelOpen?: (panelName: string) => void; panelZIndex?: Record<string, number>; allUsers?: User[] }) {
  const { t } = useLanguage();
  
  // Default users from UsersPage
  const defaultUsers: User[] = [
    { id: 1, name: "Rolf Müller", email: "rolf.mueller@rmbgroup.ch", source: "azure", role: "User", approval: "authorized", status: "active", lastLogin: "vor 2 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 2, name: "Marianne Locher", email: "marianne.locher@rmbgroup.ch", source: "azure", role: "User", approval: "not_authorized", status: "active", lastLogin: "vor 3 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 3, name: "Gregor Keist", email: "gregor.keist@rmbgroup.ch", source: "azure", role: "User", approval: "authorized", status: "active", lastLogin: "vor 1 Stunde", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 4, name: "Daniel Hanselmann", email: "daniel.hanselmann@rmbgroup.ch", source: "azure", role: "User", approval: "authorized", status: "active", lastLogin: "vor 5 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 5, name: "Roland Steiner", email: "roland.steiner@rmbgroup.ch", source: "azure", role: "Admin", approval: "authorized", status: "active", lastLogin: "vor 1 Stunde", syncedAt: "29.10.2025, 14:30", groups: ["Administrators", "Products"], departments: ["Produkte"] },
    { id: 6, name: "Benjamin Koch", email: "benjamin.koch@rmbgroup.ch", source: "azure", role: "User", approval: "not_authorized", status: "active", lastLogin: "vor 4 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Management"], departments: ["Management"] },
    { id: 7, name: "Pascal Koch", email: "pascal.koch@rmbgroup.ch", source: "azure", role: "Power User", approval: "authorized", status: "active", lastLogin: "vor 2 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Management", "Purchasing", "Logistics", "Engineering"], departments: ["Management", "Einkauf", "Logistik", "Technik"] },
    { id: 8, name: "Andy Haas", email: "andy.haas@rmbgroup.ch", source: "azure", role: "User", approval: "not_authorized", status: "active", lastLogin: "vor 6 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Management", "Sales", "Marketing"], departments: ["Management", "Vertrieb", "Marketing"] },
    { id: 9, name: "Marko Vukic", email: "marko.vukic@rmbgroup.ch", source: "azure", role: "User", approval: "authorized", status: "active", lastLogin: "vor 1 Tag", syncedAt: "29.10.2025, 14:30", groups: ["Logistics"], departments: ["Logistik"] },
    { id: 10, name: "Micha Graf", email: "micha.graf@rmbgroup.ch", source: "azure", role: "User", approval: "not_authorized", status: "active", lastLogin: "vor 8 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Planning"], departments: ["Planung"] },
    { id: 11, name: "Patrick Berther", email: "patrick.berther@rmbgroup.ch", source: "azure", role: "User", approval: "authorized", status: "active", lastLogin: "vor 3 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Finance"], departments: ["Finanzen"] },
    { id: 12, name: "Samuel Mattmüller", email: "samuel.mattmueller@rmbgroup.ch", source: "azure", role: "User", approval: "authorized", status: "active", lastLogin: "vor 5 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 13, name: "Martin Keist", email: "martin.keist@rmbgroup.ch", source: "azure", role: "Power User", approval: "authorized", status: "active", lastLogin: "vor 2 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 14, name: "Silvio Müller", email: "silvio.mueller@rmbgroup.ch", source: "local", role: "User", approval: "authorized", status: "active", lastLogin: "vor 3 Stunden", groups: [], departments: ["Technik"] },
    { id: 15, name: "Stefan Seiler", email: "stefan.seiler@rmbgroup.ch", source: "local", role: "User", approval: "not_authorized", status: "active", lastLogin: "vor 1 Stunde", groups: [], departments: ["IT"] },
    { id: 16, name: "Fritz Baumann", email: "fritz.baumann@rmbgroup.ch", source: "local", role: "Power User", approval: "authorized", status: "active", lastLogin: "vor 5 Stunden", groups: [], departments: ["Produktion"] },
    { id: 17, name: "Susanne Meier", email: "susanne.meier@rmbgroup.ch", source: "local", role: "User", approval: "not_authorized", status: "active", lastLogin: "vor 2 Stunden", groups: [], departments: ["Produktion"] },
    { id: 18, name: "Stefanie Gruber", email: "stefanie.gruber@rmbgroup.ch", source: "local", role: "User", approval: "authorized", status: "active", lastLogin: "vor 4 Stunden", groups: [], departments: ["Produktion"] },
    { id: 19, name: "Lara Huber", email: "lara.huber@rmbgroup.ch", source: "local", role: "Power User", approval: "authorized", status: "active", lastLogin: "vor 1 Stunde", groups: [], departments: ["Digitalisierung"] },
    { id: 20, name: "Monika Frey", email: "monika.frey@rmbgroup.ch", source: "local", role: "User", approval: "authorized", status: "active", lastLogin: "vor 6 Stunden", groups: [], departments: ["Projekte"] },
    { id: 21, name: "Ana Kuzic", email: "ana.kuzic@rmbgroup.ch", source: "local", role: "User", approval: "authorized", status: "active", lastLogin: "vor 3 Stunden", groups: [], departments: ["Entwicklung"] },
    { id: 22, name: "Svenja Josip", email: "svenja.josip@rmbgroup.ch", source: "local", role: "Power User", approval: "authorized", status: "active", lastLogin: "vor 2 Stunden", groups: [], departments: ["Produktion"] },
    { id: 23, name: "Ariton Vukic", email: "ariton.vukic@rmbgroup.ch", source: "local", role: "User", approval: "authorized", status: "active", lastLogin: "vor 5 Stunden", groups: [], departments: ["Entwicklung"] },
    { id: 24, name: "Murat Oetzi", email: "murat.oetzi@rmbgroup.ch", source: "local", role: "User", approval: "not_authorized", status: "active", lastLogin: "vor 4 Stunden", groups: [], departments: ["Marketing"] },
    { id: 25, name: "Ali Bonemi", email: "Ali.bonemi@rmbgroup.ch", source: "local", role: "Power User", approval: "authorized", status: "active", lastLogin: "vor 1 Stunde", groups: [], departments: ["Marketing"] },
  ];
  
  const allUsers = propAllUsers || defaultUsers;
  
  // Calculate user counts per role from actual user data
  const getUserCountByRole = (roleName: string) => {
    return allUsers.filter(user => user.role === roleName).length;
  };
  
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Admin",
      description: "Vollständiger Zugriff auf alle Funktionen",
      users: getUserCountByRole("Admin"),
      permissions: ["create", "read", "update", "delete", "manage_users", "manage_settings", "manage_roles", "view_reports", "export_data", "import_data"],
      isSystem: true
    },
    {
      id: 2,
      name: "Power User",
      description: "Erweiterte Rechte für fortgeschrittene Benutzer",
      users: getUserCountByRole("Power User"),
      permissions: ["create", "read", "update", "delete", "export_data", "import_data"],
      isSystem: true
    },
    {
      id: 3,
      name: "User",
      description: "Standard-Benutzerrechte",
      users: getUserCountByRole("User"),
      permissions: ["create", "read", "update", "delete"],
      isSystem: true
    },
    {
      id: 4,
      name: "Viewer",
      description: "Nur Leserechte",
      users: getUserCountByRole("Viewer"),
      permissions: ["read"],
      isSystem: true
    }
  ]);
  
  // Update role user counts when allUsers changes
  useEffect(() => {
    setRoles(prevRoles => prevRoles.map(role => ({
      ...role,
      users: getUserCountByRole(role.name)
    })));
  }, [propAllUsers]);

  const [showRoleSheet, setShowRoleSheet] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isNewRole, setIsNewRole] = useState(false);
  const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);

  // Form state
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
    if (onPanelOpen) {
      onPanelOpen('roleEdit');
    }
  };

  const handleEditRole = (role: Role) => {
    setIsNewRole(false);
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setSelectedPermissions(role.permissions);
    setShowRoleSheet(true);
    if (onPanelOpen) {
      onPanelOpen('roleEdit');
    }
  };

  const handleDuplicateRole = (role: Role) => {
    setIsNewRole(true);
    setEditingRole(null);
    setRoleName(`${role.name} (Kopie)`);
    setRoleDescription(role.description);
    setSelectedPermissions(role.permissions);
    setShowRoleSheet(true);
    if (onPanelOpen) {
      onPanelOpen('roleEdit');
    }
  };

  const handleSaveRole = () => {
    if (isNewRole) {
      // Create new role
      const newRole: Role = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        name: roleName,
        description: roleDescription,
        users: 0,
        permissions: selectedPermissions
      };
      setRoles([...roles, newRole]);
    } else if (editingRole) {
      // Update existing role
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
      {/* Roles Header */}
      <div 
        className="h-14 flex items-center justify-between gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
          <h2 className="font-medium" style={{ color: '#000000' }}>
            Rollen & Rechte
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCreateRole}
          className="h-8 w-8 bg-transparent border border-transparent hover:border-black hover:bg-transparent transition-colors"
          title="Neue Rolle"
        >
          <UserPlus className="h-4 w-4" style={{ color: '#000000' }} />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Roles Table */}
            <Card style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle>Rollen & Rechte</CardTitle>
                <CardDescription>{t.tenantAdmin.userManagement.roles.roleManagementDesc}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Rolle</TableHead>
                      <TableHead>Beschreibung</TableHead>
                      <TableHead>Nutzer</TableHead>
                      <TableHead>Berechtigungen</TableHead>
                      <TableHead className="text-right pr-6">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id} className="hover:bg-[#E9C796] transition-colors">
                        <TableCell className="pl-6">
                          <div className="flex items-center gap-2">
                            <span>{role.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span style={{ color: 'var(--foreground-muted)' }}>{role.description}</span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="transition-colors"
                              style={{
                                border: '1px solid #e1dfdd',
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                                padding: '4px 12px',
                                borderRadius: '6px',
                                fontSize: '0.75rem'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              {role.users} Nutzer
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            {(() => {
                              // Get actual users assigned to this role
                              const usersForRole = allUsers.filter(user => user.role === role.name);
                              return usersForRole.map((user) => (
                                <DropdownMenuItem 
                                  key={user.id}
                                  className="hover:bg-[#E9C796] focus:bg-[#E9C796]"
                                >
                                  {user.name}
                                </DropdownMenuItem>
                              ));
                            })()}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className="transition-colors"
                                style={{
                                  border: '1px solid #e1dfdd',
                                  backgroundColor: 'transparent',
                                  cursor: 'pointer',
                                  padding: '4px 12px',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                {role.permissions.length} Berechtigungen
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="max-h-[300px] overflow-y-auto custom-scrollbar w-64">
                              {(() => {
                                const basisPerms = ['create', 'read', 'update', 'delete'];
                                const verwaltungsPerms = ['manage_users', 'manage_settings', 'manage_roles', 'view_reports'];
                                const datenPerms = ['export_data', 'import_data'];
                                
                                const hasBasis = role.permissions.some(p => basisPerms.includes(p));
                                const hasVerwaltung = role.permissions.some(p => verwaltungsPerms.includes(p));
                                const hasDaten = role.permissions.some(p => datenPerms.includes(p));
                                
                                return (
                                  <>
                                    {hasBasis && (
                                      <>
                                        <div className="px-2 py-1.5 text-xs font-semibold" style={{ color: 'var(--foreground-muted)' }}>
                                          {t.tenantAdmin.userManagement.roles.basicPermissions}
                                        </div>
                                        {role.permissions.filter(p => basisPerms.includes(p)).map((perm) => (
                                          <DropdownMenuItem 
                                            key={perm}
                                            className="hover:bg-[#E9C796] focus:bg-[#E9C796] data-[highlighted]:bg-[#E9C796]"
                                          >
                                            {permissionLabels[perm] || perm}
                                          </DropdownMenuItem>
                                        ))}
                                      </>
                                    )}
                                    
                                    {hasVerwaltung && (
                                      <>
                                        {hasBasis && <div className="h-px bg-[#e1dfdd] my-1" />}
                                        <div className="px-2 py-1.5 text-xs font-semibold" style={{ color: 'var(--foreground-muted)' }}>
                                          {t.tenantAdmin.userManagement.roles.adminRights}
                                        </div>
                                        {role.permissions.filter(p => verwaltungsPerms.includes(p)).map((perm) => (
                                          <DropdownMenuItem 
                                            key={perm}
                                            className="hover:bg-[#E9C796] focus:bg-[#E9C796] data-[highlighted]:bg-[#E9C796]"
                                          >
                                            {permissionLabels[perm] || perm}
                                          </DropdownMenuItem>
                                        ))}
                                      </>
                                    )}
                                    
                                    {hasDaten && (
                                      <>
                                        {(hasBasis || hasVerwaltung) && <div className="h-px bg-[#e1dfdd] my-1" />}
                                        <div className="px-2 py-1.5 text-xs font-semibold" style={{ color: 'var(--foreground-muted)' }}>
                                          {t.tenantAdmin.userManagement.roles.dataRights}
                                        </div>
                                        {role.permissions.filter(p => datenPerms.includes(p)).map((perm) => (
                                          <DropdownMenuItem 
                                            key={perm}
                                            className="hover:bg-[#E9C796] focus:bg-[#E9C796] data-[highlighted]:bg-[#E9C796]"
                                          >
                                            {permissionLabels[perm] || perm}
                                          </DropdownMenuItem>
                                        ))}
                                      </>
                                    )}
                                  </>
                                );
                              })()}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 border border-transparent hover:border-[#e1dfdd] hover:bg-transparent"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditRole(role)}>
                              <Edit className="h-4 w-4 mr-2" />
                              {t.tenantAdmin.userManagement.roles.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateRole(role)}>
                              <Shield className="h-4 w-4 mr-2" />
                              {t.tenantAdmin.userManagement.users.duplicate}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleCreateRole}>
                              <Shield className="h-4 w-4 mr-2" />
                              {t.tenantAdmin.userManagement.roles.addRole}
                            </DropdownMenuItem>
                            {!role.isSystem && (
                              <DropdownMenuItem 
                                onClick={() => handleDeleteRole(role.id)}
                                className="text-black"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t.tenantAdmin.userManagement.roles.delete}
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
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
        isDarkMode={isDarkMode || false}
        isNewRole={isNewRole}
        roleName={roleName}
        roleDescription={roleDescription}
        selectedPermissions={selectedPermissions}
        onRoleNameChange={setRoleName}
        onRoleDescriptionChange={setRoleDescription}
        onTogglePermission={togglePermission}
        onSave={handleSaveRole}
        onSelectAll={handleSelectAllPermissions}
        onSelectNone={handleSelectNoPermissions}
        assignedUsers={editingRole?.users}
      />

      {/* Delete Role Confirmation Dialog */}
      <AlertDialog open={deleteRoleDialogOpen} onOpenChange={setDeleteRoleDialogOpen}>
        <AlertDialogContent 
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e1dfdd'
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Möchten Sie diese Rolle wirklich löschen?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Aktion kann nicht rückgängig gemacht werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.tenantAdmin.userManagement.departments.cancel}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteRole}
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.tenantAdmin.userManagement.users.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface Department {
  id: number;
  name: string;
  promptCategories: string[];
  status: "active" | "inactive";
  users: number;
  assignedUsers?: string[];
}

function DepartmentsPage({ isDarkMode, onPanelOpen, panelZIndex, allUsers: propAllUsers, departments: propDepartments, onDepartmentsChange }: { isDarkMode?: boolean; onPanelOpen?: (panelName: string) => void; panelZIndex?: Record<string, number>; allUsers?: User[]; departments?: Department[]; onDepartmentsChange?: (departments: Department[]) => void }) {
  const { t } = useLanguage();
  const departments = propDepartments || [];
  const setDepartments = onDepartmentsChange || (() => {});

  const [deleteDepartmentDialogOpen, setDeleteDepartmentDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<number | null>(null);
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [departmentSavedOnce, setDepartmentSavedOnce] = useState(false);
  const [isAssignmentMode, setIsAssignmentMode] = useState(false);
  const [editedDepartment, setEditedDepartment] = useState({
    name: "-",
    promptCategories: [] as string[],
    status: "active" as "active" | "inactive",
    users: 0,
    assignedUsers: [] as string[]
  });

  const allPromptCategories = [
    "Markt & Wettbewerb",
    "Planung & Umsetzung",
    "Strategie & Wachstum",
    "Vertrieb",
    "Kundenservice",
    "Finanzen & Reporting",
    "Personal & Recruiting",
    "Lernen & Wissen",
    "Organisation & Zusammenarbeit",
    "Coaching & Entwicklung",
    "Prompt-Erstellung & Optimierung",
    "Qualitäts- & Ausgabeverbesserung",
    "Kritische Analyse & Vorfragen"
  ];

  const [predefinedDepartments, setPredefinedDepartments] = useState([
    "Management",
    "Recht",
    "Finanzen",
    "Personal",
    "Vertrieb",
    "Marketing",
    "Produkte",
    "Einkauf",
    "Entwicklung",
    "Projekte",
    "Planung",
    "Produktion",
    "Technik",
    "Logistik",
    "IT",
    "Digitalisierung",
    "Umwelt"
  ]);

  const [showAddDepartmentDialog, setShowAddDepartmentDialog] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [addDepartmentMode, setAddDepartmentMode] = useState<"new" | "existing">("new");
  const [selectedExistingDepartment, setSelectedExistingDepartment] = useState("");
  const [departmentMenuOpen, setDepartmentMenuOpen] = useState<string | null>(null);
  const [isCreatingCustomDepartment, setIsCreatingCustomDepartment] = useState(false);
  const [customDepartmentName, setCustomDepartmentName] = useState("");
  const [renameDepartmentDialog, setRenameDepartmentDialog] = useState<{ open: boolean; department: string; newName: string }>({
    open: false,
    department: "",
    newName: ""
  });

  const [promptCategoryMenuOpen, setPromptCategoryMenuOpen] = useState<string | null>(null);
  const [showAddPromptCategoryDialog, setShowAddPromptCategoryDialog] = useState(false);
  const [newPromptCategoryName, setNewPromptCategoryName] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [renamePromptCategoryDialog, setRenamePromptCategoryDialog] = useState<{ open: boolean; category: string; newName: string }>({
    open: false,
    category: "",
    newName: ""
  });
  const [availablePromptCategories, setAvailablePromptCategories] = useState([
    "Markt & Wettbewerb",
    "Planung & Umsetzung",
    "Strategie & Wachstum",
    "Vertrieb",
    "Kundenservice",
    "Finanzen & Reporting",
    "Personal & Recruiting",
    "Lernen & Wissen",
    "Organisation & Zusammenarbeit",
    "Coaching & Entwicklung",
    "Prompt-Erstellung & Optimierung",
    "Qualitäts- & Ausgabeverbesserung",
    "Kritische Analyse & Vorfragen"
  ]);

  const handleDeleteDepartment = (departmentId: number) => {
    setDepartmentToDelete(departmentId);
    setDeleteDepartmentDialogOpen(true);
  };

  const confirmDeleteDepartment = () => {
    if (departmentToDelete !== null) {
      setDepartments(departments.filter(d => d.id !== departmentToDelete));
      setDepartmentToDelete(null);
    }
    setDeleteDepartmentDialogOpen(false);
  };

  const toggleDepartmentStatus = (departmentId: number) => {
    setDepartments(departments.map(d => 
      d.id === departmentId 
        ? { ...d, status: d.status === "active" ? "inactive" : "active" as "active" | "inactive" }
        : d
    ));
  };

  const handleEditDepartment = (departmentId: number) => {
    const department = departments.find(d => d.id === departmentId);
    if (department) {
      setSelectedDepartmentId(departmentId);
      setIsCreatingNew(false);
      setDepartmentSavedOnce(true); // Existing department has already been saved
      setIsAssignmentMode(false);
      setEditedDepartment({
        name: department.name,
        promptCategories: department.promptCategories,
        status: department.status,
        users: department.users,
        assignedUsers: department.assignedUsers || []
      });
      setEditPanelOpen(true);
    }
  };

  const handleAssignDepartment = (departmentId: number) => {
    const department = departments.find(d => d.id === departmentId);
    if (department) {
      setSelectedDepartmentId(departmentId);
      setIsCreatingNew(false);
      setDepartmentSavedOnce(false); // Allow editing in assignment mode
      setIsAssignmentMode(true);
      setEditedDepartment({
        name: department.name,
        promptCategories: department.promptCategories,
        status: department.status,
        users: department.users,
        assignedUsers: department.assignedUsers || []
      });
      setEditPanelOpen(true);
    }
  };

  const handleCreateNewDepartment = () => {
    setSelectedDepartmentId(null);
    setIsCreatingNew(true);
    setDepartmentSavedOnce(false); // New department hasn't been saved yet
    setIsAssignmentMode(false);
    setIsCreatingCustomDepartment(false);
    setCustomDepartmentName("");
    setEditedDepartment({
      name: "",
      promptCategories: [],
      status: "active",
      users: 0,
      assignedUsers: []
    });
    setEditPanelOpen(true);
  };

  const handleSaveEditedDepartment = () => {
    // Mark that department has been saved at least once
    setDepartmentSavedOnce(true);
    
    if (isCreatingNew) {
      // Create new department
      const newDepartment = {
        id: Math.max(...departments.map(d => d.id)) + 1,
        name: editedDepartment.name,
        promptCategories: editedDepartment.promptCategories,
        status: editedDepartment.status,
        assignedUsers: editedDepartment.assignedUsers,
        users: editedDepartment.assignedUsers.length
      };
      setDepartments([...departments, newDepartment]);
      setEditPanelOpen(false);
      setIsCreatingNew(false);
      setDepartmentSavedOnce(false);
    } else if (selectedDepartmentId !== null) {
      // Edit existing department
      setDepartments(departments.map(d =>
        d.id === selectedDepartmentId
          ? {
              ...d,
              name: editedDepartment.name,
              promptCategories: editedDepartment.promptCategories,
              status: editedDepartment.status,
              assignedUsers: editedDepartment.assignedUsers,
              users: editedDepartment.assignedUsers.length
            }
          : d
      ));
      setEditPanelOpen(false);
      setSelectedDepartmentId(null);
      setDepartmentSavedOnce(false);
    }
  };

  const togglePromptCategory = (category: string) => {
    setEditedDepartment(prev => ({
      ...prev,
      promptCategories: prev.promptCategories.includes(category)
        ? prev.promptCategories.filter(c => c !== category)
        : [...prev.promptCategories, category]
    }));
  };

  const toggleAssignedUser = (user: string) => {
    setEditedDepartment(prev => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(user)
        ? prev.assignedUsers.filter(u => u !== user)
        : [...prev.assignedUsers, user]
    }));
  };

  const toggleAllUsers = (checked: boolean) => {
    if (checked) {
      // Select all available users
      const allUserEmails = availableUsers
        .filter((user, index, self) => 
          index === self.findIndex(u => u.email === user.email)
        )
        .map(user => user.email);
      setEditedDepartment(prev => ({
        ...prev,
        assignedUsers: allUserEmails
      }));
    } else {
      // Deselect all users
      setEditedDepartment(prev => ({
        ...prev,
        assignedUsers: []
      }));
    }
  };

  // Check if all users are selected
  const areAllUsersSelected = () => {
    const uniqueAvailableUsers = availableUsers.filter((user, index, self) => 
      index === self.findIndex(u => u.email === user.email)
    );
    return uniqueAvailableUsers.length > 0 && 
           uniqueAvailableUsers.every(user => editedDepartment.assignedUsers.includes(user.email));
  };

  const handleAddNewDepartment = () => {
    if (addDepartmentMode === "new") {
      if (newDepartmentName.trim()) {
        setPredefinedDepartments([...predefinedDepartments, newDepartmentName.trim()]);
        setEditedDepartment({ ...editedDepartment, name: newDepartmentName.trim() });
        setNewDepartmentName("");
        setShowAddDepartmentDialog(false);
        setAddDepartmentMode("new");
      }
    } else {
      if (selectedExistingDepartment) {
        setEditedDepartment({ ...editedDepartment, name: selectedExistingDepartment });
        setSelectedExistingDepartment("");
        setShowAddDepartmentDialog(false);
        setAddDepartmentMode("new");
      }
    }
  };

  const handleRenameDepartment = () => {
    if (renameDepartmentDialog.newName.trim()) {
      setPredefinedDepartments(predefinedDepartments.map(dept =>
        dept === renameDepartmentDialog.department ? renameDepartmentDialog.newName.trim() : dept
      ));
      setRenameDepartmentDialog({ open: false, department: "", newName: "" });
    }
  };

  const handleDuplicateDepartment = (departmentName: string) => {
    const newName = `${departmentName} (Kopie)`;
    setPredefinedDepartments([...predefinedDepartments, newName]);
  };

  const handleDeletePredefinedDepartment = (departmentName: string) => {
    setPredefinedDepartments(predefinedDepartments.filter(dept => dept !== departmentName));
  };

  const handleAddNewPromptCategory = () => {
    if (newPromptCategoryName.trim()) {
      setAvailablePromptCategories([...availablePromptCategories, newPromptCategoryName.trim()]);
      setNewPromptCategoryName("");
      setShowAddPromptCategoryDialog(false);
    }
  };

  const handleRenamePromptCategory = () => {
    if (renamePromptCategoryDialog.newName.trim()) {
      setAvailablePromptCategories(availablePromptCategories.map(cat =>
        cat === renamePromptCategoryDialog.category ? renamePromptCategoryDialog.newName.trim() : cat
      ));
      setRenamePromptCategoryDialog({ open: false, category: "", newName: "" });
    }
  };

  const handleDuplicatePromptCategory = (categoryName: string) => {
    const newName = `${categoryName} (Kopie)`;
    setAvailablePromptCategories([...availablePromptCategories, newName]);
  };

  const handleDeletePromptCategory = (categoryName: string) => {
    setAvailablePromptCategories(availablePromptCategories.filter(cat => cat !== categoryName));
  };

  // Default users for assignment (fallback if no users from UsersPage)
  const defaultUsers: User[] = [
    { id: 1, name: "Rolf Müller", email: "rolf.mueller@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 2 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 2, name: "Marianne Locher", email: "marianne.locher@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 3 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 3, name: "Gregor Keist", email: "gregor.keist@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 1 Stunde", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 4, name: "Daniel Hanselmann", email: "daniel.hanselmann@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 5 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 5, name: "Roland Steiner", email: "roland.steiner@rmbgroup.ch", source: "azure", role: "Admin", status: "active", lastLogin: "vor 1 Stunde", syncedAt: "29.10.2025, 14:30", groups: ["Administrators", "Products"], departments: ["Produkte"] },
    { id: 6, name: "Benjamin Koch", email: "benjamin.koch@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 4 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Management"], departments: ["Management"] },
    { id: 7, name: "Pascal Koch", email: "pascal.koch@rmbgroup.ch", source: "azure", role: "Power User", status: "active", lastLogin: "vor 2 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Management", "Purchasing", "Logistics", "Engineering"], departments: ["Management", "Einkauf", "Logistik", "Technik"] },
    { id: 8, name: "Andy Haas", email: "andy.haas@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 6 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Management", "Sales", "Marketing"], departments: ["Management", "Vertrieb", "Marketing"] },
    { id: 9, name: "Marko Vukic", email: "marko.vukic@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 1 Tag", syncedAt: "29.10.2025, 14:30", groups: ["Logistics"], departments: ["Logistik"] },
    { id: 10, name: "Micha Graf", email: "micha.graf@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 8 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Planning"], departments: ["Planung"] },
    { id: 11, name: "Patrick Berther", email: "patrick.berther@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 3 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Finance"], departments: ["Finanzen"] },
    { id: 12, name: "Samuel Mattmüller", email: "samuel.mattmueller@rmbgroup.ch", source: "azure", role: "User", status: "active", lastLogin: "vor 5 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 13, name: "Martin Keist", email: "martin.keist@rmbgroup.ch", source: "azure", role: "Power User", status: "active", lastLogin: "vor 2 Stunden", syncedAt: "29.10.2025, 14:30", groups: ["Sales"], departments: ["Vertrieb"] },
    { id: 14, name: "Silvio Müller", email: "silvio.mueller@rmbgroup.ch", source: "local", role: "User", status: "active", lastLogin: "vor 3 Stunden", groups: [], departments: ["Technik"] },
    { id: 15, name: "Stefan Seiler", email: "stefan.seiler@rmbgroup.ch", source: "local", role: "User", status: "active", lastLogin: "vor 1 Stunde", groups: [], departments: ["IT"] },
    { id: 16, name: "Fritz Baumann", email: "fritz.baumann@rmbgroup.ch", source: "local", role: "Power User", status: "active", lastLogin: "vor 5 Stunden", groups: [], departments: ["Produktion"] },
    { id: 17, name: "Susanne Meier", email: "susanne.meier@rmbgroup.ch", source: "local", role: "User", status: "active", lastLogin: "vor 2 Stunden", groups: [], departments: ["Produktion"] },
    { id: 18, name: "Stefanie Gruber", email: "stefanie.gruber@rmbgroup.ch", source: "local", role: "User", status: "active", lastLogin: "vor 4 Stunden", groups: [], departments: ["Produktion"] },
    { id: 19, name: "Lara Huber", email: "lara.huber@rmbgroup.ch", source: "local", role: "Power User", status: "active", lastLogin: "vor 1 Stunde", groups: [], departments: ["Digitalisierung"] },
    { id: 20, name: "Monika Frey", email: "monika.frey@rmbgroup.ch", source: "local", role: "User", status: "active", lastLogin: "vor 6 Stunden", groups: [], departments: ["Projekte"] },
    { id: 21, name: "Ana Kuzic", email: "ana.kuzic@rmbgroup.ch", source: "local", role: "User", status: "active", lastLogin: "vor 3 Stunden", groups: [], departments: ["Entwicklung"] },
    { id: 22, name: "Svenja Josip", email: "svenja.josip@rmbgroup.ch", source: "local", role: "Power User", status: "active", lastLogin: "vor 2 Stunden", groups: [], departments: ["Produktion"] },
    { id: 23, name: "Ariton Vukic", email: "ariton.vukic@rmbgroup.ch", source: "local", role: "User", status: "active", lastLogin: "vor 5 Stunden", groups: [], departments: ["Entwicklung"] },
    { id: 24, name: "Murat Oetzi", email: "murat.oetzi@rmbgroup.ch", source: "local", role: "User", status: "active", lastLogin: "vor 4 Stunden", groups: [], departments: ["Marketing"] },
    { id: 25, name: "Ali Bonemi", email: "Ali.bonemi@rmbgroup.ch", source: "local", role: "Power User", status: "active", lastLogin: "vor 1 Stunde", groups: [], departments: ["Marketing"] },
  ];

  const allUsers = propAllUsers || defaultUsers;
  const availableUsers = allUsers;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Departments Header */}
      <div 
        className="h-14 flex items-center justify-between gap-3 px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
          <h2 className="font-medium" style={{ color: '#000000' }}>
            {t.tenantAdmin.userManagement.departments.managementTitle}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-transparent border border-transparent hover:border-black hover:bg-transparent transition-colors"
          title={t.tenantAdmin.userManagement.departments.newDepartmentTooltip}
          onClick={handleCreateNewDepartment}
        >
          <Plus className="h-4 w-4" style={{ color: '#000000' }} />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Departments Table */}
            <Card style={{ border: '1px solid #e1dfdd' }}>
              <CardHeader>
                <CardTitle>{t.tenantAdmin.userManagement.departments.title}</CardTitle>
                <CardDescription>{t.tenantAdmin.userManagement.departments.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">{t.tenantAdmin.userManagement.departments.department}</TableHead>
                      <TableHead>{t.tenantAdmin.userManagement.departments.promptCategories}</TableHead>
                      <TableHead>{t.tenantAdmin.userManagement.departments.status}</TableHead>
                      <TableHead className="text-center">{t.tenantAdmin.userManagement.departments.users}</TableHead>
                      <TableHead className="text-right pr-6">{t.tenantAdmin.userManagement.departments.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departments.map((department) => (
                      <TableRow key={department.id} className="hover:bg-[#E9C796] transition-colors">
                        <TableCell className="pl-6">
                          <span>{department.name}</span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className="transition-colors"
                                style={{
                                  border: '1px solid #e1dfdd',
                                  backgroundColor: 'transparent',
                                  cursor: 'pointer',
                                  padding: '4px 12px',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                {department.promptCategories.length} {t.tenantAdmin.userManagement.departments.categories}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="max-h-[300px] overflow-y-auto custom-scrollbar w-64">
                              {department.promptCategories.map((category) => (
                                <DropdownMenuItem 
                                  key={category}
                                  className="hover:bg-[#E9C796] focus:bg-[#E9C796]"
                                >
                                  {category}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className="border-[#e1dfdd] transition-colors cursor-pointer"
                            style={{
                              backgroundColor: department.status === "inactive" ? '#E9C796' : 'transparent',
                              color: '#000000'
                            }}
                            onClick={() => toggleDepartmentStatus(department.id)}
                          >
                            {department.status === "active" ? t.tenantAdmin.userManagement.departments.active : t.tenantAdmin.userManagement.departments.inactive}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                style={{
                                  border: '1px solid #e1dfdd',
                                  backgroundColor: 'transparent',
                                  cursor: 'pointer',
                                  padding: '4px 12px',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                {department.users} {t.tenantAdmin.userManagement.departments.users}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="max-h-[300px] overflow-y-auto custom-scrollbar w-64">
                              {department.assignedUsers && department.assignedUsers.length > 0 ? (
                                department.assignedUsers.map((userEmail) => (
                                  <DropdownMenuItem 
                                    key={userEmail}
                                    className="hover:bg-[#E9C796] focus:bg-[#E9C796]"
                                  >
                                    {userEmail}
                                  </DropdownMenuItem>
                                ))
                              ) : (
                                <DropdownMenuItem disabled className="text-gray-400">
                                  {t.tenantAdmin.userManagement.departments.noUsersAssigned}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 border border-transparent hover:border-[#e1dfdd] hover:bg-transparent"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditDepartment(department.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                {t.tenantAdmin.userManagement.departments.edit}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                const duplicatedDepartment = {
                                  ...department,
                                  id: Date.now(),
                                  name: `${department.name} (Kopie)`
                                };
                                setDepartments([...departments, duplicatedDepartment]);
                              }}>
                                <FileText className="h-4 w-4 mr-2" />
                                {t.tenantAdmin.userManagement.departments.duplicate}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCreateNewDepartment()}>
                                <Plus className="h-4 w-4 mr-2" />
                                {t.tenantAdmin.userManagement.departments.newDepartment}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteDepartment(department.id)}
                                className="text-black"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t.tenantAdmin.userManagement.departments.delete}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

      {/* Edit Department Panel */}
      <Sheet open={editPanelOpen} onOpenChange={setEditPanelOpen}>
        <SheetContent 
          side="right" 
          className="w-full sm:max-w-md p-0 flex flex-col"
          style={{
            backgroundColor: '#ffffff',
            borderLeft: '1px solid #e1dfdd',
            top: '64px',
            height: 'calc(100vh - 64px)'
          }}
        >
          {/* Accessible Title and Description for Screen Readers */}
          <SheetHeader className="sr-only">
            <SheetTitle>{t.tenantAdmin.userManagement.departments.editDepartment}</SheetTitle>
            <SheetDescription>
              {t.tenantAdmin.userManagement.departments.editDepartmentDesc}
            </SheetDescription>
          </SheetHeader>

          {/* Panel Header */}
          <div 
            className="h-14 flex items-center justify-between px-4 gap-3"
            style={{ 
              borderBottom: '1px solid #e1dfdd',
              backgroundColor: '#DE851D'
            }}
          >
            <div className="flex items-center gap-3">
              <Edit className="h-5 w-5 flex-shrink-0 text-black" />
              <h3 className="font-medium text-black" style={{ fontSize: 'calc(1em + 1px)' }}>
                {t.tenantAdmin.userManagement.departments.assignPromptCategory}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditPanelOpen(false)}
              className="h-8 w-8 hover:border hover:border-black hover:bg-transparent transition-colors"
            >
              <X className="h-4 w-4" style={{ color: '#000000' }} />
            </Button>
          </div>

          {/* Panel Content - Scrollable */}
          <div 
            className="flex-1 overflow-auto px-4 py-6"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#e1dfdd transparent'
            }}
          >
            <style>
              {`
                .flex-1.overflow-auto.px-6::-webkit-scrollbar {
                  width: 8px;
                }
                .flex-1.overflow-auto.px-6::-webkit-scrollbar-track {
                  background: transparent;
                }
                .flex-1.overflow-auto.px-6::-webkit-scrollbar-thumb {
                  background-color: #e1dfdd;
                  border-radius: 4px;
                }
                .flex-1.overflow-auto.px-6::-webkit-scrollbar-thumb:hover {
                  background-color: #d1cfcd;
                }
                .prompt-category-scrollbar::-webkit-scrollbar {
                  width: 8px;
                }
                .prompt-category-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .prompt-category-scrollbar::-webkit-scrollbar-thumb {
                  background-color: #e1dfdd;
                  border-radius: 4px;
                }
                .prompt-category-scrollbar::-webkit-scrollbar-thumb:hover {
                  background-color: #d1cfcd;
                }
              `}
            </style>

            <div className="space-y-6">
              {/* Department Name */}
              <div className="space-y-2">
                <Label htmlFor="departmentName">{t.tenantAdmin.userManagement.departments.departmentName}</Label>
                <div className="flex gap-2">
                  {isCreatingNew ? (
                    <div className="flex-1 space-y-2">
                      <Select
                        value={isCreatingCustomDepartment ? t.tenantAdmin.userManagement.departments.createNewDepartment : editedDepartment.name}
                        onValueChange={(value) => {
                          if (value === t.tenantAdmin.userManagement.departments.createNewDepartment) {
                            setIsCreatingCustomDepartment(true);
                            setEditedDepartment({ ...editedDepartment, name: "" });
                          } else {
                            setIsCreatingCustomDepartment(false);
                            setCustomDepartmentName("");
                            setEditedDepartment({ ...editedDepartment, name: value });
                            // If "All" is selected, automatically select all users
                            if (value === t.tenantAdmin.userManagement.departments.all) {
                              const allUserEmails = availableUsers
                                .filter((user, index, self) => 
                                  index === self.findIndex(u => u.email === user.email)
                                )
                                .map(user => user.email);
                              setEditedDepartment(prev => ({
                                ...prev,
                                name: value,
                                assignedUsers: allUserEmails
                              }));
                            }
                          }
                        }}
                      >
                        <SelectTrigger 
                          className="border-[#e1dfdd] focus:border-[#DE851D] focus:ring-[#DE851D] bg-transparent hover:bg-[#E9C796] transition-colors"
                          style={{ borderColor: '#e1dfdd' }}
                        >
                          <SelectValue placeholder={t.tenantAdmin.userManagement.departments.selectOrCreateDepartment} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={t.tenantAdmin.userManagement.departments.createNewDepartment}>{t.tenantAdmin.userManagement.departments.createNewDepartment}</SelectItem>
                          <SelectItem value={t.tenantAdmin.userManagement.departments.all}>{t.tenantAdmin.userManagement.departments.all}</SelectItem>
                          <SelectItem value="-">-</SelectItem>
                          {predefinedDepartments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isCreatingCustomDepartment && (
                        <Input
                          type="text"
                          value={customDepartmentName}
                          onChange={(e) => {
                            setCustomDepartmentName(e.target.value);
                            setEditedDepartment({ ...editedDepartment, name: e.target.value });
                          }}
                          placeholder={t.tenantAdmin.userManagement.departments.enterDepartmentName}
                          className="border-[#e1dfdd] focus:border-[#DE851D] focus:ring-[#DE851D]"
                        />
                      )}
                    </div>
                  ) : selectedDepartmentId !== null && !editedDepartment.name.includes("(Kopie)") && departmentSavedOnce ? (
                    <input
                      type="text"
                      value={editedDepartment.name}
                      disabled
                      className="flex-1 px-3 py-2 border border-[#e1dfdd] rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                      style={{ borderColor: '#e1dfdd' }}
                    />
                  ) : (
                    <Select
                      value={editedDepartment.name}
                      onValueChange={(value) => {
                        setEditedDepartment({ ...editedDepartment, name: value });
                        // If "All" is selected, automatically select all users
                        if (value === t.tenantAdmin.userManagement.departments.all) {
                          const allUserEmails = availableUsers
                            .filter((user, index, self) => 
                              index === self.findIndex(u => u.email === user.email)
                            )
                            .map(user => user.email);
                          setEditedDepartment(prev => ({
                            ...prev,
                            name: value,
                            assignedUsers: allUserEmails
                          }));
                        }
                      }}
                    >
                      <SelectTrigger 
                        className="flex-1 border-[#e1dfdd] focus:border-[#DE851D] focus:ring-[#DE851D] bg-transparent hover:bg-[#E9C796] transition-colors"
                        style={{ borderColor: '#e1dfdd' }}
                      >
                        <SelectValue placeholder="-" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={t.tenantAdmin.userManagement.departments.all}>{t.tenantAdmin.userManagement.departments.all}</SelectItem>
                        <SelectItem value="-">-</SelectItem>
                      {predefinedDepartments.map((dept) => (
                        <div
                          key={dept}
                          className="relative group"
                          onMouseEnter={() => setDepartmentMenuOpen(dept)}
                          onMouseLeave={() => setDepartmentMenuOpen(null)}
                        >
                          <SelectItem value={dept} className="pr-10">
                            {dept}
                          </SelectItem>
                          {departmentMenuOpen === dept && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setRenameDepartmentDialog({ open: true, department: dept, newName: dept });
                                    }}
                                    style={{ color: '#000000' }}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    {t.tenantAdmin.userManagement.departments.edit}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDuplicateDepartment(dept);
                                    }}
                                    style={{ color: '#000000' }}
                                  >
                                    <Merge className="h-4 w-4 mr-2" />
                                    {t.tenantAdmin.userManagement.departments.duplicate}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeletePredefinedDepartment(dept);
                                    }}
                                    style={{ color: '#000000' }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    {t.tenantAdmin.userManagement.departments.delete}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          )}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  )}
                  {!isCreatingNew && (selectedDepartmentId === null || editedDepartment.name.includes("(Kopie)")) && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowAddDepartmentDialog(true)}
                      className="flex-shrink-0"
                      style={{
                        borderColor: '#e1dfdd',
                        color: '#000000'
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <Separator className="bg-[#e1dfdd]" />

              {/* Prompt Categories */}
              <div className="space-y-3">
                <Label>{t.tenantAdmin.userManagement.departments.promptCategory}</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-transparent hover:bg-[#E9C796] transition-colors font-normal"
                      style={{
                        borderColor: '#e1dfdd',
                        color: '#000000'
                      }}
                    >
                      <span className="font-normal" style={{ fontWeight: 400 }}>
                        {editedDepartment.promptCategories.length === 0
                          ? ""
                          : `${editedDepartment.promptCategories.length} ${t.tenantAdmin.userManagement.departments.categoriesSelected}`}
                      </span>
                      <svg className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 max-h-[300px] overflow-y-auto custom-scrollbar">
                      <DropdownMenuItem
                        className="hover:bg-[#E9C796] focus:bg-[#E9C796] cursor-pointer"
                        onSelect={(e) => {
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div
                            className="h-4 w-4 border rounded flex items-center justify-center transition-colors flex-shrink-0"
                            style={{
                              borderColor: '#e1dfdd',
                              backgroundColor: 'transparent'
                            }}
                          >
                          </div>
                          <span className="flex-1">-</span>
                        </div>
                      </DropdownMenuItem>
                      {availablePromptCategories.map((category) => (
                        <div
                          key={category}
                          className="relative group"
                          onMouseEnter={() => setPromptCategoryMenuOpen(category)}
                          onMouseLeave={() => setPromptCategoryMenuOpen(null)}
                        >
                          <DropdownMenuItem
                            className="hover:bg-[#E9C796] focus:bg-[#E9C796] cursor-pointer"
                            onSelect={(e) => {
                              e.preventDefault();
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              togglePromptCategory(category);
                            }}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <div
                                className="h-4 w-4 border rounded flex items-center justify-center transition-colors flex-shrink-0"
                                style={{
                                  borderColor: '#e1dfdd',
                                  backgroundColor: editedDepartment.promptCategories.includes(category) ? '#E9C796' : 'transparent'
                                }}
                              >
                                {editedDepartment.promptCategories.includes(category) && (
                                  <Check className="h-3 w-3 text-black" />
                                )}
                              </div>
                              <span className="flex-1">{category}</span>
                            </div>
                          </DropdownMenuItem>
                          {promptCategoryMenuOpen === category && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-50">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setRenamePromptCategoryDialog({ open: true, category: category, newName: category });
                                    }}
                                    style={{ color: '#000000' }}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    {t.tenantAdmin.userManagement.departments.edit}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDuplicatePromptCategory(category);
                                    }}
                                    style={{ color: '#000000' }}
                                  >
                                    <Merge className="h-4 w-4 mr-2" />
                                    {t.tenantAdmin.userManagement.departments.duplicate}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeletePromptCategory(category);
                                    }}
                                    style={{ color: '#000000' }}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    {t.tenantAdmin.userManagement.departments.delete}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          )}
                        </div>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                <p className="text-xs text-muted-foreground" style={{ fontWeight: 400 }}>
                  {editedDepartment.promptCategories.length} {t.tenantAdmin.userManagement.departments.categoriesSelected}
                </p>
              </div>

              <Separator className="bg-[#e1dfdd]" />

              {/* Status */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t.tenantAdmin.userManagement.departments.status}</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {editedDepartment.status === "active" ? t.tenantAdmin.userManagement.departments.active : t.tenantAdmin.userManagement.departments.inactive}
                    </span>
                    <Switch
                      checked={editedDepartment.status === "active"}
                      onCheckedChange={(checked) => 
                        setEditedDepartment({ ...editedDepartment, status: checked ? "active" : "inactive" })
                      }
                      className="data-[state=checked]:bg-[#DE851D]"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-[#e1dfdd]" />

              {/* User Assignment */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>{t.tenantAdmin.userManagement.departments.assignUsers}</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{t.tenantAdmin.userManagement.departments.allUsers}</span>
                    <Switch
                      checked={areAllUsersSelected()}
                      onCheckedChange={toggleAllUsers}
                      className="data-[state=checked]:bg-[#DE851D]"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t.tenantAdmin.userManagement.departments.noDepartmentAssigned}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="w-full transition-colors text-sm"
                      style={{
                        border: '1px solid #e1dfdd',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E9C796'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {editedDepartment.assignedUsers.length === 0 
                        ? '-' 
                        : `${editedDepartment.assignedUsers.length} ${t.tenantAdmin.userManagement.departments.users}`}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 max-h-none overflow-visible">
                    <div className="p-2 border-b border-[#e1dfdd]">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder={t.tenantAdmin.userManagement.departments.searchUsers}
                          value={userSearchQuery}
                          onChange={(e) => setUserSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-9 py-2 border border-[#e1dfdd] rounded-md focus:outline-none focus:border-[#DE851D] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          autoFocus
                        />
                        {userSearchQuery && (
                          <button
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUserSearchQuery("");
                            }}
                            onMouseDown={(e) => e.stopPropagation()}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                      {availableUsers
                        .filter(user => 
                          user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
                        )
                        .filter((user, index, self) => 
                          index === self.findIndex(u => u.email === user.email)
                        )
                        .map((user) => (
                        <DropdownMenuItem 
                          key={user.email}
                          className="hover:bg-[#E9C796] focus:bg-[#E9C796] cursor-pointer"
                          onSelect={(e) => {
                            e.preventDefault();
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleAssignedUser(user.email);
                          }}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div
                              className="h-4 w-4 border rounded flex items-center justify-center transition-colors flex-shrink-0"
                              style={{
                                borderColor: '#e1dfdd',
                                backgroundColor: editedDepartment.assignedUsers.includes(user.email) ? '#E9C796' : 'transparent'
                              }}
                            >
                              {editedDepartment.assignedUsers.includes(user.email) && (
                                <Check className="h-3 w-3 text-black" />
                              )}
                            </div>
                            <span className="flex-1">{user.name}</span>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <p className="text-xs text-muted-foreground">
                  {editedDepartment.assignedUsers.length} {t.tenantAdmin.userManagement.departments.usersSelected}
                </p>
              </div>
            </div>
          </div>

          {/* Panel Footer */}
          <div 
            className="px-4 py-4 border-t"
            style={{ borderColor: '#e1dfdd' }}
          >
            <div className="flex gap-2">
              <Button 
                className="flex-1"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#e1dfdd',
                  color: 'black',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={() => {
                  setEditPanelOpen(false);
                  setIsCreatingNew(false);
                }}
              >
                {t.tenantAdmin.userManagement.departments.cancel}
              </Button>
              <Button 
                className="flex-1"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#e1dfdd',
                  color: 'black',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={handleSaveEditedDepartment}
                disabled={(isCreatingNew && !editedDepartment.name.trim()) || editedDepartment.promptCategories.length === 0}
              >
                {t.tenantAdmin.userManagement.departments.save}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Department Confirmation Dialog */}
      <AlertDialog open={deleteDepartmentDialogOpen} onOpenChange={setDeleteDepartmentDialogOpen}>
        <AlertDialogContent 
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e1dfdd'
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>{t.tenantAdmin.userManagement.departments.deleteDepartmentTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.tenantAdmin.userManagement.departments.deleteDepartmentDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.tenantAdmin.userManagement.departments.cancel}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteDepartment}
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.tenantAdmin.userManagement.users.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add New Department Dialog */}
      <AlertDialog open={showAddDepartmentDialog} onOpenChange={setShowAddDepartmentDialog}>
        <AlertDialogContent 
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e1dfdd'
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>{t.tenantAdmin.userManagement.departments.assignDepartmentTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.tenantAdmin.userManagement.departments.assignDepartmentDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
            {/* Mode Selection */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={addDepartmentMode === "existing" ? "default" : "outline"}
                onClick={() => setAddDepartmentMode("existing")}
                className="flex-1 transition-colors"
                style={{
                  backgroundColor: addDepartmentMode === "existing" ? '#DE851D' : 'transparent',
                  borderColor: '#e1dfdd',
                  color: addDepartmentMode === "existing" ? '#ffffff' : '#000000'
                }}
              >
                Aus Liste auswählen
              </Button>
              <Button
                type="button"
                variant={addDepartmentMode === "new" ? "default" : "outline"}
                onClick={() => setAddDepartmentMode("new")}
                className="flex-1 transition-colors"
                style={{
                  backgroundColor: addDepartmentMode === "new" ? '#DE851D' : 'transparent',
                  borderColor: '#e1dfdd',
                  color: addDepartmentMode === "new" ? '#ffffff' : '#000000'
                }}
              >
                Neue erstellen
              </Button>
            </div>

            {/* Input based on mode */}
            {addDepartmentMode === "new" ? (
              <Input
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                placeholder={t.tenantAdmin.userManagement.departments.departmentName}
                className="border-[#e1dfdd] focus:border-[#DE851D] focus:ring-[#DE851D]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddNewDepartment();
                  }
                }}
              />
            ) : (
              <Select
                value={selectedExistingDepartment}
                onValueChange={setSelectedExistingDepartment}
              >
                <SelectTrigger 
                  className="border-[#e1dfdd] focus:border-[#DE851D] focus:ring-[#DE851D] bg-transparent hover:bg-[#E9C796] transition-colors"
                  style={{ borderColor: '#e1dfdd' }}
                >
                  <SelectValue placeholder={t.tenantAdmin.userManagement.departments.selectDepartment} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={t.tenantAdmin.userManagement.departments.all}>{t.tenantAdmin.userManagement.departments.all}</SelectItem>
                  <SelectItem value="-">-</SelectItem>
                  {predefinedDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
              onClick={() => {
                setAddDepartmentMode("new");
                setNewDepartmentName("");
                setSelectedExistingDepartment("");
              }}
            >
              {t.tenantAdmin.userManagement.departments.cancel}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleAddNewDepartment}
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {addDepartmentMode === "new" ? t.tenantAdmin.userManagement.departments.create : t.tenantAdmin.userManagement.departments.select}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Department Dialog */}
      <AlertDialog open={renameDepartmentDialog.open} onOpenChange={(open) => setRenameDepartmentDialog({ ...renameDepartmentDialog, open })}>
        <AlertDialogContent 
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e1dfdd'
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>{t.tenantAdmin.userManagement.departments.renameDepartmentTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.tenantAdmin.userManagement.departments.renameDepartmentDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              value={renameDepartmentDialog.newName}
              onChange={(e) => setRenameDepartmentDialog({ ...renameDepartmentDialog, newName: e.target.value })}
              placeholder={t.tenantAdmin.userManagement.departments.newDepartmentName}
              className="border-[#e1dfdd] focus:border-[#DE851D] focus:ring-[#DE851D]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRenameDepartment();
                }
              }}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.tenantAdmin.userManagement.departments.cancel}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRenameDepartment}
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.tenantAdmin.userManagement.departments.rename}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add New Prompt Category Dialog */}
      <AlertDialog open={showAddPromptCategoryDialog} onOpenChange={setShowAddPromptCategoryDialog}>
        <AlertDialogContent 
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e1dfdd'
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>{t.tenantAdmin.userManagement.promptCategories.addNewCategory}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.tenantAdmin.userManagement.promptCategories.addNewCategoryDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              value={newPromptCategoryName}
              onChange={(e) => setNewPromptCategoryName(e.target.value)}
              placeholder={t.tenantAdmin.userManagement.promptCategories.categoryName}
              className="border-[#e1dfdd] focus:border-[#DE851D] focus:ring-[#DE851D]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddNewPromptCategory();
                }
              }}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.tenantAdmin.userManagement.departments.cancel}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleAddNewPromptCategory}
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.tenantAdmin.userManagement.promptCategories.add}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename Prompt Category Dialog */}
      <AlertDialog open={renamePromptCategoryDialog.open} onOpenChange={(open) => setRenamePromptCategoryDialog({ ...renamePromptCategoryDialog, open })}>
        <AlertDialogContent 
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#e1dfdd'
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>{t.tenantAdmin.userManagement.promptCategories.renameCategory}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.tenantAdmin.userManagement.promptCategories.renameCategoryDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              value={renamePromptCategoryDialog.newName}
              onChange={(e) => setRenamePromptCategoryDialog({ ...renamePromptCategoryDialog, newName: e.target.value })}
              placeholder={t.tenantAdmin.userManagement.promptCategories.newCategoryName}
              className="border-[#e1dfdd] focus:border-[#DE851D] focus:ring-[#DE851D]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleRenamePromptCategory();
                }
              }}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.tenantAdmin.userManagement.departments.cancel}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRenamePromptCategory}
              className="bg-transparent border hover:bg-[#E9C796] transition-colors"
              style={{
                borderColor: '#e1dfdd',
                color: '#000000'
              }}
            >
              {t.tenantAdmin.userManagement.departments.rename}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}