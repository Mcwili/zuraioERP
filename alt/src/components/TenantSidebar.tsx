import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Package, 
  Database, 
  Activity, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Building2,
  FileText
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../utils/i18n";

interface SubItem {
  id: string;
  labelKey: string;
  subitems?: SubItem[];
}

interface SidebarItem {
  id: string;
  labelKey: string;
  icon: React.ComponentType<{ className?: string }>;
  subitems?: SubItem[];
}

interface TenantSidebarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
  collapsed?: boolean;
  isDarkMode?: boolean;
  onToggle?: () => void;
}

export function TenantSidebar({ currentPage, onNavigate, collapsed = false, isDarkMode = false, onToggle }: TenantSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { t } = useLanguage();

  // Auto-expand parent menus when a nested page is active
  useEffect(() => {
    const parts = currentPage.split('.');
    const itemsToExpand: string[] = [];
    
    // Build the hierarchy: for "tenant-settings.compliance.dsgvo" we need to expand:
    // - "tenant-settings"
    // - "tenant-settings.compliance"
    for (let i = 1; i < parts.length; i++) {
      const path = parts.slice(0, i + 1).join('.');
      itemsToExpand.push(path);
    }
    
    setExpandedItems(prev => {
      const newExpanded = [...prev];
      itemsToExpand.forEach(item => {
        if (!newExpanded.includes(item)) {
          newExpanded.push(item);
        }
      });
      return newExpanded;
    });
  }, [currentPage]);

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      labelKey: "dashboard",
      icon: LayoutDashboard
    },
    {
      id: "tenant-settings",
      labelKey: "tenantSettings",
      icon: Settings,
      subitems: [
        { id: "general", labelKey: "general" },
        { 
          id: "compliance", 
          labelKey: "compliance",
          subitems: [
            { id: "euaiact", labelKey: "euAiAct" },
            { id: "dsgvo", labelKey: "dsgvo" },
            { id: "responsibilities", labelKey: "responsibilities" }
          ]
        },
        { id: "security", labelKey: "security" }
      ]
    },
    {
      id: "user-management",
      labelKey: "userRoles",
      icon: Users,
      subitems: [
        { id: "users", labelKey: "users" },
        { id: "dsgvo", labelKey: "dsgvo" },
        { id: "departments", labelKey: "departments" },
        { id: "roles", labelKey: "roles" }
      ]
    },
    {
      id: "modules",
      labelKey: "modulesFeatures",
      icon: Package,
      subitems: [
        { id: "models", labelKey: "models" },
        { id: "overview", labelKey: "overview" }
      ]
    },
    {
      id: "data",
      labelKey: "dataManagement",
      icon: Database,
      subitems: [
        { id: "backups", labelKey: "backups" }
      ]
    },
    {
      id: "prompts",
      labelKey: "promptsFrameworks",
      icon: FileText,
      subitems: [
        { id: "library", labelKey: "library" },
        { id: "frameworks", labelKey: "frameworks" }
      ]
    },
    {
      id: "monitoring",
      labelKey: "loggingMonitoring",
      icon: Activity,
      subitems: [
        { id: "activity", labelKey: "activity" },
        { id: "system", labelKey: "system" },
        { id: "alerts", labelKey: "alerts" }
      ]
    },
    {
      id: "support",
      labelKey: "supportDocs",
      icon: HelpCircle,
      subitems: [
        { id: "documentation", labelKey: "documentation" },
        { id: "faq", labelKey: "faq" },
        { id: "tickets", labelKey: "tickets" },
        { id: "tutorials", labelKey: "tutorials" },
        { id: "api", labelKey: "api" },
        { id: "contact", labelKey: "contact" }
      ]
    }
  ];

  const getLabel = (item: SidebarItem) => {
    return (t.tenantAdmin.sidebar as any)[item.labelKey];
  };

  const getSubLabel = (parentId: string, subitemId: string) => {
    if (parentId === "tenant-settings") {
      return (t.tenantAdmin.tenantSettingsSub as any)[subitemId];
    } else if (parentId === "user-management") {
      return (t.tenantAdmin.userManagementSub as any)[subitemId];
    } else if (parentId === "modules") {
      return (t.tenantAdmin.modulesSub as any)[subitemId];
    } else if (parentId === "data") {
      return (t.tenantAdmin.dataSub as any)[subitemId];
    } else if (parentId === "prompts") {
      return (t.tenantAdmin.promptsSub as any)[subitemId];
    } else if (parentId === "monitoring") {
      return (t.tenantAdmin.monitoringSub as any)[subitemId];
    } else if (parentId === "support") {
      return (t.tenantAdmin.supportSub as any)[subitemId];
    }
    return subitemId;
  };

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (itemId: string) => {
    return currentPage === itemId || currentPage.startsWith(`${itemId}.`);
  };

  const renderSubitems = (parentId: string, subitems: SubItem[], level: number = 1) => {
    return (
      <div className="py-1">
        {subitems.map((subitem) => {
          const fullId = `${parentId}.${subitem.id}`;
          const subExpanded = expandedItems.includes(fullId);
          const subActive = currentPage === fullId || currentPage.startsWith(`${fullId}.`);
          const hasNestedItems = subitem.subitems && subitem.subitems.length > 0;
          const paddingLeft = level === 1 ? 'pl-12' : 'pl-16';

          return (
            <div key={subitem.id}>
              <button
                onClick={() => {
                  if (hasNestedItems) {
                    toggleExpand(fullId);
                  } else {
                    onNavigate(fullId);
                  }
                }}
                className={`w-full flex items-center gap-3 ${paddingLeft} pr-4 py-2 text-sm transition-all rounded-lg`}
                style={{
                  backgroundColor: subActive && !hasNestedItems ? '#E9C796' : 'transparent',
                  color: subActive && !hasNestedItems ? '#000000' : (isDarkMode ? '#e5e5e5' : 'var(--color-gray-dark)'),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  if (subActive && !hasNestedItems) {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  } else {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="flex-1 text-left">{getSubLabel(parentId.split('.')[0], subitem.labelKey)}</span>
                {hasNestedItems && (
                  subExpanded ? 
                    <ChevronDown className="h-4 w-4 flex-shrink-0" /> : 
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                )}
              </button>

              {/* Nested subitems */}
              {hasNestedItems && subExpanded && subitem.subitems && (
                renderSubitems(fullId, subitem.subitems, level + 1)
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div 
      className="flex flex-col h-full transition-all duration-200 shadow-sm w-full sm:w-[400px]"
      style={{ 
        backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
        borderRight: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* Sidebar Header */}
      <div 
        className="h-14 flex items-center justify-between px-4"
        style={{ 
          borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: '#DE851D'
        }}
      >
        {!collapsed && (
          <>
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 flex-shrink-0" style={{ color: '#000000' }} />
              <h2 className="font-medium" style={{ color: '#000000' }}>
                {t.tenantAdmin.sidebar.tenantAdmin}
              </h2>
            </div>
            {onToggle && (
              <button
                onClick={onToggle}
                className="p-1 rounded transition-colors cursor-pointer"
                style={{ 
                  backgroundColor: 'transparent',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <ChevronLeft className="h-4 w-4" style={{ color: '#000000' }} />
              </button>
            )}
          </>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const expanded = expandedItems.includes(item.id);
          const active = isActive(item.id);

          return (
            <div key={item.id}>
              {/* Main Item */}
              <button
                onClick={() => {
                  if (item.subitems) {
                    toggleExpand(item.id);
                  } else {
                    onNavigate(item.id);
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all rounded-lg"
                style={{
                  backgroundColor: (item.id === 'dashboard') && active && !item.subitems ? '#E9C796' : 'transparent',
                  color: '#000000',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E9C796';
                }}
                onMouseLeave={(e) => {
                  if ((item.id === 'dashboard') && active && !item.subitems) {
                    e.currentTarget.style.backgroundColor = '#E9C796';
                  } else {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                title={collapsed ? getLabel(item) : undefined}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{getLabel(item)}</span>
                    {item.subitems && (
                      expanded ? 
                        <ChevronDown className="h-4 w-4 flex-shrink-0" /> : 
                        <ChevronRight className="h-4 w-4 flex-shrink-0" />
                    )}
                  </>
                )}
              </button>

              {/* Subitems */}
              {!collapsed && item.subitems && expanded && renderSubitems(item.id, item.subitems)}
            </div>
          );
        })}
      </div>

      {/* Version Info */}
      {!collapsed && (
        <div 
          className="px-4 py-3 text-xs text-center"
          style={{ 
            borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
            color: isDarkMode ? '#888' : 'var(--foreground-muted)',
            backgroundColor: isDarkMode ? '#2a2a2a' : 'white'
          }}
        >
          {t.tenantAdmin.version}
        </div>
      )}
    </div>
  );
}