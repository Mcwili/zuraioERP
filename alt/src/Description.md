# AI Hub - Windows-ähnliche Web-Anwendung für AI-Orchestrierung

## Projektübersicht

**AI Hub** ist eine moderne Browser-Anwendung mit authentischem Windows 11-ähnlichem Design, die als zentrale Plattform zur Orchestrierung verschiedener AI-Module und Agents dient. Das System wurde vollständig als Web-Anwendung entwickelt und bietet eine intuitive, benutzerfreundliche Oberfläche für die Verwaltung und Interaktion mit verschiedenen AI-Services.

## Kernkonzept

Die Anwendung fungiert als **zentraler Orchestrator** für AI-Module, wobei verschiedene spezialisierte Agents je nach Benutzerrolle und Tenant-Zugehörigkeit verfügbar sind. Das System kombiniert moderne Web-Technologien mit einem vertrauten Windows-Desktop-Erlebnis direkt im Browser.

## Systemarchitektur

### Frontend-Technologien
- **React** (mit TypeScript) - Haupt-Frontend-Framework
- **Tailwind CSS v4.0** - Styling und Design-System
- **ShadCN/UI** - UI-Komponenten-Bibliothek
- **Lucide React** - Icon-System
- **Motion/React** - Animationen und Transitionen

### Design-Philosophie
- **Windows 11 Design Language** - Authentic Microsoft Fluent Design
- **Mica-Effekte** - Glasmorphismus und Transparenz
- **Responsive Design** - Optimiert für Desktop und Mobile
- **Barrierefreiheit** - WCAG-konforme Implementierung
- **Dark/Light Mode** - Vollständige Theme-Unterstützung

## Multi-Tenant-System

### Verfügbare Tenants
1. **MCWili** - MCWili Hauptsystem
2. **RMB Group** - RMB Group Corporate
3. **Polley Consulting** - Polley Consulting Beratung
4. **Tenant Admin** - System Administration (Sonderrolle)

### Tenant-Administration
- **Dynamische Logo-Anzeige** - Tenant-spezifische Branding
- **Isolierte Umgebungen** - Getrennte Daten und Konfigurationen
- **Aktivierungs-/Deaktivierungsfunktionen** - Flexibles Tenant-Management
- **Admin-Dashboard** - Zentrale Verwaltungsebene für System-Administratoren

## AI-Agent-System

### Agent-Kategorien

#### Öffentliche Agents (Allen Benutzern verfügbar)
- **Normen-Agent** - Compliance und Regulierungsberatung
- **Internet-Agent** - Web-basierte Recherche und Informationsbeschaffung
- **Jelmoli-Agent** - Spezialisierter Service-Agent

#### Private Agents (Rollenbasiert)
- **Email-Agent** - Intelligente E-Mail-Verarbeitung und -Management

### Agent-Funktionalitäten
- **Kontextuelle Gespräche** - Persistente Chat-Verläufe
- **Rollenbasierte Zugriffskontrolle** - Granulare Berechtigungen
- **Modulare Erweiterbarkeit** - Einfache Integration neuer Agents

## Windows-ähnliches Fenstersystem

### Fenster-Management
- **Native Fenster-Metapher** - Minimieren, Maximieren, Schließen
- **Drag & Drop** - Vollständig verschiebbare Fenster
- **Multi-Window-Support** - Mehrere Chat-Fenster gleichzeitig
- **Singleton-Pattern** - Optionsfenster nur einmal öffnebar
- **Taskbar-Integration** - Windows-ähnliche Taskleiste mit aktiven Anwendungen

### Fenster-Typen
- **Chat-Fenster** - Interaktive AI-Agent-Gespräche (mehrfach öffnebar)
- **Optionen-Fenster** - System- und Benutzereinstellungen (Singleton)
- **Dashboard-Fenster** - Übersichts- und Verwaltungsbereich
- **Modale Dialoge** - Wichtige Systeminteraktionen

## Benutzer- und Rollenverwaltung

### Authentifizierung
- **Multi-Tenant-Login** - Tenant-spezifische Anmeldung
- **Rollenbasierte Autorisierung** - Admin/User-Unterscheidung
- **Layout-Präferenzen** - Desktop/Mobile-Auswahl beim Login
- **Persistente Sessions** - LocalStorage-basierte Präferenzen

### Benutzerrollen
- **Admin** - Vollzugriff auf alle Module und Tenant-Verwaltung
- **User** - Eingeschränkter Zugriff basierend auf Tenant-Konfiguration
- **Tenant Admin** - Spezielle Verwaltungsrolle für System-Administration

## User Experience (UX)

### Design-Prinzipien
- **Intuitive Navigation** - Vertraute Windows-Metaphern
- **Konsistente Interaktionen** - Einheitliche Bedienelemente
- **Responsive Anpassung** - Optimiert für verschiedene Bildschirmgrößen
- **Accessibility First** - Tastaturnavigation und Screen Reader Support

### Layout-Optionen
- **Desktop-Layout** - Vollständiges Windows-ähnliches Erlebnis
- **Mobile-Layout** - Touch-optimierte Benutzeroberfläche
- **Adaptive Umschaltung** - Dynamische Layout-Anpassung

## Technische Implementierung

### Komponenten-Architektur
```
/components
├── Layout-Komponenten (DesktopLayout, MobileLayout)
├── Fenster-System (WindowManager, DraggableWindow)
├── UI-Komponenten (ShadCN/UI Integration)
├── Agent-Interface (ChatInterface, AgentSettings)
├── System-Verwaltung (TenantManagement, UserSettings)
└── Authentifizierung (LoginDialog)
```

### State Management
- **React Context** - Globale Zustände (Language, Theme)
- **Local State** - Komponenten-spezifische Daten
- **LocalStorage** - Persistente Benutzereinstellungen
- **Session Storage** - Temporäre Anwendungsdaten

### Styling-System
- **CSS Custom Properties** - Theme-Variablen
- **Tailwind Utilities** - Atomic CSS-Klassen
- **Windows 11 Tokens** - Authentic Microsoft Design Tokens
- **Dark/Light Themes** - Vollständige Farbpaletten

## Internationalisierung

### Sprach-Support
- **Deutsch** - Primärsprache
- **Englisch** - Internationale Unterstützung
- **Erweiterbare Struktur** - Einfache Addition neuer Sprachen

### Lokalisierung
- **Context-basierte Übersetzungen** - React Context Pattern
- **Dynamische Sprachwechsel** - Runtime-Umschaltung
- **Kulturelle Anpassungen** - Datum, Zeit, Formatierungen

## Sicherheit und Compliance

### Datenschutz
- **Lokale Datenverarbeitung** - Minimierte externe Abhängigkeiten
- **Tenant-Isolation** - Strikte Datenabgrenzung
- **DSGVO-Konformität** - Europäische Datenschutzstandards

### Zugriffskontrolle
- **Rollenbasierte Berechtigungen** - Granulare Zugriffssteuerung
- **Tenant-spezifische Isolation** - Getrennte Datenräume
- **Session-Management** - Sichere Authentifizierung

## Entwicklungshistorie

### Evolution des Designs
1. **Ursprüngliche Konzeption** - Windows Desktop-Anwendung
2. **Web-Migration** - Vollständige Browser-basierte Umsetzung
3. **Responsive Optimierung** - Mobile und Desktop Support
4. **Tenant-System-Integration** - Multi-Mandantenfähigkeit
5. **Windows 11 Modernisierung** - Aktuelle Microsoft Design Language

### Aktuelle Version: v2.1.0
- **Vollständiges Fenster-System** - Native Windows-Erfahrung
- **Tenant-Management** - Umfassendes Multi-Mandanten-System
- **Robuste Authentifizierung** - Erweiterte Login-Validierung
- **Dark Mode Support** - Vollständige Theme-Unterstützung
- **Mobile Optimierung** - Touch-freundliche Benutzeroberfläche

## Zukünftige Entwicklung

### Geplante Features
- **Erweiterte AI-Integration** - Zusätzliche Agent-Typen
- **Real-time Collaboration** - Mehrbenutzer-Interaktionen
- **Advanced Analytics** - Nutzungsstatistiken und Insights
- **Plugin-System** - Erweiterbare Agent-Architektur
- **Cloud-Integration** - Backend-Services für Skalierung

### Technische Roadmap
- **Performance-Optimierung** - Code-Splitting und Lazy Loading
- **Erweiterte PWA-Features** - Offline-Fähigkeiten
- **Microservices-Architektur** - Skalierbare Backend-Services
- **Advanced Security** - Erweiterte Authentifizierungsmethoden

## Entwickler-Information

### Projekt-Details
- **Entwickler**: Michael Wili
- **Organisation**: .RMB Group
- **Lizenz**: Alle Rechte vorbehalten
- **Entwicklungsstart**: 2024
- **Aktuelle Version**: v2.1.0 (2025)

### Technische Anforderungen
- **Node.js** - Entwicklungsumgebung
- **Modern Browser** - Chrome, Firefox, Safari, Edge
- **Responsive Design** - Mobile und Desktop Support
- **TypeScript** - Typsichere Entwicklung

---

*Dieses Dokument beschreibt den aktuellen Stand der AI Hub Anwendung und wird kontinuierlich mit neuen Features und Verbesserungen aktualisiert.*