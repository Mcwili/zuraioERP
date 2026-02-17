// Extended translations for missing areas
// This file contains translations that need to be added to i18n.ts

export interface ExtendedTranslations {
  // Login - 2FA
  twoFactorCode: {
    title: string;
    subtitle: string;
    codeLabel: string;
    codePlaceholder: string;
    verifyButton: string;
    invalidCode: string;
    resendCode: string;
  };

  // Prompts & Frameworks
  promptsFrameworks: {
    title: string;
    library: string;
    frameworks: string;
    searchPrompts: string;
    searchFrameworks: string;
    category: string;
    allCategories: string;
    copyPrompt: string;
    copied: string;
    edit: string;
    delete: string;
    newPrompt: string;
    newFramework: string;
    promptTitle: string;
    promptDescription: string;
    promptText: string;
    frameworkStructure: string;
    tags: string;
    savePrompt: string;
    saveFramework: string;
    cancel: string;
    deleteConfirm: string;
    deleteMessage: string;
    
    // Categories
    categories: {
      strategy: string;
      sales: string;
      marketing: string;
      hr: string;
      finance: string;
      innovation: string;
      communication: string;
      technology: string;
      decision: string;
      analysis: string;
    };
  };

  // Think Tank
  thinkTank: {
    title: string;
    subtitle: string;
    scenario: string;
    scenarioPlaceholder: string;
    perspectives: string;
    addPerspective: string;
    removePerspective: string;
    startSession: string;
    stopSession: string;
    clearSession: string;
    thinking: string;
    perspectivePlaceholder: string;
    sessionActive: string;
  };

  // Think Tank Panel (Sidebar)
  thinkTankPanel: {
    title: string;
    pinboard: string;
    noPinnedItems: string;
    chats: string;
    spaces: string;
    prompts: string;
    archive: string;
    trash: string;
    sortByDate: string;
    sortAlphabetically: string;
    ascending: string;
    descending: string;
    searchChats: string;
    searchSpaces: string;
    searchPrompts: string;
    newSpace: string;
    newCategory: string;
    spaceName: string;
    categoryName: string;
    create: string;
    dateGroups: {
      today: string;
      yesterday: string;
      lastWeek: string;
      lastMonth: string;
      older: string;
    };
    restore: string;
    deleteConfirmTitle: string;
    deleteConfirmMessage: string;
    deletePermanently: string;
    emptyTrash: string;
    emptyArchive: string;
    backToChats: string;
  };

  // Support & Documentation
  supportDocumentation: {
    title: string;
    documentation: {
      searchTitle: string;
      searchDescription: string;
      searchPlaceholder: string;
      learnMore: string;
      noDocsFound: string;
      items: {
        gettingStarted: { title: string; description: string; category: string; };
        userRoleManagement: { title: string; description: string; category: string; };
        agentConfiguration: { title: string; description: string; category: string; };
        backupRecovery: { title: string; description: string; category: string; };
        securityCompliance: { title: string; description: string; category: string; };
        apiDocumentation: { title: string; description: string; category: string; };
        monitoringLogging: { title: string; description: string; category: string; };
        troubleshooting: { title: string; description: string; category: string; };
      };
    };
    faq: {
      items: {
        twoFactorAuth: { question: string; answer: string; };
        automaticBackups: { question: string; answer: string; };
        aiModels: { question: string; answer: string; };
        customAgents: { question: string; answer: string; };
        concurrentUsers: { question: string; answer: string; };
        dataEncryption: { question: string; answer: string; };
        restoreMessages: { question: string; answer: string; };
        supportedLanguages: { question: string; answer: string; };
      };
    };
    tutorials: {
      title: string;
      description: string;
      items: {
        gettingStarted: { title: string; description: string; duration: string; };
        userRoleManagement: { title: string; description: string; duration: string; };
        modelConfiguration: { title: string; description: string; duration: string; };
        agentSetup: { title: string; description: string; duration: string; };
        backupRecovery: { title: string; description: string; duration: string; };
        monitoringAlerts: { title: string; description: string; duration: string; };
      };
    };
    ticketStatus: {
      open: string;
      inProgress: string;
      resolved: string;
      closed: string;
    };
    ticketPriority: {
      low: string;
      medium: string;
      high: string;
      urgent: string;
    };
  };

  // Taskbar
  taskbar: {
    startMenu: string;
    applications: string;
    agentManagement: string;
    systemSettings: string;
    options: string;
    recentApps: string;
    search: string;
    searchPlaceholder: string;
    powerOptions: string;
    logout: string;
    shutdown: string;
    restart: string;
  };

  // Module Manager
  moduleManager: {
    title: string;
    subtitle: string;
    activeOf: string;
    userRole: string;
    administrator: string;
    user: string;
    configure: string;
    status: {
      active: string;
      inactive: string;
      error: string;
      unknown: string;
    };
    access: {
      admin: string;
      premium: string;
      standard: string;
    };
    usage: string;
    accessDenied: string;
    adminRequired: string;
    premiumRequired: string;
    unavailableModules: string;
    unavailableSubtitle: string;
    modules: {
      chatAgent: {
        name: string;
        description: string;
      };
      documentAnalyzer: {
        name: string;
        description: string;
      };
      webSearch: {
        name: string;
        description: string;
      };
      calendarAssistant: {
        name: string;
        description: string;
      };
      emailProcessor: {
        name: string;
        description: string;
      };
      dataAnalyst: {
        name: string;
        description: string;
      };
      securityMonitor: {
        name: string;
        description: string;
      };
      databaseConnector: {
        name: string;
        description: string;
      };
    };
  };

  // Role Management Extended
  roleManagement: {
    newRole: string;
    editRole: string;
    roleName: string;
    roleDescription: string;
    permissions: string;
    assignedUsers: string;
    selectUsers: string;
    usersSelected: string;
    user: string;
    users: string;
    searchUsers: string;
    allUsers: string;
    selectAll: string;
    deselectAll: string;
    saveRole: string;
    cancel: string;
    deleteRole: string;
    roleCreated: string;
    roleUpdated: string;
  };

  // User Management Extended
  userManagementExtended: {
    department: string;
    departments: string;
    selectDepartments: string;
    departmentsSelected: string;
    newDepartment: string;
    allUsers: string;
    filterByDepartment: string;
    showAllUsers: string;
    showActiveOnly: string;
    userDetails: string;
    editUser: string;
    newUser: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    position: string;
    hireDate: string;
    selectRole: string;
    selectStatus: string;
    userCreated: string;
    userUpdated: string;
    // Additional fields for UserManagement
    addUser: string;
    exportCSV: string;
    import: string;
    syncUsers: string;
    syncSuccess: string;
    syncSuccessMessage: string;
    mergeUsers: string;
    duplicatesFound: string;
    mergeWarning: string;
    groupsLabel: string;
    lastLogin: string;
    sortBy: string;
    filterBy: string;
    source: string;
    status: string;
    statusActive: string;
    statusInactive: string;
    statusLocked: string;
    deleteUser: string;
    deleteUserConfirm: string;
    deleteUserMessage: string;
    viewer: string;
    admin: string;
    powerUser: string;
    user: string;
    localUser: string;
   };

  // Alerts Management
  alertsManagement: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    newAlert: string;
    types: {
      error: string;
      warning: string;
      info: string;
    };
    severity: {
      critical: string;
      warning: string;
      info: string;
    };
    table: {
      name: string;
      type: string;
      condition: string;
      threshold: string;
      channels: string;
      triggers: string;
      lastTrigger: string;
      status: string;
      actions: string;
    };
    channels: {
      email: string;
      slack: string;
    };
    status: {
      active: string;
      inactive: string;
    };
    actions: {
      newAlert: string;
      duplicate: string;
      edit: string;
      delete: string;
    };
    notificationChannels: {
      title: string;
      subtitle: string;
    };
    panel: {
      editAlert: string;
      createAlert: string;
    };
    form: {
      basicInfo: string;
      alertName: string;
      alertNamePlaceholder: string;
      alertNameHelper: string;
      type: string;
      conditions: string;
      condition: string;
      conditionPlaceholder: string;
      conditionHelper: string;
      threshold: string;
      thresholdPlaceholder: string;
      channels: string;
      selectChannels: string;
      email: string;
      slack: string;
      saveButton: string;
      cancelButton: string;
    };
    deleteDialog: {
      title: string;
      description: string;
      cancel: string;
      confirm: string;
    };
  };

  // System Monitoring
  systemMonitoring: {
    title: string;
    subtitle: string;
    network: string;
    online: string;
    offline: string;
    restricted: string;
    metrics: {
      title: string;
      cpu: string;
      memory: string;
      disk: string;
      network: string;
    };
    services: {
      title: string;
      status: string;
      uptime: string;
      responseTime: string;
      online: string;
      offline: string;
      degraded: string;
    };
    requests: {
      title: string;
      subtitle: string;
    };
    performance: {
      title: string;
      subtitle: string;
    };
    database: {
      title: string;
      connections: string;
      queries: string;
      cacheHitRate: string;
    };
  };

  // Activity Log Extended
  activityLogExtended: {
    sort: string;
    resetFilter: string;
    successful: string;
    warning: string;
    error: string;
    information: string;
    timestamp: string;
    user: string;
    action: string;
    resource: string;
    ipAddress: string;
    detailsColumn: string;
    noDetails: string;
    exportFilename: string;
    actions: {
      login: string;
      apiRateLimitReached: string;
    };
    resources: {
      emailAgent: string;
    };
    details: {
      fullBackupSuccess: string;
      rateLimitReached: string;
      newUser: string;
      roleAssigned: string;
      memoryTokenUpdated: string;
      timeoutAfter30s: string;
    };
  };

  // Tenant Settings Extended
  tenantSettingsExtended: {
    // General Settings
    general: {
      tenantInformation: string;
      tenantInformationDesc: string;
      tenantName: string;
      tenantLogo: string;
      logoUploaded: string;
      noLogoSelected: string;
      preview: string;
      white: string;
      gray: string;
      black: string;
      logoPreview: string;
      primaryColor: string;
      accentColor: string;
    };
    // Company Information
    company: {
      companyInformation: string;
      companyInformationDesc: string;
      masterEntryNote: string;
      companyName: string;
      uidTaxNumber: string;
      phoneNumber: string;
      email: string;
      domain: string;
      address: string;
      zipCode: string;
      city: string;
    };
    // Regional Settings
    regional: {
      regionalSettings: string;
      regionalSettingsDesc: string;
      language: string;
      languageGerman: string;
      languageEnglish: string;
      languageFrench: string;
      languageItalian: string;
      timezone: string;
      timezoneZurich: string;
      timezoneBerlin: string;
      timezoneUTC: string;
      currency: string;
      currencyCHF: string;
      currencyEUR: string;
      currencyUSD: string;
      dateFormat: string;
      dateFormatDDMMYYYY: string;
      dateFormatMMDDYYYY: string;
      dateFormatYYYYMMDD: string;
    };
    // Security - Password Policies
    security: {
      passwordPolicies: string;
      passwordPoliciesDesc: string;
      minPasswordLength: string;
      minPasswordLengthDesc: string;
      uppercaseRequired: string;
      uppercaseRequiredDesc: string;
      digitsRequired: string;
      digitsRequiredDesc: string;
      specialCharsRequired: string;
      specialCharsRequiredDesc: string;
      passwordExpiry: string;
      passwordExpiryDesc: string;
      // 2FA
      twoFactorAuth: string;
      twoFactorAuthDesc: string;
      enforce2FAAll: string;
      enforce2FAAllDesc: string;
      enforce2FAAdmins: string;
      enforce2FAAdminsDesc: string;
      // Session
      sessionSettings: string;
      sessionSettingsDesc: string;
      sessionTimeout: string;
      sessionTimeoutDesc: string;
      absoluteSessionDuration: string;
      absoluteSessionDurationDesc: string;
      // Privacy & Compliance
      privacyCompliance: string;
      privacyComplianceDesc: string;
      gdprMode: string;
      gdprModeDesc: string;
      swissDSG: string;
      swissDSGDesc: string;
      dataRetention: string;
      dataRetentionDesc: string;
      archiveBeforeDeletion: string;
      archiveBeforeDeletionDesc: string;
      // EU AI Act
      euAiAct: string;
      euAiActDesc: string;
      enableEuAiActCompliance: string;
      enableEuAiActComplianceDesc: string;
      riskClassification: string;
      riskClassificationDesc: string;
      aiSystemDocumentation: string;
      aiSystemDocumentationDesc: string;
      humanOversightRequired: string;
      humanOversightRequiredDesc: string;
      // EU AI Act - Status Overview
      systemStatusOverview: string;
      systemStatusOverviewDesc: string;
      isHighRiskSystem: string;
      highRiskSystemYes: string;
      highRiskSystemNo: string;
      highRiskAdditionalObligations: string;
      assessmentDate: string;
      assessedBy: string;
      euAiActLink: string;
      registrationStatus: string;
      registrationComplete: string;
      registrationPending: string;
      // EU AI Act - Anhang III Categories
      annexIIICategories: string;
      annexIIICategoriesDesc1: string;
      annexIIICategoriesDesc2: string;
      biometricIdentification: string;
      biometricIdentificationDesc: string;
      criticalInfrastructure: string;
      criticalInfrastructureDesc: string;
      educationTraining: string;
      educationTrainingDesc: string;
      employmentManagement: string;
      employmentManagementDesc: string;
      essentialServices: string;
      essentialServicesDesc: string;
      lawEnforcement: string;
      lawEnforcementDesc: string;
      migrationBorderControl: string;
      migrationBorderControlDesc: string;
      justiceDemo: string;
      justiceDemoDesc: string;
      // Registered High-Risk AI System
      registeredHighRiskSystem: string;
      registeredHighRiskSystemDesc: string;
      registration: string;
      conformityMarking: string;
      technicalDocumentation: string;
      download: string;
      // Transparency Requirements
      transparencyRequirements: string;
      transparencyRequirementsDesc: string;
      aiNoticeDisplay: string;
      aiNoticeDisplayDesc: string;
      orchestratorBasis: string;
      orchestratorBasisDesc: string;
      responsibilities: string;
      responsibilitiesDesc: string;
      humanInLoop: string;
      humanInLoopDesc: string;
      // Technical Security Measures
      technicalSecurityMeasures: string;
      technicalSecurityMeasuresDesc: string;
      killswitch: string;
      killswitchDesc: string;
      killswitchActiveWarning: string;
      twoFactorAuthReference: string;
      twoFactorAuthReferenceDesc: string;
      whitelistReference: string;
      whitelistReferenceDesc: string;
      tenantRolesReference: string;
      tenantRolesReferenceDesc: string;
      loggingDataReference: string;
      loggingDataReferenceDesc: string;
      systemCriticalAlerts: string;
      systemCriticalAlertsDesc: string;
      backupRecoveryReference: string;
      backupRecoveryReferenceDesc: string;
      goTo: string;
      // Human Oversight
      humanOversight: string;
      humanOversightDesc: string;
      humanInLoopOversight: string;
      reviewResetLimit: string;
      reviewResetLimitDesc: string;
      staffTraining: string;
      staffTrainingDesc: string;
      feedbackReporting: string;
      feedbackReportingDesc: string;
      auditTrail: string;
      auditTrailDesc: string;
      oversightDocumentation: string;
      oversightDocumentationDesc: string;
      download: string;
    };
    // Access Settings
    access: {
      singleSignOn: string;
      singleSignOnDesc: string;
      enableSSO: string;
      enableSSODesc: string;
      identityProvider: string;
      noProvider: string;
      azureAD: string;
      googleIdentity: string;
      okta: string;
      customSAML: string;
      azureConfiguration: string;
      tenantID: string;
      tenantIDPlaceholder: string;
      clientID: string;
      clientIDPlaceholder: string;
      clientSecret: string;
      clientSecretPlaceholder: string;
      testConnection: string;
      notConnected: string;
      connected: string;
      connectionError: string;
      testing: string;
      connectionSuccessful: string;
      ipWhitelist: string;
      ipWhitelistDesc: string;
      enableIPWhitelist: string;
      enableIPWhitelistDesc: string;
      allowedIPs: string;
      ipAddress: string;
      ipAddressPlaceholder: string;
      addIP: string;
      ipWarning: string;
      ipFormatError: string;
      ssoRequirements: string;
      ssoRequirementsDesc: string;
      enforce2FAForSSO: string;
      enforce2FAForSSODesc: string;
      verifiedEmailOnly: string;
      verifiedEmailOnlyDesc: string;
      autoTokenRefresh: string;
      autoTokenRefreshDesc: string;
    };
    // DSGVO/GDPR Settings
    dsgvo: {
      basicFunctions: string;
      basicFunctionsDesc: string;
      datenschutzmodus: string;
      datenschutzmodusDesc: string;
      memory: string;
      memoryDesc: string;
      memorySettings: string;
      duration: string;
      deleteAfterSession: string;
      backup: string;
      backupDesc: string;
      agentLogging: string;
      agentLoggingDesc: string;
      agentLoggingSettings: string;
      onlySystemDiagnose: string;
      // Transparenz & Informationen
      transparencyInformation: string;
      transparencyInformationDesc: string;
      verantwortlicher: string;
      verantwortlicherDesc: string;
      verantwortlicherAnbieter: string;
      verantwortlicherTenant: string;
      verantwortlicherOther: string;
      verantwortlicherPlaceholder: string;
      selectOption: string;
      zwecke: string;
      zweckeDesc: string;
      zweckKontextverarbeitung: string;
      zweckAgentenwahl: string;
      zweckNormenVorschlaege: string;
      zweckMemory: string;
      zweckRAGSuche: string;
      zweckFehleranalyse: string;
      zweckProtokollierung: string;
      rechtsgrundlage: string;
      rechtsgrundlageDesc: string;
      rechtsgrundlageBerechtigtesInteresse: string;
      rechtsgrundlageEinwilligung: string;
      rechtsgrundlageVertragserfuellung: string;
      rechtsgrundlageRechtlicheVerpflichtung: string;
      rechtsgrundlageOeffentlichesInteresse: string;
      datenkategorien: string;
      datenkategorienDesc: string;
      datenkategorieTexteingaben: string;
      datenkategorieAgentenantworten: string;
      datenkategorieGespraechsverlauf: string;
      datenkategorieDateiuploads: string;
      datenkategorieMetadaten: string;
      datenkategorieNutzerprofil: string;
      datenkategorieRAGErgebnisse: string;
      datenkategorieSystemprotokolle: string;
      empfaenger: string;
      empfaengerDesc: string;
      empfaengerLLMAnbieter: string;
      empfaengerLokaleModelle: string;
      empfaengerInterneAgenten: string;
      empfaengerExterneAgenten: string;
      empfaengerRAGDienste: string;
      empfaengerMonitoringLogging: string;
      empfaengerBackupSysteme: string;
      speicherdauer: string;
      speicherdauerDesc: string;
      deactivated: string;
      afterEachSession: string;
      systemDiagnose: string;
      rechte: string;
      rechteDesc: string;
      rechtAuskunft: string;
      rechtBerichtigung: string;
      rechtLoeschung: string;
      rechtEinschraenkung: string;
      rechtWiderspruch: string;
      rechtDatenuebertragbarkeit: string;
      rechtWiderruf: string;
      drittland: string;
      drittlandDesc: string;
      drittlandKeine: string;
      drittlandUSASCCs: string;
      drittlandUSATIA: string;
      drittlandEUEWR: string;
      drittlandAndereSCCs: string;
      drittlandLokal: string;
      automationNotice: string;
      automationNoticeDesc: string;
      aiNotice: string;
      aiNoticeText: string;
      selected: string;
      // Dokumentierte Verarbeitungstätigkeiten
      documentedProcessingActivities: string;
      documentedProcessingActivitiesDesc: string;
      providerSystemLevel: string;
      providerSystemLevelDesc: string;
      contextStorageOrchestrator: string;
      loggingAccessErrors: string;
      communicationAgentsAPI: string;
      download: string;
      tenantLevel: string;
      tenantLevelDesc: string;
      tenantLevelItem1: string;
      tenantLevelItem2: string;
      tenantLevelItem3: string;
      // Datenschutz-Folgenabschätzung (DSFA)
      dsfaTitle: string;
      dsfaDesc: string;
      dsfaResponsibility: string;
      dsfaResponsibilityItem1: string;
      dsfaResponsibilityItem2: string;
      dsfaRiskAssessment: string;
      dsfaRiskAssessmentDesc: string;
      dsfaGoTo: string;
      dsfaAdditional: string;
      dsfaAdditionalItem1: string;
      dsfaAdditionalItem2: string;
      dsfaAdditionalItem3: string;
      // Time units
      day: string;
      days: string;
      week: string;
      weeks: string;
      month: string;
      months: string;
      // Rechte der Betroffenen
      rightsOfDataSubjects: string;
      rightsOfDataSubjectsDesc: string;
      rightAuskunftTitle: string;
      rightAuskunftDesc1: string;
      rightAuskunftDesc2: string;
      rightBerichtigungTitle: string;
      rightBerichtigungDesc1: string;
      rightBerichtigungDesc2: string;
      rightLoeschungTitle: string;
      rightLoeschungDesc1: string;
      rightLoeschungDesc2: string;
      rightEinschraenkungTitle: string;
      rightEinschraenkungDesc1: string;
      rightEinschraenkungDesc2: string;
      rightEinschraenkungMemory: string;
      rightEinschraenkungPersonalisierung: string;
      rightEinschraenkungProfilbildung: string;
      rightEinschraenkungAgentenwahl: string;
      personalization: string;
      profiling: string;
      automatedAgentSelection: string;
      rightDatenuebertragbarkeitTitle: string;
      rightDatenuebertragbarkeitDesc1: string;
      rightDatenuebertragbarkeitDesc2: string;
      rightWiderspruchTitle: string;
      rightWiderspruchDesc1: string;
      rightWiderspruchQuote: string;
      rightNoAutomatedDecision: string;
      rightNoAutomatedDecisionDesc: string;
      goTo: string;
      // Auftragsverarbeitung
      dataProcessingAccess: string;
      dataProcessingAccessDesc: string;
      contractualModel: string;
      contractualModelText: string;
      standardNoAccess: string;
      standardNoAccessModel: string;
      standardNoAccessDesc: string;
      standardNoAccessItem1: string;
      standardNoAccessItem2: string;
      standardNoAccessItem3: string;
      standardNoAccessItem4: string;
      standardNoAccessNote: string;
      optionalSupportAccess: string;
      optionalSupportAccessModel: string;
      optionalSupportAccessDesc: string;
      optionalSupportAccessItem1: string;
      optionalSupportAccessItem2: string;
      optionalSupportAccessItem3: string;
      optionalSupportAccessNote: string;
      accessLogged: string;
    };
  };

  // Chat Interface
  chatExtended: {
    filesAttached: string;
  };

  // User Approval Status
  authorized: string;
  notAuthorized: string;
};

// German translations
export const extendedTranslationsDE: ExtendedTranslations = {
  twoFactorCode: {
    title: '2FA-Verifizierung',
    subtitle: 'Geben Sie den 6-stelligen Code ein',
    codeLabel: 'Verifikationscode',
    codePlaceholder: '000000',
    verifyButton: 'Code verifizieren',
    invalidCode: 'Ungültiger Code',
    resendCode: 'Code erneut senden'
  },

  promptsFrameworks: {
    title: 'Prompts & Frameworks',
    library: 'Prompt-Bibliothek',
    frameworks: 'Frameworks',
    searchPrompts: 'Prompts durchsuchen...',
    searchFrameworks: 'Frameworks durchsuchen...',
    category: 'Kategorie',
    allCategories: 'Alle Kategorien',
    copyPrompt: 'Prompt kopieren',
    copied: 'Kopiert!',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    newPrompt: 'Neuer Prompt',
    newFramework: 'Neues Framework',
    promptTitle: 'Titel',
    promptDescription: 'Beschreibung',
    promptText: 'Prompt-Text',
    frameworkStructure: 'Framework-Struktur',
    tags: 'Tags',
    savePrompt: 'Prompt speichern',
    saveFramework: 'Framework speichern',
    cancel: 'Abbrechen',
    deleteConfirm: 'Löschen bestätigen',
    deleteMessage: 'Möchten Sie diesen Eintrag wirklich löschen?',

    categories: {
      strategy: 'Strategie & Vision',
      sales: 'Vertrieb & Akquise',
      marketing: 'Marketing & Branding',
      hr: 'HR & Recruiting',
      finance: 'Finanzen & Controlling',
      innovation: 'Innovation & Entwicklung',
      communication: 'Kommunikation',
      technology: 'Technologie',
      decision: 'Entscheidungsfindung',
      analysis: 'Analyse & Insights'
    }
  },

  thinkTank: {
    title: 'Think Tank',
    subtitle: 'Multi-Perspektiven Szenario-Analyse',
    scenario: 'Szenario / Fragestellung',
    scenarioPlaceholder: 'Beschreiben Sie Ihr Szenario oder Ihre Fragestellung...',
    perspectives: 'Perspektiven',
    addPerspective: 'Perspektive hinzufügen',
    removePerspective: 'Entfernen',
    startSession: 'Session starten',
    stopSession: 'Session beenden',
    clearSession: 'Session zurücksetzen',
    thinking: 'Analysiert...',
    perspectivePlaceholder: 'z.B. CEO, CTO, Kunde, Investor...',
    sessionActive: 'Session aktiv'
  },

  thinkTankPanel: {
    title: 'Think Tank',
    pinboard: 'Pinwand',
    noPinnedItems: 'Keine angepinnten Elemente',
    chats: 'Chats',
    spaces: 'Spaces',
    prompts: 'Prompts',
    archive: 'Archiv',
    trash: 'Papierkorb',
    sortByDate: 'Nach Datum sortieren',
    sortAlphabetically: 'Alphabetisch sortieren',
    ascending: 'Aufsteigend',
    descending: 'Absteigend',
    searchChats: 'Chats durchsuchen...',
    searchSpaces: 'Spaces durchsuchen...',
    searchPrompts: 'Prompts durchsuchen...',
    newSpace: 'Neuer Space',
    newCategory: 'Neue Kategorie',
    spaceName: 'Space-Name',
    categoryName: 'Kategorie-Name',
    create: 'Erstellen',
    dateGroups: {
      today: 'Heute',
      yesterday: 'Gestern',
      lastWeek: 'Letzte Woche',
      lastMonth: 'Letzter Monat',
      older: 'Älter'
    },
    restore: 'Wiederherstellen',
    deleteConfirmTitle: 'Endgültig löschen?',
    deleteConfirmMessage: 'Dieses Element wird dauerhaft gelöscht.',
    deletePermanently: 'Endgültig löschen',
    emptyTrash: 'Papierkorb ist leer',
    emptyArchive: 'Archiv ist leer',
    backToChats: 'Zurück zu Chats'
  },

  supportDocumentation: {
    title: 'Support & Dokumentation',
    documentation: {
      searchTitle: 'Dokumentation durchsuchen',
      searchDescription: 'Finden Sie Anleitungen, Best Practices und technische Dokumentation',
      searchPlaceholder: 'Dokumentation durchsuchen...',
      learnMore: 'Mehr erfahren',
      noDocsFound: 'Keine Dokumentation gefunden',
      items: {
        gettingStarted: {
          title: 'Erste Schritte mit AI Hub',
          description: 'Lernen Sie die Grundlagen der Plattform kennen und richten Sie Ihre erste Umgebung ein.',
          category: 'Erste Schritte'
        },
        userRoleManagement: {
          title: 'Benutzer- & Rollenverwaltung',
          description: 'Verwalten Sie Benutzer, Rollen und Berechtigungen in Ihrem Tenant.',
          category: 'Administration'
        },
        agentConfiguration: {
          title: 'Agent-Konfiguration',
          description: 'Detaillierte Anleitung zur Konfiguration der verschiedenen AI-Agenten.',
          category: 'Agenten'
        },
        backupRecovery: {
          title: 'Backup & Recovery',
          description: 'Erstellen Sie Backups und stellen Sie Ihre Daten im Notfall wieder her.',
          category: 'Data Management'
        },
        securityCompliance: {
          title: 'Sicherheit & Compliance',
          description: 'Best Practices für Sicherheit, 2FA und Compliance-Anforderungen.',
          category: 'Sicherheit'
        },
        apiDocumentation: {
          title: 'API-Dokumentation',
          description: 'Vollständige Referenz der AI Hub REST API für Entwickler.',
          category: 'Entwickler'
        },
        monitoringLogging: {
          title: 'Monitoring & Logging',
          description: 'Überwachen Sie Systemleistung und analysieren Sie Aktivitätsprotokolle.',
          category: 'Monitoring'
        },
        troubleshooting: {
          title: 'Troubleshooting Guide',
          description: 'Lösungen für häufige Probleme und Fehlermeldungen.',
          category: 'Troubleshooting'
        }
      }
    },
    faq: {
      items: {
        twoFactorAuth: {
          question: 'Wie aktiviere ich die Zwei-Faktor-Authentifizierung?',
          answer: 'Die 2FA können Sie in Ihren Tenant-Einstellungen unter \'Sicherheit & Compliance\' aktivieren. Nach der Aktivierung erhalten alle Benutzer bei der nächsten Anmeldung eine Aufforderung zur Einrichtung.'
        },
        automaticBackups: {
          question: 'Wie oft werden automatische Backups erstellt?',
          answer: 'Automatische Backups werden standardmäßig täglich um 02:00 Uhr erstellt. Sie können die Häufigkeit und den Zeitpunkt unter \'Data Management > Backups & Wiederherstellung\' anpassen.'
        },
        aiModels: {
          question: 'Welche AI-Modelle werden unterstützt?',
          answer: 'AI Hub unterstützt GPT-4, GPT-4 Turbo, GPT-3.5 Turbo, Claude 3 Opus, Claude 3 Sonnet und weitere Modelle. Die vollständige Liste finden Sie unter \'Module & Features > Modelle\'.'
        },
        customAgents: {
          question: 'Kann ich eigene Agenten erstellen?',
          answer: 'Ja, neben den vordefinierten Agenten (Email, Normen, Internet, Jelmoli) können Sie auch eigene Agenten mit spezifischen Prompt-Konfigurationen erstellen. Details finden Sie in der Dokumentation unter \'Agent-Konfiguration\'.'
        },
        concurrentUsers: {
          question: 'Wie viele Benutzer können gleichzeitig im System arbeiten?',
          answer: 'Die Anzahl der gleichzeitigen Benutzer hängt von Ihrem Subscription-Plan ab. Standardmäßig sind bis zu 50 gleichzeitige Sitzungen möglich. Für größere Anforderungen kontaktieren Sie bitte unser Sales-Team.'
        },
        dataEncryption: {
          question: 'Werden meine Daten verschlüsselt gespeichert?',
          answer: 'Ja, alle Daten werden sowohl bei der Übertragung (TLS 1.3) als auch im Ruhezustand (AES-256) verschlüsselt. Weitere Informationen finden Sie in unserer Sicherheitsdokumentation.'
        },
        restoreMessages: {
          question: 'Wie kann ich gelöschte Nachrichten wiederherstellen?',
          answer: 'Gelöschte Nachrichten werden für 30 Tage im Backup aufbewahrt. Kontaktieren Sie den Support mit der Ticket-ID und dem Zeitraum, um eine Wiederherstellung anzufordern.'
        },
        supportedLanguages: {
          question: 'Welche Sprachen unterstützt AI Hub?',
          answer: 'Die Benutzeroberfläche ist auf Deutsch, Englisch, Französisch und Brasilianisch-Portugiesisch verfügbar. Die AI-Agenten können in über 50 Sprachen kommunizieren, abhängig vom gewählten Modell.'
        }
      }
    },
    tutorials: {
      title: 'Video-Tutorials',
      description: 'Lernen Sie AI Hub durch unsere Schritt-für-Schritt Video-Anleitungen kennen',
      items: {
        gettingStarted: {
          title: 'Erste Schritte mit AI Hub',
          description: 'Einführung in die Plattform und grundlegende Navigation',
          duration: '8:42 Min'
        },
        userRoleManagement: {
          title: 'Benutzer- und Rollenverwaltung',
          description: 'Benutzer anlegen, Rollen zuweisen und Berechtigungen verwalten',
          duration: '12:15 Min'
        },
        modelConfiguration: {
          title: 'LLM-Modelle konfigurieren',
          description: 'API-Keys einrichten und Modelle testen',
          duration: '10:30 Min'
        },
        agentSetup: {
          title: 'Agenten einrichten',
          description: 'Email-Agent, Internet-Agent und weitere Agenten konfigurieren',
          duration: '15:20 Min'
        },
        backupRecovery: {
          title: 'Backup & Recovery',
          description: 'Backups erstellen und Daten wiederherstellen',
          duration: '9:45 Min'
        },
        monitoringAlerts: {
          title: 'Monitoring & Alerts',
          description: 'Systemüberwachung und Alarme einrichten',
          duration: '11:00 Min'
        }
      }
    },
    ticketStatus: {
      open: 'Offen',
      inProgress: 'In Bearbeitung',
      resolved: 'Gelöst',
      closed: 'Geschlossen'
    },
    ticketPriority: {
      low: 'Niedrig',
      medium: 'Mittel',
      high: 'Hoch',
      urgent: 'Dringend'
    }
  },

  taskbar: {
    startMenu: 'Startmenü',
    applications: 'Anwendungen',
    agentManagement: 'Agent-Verwaltung',
    systemSettings: 'System-Einstellungen',
    options: 'Optionen',
    recentApps: 'Zuletzt verwendet',
    search: 'Suchen',
    searchPlaceholder: 'Suchen...',
    powerOptions: 'Energie',
    logout: 'Abmelden',
    shutdown: 'Herunterfahren',
    restart: 'Neu starten'
  },

  moduleManager: {
    title: 'Module & Agents',
    subtitle: 'Verwalten Sie verfügbare AI-Module und deren Konfiguration',
    activeOf: 'von',
    userRole: 'Benutzerrolle:',
    administrator: 'Administrator',
    user: 'Benutzer',
    configure: 'Konfigurieren',
    status: {
      active: 'Aktiv',
      inactive: 'Inaktiv',
      error: 'Fehler',
      unknown: 'Unbekannt'
    },
    access: {
      admin: 'Admin',
      premium: 'Premium',
      standard: 'Standard'
    },
    usage: 'Auslastung',
    accessDenied: 'Zugriff verweigert',
    adminRequired: 'Admin-Berechtigung erforderlich',
    premiumRequired: 'Premium-Zugang erforderlich',
    unavailableModules: 'Nicht verfügbare Module',
    unavailableSubtitle: 'Diese Module erfordern erweiterte Berechtigungen',
    modules: {
      chatAgent: {
        name: 'Chat Agent',
        description: 'Allgemeiner Konversations-Agent für Benutzeranfragen'
      },
      documentAnalyzer: {
        name: 'Dokumenten-Analyzer',
        description: 'Analysiert und extrahiert Informationen aus Dokumenten'
      },
      webSearch: {
        name: 'Web-Suche Agent',
        description: 'Durchsucht das Internet nach aktuellen Informationen'
      },
      calendarAssistant: {
        name: 'Kalender-Assistent',
        description: 'Verwaltet Termine und Zeitplanungen'
      },
      emailProcessor: {
        name: 'E-Mail Prozessor',
        description: 'Verarbeitet und kategorisiert E-Mails automatisch'
      },
      dataAnalyst: {
        name: 'Daten-Analyst',
        description: 'Analysiert Datensets und erstellt Berichte'
      },
      securityMonitor: {
        name: 'Sicherheits-Monitor',
        description: 'Überwacht System-Sicherheit und potenzielle Bedrohungen'
      },
      databaseConnector: {
        name: 'Datenbank-Connector',
        description: 'Verbindet und interagiert mit externen Datenbanken'
      }
    }
  },

  roleManagement: {
    newRole: 'Neue Rolle erstellen',
    editRole: 'Rolle bearbeiten',
    roleName: 'Rollenname',
    roleDescription: 'Beschreibung',
    permissions: 'Berechtigungen',
    assignedUsers: 'Zugewiesene Benutzer',
    selectUsers: 'Benutzer auswählen',
    usersSelected: 'ausgewählt',
    user: 'Benutzer',
    users: 'Benutzer',
    searchUsers: 'Benutzer suchen...',
    allUsers: 'Alle Benutzer',
    selectAll: 'Alle auswählen',
    deselectAll: 'Alle abwählen',
    saveRole: 'Rolle speichern',
    cancel: 'Abbrechen',
    deleteRole: 'Rolle löschen',
    roleCreated: 'Rolle erfolgreich erstellt',
    roleUpdated: 'Rolle erfolgreich aktualisiert'
  },

  userManagementExtended: {
    department: 'Abteilung',
    departments: 'Abteilungen',
    selectDepartments: 'Abteilungen auswählen',
    departmentsSelected: 'ausgewählt',
    newDepartment: 'Neue Abteilung',
    allUsers: 'Alle Nutzer',
    filterByDepartment: 'Nach Abteilung filtern',
    showAllUsers: 'Alle Benutzer anzeigen',
    showActiveOnly: 'Nur aktive Benutzer',
    userDetails: 'Benutzerdetails',
    editUser: 'Benutzer bearbeiten',
    newUser: 'Neuer Benutzer',
    firstName: 'Vorname',
    lastName: 'Nachname',
    phoneNumber: 'Telefonnummer',
    position: 'Position',
    hireDate: 'Einstellungsdatum',
    selectRole: 'Rolle auswählen',
    selectStatus: 'Status auswählen',
    userCreated: 'Benutzer erfolgreich erstellt',
    userUpdated: 'Benutzer erfolgreich aktualisiert',
    // Additional fields for UserManagement
    addUser: 'Benutzer hinzufügen',
    exportCSV: 'CSV exportieren',
    import: 'Importieren',
    syncUsers: 'Benutzer synchronisieren',
    syncSuccess: 'Synchronisierung erfolgreich',
    syncSuccessMessage: 'Benutzer erfolgreich synchronisiert',
    mergeUsers: 'Benutzer zusammenführen',
    duplicatesFound: 'Duplikate gefunden',
    mergeWarning: 'Achten Sie darauf, dass keine Duplikate übrigbleiben',
    groupsLabel: 'Gruppen',
    lastLogin: 'Letzter Login',
    sortBy: 'Sortieren nach',
    filterBy: 'Filtern nach',
    source: 'Quelle',
    status: 'Status',
    statusActive: 'Aktiv',
    statusInactive: 'Inaktiv',
    statusLocked: 'Gesperrt',
    deleteUser: 'Benutzer löschen',
    deleteUserConfirm: 'Löschen bestätigen',
    deleteUserMessage: 'Möchten Sie diesen Benutzer wirklich löschen?',
    viewer: 'Anzeiger',
    admin: 'Administrator',
    powerUser: 'Power User',
    user: 'Benutzer',
    localUser: 'Lokaler Benutzer'
   },

  alertsManagement: {
    title: 'Alert Management',
    subtitle: 'Verwalten Sie Ihre Alerts',
    searchPlaceholder: 'Suche...',
    newAlert: 'Neuer Alert',
    types: {
      error: 'Fehler',
      warning: 'Warnung',
      info: 'Info'
    },
    severity: {
      critical: 'Kritisch',
      warning: 'Warnung',
      info: 'Info'
    },
    table: {
      name: 'Name',
      type: 'Typ',
      condition: 'Bedingung',
      threshold: 'Schwellenwert',
      channels: 'Kanäle',
      triggers: 'Auslöser',
      lastTrigger: 'Letzter Auslöser',
      status: 'Status',
      actions: 'Aktionen'
    },
    channels: {
      email: 'E-Mail',
      slack: 'Slack'
    },
    status: {
      active: 'Aktiv',
      inactive: 'Inaktiv'
    },
    actions: {
      newAlert: 'Neuer Alert',
      duplicate: 'Duplizieren',
      edit: 'Bearbeiten',
      delete: 'Löschen'
    },
    notificationChannels: {
      title: 'Benachrichtigungs-Kanäle',
      subtitle: 'Wählen Sie die Kanäle aus, über die Sie benachrichtigt werden möchten'
    },
    panel: {
      editAlert: 'Alert bearbeiten',
      createAlert: 'Alert erstellen'
    },
    form: {
      basicInfo: 'Grundinformationen',
      alertName: 'Alert-Name',
      alertNamePlaceholder: 'Geben Sie den Alert-Namen ein',
      alertNameHelper: 'Der Name des Alerts sollte eindeutig sein',
      type: 'Typ',
      conditions: 'Bedingungen',
      condition: 'Bedingung',
      conditionPlaceholder: 'Geben Sie die Bedingung ein',
      conditionHelper: 'Beschreiben Sie die Bedingung, die den Alert auslöst',
      threshold: 'Schwellenwert',
      thresholdPlaceholder: 'Geben Sie den Schwellenwert ein',
      channels: 'Kanäle',
      selectChannels: 'Kanäle auswählen',
      email: 'E-Mail',
      slack: 'Slack',
      saveButton: 'Speichern',
      cancelButton: 'Abbrechen'
    },
    deleteDialog: {
      title: 'Alert löschen',
      description: 'Möchten Sie diesen Alert wirklich löschen?',
      cancel: 'Abbrechen',
      confirm: 'Löschen'
    }
  },

  // System Monitoring
  systemMonitoring: {
    title: 'Systemüberwachung',
    subtitle: 'Überwachen Sie die Leistung Ihres Systems',
    network: 'Netzwerk',
    online: 'Online',
    offline: 'Offline',
    restricted: 'Eingeschränkt',
    metrics: {
      title: 'Metriken',
      cpu: 'CPU',
      memory: 'Speicher',
      disk: 'Festplatte',
      network: 'Netzwerk'
    },
    services: {
      title: 'Dienste',
      status: 'Status',
      uptime: 'Betriebsdauer',
      responseTime: 'Antwortzeit',
      online: 'Online',
      offline: 'Offline',
      degraded: 'Degradiert'
    },
    requests: {
      title: 'Anfragen',
      subtitle: 'Überwachen Sie eingehende Anfragen'
    },
    performance: {
      title: 'Leistung',
      subtitle: 'Überwachen Sie die Systemleistung'
    },
    database: {
      title: 'Datenbank',
      connections: 'Verbindungen',
      queries: 'Abfragen',
      cacheHitRate: 'Cache-Hit-Rate'
    }
  },

  // Activity Log Extended
  activityLogExtended: {
    sort: 'Sortieren',
    resetFilter: 'Filter zurücksetzen',
    successful: 'Erfolgreich',
    warning: 'Warnung',
    error: 'Fehler',
    information: 'Information',
    timestamp: 'Zeitstempel',
    user: 'Benutzer',
    action: 'Aktion',
    resource: 'Ressource',
    ipAddress: 'IP-Adresse',
    detailsColumn: 'Details',
    noDetails: 'Keine Details',
    exportFilename: 'Aktivitätsprotokoll.csv',
    actions: {
      login: 'Anmeldung',
      apiRateLimitReached: 'API-Rate-Limit erreicht'
    },
    resources: {
      emailAgent: 'E-Mail-Agent'
    },
    details: {
      fullBackupSuccess: 'Vollständiger Backup erfolgreich',
      rateLimitReached: 'Rate-Limit erreicht',
      newUser: 'Neuer Benutzer',
      roleAssigned: 'Rolle zugewiesen',
      memoryTokenUpdated: 'Speichertoken aktualisiert',
      timeoutAfter30s: 'Timeout nach 30 Sekunden'
    }
  },

  // Tenant Settings Extended
  tenantSettingsExtended: {
    general: {
      tenantInformation: 'Tenant-Informationen',
      tenantInformationDesc: 'Name, Logo und Farbeinstellung',
      tenantName: 'Tenant-Name',
      tenantLogo: 'Tenant-Logo',
      logoUploaded: 'Logo hochgeladen',
      noLogoSelected: 'Kein Logo ausgewählt',
      preview: 'Vorschau:',
      white: 'Weiß',
      gray: 'Grau',
      black: 'Schwarz',
      logoPreview: 'Logo Vorschau',
      primaryColor: 'Primärfarbe',
      accentColor: 'Akzentfarbe'
    },
    company: {
      companyInformation: 'Firmeninformationen',
      companyInformationDesc: 'Rechtliche und Kontaktinformationen',
      masterEntryNote: 'Daten können nur im Master-Entry geändert werden.',
      companyName: 'Firmenname',
      uidTaxNumber: 'UID / Steuernummer',
      phoneNumber: 'Telefonnummer',
      email: 'E-Mail',
      domain: 'Domain',
      address: 'Adresse',
      zipCode: 'PLZ',
      city: 'Stadt'
    },
    regional: {
      regionalSettings: 'Regionale Einstellungen',
      regionalSettingsDesc: 'Sprache, Zeitzone und Formate',
      language: 'Sprache',
      languageGerman: 'Deutsch',
      languageEnglish: 'English',
      languageFrench: 'Français',
      languageItalian: 'Italiano',
      timezone: 'Zeitzone',
      timezoneZurich: 'Europe/Zurich (CET)',
      timezoneBerlin: 'Europe/Berlin (CET)',
      timezoneUTC: 'UTC',
      currency: 'Währung',
      currencyCHF: 'CHF (Schweizer Franken)',
      currencyEUR: 'EUR (Euro)',
      currencyUSD: 'USD (US Dollar)',
      dateFormat: 'Datumsformat',
      dateFormatDDMMYYYY: 'DD.MM.YYYY',
      dateFormatMMDDYYYY: 'MM/DD/YYYY',
      dateFormatYYYYMMDD: 'YYYY-MM-DD'
    },
    security: {
      passwordPolicies: 'Passwortrichtlinien',
      passwordPoliciesDesc: 'Definieren Sie die Anforderungen für Benutzerpasswörter',
      minPasswordLength: 'Minimale Passwortlänge',
      minPasswordLengthDesc: 'Mindestanzahl Zeichen für Passwörter',
      uppercaseRequired: 'Großbuchstaben erforderlich',
      uppercaseRequiredDesc: 'Mindestens ein Großbuchstabe (A-Z)',
      digitsRequired: 'Ziffern erforderlich',
      digitsRequiredDesc: 'Mindestens eine Ziffer (0-9)',
      specialCharsRequired: 'Sonderzeichen erforderlich',
      specialCharsRequiredDesc: 'Mindestens ein Sonderzeichen (!@#$%...)',
      passwordExpiry: 'Passwort-Ablauf (Tage)',
      passwordExpiryDesc: '0 = kein Ablauf',
      twoFactorAuth: 'Zwei-Faktor-Authentifizierung (2FA)',
      twoFactorAuthDesc: 'Multi-Faktor-Authentifizierung für erhöhte Sicherheit',
      enforce2FAAll: '2FA für alle Benutzer erzwingen',
      enforce2FAAllDesc: 'Alle Benutzer müssen 2FA aktivieren',
      enforce2FAAdmins: '2FA für Administratoren erzwingen',
      enforce2FAAdminsDesc: 'Nur Administratoren müssen 2FA aktivieren',
      sessionSettings: 'Session-Einstellungen',
      sessionSettingsDesc: 'Timeout und Session-Management',
      sessionTimeout: 'Session-Timeout (Minuten)',
      sessionTimeoutDesc: 'Automatischer Logout nach Inaktivität',
      absoluteSessionDuration: 'Absolute Session-Dauer (Stunden)',
      absoluteSessionDurationDesc: 'Maximale Session-Dauer, 0 = unbegrenzt',
      privacyCompliance: 'Datenschutz & Compliance',
      privacyComplianceDesc: 'DSGVO und Schweizer Datenschutzgesetz',
      gdprMode: 'DSGVO-Modus aktivieren',
      gdprModeDesc: 'Zusätzliche DSGVO-Compliance-Funktionen',
      swissDSG: 'Schweiz DSG-Modus',
      swissDSGDesc: 'Schweizer Datenschutzgesetz (nDSG)',
      dataRetention: 'Daten-Aufbewahrung (Tage)',
      dataRetentionDesc: 'Automatische Löschung nach X Tagen',
      archiveBeforeDeletion: 'Archivierung vor Löschung',
      archiveBeforeDeletionDesc: 'Daten archivieren bevor sie gelöscht werden',
      // EU AI Act
      euAiAct: 'EU AI Act',
      euAiActDesc: 'Konformität mit der EU-Verordnung für Künstliche Intelligenz',
      enableEuAiActCompliance: 'EU AI Act Compliance aktivieren',
      enableEuAiActComplianceDesc: 'Zusätzliche Compliance-Funktionen für KI-Systeme',
      riskClassification: 'Risikoklassifizierung',
      riskClassificationDesc: 'Klassifizierung des KI-Systems nach Risikostufe',
      aiSystemDocumentation: 'KI-System Dokumentation',
      aiSystemDocumentationDesc: 'Automatische Dokumentation von KI-Entscheidungen',
      humanOversightRequired: 'Menschliche Aufsicht erforderlich',
      humanOversightRequiredDesc: 'Menschliche Überprüfung bei kritischen KI-Entscheidungen',
      // EU AI Act - Status Overview
      systemStatusOverview: 'System-Status',
      systemStatusOverviewDesc: 'Schnelle Übersicht über den Compliance-Status des KI-Systems',
      isHighRiskSystem: 'Ist dieses System ein Hochrisiko-KI-System?',
      highRiskSystemYes: 'Ja - Hochrisiko-System',
      highRiskSystemNo: 'Nein - Kein Hochrisiko-System',
      highRiskAdditionalObligations: 'Zusätzliche Pflichten gelten für Hochrisiko-KI-Systeme gemäß EU AI Act. Bitte stellen Sie sicher, dass alle Anforderungen erfüllt sind.',
      assessmentDate: 'Datum der Bewertung',
      assessedBy: 'Bewertet nach EU AI Act',
      euAiActLink: 'Gesetzestext anzeigen',
      registrationStatus: 'Registrierungsstatus',
      registrationComplete: 'Vollständig',
      registrationPending: 'Ausstehend',
      // EU AI Act - Anhang III Categories
      annexIIICategories: 'Hochrisiko-Kategorien (Anhang III)',
      annexIIICategoriesDesc1: 'Trifft eines der Kriterien zu, gilt das KI System als Hochrisiko-System.',
      annexIIICategoriesDesc2: 'Wird das KI-System als Hochrisiko KI-System eingestuft, so erfolgt im Frontend für den User ein Hinweis.',
      biometricIdentification: 'Biometrische Identifikation',
      biometricIdentificationDesc: 'Gesichtserkennung, Iris-Scan, Stimmanalyse, Ganganalyse (Anhang III, Abschnitt 1)',
      criticalInfrastructure: 'Kritische Infrastrukturen',
      criticalInfrastructureDesc: 'Stromnetze, Verkehrssysteme, Wasserversorgung (Anhang III, Abschnitt 2)',
      educationTraining: 'Bildung und Ausbildung',
      educationTrainingDesc: 'Automatisierte Bewertungen, Zulassungssysteme, Lernerfolgsmessung (Anhang III, Abschnitt 3)',
      employmentManagement: 'Beschäftigung und Personalmanagement',
      employmentManagementDesc: 'CV-Screening, Beförderungen, Kündigungsanalysen (Anhang III, Abschnitt 4)',
      essentialServices: 'Wesentliche Dienstleistungen',
      essentialServicesDesc: 'Kreditvergabe, Versicherungsbewertung, Sozialhilfe (Anhang III, Abschnitt 5)',
      lawEnforcement: 'Strafverfolgung',
      lawEnforcementDesc: 'Risikobewertung, Beweismittelanalyse, Verdachtsklassifikation (Anhang III, Abschnitt 6)',
      migrationBorderControl: 'Migration und Grenzkontrolle',
      migrationBorderControlDesc: 'Automatisierte Anträge, Risikoprofile, Entscheidungsunterstützung (Anhang III, Abschnitt 7)',
      justiceDemo: 'Rechtspflege und Demokratie',
      justiceDemoDesc: 'Unterstützung gerichtlicher Entscheidungen, Normeninterpretation (Anhang III, Abschnitt 8)',
      // Registered High-Risk AI System
      registeredHighRiskSystem: 'Registriertes Hochrisiko KI-System',
      registeredHighRiskSystemDesc: 'Dieses System wurde offiziell bei der EU-Kommission registriert',
      registration: 'Registrierung',
      conformityMarking: 'Konformitätskennzeichnung',
      technicalDocumentation: 'Technische Dokumentation',
      download: 'Download',
      // Transparency Requirements
      transparencyRequirements: 'Transparenzanforderungen',
      transparencyRequirementsDesc: 'Nachfolgende Informationen werden dem user angezeigt',
      aiNoticeDisplay: 'Text unterhalb vom Chateingabefenster einblenden: KI-Hinweis',
      aiNoticeDisplayDesc: 'Antworten können Fehler enthalten. Bitte Inhalte vor der Nutzung prüfen.',
      orchestratorBasis: 'Entscheidungsgrundlage vom Orchestrator',
      orchestratorBasisDesc: '',
      responsibilities: 'Verantwortlichkeiten',
      responsibilitiesDesc: '(siehe Verantwortlichkeiten)',
      humanInLoop: 'Human in the Loop',
      humanInLoopDesc: 'Dieses KI-System gibt keine Information per Automation weiter. Dies geschieht ausschliesslich durch den Mensch in dem Loop.',
      // Technical Security Measures
      technicalSecurityMeasures: 'Technische Sicherheitsmaßnahmen',
      technicalSecurityMeasuresDesc: 'Zeigt alle relevanten Sicherheitsmaßnahmen dieses Systems auf:',
      killswitch: 'Kill-Switch',
      killswitchDesc: 'Nimmt das komplette System offline',
      killswitchActiveWarning: 'Achtung! Das komplette System wurde Offline gesetzt.',
      twoFactorAuthReference: 'Zwei-Faktor-Authentifizierung (2FA)',
      twoFactorAuthReferenceDesc: 'Zu finden im Bereich "Sicherheit & Compliance"',
      whitelistReference: 'Whitelist',
      whitelistReferenceDesc: 'Zu finden im Bereich "Sicherheit & Compliance"',
      tenantRolesReference: 'Rollenmodell',
      tenantRolesReferenceDesc: 'Zu finden im Bereich "Sicherheit & Compliance"',
      loggingDataReference: 'Loggingdaten',
      loggingDataReferenceDesc: 'Zu finden im Bereich "Logging & Monitoring"',
      systemCriticalAlerts: 'Alarm bei systemkritische Fehler',
      systemCriticalAlertsDesc: 'Zu finden im Bereich "Logging & Monitoring"',
      backupRecoveryReference: 'Backup und Wiederherstellung',
      backupRecoveryReferenceDesc: 'Zu finden im Bereich "Datenverwaltung"',
      goTo: 'Gehe zu',
      // Human Oversight
      humanOversight: 'Human Oversight – menschliche Kontrolle',
      humanOversightDesc: 'Überwachung, Meldung und Eingriff ins KI-System',
      humanInLoopOversight: 'Dieses KI-System gibt keine Information per Automation weiter. Dies geschieht ausschliesslich durch den Mensch in dem Loop.',
      reviewResetLimit: 'Prüfen, zurücksetzen und begrenzen',
      reviewResetLimitDesc: 'Eingriff auf alle Prozesse aus dem Logging & Monitoring heraus',
      staffTraining: 'Schulung Personal',
      staffTrainingDesc: 'Wurde das Personal umfänglich geschult',
      feedbackReporting: 'Meldung & Rückfragen',
      feedbackReportingDesc: 'Unter jedem Chatbot Eintrag kann eine Meldung hinterlassen werden. Das Textfeld öffnet automatisch, nach dem aktivieren vom Dislike-Button',
      auditTrail: 'Audit-Trail',
      auditTrailDesc: 'Eine vollständige, manipulationssichere Protokollierung aller relevanten Systemereignisse',
      oversightDocumentation: 'Dokumentation "Oversight technisch / organisatorisch"',
      oversightDocumentationDesc: 'Dokumentation herunterladen',
      download: 'Herunterladen'
    },
    access: {
      singleSignOn: 'Single Sign-On (SSO)',
      singleSignOnDesc: 'Zentralisierte Authentifizierung über Identity Provider',
      enableSSO: 'SSO aktivieren',
      enableSSODesc: 'Ermöglicht Benutzern die Anmeldung über einen externen Identity Provider',
      identityProvider: 'Identity Provider',
      noProvider: 'Kein Provider',
      azureAD: 'Azure Active Directory',
      googleIdentity: 'Google Identity Platform',
      okta: 'Okta',
      customSAML: 'Custom SAML 2.0',
      azureConfiguration: 'Azure AD Konfiguration',
      tenantID: 'Tenant ID',
      tenantIDPlaceholder: 'Ihre Azure Tenant ID',
      clientID: 'Client ID',
      clientIDPlaceholder: 'Ihre Azure Application (Client) ID',
      clientSecret: 'Client Secret',
      clientSecretPlaceholder: 'Ihr Azure Client Secret',
      testConnection: 'Verbindung testen',
      notConnected: 'Nicht verbunden',
      connected: 'Verbunden',
      connectionError: 'Verbindungsfehler',
      testing: 'Teste...',
      connectionSuccessful: 'Verbindung erfolgreich!',
      ipWhitelist: 'IP-Whitelist',
      ipWhitelistDesc: 'Beschränken Sie den Zugriff auf bestimmte IP-Adressen',
      enableIPWhitelist: 'IP-Whitelist aktivieren',
      enableIPWhitelistDesc: 'Nur Verbindungen von whitegelisteten IPs zulassen',
      allowedIPs: 'Zugelassene IP-Adressen',
      ipAddress: 'IP-Adresse',
      ipAddressPlaceholder: 'z.B. 192.168.1.1',
      addIP: 'IP hinzufügen',
      ipWarning: 'Achtung: Falsche IP-Konfiguration kann Sie aussperren!',
      ipFormatError: 'Ungültige IP-Adresse. Format: xxx.xxx.xxx.xxx',
      ssoRequirements: 'SSO-Anforderungen',
      ssoRequirementsDesc: 'Zusätzliche Sicherheitsanforderungen für SSO',
      enforce2FAForSSO: '2FA für SSO-Benutzer erzwingen',
      enforce2FAForSSODesc: 'Alle über SSO angemeldeten Benutzer müssen 2FA aktivieren',
      verifiedEmailOnly: 'Nur verifizierte E-Mails',
      verifiedEmailOnlyDesc: 'Nur Benutzer mit verifizierten E-Mail-Adressen zulassen',
      autoTokenRefresh: 'Automatische Token-Aktualisierung',
      autoTokenRefreshDesc: 'Sessions automatisch verlängern, wenn der Benutzer aktiv ist'
    },
    dsgvo: {
      basicFunctions: 'DSGVO Grundfunktionen',
      basicFunctionsDesc: 'Steuert die grundlegendsten DSGVO Themen im Orchestrator',
      datenschutzmodus: 'Datenschutzmodus',
      datenschutzmodusDesc: 'Sämtliche Vorgaben sind bei Aktivierung von diesem Modus aktiv',
      memory: 'Memory',
      memoryDesc: 'Behandelt die Speicherung personenbezogener Daten im Orchestrator',
      memorySettings: 'Memory-Einstellungen',
      duration: 'Dauer',
      deleteAfterSession: 'Löschen nach jeder Session',
      backup: 'Backup',
      backupDesc: 'Behandelt die Backup-Speicherung personenbezogener Daten im Orchestrator',
      agentLogging: 'Agenten Logging',
      agentLoggingDesc: 'Speicherung der Agenten Antworten',
      agentLoggingSettings: 'Agenten Logging Einstellungen',
      onlySystemDiagnose: 'Nur für Systemdiagnose',
      transparencyInformation: 'Transparenz & Informationen',
      transparencyInformationDesc: 'Regelung der Betroffeneninformationen. Diese Informationen werden im User-Entry angezeigt unter Konto-Einstellungen / DSGVO',
      verantwortlicher: 'Verantwortlicher',
      verantwortlicherDesc: 'Wer kontrolliert die Datenverarbeitung?',
      verantwortlicherAnbieter: 'Anbieter',
      verantwortlicherTenant: 'Tenant (Firma XY)',
      verantwortlicherOther: 'Andere (siehe Angaben)',
      verantwortlicherPlaceholder: 'Bitte geben Sie die Details zum Verantwortlichen an...',
      selectOption: 'Auswählen...',
      zwecke: 'Zwecke',
      zweckeDesc: 'Wofür werden Daten verwendet?',
      zweckKontextverarbeitung: 'Kontextverarbeitung',
      zweckAgentenwahl: 'Agentenwahl',
      zweckNormenVorschlaege: 'Normen & Vorschläge',
      zweckMemory: 'Memory',
      zweckRAGSuche: 'RAG-Suche',
      zweckFehleranalyse: 'Fehleranalyse',
      zweckProtokollierung: 'Protokollierung',
      rechtsgrundlage: 'Rechtsgrundlage',
      rechtsgrundlageDesc: 'Warum darf das überhaupt verarbeitet werden?',
      rechtsgrundlageBerechtigtesInteresse: 'Berechtigtes Interesse',
      rechtsgrundlageEinwilligung: 'Einwilligung',
      rechtsgrundlageVertragserfuellung: 'Vertragserfüllung',
      rechtsgrundlageRechtlicheVerpflichtung: 'Rechtliche Verpflichtung',
      rechtsgrundlageOeffentlichesInteresse: 'Öffentliches Interesse',
      datenkategorien: 'Datenkategorien',
      datenkategorienDesc: 'Was wird gespeichert?',
      datenkategorieTexteingaben: 'Texteingaben',
      datenkategorieAgentenantworten: 'Agentenantworten',
      datenkategorieGespraechsverlauf: 'Gesprächsverlauf',
      datenkategorieDateiuploads: 'Dateiuploads',
      datenkategorieMetadaten: 'Metadaten',
      datenkategorieNutzerprofil: 'Nutzerprofil',
      datenkategorieRAGErgebnisse: 'RAG-Ergebnisse',
      datenkategorieSystemprotokolle: 'Systemprotokolle',
      empfaenger: 'Empfänger',
      empfaengerDesc: 'Wohin gehen die Daten?',
      empfaengerLLMAnbieter: 'LLM-Anbieter',
      empfaengerLokaleModelle: 'Lokale Modelle',
      empfaengerInterneAgenten: 'Interne Agenten',
      empfaengerExterneAgenten: 'Externe Agenten',
      empfaengerRAGDienste: 'RAG-Dienste',
      empfaengerMonitoringLogging: 'Monitoring-/Logging-Systeme',
      empfaengerBackupSysteme: 'Backup-Systeme',
      speicherdauer: 'Speicherdauer',
      speicherdauerDesc: 'Angaben gemäss Auswahl aus "DSGVO Grundinformationen"',
      deactivated: 'Deaktiviert',
      afterEachSession: 'Nach jeder Session',
      systemDiagnose: 'Systemdiagnose',
      rechte: 'Rechte',
      rechteDesc: 'Was dürfen Betroffene verlangen?',
      rechtAuskunft: 'Auskunft',
      rechtBerichtigung: 'Berichtigung',
      rechtLoeschung: 'Löschung',
      rechtEinschraenkung: 'Einschränkung der Verarbeitung',
      rechtWiderspruch: 'Widerspruch',
      rechtDatenuebertragbarkeit: 'Datenübertragbarkeit',
      rechtWiderruf: 'Widerruf der Einwilligung',
      drittland: 'Drittland-Übermittlung',
      drittlandDesc: 'Werden Daten in die USA übertragen?',
      drittlandKeine: 'Keine Drittlandübermittlung',
      drittlandUSASCCs: 'USA – mit SCCs',
      drittlandUSATIA: 'USA – mit TIA',
      drittlandEUEWR: 'EU/EWR',
      drittlandAndereSCCs: 'Andere Drittländer – mit SCCs',
      drittlandLokal: 'Lokale Verarbeitung ohne Übermittlung',
      automationNotice: 'Hinweis auf Automatisierung',
      automationNoticeDesc: 'Kommt eine KI zum Einsatz?',
      aiNotice: 'KI-Hinweis:',
      aiNoticeText: 'Antworten können Fehler enthalten. Bitte Inhalte vor der Nutzung prüfen.',
      selected: 'ausgewählt',
      documentedProcessingActivities: 'Dokumentierte Verarbeitungstätigkeiten',
      documentedProcessingActivitiesDesc: 'Verzeichnis über die Datenverarbeitungstätigkeiten. Dieses Verzeichnis dient der Transparenz und Nachvollziehbarkeit bei der Nutzung personenbezogener Daten.',
      providerSystemLevel: 'Anbieter (Systemebene)',
      providerSystemLevelDesc: 'Diese Vorgänge werden von der Plattform automatisch verarbeitet:',
      contextStorageOrchestrator: 'Kontext-Speicherung im Orchestrator (Memory)',
      loggingAccessErrors: 'Logging von Zugriffen, Fehlern, Entscheidungen',
      communicationAgentsAPI: 'Kommunikation mit Agenten via API',
      download: 'Download',
      tenantLevel: 'Tenant (Mandantenebene)',
      tenantLevelDesc: 'Diese Datenverarbeitungen werden dem Tenant zugeordnet:',
      tenantLevelItem1: 'Nutzung von Agenten mit Zugriff auf Inhalte oder personenbezogene Daten',
      tenantLevelItem2: 'Speicherung von Texteingaben und Antworten',
      tenantLevelItem3: 'Session- oder Nutzerbezogenes Memory (wenn aktiviert)',
      dsfaTitle: 'Datenschutz-Folgenabschätzung (DSFA)',
      dsfaDesc: 'Bei bestimmten Arten von Datenverarbeitung mit voraussichtlich hohem Risiko für die Rechte und Freiheiten der betroffenen Personen, muss eine sogenannte Datenschutz-Folgenabschätzung (DSFA) durchgeführt werden.',
      dsfaResponsibility: 'Verantwortlichkeit',
      dsfaResponsibilityItem1: 'Der Tenant ist datenschutzrechtlich verantwortlich und muss beurteilen, ob eine DSFA notwendig ist.',
      dsfaResponsibilityItem2: 'Der Anbieter stellt die technischen Grundlagen zur Verfügung, damit der Tenant diese Prüfung fundiert durchführen kann.',
      dsfaRiskAssessment: 'Risikobewertung',
      dsfaRiskAssessmentDesc: 'Jeder Agent verfügt über einen eigenen Risikokategorie-Rechner und wird eigenständig aufgrund den Angaben beurteilt.',
      dsfaGoTo: 'Gehe zu',
      dsfaAdditional: 'Weiteres',
      dsfaAdditionalItem1: 'DSFA-Hinweis im Admin - Beim Aktivieren risikobehafteter Agenten erscheint ein Hinweis auf mögliche DSFA-Pflicht',
      dsfaAdditionalItem2: 'Exportvorlage - Auf Wunsch stellen wir eine DSFA-Mustervorlage zur Verfügung (PDF/Word)',
      dsfaAdditionalItem3: 'Konfigurationslog - Dokumentiert, welche Agenten mit welchem Status aktiv waren',
      day: 'Tag',
      days: 'Tage',
      week: 'Woche',
      weeks: 'Wochen',
      month: 'Monat',
      months: 'Monate',
      rightsOfDataSubjects: 'Rechte der Betroffenen',
      rightsOfDataSubjectsDesc: 'Alle Rechte der Betroffenen werden hier behandelt',
      rightAuskunftTitle: 'Auskunft',
      rightAuskunftDesc1: 'Jeder Nutzer hat das Recht zu wissen, welche Daten über ihn gespeichert sind inkl. Quelle, Zweck und Empfänger',
      rightAuskunftDesc2: 'Unter «Benutzerverwaltung» kann bei jedem einzelnen Nutzer die Daten heruntergeladen werden',
      rightBerichtigungTitle: 'Berichtigung',
      rightBerichtigungDesc1: 'Jeder Benutzer hat das Recht, dass sein Nutzerprofil korrigiert werden kann',
      rightBerichtigungDesc2: 'Unter «Benutzerverwaltung» kann bei jedem einzelnen Nutzer die Daten geändert werden',
      rightLoeschungTitle: 'Löschung',
      rightLoeschungDesc1: 'Jeder Benutzer hat das Recht auf Löschung seiner Daten',
      rightLoeschungDesc2: 'Unter «Benutzerverwaltung» kann bei jedem einzelnen Nutzer die Daten gelöscht werden',
      rightEinschraenkungTitle: 'Einschränkung',
      rightEinschraenkungDesc1: 'Jeder Benutzer hat das Recht auf «Einschränkung» oder «kein Profiling»',
      rightEinschraenkungDesc2: 'Im UI besteht die Möglichkeit zwischen folgenden Möglichkeiten auszuwählen:',
      rightEinschraenkungMemory: 'Nutzung des Gesprächskontexts Memory - Toggle im UI',
      rightEinschraenkungPersonalisierung: 'Verwendung von Nutzerattributen - Opt-in, Rollensteuerung abschaltbar',
      rightEinschraenkungProfilbildung: 'Erstellung individueller Nutzerprofile - Profiling deaktivieren oder UI-Zustimmung',
      rightEinschraenkungAgentenwahl: 'Verhaltensbasierte Steuerung - Nur Session-basiert, keine dauerhafte Speicherung',
      personalization: 'Personalisierung',
      profiling: 'Profilbildung',
      automatedAgentSelection: 'Automatisierte Agentenwahl',
      rightDatenuebertragbarkeitTitle: 'Datenübertragbarkeit',
      rightDatenuebertragbarkeitDesc1: 'Jeder Nutzer hat das Recht seine Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und sie an einen anderen Anbieter weiterzugeben, ohne dass ihr das behindern dürft',
      rightDatenuebertragbarkeitDesc2: 'Unter «Benutzerverwaltung» kann bei jedem einzelnen Nutzer die Daten heruntergeladen werden',
      rightWiderspruchTitle: 'Widerspruch',
      rightWiderspruchDesc1: 'Jeder Nutzer hat das Recht zu Widersprechen. Folgender Hinweis ist im UI vorhanden:',
      rightWiderspruchQuote: '„Sie können der Speicherung ihrer Daten widersprechen"',
      rightNoAutomatedDecision: 'Keine vollautomatisierte Entscheidung ohne Möglichkeit zur Überprüfung',
      rightNoAutomatedDecisionDesc: 'Automatisierte Entscheidungen durch das KI-System werden klar als solche gekennzeichnet („KI-basierter Vorschlag") und können jederzeit durch eine menschliche Überprüfung ergänzt oder überschrieben werden („Human-in-the-loop")',
      goTo: 'Gehe zu',
      dataProcessingAccess: 'Auftragsverarbeitung & Datenzugriff',
      dataProcessingAccessDesc: 'Diese Plattform unterstützt zwei Betriebsmodelle: «kein Zugriff» und «Support- Hostingzugriff»',
      contractualModel: 'Vertraglich vereinbartes Betriebsmodell:',
      contractualModelText: 'Standard - Kein Zugriff, keine Auftragsverarbeitung',
      standardNoAccess: 'Standard: Kein Zugriff – keine Auftragsverarbeitung',
      standardNoAccessModel: 'Der Anbieter hat keinen Zugriff auf die gespeicherten Daten (z. B. Prompts, Memory, Agentenantworten)',
      standardNoAccessDesc: 'Zugriffsmodell:',
      standardNoAccessItem1: 'Vollständige Tenant-Isolation',
      standardNoAccessItem2: 'Getrennte Datenbanken und Logs',
      standardNoAccessItem3: 'Kein Zugriff durch Systemadmins oder Support',
      standardNoAccessItem4: 'Kein AVV nötig (im Vertrag vermerkt «Nicht AVV-Modell»)',
      standardNoAccessNote: 'Bei Änderung ist eine Vertragsanpassung notwendig',
      optionalSupportAccess: 'Optional: Support- oder Hosting-Zugriff aktiv',
      optionalSupportAccessModel: 'Der Anbieter erhält auf Wunsch temporären Zugriff für:',
      optionalSupportAccessDesc: 'Zugriffsmodell:',
      optionalSupportAccessItem1: 'Technischen Support (z. B. Fehlersuche, Log-Analyse)',
      optionalSupportAccessItem2: 'Hosting oder Plattformbetrieb',
      optionalSupportAccessItem3: 'Auftragsverarbeitungsvertrag (AVV) gemäss Art. 28 DSGVO',
      optionalSupportAccessNote: 'Zugriff nur nach schriftlicher Freigabe durch den Tenant',
      accessLogged: 'Zugriff wird protokolliert (Audit Trail)'
    }
  },

  chatExtended: {
    filesAttached: '(Dateien angehängt)'
  },

  authorized: 'Berechtigt',
  notAuthorized: 'Nicht berechtigt'
};

// English translations
export const extendedTranslationsEN: ExtendedTranslations = {
  twoFactorCode: {
    title: '2FA Verification',
    subtitle: 'Enter the 6-digit code',
    codeLabel: 'Verification Code',
    codePlaceholder: '000000',
    verifyButton: 'Verify Code',
    invalidCode: 'Invalid code',
    resendCode: 'Resend code'
  },

  promptsFrameworks: {
    title: 'Prompts & Frameworks',
    library: 'Prompt Library',
    frameworks: 'Frameworks',
    searchPrompts: 'Search prompts...',
    searchFrameworks: 'Search frameworks...',
    category: 'Category',
    allCategories: 'All Categories',
    copyPrompt: 'Copy Prompt',
    copied: 'Copied!',
    edit: 'Edit',
    delete: 'Delete',
    newPrompt: 'New Prompt',
    newFramework: 'New Framework',
    promptTitle: 'Title',
    promptDescription: 'Description',
    promptText: 'Prompt Text',
    frameworkStructure: 'Framework Structure',
    tags: 'Tags',
    savePrompt: 'Save Prompt',
    saveFramework: 'Save Framework',
    cancel: 'Cancel',
    deleteConfirm: 'Confirm Deletion',
    deleteMessage: 'Are you sure you want to delete this item?',

    categories: {
      strategy: 'Strategy & Vision',
      sales: 'Sales & Acquisition',
      marketing: 'Marketing & Branding',
      hr: 'HR & Recruiting',
      finance: 'Finance & Controlling',
      innovation: 'Innovation & Development',
      communication: 'Communication',
      technology: 'Technology',
      decision: 'Decision Making',
      analysis: 'Analysis & Insights'
    }
  },

  thinkTank: {
    title: 'Think Tank',
    subtitle: 'Multi-Perspective Scenario Analysis',
    scenario: 'Scenario / Question',
    scenarioPlaceholder: 'Describe your scenario or question...',
    perspectives: 'Perspectives',
    addPerspective: 'Add Perspective',
    removePerspective: 'Remove',
    startSession: 'Start Session',
    stopSession: 'Stop Session',
    clearSession: 'Reset Session',
    thinking: 'Analyzing...',
    perspectivePlaceholder: 'e.g. CEO, CTO, Customer, Investor...',
    sessionActive: 'Session Active'
  },

  thinkTankPanel: {
    title: 'Think Tank',
    pinboard: 'Pinboard',
    noPinnedItems: 'No pinned items',
    chats: 'Chats',
    spaces: 'Spaces',
    prompts: 'Prompts',
    archive: 'Archive',
    trash: 'Trash',
    sortByDate: 'Sort by Date',
    sortAlphabetically: 'Sort Alphabetically',
    ascending: 'Ascending',
    descending: 'Descending',
    searchChats: 'Search chats...',
    searchSpaces: 'Search spaces...',
    searchPrompts: 'Search prompts...',
    newSpace: 'New Space',
    newCategory: 'New Category',
    spaceName: 'Space Name',
    categoryName: 'Category Name',
    create: 'Create',
    dateGroups: {
      today: 'Today',
      yesterday: 'Yesterday',
      lastWeek: 'Last Week',
      lastMonth: 'Last Month',
      older: 'Older'
    },
    restore: 'Restore',
    deleteConfirmTitle: 'Delete Permanently?',
    deleteConfirmMessage: 'This item will be permanently deleted.',
    deletePermanently: 'Delete Permanently',
    emptyTrash: 'Trash is empty',
    emptyArchive: 'Archive is empty',
    backToChats: 'Back to Chats'
  },

  supportDocumentation: {
    title: 'Support & Documentation',
    documentation: {
      searchTitle: 'Search Documentation',
      searchDescription: 'Find guides, best practices, and technical documentation',
      searchPlaceholder: 'Search documentation...',
      learnMore: 'Learn more',
      noDocsFound: 'No documentation found',
      items: {
        gettingStarted: {
          title: 'Getting Started with AI Hub',
          description: 'Learn the platform basics and set up your first environment.',
          category: 'Getting Started'
        },
        userRoleManagement: {
          title: 'User & Role Management',
          description: 'Manage users, roles, and permissions in your tenant.',
          category: 'Administration'
        },
        agentConfiguration: {
          title: 'Agent Configuration',
          description: 'Detailed guide for configuring various AI agents.',
          category: 'Agents'
        },
        backupRecovery: {
          title: 'Backup & Recovery',
          description: 'Create backups and restore your data in emergencies.',
          category: 'Data Management'
        },
        securityCompliance: {
          title: 'Security & Compliance',
          description: 'Best practices for security, 2FA, and compliance requirements.',
          category: 'Security'
        },
        apiDocumentation: {
          title: 'API Documentation',
          description: 'Complete reference of the AI Hub REST API for developers.',
          category: 'Developer'
        },
        monitoringLogging: {
          title: 'Monitoring & Logging',
          description: 'Monitor system performance and analyze activity logs.',
          category: 'Monitoring'
        },
        troubleshooting: {
          title: 'Troubleshooting Guide',
          description: 'Solutions for common problems and error messages.',
          category: 'Troubleshooting'
        }
      }
    },
    faq: {
      items: {
        twoFactorAuth: {
          question: 'How do I enable two-factor authentication?',
          answer: 'You can enable 2FA in your tenant settings under \'Security & Compliance\'. After activation, all users will be prompted to set it up on their next login.'
        },
        automaticBackups: {
          question: 'How often are automatic backups created?',
          answer: 'Automatic backups are created daily at 02:00 AM by default. You can adjust the frequency and timing under \'Data Management > Backups & Recovery\'.'
        },
        aiModels: {
          question: 'Which AI models are supported?',
          answer: 'AI Hub supports GPT-4, GPT-4 Turbo, GPT-3.5 Turbo, Claude 3 Opus, Claude 3 Sonnet, and more. The complete list can be found under \'Modules & Features > Models\'.'
        },
        customAgents: {
          question: 'Can I create custom agents?',
          answer: 'Yes, in addition to the predefined agents (Email, Standards, Internet, Jelmoli), you can create custom agents with specific prompt configurations. Details can be found in the documentation under \'Agent Configuration\'.'
        },
        concurrentUsers: {
          question: 'How many users can work in the system simultaneously?',
          answer: 'The number of concurrent users depends on your subscription plan. By default, up to 50 simultaneous sessions are possible. For larger requirements, please contact our sales team.'
        },
        dataEncryption: {
          question: 'Is my data stored encrypted?',
          answer: 'Yes, all data is encrypted both in transit (TLS 1.3) and at rest (AES-256). More information can be found in our security documentation.'
        },
        restoreMessages: {
          question: 'How can I restore deleted messages?',
          answer: 'Deleted messages are kept in backup for 30 days. Contact support with the ticket ID and time period to request a restoration.'
        },
        supportedLanguages: {
          question: 'Which languages does AI Hub support?',
          answer: 'The user interface is available in German, English, French, and Brazilian Portuguese. The AI agents can communicate in over 50 languages, depending on the model chosen.'
        }
      }
    },
    tutorials: {
      title: 'Video Tutorials',
      description: 'Learn AI Hub through our step-by-step video guides',
      items: {
        gettingStarted: {
          title: 'Getting Started with AI Hub',
          description: 'Introduction to the platform and basic navigation',
          duration: '8:42 min'
        },
        userRoleManagement: {
          title: 'User and Role Management',
          description: 'Create users, assign roles, and manage permissions',
          duration: '12:15 min'
        },
        modelConfiguration: {
          title: 'Configure LLM Models',
          description: 'Set up API keys and test models',
          duration: '10:30 min'
        },
        agentSetup: {
          title: 'Set Up Agents',
          description: 'Configure Email Agent, Internet Agent, and other agents',
          duration: '15:20 min'
        },
        backupRecovery: {
          title: 'Backup & Recovery',
          description: 'Create backups and restore data',
          duration: '9:45 min'
        },
        monitoringAlerts: {
          title: 'Monitoring & Alerts',
          description: 'Set up system monitoring and alerts',
          duration: '11:00 min'
        }
      }
    },
    ticketStatus: {
      open: 'Open',
      inProgress: 'In Progress',
      resolved: 'Resolved',
      closed: 'Closed'
    },
    ticketPriority: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      urgent: 'Urgent'
    }
  },

  taskbar: {
    startMenu: 'Start Menu',
    applications: 'Applications',
    agentManagement: 'Agent Management',
    systemSettings: 'System Settings',
    options: 'Options',
    recentApps: 'Recent Apps',
    search: 'Search',
    searchPlaceholder: 'Search...',
    powerOptions: 'Power',
    logout: 'Logout',
    shutdown: 'Shutdown',
    restart: 'Restart'
  },

  moduleManager: {
    title: 'Modules & Agents',
    subtitle: 'Manage available AI modules and their configuration',
    activeOf: 'of',
    userRole: 'User Role:',
    administrator: 'Administrator',
    user: 'User',
    configure: 'Configure',
    status: {
      active: 'Active',
      inactive: 'Inactive',
      error: 'Error',
      unknown: 'Unknown'
    },
    access: {
      admin: 'Admin',
      premium: 'Premium',
      standard: 'Standard'
    },
    usage: 'Usage',
    accessDenied: 'Access Denied',
    adminRequired: 'Admin permission required',
    premiumRequired: 'Premium access required',
    unavailableModules: 'Unavailable Modules',
    unavailableSubtitle: 'These modules require extended permissions',
    modules: {
      chatAgent: {
        name: 'Chat Agent',
        description: 'General conversation agent for user queries'
      },
      documentAnalyzer: {
        name: 'Document Analyzer',
        description: 'Analyzes and extracts information from documents'
      },
      webSearch: {
        name: 'Web Search Agent',
        description: 'Searches the internet for current information'
      },
      calendarAssistant: {
        name: 'Calendar Assistant',
        description: 'Manages appointments and scheduling'
      },
      emailProcessor: {
        name: 'Email Processor',
        description: 'Processes and categorizes emails automatically'
      },
      dataAnalyst: {
        name: 'Data Analyst',
        description: 'Analyzes datasets and creates reports'
      },
      securityMonitor: {
        name: 'Security Monitor',
        description: 'Monitors system security and potential threats'
      },
      databaseConnector: {
        name: 'Database Connector',
        description: 'Connects and interacts with external databases'
      }
    }
  },

  roleManagement: {
    newRole: 'Create New Role',
    editRole: 'Edit Role',
    roleName: 'Role Name',
    roleDescription: 'Description',
    permissions: 'Permissions',
    assignedUsers: 'Assigned Users',
    selectUsers: 'Select Users',
    usersSelected: 'selected',
    user: 'User',
    users: 'Users',
    searchUsers: 'Search users...',
    allUsers: 'All Users',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    saveRole: 'Save Role',
    cancel: 'Cancel',
    deleteRole: 'Delete Role',
    roleCreated: 'Role successfully created',
    roleUpdated: 'Role successfully updated'
  },

  userManagementExtended: {
    department: 'Department',
    departments: 'Departments',
    selectDepartments: 'Select Departments',
    departmentsSelected: 'selected',
    newDepartment: 'New Department',
    allUsers: 'All Users',
    filterByDepartment: 'Filter by Department',
    showAllUsers: 'Show All Users',
    showActiveOnly: 'Active Users Only',
    userDetails: 'User Details',
    editUser: 'Edit User',
    newUser: 'New User',
    firstName: 'First Name',
    lastName: 'Last Name',
    phoneNumber: 'Phone Number',
    position: 'Position',
    hireDate: 'Hire Date',
    selectRole: 'Select Role',
    selectStatus: 'Select Status',
    userCreated: 'User successfully created',
    userUpdated: 'User successfully updated',
    // Additional fields for UserManagement
    addUser: 'Add User',
    exportCSV: 'Export CSV',
    import: 'Import',
    syncUsers: 'Sync Users',
    syncSuccess: 'Sync Successful',
    syncSuccessMessage: 'Users successfully synced',
    mergeUsers: 'Merge Users',
    duplicatesFound: 'Duplicates Found',
    mergeWarning: 'Ensure no duplicates remain',
    groupsLabel: 'Groups',
    lastLogin: 'Last Login',
    sortBy: 'Sort By',
    filterBy: 'Filter By',
    source: 'Source',
    status: 'Status',
    statusActive: 'Active',
    statusInactive: 'Inactive',
    statusLocked: 'Locked',
    deleteUser: 'Delete User',
    deleteUserConfirm: 'Confirm Deletion',
    deleteUserMessage: 'Are you sure you want to delete this user?',
    viewer: 'Viewer',
    admin: 'Admin',
    powerUser: 'Power User',
    user: 'User',
    localUser: 'Local User'
   },

  alertsManagement: {
    title: 'Alert Management',
    subtitle: 'Manage Your Alerts',
    searchPlaceholder: 'Search...',
    newAlert: 'New Alert',
    types: {
      error: 'Error',
      warning: 'Warning',
      info: 'Info'
    },
    severity: {
      critical: 'Critical',
      warning: 'Warning',
      info: 'Info'
    },
    table: {
      name: 'Name',
      type: 'Type',
      condition: 'Condition',
      threshold: 'Threshold',
      channels: 'Channels',
      triggers: 'Triggers',
      lastTrigger: 'Last Trigger',
      status: 'Status',
      actions: 'Actions'
    },
    channels: {
      email: 'Email',
      slack: 'Slack'
    },
    status: {
      active: 'Active',
      inactive: 'Inactive'
    },
    actions: {
      newAlert: 'New Alert',
      duplicate: 'Duplicate',
      edit: 'Edit',
      delete: 'Delete'
    },
    notificationChannels: {
      title: 'Notification Channels',
      subtitle: 'Select the channels you want to receive notifications on'
    },
    panel: {
      editAlert: 'Edit Alert',
      createAlert: 'Create Alert'
    },
    form: {
      basicInfo: 'Basic Information',
      alertName: 'Alert Name',
      alertNamePlaceholder: 'Enter the alert name',
      alertNameHelper: 'The alert name should be unique',
      type: 'Type',
      conditions: 'Conditions',
      condition: 'Condition',
      conditionPlaceholder: 'Enter the condition',
      conditionHelper: 'Describe the condition that triggers the alert',
      threshold: 'Threshold',
      thresholdPlaceholder: 'Enter the threshold',
      channels: 'Channels',
      selectChannels: 'Select Channels',
      email: 'Email',
      slack: 'Slack',
      saveButton: 'Save',
      cancelButton: 'Cancel'
    },
    deleteDialog: {
      title: 'Delete Alert',
      description: 'Are you sure you want to delete this alert?',
      cancel: 'Cancel',
      confirm: 'Delete'
    }
  },

  // System Monitoring
  systemMonitoring: {
    title: 'System Monitoring',
    subtitle: 'Monitor the performance of your system',
    network: 'Network',
    online: 'Online',
    offline: 'Offline',
    restricted: 'Restricted',
    metrics: {
      title: 'Metrics',
      cpu: 'CPU',
      memory: 'Memory',
      disk: 'Disk',
      network: 'Network'
    },
    services: {
      title: 'Services',
      status: 'Status',
      uptime: 'Uptime',
      responseTime: 'Response Time',
      online: 'Online',
      offline: 'Offline',
      degraded: 'Degraded'
    },
    requests: {
      title: 'Requests',
      subtitle: 'Monitor incoming requests'
    },
    performance: {
      title: 'Performance',
      subtitle: 'Monitor system performance'
    },
    database: {
      title: 'Database',
      connections: 'Connections',
      queries: 'Queries',
      cacheHitRate: 'Cache Hit Rate'
    }
  },

  // Activity Log Extended
  activityLogExtended: {
    sort: 'Sort',
    resetFilter: 'Reset Filter',
    successful: 'Successful',
    warning: 'Warning',
    error: 'Error',
    information: 'Information',
    timestamp: 'Timestamp',
    user: 'User',
    action: 'Action',
    resource: 'Resource',
    ipAddress: 'IP Address',
    detailsColumn: 'Details',
    noDetails: 'No Details',
    exportFilename: 'activity_log.csv',
    actions: {
      login: 'Login',
      apiRateLimitReached: 'API Rate Limit Reached'
    },
    resources: {
      emailAgent: 'Email Agent'
    },
    details: {
      fullBackupSuccess: 'Full Backup Successful',
      rateLimitReached: 'Rate Limit Reached',
      newUser: 'New User',
      roleAssigned: 'Role Assigned',
      memoryTokenUpdated: 'Memory Token Updated',
      timeoutAfter30s: 'Timeout After 30s'
    }
  },

  // Tenant Settings Extended
  tenantSettingsExtended: {
    general: {
      tenantInformation: 'Tenant Information',
      tenantInformationDesc: 'Name, Logo and Color Settings',
      tenantName: 'Tenant Name',
      tenantLogo: 'Tenant Logo',
      logoUploaded: 'Logo uploaded',
      noLogoSelected: 'No logo selected',
      preview: 'Preview:',
      white: 'White',
      gray: 'Gray',
      black: 'Black',
      logoPreview: 'Logo Preview',
      primaryColor: 'Primary Color',
      accentColor: 'Accent Color'
    },
    company: {
      companyInformation: 'Company Information',
      companyInformationDesc: 'Legal and Contact Information',
      masterEntryNote: 'Data can only be changed in the master entry.',
      companyName: 'Company Name',
      uidTaxNumber: 'UID / Tax Number',
      phoneNumber: 'Phone Number',
      email: 'Email',
      domain: 'Domain',
      address: 'Address',
      zipCode: 'ZIP Code',
      city: 'City'
    },
    regional: {
      regionalSettings: 'Regional Settings',
      regionalSettingsDesc: 'Language, Timezone and Formats',
      language: 'Language',
      languageGerman: 'Deutsch',
      languageEnglish: 'English',
      languageFrench: 'Français',
      languageItalian: 'Italiano',
      timezone: 'Timezone',
      timezoneZurich: 'Europe/Zurich (CET)',
      timezoneBerlin: 'Europe/Berlin (CET)',
      timezoneUTC: 'UTC',
      currency: 'Currency',
      currencyCHF: 'CHF (Swiss Franc)',
      currencyEUR: 'EUR (Euro)',
      currencyUSD: 'USD (US Dollar)',
      dateFormat: 'Date Format',
      dateFormatDDMMYYYY: 'DD.MM.YYYY',
      dateFormatMMDDYYYY: 'MM/DD/YYYY',
      dateFormatYYYYMMDD: 'YYYY-MM-DD'
    },
    security: {
      passwordPolicies: 'Password Policies',
      passwordPoliciesDesc: 'Define requirements for user passwords',
      minPasswordLength: 'Minimum Password Length',
      minPasswordLengthDesc: 'Minimum number of characters for passwords',
      uppercaseRequired: 'Uppercase Required',
      uppercaseRequiredDesc: 'At least one uppercase letter (A-Z)',
      digitsRequired: 'Digits Required',
      digitsRequiredDesc: 'At least one digit (0-9)',
      specialCharsRequired: 'Special Characters Required',
      specialCharsRequiredDesc: 'At least one special character (!@#$%...)',
      passwordExpiry: 'Password Expiry (days)',
      passwordExpiryDesc: '0 = no expiry',
      twoFactorAuth: 'Two-Factor Authentication (2FA)',
      twoFactorAuthDesc: 'Multi-factor authentication for enhanced security',
      enforce2FAAll: 'Enforce 2FA for all users',
      enforce2FAAllDesc: 'All users must enable 2FA',
      enforce2FAAdmins: 'Enforce 2FA for administrators',
      enforce2FAAdminsDesc: 'Only administrators must enable 2FA',
      sessionSettings: 'Session Settings',
      sessionSettingsDesc: 'Timeout and Session Management',
      sessionTimeout: 'Session Timeout (minutes)',
      sessionTimeoutDesc: 'Automatic logout after inactivity',
      absoluteSessionDuration: 'Absolute Session Duration (hours)',
      absoluteSessionDurationDesc: 'Maximum session duration, 0 = unlimited',
      privacyCompliance: 'Privacy & Compliance',
      privacyComplianceDesc: 'GDPR and Swiss Data Protection Act',
      gdprMode: 'Enable GDPR Mode',
      gdprModeDesc: 'Additional GDPR compliance features',
      swissDSG: 'Swiss DSG Mode',
      swissDSGDesc: 'Swiss Data Protection Act (nDSG)',
      dataRetention: 'Data Retention (days)',
      dataRetentionDesc: 'Automatic deletion after X days',
      archiveBeforeDeletion: 'Archive Before Deletion',
      archiveBeforeDeletionDesc: 'Archive data before deletion',
      // EU AI Act
      euAiAct: 'EU AI Act',
      euAiActDesc: 'Compliance with EU Artificial Intelligence Regulation',
      enableEuAiActCompliance: 'Enable EU AI Act Compliance',
      enableEuAiActComplianceDesc: 'Additional compliance features for AI systems',
      riskClassification: 'Risk Classification',
      riskClassificationDesc: 'Classification of AI system by risk level',
      aiSystemDocumentation: 'AI System Documentation',
      aiSystemDocumentationDesc: 'Automatic documentation of AI decisions',
      humanOversightRequired: 'Human Oversight Required',
      humanOversightRequiredDesc: 'Human review for critical AI decisions',
      // EU AI Act - Status Overview
      systemStatusOverview: 'System Status',
      systemStatusOverviewDesc: 'Quick overview of the AI system compliance status',
      isHighRiskSystem: 'Is this system a high-risk AI system?',
      highRiskSystemYes: 'Yes - High-Risk System',
      highRiskSystemNo: 'No - Not a High-Risk System',
      highRiskAdditionalObligations: 'Additional obligations apply to high-risk AI systems under the EU AI Act. Please ensure all requirements are met.',
      assessmentDate: 'Assessment Date',
      assessedBy: 'Assessed under EU AI Act',
      euAiActLink: 'View Legal Text',
      registrationStatus: 'Registration Status',
      registrationComplete: 'Complete',
      registrationPending: 'Pending',
      // EU AI Act - Annex III Categories
      annexIIICategories: 'High-Risk Categories (Annex III)',
      annexIIICategoriesDesc1: 'If any criterion applies, the AI system is classified as high-risk.',
      annexIIICategoriesDesc2: 'If the AI system is classified as high-risk, a notice will be displayed to the user in the frontend.',
      biometricIdentification: 'Biometric Identification',
      biometricIdentificationDesc: 'Facial recognition, iris scan, voice analysis, gait analysis (Annex III, Section 1)',
      criticalInfrastructure: 'Critical Infrastructure',
      criticalInfrastructureDesc: 'Power grids, transport systems, water supply (Annex III, Section 2)',
      educationTraining: 'Education and Training',
      educationTrainingDesc: 'Automated assessments, admission systems, learning progress measurement (Annex III, Section 3)',
      employmentManagement: 'Employment and Personnel Management',
      employmentManagementDesc: 'CV screening, promotions, termination analysis (Annex III, Section 4)',
      essentialServices: 'Essential Services',
      essentialServicesDesc: 'Credit scoring, insurance assessment, social welfare (Annex III, Section 5)',
      lawEnforcement: 'Law Enforcement',
      lawEnforcementDesc: 'Risk assessment, evidence analysis, suspect classification (Annex III, Section 6)',
      migrationBorderControl: 'Migration and Border Control',
      migrationBorderControlDesc: 'Automated applications, risk profiles, decision support (Annex III, Section 7)',
      justiceDemo: 'Justice and Democracy',
      justiceDemoDesc: 'Support for judicial decisions, legal interpretation (Annex III, Section 8)',
      // Registered High-Risk AI System
      registeredHighRiskSystem: 'Registered High-Risk AI System',
      registeredHighRiskSystemDesc: 'This system has been officially registered with the EU Commission',
      registration: 'Registration',
      conformityMarking: 'Conformity Marking',
      technicalDocumentation: 'Technical Documentation',
      download: 'Download',
      // Transparency Requirements
      transparencyRequirements: 'Transparency Requirements',
      transparencyRequirementsDesc: 'The following information will be displayed to the user',
      aiNoticeDisplay: 'Display text below chat input field: AI Notice',
      aiNoticeDisplayDesc: 'Responses may contain errors. Please verify content before use.',
      orchestratorBasis: 'Orchestrator Decision Basis',
      orchestratorBasisDesc: '',
      responsibilities: 'Responsibilities',
      responsibilitiesDesc: '(see Responsibilities)',
      humanInLoop: 'Human in the Loop',
      humanInLoopDesc: 'This AI system does not forward information via automation. This is done exclusively by the human in the loop.',
      // Technical Security Measures
      technicalSecurityMeasures: 'Technical Security Measures',
      technicalSecurityMeasuresDesc: 'Shows all relevant security measures of this system:',
      killswitch: 'Kill-Switch',
      killswitchDesc: 'Takes the entire system offline',
      killswitchActiveWarning: 'Warning! The entire system has been taken offline.',
      twoFactorAuthReference: 'Two-Factor Authentication (2FA)',
      twoFactorAuthReferenceDesc: 'Found in the "Security & Compliance" section',
      whitelistReference: 'Whitelist',
      whitelistReferenceDesc: 'Found in the "Security & Compliance" section',
      tenantRolesReference: 'Role Model',
      tenantRolesReferenceDesc: 'Found in the "Security & Compliance" section',
      loggingDataReference: 'Logging Data',
      loggingDataReferenceDesc: 'Found in the "Logging & Monitoring" section',
      systemCriticalAlerts: 'System Critical Error Alerts',
      systemCriticalAlertsDesc: 'Found in the "Logging & Monitoring" section',
      backupRecoveryReference: 'Backup and Recovery',
      backupRecoveryReferenceDesc: 'Found in the "Data Management" section',
      goTo: 'Go to',
      // Human Oversight
      humanOversight: 'Human Oversight',
      humanOversightDesc: 'Monitoring, Reporting and Intervention in the AI System',
      humanInLoopOversight: 'This AI system does not forward information via automation. This is done exclusively by the human in the loop.',
      reviewResetLimit: 'Review, Reset and Limit',
      reviewResetLimitDesc: 'Intervention on all processes from Logging & Monitoring',
      staffTraining: 'Staff Training',
      staffTrainingDesc: 'Has the staff been comprehensively trained',
      feedbackReporting: 'Feedback & Reporting',
      feedbackReportingDesc: 'A report can be left under each chatbot entry. The text field opens automatically after activating the dislike button',
      auditTrail: 'Audit Trail',
      auditTrailDesc: 'A complete, tamper-proof logging of all relevant system events',
      oversightDocumentation: 'Documentation "Oversight Technical / Organizational"',
      oversightDocumentationDesc: 'Download documentation',
      download: 'Download'
    },
    access: {
      singleSignOn: 'Single Sign-On (SSO)',
      singleSignOnDesc: 'Centralized authentication via identity provider',
      enableSSO: 'Enable SSO',
      enableSSODesc: 'Allows users to log in via an external identity provider',
      identityProvider: 'Identity Provider',
      noProvider: 'No Provider',
      azureAD: 'Azure Active Directory',
      googleIdentity: 'Google Identity Platform',
      okta: 'Okta',
      customSAML: 'Custom SAML 2.0',
      azureConfiguration: 'Azure AD Configuration',
      tenantID: 'Tenant ID',
      tenantIDPlaceholder: 'Your Azure Tenant ID',
      clientID: 'Client ID',
      clientIDPlaceholder: 'Your Azure Application (Client) ID',
      clientSecret: 'Client Secret',
      clientSecretPlaceholder: 'Your Azure Client Secret',
      testConnection: 'Test Connection',
      notConnected: 'Not connected',
      connected: 'Connected',
      connectionError: 'Connection error',
      testing: 'Testing...',
      connectionSuccessful: 'Connection successful!',
      ipWhitelist: 'IP Whitelist',
      ipWhitelistDesc: 'Restrict access to specific IP addresses',
      enableIPWhitelist: 'Enable IP Whitelist',
      enableIPWhitelistDesc: 'Only allow connections from whitelisted IPs',
      allowedIPs: 'Allowed IP Addresses',
      ipAddress: 'IP Address',
      ipAddressPlaceholder: 'e.g. 192.168.1.1',
      addIP: 'Add IP',
      ipWarning: 'Warning: Incorrect IP configuration can lock you out!',
      ipFormatError: 'Invalid IP address. Format: xxx.xxx.xxx.xxx',
      ssoRequirements: 'SSO Requirements',
      ssoRequirementsDesc: 'Additional security requirements for SSO',
      enforce2FAForSSO: 'Enforce 2FA for SSO users',
      enforce2FAForSSODesc: 'All users logged in via SSO must enable 2FA',
      verifiedEmailOnly: 'Verified Emails Only',
      verifiedEmailOnlyDesc: 'Only allow users with verified email addresses',
      autoTokenRefresh: 'Automatic Token Refresh',
      autoTokenRefreshDesc: 'Automatically extend sessions when user is active'
    },
    dsgvo: {
      basicFunctions: 'GDPR Basic Functions',
      basicFunctionsDesc: 'Controls the most fundamental GDPR topics in the Orchestrator',
      datenschutzmodus: 'Privacy Mode',
      datenschutzmodusDesc: 'All requirements are active when this mode is enabled',
      memory: 'Memory',
      memoryDesc: 'Handles the storage of personal data in the Orchestrator',
      memorySettings: 'Memory Settings',
      duration: 'Duration',
      deleteAfterSession: 'Delete after each session',
      backup: 'Backup',
      backupDesc: 'Handles backup storage of personal data in the Orchestrator',
      agentLogging: 'Agent Logging',
      agentLoggingDesc: 'Storage of agent responses',
      agentLoggingSettings: 'Agent Logging Settings',
      onlySystemDiagnose: 'For system diagnostics only',
      transparencyInformation: 'Transparency & Information',
      transparencyInformationDesc: 'Regulation of data subject information. This information is displayed in the User Entry under Account Settings / GDPR',
      verantwortlicher: 'Controller',
      verantwortlicherDesc: 'Who controls the data processing?',
      verantwortlicherAnbieter: 'Provider',
      verantwortlicherTenant: 'Tenant (Company XY)',
      verantwortlicherOther: 'Other (see details)',
      verantwortlicherPlaceholder: 'Please provide details about the controller...',
      selectOption: 'Select...',
      zwecke: 'Purposes',
      zweckeDesc: 'For what are data used?',
      zweckKontextverarbeitung: 'Context processing',
      zweckAgentenwahl: 'Agent selection',
      zweckNormenVorschlaege: 'Standards & Suggestions',
      zweckMemory: 'Memory',
      zweckRAGSuche: 'RAG search',
      zweckFehleranalyse: 'Error analysis',
      zweckProtokollierung: 'Logging',
      rechtsgrundlage: 'Legal Basis',
      rechtsgrundlageDesc: 'Why is this processing allowed?',
      rechtsgrundlageBerechtigtesInteresse: 'Legitimate interest',
      rechtsgrundlageEinwilligung: 'Consent',
      rechtsgrundlageVertragserfuellung: 'Contract fulfillment',
      rechtsgrundlageRechtlicheVerpflichtung: 'Legal obligation',
      rechtsgrundlageOeffentlichesInteresse: 'Public interest',
      datenkategorien: 'Data Categories',
      datenkategorienDesc: 'What is being stored?',
      datenkategorieTexteingaben: 'Text inputs',
      datenkategorieAgentenantworten: 'Agent responses',
      datenkategorieGespraechsverlauf: 'Conversation history',
      datenkategorieDateiuploads: 'File uploads',
      datenkategorieMetadaten: 'Metadata',
      datenkategorieNutzerprofil: 'User profile',
      datenkategorieRAGErgebnisse: 'RAG results',
      datenkategorieSystemprotokolle: 'System logs',
      empfaenger: 'Recipients',
      empfaengerDesc: 'Where do the data go?',
      empfaengerLLMAnbieter: 'LLM providers',
      empfaengerLokaleModelle: 'Local models',
      empfaengerInterneAgenten: 'Internal agents',
      empfaengerExterneAgenten: 'External agents',
      empfaengerRAGDienste: 'RAG services',
      empfaengerMonitoringLogging: 'Monitoring/Logging systems',
      empfaengerBackupSysteme: 'Backup systems',
      speicherdauer: 'Storage Duration',
      speicherdauerDesc: 'Information according to selection from "GDPR Basic Information"',
      deactivated: 'Deactivated',
      afterEachSession: 'After each session',
      systemDiagnose: 'System diagnostics',
      rechte: 'Rights',
      rechteDesc: 'What can data subjects request?',
      rechtAuskunft: 'Information',
      rechtBerichtigung: 'Rectification',
      rechtLoeschung: 'Erasure',
      rechtEinschraenkung: 'Restriction of processing',
      rechtWiderspruch: 'Objection',
      rechtDatenuebertragbarkeit: 'Data portability',
      rechtWiderruf: 'Withdrawal of consent',
      drittland: 'Third Country Transfer',
      drittlandDesc: 'Are data transferred to the USA?',
      drittlandKeine: 'No third country transfer',
      drittlandUSASCCs: 'USA – with SCCs',
      drittlandUSATIA: 'USA – with TIA',
      drittlandEUEWR: 'EU/EEA',
      drittlandAndereSCCs: 'Other third countries – with SCCs',
      drittlandLokal: 'Local processing without transfer',
      automationNotice: 'Notice on Automation',
      automationNoticeDesc: 'Is AI being used?',
      aiNotice: 'AI Notice:',
      aiNoticeText: 'Responses may contain errors. Please review content before use.',
      selected: 'selected',
      documentedProcessingActivities: 'Documented Processing Activities',
      documentedProcessingActivitiesDesc: 'Registry of data processing activities. This registry serves transparency and traceability in the use of personal data.',
      providerSystemLevel: 'Provider (System Level)',
      providerSystemLevelDesc: 'These operations are automatically processed by the platform:',
      contextStorageOrchestrator: 'Context storage in Orchestrator (Memory)',
      loggingAccessErrors: 'Logging of accesses, errors, decisions',
      communicationAgentsAPI: 'Communication with agents via API',
      download: 'Download',
      tenantLevel: 'Tenant Level',
      tenantLevelDesc: 'These data processing operations are assigned to the tenant:',
      tenantLevelItem1: 'Use of agents with access to content or personal data',
      tenantLevelItem2: 'Storage of text inputs and responses',
      tenantLevelItem3: 'Session or user-related memory (if activated)',
      dsfaTitle: 'Data Protection Impact Assessment (DPIA)',
      dsfaDesc: 'For certain types of data processing with a likely high risk to the rights and freedoms of data subjects, a so-called Data Protection Impact Assessment (DPIA) must be carried out.',
      dsfaResponsibility: 'Responsibility',
      dsfaResponsibilityItem1: 'The tenant is responsible under data protection law and must assess whether a DPIA is necessary.',
      dsfaResponsibilityItem2: 'The provider makes the technical foundations available so that the tenant can carry out this assessment in an informed manner.',
      dsfaRiskAssessment: 'Risk Assessment',
      dsfaRiskAssessmentDesc: 'Each agent has its own risk category calculator and is independently assessed based on the information provided.',
      dsfaGoTo: 'Go to',
      dsfaAdditional: 'Additional Information',
      dsfaAdditionalItem1: 'DPIA notice in admin - When activating high-risk agents, a notice about possible DPIA obligation appears',
      dsfaAdditionalItem2: 'Export template - We provide a DPIA template upon request (PDF/Word)',
      dsfaAdditionalItem3: 'Configuration log - Documents which agents were active with which status',
      day: 'Day',
      days: 'Days',
      week: 'Week',
      weeks: 'Weeks',
      month: 'Month',
      months: 'Months',
      rightsOfDataSubjects: 'Rights of Data Subjects',
      rightsOfDataSubjectsDesc: 'All rights of data subjects are handled here',
      rightAuskunftTitle: 'Information',
      rightAuskunftDesc1: 'Every user has the right to know what data is stored about them, including source, purpose and recipients',
      rightAuskunftDesc2: 'Under «User Management» the data can be downloaded for each individual user',
      rightBerichtigungTitle: 'Rectification',
      rightBerichtigungDesc1: 'Every user has the right to have their user profile corrected',
      rightBerichtigungDesc2: 'Under «User Management» the data can be changed for each individual user',
      rightLoeschungTitle: 'Erasure',
      rightLoeschungDesc1: 'Every user has the right to delete their data',
      rightLoeschungDesc2: 'Under «User Management» the data can be deleted for each individual user',
      rightEinschraenkungTitle: 'Restriction',
      rightEinschraenkungDesc1: 'Every user has the right to «restriction» or «no profiling»',
      rightEinschraenkungDesc2: 'The UI provides the option to choose between the following options:',
      rightEinschraenkungMemory: 'Use of conversation context memory - Toggle in UI',
      rightEinschraenkungPersonalisierung: 'Use of user attributes - Opt-in, role control can be disabled',
      rightEinschraenkungProfilbildung: 'Creation of individual user profiles - Disable profiling or UI consent',
      rightEinschraenkungAgentenwahl: 'Behavior-based control - Session-based only, no permanent storage',
      personalization: 'Personalization',
      profiling: 'Profiling',
      automatedAgentSelection: 'Automated Agent Selection',
      rightDatenuebertragbarkeitTitle: 'Data Portability',
      rightDatenuebertragbarkeitDesc1: 'Every user has the right to receive their data in a structured, common and machine-readable format and to transfer it to another provider without being hindered',
      rightDatenuebertragbarkeitDesc2: 'Under «User Management» the data can be downloaded for each individual user',
      rightWiderspruchTitle: 'Objection',
      rightWiderspruchDesc1: 'Every user has the right to object. The following notice is available in the UI:',
      rightWiderspruchQuote: '„You can object to the storage of your data"',
      rightNoAutomatedDecision: 'No fully automated decision without possibility of review',
      rightNoAutomatedDecisionDesc: 'Automated decisions by the AI system are clearly identified as such („AI-based suggestion") and can be supplemented or overridden by human review at any time („Human-in-the-loop")',
      goTo: 'Go to',
      dataProcessingAccess: 'Data Processing & Access',
      dataProcessingAccessDesc: 'This platform supports two operating models: «no access» and «support/hosting access»',
      contractualModel: 'Contractually agreed operating model:',
      contractualModelText: 'Standard - No access, no data processing',
      standardNoAccess: 'Standard: No Access – no data processing',
      standardNoAccessModel: 'The provider has no access to stored data (e.g. prompts, memory, agent responses)',
      standardNoAccessDesc: 'Access model:',
      standardNoAccessItem1: 'Complete tenant isolation',
      standardNoAccessItem2: 'Separate databases and logs',
      standardNoAccessItem3: 'No access by system admins or support',
      standardNoAccessItem4: 'No DPA required (noted in contract «Non-DPA model»)',
      standardNoAccessNote: 'Contract adjustment necessary in case of change',
      optionalSupportAccess: 'Optional: Support or hosting access active',
      optionalSupportAccessModel: 'The provider receives temporary access on request for:',
      optionalSupportAccessDesc: 'Access model:',
      optionalSupportAccessItem1: 'Technical support (e.g. troubleshooting, log analysis)',
      optionalSupportAccessItem2: 'Hosting or platform operation',
      optionalSupportAccessItem3: 'Data Processing Agreement (DPA) according to Art. 28 GDPR',
      optionalSupportAccessNote: 'Access only after written approval by the tenant',
      accessLogged: 'Access is logged (Audit Trail)'
    }
  },

  chatExtended: {
    filesAttached: '(Files attached)'
  },

  authorized: 'Authorized',
  notAuthorized: 'Not Authorized'
};

// French translations
export const extendedTranslationsFR: ExtendedTranslations = {
  twoFactorCode: {
    title: 'Vérification 2FA',
    subtitle: 'Entrez le code à 6 chiffres',
    codeLabel: 'Code de vérification',
    codePlaceholder: '000000',
    verifyButton: 'Vérifier le code',
    invalidCode: 'Code invalide',
    resendCode: 'Renvoyer le code'
  },

  promptsFrameworks: {
    title: 'Prompts & Frameworks',
    library: 'Bibliothèque de Prompts',
    frameworks: 'Frameworks',
    searchPrompts: 'Rechercher prompts...',
    searchFrameworks: 'Rechercher frameworks...',
    category: 'Catégorie',
    allCategories: 'Toutes les Catégories',
    copyPrompt: 'Copier le Prompt',
    copied: 'Copié !',
    edit: 'Modifier',
    delete: 'Supprimer',
    newPrompt: 'Nouveau Prompt',
    newFramework: 'Nouveau Framework',
    promptTitle: 'Titre',
    promptDescription: 'Description',
    promptText: 'Texte du Prompt',
    frameworkStructure: 'Structure du Framework',
    tags: 'Tags',
    savePrompt: 'Enregistrer le Prompt',
    saveFramework: 'Enregistrer le Framework',
    cancel: 'Annuler',
    deleteConfirm: 'Confirmer la Suppression',
    deleteMessage: 'Voulez-vous vraiment supprimer cet élément ?',

    categories: {
      strategy: 'Stratégie & Vision',
      sales: 'Ventes & Acquisition',
      marketing: 'Marketing & Branding',
      hr: 'RH & Recrutement',
      finance: 'Finance & Contrôle',
      innovation: 'Innovation & Développement',
      communication: 'Communication',
      technology: 'Technologie',
      decision: 'Prise de Décision',
      analysis: 'Analyse & Insights'
    }
  },

  thinkTank: {
    title: 'Think Tank',
    subtitle: 'Analyse de Scénario Multi-Perspectivas',
    scenario: 'Scénario / Question',
    scenarioPlaceholder: 'Décrivez votre scénario ou question...',
    perspectives: 'Perspectives',
    addPerspective: 'Ajouter une Perspective',
    removePerspective: 'Supprimer',
    startSession: 'Démarrer la Session',
    stopSession: 'Arrêter la Session',
    clearSession: 'Réinitialiser la Session',
    thinking: 'Analyse en cours...',
    perspectivePlaceholder: 'ex. PDG, CTO, Client, Investisseur...',
    sessionActive: 'Session Active'
  },

  thinkTankPanel: {
    title: 'Think Tank',
    pinboard: 'Tableau d\'Épinglage',
    noPinnedItems: 'Aucun élément épinglé',
    chats: 'Chats',
    spaces: 'Espaces',
    prompts: 'Prompts',
    archive: 'Archive',
    trash: 'Corbeille',
    sortByDate: 'Trier par Date',
    sortAlphabetically: 'Trier Alphabétiquement',
    ascending: 'Croissant',
    descending: 'Décroissant',
    searchChats: 'Rechercher des chats...',
    searchSpaces: 'Rechercher des espaces...',
    searchPrompts: 'Rechercher des prompts...',
    newSpace: 'Nouvel Espace',
    newCategory: 'Nouvelle Catégorie',
    spaceName: 'Nom de l\'Espace',
    categoryName: 'Nom de la Catégorie',
    create: 'Créer',
    dateGroups: {
      today: 'Aujourd\'hui',
      yesterday: 'Hier',
      lastWeek: 'La Semaine Dernière',
      lastMonth: 'Le Mois Dernier',
      older: 'Plus Ancien'
    },
    restore: 'Restaurer',
    deleteConfirmTitle: 'Supprimer Définitivement ?',
    deleteConfirmMessage: 'Cet élément sera supprimé définitivement.',
    deletePermanently: 'Supprimer Définitivement',
    emptyTrash: 'La corbeille est vide',
    emptyArchive: 'L\'archive est vide',
    backToChats: 'Retour aux Chats'
  },

  supportDocumentation: {
    title: 'Support & Documentation',
    documentation: {
      searchTitle: 'Rechercher dans la Documentation',
      searchDescription: 'Trouvez des guides, bonnes pratiques et documentation technique',
      searchPlaceholder: 'Rechercher dans la documentation...',
      learnMore: 'En savoir plus',
      noDocsFound: 'Aucune documentation trouvée',
      items: {
        gettingStarted: {
          title: 'Démarrage avec AI Hub',
          description: 'Apprenez les bases de la plateforme et configurez votre premier environnement.',
          category: 'Démarrage'
        },
        userRoleManagement: {
          title: 'Gestion des Utilisateurs & Rôles',
          description: 'Gérez les utilisateurs, rôles et permissions dans votre tenant.',
          category: 'Administration'
        },
        agentConfiguration: {
          title: 'Configuration des Agents',
          description: 'Guide détaillé pour configurer les différents agents IA.',
          category: 'Agents'
        },
        backupRecovery: {
          title: 'Sauvegarde & Récupération',
          description: 'Créez des sauvegardes et restaurez vos données en cas d\'urgence.',
          category: 'Gestion des Données'
        },
        securityCompliance: {
          title: 'Sécurité & Conformité',
          description: 'Bonnes pratiques pour la sécurité, 2FA et exigences de conformité.',
          category: 'Sécurité'
        },
        apiDocumentation: {
          title: 'Documentation API',
          description: 'Référence complète de l\'API REST AI Hub pour les développeurs.',
          category: 'Développeur'
        },
        monitoringLogging: {
          title: 'Surveillance & Journalisation',
          description: 'Surveillez les performances du système et analysez les journaux d\'activité.',
          category: 'Surveillance'
        },
        troubleshooting: {
          title: 'Guide de Dépannage',
          description: 'Solutions pour les problèmes courants et messages d\'erreur.',
          category: 'Dépannage'
        }
      }
    },
    faq: {
      items: {
        twoFactorAuth: {
          question: 'Comment activer l\'authentification à deux facteurs?',
          answer: 'Vous pouvez activer la 2FA dans les paramètres de votre tenant sous \'Sécurité & Conformité\'. Après activation, tous les utilisateurs seront invités à la configurer lors de leur prochaine connexion.'
        },
        automaticBackups: {
          question: 'À quelle fréquence les sauvegardes automatiques sont-elles créées?',
          answer: 'Les sauvegardes automatiques sont créées quotidiennement à 02:00 par défaut. Vous pouvez ajuster la fréquence et l\'heure sous \'Gestion des Données > Sauvegardes & Récupération\'.'
        },
        aiModels: {
          question: 'Quels modèles IA sont pris en charge?',
          answer: 'AI Hub prend en charge GPT-4, GPT-4 Turbo, GPT-3.5 Turbo, Claude 3 Opus, Claude 3 Sonnet et plus encore. La liste complète se trouve sous \'Modules & Fonctionnalités > Modèles\'.'
        },
        customAgents: {
          question: 'Puis-je créer des agents personnalisés?',
          answer: 'Oui, en plus des agents prédéfinis (Email, Normes, Internet, Jelmoli), vous pouvez créer des agents personnalisés avec des configurations de prompt spécifiques. Les détails se trouvent dans la documentation sous \'Configuration des Agents\'.'
        },
        concurrentUsers: {
          question: 'Combien d\'utilisateurs peuvent travailler simultanément dans le système?',
          answer: 'Le nombre d\'utilisateurs simultanés dépend de votre plan d\'abonnement. Par défaut, jusqu\'à 50 sessions simultanées sont possibles. Pour des besoins plus importants, veuillez contacter notre équipe commerciale.'
        },
        dataEncryption: {
          question: 'Mes données sont-elles stockées de manière chiffrée?',
          answer: 'Oui, toutes les données sont chiffrées à la fois en transit (TLS 1.3) et au repos (AES-256). Plus d\'informations sont disponibles dans notre documentation de sécurité.'
        },
        restoreMessages: {
          question: 'Comment puis-je restaurer les messages supprimés?',
          answer: 'Les messages supprimés sont conservés dans la sauvegarde pendant 30 jours. Contactez le support avec l\'ID du ticket et la période pour demander une restauration.'
        },
        supportedLanguages: {
          question: 'Quelles langues AI Hub prend-il en charge?',
          answer: 'L\'interface utilisateur est disponible en allemand, anglais, français et portugais brésilien. Les agents IA peuvent communiquer dans plus de 50 langues, selon le modèle choisi.'
        }
      }
    },
    tutorials: {
      title: 'Tutoriels Vidéo',
      description: 'Apprenez AI Hub grâce à nos guides vidéo étape par étape',
      items: {
        gettingStarted: {
          title: 'Démarrage avec AI Hub',
          description: 'Introduction à la plateforme et navigation de base',
          duration: '8:42 min'
        },
        userRoleManagement: {
          title: 'Gestion des Utilisateurs et des Rôles',
          description: 'Créer des utilisateurs, attribuer des rôles et gérer les permissions',
          duration: '12:15 min'
        },
        modelConfiguration: {
          title: 'Configurer les Modèles LLM',
          description: 'Configurer les clés API et tester les modèles',
          duration: '10:30 min'
        },
        agentSetup: {
          title: 'Configurer les Agents',
          description: 'Configurer l\'Agent Email, l\'Agent Internet et d\'autres agents',
          duration: '15:20 min'
        },
        backupRecovery: {
          title: 'Sauvegarde & Récupération',
          description: 'Créer des sauvegardes et restaurer des données',
          duration: '9:45 min'
        },
        monitoringAlerts: {
          title: 'Surveillance & Alertes',
          description: 'Configurer la surveillance du système et les alertes',
          duration: '11:00 min'
        }
      }
    },
    ticketStatus: {
      open: 'Ouvert',
      inProgress: 'En Cours',
      resolved: 'Résolu',
      closed: 'Fermé'
    },
    ticketPriority: {
      low: 'Faible',
      medium: 'Moyen',
      high: 'Élevé',
      urgent: 'Urgent'
    }
  },

  taskbar: {
    startMenu: 'Menu Démarrer',
    applications: 'Applications',
    agentManagement: 'Gestion des Agents',
    systemSettings: 'Paramètres Système',
    options: 'Options',
    recentApps: 'Applications Récentes',
    search: 'Rechercher',
    searchPlaceholder: 'Rechercher...',
    powerOptions: 'Alimentation',
    logout: 'Déconnexion',
    shutdown: 'Arrêter',
    restart: 'Redémarrer'
  },

  moduleManager: {
    title: 'Modules & Agents',
    subtitle: 'Gérer les modules IA disponibles et leur configuration',
    activeOf: 'de',
    userRole: 'Rôle de l\'Utilisateur:',
    administrator: 'Administrateur',
    user: 'Utilisateur',
    configure: 'Configurer',
    status: {
      active: 'Actif',
      inactive: 'Inactif',
      error: 'Erreur',
      unknown: 'Inconnu'
    },
    access: {
      admin: 'Admin',
      premium: 'Premium',
      standard: 'Standard'
    },
    usage: 'Utilisation',
    accessDenied: 'Accès Refusé',
    adminRequired: 'Permission administrateur requise',
    premiumRequired: 'Accès premium requis',
    unavailableModules: 'Modules Non Disponibles',
    unavailableSubtitle: 'Ces modules nécessitent des permissions étendues',
    modules: {
      chatAgent: {
        name: 'Agent de Chat',
        description: 'Agent de conversation général pour les requêtes des utilisateurs'
      },
      documentAnalyzer: {
        name: 'Analyseur de Documents',
        description: 'Analyse et extrait des informations des documents'
      },
      webSearch: {
        name: 'Agent de Recherche Web',
        description: 'Recherche des informations actuelles sur Internet'
      },
      calendarAssistant: {
        name: 'Assistant de Calendrier',
        description: 'Gère les rendez-vous et la planification'
      },
      emailProcessor: {
        name: 'Processeur d\'Email',
        description: 'Traite et catégorise les emails automatiquement'
      },
      dataAnalyst: {
        name: 'Analyste de Données',
        description: 'Analyse les ensembles de données et crée des rapports'
      },
      securityMonitor: {
        name: 'Moniteur de Sécurité',
        description: 'Surveille la sécurité du système et les menaces potentielles'
      },
      databaseConnector: {
        name: 'Connecteur de Base de Données',
        description: 'Se connecte et interagit avec des bases de données externes'
      }
    }
  },

  roleManagement: {
    newRole: 'Créer un Nouveau Rôle',
    editRole: 'Modifier le Rôle',
    roleName: 'Nom du Rôle',
    roleDescription: 'Description',
    permissions: 'Permissions',
    assignedUsers: 'Utilisateurs Assignés',
    selectUsers: 'Sélectionner des Utilisateurs',
    usersSelected: 'sélectionnés',
    user: 'Utilisateur',
    users: 'Utilisateurs',
    searchUsers: 'Rechercher utilisateurs...',
    allUsers: 'Tous les Utilisateurs',
    selectAll: 'Tout Sélectionner',
    deselectAll: 'Tout Désélectionner',
    saveRole: 'Enregistrer le Rôle',
    cancel: 'Annuler',
    deleteRole: 'Supprimer le Rôle',
    roleCreated: 'Rôle créé avec succès',
    roleUpdated: 'Rôle mis à jour avec succès'
  },

  userManagementExtended: {
    department: 'Département',
    departments: 'Départements',
    selectDepartments: 'Sélectionner des Départements',
    departmentsSelected: 'sélectionnés',
    newDepartment: 'Nouveau Département',
    allUsers: 'Tous les Utilisateurs',
    filterByDepartment: 'Filtrer par Département',
    showAllUsers: 'Afficher Tous les Utilisateurs',
    showActiveOnly: 'Utilisateurs Actifs Uniquement',
    userDetails: 'Détails de l\'Utilisateur',
    editUser: 'Modifier l\'Utilisateur',
    newUser: 'Nouvel Utilisateur',
    firstName: 'Prénom',
    lastName: 'Nom',
    phoneNumber: 'Numéro de Téléphone',
    position: 'Poste',
    hireDate: 'Date d\'Embauche',
    selectRole: 'Sélectionner un Rôle',
    selectStatus: 'Sélectionner un Statut',
    userCreated: 'Utilisateur créé avec succès',
    userUpdated: 'Utilisateur mis à jour avec succès',
    // Additional fields for UserManagement
    addUser: 'Ajouter un Utilisateur',
    exportCSV: 'Exporter en CSV',
    import: 'Importer',
    syncUsers: 'Synchroniser les Utilisateurs',
    syncSuccess: 'Synchronisation Réussie',
    syncSuccessMessage: 'Utilisateurs synchronisés avec succès',
    mergeUsers: 'Fusionner les Utilisateurs',
    duplicatesFound: 'Doublons Trouvés',
    mergeWarning: 'Assurez-vous qu\'aucun doublon ne reste',
    groupsLabel: 'Groupes',
    lastLogin: 'Dernier Connexion',
    sortBy: 'Trier par',
    filterBy: 'Filtrer par',
    source: 'Source',
    status: 'Statut',
    statusActive: 'Actif',
    statusInactive: 'Inactif',
    statusLocked: 'Verrouillé',
    deleteUser: 'Supprimer l\'Utilisateur',
    deleteUserConfirm: 'Confirmer la Suppression',
    deleteUserMessage: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
    viewer: 'Visualiseur',
    admin: 'Administrateur',
    powerUser: 'Utilisateur Puissant',
    user: 'Utilisateur',
    localUser: 'Utilisateur Local'
   },

  alertsManagement: {
    title: 'Gestion des Alertes',
    subtitle: 'Gérez vos alertes',
    searchPlaceholder: 'Recherche...',
    newAlert: 'Nouvelle Alerte',
    types: {
      error: 'Erreur',
      warning: 'Avertissement',
      info: 'Info'
    },
    severity: {
      critical: 'Critique',
      warning: 'Avertissement',
      info: 'Info'
    },
    table: {
      name: 'Nom',
      type: 'Type',
      condition: 'Condition',
      threshold: 'Seuil',
      channels: 'Canal',
      triggers: 'Déclencheurs',
      lastTrigger: 'Dernier Déclencheur',
      status: 'Statut',
      actions: 'Actions'
    },
    channels: {
      email: 'Email',
      slack: 'Slack'
    },
    status: {
      active: 'Actif',
      inactive: 'Inactif'
    },
    actions: {
      newAlert: 'Nouvelle Alerte',
      duplicate: 'Dupliquer',
      edit: 'Modifier',
      delete: 'Supprimer'
    },
    notificationChannels: {
      title: 'Canal de Notification',
      subtitle: 'Sélectionnez les canaux sur lesquels vous souhaitez recevoir des notifications'
    },
    panel: {
      editAlert: 'Modifier l\'Alerte',
      createAlert: 'Créer une Alerte'
    },
    form: {
      basicInfo: 'Informations de Base',
      alertName: 'Nom de l\'Alerte',
      alertNamePlaceholder: 'Entrez le nom de l\'alerte',
      alertNameHelper: 'Le nom de l\'alerte doit être unique',
      type: 'Type',
      conditions: 'Conditions',
      condition: 'Condition',
      conditionPlaceholder: 'Entrez la condition',
      conditionHelper: 'Décrivez la condition qui déclenche l\'alerte',
      threshold: 'Seuil',
      thresholdPlaceholder: 'Entrez le seuil',
      channels: 'Canaux',
      selectChannels: 'Sélectionner les canaux',
      email: 'Email',
      slack: 'Slack',
      saveButton: 'Enregistrer',
      cancelButton: 'Annuler'
    },
    deleteDialog: {
      title: 'Supprimer l\'Alerte',
      description: 'Êtes-vous sûr de vouloir supprimer cette alerte ?',
      cancel: 'Annuler',
      confirm: 'Supprimer'
    }
  },

  // System Monitoring
  systemMonitoring: {
    title: 'Surveillance du Système',
    subtitle: 'Surveillez la performance de votre système',
    network: 'Réseau',
    online: 'En ligne',
    offline: 'Hors ligne',
    restricted: 'Restreint',
    metrics: {
      title: 'Métriques',
      cpu: 'CPU',
      memory: 'Mémoire',
      disk: 'Disque',
      network: 'Réseau'
    },
    services: {
      title: 'Services',
      status: 'Statut',
      uptime: 'Temps de fonctionnement',
      responseTime: 'Temps de réponse',
      online: 'En ligne',
      offline: 'Hors ligne',
      degraded: 'Dégradé'
    },
    requests: {
      title: 'Requêtes',
      subtitle: 'Surveillez les requêtes entrantes'
    },
    performance: {
      title: 'Performance',
      subtitle: 'Surveillez la performance du système'
    },
    database: {
      title: 'Base de données',
      connections: 'Connexions',
      queries: 'Requêtes',
      cacheHitRate: 'Taux de hit du cache'
    }
  },

  // Activity Log Extended
  activityLogExtended: {
    sort: 'Trier',
    resetFilter: 'Réinitialiser le filtre',
    successful: 'Réussi',
    warning: 'Avertissement',
    error: 'Erreur',
    information: 'Information',
    timestamp: 'Horodatage',
    user: 'Utilisateur',
    action: 'Action',
    resource: 'Ressource',
    ipAddress: 'Adresse IP',
    detailsColumn: 'Détails',
    noDetails: 'Aucun détail',
    exportFilename: 'journal_activite.csv',
    actions: {
      login: 'Connexion',
      apiRateLimitReached: 'Limite de taux d\'API atteinte'
    },
    resources: {
      emailAgent: 'Agent Email'
    },
    details: {
      fullBackupSuccess: 'Sauvegarde complète réussie',
      rateLimitReached: 'Limite de taux atteinte',
      newUser: 'Nouvel utilisateur',
      roleAssigned: 'Rôle attribué',
      memoryTokenUpdated: 'Jeton de mémoire mis à jour',
      timeoutAfter30s: 'Délai d\'attente de 30s'
    }
  },

  // Tenant Settings Extended
  tenantSettingsExtended: {
    general: {
      tenantInformation: 'Informations du Locataire',
      tenantInformationDesc: 'Nom, Logo et Paramètres de Couleur',
      tenantName: 'Nom du Locataire',
      tenantLogo: 'Logo du Locataire',
      logoUploaded: 'Logo téléchargé',
      noLogoSelected: 'Aucun logo sélectionné',
      preview: 'Aperçu :',
      white: 'Blanc',
      gray: 'Gris',
      black: 'Noir',
      logoPreview: 'Aperçu du Logo',
      primaryColor: 'Couleur Primaire',
      accentColor: 'Couleur d\'Accent'
    },
    company: {
      companyInformation: 'Informations de l\'Entreprise',
      companyInformationDesc: 'Informations Légales et de Contact',
      masterEntryNote: 'Les données ne peuvent être modifiées que dans l\'entrée principale.',
      companyName: 'Nom de l\'Entreprise',
      uidTaxNumber: 'UID / Numéro Fiscal',
      phoneNumber: 'Numéro de Téléphone',
      email: 'Email',
      domain: 'Domaine',
      address: 'Adresse',
      zipCode: 'Code Postal',
      city: 'Ville'
    },
    regional: {
      regionalSettings: 'Paramètres Régionaux',
      regionalSettingsDesc: 'Langue, Fuseau Horaire et Formats',
      language: 'Langue',
      languageGerman: 'Deutsch',
      languageEnglish: 'English',
      languageFrench: 'Français',
      languageItalian: 'Italiano',
      timezone: 'Fuseau Horaire',
      timezoneZurich: 'Europe/Zurich (CET)',
      timezoneBerlin: 'Europe/Berlin (CET)',
      timezoneUTC: 'UTC',
      currency: 'Devise',
      currencyCHF: 'CHF (Franc Suisse)',
      currencyEUR: 'EUR (Euro)',
      currencyUSD: 'USD (Dollar US)',
      dateFormat: 'Format de Date',
      dateFormatDDMMYYYY: 'JJ.MM.AAAA',
      dateFormatMMDDYYYY: 'MM/JJ/AAAA',
      dateFormatYYYYMMDD: 'AAAA-MM-JJ'
    },
    security: {
      passwordPolicies: 'Politiques de Mot de Passe',
      passwordPoliciesDesc: 'Définir les exigences pour les mots de passe utilisateur',
      minPasswordLength: 'Longueur Minimale du Mot de Passe',
      minPasswordLengthDesc: 'Nombre minimum de caractères pour les mots de passe',
      uppercaseRequired: 'Majuscules Requises',
      uppercaseRequiredDesc: 'Au moins une lettre majuscule (A-Z)',
      digitsRequired: 'Chiffres Requis',
      digitsRequiredDesc: 'Au moins un chiffre (0-9)',
      specialCharsRequired: 'Caractères Spéciaux Requis',
      specialCharsRequiredDesc: 'Au moins un caractère spécial (!@#$%...)',
      passwordExpiry: 'Expiration du Mot de Passe (jours)',
      passwordExpiryDesc: '0 = pas d\'expiration',
      twoFactorAuth: 'Authentification à Deux Facteurs (2FA)',
      twoFactorAuthDesc: 'Authentification multifacteur pour une sécurité renforcée',
      enforce2FAAll: 'Imposer 2FA pour tous les utilisateurs',
      enforce2FAAllDesc: 'Tous les utilisateurs doivent activer 2FA',
      enforce2FAAdmins: 'Imposer 2FA pour les administrateurs',
      enforce2FAAdminsDesc: 'Seuls les administrateurs doivent activer 2FA',
      sessionSettings: 'Paramètres de Session',
      sessionSettingsDesc: 'Délai d\'attente et gestion de session',
      sessionTimeout: 'Délai d\'Expiration de Session (minutes)',
      sessionTimeoutDesc: 'Déconnexion automatique après inactivité',
      absoluteSessionDuration: 'Durée Absolue de Session (heures)',
      absoluteSessionDurationDesc: 'Durée maximale de session, 0 = illimitée',
      privacyCompliance: 'Confidentialité et Conformité',
      privacyComplianceDesc: 'RGPD et Loi Suisse sur la Protection des Données',
      gdprMode: 'Activer le Mode RGPD',
      gdprModeDesc: 'Fonctionnalités de conformité RGPD supplémentaires',
      swissDSG: 'Mode DSG Suisse',
      swissDSGDesc: 'Loi Suisse sur la Protection des Données (nDSG)',
      dataRetention: 'Conservation des Données (jours)',
      dataRetentionDesc: 'Suppression automatique après X jours',
      archiveBeforeDeletion: 'Archiver avant Suppression',
      archiveBeforeDeletionDesc: 'Archiver les données avant suppression',
      // EU AI Act
      euAiAct: 'Loi Européenne sur l\'IA',
      euAiActDesc: 'Conformité au Règlement Européen sur l\'Intelligence Artificielle',
      enableEuAiActCompliance: 'Activer la Conformité à la Loi IA',
      enableEuAiActComplianceDesc: 'Fonctionnalités de conformité supplémentaires pour les systèmes d\'IA',
      riskClassification: 'Classification des Risques',
      riskClassificationDesc: 'Classification du système d\'IA par niveau de risque',
      aiSystemDocumentation: 'Documentation du Système d\'IA',
      aiSystemDocumentationDesc: 'Documentation automatique des décisions d\'IA',
      humanOversightRequired: 'Surveillance Humaine Requise',
      humanOversightRequiredDesc: 'Examen humain pour les décisions critiques de l\'IA',
      // EU AI Act - Aperçu du Statut
      systemStatusOverview: 'Statut du Système',
      systemStatusOverviewDesc: 'Aperçu rapide du statut de conformité du système d\'IA',
      isHighRiskSystem: 'Ce système est-il un système d\'IA à haut risque?',
      highRiskSystemYes: 'Oui - Système à Haut Risque',
      highRiskSystemNo: 'Non - Pas un Système à Haut Risque',
      highRiskAdditionalObligations: 'Des obligations supplémentaires s\'appliquent aux systèmes d\'IA à haut risque en vertu de la loi sur l\'IA de l\'UE. Veuillez vous assurer que toutes les exigences sont respectées.',
      assessmentDate: 'Date d\'Évaluation',
      assessedBy: 'Évalué selon la Loi IA de l\'UE',
      euAiActLink: 'Afficher le Texte Légal',
      registrationStatus: 'Statut d\'Enregistrement',
      registrationComplete: 'Complet',
      registrationPending: 'En Attente',
      // EU AI Act - Annexe III Catégories
      annexIIICategories: 'Catégories à Haut Risque (Annexe III)',
      annexIIICategoriesDesc1: 'Si l\'un des critères s\'applique, le système d\'IA est classé comme à haut risque.',
      annexIIICategoriesDesc2: 'Si le système d\'IA est classé comme à haut risque, un avis sera affiché à l\'utilisateur dans l\'interface.',
      biometricIdentification: 'Identification Biométrique',
      biometricIdentificationDesc: 'Reconnaissance faciale, scan iris, analyse vocale, analyse de la démarche (Annexe III, Section 1)',
      criticalInfrastructure: 'Infrastructures Critiques',
      criticalInfrastructureDesc: 'Réseaux électriques, systèmes de transport, approvisionnement en eau (Annexe III, Section 2)',
      educationTraining: 'Éducation et Formation',
      educationTrainingDesc: 'Évaluations automatisées, systèmes d\'admission, mesure des progrès (Annexe III, Section 3)',
      employmentManagement: 'Emploi et Gestion du Personnel',
      employmentManagementDesc: 'Tri de CV, promotions, analyses de licenciement (Annexe III, Section 4)',
      essentialServices: 'Services Essentiels',
      essentialServicesDesc: 'Octroi de crédit, évaluation d\'assurance, aide sociale (Annexe III, Section 5)',
      lawEnforcement: 'Application de la Loi',
      lawEnforcementDesc: 'Évaluation des risques, analyse de preuves, classification de suspects (Annexe III, Section 6)',
      migrationBorderControl: 'Migration et Contrôle Frontalier',
      migrationBorderControlDesc: 'Demandes automatisées, profils de risque, aide à la décision (Annexe III, Section 7)',
      justiceDemo: 'Justice et Démocratie',
      justiceDemoDesc: 'Soutien aux décisions judiciaires, interprétation juridique (Annexe III, Section 8)',
      // Registered High-Risk AI System
      registeredHighRiskSystem: 'Système IA à Haut Risque Enregistré',
      registeredHighRiskSystemDesc: 'Ce système a été officiellement enregistré auprès de la Commission européenne',
      registration: 'Enregistrement',
      conformityMarking: 'Marquage de Conformité',
      technicalDocumentation: 'Documentation Technique',
      download: 'Télécharger',
      // Transparency Requirements
      transparencyRequirements: 'Exigences de Transparence',
      transparencyRequirementsDesc: 'Les informations suivantes seront affichées à l\'utilisateur',
      aiNoticeDisplay: 'Afficher le texte sous le champ de saisie du chat : Avis IA',
      aiNoticeDisplayDesc: 'Les réponses peuvent contenir des erreurs. Veuillez vérifier le contenu avant utilisation.',
      orchestratorBasis: 'Base de Décision de l\'Orchestrateur',
      orchestratorBasisDesc: '',
      responsibilities: 'Responsabilités',
      responsibilitiesDesc: '(voir Responsabilités)',
      humanInLoop: 'Humain dans la Boucle',
      humanInLoopDesc: 'Ce système IA ne transmet pas d\'informations par automatisation. Cela se fait exclusivement par l\'humain dans la boucle.',
      // Technical Security Measures
      technicalSecurityMeasures: 'Mesures de Sécurité Techniques',
      technicalSecurityMeasuresDesc: 'Affiche toutes les mesures de sécurité pertinentes de ce système :',
      killswitch: 'Kill-Switch',
      killswitchDesc: 'Met le système complet hors ligne',
      killswitchActiveWarning: 'Attention ! Le système complet a été mis hors ligne.',
      twoFactorAuthReference: 'Authentification à Deux Facteurs (2FA)',
      twoFactorAuthReferenceDesc: 'À trouver dans la section "Sécurité & Conformité"',
      whitelistReference: 'Liste Blanche',
      whitelistReferenceDesc: 'À trouver dans la section "Sécurité & Conformité"',
      tenantRolesReference: 'Modèle de Rôles',
      tenantRolesReferenceDesc: 'À trouver dans la section "Sécurité & Conformité"',
      loggingDataReference: 'Données de Journalisation',
      loggingDataReferenceDesc: 'À trouver dans la section "Journalisation & Surveillance"',
      systemCriticalAlerts: 'Alarmes pour Erreurs Critiques du Système',
      systemCriticalAlertsDesc: 'À trouver dans la section "Journalisation & Surveillance"',
      backupRecoveryReference: 'Sauvegarde et Restauration',
      backupRecoveryReferenceDesc: 'À trouver dans la section "Gestion des Données"',
      goTo: 'Aller à',
      // Human Oversight
      humanOversight: 'Supervision Humaine',
      humanOversightDesc: 'Surveillance, Signalement et Intervention dans le Système IA',
      humanInLoopOversight: 'Ce système IA ne transmet pas d\'informations par automatisation. Cela se fait exclusivement par l\'humain dans la boucle.',
      reviewResetLimit: 'Examiner, Réinitialiser et Limiter',
      reviewResetLimitDesc: 'Intervention sur tous les processus à partir de la Journalisation & Surveillance',
      staffTraining: 'Formation du Personnel',
      staffTrainingDesc: 'Le personnel a-t-il été formé de manière exhaustive',
      feedbackReporting: 'Signalement & Demandes',
      feedbackReportingDesc: 'Un signalement peut être laissé sous chaque entrée de chatbot. Le champ de texte s\'ouvre automatiquement après l\'activation du bouton "je n\'aime pas"',
      auditTrail: 'Piste d\'Audit',
      auditTrailDesc: 'Une journalisation complète et inviolable de tous les événements système pertinents',
      oversightDocumentation: 'Documentation "Supervision technique / organisationnelle"',
      oversightDocumentationDesc: 'Télécharger la documentation',
      download: 'Télécharger'
    },
    access: {
      singleSignOn: 'Authentification Unique (SSO)',
      singleSignOnDesc: 'Authentification centralisée via fournisseur d\'identité',
      enableSSO: 'Activer SSO',
      enableSSODesc: 'Permet aux utilisateurs de se connecter via un fournisseur d\'identité externe',
      identityProvider: 'Fournisseur d\'Identité',
      noProvider: 'Aucun Fournisseur',
      azureAD: 'Azure Active Directory',
      googleIdentity: 'Google Identity Platform',
      okta: 'Okta',
      customSAML: 'SAML 2.0 Personnalisé',
      azureConfiguration: 'Configuration Azure AD',
      tenantID: 'ID de Locataire',
      tenantIDPlaceholder: 'Votre ID de Locataire Azure',
      clientID: 'ID Client',
      clientIDPlaceholder: 'Votre ID d\'Application (Client) Azure',
      clientSecret: 'Secret Client',
      clientSecretPlaceholder: 'Votre Secret Client Azure',
      testConnection: 'Tester la Connexion',
      notConnected: 'Non connecté',
      connected: 'Connecté',
      connectionError: 'Erreur de connexion',
      testing: 'Test en cours...',
      connectionSuccessful: 'Connexion réussie !',
      ipWhitelist: 'Liste Blanche IP',
      ipWhitelistDesc: 'Restreindre l\'accès à des adresses IP spécifiques',
      enableIPWhitelist: 'Activer la Liste Blanche IP',
      enableIPWhitelistDesc: 'Autoriser uniquement les connexions depuis les IP de la liste blanche',
      allowedIPs: 'Adresses IP Autorisées',
      ipAddress: 'Adresse IP',
      ipAddressPlaceholder: 'ex. 192.168.1.1',
      addIP: 'Ajouter IP',
      ipWarning: 'Attention : Une configuration IP incorrecte peut vous bloquer !',
      ipFormatError: 'Adresse IP invalide. Format : xxx.xxx.xxx.xxx',
      ssoRequirements: 'Exigences SSO',
      ssoRequirementsDesc: 'Exigences de sécurité supplémentaires pour SSO',
      enforce2FAForSSO: 'Imposer 2FA pour les utilisateurs SSO',
      enforce2FAForSSODesc: 'Tous les utilisateurs connectés via SSO doivent activer 2FA',
      verifiedEmailOnly: 'Emails Vérifiés Uniquement',
      verifiedEmailOnlyDesc: 'Autoriser uniquement les utilisateurs avec des adresses email vérifiées',
      autoTokenRefresh: 'Actualisation Automatique du Jeton',
      autoTokenRefreshDesc: 'Prolonger automatiquement les sessions lorsque l\'utilisateur est actif'
    },
    dsgvo: {
      basicFunctions: 'Fonctions de Base RGPD',
      basicFunctionsDesc: 'Contrôle les sujets RGPD les plus fondamentaux dans l\'Orchestrateur',
      datenschutzmodus: 'Mode de Confidentialité',
      datenschutzmodusDesc: 'Toutes les exigences sont actives lorsque ce mode est activé',
      memory: 'Mémoire',
      memoryDesc: 'Gère le stockage des données personnelles dans l\'Orchestrateur',
      memorySettings: 'Paramètres de Mémoire',
      duration: 'Durée',
      deleteAfterSession: 'Supprimer après chaque session',
      backup: 'Sauvegarde',
      backupDesc: 'Gère le stockage de sauvegarde des données personnelles dans l\'Orchestrateur',
      agentLogging: 'Journalisation des Agents',
      agentLoggingDesc: 'Stockage des réponses des agents',
      agentLoggingSettings: 'Paramètres de Journalisation des Agents',
      onlySystemDiagnose: 'Pour le diagnostic système uniquement',
      transparencyInformation: 'Transparence & Informations',
      transparencyInformationDesc: 'Réglementation des informations des personnes concernées. Ces informations sont affichées dans l\'Entrée Utilisateur sous Paramètres du Compte / RGPD',
      verantwortlicher: 'Responsable',
      verantwortlicherDesc: 'Qui contrôle le traitement des données?',
      verantwortlicherAnbieter: 'Fournisseur',
      verantwortlicherTenant: 'Locataire (Entreprise XY)',
      verantwortlicherOther: 'Autre (voir détails)',
      verantwortlicherPlaceholder: 'Veuillez fournir des détails sur le responsable...',
      selectOption: 'Sélectionner...',
      zwecke: 'Finalités',
      zweckeDesc: 'À quoi servent les données?',
      zweckKontextverarbeitung: 'Traitement contextuel',
      zweckAgentenwahl: 'Sélection d\'agent',
      zweckNormenVorschlaege: 'Normes & Suggestions',
      zweckMemory: 'Mémoire',
      zweckRAGSuche: 'Recherche RAG',
      zweckFehleranalyse: 'Analyse d\'erreurs',
      zweckProtokollierung: 'Journalisation',
      rechtsgrundlage: 'Base Juridique',
      rechtsgrundlageDesc: 'Pourquoi ce traitement est-il autorisé?',
      rechtsgrundlageBerechtigtesInteresse: 'Intérêt légitime',
      rechtsgrundlageEinwilligung: 'Consentement',
      rechtsgrundlageVertragserfuellung: 'Exécution du contrat',
      rechtsgrundlageRechtlicheVerpflichtung: 'Obligation légale',
      rechtsgrundlageOeffentlichesInteresse: 'Intérêt public',
      datenkategorien: 'Catégories de Données',
      datenkategorienDesc: 'Qu\'est-ce qui est stocké?',
      datenkategorieTexteingaben: 'Saisies de texte',
      datenkategorieAgentenantworten: 'Réponses d\'agents',
      datenkategorieGespraechsverlauf: 'Historique des conversations',
      datenkategorieDateiuploads: 'Téléchargements de fichiers',
      datenkategorieMetadaten: 'Métadonnées',
      datenkategorieNutzerprofil: 'Profil utilisateur',
      datenkategorieRAGErgebnisse: 'Résultats RAG',
      datenkategorieSystemprotokolle: 'Journaux système',
      empfaenger: 'Destinataires',
      empfaengerDesc: 'Où vont les données?',
      empfaengerLLMAnbieter: 'Fournisseurs LLM',
      empfaengerLokaleModelle: 'Modèles locaux',
      empfaengerInterneAgenten: 'Agents internes',
      empfaengerExterneAgenten: 'Agents externes',
      empfaengerRAGDienste: 'Services RAG',
      empfaengerMonitoringLogging: 'Systèmes de surveillance/journalisation',
      empfaengerBackupSysteme: 'Systèmes de sauvegarde',
      speicherdauer: 'Durée de Conservation',
      speicherdauerDesc: 'Informations selon la sélection des "Informations de Base RGPD"',
      deactivated: 'Désactivé',
      afterEachSession: 'Après chaque session',
      systemDiagnose: 'Diagnostic système',
      rechte: 'Droits',
      rechteDesc: 'Que peuvent demander les personnes concernées?',
      rechtAuskunft: 'Information',
      rechtBerichtigung: 'Rectification',
      rechtLoeschung: 'Effacement',
      rechtEinschraenkung: 'Limitation du traitement',
      rechtWiderspruch: 'Opposition',
      rechtDatenuebertragbarkeit: 'Portabilité des données',
      rechtWiderruf: 'Retrait du consentement',
      drittland: 'Transfert vers un Pays Tiers',
      drittlandDesc: 'Les données sont-elles transférées vers les États-Unis?',
      drittlandKeine: 'Aucun transfert vers un pays tiers',
      drittlandUSASCCs: 'USA – avec CCT',
      drittlandUSATIA: 'USA – avec TIA',
      drittlandEUEWR: 'UE/EEE',
      drittlandAndereSCCs: 'Autres pays tiers – avec CCT',
      drittlandLokal: 'Traitement local sans transfert',
      automationNotice: 'Avis sur l\'Automatisation',
      automationNoticeDesc: 'Une IA est-elle utilisée?',
      aiNotice: 'Avis IA:',
      aiNoticeText: 'Les réponses peuvent contenir des erreurs. Veuillez vérifier le contenu avant utilisation.',
      selected: 'sélectionné(s)',
      documentedProcessingActivities: 'Activités de Traitement Documentées',
      documentedProcessingActivitiesDesc: 'Registre des activités de traitement des données. Ce registre sert à la transparence et à la traçabilité de l\'utilisation des données personnelles.',
      providerSystemLevel: 'Fournisseur (Niveau Système)',
      providerSystemLevelDesc: 'Ces opérations sont automatiquement traitées par la plateforme:',
      contextStorageOrchestrator: 'Stockage de contexte dans l\'Orchestrateur (Mémoire)',
      loggingAccessErrors: 'Enregistrement des accès, erreurs, décisions',
      communicationAgentsAPI: 'Communication avec les agents via API',
      download: 'Télécharger',
      tenantLevel: 'Locataire (Niveau Mandant)',
      tenantLevelDesc: 'Ces traitements de données sont assignés au locataire:',
      tenantLevelItem1: 'Utilisation d\'agents avec accès au contenu ou aux données personnelles',
      tenantLevelItem2: 'Stockage des saisies de texte et des réponses',
      tenantLevelItem3: 'Mémoire liée à la session ou à l\'utilisateur (si activée)',
      dsfaTitle: 'Analyse d\'Impact relative à la Protection des Données (AIPD)',
      dsfaDesc: 'Pour certains types de traitement de données présentant un risque élevé probable pour les droits et libertés des personnes concernées, une Analyse d\'Impact relative à la Protection des Données (AIPD) doit être effectuée.',
      dsfaResponsibility: 'Responsabilité',
      dsfaResponsibilityItem1: 'Le locataire est responsable en vertu de la législation sur la protection des données et doit évaluer si une AIPD est nécessaire.',
      dsfaResponsibilityItem2: 'Le fournisseur met à disposition les fondements techniques afin que le locataire puisse effectuer cette évaluation de manière éclairée.',
      dsfaRiskAssessment: 'Évaluation des Risques',
      dsfaRiskAssessmentDesc: 'Chaque agent dispose de son propre calculateur de catégorie de risque et est évalué de manière indépendante en fonction des informations fournies.',
      dsfaGoTo: 'Aller à',
      dsfaAdditional: 'Informations Complémentaires',
      dsfaAdditionalItem1: 'Avis AIPD dans l\'admin - Lors de l\'activation d\'agents à haut risque, un avis sur l\'obligation AIPD possible apparaît',
      dsfaAdditionalItem2: 'Modèle d\'export - Nous fournissons un modèle AIPD sur demande (PDF/Word)',
      dsfaAdditionalItem3: 'Journal de configuration - Documente quels agents étaient actifs avec quel statut',
      day: 'Jour',
      days: 'Jours',
      week: 'Semaine',
      weeks: 'Semaines',
      month: 'Mois',
      months: 'Mois',
      rightsOfDataSubjects: 'Droits des Personnes Concernées',
      rightsOfDataSubjectsDesc: 'Tous les droits des personnes concernées sont traités ici',
      rightAuskunftTitle: 'Information',
      rightAuskunftDesc1: 'Chaque utilisateur a le droit de savoir quelles données sont stockées à son sujet, y compris la source, la finalité et les destinataires',
      rightAuskunftDesc2: 'Sous «Gestion des utilisateurs», les données peuvent être téléchargées pour chaque utilisateur individuel',
      rightBerichtigungTitle: 'Rectification',
      rightBerichtigungDesc1: 'Chaque utilisateur a le droit de faire corriger son profil utilisateur',
      rightBerichtigungDesc2: 'Sous «Gestion des utilisateurs», les données peuvent être modifiées pour chaque utilisateur individuel',
      rightLoeschungTitle: 'Effacement',
      rightLoeschungDesc1: 'Chaque utilisateur a le droit de supprimer ses données',
      rightLoeschungDesc2: 'Sous «Gestion des utilisateurs», les données peuvent être supprimées pour chaque utilisateur individuel',
      rightEinschraenkungTitle: 'Limitation',
      rightEinschraenkungDesc1: 'Chaque utilisateur a le droit à «limitation» ou «pas de profilage»',
      rightEinschraenkungDesc2: 'L\'interface utilisateur offre la possibilité de choisir parmi les options suivantes:',
      rightEinschraenkungMemory: 'Utilisation de la mémoire du contexte de conversation - Basculer dans l\'interface',
      rightEinschraenkungPersonalisierung: 'Utilisation des attributs utilisateur - Opt-in, contrôle des rôles désactivable',
      rightEinschraenkungProfilbildung: 'Création de profils utilisateur individuels - Désactiver le profilage ou consentement via l\'interface',
      rightEinschraenkungAgentenwahl: 'Contrôle basé sur le comportement - Basé sur la session uniquement, pas de stockage permanent',
      personalization: 'Personnalisation',
      profiling: 'Profilage',
      automatedAgentSelection: 'Sélection Automatisée des Agents',
      rightDatenuebertragbarkeitTitle: 'Portabilité des Données',
      rightDatenuebertragbarkeitDesc1: 'Chaque utilisateur a le droit de recevoir ses données dans un format structuré, couramment utilisé et lisible par machine et de les transférer à un autre fournisseur sans être entravé',
      rightDatenuebertragbarkeitDesc2: 'Sous «Gestion des utilisateurs», les données peuvent être téléchargées pour chaque utilisateur individuel',
      rightWiderspruchTitle: 'Opposition',
      rightWiderspruchDesc1: 'Chaque utilisateur a le droit de s\'opposer. L\'avis suivant est disponible dans l\'interface:',
      rightWiderspruchQuote: '«Vous pouvez vous opposer au stockage de vos données»',
      rightNoAutomatedDecision: 'Aucune décision entièrement automatisée sans possibilité de révision',
      rightNoAutomatedDecisionDesc: 'Les décisions automatisées par le système d\'IA sont clairement identifiées comme telles («suggestion basée sur l\'IA») et peuvent être complétées ou annulées par une révision humaine à tout moment («Human-in-the-loop»)',
      goTo: 'Aller à',
      dataProcessingAccess: 'Traitement des Données & Accès',
      dataProcessingAccessDesc: 'Cette plateforme prend en charge deux modèles d\'exploitation: «aucun accès» et «accès support/hébergement»',
      contractualModel: 'Modèle d\'exploitation convenu contractuellement:',
      contractualModelText: 'Standard - Aucun accès, aucun traitement de données',
      standardNoAccess: 'Standard: Aucun Accès – aucun traitement de données',
      standardNoAccessModel: 'Le fournisseur n\'a pas accès aux données stockées (par ex. prompts, mémoire, réponses des agents)',
      standardNoAccessDesc: 'Modèle d\'accès:',
      standardNoAccessItem1: 'Isolation complète du locataire',
      standardNoAccessItem2: 'Bases de données et journaux séparés',
      standardNoAccessItem3: 'Aucun accès par les administrateurs système ou le support',
      standardNoAccessItem4: 'Aucun DPA requis (noté dans le contrat «Modèle sans DPA»)',
      standardNoAccessNote: 'Ajustement du contrat nécessaire en cas de changement',
      optionalSupportAccess: 'Optionnel: Accès support ou hébergement actif',
      optionalSupportAccessModel: 'Le fournisseur reçoit un accès temporaire sur demande pour:',
      optionalSupportAccessDesc: 'Modèle d\'accès:',
      optionalSupportAccessItem1: 'Support technique (par ex. dépannage, analyse des journaux)',
      optionalSupportAccessItem2: 'Hébergement ou exploitation de la plateforme',
      optionalSupportAccessItem3: 'Accord de traitement des données (DPA) selon l\'art. 28 RGPD',
      optionalSupportAccessNote: 'Accès uniquement après approbation écrite par le locataire',
      accessLogged: 'L\'accès est enregistré (Audit Trail)'
    }
  },

  chatExtended: {
    filesAttached: '(Fichiers joints)'
  },

  authorized: 'Autorisé',
  notAuthorized: 'Non autorisé'
};

// Brazilian Portuguese translations
export const extendedTranslationsPTBR: ExtendedTranslations = {
  twoFactorCode: {
    title: 'Verificação 2FA',
    subtitle: 'Digite o código de 6 dígitos',
    codeLabel: 'Código de Verificação',
    codePlaceholder: '000000',
    verifyButton: 'Verificar Código',
    invalidCode: 'Código inválido',
    resendCode: 'Reenviar código'
  },

  promptsFrameworks: {
    title: 'Prompts & Frameworks',
    library: 'Biblioteca de Prompts',
    frameworks: 'Frameworks',
    searchPrompts: 'Buscar prompts...',
    searchFrameworks: 'Buscar frameworks...',
    category: 'Categoria',
    allCategories: 'Todas as Categorias',
    copyPrompt: 'Copiar Prompt',
    copied: 'Copiado!',
    edit: 'Editar',
    delete: 'Excluir',
    newPrompt: 'Novo Prompt',
    newFramework: 'Novo Framework',
    promptTitle: 'Título',
    promptDescription: 'Descrição',
    promptText: 'Texto do Prompt',
    frameworkStructure: 'Estrutura do Framework',
    tags: 'Tags',
    savePrompt: 'Salvar Prompt',
    saveFramework: 'Salvar Framework',
    cancel: 'Cancelar',
    deleteConfirm: 'Confirmar Exclusão',
    deleteMessage: 'Tem certeza de que deseja excluir este item?',

    categories: {
      strategy: 'Estratégia & Visão',
      sales: 'Vendas & Aquisição',
      marketing: 'Marketing & Branding',
      hr: 'RH & Recrutamento',
      finance: 'Finanças & Controle',
      innovation: 'Inovação & Desenvolvimento',
      communication: 'Comunicação',
      technology: 'Tecnologia',
      decision: 'Tomada de Decisão',
      analysis: 'Análise & Insights'
    }
  },

  thinkTank: {
    title: 'Think Tank',
    subtitle: 'Análise de Cenário Multi-Perspectivas',
    scenario: 'Cenário / Questão',
    scenarioPlaceholder: 'Descreva seu cenário ou questão...',
    perspectives: 'Perspectivas',
    addPerspective: 'Adicionar Perspectiva',
    removePerspective: 'Remover',
    startSession: 'Iniciar Sessão',
    stopSession: 'Parar Sessão',
    clearSession: 'Redefinir Sessão',
    thinking: 'Analisando...',
    perspectivePlaceholder: 'ex. CEO, CTO, Cliente, Investidor...',
    sessionActive: 'Sessão Ativa'
  },

  thinkTankPanel: {
    title: 'Think Tank',
    pinboard: 'Quadro de Fixação',
    noPinnedItems: 'Nenhum item fixado',
    chats: 'Chats',
    spaces: 'Espaços',
    prompts: 'Prompts',
    archive: 'Arquivo',
    trash: 'Lixeira',
    sortByDate: 'Ordenar por Data',
    sortAlphabetically: 'Ordenar Alfabeticamente',
    ascending: 'Ascendente',
    descending: 'Descendente',
    searchChats: 'Buscar chats...',
    searchSpaces: 'Buscar espaços...',
    searchPrompts: 'Buscar prompts...',
    newSpace: 'Novo Espaço',
    newCategory: 'Nova Categoria',
    spaceName: 'Nome do Espaço',
    categoryName: 'Nome da Categoria',
    create: 'Criar',
    dateGroups: {
      today: 'Hoje',
      yesterday: 'Ontem',
      lastWeek: 'Semana Passada',
      lastMonth: 'Mês Passado',
      older: 'Mais Antigo'
    },
    restore: 'Restaurar',
    deleteConfirmTitle: 'Excluir Permanentemente?',
    deleteConfirmMessage: 'Este item será excluído permanentemente.',
    deletePermanently: 'Excluir Permanentemente',
    emptyTrash: 'A lixeira está vazia',
    emptyArchive: 'O arquivo está vazio',
    backToChats: 'Voltar aos Chats'
  },

  supportDocumentation: {
    title: 'Suporte & Documentação',
    documentation: {
      searchTitle: 'Pesquisar Documentação',
      searchDescription: 'Encontre guias, melhores práticas e documentação técnica',
      searchPlaceholder: 'Pesquisar na documentação...',
      learnMore: 'Saiba mais',
      noDocsFound: 'Nenhuma documentação encontrada',
      items: {
        gettingStarted: {
          title: 'Primeiros Passos com AI Hub',
          description: 'Aprenda os fundamentos da plataforma e configure seu primeiro ambiente.',
          category: 'Primeiros Passos'
        },
        userRoleManagement: {
          title: 'Gerenciamento de Usuários & Funções',
          description: 'Gerencie usuários, funções e permissões em seu tenant.',
          category: 'Administração'
        },
        agentConfiguration: {
          title: 'Configuração de Agentes',
          description: 'Guia detalhado para configurar os diversos agentes de IA.',
          category: 'Agentes'
        },
        backupRecovery: {
          title: 'Backup & Recuperação',
          description: 'Crie backups e restaure seus dados em emergências.',
          category: 'Gerenciamento de Dados'
        },
        securityCompliance: {
          title: 'Segurança & Conformidade',
          description: 'Melhores práticas para segurança, 2FA e requisitos de conformidade.',
          category: 'Segurança'
        },
        apiDocumentation: {
          title: 'Documentação da API',
          description: 'Referência completa da API REST do AI Hub para desenvolvedores.',
          category: 'Desenvolvedor'
        },
        monitoringLogging: {
          title: 'Monitoramento & Registro',
          description: 'Monitore o desempenho do sistema e analise registros de atividade.',
          category: 'Monitoramento'
        },
        troubleshooting: {
          title: 'Guia de Solução de Problemas',
          description: 'Soluções para problemas comuns e mensagens de erro.',
          category: 'Solução de Problemas'
        }
      }
    },
    faq: {
      items: {
        twoFactorAuth: {
          question: 'Como ativo a autenticação de dois fatores?',
          answer: 'Você pode ativar a 2FA nas configurações do tenant em \'Segurança & Conformidade\'. Após a ativação, todos os usuários serão solicitados a configurá-la em seu próximo login.'
        },
        automaticBackups: {
          question: 'Com que frequência os backups automáticos são criados?',
          answer: 'Os backups automáticos são criados diariamente às 02:00 por padrão. Você pode ajustar a frequência e o horário em \'Gerenciamento de Dados > Backups & Recuperação\'.'
        },
        aiModels: {
          question: 'Quais modelos de IA são suportados?',
          answer: 'O AI Hub suporta GPT-4, GPT-4 Turbo, GPT-3.5 Turbo, Claude 3 Opus, Claude 3 Sonnet e mais. A lista completa pode ser encontrada em \'Módulos & Recursos > Modelos\'.'
        },
        customAgents: {
          question: 'Posso criar agentes personalizados?',
          answer: 'Sim, além dos agentes predefinidos (Email, Normas, Internet, Jelmoli), você pode criar agentes personalizados com configurações de prompt específicas. Os detalhes podem ser encontrados na documentação em \'Configuração de Agentes\'.'
        },
        concurrentUsers: {
          question: 'Quantos usuários podem trabalhar simultaneamente no sistema?',
          answer: 'O número de usuários simultâneos depende do seu plano de assinatura. Por padrão, até 50 sessões simultâneas são possíveis. Para requisitos maiores, entre em contato com nossa equipe de vendas.'
        },
        dataEncryption: {
          question: 'Meus dados são armazenados criptografados?',
          answer: 'Sim, todos os dados são criptografados tanto em trânsito (TLS 1.3) quanto em repouso (AES-256). Mais informações podem ser encontradas em nossa documentação de segurança.'
        },
        restoreMessages: {
          question: 'Como posso restaurar mensagens excluídas?',
          answer: 'As mensagens excluídas são mantidas no backup por 30 dias. Entre em contato com o suporte com o ID do ticket e o período para solicitar uma restauração.'
        },
        supportedLanguages: {
          question: 'Quais idiomas o AI Hub suporta?',
          answer: 'A interface do usuário está disponível em alemão, inglês, francês e português brasileiro. Os agentes de IA podem se comunicar em mais de 50 idiomas, dependendo do modelo escolhido.'
        }
      }
    },
    tutorials: {
      title: 'Tutoriais em Vídeo',
      description: 'Aprenda o AI Hub através de nossos guias de vídeo passo a passo',
      items: {
        gettingStarted: {
          title: 'Primeiros Passos com AI Hub',
          description: 'Introdução à plataforma e navegação básica',
          duration: '8:42 min'
        },
        userRoleManagement: {
          title: 'Gerenciamento de Usuários e Funções',
          description: 'Criar usuários, atribuir funções e gerenciar permissões',
          duration: '12:15 min'
        },
        modelConfiguration: {
          title: 'Configurar Modelos LLM',
          description: 'Configurar chaves de API e testar modelos',
          duration: '10:30 min'
        },
        agentSetup: {
          title: 'Configurar Agentes',
          description: 'Configurar Agente de Email, Agente de Internet e outros agentes',
          duration: '15:20 min'
        },
        backupRecovery: {
          title: 'Backup & Recuperação',
          description: 'Criar backups e restaurar dados',
          duration: '9:45 min'
        },
        monitoringAlerts: {
          title: 'Monitoramento & Alertas',
          description: 'Configurar monitoramento do sistema e alertas',
          duration: '11:00 min'
        }
      }
    },
    ticketStatus: {
      open: 'Aberto',
      inProgress: 'Em Andamento',
      resolved: 'Resolvido',
      closed: 'Fechado'
    },
    ticketPriority: {
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      urgent: 'Urgente'
    }
  },

  taskbar: {
    startMenu: 'Menu Iniciar',
    applications: 'Aplicativos',
    agentManagement: 'Gerenciamento de Agentes',
    systemSettings: 'Configurações do Sistema',
    options: 'Opções',
    recentApps: 'Aplicativos Recentes',
    search: 'Pesquisar',
    searchPlaceholder: 'Pesquisar...',
    powerOptions: 'Energia',
    logout: 'Sair',
    shutdown: 'Desligar',
    restart: 'Reiniciar'
  },

  moduleManager: {
    title: 'Módulos & Agentes',
    subtitle: 'Gerenciar módulos de IA disponíveis e sua configuração',
    activeOf: 'de',
    userRole: 'Função do Usuário:',
    administrator: 'Administrador',
    user: 'Usuário',
    configure: 'Configurar',
    status: {
      active: 'Ativo',
      inactive: 'Inativo',
      error: 'Erro',
      unknown: 'Desconhecido'
    },
    access: {
      admin: 'Admin',
      premium: 'Premium',
      standard: 'Padrão'
    },
    usage: 'Uso',
    accessDenied: 'Acesso Negado',
    adminRequired: 'Permissão de administrador necessária',
    premiumRequired: 'Acesso premium necessário',
    unavailableModules: 'Módulos Não Disponíveis',
    unavailableSubtitle: 'Estes módulos requerem permissões estendidas',
    modules: {
      chatAgent: {
        name: 'Agente de Chat',
        description: 'Agente de conversa geral para consultas dos usuários'
      },
      documentAnalyzer: {
        name: 'Analisador de Documentos',
        description: 'Analisa e extrai informações de documentos'
      },
      webSearch: {
        name: 'Agente de Busca na Web',
        description: 'Pesquisa na internet informações atuais'
      },
      calendarAssistant: {
        name: 'Assistente de Calendário',
        description: 'Gerencia compromissos e agendamentos'
      },
      emailProcessor: {
        name: 'Processador de Email',
        description: 'Processa e categoriza emails automaticamente'
      },
      dataAnalyst: {
        name: 'Analista de Dados',
        description: 'Analisa conjuntos de dados e cria relatórios'
      },
      securityMonitor: {
        name: 'Monitor de Segurança',
        description: 'Monitora a segurança do sistema e ameaças potenciais'
      },
      databaseConnector: {
        name: 'Conector de Banco de Dados',
        description: 'Conecta e interage com bancos de dados externos'
      }
    }
  },

  roleManagement: {
    newRole: 'Criar Nova Função',
    editRole: 'Editar Função',
    roleName: 'Nome da Função',
    roleDescription: 'Descrição',
    permissions: 'Permissões',
    assignedUsers: 'Usuários Atribuídos',
    selectUsers: 'Selecionar Usuários',
    usersSelected: 'selecionados',
    user: 'Usuário',
    users: 'Usuários',
    searchUsers: 'Buscar usuários...',
    allUsers: 'Todos os Usuários',
    selectAll: 'Selecionar Todos',
    deselectAll: 'Desselecionar Todos',
    saveRole: 'Salvar Função',
    cancel: 'Cancelar',
    deleteRole: 'Excluir Função',
    roleCreated: 'Função criada com sucesso',
    roleUpdated: 'Função atualizada com sucesso'
  },

  userManagementExtended: {
    department: 'Departamento',
    departments: 'Departamentos',
    selectDepartments: 'Selecionar Departamentos',
    departmentsSelected: 'selecionados',
    newDepartment: 'Novo Departamento',
    allUsers: 'Todos os Usuários',
    filterByDepartment: 'Filtrar por Departamento',
    showAllUsers: 'Mostrar Todos os Usuários',
    showActiveOnly: 'Somente Usuários Ativos',
    userDetails: 'Detalhes do Usuário',
    editUser: 'Editar Usuário',
    newUser: 'Novo Usuário',
    firstName: 'Primeiro Nome',
    lastName: 'Sobrenome',
    phoneNumber: 'Número de Telefone',
    position: 'Cargo',
    hireDate: 'Data de Contratação',
    selectRole: 'Selecionar Função',
    selectStatus: 'Selecionar Status',
    userCreated: 'Usuário criado com sucesso',
    userUpdated: 'Usuário atualizado com sucesso',
    // Additional fields for UserManagement
    addUser: 'Adicionar Usuário',
    exportCSV: 'Exportar CSV',
    import: 'Importar',
    syncUsers: 'Sincronizar Usuários',
    syncSuccess: 'Sincronização Bem-Sucedida',
    syncSuccessMessage: 'Usuários sincronizados com sucesso',
    mergeUsers: 'Fusão de Usuários',
    duplicatesFound: 'Duplicatas Encontradas',
    mergeWarning: 'Certifique-se de que nenhuma duplicata permaneça',
    groupsLabel: 'Grupos',
    lastLogin: 'Último Login',
    sortBy: 'Ordenar Por',
    filterBy: 'Filtrar Por',
    source: 'Fonte',
    status: 'Status',
    statusActive: 'Ativo',
    statusInactive: 'Inativo',
    statusLocked: 'Bloqueado',
    deleteUser: 'Excluir Usuário',
    deleteUserConfirm: 'Confirmar Exclusão',
    deleteUserMessage: 'Tem certeza de que deseja excluir este usuário?',
    viewer: 'Visualizador',
    admin: 'Administrador',
    powerUser: 'Usuário Poderoso',
    user: 'Usuário',
    localUser: 'Usuário Local'
   },

  alertsManagement: {
    title: 'Gerenciamento de Alertas',
    subtitle: 'Gerencie seus alertas',
    searchPlaceholder: 'Pesquisar...',
    newAlert: 'Novo Alerta',
    types: {
      error: 'Erro',
      warning: 'Aviso',
      info: 'Info'
    },
    severity: {
      critical: 'Crítico',
      warning: 'Aviso',
      info: 'Info'
    },
    table: {
      name: 'Nome',
      type: 'Tipo',
      condition: 'Condição',
      threshold: 'Limite',
      channels: 'Canais',
      triggers: 'Gatilhos',
      lastTrigger: 'Último Gatilho',
      status: 'Status',
      actions: 'Ações'
    },
    channels: {
      email: 'Email',
      slack: 'Slack'
    },
    status: {
      active: 'Ativo',
      inactive: 'Inativo'
    },
    actions: {
      newAlert: 'Novo Alerta',
      duplicate: 'Duplicar',
      edit: 'Editar',
      delete: 'Excluir'
    },
    notificationChannels: {
      title: 'Canais de Notificação',
      subtitle: 'Selecione os canais que deseja receber notificações'
    },
    panel: {
      editAlert: 'Editar Alerta',
      createAlert: 'Criar Alerta'
    },
    form: {
      basicInfo: 'Informações Básicas',
      alertName: 'Nome do Alerta',
      alertNamePlaceholder: 'Digite o nome do alerta',
      alertNameHelper: 'O nome do alerta deve ser único',
      type: 'Tipo',
      conditions: 'Condições',
      condition: 'Condição',
      conditionPlaceholder: 'Digite a condição',
      conditionHelper: 'Descreva a condição que aciona o alerta',
      threshold: 'Limite',
      thresholdPlaceholder: 'Digite o limite',
      channels: 'Canais',
      selectChannels: 'Selecionar Canais',
      email: 'Email',
      slack: 'Slack',
      saveButton: 'Salvar',
      cancelButton: 'Cancelar'
    },
    deleteDialog: {
      title: 'Excluir Alerta',
      description: 'Tem certeza de que deseja excluir este alerta?',
      cancel: 'Cancelar',
      confirm: 'Excluir'
    }
  },

  // System Monitoring
  systemMonitoring: {
    title: 'Monitoramento do Sistema',
    subtitle: 'Monitore o desempenho do seu sistema',
    network: 'Rede',
    online: 'Online',
    offline: 'Offline',
    restricted: 'Restrito',
    metrics: {
      title: 'Métricas',
      cpu: 'CPU',
      memory: 'Memória',
      disk: 'Disco',
      network: 'Rede'
    },
    services: {
      title: 'Serviços',
      status: 'Status',
      uptime: 'Tempo de atividade',
      responseTime: 'Tempo de resposta',
      online: 'Online',
      offline: 'Offline',
      degraded: 'Degradado'
    },
    requests: {
      title: 'Requisições',
      subtitle: 'Monitore as requisições de entrada'
    },
    performance: {
      title: 'Desempenho',
      subtitle: 'Monitore o desempenho do sistema'
    },
    database: {
      title: 'Banco de Dados',
      connections: 'Conexões',
      queries: 'Consultas',
      cacheHitRate: 'Taxa de acerto do cache'
    }
  },

  // Activity Log Extended
  activityLogExtended: {
    sort: 'Ordenar',
    resetFilter: 'Redefinir Filtro',
    successful: 'Sucesso',
    warning: 'Aviso',
    error: 'Erro',
    information: 'Informação',
    timestamp: 'Timestamp',
    user: 'Usuário',
    action: 'Ação',
    resource: 'Recurso',
    ipAddress: 'Endereço IP',
    detailsColumn: 'Detalhes',
    noDetails: 'Sem Detalhes',
    exportFilename: 'log_atividade.csv',
    actions: {
      login: 'Login',
      apiRateLimitReached: 'Limite de Taxa de API Alcançado'
    },
    resources: {
      emailAgent: 'Agente de Email'
    },
    details: {
      fullBackupSuccess: 'Backup Completo com Sucesso',
      rateLimitReached: 'Limite de Taxa Alcançado',
      newUser: 'Novo Usuário',
      roleAssigned: 'Função Atribuída',
      memoryTokenUpdated: 'Token de Memória Atualizado',
      timeoutAfter30s: 'Tempo Limite Após 30s'
    }
  },

  // Tenant Settings Extended
  tenantSettingsExtended: {
    general: {
      tenantInformation: 'Informações do Locatário',
      tenantInformationDesc: 'Nome, Logotipo e Configurações de Cores',
      tenantName: 'Nome do Locatário',
      tenantLogo: 'Logotipo do Locatário',
      logoUploaded: 'Logotipo carregado',
      noLogoSelected: 'Nenhum logotipo selecionado',
      preview: 'Visualização:',
      white: 'Branco',
      gray: 'Cinza',
      black: 'Preto',
      logoPreview: 'Visualização do Logotipo',
      primaryColor: 'Cor Primária',
      accentColor: 'Cor de Destaque'
    },
    company: {
      companyInformation: 'Informações da Empresa',
      companyInformationDesc: 'Informações Legais e de Contato',
      masterEntryNote: 'Os dados só podem ser alterados na entrada principal.',
      companyName: 'Nome da Empresa',
      uidTaxNumber: 'UID / Número Fiscal',
      phoneNumber: 'Número de Telefone',
      email: 'Email',
      domain: 'Domínio',
      address: 'Endereço',
      zipCode: 'CEP',
      city: 'Cidade'
    },
    regional: {
      regionalSettings: 'Configurações Regionais',
      regionalSettingsDesc: 'Idioma, Fuso Horário e Formatos',
      language: 'Idioma',
      languageGerman: 'Deutsch',
      languageEnglish: 'English',
      languageFrench: 'Français',
      languageItalian: 'Italiano',
      timezone: 'Fuso Horário',
      timezoneZurich: 'Europe/Zurich (CET)',
      timezoneBerlin: 'Europe/Berlin (CET)',
      timezoneUTC: 'UTC',
      currency: 'Moeda',
      currencyCHF: 'CHF (Franco Suíço)',
      currencyEUR: 'EUR (Euro)',
      currencyUSD: 'USD (Dólar Americano)',
      dateFormat: 'Formato de Data',
      dateFormatDDMMYYYY: 'DD.MM.AAAA',
      dateFormatMMDDYYYY: 'MM/DD/AAAA',
      dateFormatYYYYMMDD: 'AAAA-MM-DD'
    },
    security: {
      passwordPolicies: 'Políticas de Senha',
      passwordPoliciesDesc: 'Definir requisitos para senhas de usuário',
      minPasswordLength: 'Comprimento Mínimo da Senha',
      minPasswordLengthDesc: 'Número mínimo de caracteres para senhas',
      uppercaseRequired: 'Maiúsculas Obrigatórias',
      uppercaseRequiredDesc: 'Pelo menos uma letra maiúscula (A-Z)',
      digitsRequired: 'Dígitos Obrigatórios',
      digitsRequiredDesc: 'Pelo menos um dígito (0-9)',
      specialCharsRequired: 'Caracteres Especiais Obrigatórios',
      specialCharsRequiredDesc: 'Pelo menos um caractere especial (!@#$%...)',
      passwordExpiry: 'Expiração de Senha (dias)',
      passwordExpiryDesc: '0 = sem expiração',
      twoFactorAuth: 'Autenticação de Dois Fatores (2FA)',
      twoFactorAuthDesc: 'Autenticação multifator para segurança aprimorada',
      enforce2FAAll: 'Obrigar 2FA para todos os usuários',
      enforce2FAAllDesc: 'Todos os usuários devem ativar 2FA',
      enforce2FAAdmins: 'Obrigar 2FA para administradores',
      enforce2FAAdminsDesc: 'Apenas administradores devem ativar 2FA',
      sessionSettings: 'Configurações de Sessão',
      sessionSettingsDesc: 'Tempo Limite e Gerenciamento de Sessão',
      sessionTimeout: 'Tempo Limite de Sessão (minutos)',
      sessionTimeoutDesc: 'Logout automático após inatividade',
      absoluteSessionDuration: 'Duração Absoluta da Sessão (horas)',
      absoluteSessionDurationDesc: 'Duração máxima da sessão, 0 = ilimitado',
      privacyCompliance: 'Privacidade e Conformidade',
      privacyComplianceDesc: 'GDPR e Lei Suíça de Proteção de Dados',
      gdprMode: 'Ativar Modo GDPR',
      gdprModeDesc: 'Recursos adicionais de conformidade com GDPR',
      swissDSG: 'Modo DSG Suíço',
      swissDSGDesc: 'Lei Suíça de Proteção de Dados (nDSG)',
      dataRetention: 'Retenção de Dados (dias)',
      dataRetentionDesc: 'Exclusão automática após X dias',
      archiveBeforeDeletion: 'Arquivar Antes de Excluir',
      archiveBeforeDeletionDesc: 'Arquivar dados antes de excluí-los',
      // EU AI Act
      euAiAct: 'Lei de IA da UE',
      euAiActDesc: 'Conformidade com o Regulamento de Inteligência Artificial da UE',
      enableEuAiActCompliance: 'Ativar Conformidade com a Lei de IA',
      enableEuAiActComplianceDesc: 'Recursos adicionais de conformidade para sistemas de IA',
      riskClassification: 'Classificação de Risco',
      riskClassificationDesc: 'Classificação do sistema de IA por nível de risco',
      aiSystemDocumentation: 'Documentação do Sistema de IA',
      aiSystemDocumentationDesc: 'Documentação automática de decisões de IA',
      humanOversightRequired: 'Supervisão Humana Necessária',
      humanOversightRequiredDesc: 'Revisão humana para decisões críticas de IA',
      // EU AI Act - Visão Geral do Status
      systemStatusOverview: 'Status do Sistema',
      systemStatusOverviewDesc: 'Visão rápida do status de conformidade do sistema de IA',
      isHighRiskSystem: 'Este sistema é um sistema de IA de alto risco?',
      highRiskSystemYes: 'Sim - Sistema de Alto Risco',
      highRiskSystemNo: 'Não - Não é um Sistema de Alto Risco',
      highRiskAdditionalObligations: 'Obrigações adicionais se aplicam a sistemas de IA de alto risco sob a Lei de IA da UE. Por favor, certifique-se de que todos os requisitos sejam atendidos.',
      assessmentDate: 'Data de Avaliação',
      assessedBy: 'Avaliado de acordo com a Lei de IA da UE',
      euAiActLink: 'Ver Texto Legal',
      registrationStatus: 'Status de Registro',
      registrationComplete: 'Completo',
      registrationPending: 'Pendente',
      // EU AI Act - Anexo III Categorias
      annexIIICategories: 'Categorias de Alto Risco (Anexo III)',
      annexIIICategoriesDesc1: 'Se algum critério se aplicar, o sistema de IA é classificado como de alto risco.',
      annexIIICategoriesDesc2: 'Se o sistema de IA for classificado como de alto risco, um aviso será exibido ao usuário na interface.',
      biometricIdentification: 'Identificação Biométrica',
      biometricIdentificationDesc: 'Reconhecimento facial, scan de íris, análise de voz, análise de marcha (Anexo III, Seção 1)',
      criticalInfrastructure: 'Infraestrutura Crítica',
      criticalInfrastructureDesc: 'Redes elétricas, sistemas de transporte, abastecimento de água (Anexo III, Seção 2)',
      educationTraining: 'Educação e Formação',
      educationTrainingDesc: 'Avaliações automatizadas, sistemas de admissão, medição de progresso (Anexo III, Seção 3)',
      employmentManagement: 'Emprego e Gestão de Pessoal',
      employmentManagementDesc: 'Triagem de currículos, promoções, análises de demissão (Anexo III, Seção 4)',
      essentialServices: 'Serviços Essenciais',
      essentialServicesDesc: 'Concessão de crédito, avaliação de seguro, assistência social (Anexo III, Seção 5)',
      lawEnforcement: 'Aplicação da Lei',
      lawEnforcementDesc: 'Avaliação de risco, análise de evidências, classificação de suspeitos (Anexo III, Seção 6)',
      migrationBorderControl: 'Migração e Controle de Fronteiras',
      migrationBorderControlDesc: 'Solicitações automatizadas, perfis de risco, suporte à decisão (Anexo III, Seção 7)',
      justiceDemo: 'Justiça e Democracia',
      justiceDemoDesc: 'Apoio a decisões judiciais, interpretação jurídica (Anexo III, Seção 8)',
      // Registered High-Risk AI System
      registeredHighRiskSystem: 'Sistema de IA de Alto Risco Registrado',
      registeredHighRiskSystemDesc: 'Este sistema foi oficialmente registrado junto à Comissão Europeia',
      registration: 'Registro',
      conformityMarking: 'Marcação de Conformidade',
      technicalDocumentation: 'Documentação Técnica',
      download: 'Baixar',
      // Transparency Requirements
      transparencyRequirements: 'Requisitos de Transparência',
      transparencyRequirementsDesc: 'As seguintes informações serão exibidas ao usuário',
      aiNoticeDisplay: 'Exibir texto abaixo do campo de entrada do chat: Aviso de IA',
      aiNoticeDisplayDesc: 'As respostas podem conter erros. Por favor, verifique o conteúdo antes de usar.',
      orchestratorBasis: 'Base de Decisão do Orquestrador',
      orchestratorBasisDesc: '',
      responsibilities: 'Responsabilidades',
      responsibilitiesDesc: '(ver Responsabilidades)',
      humanInLoop: 'Humano no Loop',
      humanInLoopDesc: 'Este sistema de IA não encaminha informações por automação. Isso é feito exclusivamente pelo humano no loop.',
      // Technical Security Measures
      technicalSecurityMeasures: 'Medidas de Segurança Técnicas',
      technicalSecurityMeasuresDesc: 'Mostra todas as medidas de segurança relevantes deste sistema:',
      killswitch: 'Kill-Switch',
      killswitchDesc: 'Deixa o sistema inteiro offline',
      killswitchActiveWarning: 'Atenção! O sistema inteiro foi colocado offline.',
      twoFactorAuthReference: 'Autenticação de Dois Fatores (2FA)',
      twoFactorAuthReferenceDesc: 'Encontrado na seção "Segurança & Conformidade"',
      whitelistReference: 'Lista Branca',
      whitelistReferenceDesc: 'Encontrado na seção "Segurança & Conformidade"',
      tenantRolesReference: 'Modelo de Funções',
      tenantRolesReferenceDesc: 'Encontrado na seção "Segurança & Conformidade"',
      loggingDataReference: 'Dados de Log',
      loggingDataReferenceDesc: 'Encontrado na seção "Log & Monitoramento"',
      systemCriticalAlerts: 'Alertas de Erros Críticos do Sistema',
      systemCriticalAlertsDesc: 'Encontrado na seção "Log & Monitoramento"',
      backupRecoveryReference: 'Backup e Recuperação',
      backupRecoveryReferenceDesc: 'Encontrado na seção "Gerenciamento de Dados"',
      goTo: 'Ir para',
      // Human Oversight
      humanOversight: 'Supervisão Humana',
      humanOversightDesc: 'Monitoramento, Relato e Intervenção no Sistema de IA',
      humanInLoopOversight: 'Este sistema de IA não encaminha informações por automação. Isso é feito exclusivamente pelo humano no loop.',
      reviewResetLimit: 'Revisar, Redefinir e Limitar',
      reviewResetLimitDesc: 'Intervenção em todos os processos a partir do Registro & Monitoramento',
      staffTraining: 'Treinamento da Equipe',
      staffTrainingDesc: 'A equipe foi treinada de forma abrangente',
      feedbackReporting: 'Relato & Perguntas',
      feedbackReportingDesc: 'Um relato pode ser deixado em cada entrada do chatbot. O campo de texto abre automaticamente após ativar o botão de "não gostei"',
      auditTrail: 'Trilha de Auditoria',
      auditTrailDesc: 'Um registro completo e à prova de manipulação de todos os eventos relevantes do sistema',
      oversightDocumentation: 'Documentação "Supervisão técnica / organizacional"',
      oversightDocumentationDesc: 'Baixar documentação',
      download: 'Baixar'
    },
    access: {
      singleSignOn: 'Single Sign-On (SSO)',
      singleSignOnDesc: 'Autenticação centralizada via provedor de identidade',
      enableSSO: 'Ativar SSO',
      enableSSODesc: 'Permite que os usuários façam login via um provedor de identidade externo',
      identityProvider: 'Provedor de Identidade',
      noProvider: 'Nenhum Provedor',
      azureAD: 'Azure Active Directory',
      googleIdentity: 'Google Identity Platform',
      okta: 'Okta',
      customSAML: 'SAML 2.0 Personalizado',
      azureConfiguration: 'Configuração Azure AD',
      tenantID: 'ID do Locatário',
      tenantIDPlaceholder: 'Seu ID de Locatário Azure',
      clientID: 'ID do Cliente',
      clientIDPlaceholder: 'Seu ID de Aplicação (Cliente) Azure',
      clientSecret: 'Segredo do Cliente',
      clientSecretPlaceholder: 'Seu Segredo do Cliente Azure',
      testConnection: 'Testar Conexão',
      notConnected: 'Não conectado',
      connected: 'Conectado',
      connectionError: 'Erro de conexão',
      testing: 'Testando...',
      connectionSuccessful: 'Conexão bem-sucedida!',
      ipWhitelist: 'Lista Branca de IP',
      ipWhitelistDesc: 'Restringir acesso a endereços IP específicos',
      enableIPWhitelist: 'Ativar Lista Branca de IP',
      enableIPWhitelistDesc: 'Permitir apenas conexões de IPs na lista branca',
      allowedIPs: 'Endereços IP Permitidos',
      ipAddress: 'Endereço IP',
      ipAddressPlaceholder: 'ex. 192.168.1.1',
      addIP: 'Adicionar IP',
      ipWarning: 'Atenção: Configuração incorreta de IP pode bloquear seu acesso!',
      ipFormatError: 'Endereço IP inválido. Formato: xxx.xxx.xxx.xxx',
      ssoRequirements: 'Requisitos de SSO',
      ssoRequirementsDesc: 'Requisitos de segurança adicionais para SSO',
      enforce2FAForSSO: 'Obrigar 2FA para usuários SSO',
      enforce2FAForSSODesc: 'Todos os usuários conectados via SSO devem ativar 2FA',
      verifiedEmailOnly: 'Apenas Emails Verificados',
      verifiedEmailOnlyDesc: 'Permitir apenas usuários com endereços de email verificados',
      autoTokenRefresh: 'Atualização Automática de Token',
      autoTokenRefreshDesc: 'Estender automaticamente as sessões quando o usuário está ativo'
    },
    dsgvo: {
      basicFunctions: 'Funções Básicas de LGPD',
      basicFunctionsDesc: 'Controla os tópicos de LGPD mais fundamentais no Orquestrador',
      datenschutzmodus: 'Modo de Privacidade',
      datenschutzmodusDesc: 'Todos os requisitos estão ativos quando este modo está habilitado',
      memory: 'Memória',
      memoryDesc: 'Gerencia o armazenamento de dados pessoais no Orquestrador',
      memorySettings: 'Configurações de Memória',
      duration: 'Duração',
      deleteAfterSession: 'Excluir após cada sessão',
      backup: 'Backup',
      backupDesc: 'Gerencia o armazenamento de backup de dados pessoais no Orquestrador',
      agentLogging: 'Registro de Agentes',
      agentLoggingDesc: 'Armazenamento de respostas de agentes',
      agentLoggingSettings: 'Configurações de Registro de Agentes',
      onlySystemDiagnose: 'Apenas para diagnóstico do sistema',
      transparencyInformation: 'Transparência & Informações',
      transparencyInformationDesc: 'Regulamentação de informações do titular dos dados. Estas informações são exibidas na Entrada do Usuário em Configurações da Conta / LGPD',
      verantwortlicher: 'Controlador',
      verantwortlicherDesc: 'Quem controla o processamento de dados?',
      verantwortlicherAnbieter: 'Provedor',
      verantwortlicherTenant: 'Locatário (Empresa XY)',
      verantwortlicherOther: 'Outro (ver detalhes)',
      verantwortlicherPlaceholder: 'Por favor, forneça detalhes sobre o controlador...',
      selectOption: 'Selecionar...',
      zwecke: 'Finalidades',
      zweckeDesc: 'Para que os dados são usados?',
      zweckKontextverarbeitung: 'Processamento de contexto',
      zweckAgentenwahl: 'Seleção de agente',
      zweckNormenVorschlaege: 'Padrões & Sugestões',
      zweckMemory: 'Memória',
      zweckRAGSuche: 'Busca RAG',
      zweckFehleranalyse: 'Análise de erros',
      zweckProtokollierung: 'Registro',
      rechtsgrundlage: 'Base Legal',
      rechtsgrundlageDesc: 'Por que esse processamento é permitido?',
      rechtsgrundlageBerechtigtesInteresse: 'Interesse legítimo',
      rechtsgrundlageEinwilligung: 'Consentimento',
      rechtsgrundlageVertragserfuellung: 'Cumprimento de contrato',
      rechtsgrundlageRechtlicheVerpflichtung: 'Obrigação legal',
      rechtsgrundlageOeffentlichesInteresse: 'Interesse público',
      datenkategorien: 'Categorias de Dados',
      datenkategorienDesc: 'O que está sendo armazenado?',
      datenkategorieTexteingaben: 'Entradas de texto',
      datenkategorieAgentenantworten: 'Respostas de agentes',
      datenkategorieGespraechsverlauf: 'Histórico de conversas',
      datenkategorieDateiuploads: 'Uploads de arquivos',
      datenkategorieMetadaten: 'Metadados',
      datenkategorieNutzerprofil: 'Perfil do usuário',
      datenkategorieRAGErgebnisse: 'Resultados RAG',
      datenkategorieSystemprotokolle: 'Logs do sistema',
      empfaenger: 'Destinatários',
      empfaengerDesc: 'Para onde vão os dados?',
      empfaengerLLMAnbieter: 'Provedores LLM',
      empfaengerLokaleModelle: 'Modelos locais',
      empfaengerInterneAgenten: 'Agentes internos',
      empfaengerExterneAgenten: 'Agentes externos',
      empfaengerRAGDienste: 'Serviços RAG',
      empfaengerMonitoringLogging: 'Sistemas de monitoramento/registro',
      empfaengerBackupSysteme: 'Sistemas de backup',
      speicherdauer: 'Duração de Armazenamento',
      speicherdauerDesc: 'Informações de acordo com a seleção de "Informações Básicas de LGPD"',
      deactivated: 'Desativado',
      afterEachSession: 'Após cada sessão',
      systemDiagnose: 'Diagnóstico do sistema',
      rechte: 'Direitos',
      rechteDesc: 'O que os titulares dos dados podem solicitar?',
      rechtAuskunft: 'Informação',
      rechtBerichtigung: 'Retificação',
      rechtLoeschung: 'Apagamento',
      rechtEinschraenkung: 'Restrição do processamento',
      rechtWiderspruch: 'Oposição',
      rechtDatenuebertragbarkeit: 'Portabilidade de dados',
      rechtWiderruf: 'Revogação do consentimento',
      drittland: 'Transferência para Terceiro País',
      drittlandDesc: 'Os dados são transferidos para os EUA?',
      drittlandKeine: 'Nenhuma transferência para terceiro país',
      drittlandUSASCCs: 'EUA – com CCPs',
      drittlandUSATIA: 'EUA – com TIA',
      drittlandEUEWR: 'UE/EEE',
      drittlandAndereSCCs: 'Outros terceiros países – com CCPs',
      drittlandLokal: 'Processamento local sem transferência',
      automationNotice: 'Aviso sobre Automação',
      automationNoticeDesc: 'A IA está sendo usada?',
      aiNotice: 'Aviso de IA:',
      aiNoticeText: 'As respostas podem conter erros. Por favor, revise o conteúdo antes de usar.',
      selected: 'selecionado(s)',
      documentedProcessingActivities: 'Atividades de Processamento Documentadas',
      documentedProcessingActivitiesDesc: 'Registro das atividades de processamento de dados. Este registro serve à transparência e rastreabilidade no uso de dados pessoais.',
      providerSystemLevel: 'Provedor (Nível do Sistema)',
      providerSystemLevelDesc: 'Estas operações são processadas automaticamente pela plataforma:',
      contextStorageOrchestrator: 'Armazenamento de contexto no Orquestrador (Memória)',
      loggingAccessErrors: 'Registro de acessos, erros, decisões',
      communicationAgentsAPI: 'Comunicação com agentes via API',
      download: 'Download',
      tenantLevel: 'Locatário (Nível do Inquilino)',
      tenantLevelDesc: 'Estes processamentos de dados são atribuídos ao locatário:',
      tenantLevelItem1: 'Uso de agentes com acesso a conteúdo ou dados pessoais',
      tenantLevelItem2: 'Armazenamento de entradas de texto e respostas',
      tenantLevelItem3: 'Memória relacionada à sessão ou ao usuário (se ativada)',
      dsfaTitle: 'Avaliação de Impacto sobre a Proteção de Dados (AIPD)',
      dsfaDesc: 'Para certos tipos de processamento de dados com provável alto risco para os direitos e liberdades das pessoas afetadas, deve ser realizada uma Avaliação de Impacto sobre a Proteção de Dados (AIPD).',
      dsfaResponsibility: 'Responsabilidade',
      dsfaResponsibilityItem1: 'O locatário é responsável sob a lei de proteção de dados e deve avaliar se uma AIPD é necessária.',
      dsfaResponsibilityItem2: 'O provedor disponibiliza os fundamentos técnicos para que o locatário possa realizar esta avaliação de forma fundamentada.',
      dsfaRiskAssessment: 'Avaliação de Riscos',
      dsfaRiskAssessmentDesc: 'Cada agente possui seu próprio calculador de categoria de risco e é avaliado independentemente com base nas informações fornecidas.',
      dsfaGoTo: 'Ir para',
      dsfaAdditional: 'Informações Adicionais',
      dsfaAdditionalItem1: 'Aviso de AIPD no admin - Ao ativar agentes de alto risco, aparece um aviso sobre possível obrigação de AIPD',
      dsfaAdditionalItem2: 'Modelo de exportação - Fornecemos um modelo de AIPD mediante solicitação (PDF/Word)',
      dsfaAdditionalItem3: 'Log de configuração - Documenta quais agentes estavam ativos com qual status',
      day: 'Dia',
      days: 'Dias',
      week: 'Semana',
      weeks: 'Semanas',
      month: 'Mês',
      months: 'Meses',
      rightsOfDataSubjects: 'Direitos dos Titulares de Dados',
      rightsOfDataSubjectsDesc: 'Todos os direitos dos titulares de dados são tratados aqui',
      rightAuskunftTitle: 'Informação',
      rightAuskunftDesc1: 'Cada usuário tem o direito de saber quais dados estão armazenados sobre ele, incluindo fonte, finalidade e destinatários',
      rightAuskunftDesc2: 'Em «Gerenciamento de Usuários» os dados podem ser baixados para cada usuário individual',
      rightBerichtigungTitle: 'Retificação',
      rightBerichtigungDesc1: 'Cada usuário tem o direito de ter seu perfil de usuário corrigido',
      rightBerichtigungDesc2: 'Em «Gerenciamento de Usuários» os dados podem ser alterados para cada usuário individual',
      rightLoeschungTitle: 'Apagamento',
      rightLoeschungDesc1: 'Cada usuário tem o direito de excluir seus dados',
      rightLoeschungDesc2: 'Em «Gerenciamento de Usuários» os dados podem ser excluídos para cada usuário individual',
      rightEinschraenkungTitle: 'Restrição',
      rightEinschraenkungDesc1: 'Cada usuário tem o direito à «restrição» ou «sem perfilagem»',
      rightEinschraenkungDesc2: 'A interface fornece a opção de escolher entre as seguintes opções:',
      rightEinschraenkungMemory: 'Uso da memória do contexto de conversa - Alternar na interface',
      rightEinschraenkungPersonalisierung: 'Uso de atributos de usuário - Opt-in, controle de função pode ser desativado',
      rightEinschraenkungProfilbildung: 'Criação de perfis de usuário individuais - Desativar perfilagem ou consentimento via interface',
      rightEinschraenkungAgentenwahl: 'Controle baseado em comportamento - Apenas baseado em sessão, sem armazenamento permanente',
      personalization: 'Personalização',
      profiling: 'Perfilagem',
      automatedAgentSelection: 'Seleção Automatizada de Agentes',
      rightDatenuebertragbarkeitTitle: 'Portabilidade de Dados',
      rightDatenuebertragbarkeitDesc1: 'Cada usuário tem o direito de receber seus dados em um formato estruturado, comum e legível por máquina e transferi-los para outro provedor sem ser impedido',
      rightDatenuebertragbarkeitDesc2: 'Em «Gerenciamento de Usuários» os dados podem ser baixados para cada usuário individual',
      rightWiderspruchTitle: 'Oposição',
      rightWiderspruchDesc1: 'Cada usuário tem o direito de se opor. O seguinte aviso está disponível na interface:',
      rightWiderspruchQuote: '«Você pode se opor ao armazenamento de seus dados»',
      rightNoAutomatedDecision: 'Nenhuma decisão totalmente automatizada sem possibilidade de revisão',
      rightNoAutomatedDecisionDesc: 'Decisões automatizadas pelo sistema de IA são claramente identificadas como tais («sugestão baseada em IA») e podem ser complementadas ou anuladas por revisão humana a qualquer momento («Human-in-the-loop»)',
      goTo: 'Ir para',
      dataProcessingAccess: 'Processamento de Dados & Acesso',
      dataProcessingAccessDesc: 'Esta plataforma suporta dois modelos operacionais: «sem acesso» e «acesso de suporte/hospedagem»',
      contractualModel: 'Modelo operacional acordado contratualmente:',
      contractualModelText: 'Padrão - Sem acesso, sem processamento de dados',
      standardNoAccess: 'Padrão: Sem Acesso – sem processamento de dados',
      standardNoAccessModel: 'O provedor não tem acesso aos dados armazenados (por ex. prompts, memória, respostas de agentes)',
      standardNoAccessDesc: 'Modelo de acesso:',
      standardNoAccessItem1: 'Isolamento completo do locatário',
      standardNoAccessItem2: 'Bancos de dados e logs separados',
      standardNoAccessItem3: 'Sem acesso por administradores de sistema ou suporte',
      standardNoAccessItem4: 'Nenhum DPA necessário (anotado no contrato «Modelo sem DPA»)',
      standardNoAccessNote: 'Ajuste de contrato necessário em caso de mudança',
      optionalSupportAccess: 'Opcional: Acesso de suporte ou hospedagem ativo',
      optionalSupportAccessModel: 'O provedor recebe acesso temporário mediante solicitação para:',
      optionalSupportAccessDesc: 'Modelo de acesso:',
      optionalSupportAccessItem1: 'Suporte técnico (por ex. solução de problemas, análise de logs)',
      optionalSupportAccessItem2: 'Hospedagem ou operação da plataforma',
      optionalSupportAccessItem3: 'Acordo de Processamento de Dados (DPA) de acordo com Art. 28 LGPD',
      optionalSupportAccessNote: 'Acesso somente após aprovação por escrito pelo locatário',
      accessLogged: 'O acesso é registrado (Audit Trail)'
    }
  },

  chatExtended: {
    filesAttached: '(Arquivos anexados)'
  },

  authorized: 'Autorizado',
  notAuthorized: 'Não autorizado'
};