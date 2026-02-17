# AI Hub - Fortsetzung der Internationalisierung

## Aktueller Stand

Die Internationalisierung wurde erfolgreich für folgende Bereiche erweitert:

### ✅ Vollständig übersetzt (4 Sprachen: DE, EN, FR, PT-BR):

1. **Login & 2FA**
   - Login-Dialog
   - 2FA-Verifizierung
   - Tenant-Auswahl (RMB Group, neuco)

2. **Navigation & Header**
   - Hauptmenü
   - Sidebar
   - Header-Elemente

3. **Account Management**
   - Konto-Einstellungen
   - Profilverwaltung
   - Passwort-Änderung

4. **Tenant Administration - Basis**
   - Dashboard
   - Einstellungen (Allgemein, Sicherheit, Zugriff)
   - Sidebar-Navigation

5. **User Management - Erweitert**
   - Benutzerverwaltung
   - Rollen & Rechte
   - Departments
   - User Edit Panel
   - Tabellen-Header & Filter

6. **Activity Log - Vollständig**
   - Actions (backupCreated, userCreated, loginFailed, etc.)
   - Resources (userManagement, authentication, normenAgent, etc.)
   - UI-Elemente
   - Filter & Export

7. **Chat System**
   - Chat-Interface
   - Chat-History
   - Toast-Nachrichten
   - Zeit-Gruppierungen

8. **Agent Settings**
   - Theme-Einstellungen
   - Sprach-Einstellungen
   - Custom Prompts
   - Response-Konfiguration

9. **Window System**
   - Fenster-Aktionen (minimize, maximize, close)
   - Tooltips

10. **Alerts Management**
    - Alert-Creation
    - Alert-Status
    - Notifications

11. **Data Management**
    - Backups & Restore
    - Backup-Frequenzen
    - Status-Labels

12. **Support & Documentation**
    - FAQ
    - Tickets
    - Kontakt
    - Documentation

13. **Model Management**
    - Modell-Liste
    - Konfiguration
    - Provider

14. **Module Overview**
    - Agent-Verwaltung
    - Capabilities
    - Status

15. **Think Tank**
    - Multi-Perspektiven-Analyse
    - Session-Management

16. **Prompts & Frameworks - Struktur**
    - Kategorien
    - Dialog-Texte
    - UI-Elemente

---

## 🔧 Noch zu ergänzende Übersetzungen

### Phase 1: Dashboard - Erweiterte Elemente

**Datei: `/components/Dashboard.tsx`**

Fehlende Texte:
- Modul-Namen (ChatAgent, DocumentAnalyzer, CalendarAssistant, etc.)
- Stats-Labels

**Erforderliche i18n-Struktur:**
```typescript
dashboardFull: {
  stats: {
    activeModules: string;      // ✅ Vorhanden
    processedToday: string;      // ✅ Vorhanden
  },
  modules: {
    chatAgent: string;
    documentAnalyzer: string;
    calendarAssistant: string;
    dataAnalyst: string;
    securityMonitor: string;
  }
}
```

**Übersetzungen:**

| Key | DE | EN | FR | PT-BR |
|-----|----|----|----| ------|
| chatAgent | Chat Agent | Chat Agent | Agent de Chat | Agente de Chat |
| documentAnalyzer | Dokumenten-Analyse | Document Analyzer | Analyseur de Documents | Analisador de Documentos |
| calendarAssistant | Kalender-Assistent | Calendar Assistant | Assistant Calendrier | Assistente de Calendário |
| dataAnalyst | Daten-Analyst | Data Analyst | Analyste de Données | Analista de Dados |
| securityMonitor | Sicherheits-Monitor | Security Monitor | Moniteur de Sécurité | Monitor de Segurança |

---

### Phase 2: LoginDialog - Logo & Tenants

**Datei: `/components/LoginDialog.tsx`**

Fehlende Texte (Zeilen 151, 198-199, 303):
- "AIHUB Logo" (Alt-Text)
- Tenant-Namen: "RMB Group", "neuco"

**Erforderliche i18n-Struktur:**
```typescript
loginExtended: {
  logoAlt: string;
  tenants: {
    rmbGroup: string;
    neuco: string;
  };
}
```

**Übersetzungen:**

| Key | DE | EN | FR | PT-BR |
|-----|----|----|----| ------|
| logoAlt | AIHUB Logo | AIHUB Logo | Logo AIHUB | Logo AIHUB |
| tenants.rmbGroup | RMB Group | RMB Group | RMB Group | RMB Group |
| tenants.neuco | neuco | neuco | neuco | neuco |

---

### Phase 3: ModelManagement - Provider & Dialoge

**Datei: `/components/ModelManagement.tsx`**

Fehlende Texte (Zeilen 110, 122, 136-141, 741, 775, 952, 1189):
- Provider-Namen
- Dialog-Titel
- Placeholder-Texte

**Erforderliche i18n-Struktur:**
```typescript
modelManagementFull: {
  providers: {
    geminiPro: string;
    googleAI: string;
    azureOpenAI: string;
    awsBedrock: string;
    mistralAI: string;
    cohere: string;
    customEndpoint: string;
  };
  dialog: {
    addNewModel: string;
    editModel: string;
    addModel: string;
    save: string;
    selectModel: string;
  };
}
```

**Übersetzungen:**

| Key | DE | EN | FR | PT-BR |
|-----|----|----|----| ------|
| providers.geminiPro | Gemini Pro | Gemini Pro | Gemini Pro | Gemini Pro |
| providers.googleAI | Google AI | Google AI | Google AI | Google AI |
| providers.azureOpenAI | Azure OpenAI | Azure OpenAI | Azure OpenAI | Azure OpenAI |
| providers.awsBedrock | AWS Bedrock | AWS Bedrock | AWS Bedrock | AWS Bedrock |
| providers.mistralAI | Mistral AI | Mistral AI | Mistral AI | Mistral AI |
| providers.cohere | Cohere | Cohere | Cohere | Cohere |
| providers.customEndpoint | Custom Endpoint | Custom Endpoint | Point de Terminaison Personnalisé | Endpoint Personalizado |
| dialog.addNewModel | Neues Modell hinzufügen | Add New Model | Ajouter un Nouveau Modèle | Adicionar Novo Modelo |
| dialog.editModel | Modell bearbeiten | Edit Model | Modifier le Modèle | Editar Modelo |
| dialog.addModel | Modell hinzufügen | Add Model | Ajouter le Modèle | Adicionar Modelo |
| dialog.save | Speichern | Save | Enregistrer | Salvar |
| dialog.selectModel | Modell wählen | Select Model | Sélectionner un Modèle | Selecionar Modelo |

---

### Phase 4: ModuleOverview - Erweiterte Felder

**Datei: `/components/ModuleOverview.tsx`**

Fehlende Texte (Zeilen 102-103, 124, 140, 156, 170, 641, 660, 741, 775, 846):
- "Nicht konfiguriert"
- "Modell wählen"
- "Orchestrator Flussdiagramm" (Alt-Text)
- Agent-Namen: Jelmoli Agent, Email Agent, Internet Agent, Normen Agent
- Model-Namen: Gemini Pro, Azure GPT-4

**Erforderliche i18n-Struktur:**
```typescript
moduleOverviewFull: {
  notConfigured: string;
  selectModel: string;
  orchestratorDiagram: string;
  agents: {
    jelmoliAgent: string;
    emailAgent: string;
    internetAgent: string;
    normenAgent: string;
  };
  models: {
    geminiPro: string;
    azureGPT4: string;
  };
}
```

**Übersetzungen:**

| Key | DE | EN | FR | PT-BR |
|-----|----|----|----| ------|
| notConfigured | Nicht konfiguriert | Not configured | Non configuré | Não configurado |
| selectModel | Modell wählen | Select model | Sélectionner un modèle | Selecionar modelo |
| orchestratorDiagram | Orchestrator Flussdiagramm | Orchestrator Flowchart | Diagramme d'Orchestrateur | Fluxograma do Orquestrador |
| agents.jelmoliAgent | Jelmoli Agent | Jelmoli Agent | Agent Jelmoli | Agente Jelmoli |
| agents.emailAgent | Email Agent | Email Agent | Agent Email | Agente de Email |
| agents.internetAgent | Internet Agent | Internet Agent | Agent Internet | Agente de Internet |
| agents.normenAgent | Normen Agent | Standards Agent | Agent de Normes | Agente de Normas |
| models.geminiPro | Gemini Pro | Gemini Pro | Gemini Pro | Gemini Pro |
| models.azureGPT4 | Azure GPT-4 | Azure GPT-4 | Azure GPT-4 | Azure GPT-4 |

---

### Phase 5: OrchestratorPanel - Model Selection

**Datei: `/components/OrchestratorPanel.tsx`**

Fehlende Texte (Zeile 107):
- "Modell auswählen" (Placeholder)

**Erforderliche i18n-Struktur:**
```typescript
orchestratorExtended: {
  selectModel: string;
}
```

**Übersetzungen:**

| Key | DE | EN | FR | PT-BR |
|-----|----|----|----| ------|
| selectModel | Modell auswählen | Select model | Sélectionner un modèle | Selecionar modelo |

---

### Phase 6: AlertsManagement - Sample Data

**Datei: `/components/AlertsManagement.tsx`**

Fehlende Texte (Zeilen 128, 137, 148, 184-185):
- Sample Alert-Titel
- Sample Alert-Nachrichten

**Erforderliche i18n-Struktur:**
```typescript
alertsSampleData: {
  serviceOffline: string;
  backupFailed: string;
  unusualTraffic: string;
  backupFailedMessage: string;
}
```

**Übersetzungen:**

| Key | DE | EN | FR | PT-BR |
|-----|----|----|----| ------|
| serviceOffline | Service Offline | Service Offline | Service Hors Ligne | Serviço Offline |
| backupFailed | Backup Fehlgeschlagen | Backup Failed | Échec de la Sauvegarde | Falha no Backup |
| unusualTraffic | Ungewöhnlicher Traffic | Unusual Traffic | Trafic Inhabituel | Tráfego Incomum |
| backupFailedMessage | Das geplante Backup um 03:00 Uhr ist fehlgeschlagen. Fehlercode: DB_TIMEOUT | Scheduled backup at 03:00 AM failed. Error code: DB_TIMEOUT | La sauvegarde programmée à 03h00 a échoué. Code d'erreur: DB_TIMEOUT | O backup programado às 03:00 falhou. Código de erro: DB_TIMEOUT |

---

### Phase 7: AccountSettings - Display Name Placeholder

**Datei: `/components/AccountSettings.tsx`**

Fehlende Texte (Zeile 211):
- "Ihr Anzeigename" (Placeholder)

**Erforderliche i18n-Struktur:**
```typescript
accountExtended: {
  displayNamePlaceholder: string;
}
```

**Übersetzungen:**

| Key | DE | EN | FR | PT-BR |
|-----|----|----|----| ------|
| displayNamePlaceholder | Ihr Anzeigename | Your display name | Votre nom d'affichage | Seu nome de exibição |

---

### Phase 8: DataManagement - Extended Backup Labels

**Datei: `/components/DataManagement.tsx`**

Fehlende Texte (Zeilen 98, 118, 277-278):
- "Scheduled Backup"
- "Manual Backup"
- "Alle Datenbanken"

**Erforderliche i18n-Struktur:**
```typescript
dataManagementExtended: {
  backups: {
    scheduledBackup: string;
    manualBackup: string;
    allDatabases: string;
  };
}
```

**Übersetzungen:**

| Key | DE | EN | FR | PT-BR |
|-----|----|----|----| ------|
| scheduledBackup | Geplantes Backup | Scheduled Backup | Sauvegarde Programmée | Backup Programado |
| manualBackup | Manuelles Backup | Manual Backup | Sauvegarde Manuelle | Backup Manual |
| allDatabases | Alle Datenbanken | All Databases | Toutes les Bases de Données | Todos os Bancos de Dados |

---

### Phase 9: ChatHistory - Sample Chat Titles

**Datei: `/components/ChatHistory.tsx`**

Fehlende Texte (Zeilen 206-207):
- "Produktanfrage Jelmoli"
- "Verfügbarkeit von Produkten..."

**Erforderliche i18n-Struktur:**
```typescript
chatSampleData: {
  productInquiryJelmoli: string;
  productAvailability: string;
}
```

**Übersetzungen:**

| Key | DE | EN | FR | PT-BR |
|-----|----|----|----| ------|
| productInquiryJelmoli | Produktanfrage Jelmoli | Product Inquiry Jelmoli | Demande de Produit Jelmoli | Consulta de Produto Jelmoli |
| productAvailability | Verfügbarkeit von Produkten | Product Availability | Disponibilité des Produits | Disponibilidade de Produtos |

---

### Phase 10: RoleEditPanel - Permissions

**Datei: `/components/RoleEditPanel.tsx`**

Fehlende Texte (Zeilen 43-51):
- Permission-Labels

**Erforderliche i18n-Struktur:**
```typescript
roleManagementPermissions: {
  read: string;
  write: string;
  delete: string;
  manageUsers: string;
  manageSettings: string;
  manageRoles: string;
  viewReports: string;
  exportData: string;
  importData: string;
}
```

**Übersetzungen:**

| Key | DE | EN | FR | PT-BR |
|-----|----|----|----| ------|
| read | Lesen | Read | Lire | Ler |
| write | Schreiben | Write | Écrire | Escrever |
| delete | Löschen | Delete | Supprimer | Excluir |
| manageUsers | Benutzer verwalten | Manage Users | Gérer les Utilisateurs | Gerenciar Usuários |
| manageSettings | Einstellungen verwalten | Manage Settings | Gérer les Paramètres | Gerenciar Configurações |
| manageRoles | Rollen verwalten | Manage Roles | Gérer les Rôles | Gerenciar Funções |
| viewReports | Berichte ansehen | View Reports | Voir les Rapports | Ver Relatórios |
| exportData | Daten exportieren | Export Data | Exporter les Données | Exportar Dados |
| importData | Daten importieren | Import Data | Importer les Données | Importar Dados |

---

## 📊 GRÖẞTE VERBLEIBENDE AUFGABE: Prompts & Frameworks

**Datei: `/components/PromptsFrameworks.tsx`**

Diese Komponente enthält ca. **200+ hardcodierte Texte**:

### Kategorien:
- ✅ Kategorie-Namen (bereits übersetzt in i18n-extensions.ts)

### Noch zu übersetzen:
1. **30+ Prompt-Titel** (Zeilen 174-522)
   - "Virtueller Assistent"
   - "Der Strategieberater"
   - "Kundenfokus schärfen"
   - "Leiter Talentakquise"
   - "Innovationsstau lösen"
   - etc.

2. **30+ Prompt-Beschreibungen**

3. **10+ Framework-Titel** (Zeilen 531-671)
   - "Mission Frameworks"
   - "Thinking Frameworks"
   - "Expression Frameworks"
   - "Interaction Frameworks"
   - etc.

4. **10+ Framework-Beschreibungen**

5. **100+ Tags**
   - "Best Practice"
   - "Benchmarking"
   - "Strategie"
   - "Emotionale Intelligenz"
   - "Storytelling"
   - "Prompt Engineering"
   - etc.

6. **Dialog-Texte**
   - Delete-Confirmation-Message

**Empfehlung:** Für Prompts & Frameworks sollte eine separate Daten-Datei erstellt werden:
- `/data/prompts-i18n.ts` - für alle Prompt-Übersetzungen
- `/data/frameworks-i18n.ts` - für alle Framework-Übersetzungen

Dies würde die Wartbarkeit erheblich verbessern und die i18n.ts Datei überschaubar halten.

---

## 🎯 Empfohlenes Vorgehen

### Kurzfristig (Nächste Schritte):

1. **Interface-Definitionen in i18n.ts ergänzen** ✅
   - loginExtended
   - dashboardFull
   - modelManagementFull
   - moduleOverviewFull
   - orchestratorExtended
   - alertsSampleData
   - dataManagementExtended
   - chatSampleData
   - roleManagementPermissions

2. **Übersetzungen für alle 4 Sprachen hinzufügen** ✅
   - Deutsch (de)
   - Englisch (en)
   - Französisch (fr)
   - Brasilianisches Portugiesisch (pt-br)

3. **Komponenten aktualisieren**
   - Dashboard.tsx
   - LoginDialog.tsx
   - ModelManagement.tsx
   - ModuleOverview.tsx
   - OrchestratorPanel.tsx
   - AlertsManagement.tsx
   - AccountSettings.tsx
   - DataManagement.tsx
   - ChatHistory.tsx
   - RoleEditPanel.tsx

### Mittelfristig:

4. **Prompts & Frameworks - Datenstruktur erstellen**
   - Separate Daten-Dateien für bessere Wartbarkeit
   - Strukturierte Übersetzungen für alle Prompts
   - Strukturierte Übersetzungen für alle Frameworks
   - Tag-System internationalisieren

5. **Verbleibende Komponenten**
   - SystemMonitoring.tsx
   - TenantDashboard.tsx
   - TenantSettings.tsx
   - ThinkTank.tsx (bereits weitgehend übersetzt)
   - SupportDocumentation.tsx

6. **Qualitätssicherung**
   - Alle Komponenten auf fehlende Übersetzungen prüfen
   - Konsistenz der Übersetzungen sicherstellen
   - Style-Guide für Übersetzungen erstellen

---

## 📝 Notizen

- Die Struktur in i18n.ts und i18n-extensions.ts ist bereits sehr gut
- Es existiert ein umfassendes Übersetzungssystem für 4 Sprachen
- Die meisten Basis-Komponenten sind bereits übersetzt
- Hauptaufgabe: PromptsFrameworks.tsx mit 200+ Strings
- Alle Übersetzungen sollten professionell und kontextgerecht sein
- Marken-Namen (RMB Group, neuco, Jelmoli, Gemini Pro, etc.) bleiben unverändert

---

## ✅ Abschluss Phase 1-7

Nach Implementierung der Phasen 1-7 sind alle grundlegenden UI-Elemente vollständig internationalisiert. Die App ist dann für alle 4 Sprachen (DE, EN, FR, PT-BR) voll funktionsfähig.

**Geschätzter Aufwand:**
- Phasen 1-7: ~2-3 Stunden
- Prompts & Frameworks (Phase 8): ~8-10 Stunden
- Verbleibende Komponenten: ~2-3 Stunden
- QS & Testing: ~2 Stunden

**Gesamt: ~15-20 Stunden**
