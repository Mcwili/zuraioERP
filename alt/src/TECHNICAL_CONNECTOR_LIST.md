# Technische Connector Liste - AI Hub System

## SCREEN 1: Login Screen
**Frontend Typ**: User Entry

### Entities
- User (Authentifizierungsuser)
- Tenant
- Session
- 2FA Token

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| selectedTenant | Enum (String) | Ja | Tenant |
| password | Text (masked) | Ja | User |
| layoutType | Enum (desktop, mobile) | Ja | Session |
| twoFactorCode | Text (6-digit) | Ja | 2FA Token |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| tenantOptions | Array<String> | Tenant | Select Dropdown |
| tenantLogo | Image URL | Tenant | Image |
| errorMessage | Text | Validation | Alert Text |
| twoFactorError | Text | 2FA Token | Alert Text |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| handleLogin | Create Session (Credential Validation) | User, Session | Async |
| handle2FASubmit | Validate 2FA, Complete Login | 2FA Token, Session | Async |
| handle2FACancel | Cancel 2FA Process | Session | Sync |
| setLayoutType | Update Layout Preference | Session | Sync |
| setSelectedTenant | Select Tenant Context | Tenant | Sync |
| showPassword Toggle | Toggle Password Visibility | UI State | Sync |

### Permissions
- Permission offen - Alle können Login-Screen sehen
- 2FA-Validierung erforderlich für Login-Completion

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Tenant List | DB direkt (Supabase mit RLS) |
| User Authentication | Backend Service (Auth Service) |
| 2FA Validation | Backend Service (Auth Service) |
| Session Creation | Backend Service + DB direkt |

---

## SCREEN 2: Tenant Admin Layout - Header
**Frontend Typ**: Display + Navigation

### Entities
- User (logged in)
- Tenant
- Session
- Language Settings
- Dark Mode Settings

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| (keine direkten Inputs im Header) | - | - | - |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| zuraioLogo | Image URL | System | Image |
| tenantLogo | Image URL | Tenant | Image |
| tenantName | Text | Tenant | Text |
| username | Text | User | Text (im Dropdown) |
| isDarkMode | Boolean | User Settings | Icon State |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| toggleTenantPanel | Navigation (Panel öffnen/schließen) | UI State | Sync |
| toggleAccountPanel | Navigation (Panel öffnen/schließen) | UI State | Sync |
| toggleDarkMode | Update Theme | User Settings | Sync |
| handleLogout | Delete Session, Logout | Session, User | Async |
| setLanguage | Update Language | User Settings | Sync |

### Permissions
- Alle eingeloggten User können Header sehen
- Alle eingeloggten User können Account-Panel öffnen
- Nur Admin/Power User können Tenant-Panel öffnen (Permission offen - zu klären)

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Tenant Data | DB direkt (Supabase mit RLS) |
| User Data | DB direkt (Supabase mit RLS) |
| Settings Update | DB direkt (Supabase mit RLS) |
| Logout | Backend Service |

---

## SCREEN 3: Tenant Dashboard
**Frontend Typ**: Display + Analytics

### Entities
- User
- Module (LLM Models)
- Agent
- Activity Log Entry
- System Message
- API Call Statistics
- Session

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| (keine direkten Inputs - nur Display) | - | - | - |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| users.total | Number | User | Stat Card |
| users.active | Number | User | Stat Card |
| users.inactive | Number | User | Stat Card |
| users.trend | Number (Percentage) | User Statistics | Badge mit Icon |
| modules.total | Number | Module | Stat Card |
| modules.active | Number | Module | Stat Card |
| modules.available | Number | Module | Stat Card |
| modules.trend | Number (Percentage) | Module Statistics | Badge mit Icon |
| agents.total | Number | Agent | Stat Card |
| agents.active | Number | Agent | Stat Card |
| agents.inactive | Number | Agent | Stat Card |
| agents.trend | Number (Percentage) | Agent Statistics | Badge mit Icon |
| apiCalls.today | Number | API Call Statistics | Stat Card |
| apiCalls.thisMonth | Number | API Call Statistics | Stat Card |
| apiCalls.trend | Number (Percentage) | API Call Statistics | Badge mit Icon |
| systemMessages | Array<SystemMessage> | System Message | Alert Cards |
| recentActivities | Array<ActivityLogEntry> | Activity Log Entry | List Items |
| uptime | Percentage | System Monitoring | Stat Card |
| activeSessions | Number | Session | Stat Card |
| regions | Number | System Configuration | Stat Card |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| onSectionChange (Card Click) | Navigation zu Detail-Seite | UI State | Sync |

### Permissions
- Alle eingeloggten User können Dashboard sehen
- Permission offen - zu klären ob eingeschränkte Ansicht für bestimmte Rollen

### Source
| Entity/Aktion | Source |
|--------------|--------|
| User Statistics | DB direkt (Aggregation Query) |
| Module Statistics | DB direkt (Aggregation Query) |
| Agent Statistics | DB direkt (Aggregation Query) |
| API Call Statistics | Backend Service (Analytics Service) |
| System Messages | Backend Service (Notification Service) |
| Activity Log | DB direkt (Supabase mit RLS) |
| System Monitoring | Backend Service (Monitoring Service) |

---

## SCREEN 4: User Management - Users Tab
**Frontend Typ**: Admin Entry + Display

### Entities
- User
- User Source (Azure, Google, Local)
- User Status
- User Approval
- Role
- Department
- Group

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| searchQuery | Text | Nein | User (Filter) |
| filterSource | Enum (local, azure, google, all) | Nein | User Source |
| filterRole | Enum (Admin, Power User, User, all) | Nein | Role |
| filterStatus | Enum (active, inactive, locked, all) | Nein | User Status |
| filterDepartment | Array<String> | Nein | Department |
| sortColumn | String | Nein | Table Sort |
| sortDirection | Enum (asc, desc) | Nein | Table Sort |
| selectedUsers | Array<Number> | Nein | User (Bulk Selection) |
| newUser.name | Text | Ja (bei Create) | User |
| newUser.email | Email | Ja (bei Create) | User |
| newUser.source | Enum | Ja (bei Create) | User Source |
| newUser.role | Enum | Ja (bei Create) | Role |
| newUser.status | Enum | Ja (bei Create) | User Status |
| newUser.departments | Array<String> | Nein | Department |
| newUser.groups | Array<String> | Nein | Group |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| users | Array<User> | User | Table |
| user.id | Number | User | Table Cell |
| user.name | Text | User | Table Cell |
| user.email | Email | User | Table Cell |
| user.source | Enum | User Source | Badge |
| user.role | Text | Role | Badge |
| user.status | Enum | User Status | Badge |
| user.lastLogin | DateTime | User | Table Cell (Text) |
| user.syncedAt | DateTime | User | Table Cell (Text) |
| user.groups | Array<String> | Group | Table Cell (Badges) |
| user.departments | Array<String> | Department | Table Cell (Badges) |
| user.isDuplicate | Boolean | User | Badge (Warning) |
| totalUsers | Number | User | Counter |
| selectedCount | Number | User Selection | Counter |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| createUser | Create | User | Async |
| updateUser | Update | User | Async |
| deleteUser | Delete | User | Async |
| bulkDelete | Delete Multiple | User | Async |
| bulkUpdateRole | Update Multiple | User, Role | Async |
| bulkUpdateStatus | Update Multiple | User, User Status | Async |
| syncUsers (Azure/Google) | Import/Update | User, User Source | Async |
| exportUsers | Export | User | Async |
| importUsers (CSV/Excel) | Bulk Create/Update | User | Async |
| sortTable | Update Sort Order | UI State | Sync |
| filterTable | Update Filter | UI State | Sync |
| searchUsers | Filter by Search Query | UI State | Sync |
| selectUser | Toggle Selection | UI State | Sync |
| selectAllUsers | Toggle All Selection | UI State | Sync |
| mergeUsers (Duplicate Resolution) | Update/Delete | User | Async |

### Permissions
- Nur Admin kann User Management Screen sehen
- Nur Admin kann User erstellen/bearbeiten/löschen
- Power User kann nur sehen (Permission offen - zu klären)

### Source
| Entity/Aktion | Source |
|--------------|--------|
| User List | DB direkt (Supabase mit RLS) |
| User CRUD | DB direkt (Supabase mit RLS) |
| Azure Sync | Externe API (Microsoft Graph API) |
| Google Sync | Externe API (Google Workspace API) |
| Export | Backend Service (Export Service) |
| Import | Backend Service (Import Service) |
| Merge Users | Backend Service (Deduplication Service) |

---

## SCREEN 5: User Management - Roles Tab
**Frontend Typ**: Admin Entry + Display

### Entities
- Role
- Permission
- User
- Module Access

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| role.name | Text | Ja | Role |
| role.permissions | Array<String> | Ja | Permission |
| role.moduleAccess | Array<String> | Nein | Module Access |
| role.description | Text | Nein | Role |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| roles | Array<Role> | Role | List/Cards |
| role.name | Text | Role | Text |
| role.userCount | Number | User | Counter |
| role.permissions | Array<String> | Permission | Badge List |
| role.moduleAccess | Array<String> | Module Access | Badge List |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| createRole | Create | Role | Async |
| updateRole | Update | Role | Async |
| deleteRole | Delete (mit Confirmation) | Role | Async |
| assignPermission | Update | Role, Permission | Async |
| removePermission | Update | Role, Permission | Async |

### Permissions
- Nur Admin kann Roles verwalten
- Änderungen an Rollen erfordern Bestätigung

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Role List | DB direkt (Supabase mit RLS) |
| Role CRUD | DB direkt (Supabase mit RLS) |
| Permission List | DB direkt (Supabase mit RLS) |

---

## SCREEN 6: User Management - Departments Tab
**Frontend Typ**: Admin Entry + Display

### Entities
- Department
- Prompt Category
- User
- Department Assignment

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| department.name | Text | Ja | Department |
| department.promptCategories | Array<String> | Ja | Prompt Category |
| department.status | Enum (active, inactive) | Ja | Department |
| department.assignedUsers | Array<String> | Nein | User |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| departments | Array<Department> | Department | Table/Cards |
| department.name | Text | Department | Table Cell |
| department.promptCategories | Array<String> | Prompt Category | Badge List |
| department.status | Enum | Department | Badge |
| department.users | Number | Department Assignment | Counter |
| department.assignedUsers | Array<String> | User | List |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| createDepartment | Create | Department | Async |
| updateDepartment | Update | Department | Async |
| deleteDepartment | Delete | Department | Async |
| assignUser | Update | Department Assignment | Async |
| removeUser | Update | Department Assignment | Async |
| assignPromptCategory | Update | Department, Prompt Category | Async |
| removePromptCategory | Update | Department, Prompt Category | Async |

### Permissions
- Nur Admin kann Departments verwalten

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Department List | DB direkt (Supabase mit RLS) |
| Department CRUD | DB direkt (Supabase mit RLS) |
| Prompt Categories | DB direkt (Supabase mit RLS) |
| User Assignments | DB direkt (Supabase mit RLS) |

---

## SCREEN 7: User Management - DSGVO/GDPR Tab
**Frontend Typ**: Admin Entry + Display

### Entities
- DSGVO Compliance Record
- User
- Data Processing Agreement
- Consent Record
- Data Deletion Request

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| deletionRequest.userId | Reference | Ja | User |
| deletionRequest.reason | Text | Ja | Data Deletion Request |
| deletionRequest.confirmDate | Date | Ja | Data Deletion Request |
| exportRequest.userId | Reference | Ja | User |
| exportRequest.format | Enum (JSON, CSV, PDF) | Ja | Data Export |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| complianceStatus | Enum | DSGVO Compliance Record | Status Badge |
| lastAudit | Date | DSGVO Compliance Record | Text |
| activeConsents | Number | Consent Record | Counter |
| pendingDeletions | Number | Data Deletion Request | Counter |
| processingAgreements | Array<DPA> | Data Processing Agreement | List |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| requestDataDeletion | Create Deletion Request | Data Deletion Request | Async |
| confirmDataDeletion | Execute Deletion | User, Data Deletion Request | Async |
| exportUserData | Export | User | Async |
| revokeConsent | Update | Consent Record | Async |
| downloadProcessingAgreement | Download | Data Processing Agreement | Async |

### Permissions
- Nur Admin kann DSGVO-Tab sehen
- Datenlöschung erfordert zusätzliche Bestätigung

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Compliance Records | DB direkt (Supabase mit RLS) |
| User Data Export | Backend Service (GDPR Service) |
| Data Deletion | Backend Service (GDPR Service) + DB direkt |
| Consent Management | DB direkt (Supabase mit RLS) |

---

## SCREEN 8: Model Management
**Frontend Typ**: Admin Entry + Display

### Entities
- LLM Model
- Provider
- API Key
- Model Status
- Model Test Result
- Agent (Using Model)

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| model.name | Text | Ja | LLM Model |
| model.provider | Enum | Ja | Provider |
| model.modelId | Text | Ja | LLM Model |
| model.apiKey | Text (masked) | Ja | API Key |
| model.endpoint | Text (URL) | Nein | LLM Model |
| model.status | Enum (active, inactive, error) | Ja | Model Status |
| searchQuery | Text | Nein | Search Filter |
| filterProvider | Enum | Nein | Provider Filter |
| filterStatus | Enum | Nein | Status Filter |
| sortColumn | String | Nein | Sort Config |
| sortDirection | Enum (asc, desc) | Nein | Sort Config |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| models | Array<Model> | LLM Model | Table |
| model.name | Text | LLM Model | Table Cell |
| model.provider | Text | Provider | Badge |
| model.modelId | Text | LLM Model | Table Cell |
| model.apiKey | Text (masked) | API Key | Table Cell (masked) |
| model.endpoint | Text (URL) | LLM Model | Table Cell |
| model.status | Enum | Model Status | Badge |
| model.lastTested | DateTime | Model Test Result | Table Cell |
| model.addedDate | Date | LLM Model | Table Cell |
| model.usedBy | Array<String> | Agent | Badge List |
| totalModels | Number | LLM Model | Counter |
| activeModels | Number | Model Status | Counter |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| addModel | Create | LLM Model | Async |
| updateModel | Update | LLM Model | Async |
| deleteModel | Delete (mit Confirmation) | LLM Model | Async |
| testConnection | Test API Connection | Model Test Result | Async |
| copyApiKey | Copy to Clipboard | UI State | Sync |
| filterModels | Update Filter | UI State | Sync |
| sortModels | Update Sort | UI State | Sync |
| searchModels | Update Search Filter | UI State | Sync |
| duplicateModel | Create (Copy) | LLM Model | Async |

### Permissions
- Nur Admin kann Models verwalten
- API Keys sind maskiert, nur beim Bearbeiten sichtbar
- Löschen nur wenn Model nicht verwendet wird (Validation)

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Model List | DB direkt (Supabase mit RLS) |
| Model CRUD | DB direkt (Supabase mit RLS) |
| Test Connection | Backend Service (LLM Integration Service) |
| Usage Info (usedBy) | DB direkt (Query über Agent-Model-Relations) |

---

## SCREEN 9: Module Overview (Agents & Orchestrator)
**Frontend Typ**: Admin Entry + Display

### Entities
- Module (Orchestrator oder Agent)
- Agent
- Orchestrator
- LLM Model
- Storage Configuration
- EU AI Act Risk Assessment
- Module Status

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| module.name | Text | Ja | Module |
| module.type | Enum (orchestrator, agent) | Ja | Module |
| module.description | Text | Ja | Module |
| module.icon | Text (Emoji) | Nein | Module |
| module.enabled | Boolean | Ja | Module Status |
| module.apiEndpoint | Text (URL) | Nein | Module |
| module.apiKey | Text (masked) | Nein | API Key |
| module.category | Enum (public, private) | Nein | Module |
| module.llm1 | Reference | Nein | LLM Model |
| module.llm1Prompt | Text (Textarea) | Nein | Module |
| module.llm2 | Reference | Nein | LLM Model |
| module.llm2Prompt | Text (Textarea) | Nein | Module |
| module.storageUrl | Text (URL) | Nein | Storage Configuration |
| module.storageToken | Text (masked) | Nein | Storage Configuration |
| riskAssessment.behaviorInfluence | Boolean | Ja | EU AI Act Risk Assessment |
| riskAssessment.intentionalDeception | Boolean | Ja | EU AI Act Risk Assessment |
| riskAssessment.intentionalManipulation | Boolean | Ja | EU AI Act Risk Assessment |
| riskAssessment.decisionFreedomImpaired | Boolean | Ja | EU AI Act Risk Assessment |
| riskAssessment.significantHarm | Boolean | Ja | EU AI Act Risk Assessment |
| riskAssessment.annex1Fulfilled | Boolean | Ja | EU AI Act Risk Assessment |
| riskAssessment.annex2Fulfilled | Boolean | Ja | EU AI Act Risk Assessment |
| riskAssessment.annex3Fulfilled | Boolean | Ja | EU AI Act Risk Assessment |
| riskAssessment.isProfiling | Boolean | Ja | EU AI Act Risk Assessment |
| riskAssessment.humanInLoop | Boolean | Ja | EU AI Act Risk Assessment |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| modules | Array<Module> | Module | Cards/List |
| module.name | Text | Module | Card Title |
| module.type | Enum | Module | Badge |
| module.description | Text | Module | Card Description |
| module.status | Enum (active, inactive, error) | Module Status | Badge |
| module.enabled | Boolean | Module | Toggle Switch |
| module.version | Text | Module | Badge |
| module.lastSync | DateTime | Module | Text |
| module.riskCategory | Enum (niedrig, hoch) | EU AI Act Risk Assessment | Badge (calculated) |
| orchestratorDiagram | Image | Module | Diagram Image |
| llmModelName | Text | LLM Model | Text/Badge |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| createModule | Create | Module | Async |
| updateModule | Update | Module | Async |
| deleteModule | Delete (mit Confirmation) | Module | Async |
| toggleModuleEnabled | Update Status | Module Status | Async |
| editOrchestrator | Update | Orchestrator | Async |
| editAgent | Update | Agent | Async |
| saveRiskAssessment | Update | EU AI Act Risk Assessment | Async |
| calculateRiskCategory | Calculate (Client-Side) | EU AI Act Risk Assessment | Sync |
| testConnection | Test API | Module | Async |

### Permissions
- Nur Admin kann Module verwalten
- Risk Assessment erfordert vollständige Ausfüllung
- Orchestrator-Bearbeitung nur für Super Admin (Permission offen)

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Module List | DB direkt (Supabase mit RLS) |
| Module CRUD | DB direkt (Supabase mit RLS) |
| LLM Model List | DB direkt (Supabase mit RLS) |
| Risk Assessment | DB direkt (Supabase mit RLS) |
| Risk Calculation | Frontend (Client-side Logic) |
| Test Connection | Backend Service (Agent Integration Service) |

---

## SCREEN 10: Tenant Settings - General
**Frontend Typ**: Admin Entry

### Entities
- Tenant
- Tenant Configuration
- Logo Asset

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| tenantName | Text | Ja | Tenant |
| tenantLogo | File (Image) | Nein | Logo Asset |
| previewBackground | Enum (white, gray, black) | Nein | UI State |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| currentTenantName | Text | Tenant | Input Value |
| currentLogoUrl | Image URL | Logo Asset | Image Preview |
| logoUploadStatus | Text | UI State | Text Message |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| updateTenantName | Update | Tenant | Async |
| uploadLogo | Create/Update | Logo Asset | Async |
| saveSettings | Update | Tenant Configuration | Async |

### Permissions
- Nur Admin kann Tenant Settings bearbeiten

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Tenant Data | DB direkt (Supabase mit RLS) |
| Logo Upload | Backend Service (File Storage Service) |
| Settings Update | DB direkt (Supabase mit RLS) |

---

## SCREEN 11: Tenant Settings - Compliance - EU AI Act
**Frontend Typ**: Admin Entry + Display

### Entities
- EU AI Act Compliance
- Module
- Risk Assessment
- Compliance Document
- Audit Log

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| (hauptsächlich Display von berechneten Werten) | - | - | - |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| complianceStatus | Enum | EU AI Act Compliance | Status Badge |
| highRiskModules | Array<Module> | Module, Risk Assessment | List |
| lowRiskModules | Array<Module> | Module, Risk Assessment | List |
| complianceDocuments | Array<Document> | Compliance Document | List |
| lastAudit | Date | Audit Log | Text |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| downloadComplianceReport | Export | Compliance Document | Async |
| scheduleAudit | Create | Audit Log | Async |
| navigateToModuleRiskAssessment | Navigation | UI State | Sync |

### Permissions
- Nur Admin kann EU AI Act Compliance sehen
- Audit-Scheduling nur für Super Admin (Permission offen)

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Compliance Data | DB direkt (Aggregation über Module + Risk Assessments) |
| Document Generation | Backend Service (Compliance Service) |
| Audit Logs | DB direkt (Supabase mit RLS) |

---

## SCREEN 12: Tenant Settings - Compliance - DSGVO
**Frontend Typ**: Admin Entry + Display

### Entities
- DSGVO Compliance
- Data Processing Record
- Data Subject Request
- Consent Record
- Data Breach Record

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| (siehe User Management - DSGVO Tab für Details) | - | - | - |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| complianceStatus | Enum | DSGVO Compliance | Status Badge |
| openRequests | Number | Data Subject Request | Counter |
| processingActivities | Array<Record> | Data Processing Record | List |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| downloadDSGVOReport | Export | DSGVO Compliance | Async |
| recordDataBreach | Create | Data Breach Record | Async |

### Permissions
- Nur Admin kann DSGVO Compliance sehen

### Source
| Entity/Aktion | Source |
|--------------|--------|
| DSGVO Data | DB direkt (Supabase mit RLS) |
| Report Generation | Backend Service (GDPR Service) |

---

## SCREEN 13: Tenant Settings - Compliance - Responsibilities
**Frontend Typ**: Admin Entry + Display

### Entities
- Responsibility Assignment
- Role
- Compliance Area
- Responsible Person

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| responsibility.area | Enum | Ja | Compliance Area |
| responsibility.role | Reference | Ja | Role |
| responsibility.person | Reference | Ja | Responsible Person |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| responsibilities | Array<Assignment> | Responsibility Assignment | Table |
| area.name | Text | Compliance Area | Table Cell |
| role.name | Text | Role | Table Cell |
| person.name | Text | Responsible Person | Table Cell |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| assignResponsibility | Create/Update | Responsibility Assignment | Async |
| removeResponsibility | Delete | Responsibility Assignment | Async |

### Permissions
- Nur Admin kann Responsibilities verwalten

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Responsibility Data | DB direkt (Supabase mit RLS) |

---

## SCREEN 14: Tenant Settings - Security
**Frontend Typ**: Admin Entry

### Entities
- Security Configuration
- 2FA Settings
- Password Policy
- Session Configuration
- API Security Settings

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| enforce2FA | Boolean | Ja | 2FA Settings |
| passwordMinLength | Number | Ja | Password Policy |
| passwordRequireSpecialChars | Boolean | Ja | Password Policy |
| passwordRequireNumbers | Boolean | Ja | Password Policy |
| passwordRequireUppercase | Boolean | Ja | Password Policy |
| sessionTimeout | Number (Minutes) | Ja | Session Configuration |
| allowedIPRanges | Text (Multiline) | Nein | API Security Settings |
| apiRateLimit | Number | Ja | API Security Settings |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| currentSecuritySettings | Object | Security Configuration | Form Values |
| securityScore | Number (0-100) | Security Configuration | Progress Bar |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| updateSecuritySettings | Update | Security Configuration | Async |
| resetAPIKey | Update | API Security Settings | Async |
| enforcePasswordReset | Trigger Job | User, Password Policy | Async |

### Permissions
- Nur Admin kann Security Settings bearbeiten
- Kritische Änderungen erfordern Bestätigung

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Security Settings | DB direkt (Supabase mit RLS) |
| Security Updates | Backend Service (Security Service) |
| Password Reset Jobs | Backend Service (User Service) |

---

## SCREEN 15: Account Panel
**Frontend Typ**: User Entry

### Entities
- User
- Language Settings
- Theme Settings

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| language | Enum (de, en, fr, pt-br) | Ja | Language Settings |
| darkMode | Boolean | Ja | Theme Settings |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| currentLanguage | Enum | Language Settings | Dropdown Selected |
| currentTheme | Boolean | Theme Settings | Toggle State |
| userName | Text | User | Display Text |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| setLanguage | Update | Language Settings | Sync (LocalStorage + Context) |
| toggleDarkMode | Update | Theme Settings | Sync (LocalStorage + Context) |
| logout | Delete Session | User, Session | Async |

### Permissions
- Alle eingeloggten User können Account Panel sehen und bearbeiten

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Language Settings | LocalStorage + Context (kein Backend) |
| Theme Settings | LocalStorage + Context (kein Backend) |
| User Data | DB direkt (Supabase mit RLS) |
| Logout | Backend Service |

---

## SCREEN 16: Tenant Admin Panel (Sidebar)
**Frontend Typ**: Navigation

### Entities
- Navigation Item
- Current Page
- User Role

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| currentPage | Text | Ja | Current Page |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| navigationItems | Array<NavItem> | Navigation Item | Collapsible Menu |
| activeItem | Text | Current Page | Highlighted Item |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| navigateTo | Navigation | Current Page | Sync |
| toggleSubmenu | UI Toggle | UI State | Sync |

### Permissions
- Navigation Items basierend auf User Role gefiltert (Permission offen - zu klären)

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Navigation Structure | Frontend (Static Configuration) |
| Current Page | Frontend State |

---

## SCREEN 17: Think Tank Panel
**Frontend Typ**: Display + AI Interaction

### Entities
- Think Tank Session
- Thought Entry
- AI Response
- User

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| userThought | Text (Textarea) | Ja | Thought Entry |
| sessionId | Reference | Ja | Think Tank Session |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| thoughts | Array<ThoughtEntry> | Thought Entry | Chat List |
| aiResponses | Array<AIResponse> | AI Response | Chat List |
| sessionHistory | Array<Session> | Think Tank Session | Sidebar List |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| submitThought | Create | Thought Entry | Async |
| getAIResponse | Create | AI Response | Async |
| createNewSession | Create | Think Tank Session | Async |
| loadSession | Navigation | Think Tank Session | Async |
| deleteSession | Delete | Think Tank Session | Async |

### Permissions
- Alle eingeloggten User können Think Tank nutzen

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Think Tank Sessions | DB direkt (Supabase mit RLS) |
| Thought Entries | DB direkt (Supabase mit RLS) |
| AI Responses | Backend Service (AI Service / Orchestrator) |

---

## SCREEN 18: Prompts & Frameworks
**Frontend Typ**: Display + User Selection

### Entities
- Prompt Template
- Framework
- Category
- Department
- User Access

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| selectedCategory | Enum | Nein | Category |
| selectedFramework | Enum | Nein | Framework |
| searchQuery | Text | Nein | Search Filter |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| prompts | Array<PromptTemplate> | Prompt Template | Cards/List |
| frameworks | Array<Framework> | Framework | Tabs/Sections |
| categories | Array<Category> | Category | Filter Dropdown |
| prompt.title | Text | Prompt Template | Card Title |
| prompt.description | Text | Prompt Template | Card Description |
| prompt.content | Text | Prompt Template | Expandable Text |
| prompt.category | Text | Category | Badge |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| selectPrompt | Navigation/Copy | UI State | Sync |
| copyPromptContent | Copy to Clipboard | UI State | Sync |
| filterByCategory | Update Filter | UI State | Sync |
| filterByFramework | Update Filter | UI State | Sync |
| searchPrompts | Update Search Filter | UI State | Sync |

### Permissions
- Prompts gefiltert nach Department Assignment (User kann nur Prompts seiner Departments sehen)
- Permission offen - zu klären ob alle User alle sehen können

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Prompt Templates | DB direkt (Supabase mit RLS) |
| Frameworks | DB direkt (Supabase mit RLS) |
| User Department Access | DB direkt (Join über User-Department-Relation) |

---

## SCREEN 19: Analytics Dashboard
**Frontend Typ**: Display + Analytics

### Entities
- Usage Statistics
- User Activity
- Module Usage
- API Call Metrics
- Performance Metrics

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| dateRange.start | Date | Nein | Time Filter |
| dateRange.end | Date | Nein | Time Filter |
| filterModule | Reference | Nein | Module Filter |
| filterUser | Reference | Nein | User Filter |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| totalUsage | Number | Usage Statistics | Stat Card |
| activeUsers | Number | User Activity | Stat Card |
| moduleUsage | Array<Metric> | Module Usage | Chart |
| apiCallsOverTime | Array<Metric> | API Call Metrics | Line Chart |
| performanceMetrics | Array<Metric> | Performance Metrics | Bar Chart |
| topUsers | Array<UserMetric> | User Activity | Leaderboard |
| topModules | Array<ModuleMetric> | Module Usage | Leaderboard |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| updateDateRange | Update Filter | UI State | Sync |
| exportAnalytics | Export | Analytics Data | Async |
| refreshData | Reload | All Metrics | Async |

### Permissions
- Nur Admin kann Analytics sehen
- Power User können nur eigene Statistiken sehen (Permission offen)

### Source
| Entity/Aktion | Source |
|--------------|--------|
| All Analytics Data | Backend Service (Analytics Service) |
| Real-time Metrics | Backend Service (Monitoring Service) |
| Export | Backend Service (Export Service) |

---

## SCREEN 20: Activity Log
**Frontend Typ**: Display

### Entities
- Activity Log Entry
- User
- Action Type
- Entity Reference

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| filterUser | Reference | Nein | User Filter |
| filterAction | Enum | Nein | Action Type Filter |
| filterDateRange | DateRange | Nein | Time Filter |
| searchQuery | Text | Nein | Search Filter |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| activities | Array<LogEntry> | Activity Log Entry | Table/List |
| activity.timestamp | DateTime | Activity Log Entry | Table Cell |
| activity.user | Text | User | Table Cell |
| activity.action | Text | Action Type | Badge |
| activity.entity | Text | Entity Reference | Table Cell |
| activity.details | JSON | Activity Log Entry | Expandable JSON Viewer |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| filterActivities | Update Filter | UI State | Sync |
| exportLogs | Export | Activity Log Entry | Async |
| viewDetails | Expand Details | UI State | Sync |

### Permissions
- Nur Admin kann Activity Log sehen
- User sehen nur eigene Activities (Permission offen)

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Activity Log Entries | DB direkt (Supabase mit RLS) |
| Export | Backend Service (Export Service) |

---

## SCREEN 21: System Monitoring
**Frontend Typ**: Display + Admin

### Entities
- System Metric
- Service Status
- Health Check
- Alert
- Performance Data

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| refreshInterval | Number (Seconds) | Nein | UI State |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| systemStatus | Enum (healthy, degraded, down) | Service Status | Status Badge |
| services | Array<ServiceStatus> | Service Status | List |
| uptime | Percentage | System Metric | Progress Bar |
| cpuUsage | Percentage | Performance Data | Gauge Chart |
| memoryUsage | Percentage | Performance Data | Gauge Chart |
| diskUsage | Percentage | Performance Data | Gauge Chart |
| activeAlerts | Array<Alert> | Alert | Alert List |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| refreshMetrics | Reload | All Metrics | Async |
| acknowledgeAlert | Update | Alert | Async |
| restartService | Trigger Job | Service Status | Async |

### Permissions
- Nur Admin kann System Monitoring sehen
- Service Restart nur für Super Admin (Permission offen)

### Source
| Entity/Aktion | Source |
|--------------|--------|
| System Metrics | Backend Service (Monitoring Service) |
| Service Status | Backend Service (Health Check Service) |
| Alerts | Backend Service (Alert Service) |
| Service Control | Backend Service (Orchestration Service) |

---

## SCREEN 22: Alerts Management
**Frontend Typ**: Admin Entry + Display

### Entities
- Alert Rule
- Alert
- Alert Recipient
- Alert Channel

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| rule.name | Text | Ja | Alert Rule |
| rule.condition | Text (Expression) | Ja | Alert Rule |
| rule.threshold | Number | Ja | Alert Rule |
| rule.channels | Array<Reference> | Ja | Alert Channel |
| rule.recipients | Array<Reference> | Ja | Alert Recipient |
| rule.enabled | Boolean | Ja | Alert Rule |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| alertRules | Array<AlertRule> | Alert Rule | Table |
| activeAlerts | Array<Alert> | Alert | List |
| alertHistory | Array<Alert> | Alert | Timeline |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| createAlertRule | Create | Alert Rule | Async |
| updateAlertRule | Update | Alert Rule | Async |
| deleteAlertRule | Delete | Alert Rule | Async |
| toggleAlertRule | Update Status | Alert Rule | Async |
| acknowledgeAlert | Update | Alert | Async |
| testAlertRule | Trigger Job | Alert | Async |

### Permissions
- Nur Admin kann Alert Rules verwalten

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Alert Rules | DB direkt (Supabase mit RLS) |
| Alerts | DB direkt (Supabase mit RLS) |
| Alert Triggering | Backend Service (Alert Service) |

---

## SCREEN 23: Support Documentation
**Frontend Typ**: Display

### Entities
- Documentation Article
- Category
- Tag
- Search Index

### Inputs
| Feldname | Datentyp | Pflichtfeld | Zugehöriges Entity |
|----------|----------|-------------|-------------------|
| searchQuery | Text | Nein | Search Filter |
| filterCategory | Reference | Nein | Category Filter |
| filterTag | Reference | Nein | Tag Filter |

### Outputs
| Feldname | Datentyp | Quelle Entity | Anzeigeform |
|----------|----------|---------------|-------------|
| articles | Array<Article> | Documentation Article | List/Cards |
| article.title | Text | Documentation Article | Title |
| article.content | Markdown | Documentation Article | Rendered Markdown |
| article.category | Text | Category | Badge |
| article.tags | Array<String> | Tag | Badge List |
| categories | Array<Category> | Category | Sidebar Navigation |

### Actions
| Aktion | Effekt | Betroffene Entity | Sync/Async |
|--------|--------|------------------|------------|
| searchDocs | Update Search Filter | UI State | Sync |
| filterByCategory | Update Filter | UI State | Sync |
| filterByTag | Update Filter | UI State | Sync |
| openArticle | Navigation | UI State | Sync |

### Permissions
- Alle eingeloggten User können Documentation sehen

### Source
| Entity/Aktion | Source |
|--------------|--------|
| Documentation Articles | DB direkt oder Static Content Files |
| Search Index | Backend Service (Search Service) |

---

## AGGREGIERTE ENTITY-ÜBERSICHT

### Kern-Entities (mit allen Attributen)

**User**
- id: Number (Primary Key)
- name: Text
- email: Email
- source: Enum (local, azure, google)
- role: Reference zu Role
- approval: Enum (authorized, not_authorized)
- status: Enum (active, inactive, locked)
- lastLogin: DateTime
- syncedAt: DateTime
- groups: Array<Reference zu Group>
- departments: Array<Reference zu Department>
- isDuplicate: Boolean
- createdAt: DateTime
- updatedAt: DateTime

**Tenant**
- id: Number (Primary Key)
- name: Text
- logoUrl: Text (URL)
- company: Enum (rmb, neuco)
- status: Enum (active, inactive)
- createdAt: DateTime
- updatedAt: DateTime

**Role**
- id: Number (Primary Key)
- name: Text
- permissions: Array<Reference zu Permission>
- moduleAccess: Array<Reference zu Module>
- description: Text
- userCount: Number (calculated)

**Department**
- id: Number (Primary Key)
- name: Text
- promptCategories: Array<Reference zu PromptCategory>
- status: Enum (active, inactive)
- assignedUsers: Array<Reference zu User>
- userCount: Number (calculated)

**LLM Model**
- id: Text (UUID/Primary Key)
- name: Text
- provider: Enum (openai, anthropic, google, azure, aws, mistral, cohere, custom)
- modelId: Text
- apiKey: Text (encrypted)
- endpoint: Text (URL, optional)
- status: Enum (active, inactive, error)
- lastTested: DateTime
- addedDate: Date
- usedBy: Array<Reference zu Module>

**Module**
- id: Text (UUID/Primary Key)
- name: Text
- type: Enum (orchestrator, agent)
- description: Text
- icon: Text (Emoji)
- status: Enum (active, inactive, error)
- enabled: Boolean
- apiEndpoint: Text (URL)
- apiKey: Text (encrypted)
- lastSync: DateTime
- version: Text
- category: Enum (public, private)
- llm1: Reference zu LLM Model
- llm1Prompt: Text
- llm2: Reference zu LLM Model
- llm2Prompt: Text
- storageUrl: Text (URL)
- storageToken: Text (encrypted)
- riskCategory: Enum (niedrig, hoch) - calculated

**EU AI Act Risk Assessment**
- id: Number (Primary Key)
- moduleId: Reference zu Module
- behaviorInfluence: Boolean
- intentionalDeception: Boolean
- intentionalManipulation: Boolean
- decisionFreedomImpaired: Boolean
- significantHarm: Boolean
- annex1Fulfilled: Boolean
- annex2Fulfilled: Boolean
- annex3Fulfilled: Boolean
- isProfiling: Boolean
- humanInLoop: Boolean
- assessedAt: DateTime
- assessedBy: Reference zu User

**Activity Log Entry**
- id: Number (Primary Key)
- timestamp: DateTime
- userId: Reference zu User
- action: Enum (create, update, delete, login, logout, etc.)
- entityType: Text
- entityId: Text
- details: JSON
- ipAddress: Text

**Session**
- id: Text (UUID/Primary Key)
- userId: Reference zu User
- tenantId: Reference zu Tenant
- layoutType: Enum (desktop, mobile)
- createdAt: DateTime
- expiresAt: DateTime
- lastActivity: DateTime

**2FA Token**
- id: Number (Primary Key)
- userId: Reference zu User
- code: Text (6-digit, encrypted)
- createdAt: DateTime
- expiresAt: DateTime
- verified: Boolean

**Prompt Template**
- id: Number (Primary Key)
- title: Text (multilingual)
- description: Text (multilingual)
- content: Text (multilingual)
- category: Reference zu PromptCategory
- framework: Reference zu Framework
- departmentAccess: Array<Reference zu Department>

**Think Tank Session**
- id: Text (UUID/Primary Key)
- userId: Reference zu User
- createdAt: DateTime
- updatedAt: DateTime
- thoughts: Array<Reference zu ThoughtEntry>

**Thought Entry**
- id: Number (Primary Key)
- sessionId: Reference zu ThinkTankSession
- type: Enum (user, ai)
- content: Text
- timestamp: DateTime

**Alert**
- id: Number (Primary Key)
- ruleId: Reference zu AlertRule
- severity: Enum (low, medium, high, critical)
- message: Text
- timestamp: DateTime
- acknowledged: Boolean
- acknowledgedBy: Reference zu User
- acknowledgedAt: DateTime

**Alert Rule**
- id: Number (Primary Key)
- name: Text
- condition: Text (Expression)
- threshold: Number
- channels: Array<Reference zu AlertChannel>
- recipients: Array<Reference zu User>
- enabled: Boolean

---

## KRITISCHE BACKEND-SERVICES

### 1. Authentication Service
- User Login/Logout
- 2FA Generation & Validation
- Session Management
- Token Management

### 2. User Sync Service
- Azure AD Sync (Microsoft Graph API)
- Google Workspace Sync (Google API)
- User Deduplication
- Scheduled Sync Jobs

### 3. GDPR/DSGVO Service
- Data Export (Right to Access)
- Data Deletion (Right to be Forgotten)
- Consent Management
- Data Processing Records

### 4. AI Service / Orchestrator
- Think Tank AI Responses
- Agent Coordination
- LLM Model Integration
- Prompt Processing

### 5. Analytics Service
- Usage Statistics Aggregation
- Performance Metrics Collection
- Real-time Metrics
- Dashboard Data Provision

### 6. Monitoring Service
- System Health Checks
- Service Status Monitoring
- Performance Data Collection
- Uptime Tracking

### 7. Alert Service
- Alert Rule Evaluation
- Alert Triggering
- Notification Delivery
- Alert History

### 8. Export/Import Service
- CSV Export
- Excel Export
- PDF Export
- Bulk Import Processing

### 9. File Storage Service
- Logo Upload
- Document Storage
- Asset Management

### 10. Compliance Service
- EU AI Act Report Generation
- Risk Assessment Calculation
- Compliance Document Management
- Audit Trail

---

## API SECURITY & RLS REQUIREMENTS

### Supabase Row Level Security (RLS) Policies erforderlich für:

**Users Table**
- Users können nur eigene Daten sehen (außer Admins)
- Nur Admins können alle User sehen
- Nur Admins können User erstellen/bearbeiten/löschen

**Tenants Table**
- User können nur eigenen Tenant sehen
- Tenant-Isolation strikt durchsetzen

**Sessions Table**
- User können nur eigene Sessions sehen
- Auto-Cleanup abgelaufener Sessions

**Activity Logs Table**
- User können nur eigene Logs sehen (außer Admins)
- Logs sind immutable (nur Insert, kein Update/Delete)

**LLM Models Table**
- Nur Admins können Models verwalten
- API Keys verschlüsselt speichern

**Modules Table**
- Nur Admins können Module verwalten
- Risk Assessments sind verpflichtend

**Prompts Table**
- User sehen nur Prompts ihrer Departments
- RLS basierend auf Department-Zugehörigkeit

**Think Tank Sessions**
- User sehen nur eigene Sessions
- Strikte User-Isolation

### API Rate Limiting
- Pro User: 100 Requests/Minute
- Pro Tenant: 1000 Requests/Minute
- Admin Endpoints: 50 Requests/Minute

### Audit Requirements
- Alle CRUD-Operationen müssen geloggt werden
- Besonders kritisch: User-Änderungen, Role-Änderungen, Security-Settings
- GDPR: Data Deletion Requests müssen 30 Tage archiviert werden

---

## EXTERNE API INTEGRATIONEN

### 1. Microsoft Graph API
- Endpoint: https://graph.microsoft.com/v1.0
- Scope: User.Read.All, Group.Read.All
- Authentication: OAuth 2.0
- Rate Limit: 10,000 Requests/10 Minuten

### 2. Google Workspace API
- Endpoint: https://www.googleapis.com/admin/directory/v1
- Scope: https://www.googleapis.com/auth/admin.directory.user.readonly
- Authentication: OAuth 2.0 / Service Account
- Rate Limit: 100 Requests/Sekunde

### 3. LLM Provider APIs
- OpenAI: https://api.openai.com/v1
- Anthropic: https://api.anthropic.com/v1
- Google AI: https://generativelanguage.googleapis.com/v1
- Azure OpenAI: Custom Endpoint

---

## DATENBANK-DESIGN EMPFEHLUNGEN

### Primäre Tabellen (Supabase PostgreSQL)

1. **users**
   - Haupt-User-Tabelle
   - RLS Policy erforderlich
   - Indizes: email, tenant_id, source, status

2. **tenants**
   - Multi-Tenancy Support
   - RLS Policy erforderlich

3. **roles**
   - RBAC System
   - Relationen: role_permissions (many-to-many)

4. **departments**
   - Relationen: user_departments (many-to-many)

5. **llm_models**
   - API Keys verschlüsselt (pgcrypto)

6. **modules**
   - Relationen: module_llm_assignments

7. **eu_ai_act_risk_assessments**
   - Foreign Key zu modules
   - Trigger für Risk Category Calculation

8. **activity_logs**
   - Partitioniert nach Datum (monatlich)
   - Immutable (Trigger)
   - Automatisches Archivieren nach 12 Monaten

9. **sessions**
   - TTL/Expiry Handling
   - Automatisches Cleanup (PostgreSQL Cron Job)

10. **prompt_templates**
    - JSONB für multilingual Content
    - Full-text Search Index

11. **think_tank_sessions**
    - Relationen: thought_entries (one-to-many)

12. **alerts**
    - Relationen: alert_rules

### Wichtige Many-to-Many Relationen

- user_departments
- user_groups
- role_permissions
- department_prompt_categories
- module_llm_assignments

### Erforderliche PostgreSQL Extensions

- pgcrypto (für Verschlüsselung)
- pg_cron (für Scheduled Jobs)
- pg_trgm (für Full-text Search)

---

## ZUSAMMENFASSUNG

**Gesamtzahl identifizierter Screens:** 23

**Gesamtzahl Entities:** 40+

**Kritische Backend Services:** 10

**Externe APIs:** 3 (+ LLM Provider)

**Source Breakdown:**
- DB direkt (Supabase mit RLS): ~70%
- Backend Service: ~25%
- Externe API: ~5%

**Permissions Breakdown:**
- Nur Admin: ~40% der Screens
- Alle User: ~35% der Screens
- Permission offen (zu klären): ~25% der Screens

**Kritische Compliance-Anforderungen:**
- DSGVO/GDPR vollständig
- EU AI Act Risk Assessment
- Activity Logging (Audit Trail)
- Data Retention Policies

---

**Datum der Erstellung:** 2026-02-05  
**Basis:** AI Hub Code-Analyse (vollständig)  
**Status:** Komplett - Alle Screens erfasst
