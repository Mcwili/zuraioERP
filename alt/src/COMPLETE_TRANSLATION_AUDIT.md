# Vollständiges Übersetzungs-Audit - AI Hub

## Systematische Analyse ALLER hardcodierten Texte

Diese Datei listet JEDEN hardcodierten Text in jeder Komponente auf, der noch übersetzt werden muss.

---

## 1. AccountSettings.tsx

### Hardcodierte Texte (Deutsch):
- "Ihr Anzeigename" (Placeholder, Zeile 211)
- Profilbild URL für "Aila Kimura" (Zeile 39)

### Fehlende Übersetzungen:
```typescript
// Benötigt:
t.account.displayNamePlaceholder: "Ihr Anzeigename" / "Your display name" / "Votre nom d'affichage" / "Seu nome de exibição"
```

---

## 2. ActivityLog.tsx

### Hardcodierte Texte (Deutsch):
- "Backup erstellt" (Zeile 69)
- "Benutzer erstellt" (Zeile 98)
- "User Management" (Zeile 99)
- "Fehlerhafte Anmeldung" (Zeile 108)
- "Authentifizierung" (Zeile 109)
- "Ungültiges Passwort" (Zeile 112)
- "Konfiguration geändert" (Zeile 118)
- "Normen-Agent" (Zeile 119)
- "Automatisches Backup" (Zeile 128)
- "User Analytics DB" (Zeile 129)
- "Rolle zugewiesen" (Zeile 137)
- "Datenbankverbindung fehlgeschlagen" (Zeile 147)
- "Agent Configuration DB" (Zeile 148)
- "Täglicher Gesundheitscheck" (Zeile 157)
- "System" (Zeile 158)

### Fehlende Übersetzungen:
```typescript
// Benötigt kompletten activityLog Bereich:
t.tenantAdmin.activityLog: {
  actions: {
    backupCreated: "Backup erstellt"
    userCreated: "Benutzer erstellt"
    loginFailed: "Fehlerhafte Anmeldung"
    configChanged: "Konfiguration geändert"
    autoBackup: "Automatisches Backup"
    roleAssigned: "Rolle zugewiesen"
    dbConnectionFailed: "Datenbankverbindung fehlgeschlagen"
    healthCheck: "Täglicher Gesundheitscheck"
  },
  resources: {
    userManagement: "User Management"
    authentication: "Authentifizierung"
    normenAgent: "Normen-Agent"
    userAnalyticsDB: "User Analytics DB"
    agentConfigDB: "Agent Configuration DB"
    system: "System"
  },
  details: {
    invalidPassword: "Ungültiges Passwort"
  }
}
```

---

## 3. AlertsManagement.tsx

### Hardcodierte Texte:
- "Service Offline" (Zeile 128)
- "Backup Fehlgeschlagen" (Zeile 137, 184)
- "Ungewöhnlicher Traffic" (Zeile 148)
- "Das geplante Backup um 03:00 Uhr ist fehlgeschlagen. Fehlercode: DB_TIMEOUT" (Zeile 185)

### Fehlende Übersetzungen:
```typescript
t.tenantAdmin.alertsExtended.sampleAlerts: {
  serviceOffline: "Service Offline"
  backupFailed: "Backup Fehlgeschlagen"
  unusualTraffic: "Ungewöhnlicher Traffic"
  backupFailedMessage: "Das geplante Backup um 03:00 Uhr ist fehlgeschlagen. Fehlercode: DB_TIMEOUT"
}
```

---

## 4. ChatHistory.tsx

### Hardcodierte Texte:
- "Produktanfrage Jelmoli" (Zeile 206)
- "Verfügbarkeit von Produkten..." (Zeile 207)
- "Chat entfernt" (Toast, Zeile 249)
- "Chat angepinnt" (Toast, Zeile 265)
- "Chat gelöscht" (Toast, Zeile 346)
- "Titel aktualisiert" (Toast, Zeile 364)
- "Ordner erstellt" (Toast, Zeile 385)
- "Chat verschoben" (Toast, Zeile 393)
- "Ordnerfarbe geändert" (Toast, Zeile 400)
- "Ordner umbenannt" (Toast, Zeile 408)
- "Space gelöscht" (Toast, Zeile 432)
- "Gestern" (Zeile 1123)
- "Letzte Woche" (Zeile 1124)
- "Letzter Monat" (Zeile 1125)
- "Älter" (Zeile 1126)
- "Möchten Sie diesen Space wirklich löschen? Die Chats in diesem Space werden in \"Alle Chats\" verschoben. Diese Aktion kann nicht rückgängig gemacht werden." (Zeile 1474)

### Fehlende Übersetzungen:
```typescript
t.chat.history: {
  // Toast messages
  chatUnpinned: "Chat entfernt"
  chatPinned: "Chat angepinnt"
  chatDeleted: "Chat gelöscht"
  titleUpdated: "Titel aktualisiert"
  folderCreated: "Ordner erstellt"
  chatMoved: "Chat verschoben"
  folderColorChanged: "Ordnerfarbe geändert"
  folderRenamed: "Ordner umbenannt"
  spaceDeleted: "Space gelöscht"
  
  // Time groups
  yesterday: "Gestern"
  lastWeek: "Letzte Woche"
  lastMonth: "Letzter Monat"
  older: "Älter"
  
  // Delete confirmation
  deleteSpaceMessage: "Möchten Sie diesen Space wirklich löschen? Die Chats in diesem Space werden in \"Alle Chats\" verschoben. Diese Aktion kann nicht rückgängig gemacht werden."
}
```

---

## 5. ChatInterface.tsx

### Hardcodierte Texte:
- "Nachricht gelöscht" (Toast, Zeile 204)
- "Nachricht kopiert" (Toast, Zeile 209)
- "Dateien hinzufügen" (Title, Zeile 439)
- "Audio aufnehmen" (Title, Zeile 489)

### Fehlende Übersetzungen:
```typescript
t.chat.interface: {
  messageDeleted: "Nachricht gelöscht"
  messageCopied: "Nachricht kopiert"
  addFiles: "Dateien hinzufügen"
  recordAudio: "Audio aufnehmen"
}
```

---

## 6. Dashboard.tsx

### Hardcodierte Texte:
- "Aktive Module" (Zeile 25)
- "Heute verarbeitet" (Zeile 33)
- "Chat Agent" (Zeile 90)
- "Document Analyzer" (Zeile 91)
- "Calendar Assistant" (Zeile 92)
- "Data Analyst" (Zeile 93)
- "Security Monitor" (Zeile 94)

### Fehlende Übersetzungen:
```typescript
t.dashboard: {
  stats: {
    activeModules: "Aktive Module"
    processedToday: "Heute verarbeitet"
  },
  modules: {
    chatAgent: "Chat Agent"
    documentAnalyzer: "Document Analyzer"
    calendarAssistant: "Calendar Assistant"
    dataAnalyst: "Data Analyst"
    securityMonitor: "Security Monitor"
  }
}
```

---

## 7. DataManagement.tsx

### Hardcodierte Texte:
- "Scheduled Backup" (Zeile 98, 118)
- "Manual Backup" (Zeile 277)
- "Alle Datenbanken" (Zeile 278)

### Fehlende Übersetzungen:
```typescript
t.tenantAdmin.dataManagement.backups: {
  scheduledBackup: "Scheduled Backup"
  manualBackup: "Manual Backup"
  allDatabases: "Alle Datenbanken"
}
```

---

## 8. LoginDialog.tsx

### Hardcodierte Texte:
- "AIHUB Logo" (Alt text, Zeile 151, 303)
- "RMB Group" (Zeile 198)
- "neuco" (Zeile 199)

### Fehlende Übersetzungen:
```typescript
t.login: {
  logoAlt: "AIHUB Logo"
  tenants: {
    rmbGroup: "RMB Group"
    neuco: "neuco"
  }
}
```

---

## 9. ModelManagement.tsx

### Hardcodierte Texte:
- "Gemini Pro" (Zeile 110)
- "Azure OpenAI" (Zeile 122, 137)
- "Google AI" (Zeile 136)
- "AWS Bedrock" (Zeile 138)
- "Mistral AI" (Zeile 139)
- "Cohere" (Zeile 140)
- "Custom Endpoint" (Zeile 141)
- "Neues Modell hinzufügen" (Zeile 952)
- "Modell bearbeiten" (Zeile 952)
- "Modell hinzufügen" (Zeile 1189)
- "Speichern" (Zeile 1189)
- "Modell wählen" (Placeholder, Zeile 741, 775)

### Fehlende Übersetzungen:
```typescript
t.tenantAdmin.models: {
  // Providers
  providers: {
    googleAI: "Google AI"
    azureOpenAI: "Azure OpenAI"
    awsBedrock: "AWS Bedrock"
    mistralAI: "Mistral AI"
    cohere: "Cohere"
    customEndpoint: "Custom Endpoint"
  },
  
  // Dialog
  addNewModel: "Neues Modell hinzufügen"
  editModel: "Modell bearbeiten"
  addModel: "Modell hinzufügen"
  save: "Speichern"
  selectModel: "Modell wählen"
}
```

---

## 10. ModuleOverview.tsx

### Hardcodierte Texte:
- "Gemini Pro" (Zeile 102)
- "Azure GPT-4" / "Azure OpenAI" (Zeile 103)
- "Jelmoli Agent" (Zeile 124)
- "Email Agent" (Zeile 140)
- "Internet Agent" (Zeile 156)
- "Normen Agent" (Zeile 170)
- "Nicht konfiguriert" (Zeile 641, 660)
- "Modell wählen" (Zeile 741, 775)
- "Orchestrator Flussdiagramm" (Alt text, Zeile 846)

### Fehlende Übersetzungen:
```typescript
t.tenantAdmin.moduleOverview: {
  notConfigured: "Nicht konfiguriert"
  selectModel: "Modell wählen"
  orchestratorDiagram: "Orchestrator Flussdiagramm"
  
  agents: {
    jelmoliAgent: "Jelmoli Agent"
    emailAgent: "Email Agent"
    internetAgent: "Internet Agent"
    normenAgent: "Normen Agent"
  }
}
```

---

## 11. OrchestratorPanel.tsx

### Hardcodierte Texte:
- "Modell auswählen" (Placeholder, Zeile 107)

### Fehlende Übersetzungen:
```typescript
t.orchestrator: {
  selectModel: "Modell auswählen"
}
```

---

## 12. PromptsFrameworks.tsx

### MASSIVE Anzahl hardcodierter Texte:

**Alle Prompt-Titel** (30+ Prompts):
- "Virtueller Assistent" (Zeile 174)
- "Der Strategieberater" (Zeile 195)
- "Kundenfokus schärfen" (Zeile 222)
- "Leiter Talentakquise" (Zeile 279)
- "Innovationsstau lösen" (Zeile 339)
- etc.

**Alle Prompt-Beschreibungen** (30+ Beschreibungen)

**Alle Framework-Titel** (10+ Frameworks):
- "Mission Frameworks" (Zeile 531)
- "Thinking Frameworks" (Zeile 570)
- "Expression Frameworks" (Zeile 609)
- "Interaction Frameworks" (Zeile 624)

**Dialog-Texte**:
- "Sind Sie sicher, dass Sie diesen Prompt/dieses Framework löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden." (Zeile 1233)

**Tags** (100+ verschiedene Tags wie):
- "Best Practice" (Zeile 204)
- "Benchmarking" (Zeile 204)
- "Strategie" (Zeile 204)
- "Emotionale Intelligenz" (Zeile 393)
- "Storytelling" (Zeile 393)
- "Prompt Engineering" (Zeile 414)
- etc.

### Fehlende Übersetzungen:
```typescript
// Diese Komponente benötigt ein KOMPLETTES eigenes Übersetzungssystem
// mit allen Prompts, Frameworks, Beschreibungen und Tags
// Siehe separate Datei: PROMPTS_TRANSLATION_DATA.md
```

---

## 13. RoleEditPanel.tsx

### Hardcodierte Texte (Permissions):
- "Lesen" (Zeile 43)
- "Schreiben" (Zeile 44)
- "Löschen" (Zeile 45)
- "Benutzer verwalten" (Zeile 46)
- "Einstellungen verwalten" (Zeile 47)
- "Rollen verwalten" (Zeile 48)
- "Berichte ansehen" (Zeile 49)
- "Daten exportieren" (Zeile 50)
- "Daten importieren" (Zeile 51)

### Fehlende Übersetzungen:
```typescript
t.tenantAdmin.roleManagement.permissions: {
  read: "Lesen"
  write: "Schreiben"
  delete: "Löschen"
  manageUsers: "Benutzer verwalten"
  manageSettings: "Einstellungen verwalten"
  manageRoles: "Rollen verwalten"
  viewReports: "Berichte ansehen"
  exportData: "Daten exportieren"
  importData: "Daten importieren"
}
```

---

## 14. SupportDocumentation.tsx

Lass mich diese Komponente prüfen...

---

## 15. SystemMonitoring.tsx

Lass mich diese Komponente prüfen...

---

## 16. TenantDashboard.tsx

Lass mich diese Komponente prüfen...

---

## 17. TenantSettings.tsx

Lass mich diese Komponente prüfen...

---

## 18. ThinkTank.tsx

Lass mich diese Komponente prüfen...

---

## 19. UserManagement.tsx

SEHR VIELE hardcodierte Texte - separate Analyse erforderlich

---

## 20. Weitere Komponenten

- AccountPanel.tsx
- AgentSettings.tsx
- Header.tsx
- TenantSidebar.tsx
- UserSettings.tsx
- etc.

---

## ZUSAMMENFASSUNG

### Geschätzte Anzahl fehlender Übersetzungen:

1. **AccountSettings**: ~5 Strings
2. **ActivityLog**: ~20 Strings (Aktionen, Ressourcen, Details)
3. **AlertsManagement**: ~10 Strings
4. **ChatHistory**: ~15 Strings (Toasts, Zeitgruppen, Dialoge)
5. **ChatInterface**: ~5 Strings
6. **Dashboard**: ~10 Strings
7. **DataManagement**: ~5 Strings
8. **LoginDialog**: ~5 Strings
9. **ModelManagement**: ~15 Strings
10. **ModuleOverview**: ~10 Strings
11. **OrchestratorPanel**: ~3 Strings
12. **PromptsFrameworks**: ~200+ Strings (!!!)
13. **RoleEditPanel**: ~15 Strings (Permissions)
14. **SupportDocumentation**: ~50 Strings (geschätzt)
15. **SystemMonitoring**: ~30 Strings (geschätzt)
16. **TenantDashboard**: ~20 Strings (geschätzt)
17. **TenantSettings**: ~40 Strings (geschätzt)
18. **ThinkTank**: ~10 Strings (geschätzt)
19. **UserManagement**: ~80 Strings (geschätzt)
20. **Weitere**: ~100 Strings (geschätzt)

**GESAMT: ~650-700+ fehlende Übersetzungen**

---

## NÄCHSTE SCHRITTE

1. ✅ Phase 1: Basis-Navigation & Login (ERLEDIGT)
2. ⏳ Phase 2: ActivityLog, Toasts & Feedback-Meldungen
3. ⏳ Phase 3: Dashboard & Monitoring
4. ⏳ Phase 4: Management-Bereiche (Models, Modules, Alerts)
5. ⏳ Phase 5: Prompts & Frameworks (GRÖẞTER BEREICH!)
6. ⏳ Phase 6: User & Role Management Details
7. ⏳ Phase 7: Settings & Configuration
8. ⏳ Phase 8: Chat & Communication
9. ⏳ Phase 9: Support & Documentation
10. ⏳ Phase 10: Permissions & Security

Soll ich mit Phase 2 beginnen und systematisch weitermachen?
