# Tenant Admin Fenster - Design-Dokumentation

## Übersicht
Das Tenant Admin Fenster ist ein **slide-in Panel** von links, das über dem Hauptinhalt erscheint und die komplette Verwaltung der AI-Hub Anwendung ermöglicht.

---

## 1. PANEL-STRUKTUR & GRÖSSE

### Panel Dimensions
- **Breite**: `400px` (fest, nicht responsive außer mobile)
- **Position**: Links, `fixed` positioning
- **Höhe**: Von `top: 64px` (unterhalb des Headers) bis `bottom: 0`
- **Z-Index**: `z-40` (Panel), `z-50` (Mobile Overlay)

### Animation
```typescript
// Motion/React Spring-Animation
initial={{ x: -400 }}    // Start: 400px links außerhalb
animate={{ x: 0 }}        // Ende: Position 0 (sichtbar)
exit={{ x: -400 }}        // Exit: Zurück nach links

// Spring-Parameter
stiffness: 300
damping: 30
mass: 0.8
```

### Mobile Verhalten
- **Breakpoint**: `lg` (1024px)
- **Mobile Width**: `100%` oder `280px`
- **Overlay**: Schwarzer Hintergrund mit 50% Opacity (`bg-black/50`)

---

## 2. FARBSYSTEM

### Primärfarben
```css
--color-primary: #DE851D;        /* Orange - Hauptfarbe */
--color-accent: #E9C796;          /* Helles Orange - Hover/Active */
--color-border: #e1dfdd;          /* Hellgrau - Rahmen */
```

### Panel-Hintergrund
```css
Light Mode: #FFFFFF
Dark Mode:  #2a2a2a
```

### Rahmen & Schatten
```css
borderRight: 1px solid rgba(0, 0, 0, 0.06)  /* Light Mode */
borderRight: 1px solid rgba(255, 255, 255, 0.1)  /* Dark Mode */
boxShadow: 2px 0 8px rgba(0, 0, 0, 0.1)
```

---

## 3. HEADER-BEREICH

### Header-Dimensionen
```css
Höhe: 56px (h-14)
Padding: 16px horizontal (px-4)
Background: #DE851D (Orange - IMMER, auch im Dark Mode)
```

### Header-Inhalt
```typescript
// Linke Seite
<Building2 Icon /> + "Tenant Admin" Text
  - Icon: h-5 w-5, color: #000000
  - Text: font-medium, color: #000000

// Rechte Seite (optional)
<ChevronLeft Icon /> Close-Button
  - Icon: h-4 w-4, color: #000000
  - Hover: backgroundColor: rgba(0, 0, 0, 0.1)
```

---

## 4. NAVIGATION/MENÜ-STRUKTUR

### Hierarchie-Ebenen

#### Ebene 1: Haupt-Navigation Items
```css
Padding: pl-4 pr-4 py-3
Gap: 12px (gap-3)
Font-Size: text-sm
Border-Radius: rounded-lg
```

**Hauptmenü-Items:**
1. **Dashboard** (LayoutDashboard Icon)
2. **Tenant Settings** (Settings Icon)
   - General
   - Compliance (EU AI Act, DSGVO, Responsibilities)
   - Security
3. **User Management** (Users Icon)
   - Users
   - Departments
   - Roles
4. **Modules & Features** (Package Icon)
   - Models
   - Overview
5. **Data Management** (Database Icon)
   - Backups
6. **Prompts & Frameworks** (FileText Icon)
   - Library
   - Frameworks
7. **Logging & Monitoring** (Activity Icon)
   - Activity
   - System
   - Alerts
8. **Support & Docs** (HelpCircle Icon)
   - Documentation
   - FAQ
   - Tickets
   - Tutorials
   - API
   - Contact

#### Ebene 2: Sub-Items (Level 1)
```css
Padding-Left: 48px (pl-12)
Padding-Right: 16px (pr-4)
Padding-Vertical: 8px (py-2)
Font-Size: text-sm
```

#### Ebene 3: Nested Sub-Items (Level 2)
```css
Padding-Left: 64px (pl-16)
Padding-Right: 16px (pr-4)
Padding-Vertical: 8px (py-2)
Font-Size: text-sm
```

---

## 5. INTERACTION STATES

### Haupt-Items (mit Icon)

#### Default State
```css
backgroundColor: transparent
color: var(--color-gray-dark) /* Light Mode */
color: #e5e5e5 /* Dark Mode */
```

#### Hover State
```css
backgroundColor: #E9C796
color: #000000 (Text wird schwarz)
```

#### Active State (wenn ausgewählt)
```css
backgroundColor: #E9C796
color: #000000
```

#### Active State (wenn Submenü offen, aber nicht direkt ausgewählt)
```css
backgroundColor: transparent
color: aktuelle Farbe beibehalten
```

### Sub-Items (ohne Icon)

#### Default State
```css
backgroundColor: transparent
color: var(--color-gray-dark) /* Light Mode */
color: #e5e5e5 /* Dark Mode */
```

#### Hover State
```css
backgroundColor: #E9C796
color: #000000
```

#### Active State
```css
backgroundColor: #E9C796
color: #000000
```

---

## 6. EXPAND/COLLAPSE ICONS

### Position
- **Rechts**: `flex-shrink-0` am Ende des Buttons
- **Größe**: `h-4 w-4`

### Icons
```typescript
// Geschlossen
<ChevronRight className="h-4 w-4" />

// Geöffnet
<ChevronDown className="h-4 w-4" />
```

### Logik
```typescript
// Hat Sub-Items?
const hasSubitems = item.subitems && item.subitems.length > 0;

// Ist expanded?
const expanded = expandedItems.includes(item.id);

// Zeige Icon nur wenn Sub-Items vorhanden
{hasSubitems && (expanded ? <ChevronDown /> : <ChevronRight />)}
```

---

## 7. AUTO-EXPAND LOGIC

### Verhalten
Wenn eine Seite geladen wird (z.B. `tenant-settings.compliance.dsgvo`), werden automatisch alle übergeordneten Menüs geöffnet:

```typescript
useEffect(() => {
  const parts = currentPage.split('.');
  const itemsToExpand: string[] = [];
  
  // Für "tenant-settings.compliance.dsgvo" expandiere:
  // - "tenant-settings"
  // - "tenant-settings.compliance"
  for (let i = 1; i < parts.length; i++) {
    const path = parts.slice(0, i + 1).join('.');
    itemsToExpand.push(path);
  }
  
  setExpandedItems(prev => [...prev, ...itemsToExpand]);
}, [currentPage]);
```

---

## 8. SCROLLING

### Container
```css
className: "flex-1 overflow-y-auto overflow-x-hidden py-2 px-2"
```

### Custom Scrollbar (optional)
```css
/* Breite */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Thumb */
::-webkit-scrollbar-thumb {
  background-color: #e1dfdd;
  border-radius: 4px;
}

/* Thumb Hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #d1cfcd;
}
```

---

## 9. INTEGRATION MIT HEADER

### Header-Button (Toggle)
Der Button im Header öffnet/schließt das Panel:

```typescript
<Button
  variant="ghost"
  size="icon"
  className="h-6 w-6 p-0 rounded-md"
  style={{
    backgroundColor: tenantPanelOpen ? '#E9C796' : 'transparent',
  }}
  onClick={() => setTenantPanelOpen(!tenantPanelOpen)}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = '#E9C796';
  }}
  onMouseLeave={(e) => {
    if (!tenantPanelOpen) {
      e.currentTarget.style.backgroundColor = 'transparent';
    } else {
      e.currentTarget.style.backgroundColor = '#E9C796';
    }
  }}
>
  <Building2 className="h-4 w-4" style={{ color: 'var(--color-gray-dark)' }} />
</Button>
```

### Content-Verschiebung
Wenn das Panel geöffnet ist, verschiebt sich der Hauptinhalt:

```typescript
<main 
  className="flex-1 overflow-hidden flex flex-col transition-all duration-300"
  style={{
    marginLeft: tenantPanelOpen ? '400px' : '0',
  }}
>
  {renderContent()}
</main>
```

---

## 10. ÜBERSETZUNGS-STRUKTUR

### Verwendete i18n-Keys

```typescript
// Header
t.tenantAdmin.sidebar.tenantAdmin

// Haupt-Items
t.tenantAdmin.sidebar.dashboard
t.tenantAdmin.sidebar.tenantSettings
t.tenantAdmin.sidebar.userRoles
t.tenantAdmin.sidebar.modulesFeatures
t.tenantAdmin.sidebar.dataManagement
t.tenantAdmin.sidebar.promptsFrameworks
t.tenantAdmin.sidebar.loggingMonitoring
t.tenantAdmin.sidebar.supportDocs

// Sub-Items nach Parent
t.tenantAdmin.tenantSettingsSub[subitemId]
t.tenantAdmin.userManagementSub[subitemId]
t.tenantAdmin.modulesSub[subitemId]
t.tenantAdmin.dataSub[subitemId]
t.tenantAdmin.promptsSub[subitemId]
t.tenantAdmin.monitoringSub[subitemId]
t.tenantAdmin.supportSub[subitemId]
```

---

## 11. KOMPONENTEN-STRUKTUR

### Datei-Hierarchie
```
/components/
├── TenantAdminLayout.tsx      # Main Layout mit State Management
├── TenantAdminPanel.tsx       # Panel Wrapper mit Animation
└── TenantSidebar.tsx          # Sidebar Navigation & Menü
```

### Props Flow
```typescript
// TenantAdminLayout → TenantAdminPanel
{
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
}

// TenantAdminPanel → TenantSidebar
{
  currentPage: string;
  onNavigate: (pageId: string) => void;
  collapsed?: boolean;
  isDarkMode?: boolean;
  onToggle?: () => void;
}
```

---

## 12. STATE MANAGEMENT

### Wichtige States
```typescript
const [tenantPanelOpen, setTenantPanelOpen] = useState(true);
const [currentPage, setCurrentPage] = useState("dashboard");
const [expandedItems, setExpandedItems] = useState<string[]>([]);
```

### Navigation Handler
```typescript
const handleNavigate = (section: string) => {
  setCurrentPage(section);
  setMobileSidebarOpen(false); // Bei Mobile
};
```

---

## 13. KEYBOARD SHORTCUTS

```typescript
// Panel öffnen/schließen
Ctrl + T

// Panel schließen
Escape (wenn Panel offen)
```

---

## 14. RESPONSIVE BREAKPOINTS

```typescript
// Desktop: >= 1024px (lg)
- Panel: 400px fest, slide-in von links
- Main Content verschiebt sich um 400px

// Mobile: < 1024px
- Panel: Full-width oder 280px
- Overlay mit bg-black/50
- Main Content bleibt fix
- Click Outside schließt Panel
```

---

## 15. CLICK-OUTSIDE-TO-CLOSE

### Implementation
```typescript
// Nicht implementiert im Panel selbst
// Panel hat expliziten Close-Button
// Mobile hat Overlay mit onClick
```

---

## 16. Z-INDEX MANAGEMENT

```css
Header:           z-index: auto
Tenant Panel:     z-index: 40
Mobile Overlay:   z-index: 50
Account Panel:    z-index: variable (managed via panelZIndex state)
```

---

## 17. TYPISCHE ANWENDUNGS-BEISPIELE

### Beispiel 1: Neues Haupt-Item hinzufügen
```typescript
{
  id: "analytics",
  labelKey: "analytics",
  icon: BarChart,
  subitems: [
    { id: "reports", labelKey: "reports" },
    { id: "insights", labelKey: "insights" }
  ]
}
```

### Beispiel 2: Nested Sub-Items (3 Ebenen)
```typescript
{
  id: "parent",
  labelKey: "parent",
  icon: Icon,
  subitems: [
    { 
      id: "child",
      labelKey: "child",
      subitems: [
        { id: "grandchild", labelKey: "grandchild" }
      ]
    }
  ]
}
```

---

## 18. DESIGN-TOKENS ZUSAMMENFASSUNG

```css
/* Farben */
--color-primary:        #DE851D
--color-accent:         #E9C796
--color-border:         #e1dfdd
--color-gray-dark:      (aus globals.css)

/* Dimensionen */
--panel-width:          400px
--header-height:        56px (14 * 4px)
--item-height:          auto (py-3 = 12px top + 12px bottom)
--subitem-height:       auto (py-2 = 8px top + 8px bottom)

/* Abstände */
--item-padding-x:       16px (px-4)
--subitem-indent-1:     48px (pl-12)
--subitem-indent-2:     64px (pl-16)
--icon-gap:             12px (gap-3)

/* Animationen */
--transition-duration:  300ms
--spring-stiffness:     300
--spring-damping:       30
--spring-mass:          0.8
```

---

## 19. WICHTIGE HINWEISE FÜR ÜBERTRAGUNG

1. **Farbsystem beibehalten**: Die Orange-Töne sind charakteristisch
2. **Animation ist wichtig**: Spring-Animation gibt professionellen Look
3. **Auto-Expand**: Verbessert UX erheblich
4. **Hover-States**: Konsistent mit #E9C796
5. **Dark Mode**: Alle Farben müssen Dark-Mode-Varianten haben
6. **Overflow**: Sidebar scrollt, Header bleibt fix
7. **Mobile First**: Denke an Overlay und Touch-Interaktion
8. **Accessibility**: Alle Buttons sollten Keyboard-navigierbar sein
9. **i18n**: Alle Texte über Translation-System
10. **Type-Safety**: TypeScript Interfaces für alle Props

---

## 20. CHECKLISTE FÜR NEUE APP

- [ ] Motion/React Library installiert
- [ ] Farbsystem in globals.css definiert
- [ ] TenantAdminPanel Komponente erstellt
- [ ] TenantSidebar Komponente erstellt
- [ ] State Management für Panel Open/Close
- [ ] State Management für Current Page
- [ ] State Management für Expanded Items
- [ ] Auto-Expand Logic implementiert
- [ ] Header-Toggle-Button erstellt
- [ ] Content-Margin-Animation erstellt
- [ ] Mobile Responsive Breakpoints
- [ ] Dark Mode Support
- [ ] i18n für alle Menü-Items
- [ ] Hover-States getestet
- [ ] Keyboard Shortcuts (optional)
- [ ] Z-Index Hierarchie geprüft
