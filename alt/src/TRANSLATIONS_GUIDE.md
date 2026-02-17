# AI Hub - Vollständiger Übersetzungsleitfaden

Dieses Dokument listet ALLE Texte auf, die in der AI Hub-Anwendung übersetzt werden müssen.

## Sprachen
- **de** - Deutsch (Standard)
- **en** - Englisch
- **fr** - Französisch
- **pt-br** - Portugiesisch (Brasilien)

## Status der Implementierung

### ✅ Bereits implementiert (in i18n.ts vorhanden)
- Common (save, cancel, close, open, settings, loading, error, success, warning)
- Login (Basis)
- Header  
- Admin Menus
- Account Settings
- Agent Settings
- Agents (Email, Normen, Internet, Jelmoli)
- Chat Interface
- Window Actions
- Languages
- Tenant Admin (Basis-Navigation)
- Dashboard
- Tenant Settings (General, Security, Access)
- User Management (Basis)
- Role Management (Basis)
- Data Management (Backups)
- Monitoring (Activity, System, Alerts - Basis)
- Support & Documentation (Basis)
- Models (Basis)
- Module Overview (Basis)

### ❌ FEHLEND - Muss ergänzt werden

#### 1. Login - 2FA Code-Eingabe
**Komponente:** `/components/LoginDialog.tsx`
**Benötigte Texte:**
- "2FA-Verifizierung" / "2FA Verification" / "Vérification 2FA" / "Verificação 2FA"
- "Geben Sie den 6-stelligen Code ein" / "Enter the 6-digit code" / "Entrez le code à 6 chiffres" / "Digite o código de 6 dígitos"
- "Verifikationscode" / "Verification Code" / "Code de vérification" / "Código de Verificação"
- "Code verifizieren" / "Verify Code" / "Vérifier le code" / "Verificar Código"
- "Ungültiger Code" / "Invalid code" / "Code invalide" / "Código inválido"
- "Code erneut senden" / "Resend code" / "Renvoyer le code" / "Reenviar código"

#### 2. Prompts & Frameworks - Vollständige Seite
**Komponente:** `/components/PromptsFrameworks.tsx`
**Benötigte Texte:**

**Tabs:**
- "Prompt-Bibliothek" / "Prompt Library" / "Bibliothèque de Prompts" / "Biblioteca de Prompts"
- "Frameworks" / "Frameworks" / "Frameworks" / "Frameworks"

**Suche:**
- "Prompts durchsuchen..." / "Search prompts..." / "Rechercher prompts..." / "Buscar prompts..."
- "Frameworks durchsuchen..." / "Search frameworks..." / "Rechercher frameworks..." / "Buscar frameworks..."

**Kategorien:**
- "Alle Kategorien" / "All Categories" / "Toutes les Catégories" / "Todas as Categorias"
- "Strategie & Vision" / "Strategy & Vision" / "Stratégie & Vision" / "Estratégia & Visão"
- "Vertrieb & Akquise" / "Sales & Acquisition" / "Ventes & Acquisition" / "Vendas & Aquisição"
- "Marketing & Branding" / "Marketing & Branding" / "Marketing & Branding" / "Marketing & Branding"
- "HR & Recruiting" / "HR & Recruiting" / "RH & Recrutement" / "RH & Recrutamento"
- "Finanzen & Controlling" / "Finance & Controlling" / "Finance & Contrôle" / "Finanças & Controle"
- "Innovation & Entwicklung" / "Innovation & Development" / "Innovation & Développement" / "Inovação & Desenvolvimento"
- "Kommunikation" / "Communication" / "Communication" / "Comunicação"
- "Technologie" / "Technology" / "Technologie" / "Tecnologia"
- "Entscheidungsfindung" / "Decision Making" / "Prise de Décision" / "Tomada de Decisão"
- "Analyse & Insights" / "Analysis & Insights" / "Analyse & Insights" / "Análise & Insights"

**Aktionen:**
- "Prompt kopieren" / "Copy Prompt" / "Copier le Prompt" / "Copiar Prompt"
- "Kopiert!" / "Copied!" / "Copié !" / "Copiado!"
- "Bearbeiten" / "Edit" / "Modifier" / "Editar"
- "Löschen" / "Delete" / "Supprimer" / "Excluir"
- "Neuer Prompt" / "New Prompt" / "Nouveau Prompt" / "Novo Prompt"
- "Neues Framework" / "New Framework" / "Nouveau Framework" / "Novo Framework"

**Edit Panel:**
- "Titel" / "Title" / "Titre" / "Título"
- "Beschreibung" / "Description" / "Description" / "Descrição"
- "Prompt-Text" / "Prompt Text" / "Texte du Prompt" / "Texto do Prompt"
- "Framework-Struktur" / "Framework Structure" / "Structure du Framework" / "Estrutura do Framework"
- "Tags" / "Tags" / "Tags" / "Tags"
- "Prompt speichern" / "Save Prompt" / "Enregistrer le Prompt" / "Salvar Prompt"
- "Framework speichern" / "Save Framework" / "Enregistrer le Framework" / "Salvar Framework"

**Löschen Dialog:**
- "Löschen bestätigen" / "Confirm Deletion" / "Confirmer la Suppression" / "Confirmar Exclusão"
- "Möchten Sie diesen Eintrag wirklich löschen?" / "Are you sure you want to delete this item?" / "Voulez-vous vraiment supprimer cet élément ?" / "Tem certeza de que deseja excluir este item?"

#### 3. Think Tank Panel
**Komponente:** `/components/ThinkTank.tsx` 
**Benötigte Texte:**
- "Think Tank" / "Think Tank" / "Think Tank" / "Think Tank"
- "Multi-Perspektiven Szenario-Analyse" / "Multi-Perspective Scenario Analysis" / "Analyse de Scénario Multi-Perspectives" / "Análise de Cenário Multi-Perspectivas"
- "Szenario / Fragestellung" / "Scenario / Question" / "Scénario / Question" / "Cenário / Questão"
- "Beschreiben Sie Ihr Szenario..." / "Describe your scenario..." / "Décrivez votre scénario..." / "Descreva seu cenário..."
- "Perspektiven" / "Perspectives" / "Perspectives" / "Perspectivas"
- "Perspektive hinzufügen" / "Add Perspective" / "Ajouter une Perspective" / "Adicionar Perspectiva"
- "Entfernen" / "Remove" / "Supprimer" / "Remover"
- "Session starten" / "Start Session" / "Démarrer la Session" / "Iniciar Sessão"
- "Session beenden" / "Stop Session" / "Arrêter la Session" / "Parar Sessão"
- "Session zurücksetzen" / "Reset Session" / "Réinitialiser la Session" / "Redefinir Sessão"
- "Analysiert..." / "Analyzing..." / "Analyse en cours..." / "Analisando..."
- "z.B. CEO, CTO, Kunde..." / "e.g. CEO, CTO, Customer..." / "ex. PDG, CTO, Client..." / "ex. CEO, CTO, Cliente..."

#### 4. Rollen-Management - Erweitert
**Komponente:** `/components/RoleEditPanel.tsx`
**Benötigte Texte:**
- "Neue Rolle erstellen" / "Create New Role" / "Créer un Nouveau Rôle" / "Criar Nova Função"
- "Rolle bearbeiten" / "Edit Role" / "Modifier le Rôle" / "Editar Função"
- "Rollenname" / "Role Name" / "Nom du Rôle" / "Nome da Função"
- "Beschreibung" / "Description" / "Description" / "Descrição"
- "Berechtigungen" / "Permissions" / "Permissions" / "Permissões"
- "Zugewiesene Benutzer" / "Assigned Users" / "Utilisateurs Assignés" / "Usuários Atribuídos"
- "Benutzer auswählen" / "Select Users" / "Sélectionner des Utilisateurs" / "Selecionar Usuários"
- "X Benutzer" / "X Users" / "X Utilisateurs" / "X Usuários"
- "ausgewählt" / "selected" / "sélectionnés" / "selecionados"
- "Benutzer suchen..." / "Search users..." / "Rechercher utilisateurs..." / "Buscar usuários..."
- "Alle Benutzer" / "All Users" / "Tous les Utilisateurs" / "Todos os Usuários"
- "Alle auswählen" / "Select All" / "Tout Sélectionner" / "Selecionar Todos"
- "Alle abwählen" / "Deselect All" / "Tout Désélectionner" / "Desselecionar Todos"
- "Rolle speichern" / "Save Role" / "Enregistrer le Rôle" / "Salvar Função"

#### 5. Benutzerverwaltung - Erweitert
**Komponente:** `/components/UserManagement.tsx`
**Benötigte Texte:**

**Department-Dropdown:**
- "Abteilung" / "Department" / "Département" / "Departamento"
- "Abteilungen" / "Departments" / "Départements" / "Departamentos"
- "Abteilungen auswählen" / "Select Departments" / "Sélectionner des Départements" / "Selecionar Departamentos"
- "X Abteilungen" / "X Departments" / "X Départements" / "X Departamentos"
- "Neue Abteilung" / "New Department" / "Nouveau Département" / "Novo Departamento"

**Toggle:**
- "Alle Nutzer" / "All Users" / "Tous les Utilisateurs" / "Todos os Usuários"
- "Nur aktive Benutzer" / "Active Users Only" / "Utilisateurs Actifs Uniquement" / "Somente Usuários Ativos"

**User Edit Panel:**
- "Benutzer bearbeiten" / "Edit User" / "Modifier l'Utilisateur" / "Editar Usuário"
- "Neuer Benutzer" / "New User" / "Nouvel Utilisateur" / "Novo Usuário"
- "Vorname" / "First Name" / "Prénom" / "Primeiro Nome"
- "Nachname" / "Last Name" / "Nom" / "Sobrenome"
- "Telefonnummer" / "Phone Number" / "Numéro de Téléphone" / "Número de Telefone"
- "Position" / "Position" / "Poste" / "Cargo"
- "Einstellungsdatum" / "Hire Date" / "Date d'Embauche" / "Data de Contratação"
- "Status auswählen" / "Select Status" / "Sélectionner un Statut" / "Selecionar Status"
- "Benutzer speichern" / "Save User" / "Enregistrer l'Utilisateur" / "Salvar Usuário"

#### 6. Modellverwaltung - Create/Edit Panel
**Komponente:** `/components/ModelManagement.tsx`
**Benötigte Texte:**
- "Neues Modell" / "New Model" / "Nouveau Modèle" / "Novo Modelo"
- "Modell bearbeiten" / "Edit Model" / "Modifier le Modèle" / "Editar Modelo"
- "Modelltyp" / "Model Type" / "Type de Modèle" / "Tipo de Modelo"
- "API-Schlüssel" / "API Key" / "Clé API" / "Chave API"
- "Endpunkt" / "Endpoint" / "Point de Terminaison" / "Endpoint"
- "Maximale Tokens" / "Max Tokens" / "Tokens Maximum" / "Tokens Máximos"
- "Temperatur" / "Temperature" / "Température" / "Temperatura"
- "Top P" / "Top P" / "Top P" / "Top P"
- "Modell speichern" / "Save Model" / "Enregistrer le Modèle" / "Salvar Modelo"
- "Modell testen" / "Test Model" / "Tester le Modèle" / "Testar Modelo"

#### 7. Modul-Übersicht - Add Agent Panel
**Komponente:** `/components/ModuleOverview.tsx`
**Benötigte Texte:**
- "Neuer Agent" / "New Agent" / "Nouvel Agent" / "Novo Agente"
- "Agent bearbeiten" / "Edit Agent" / "Modifier l'Agent" / "Editar Agente"
- "Agent-Name" / "Agent Name" / "Nom de l'Agent" / "Nome do Agente"
- "Agent-Typ" / "Agent Type" / "Type d'Agent" / "Tipo de Agente"
- "Fähigkeiten" / "Capabilities" / "Capacités" / "Capacidades"
- "Fähigkeit hinzufügen" / "Add Capability" / "Ajouter une Capacité" / "Adicionar Capacidade"
- "z.B. E-Mail versenden..." / "e.g. Send emails..." / "ex. Envoyer des emails..." / "ex. Enviar emails..."
- "Agent speichern" / "Save Agent" / "Enregistrer l'Agent" / "Salvar Agente"

#### 8. Alerts Management - Create Alert Panel
**Komponente:** `/components/AlertsManagement.tsx`
**Benötigte Texte:**
- "Neuer Alert" / "New Alert" / "Nouvelle Alerte" / "Novo Alerta"
- "Alert bearbeiten" / "Edit Alert" / "Modifier l'Alerte" / "Editar Alerta"
- "Alert-Name" / "Alert Name" / "Nom de l'Alerte" / "Nome do Alerta"
- "Alert-Typ" / "Alert Type" / "Type d'Alerte" / "Tipo de Alerta"
- "Nachricht" / "Message" / "Message" / "Mensagem"
- "Schwellenwert" / "Threshold" / "Seuil" / "Limite"
- "Empfänger" / "Recipients" / "Destinataires" / "Destinatários"
- "Empfänger hinzufügen" / "Add Recipient" / "Ajouter un Destinataire" / "Adicionar Destinatário"
- "E-Mail-Benachrichtigung" / "Email Notification" / "Notification par Email" / "Notificação por Email"
- "SMS-Benachrichtigung" / "SMS Notification" / "Notification par SMS" / "Notificação por SMS"
- "Alert speichern" / "Save Alert" / "Enregistrer l'Alerte" / "Salvar Alerta"

#### 9. Support & Dokumentation - FAQ Panel
**Komponente:** `/components/SupportDocumentation.tsx`
**Benötigte Texte:**

**FAQ Management:**
- "FAQ verwalten" / "Manage FAQ" / "Gérer FAQ" / "Gerenciar FAQ"
- "Neue FAQ" / "New FAQ" / "Nouvelle FAQ" / "Nova FAQ"
- "FAQ bearbeiten" / "Edit FAQ" / "Modifier FAQ" / "Editar FAQ"
- "Frage" / "Question" / "Question" / "Pergunta"
- "Antwort" / "Answer" / "Réponse" / "Resposta"
- "FAQ speichern" / "Save FAQ" / "Enregistrer FAQ" / "Salvar FAQ"
- "FAQ löschen" / "Delete FAQ" / "Supprimer FAQ" / "Excluir FAQ"

**Ticket Success Dialog:**
- "Ticket erfolgreich erstellt" / "Ticket Successfully Created" / "Ticket Créé avec Succès" / "Ticket Criado com Sucesso"
- "Ihr Support-Ticket wurde erfolgreich erstellt." / "Your support ticket has been successfully created." / "Votre ticket de support a été créé avec succès." / "Seu ticket de suporte foi criado com sucesso."
- "Ticket-Nummer" / "Ticket Number" / "Numéro de Ticket" / "Número do Ticket"
- "Zurück zum Support" / "Back to Support" / "Retour au Support" / "Voltar ao Suporte"
- "Ticket ansehen" / "View Ticket" / "Voir le Ticket" / "Ver Ticket"

#### 10. Sidebar - Prompts & Frameworks Eintrag
**Komponente:** `/components/TenantSidebar.tsx`
**Status:** Bereits vorhanden als "Prompts & Frameworks"
**Überprüfen:** Sub-Items
- "Prompt-Bibliothek" / "Prompt Library" / "Bibliothèque de Prompts" / "Biblioteca de Prompts"
- "Frameworks" / "Frameworks" / "Frameworks" / "Frameworks"

## Implementierungs-Checkliste

### Phase 1: Core Extensions (Höchste Priorität)
- [ ] Login 2FA Code-Eingabe
- [ ] Rollen-Management erweiterte Features
- [ ] Benutzerverwaltung erweiterte Features
- [ ] Prompts & Frameworks komplett

### Phase 2: Admin Panels (Hohe Priorität)
- [ ] Model Management Extended
- [ ] Module Overview Extended
- [ ] Alerts Management Extended
- [ ] Support Documentation Extended

### Phase 3: Advanced Features (Mittlere Priorität)
- [ ] Think Tank Panel

### Phase 4: Qualitätssicherung
- [ ] Alle Tooltips überprüfen
- [ ] Alle Placeholder-Texte überprüfen
- [ ] Alle Fehlermeldungen überprüfen
- [ ] Alle Success-Meldungen überprüfen
- [ ] Konsistenz zwischen Komponenten prüfen

## Verwendung in Komponenten

Nach Integration in i18n.ts können die Übersetzungen so verwendet werden:

```typescript
import { useLanguage } from '../utils/i18n';

const MyComponent = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t.promptsFrameworks.title}</h1>
      <Button>{t.roleManagement.newRole}</Button>
    </div>
  );
};
```

## Nächste Schritte

1. Erweitern Sie das `Translations` Interface in `/utils/i18n.ts` mit allen fehlenden Feldern
2. Fügen Sie die deutschen Übersetzungen hinzu (de-Objekt)
3. Fügen Sie die englischen Übersetzungen hinzu (en-Objekt)
4. Fügen Sie die französischen Übersetzungen hinzu (fr-Objekt)
5. Fügen Sie die portugiesischen Übersetzungen hinzu (pt-br-Objekt)
6. Aktualisieren Sie jede Komponente, um `useLanguage()` Hook zu verwenden
7. Ersetzen Sie alle hardcodierten Texte durch Übersetzungsaufrufe

## Hinweise

- Alle Übersetzungen sind bereits in `/utils/i18n-extensions.ts` vorbereitet
- Diese müssen in die Haupt-i18n.ts-Datei integriert werden
- Achten Sie auf Konsistenz bei Begriffen (z.B. "Benutzer" vs "Nutzer")
- Verwenden Sie formelle Anrede ("Sie" statt "du") in deutschen Texten
- Behalten Sie Markennamen und Produktnamen unübersetzt (z.B. "AI Hub", "Think Tank")
