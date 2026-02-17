// Internationalization system for AI Hub
import { 
  ExtendedTranslations, 
  extendedTranslationsDE, 
  extendedTranslationsEN, 
  extendedTranslationsFR, 
  extendedTranslationsPTBR 
} from './i18n-extensions';

export type Language = 'de' | 'en' | 'fr' | 'pt-br';

export interface Translations {
  // Common
  save: string;
  cancel: string;
  close: string;
  open: string;
  settings: string;
  loading: string;
  error: string;
  success: string;
  warning: string;
  
  // Login
  login: {
    title: string;
    subtitle: string;
    username: string;
    password: string;
    loginButton: string;
    forgotPassword: string;
    invalidCredentials: string;
    welcomeBack: string;
    // 2FA
    twoFactorTitle: string;
    twoFactorSubtitle: string;
    twoFactorAuthDescription: string;
    codeLabel: string;
    codePlaceholder: string;
    verifyButton: string;
    invalidCode: string;
    resendCode: string;
    confirmButton: string;
    // Login form fields
    selectTenantLabel: string;
    selectTenantPlaceholder: string;
    passwordPlaceholder: string;
    versionLabel: string;
    desktopLabel: string;
    mobileLabel: string;
    copyright: string;
    // Error messages
    errorSelectTenant: string;
    errorPasswordEmpty: string;
    errorPasswordTooShort: string;
    errorInvalidPassword: string;
    errorCode6Digits: string;
    errorInvalidCode: string;
    // Demo hints
    demoCodeHint: string;
  };
  
  // Header
  header: {
    aiHub: string;
    chat: string;
    options: string;
    logout: string;
    welcomeMessage: string;
    tenantAdministrator: string;
    tagline: string;
  };
  
  // Admin Menus
  admin: {
    tenant: {
      title: string;
      selectTenant: string;
      agentAssignment: string;
      api: string;
      permissions: string;
    };
    profile: {
      title: string;
      account: string;
      logout: string;
    };
  };
  
  // Account Settings
  account: {
    title: string;
    subtitle: string;
    profilePicture: string;
    profilePictureDescription: string;
    uploadImage: string;
    removeImage: string;
    changePassword: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    updatePassword: string;
    passwordMismatch: string;
    passwordUpdated: string;
    languageSection: string;
    languageDescription: string;
    themeSection: string;
    themeDescription: string;
    personalInfo: string;
    personalInfoDescription: string;
    username: string;
    email: string;
    role: string;
    saveChanges: string;
    // New additions for AccountSettings
    displayName: string;
    phoneNumber: string;
    jobTitle: string;
    department: string;
    emailPlaceholder: string;
    phoneNumberPlaceholder: string;
    jobTitlePlaceholder: string;
    departmentPlaceholder: string;
    imageTooLarge: string;
    passwordTooShort: string;
    endSession: string;
    endSessionDescription: string;
    logoutNow: string;
    administrator: string;
    user: string;
  };
  
  // Account Panel
  accountPanel: {
    title: string;
    language: string;
    design: string;
    logout: string;
    darkModeTitle: string;
    darkModeDescription: string;
    logoutDescription: string;
    logoutButton: string;
  };
  
  // Mobile Layout
  mobileLayout: {
    chatDescription: string;
    optionsDescription: string;
    accountDescription: string;
  };
  
  // Agent Settings
  agentSettings: {
    title: string;
    subtitle: string;
    availableAgents: string;
    agentDescription: string;
    active: string;
    available: string;
    private: string;
    public: string;
    activated: string;
    deactivated: string;
    
    // Theme Settings
    themeSettings: string;
    themeDescription: string;
    darkMode: string;
    darkModeDescription: string;
    
    // Language Settings
    languageSettings: string;
    languageDescription: string;
    language: string;
    
    // Custom Prompt
    customPrompt: string;
    customPromptDescription: string;
    customPromptLabel: string;
    customPromptPlaceholder: string;
    customPromptTip: string;
    
    // Response Settings
    responseSettings: string;
    responseDescription: string;
    responseLength: string;
    responseTone: string;
    creativity: string;
    creativityDescription: string;
    conservative: string;
    creative: string;
    preciseLabel: string;
    balancedLabel: string;
    creativeLabel: string;
    
    // Response Length Options
    short: string;
    medium: string;
    long: string;
    comprehensive: string;
    
    // Response Tone Options
    professional: string;
    casual: string;
    friendly: string;
    formal: string;
    expert: string;
  };
  
  // Orchestrator Panel
  orchestratorPanel: {
    configureSettings: string;
    active: string;
    inactive: string;
    start: string;
    stop: string;
    modelConfig: string;
    modelConfigDescription: string;
    aiModel: string;
    maxTokens: string;
    streamingEnabled: string;
    advancedParams: string;
    advancedParamsDescription: string;
    temperature: string;
    topP: string;
    frequencyPenalty: string;
    presencePenalty: string;
    systemPrompt: string;
    systemPromptDescription: string;
    systemPromptPlaceholder: string;
    reset: string;
  };
  
  // Agents
  agents: {
    emailAgent: {
      name: string;
      description: string;
      capabilities: string[];
    };
    normenAgent: {
      name: string;
      description: string;
      capabilities: string[];
    };
    internetAgent: {
      name: string;
      description: string;
      capabilities: string[];
    };
    jelmoliAgent: {
      name: string;
      description: string;
      capabilities: string[];
    };
  };
  
  // Chat Interface
  chat: {
    title: string;
    placeholder: string;
    send: string;
    thinking: string;
    welcomeMessage: string;
    noActiveAgents: string;
    activeAgents: string;
    
    // Chat History Toasts
    history: {
      chatUnpinned: string;
      chatPinned: string;
      chatDeleted: string;
      titleUpdated: string;
      folderCreated: string;
      chatMoved: string;
      folderColorChanged: string;
      folderRenamed: string;
      spaceDeleted: string;
      yesterday: string;
      lastWeek: string;
      lastMonth: string;
      older: string;
      deleteSpaceMessage: string;
      allChats: string;
      noChatsFound: string;
      searchPlaceholder: string;
      deleteChatTitle: string;
      deleteChatMessage: string;
      deleteSpaceTitle: string;
      delete: string;
      pin: string;
      unpin: string;
      rename: string;
      newSpace: string;
      newChat: string;
    };
    
    // Chat Interface Messages
    interface: {
      messageDeleted: string;
      messageCopied: string;
      addFiles: string;
      recordAudio: string;
      addPhotosAndFiles: string;
      takeScreenshot: string;
      takePhoto: string;
      deepResearch: string;
      createImage: string;
      screenshotInDevelopment: string;
      deepResearchInDevelopment: string;
      createImageInDevelopment: string;
      dropFilesHere: string;
      dropFilesDescription: string;
      copy: string;
      deleteAction: string;
    };
  };
  
  // Window Actions
  window: {
    minimize: string;
    maximize: string;
    restore: string;
    close: string;
    clickToRestore: string;
  };
  
  // Languages
  languages: {
    de: string;
    en: string;
    fr: string;
    'pt-br': string;
  };
  
  // Tenant Administration
  tenantAdmin: {
    title: string;
    settingsLabel: string;
    lightMode: string;
    darkMode: string;
    language: string;
    logout: string;
    version: string;
    
    // Sidebar
    sidebar: {
      tenantAdmin: string;
      dashboard: string;
      tenantSettings: string;
      userRoles: string;
      modulesFeatures: string;
      dataManagement: string;
      loggingMonitoring: string;
      supportDocs: string;
    };
    
    // Tenant Settings Subitems
    tenantSettingsSub: {
      general: string;
      compliance: string;
      euAiAct: string;
      dsgvo: string;
      responsibilities: string;
      security: string;
    };
    
    // User Management Subitems
    userManagementSub: {
      users: string;
      dsgvo: string;
      roles: string;
      departments: string;
    };
    
    // Modules Subitems
    modulesSub: {
      models: string;
      overview: string;
    };
    
    // Data Management Subitems
    dataSub: {
      backups: string;
    };
    
    // Prompts & Frameworks Subitems
    promptsSub: {
      library: string;
      frameworks: string;
    };
    
    // Monitoring Subitems
    monitoringSub: {
      activity: string;
      system: string;
      alerts: string;
    };
    
    // Support Subitems
    supportSub: {
      documentation: string;
      faq: string;
      tickets: string;
      tutorials: string;
      api: string;
      contact: string;
    };
    
    // Dashboard
    dashboard: {
      title: string;
      welcome: string;
      overview: string;
      quickStats: string;
      activeUsers: string;
      totalModels: string;
      storageUsed: string;
      apiCalls: string;
      recentActivity: string;
      systemHealth: string;
      healthy: string;
      noActivity: string;
    };
    
    // Tenant Settings
    settings: {
      title: string;
      general: {
        title: string;
        subtitle: string;
        tenantName: string;
        tenantId: string;
        description: string;
        contactEmail: string;
        timezone: string;
        saveChanges: string;
      };
      security: {
        title: string;
        subtitle: string;
        twoFactor: string;
        twoFactorDesc: string;
        sessionTimeout: string;
        minutes: string;
        ipWhitelist: string;
        ipWhitelistDesc: string;
        addIp: string;
      };
      access: {
        title: string;
        subtitle: string;
        publicAccess: string;
        publicAccessDesc: string;
        apiAccess: string;
        apiAccessDesc: string;
        corsOrigins: string;
        corsOriginsDesc: string;
        addOrigin: string;
      };
    };
    
    // User Management
    userManagement: {
      title: string;
      users: {
        title: string;
        subtitle: string;
        searchPlaceholder: string;
        addUser: string;
        newUser: string;
        name: string;
        email: string;
        role: string;
        status: string;
        lastActive: string;
        actions: string;
        active: string;
        inactive: string;
        edit: string;
        delete: string;
        source: string;
        localUser: string;
        azureAD: string;
        googleIdentity: string;
        syncUsers: string;
        allUsers: string;
        ssoUsers: string;
        inactiveUsers: string;
        neverLoggedIn: string;
        departments: string;
        selectDepartments: string;
        selected: string;
        exportCSVExcel: string;
        import: string;
        manualSync: string;
        viewSyncLogs: string;
        syncSuccess: string;
        syncSuccessDetails: string;
        accessRightsAndRoles: string;
        setUserStatus: string;
        syncFromDirectory: string;
        openInDirectory: string;
        lastLogin: string;
        roleAdmin: string;
        rolePowerUser: string;
        roleUser: string;
        roleViewer: string;
        duplicate: string;
        assignRole: string;
        assignDepartment: string;
      };
      roles: {
        title: string;
        subtitle: string;
        addRole: string;
        roleName: string;
        permissions: string;
        users: string;
        created: string;
        actions: string;
        edit: string;
        delete: string;
        adminRights: string;
        basicPermissions: string;
        dataRights: string;
        roleManagement: string;
        roleManagementDesc: string;
      };
      departments: {
        title: string;
        subtitle: string;
        department: string;
        promptCategories: string;
        newDepartment: string;
        editDepartment: string;
        departmentName: string;
        editDepartmentDesc: string;
        selectOrCreateDepartment: string;
        createNewDepartment: string;
        enterDepartmentName: string;
        deleteDepartmentTitle: string;
        deleteDepartmentDesc: string;
        assignDepartmentTitle: string;
        assignDepartmentDesc: string;
        selectDepartment: string;
        renameDepartmentTitle: string;
        renameDepartmentDesc: string;
        newDepartmentName: string;
        noDepartmentAssigned: string;
        assignUsers: string;
        allUsers: string;
        assignCategories: string;
        allCategories: string;
        save: string;
        cancel: string;
        create: string;
        select: string;
        rename: string;
        active: string;
        inactive: string;
        all: string;
        // Dialog-specific
        assignPromptCategory: string;
        promptCategory: string;
        categoriesSelected: string;
        usersSelected: string;
        users: string;
        searchUsers: string;
        status: string;
        edit: string;
        duplicate: string;
        delete: string;
        // Table
        managementTitle: string;
        actions: string;
        categories: string;
        noUsersAssigned: string;
        newDepartmentTooltip: string;
      };
      promptCategories: {
        addNewCategory: string;
        addNewCategoryDesc: string;
        categoryName: string;
        renameCategory: string;
        renameCategoryDesc: string;
        newCategoryName: string;
        add: string;
      };
    };
    
    // Data Management
    dataManagement: {
      title: string;
      backups: {
        title: string;
        subtitle: string;
        createBackup: string;
        backupName: string;
        size: string;
        created: string;
        status: string;
        actions: string;
        restore: string;
        download: string;
        delete: string;
        completed: string;
        inProgress: string;
        failed: string;
        autoBackup: string;
        autoBackupDesc: string;
        backupFrequency: string;
        daily: string;
        weekly: string;
        monthly: string;
      };
    };
    
    // Monitoring
    monitoring: {
      activity: {
        title: string;
        subtitle: string;
        filterByUser: string;
        filterByAction: string;
        allUsers: string;
        allActions: string;
        timestamp: string;
        user: string;
        action: string;
        details: string;
        ipAddress: string;
      };
      system: {
        title: string;
        subtitle: string;
        cpuUsage: string;
        memoryUsage: string;
        diskUsage: string;
        networkTraffic: string;
        uptime: string;
        lastRestart: string;
        systemHealth: string;
        healthy: string;
        warning: string;
        critical: string;
      };
      alerts: {
        title: string;
        subtitle: string;
        createAlert: string;
        alertName: string;
        type: string;
        severity: string;
        status: string;
        created: string;
        actions: string;
        edit: string;
        delete: string;
        active: string;
        inactive: string;
        high: string;
        medium: string;
        low: string;
      };
    };
    
    // Support & Documentation
    support: {
      title: string;
      overview: {
        title: string;
        welcome: string;
        description: string;
        gettingStarted: string;
        gettingStartedDesc: string;
        documentation: string;
        documentationDesc: string;
        support: string;
        supportDesc: string;
        updates: string;
        updatesDesc: string;
      };
      documentation: {
        title: string;
        search: string;
        categories: string;
        gettingStarted: string;
        userGuide: string;
        adminGuide: string;
        apiDocs: string;
        troubleshooting: string;
      };
      faq: {
        title: string;
        search: string;
        categories: string;
        general: string;
        technical: string;
        billing: string;
        security: string;
      };
      tickets: {
        title: string;
        createTicket: string;
        ticketNumber: string;
        subject: string;
        status: string;
        priority: string;
        created: string;
        actions: string;
        open: string;
        inProgress: string;
        resolved: string;
        closed: string;
        view: string;
      };
      contact: {
        title: string;
        description: string;
        email: string;
        phone: string;
        availability: string;
        emergencySupport: string;
        sendMessage: string;
        name: string;
        emailLabel: string;
        message: string;
        submit: string;
      };
    };
    
    // Support Documentation (Full component labels)
    supportDocumentation: {
      title: string;
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
      documentation: {
        searchTitle: string;
        searchDescription: string;
        searchPlaceholder: string;
        learnMore: string;
        noDocsFound: string;
        downloads: string;
        downloadsDescription: string;
        userManual: string;
        adminGuide: string;
        apiDocs: string;
        download: string;
        items: {
          gettingStarted: { title: string; description: string; category: string };
          userRoleManagement: { title: string; description: string; category: string };
          agentConfiguration: { title: string; description: string; category: string };
          backupRecovery: { title: string; description: string; category: string };
          securityCompliance: { title: string; description: string; category: string };
          apiDocumentation: { title: string; description: string; category: string };
          monitoringLogging: { title: string; description: string; category: string };
          troubleshooting: { title: string; description: string; category: string };
        };
      };
      faq: {
        title: string;
        description: string;
        needMoreHelp: string;
        needMoreHelpDesc: string;
        management: string;
        managementDesc: string;
        createNew: string;
        editFaq: string;
        panelCreateTitle: string;
        panelEditTitle: string;
        questionLabel: string;
        categoryLabel: string;
        answerLabel: string;
        tips: string;
        tip1: string;
        tip2: string;
        tip3: string;
        tip4: string;
        minCharsRecommended: string;
        createButton: string;
        saveChanges: string;
        successCreated: string;
        successUpdated: string;
        changesSaved: string;
        categories: {
          general: string;
          technical: string;
          billing: string;
          security: string;
          setup: string;
          troubleshooting: string;
        };
      };
      tickets: {
        createTitle: string;
        createDescription: string;
        yourTicketsTitle: string;
        yourTicketsDescription: string;
        subjectLabel: string;
        priorityLabel: string;
        messageLabel: string;
        submitButton: string;
        noTickets: string;
        created: string;
        updated: string;
        successTitle: string;
        confirmationEmail: string;
      };
      tutorials: {
        title: string;
        description: string;
        duration: string;
        items: {
          gettingStarted: { title: string; description: string; duration: string };
          userRoleManagement: { title: string; description: string; duration: string };
          modelConfiguration: { title: string; description: string; duration: string };
          agentSetup: { title: string; description: string; duration: string };
          backupRecovery: { title: string; description: string; duration: string };
          monitoringAlerts: { title: string; description: string; duration: string };
        };
      };
      api: {
        title: string;
        description: string;
        authentication: string;
        baseUrl: string;
        endpoints: string;
        endpointGetAgents: string;
        endpointPostAgentExecute: string;
        endpointGetModels: string;
        endpointGetUsers: string;
        endpointPostBackup: string;
        downloadFullDocs: string;
        codeExamples: string;
        codeExamplesDescription: string;
      };
      contact: {
        supportTitle: string;
        supportDescription: string;
        emailSupport: string;
        phoneSupport: string;
        emergencyHotline: string;
        responseTime: string;
        availability: string;
        salesTitle: string;
        salesDescription: string;
        sales: string;
        partnerships: string;
        companyTitle: string;
        companyDescription: string;
        companyInfo: string;
        headquarters: string;
        emergencyOnly: string;
        mondayFriday: string;
      };
    };
    
    // Models
    models: {
      title: string;
      subtitle: string;
      addModel: string;
      modelName: string;
      provider: string;
      version: string;
      status: string;
      lastUsed: string;
      actions: string;
      active: string;
      inactive: string;
      configure: string;
      delete: string;
      edit: string;
      cancel: string;
      save: string;
      deleteConfirm: string;
      deleteMessage: string;
      // Dialog
      editModel: string;
      basicInfo: string;
      modelNameLabel: string;
      modelNameHelp: string;
      providerLabel: string;
      modelIdLabel: string;
      modelIdHelp: string;
      apiConfiguration: string;
      apiKeyInfo: string;
      apiKeyLabel: string;
      notes: string;
      notesPlaceholder: string;
    };
    
    // Module Overview
    moduleOverview: {
      title: string;
      subtitle: string;
      moduleName: string;
      status: string;
      version: string;
      users: string;
      actions: string;
      enabled: string;
      disabled: string;
      configure: string;
      disable: string;
      enable: string;
      // Extended
      newAgent: string;
      editAgent: string;
      agentName: string;
      agentDescription: string;
      agentType: string;
      agentCapabilities: string;
      addCapability: string;
      removeCapability: string;
      capabilityPlaceholder: string;
      saveAgent: string;
    };
    
    // Prompts & Frameworks
    promptsFrameworks: {
      // Tabs/Headers
      promptLibrary: string;
      frameworks: string;
      
      // Actions
      edit: string;
      duplicate: string;
      createNew: string;
      delete: string;
      
      // Labels
      promptLabel: string;
      structureLabel: string;
      title: string;
      description: string;
      category: string;
      
      // Counts
      promptsCount: string;
      frameworksCount: string;
      
      // Headers
      promptCategories: string;
      promptCategoriesDescription: string;
      frameworkCategories: string;
      frameworkCategoriesDescription: string;
      
      // Search
      searchPlaceholder: string;
      noCategoriesFound: string;
      
      // Edit Panel
      editPrompt: string;
      editFramework: string;
      duplicatePrompt: string;
      duplicateFramework: string;
      createNewPrompt: string;
      createNewFramework: string;
      
      // Form Fields
      titleLabel: string;
      titlePlaceholder: string;
      frameworkTitlePlaceholder: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      frameworkDescriptionPlaceholder: string;
      promptPlaceholder: string;
      frameworkPlaceholder: string;
      promptContentLabel: string;
      frameworkContentLabel: string;
      
      // Buttons
      saveButton: string;
      cancelButton: string;
      
      // Delete Dialog
      deletePromptTitle: string;
      deleteFrameworkTitle: string;
      deletePromptMessage: string;
      deleteFrameworkMessage: string;
      confirmDelete: string;
      
      // Copy suffix
      copySuffix: string;
      
      // Category Names
      categoryNames: {
        market: string;
        planning: string;
        strategy: string;
        sales: string;
        service: string;
        finance: string;
        hr: string;
        learning: string;
        organization: string;
        coaching: string;
        promptEngineering: string;
        quality: string;
        criticalAnalysis: string;
        mission: string;
        thinking: string;
        expression: string;
        interaction: string;
      };
      
      // Category Descriptions
      categoryDescriptions: {
        market: string;
        planning: string;
        strategy: string;
        sales: string;
        service: string;
        finance: string;
        hr: string;
        learning: string;
        organization: string;
        coaching: string;
        promptEngineering: string;
        quality: string;
        criticalAnalysis: string;
        mission: string;
        thinking: string;
        expression: string;
        interaction: string;
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
      searchUsers: string;
      allUsers: string;
      selectAll: string;
      deselectAll: string;
      saveRole: string;
      deleteRole: string;
      subtitle: string;
      basicInfo: string;
      roleNameLabel: string;
      roleNamePlaceholder: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      usersLabel: string;
      users: string;
      noUsersAssigned: string;
      permissionsLabel: string;
      selectNone: string;
      basicPermissions: string;
      adminRights: string;
      dataRights: string;
      permCreate: string;
      permRead: string;
      permUpdate: string;
      permDelete: string;
      permManageUsers: string;
      permManageSettings: string;
      permManageRoles: string;
      permViewReports: string;
      permExportData: string;
      permImportData: string;
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
      editUser: string;
      newUser: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      position: string;
      hireDate: string;
      selectRole: string;
      selectStatus: string;
      saveUser: string;
    };
    
    // Model Management Extended
    modelManagementExtended: {
      newModel: string;
      editModel: string;
      modelType: string;
      apiKey: string;
      endpoint: string;
      maxTokens: string;
      temperature: string;
      topP: string;
      saveModel: string;
      testModel: string;
      title: string;
      configuredModels: string;
      modelsCount: string;
      model: string;
      modelId: string;
      sort: string;
      lastTested: string;
      usedBy: string;
      actions: string;
      noModelsFound: string;
      addNewModel: string;
      modelName: string;
      modelNameRequired: string;
      modelIdRequired: string;
      modelIdDescription: string;
      lastTest: string;
      never: string;
      deleteConfirm: string;
      deleteConfirmMessage: string;
    };
    
    // Alerts Extended
    alertsExtended: {
      newAlert: string;
      editAlert: string;
      alertType: string;
      alertMessage: string;
      alertThreshold: string;
      alertRecipients: string;
      addRecipient: string;
      emailNotification: string;
      smsNotification: string;
      saveAlert: string;
    };
    
    // Support Extended
    supportExtended: {
      manageFAQ: string;
      newFAQ: string;
      editFAQ: string;
      faqQuestion: string;
      faqAnswer: string;
      faqCategory: string;
      saveFAQ: string;
      deleteFAQ: string;
      ticketSuccess: string;
      ticketSubmitted: string;
      ticketNumber: string;
      backToSupport: string;
      viewTicket: string;
    };
    
    // Activity Log
    activityLog: {
      actions: {
        backupCreated: string;
        userCreated: string;
        loginFailed: string;
        configChanged: string;
        autoBackup: string;
        roleAssigned: string;
        dbConnectionFailed: string;
        healthCheck: string;
      };
      resources: {
        userManagement: string;
        authentication: string;
        normenAgent: string;
        userAnalyticsDB: string;
        agentConfigDB: string;
        system: string;
        aiHubMainDB: string;
      };
      details: {
        invalidPassword: string;
      };
      ui: {
        title: string;
        description: string;
        searchPlaceholder: string;
        filterByStatus: string;
        allStatuses: string;
        success: string;
        warning: string;
        error: string;
        info: string;
        warnings: string;
        errors: string;
        information: string;
        exportLogs: string;
        clearFilters: string;
        activitiesCount: string;
        chronologicalListing: string;
        export: string;
        timestamp: string;
        user: string;
        action: string;
        resource: string;
        status: string;
        ip: string;
        details: string;
        sort: string;
        resetFilters: string;
        successful: string;
        ipAddress: string;
      };
    };
    
    // Dashboard Extended
    dashboardExtended: {
      stats: {
        activeModules: string;
        processedToday: string;
        avgResponseTime: string;
        systemLoad: string;
        requests: string;
        seconds: string;
        cpu: string;
      };
      modules: {
        chatAgent: string;
        documentAnalyzer: string;
        calendarAssistant: string;
        dataAnalyst: string;
        securityMonitor: string;
      };
      ui: {
        welcomeBack: string;
        overviewText: string;
        recentActivity: string;
        recentActivityDesc: string;
        systemStatus: string;
        systemStatusDesc: string;
        viewAllActivities: string;
        detailedMetrics: string;
        quickActions: string;
        quickActionsDesc: string;
        newChat: string;
        configureAI: string;
        manageModules: string;
        settings: string;
        statusActive: string;
        statusWarning: string;
        statusError: string;
      };
      // TenantDashboard specific
      cards: {
        users: string;
        modules: string;
        agents: string;
        apiCalls: string;
        active: string;
        inactive: string;
        moreAvailable: string;
        thisMonth: string;
      };
      quickStats: {
        uptime: string;
        activeSessions: string;
        regions: string;
      };
      systemMessages: {
        planExpiring: string;
        newVersionAvailable: string;
      };
      activities: {
        newUserCreated: string;
        backupCompleted: string;
        roleUpdated: string;
        apiRateLimitReached: string;
        moduleActivated: string;
        chatAgentActivated: string;
        requestsProcessed: string;
        temperatureChanged: string;
        timeAgo: {
          minutes: string;
          hour: string;
          hours: string;
        };
      };
      notifications: {
        userLoggedIn: string;
      };
    };
    
    // Data Management Extended
    dataManagementExtended: {
      backups: {
        scheduledBackup: string;
        manualBackup: string;
        allDatabases: string;
      };
    };
    
    // Alerts Management
    alertsManagement: {
      title: string;
      stats: {
        activeAlerts: string;
        unacknowledged: string;
        triggers24h: string;
        totalAlerts: string;
      };
      notifications: {
        title: string;
        subtitle: string;
        acknowledge: string;
      };
      rules: {
        title: string;
        subtitle: string;
        searchPlaceholder: string;
      };
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
        status: string;
        lastTriggered: string;
        actions: string;
        sort: string;
      };
      status: {
        active: string;
        inactive: string;
      };
      channels: {
        email: string;
        slack: string;
      };
      actions: {
        edit: string;
        duplicate: string;
        delete: string;
      };
      createPanel: {
        titleNew: string;
        titleEdit: string;
        subtitleNew: string;
        subtitleEdit: string;
        nameLabel: string;
        namePlaceholder: string;
        typeLabel: string;
        conditionLabel: string;
        conditionPlaceholder: string;
        thresholdLabel: string;
        thresholdPlaceholder: string;
        channelsLabel: string;
        buttonSave: string;
        buttonCancel: string;
        buttonCreate: string;
      };
      deleteDialog: {
        title: string;
        message: string;
        confirm: string;
        cancel: string;
      };
    };
    
    // Account Extended
    accountExtended: {
      displayNamePlaceholder: string;
    };
    
    // System Monitoring Extended
    systemMonitoringExtended: {
      title: string;
      serviceStatus: string;
      servicesOnline: string;
      servicesOf: string;
      degraded: string;
      online: string;
      offline: string;
      restricted: string;
      uptime: string;
      responseTime: string;
      resourceUsage24h: string;
      resourceUsageSubtitle: string;
      apiRequests24h: string;
      apiRequestsSubtitle: string;
      network: string;
      totalApiCalls: string;
      vsYesterday: string;
      avgResponseTime: string;
      systemUptime: string;
      days: string;
      hours: string;
      requests: string;
      services: {
        aiHubAPI: string;
        emailAgent: string;
        normenAgent: string;
        internetAgent: string;
        jelmoliAgent: string;
        databaseCluster: string;
        authenticationService: string;
        fileStorage: string;
      };
    };
    
    // Analytics Dashboard
    analyticsDashboard: {
      title: string;
      subtitle: string;
      timeRanges: {
        last7days: string;
        last30days: string;
        last90days: string;
        lastYear: string;
      };
      export: string;
      metrics: {
        totalUsers: string;
        activeUsers: string;
        totalLogins: string;
        avgSession: string;
        newThisMonth: string;
        ofTotal: string;
        thisPeriod: string;
        perUserSession: string;
      };
      tabs: {
        overview: string;
        users: string;
        activity: string;
        distribution: string;
      };
      charts: {
        userGrowthTrend: string;
        userGrowthSubtitle: string;
        loginActivity: string;
        loginActivitySubtitle: string;
        roleDistribution: string;
        roleDistributionSubtitle: string;
        departmentActivity: string;
        departmentActivitySubtitle: string;
        userGrowthOverTime: string;
        systemActivity: string;
        rolesBreakdown: string;
        departmentsOverview: string;
        totalUsers: string;
        activeUsers: string;
        logins: string;
        actions: string;
      };
    };
    
    // Activity Log Extended
    activityLogExtended: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      filters: {
        allTypes: string;
        allLevels: string;
        userActions: string;
        roleActions: string;
        permissions: string;
        settings: string;
        data: string;
        loginLogout: string;
      };
      severity: {
        success: string;
        info: string;
        warning: string;
        error: string;
      };
      noActivities: string;
      detailsSheet: {
        title: string;
        subtitle: string;
        action: string;
        performedBy: string;
        timestamp: string;
        target: string;
        severity: string;
        details: string;
        technicalInfo: string;
        ipAddress: string;
        activityId: string;
      };
      actions: {
        userCreated: string;
        userUpdated: string;
        userDeleted: string;
        userActivated: string;
        userDeactivated: string;
        roleCreated: string;
        roleUpdated: string;
        roleDeleted: string;
        permissionChanged: string;
        settingsUpdated: string;
        dataExported: string;
        dataImported: string;
        loginSuccess: string;
        loginFailed: string;
        logout: string;
      };
    };
    
    // Notification Center
    notificationCenter: {
      title: string;
      subtitle: string;
      unreadNotifications: string;
      markAllAsRead: string;
      clearAll: string;
      noNotifications: string;
      tabs: {
        all: string;
        messages: string;
        mentions: string;
        system: string;
      };
      types: {
        info: string;
        success: string;
        warning: string;
        error: string;
        message: string;
        mention: string;
        system: string;
      };
      actions: {
        markAsRead: string;
        markAsUnread: string;
        delete: string;
      };
      timeAgo: {
        justNow: string;
        minutesAgo: string;
        hoursAgo: string;
        daysAgo: string;
      };
    };
    
    // Login Extended
    loginExtended: {
      logoAlt: string;
      tenants: {
        rmbGroup: string;
        neuco: string;
      };
    };
    
    // Dashboard Extended - Full
    dashboardFull: {
      stats: {
        activeModules: string;
        processedToday: string;
      };
      modules: {
        chatAgent: string;
        documentAnalyzer: string;
        calendarAssistant: string;
        dataAnalyst: string;
        securityMonitor: string;
      };
    };
    
    // Model Management Extended - Full
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
    };
    
    // Placeholders
    placeholders: {
      systemPrompt: string;
      searchDots: string;
      spaceName: string;
      email: string;
      phone: string;
      jobTitle: string;
      department: string;
      modelName: string;
      selectProvider: string;
      modelId: string;
      apiKey: string;
      endpoint: string;
      notes: string;
      agentName: string;
      agentDescription: string;
      version: string;
      agentEndpoint: string;
      storageUrl: string;
      storageToken: string;
      agentApiKey: string;
      searchDocumentation: string;
      ticketSubject: string;
      ticketMessage: string;
      faqQuestion: string;
      faqAnswer: string;
      passwordMinLength: string;
    };
    
    // Module Overview Extended - Full
    moduleOverviewFull: {
      notConfigured: string;
      selectModel: string;
      orchestratorDiagram: string;
      statsModulesTotal: string;
      statsActive: string;
      statsInactive: string;
      statsError: string;
      title: string;
      addModule: string;
      orchestratorTitle: string;
      orchestratorDescription: string;
      orchestratorQuery: string;
      llmConfiguration: string;
      llm1: string;
      llm2: string;
      prompt: string;
      edit: string;
      agentsTitle: string;
      agentConfiguration: string;
      apiEndpoint: string;
      apiKey: string;
      testConnection: string;
      testing: string;
      storage: string;
      storageAccessUrl: string;
      storageToken: string;
      delete: string;
      save: string;
      cancel: string;
      deleteConfirmTitle: string;
      deleteConfirmDescription: string;
      version: string;
      lastSync: string;
      category: string;
      public: string;
      private: string;
      riskCategory: string;
      low: string;
      high: string;
      icon: string;
      agentName: string;
      description: string;
      apiKeysEncrypted: string;
      deleteAgent: string;
      deleteAgentConfirmation: string;
      addNewAgent: string;
      basicInformation: string;
      addAgent: string;
      agents: {
        jelmoliAgent: string;
        emailAgent: string;
        internetAgent: string;
        normenAgent: string;
      };
      agentDescriptions: {
        emailAgent: string;
        internetAgent: string;
        jelmoliAgent: string;
        normenAgent: string;
      };
      prompts: {
        orchestrator1: string;
        orchestrator2: string;
      };
      models: {
        geminiPro: string;
        azureGPT4: string;
      };
    };
    
    // Orchestrator Extended
    orchestratorExtended: {
      selectModel: string;
    };
    
    // Alerts Management Extended - Sample Data
    alertsSampleData: {
      serviceOffline: string;
      backupFailed: string;
      unusualTraffic: string;
      backupFailedMessage: string;
    };
    
    // Data Management Extended - Full
    dataManagementFull: {
      scheduledBackup: string;
      manualBackup: string;
      allDatabases: string;
    };
    
    // Chat Sample Data
    chatSampleData: {
      productInquiryJelmoli: string;
      productAvailability: string;
    };
    
    // Role Management Permissions
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
    };
    
    // Chat Extended
    chatExtended: {
      filesAttached: string;
      detailedResponseFrom: string;
      detailedResponseContent: string;
      basedOnAnalysis: string;
      orchestratorSummary: string;
      forDetailedInfo: string;
      filesAdded: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  de: {
    // Common
    save: 'Speichern',
    cancel: 'Abbrechen',
    close: 'Schließen',
    open: 'Öffnen',
    settings: 'Einstellungen',
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolgreich',
    warning: 'Warnung',
    
    // Login
    login: {
      title: 'AI Hub Anmeldung',
      subtitle: 'Melden Sie sich an, um auf die AI-Module zuzugreifen',
      username: 'Benutzername',
      password: 'Passwort',
      loginButton: 'Anmelden',
      forgotPassword: 'Passwort vergessen?',
      invalidCredentials: 'Ungültige Anmeldedaten',
      welcomeBack: 'Willkommen zurück!',
      // 2FA
      twoFactorTitle: 'Zwei-Faktor-Authentifizierung',
      twoFactorSubtitle: 'Geben Sie den 6-stelligen Code ein',
      twoFactorAuthDescription: 'Bitte geben Sie den 6-stelligen Code aus Ihrer Authenticator-App ein',
      codeLabel: 'Verifikationscode',
      codePlaceholder: '000000',
      verifyButton: 'Code verifizieren',
      invalidCode: 'Ungültiger Code',
      resendCode: 'Code erneut senden',
      confirmButton: 'Bestätigen',
      // Login form fields
      selectTenantLabel: 'Tenant auswählen',
      selectTenantPlaceholder: 'Wählen Sie einen Tenant',
      passwordPlaceholder: 'Passwort',
      versionLabel: 'Version',
      desktopLabel: 'Desktop',
      mobileLabel: 'Mobile',
      copyright: '© 2025. Alle Rechte vorbehalten.',
      // Error messages
      errorSelectTenant: 'Bitte wählen Sie einen Tenant aus',
      errorPasswordEmpty: 'Passwort darf nicht leer sein',
      errorPasswordTooShort: 'Passwort muss mindestens 4 Zeichen lang sein',
      errorInvalidPassword: 'Ungültiges Passwort. Verwenden Sie: password, 1234, test oder demo',
      errorCode6Digits: 'Bitte geben Sie einen 6-stelligen Code ein',
      errorInvalidCode: 'Ungültiger Code. Verwenden Sie: 123456, 000000 oder 111111',
      // Demo hints
      demoCodeHint: 'Tipp: Verwenden Sie 123456, 000000 oder 111111 für Demo'
    },
    
    // Header
    header: {
      aiHub: 'AI Hub',
      chat: 'Chat',
      options: 'Optionen',
      logout: 'Abmelden',
      welcomeMessage: 'Willkommen',
      tenantAdministrator: 'Tenant-Administrator',
      tagline: 'own your data'
    },
    
    // Admin Menus
    admin: {
      tenant: {
        title: 'Tenant',
        selectTenant: 'Auswahl Tenant',
        agentAssignment: 'Agentzuteilung',
        api: 'API',
        permissions: 'Berechtigungen'
      },
      profile: {
        title: 'Profil',
        account: 'Konto',
        logout: 'Abmelden'
      }
    },
    
    // Account Panel
    accountPanel: {
      title: 'Konto Einstellungen',
      language: 'Sprache',
      design: 'Design',
      logout: 'Sitzung beenden',
      darkModeTitle: 'Dunkles Design',
      darkModeDescription: 'Aktiviert den Dunkelmodus für die gesamte Anwendung',
      logoutDescription: 'Melden Sie sich von Ihrem Konto ab',
      logoutButton: 'Abmelden'
    },
    
    // Account Settings
    account: {
      title: 'Konto-Einstellungen',
      subtitle: 'Verwalten Sie Ihr Profil und Ihre Einstellungen',
      profilePicture: 'Profilbild',
      profilePictureDescription: 'Laden Sie ein Profilbild hoch oder ändern Sie das bestehende',
      uploadImage: 'Bild hochladen',
      removeImage: 'Bild entfernen',
      changePassword: 'Passwort ändern',
      currentPassword: 'Aktuelles Passwort',
      newPassword: 'Neues Passwort',
      confirmPassword: 'Passwort bestätigen',
      updatePassword: 'Passwort aktualisieren',
      passwordMismatch: 'Passwörter stimmen nicht überein',
      passwordUpdated: 'Passwort erfolgreich aktualisiert',
      languageSection: 'Sprache',
      languageDescription: 'Wählen Sie Ihre bevorzugte Sprache',
      themeSection: 'Design',
      themeDescription: 'Wählen Sie zwischen hellem und dunklem Design',
      personalInfo: 'Persönliche Informationen',
      personalInfoDescription: 'Ihre Kontodaten und Benutzerinformationen',
      username: 'Benutzername',
      email: 'E-Mail',
      role: 'Rolle',
      saveChanges: 'Änderungen speichern',
      // New additions for AccountSettings
      displayName: 'Anzeigename',
      phoneNumber: 'Telefonnummer',
      jobTitle: 'Jobtitel',
      department: 'Abteilung',
      emailPlaceholder: 'ihre.email@company.com',
      phoneNumberPlaceholder: '+41 XX XXX XX XX',
      jobTitlePlaceholder: 'z.B. Software Entwickler',
      departmentPlaceholder: 'z.B. IT, Marketing, Sales',
      imageTooLarge: 'Bild zu groß. Maximal 5MB erlaubt.',
      passwordTooShort: 'Passwort muss mindestens 6 Zeichen lang sein',
      endSession: 'Sitzung beenden',
      endSessionDescription: 'Melden Sie sich von Ihrem Konto ab und kehren zur Anmeldung zurück',
      logoutNow: 'Jetzt abmelden',
      administrator: 'Administrator',
      user: 'Benutzer'
    },
    
    // Mobile Layout
    mobileLayout: {
      chatDescription: 'Chat-Schnittstelle zur Interaktion mit AI-Agenten',
      optionsDescription: 'Agent-Einstellungen und Konfiguration',
      accountDescription: 'Benutzerkontoeinstellungen und Profilverwaltung'
    },
    
    // Agent Settings
    agentSettings: {
      title: 'Orchestrator Einstellungen',
      subtitle: 'Konfigurieren Sie Agents und AI-Verhalten',
      availableAgents: 'Verfügbare Agents',
      agentDescription: 'Übersicht aller verfügbaren AI-Agents und deren Funktionen',
      active: 'Aktiv',
      available: 'Verfügbar',
      private: 'Privat',
      public: 'Öffentlich',
      activated: 'Aktiviert',
      deactivated: 'Deaktiviert',
      
      // Theme Settings
      themeSettings: 'Design-Einstellungen',
      themeDescription: 'Wählen Sie zwischen hellem und dunklem Design',
      darkMode: 'Dunkles Design',
      darkModeDescription: 'Aktiviert den Dunkelmodus für die gesamte Anwendung',
      
      // Language Settings
      languageSettings: 'Sprach-Einstellungen',
      languageDescription: 'Wählen Sie die gewünschte Sprache für AI-Antworten',
      language: 'Sprache',
      
      // Custom Prompt
      customPrompt: 'System-Prompt Zusatz',
      customPromptDescription: 'Dieser Text wird bei jeder Anfrage als Kontext mitgegeben',
      customPromptLabel: 'Zusätzlicher Prompt',
      customPromptPlaceholder: 'z.B. "Antworte immer im Stil eines Experten für..." oder "Berücksichtige immer folgende Unternehmensrichtlinien..."',
      customPromptTip: 'Tipp: Verwenden Sie spezifische Anweisungen um die AI-Antworten an Ihre Bedürfnisse anzupassen.',
      
      // Response Settings
      responseSettings: 'Antwort-Konfiguration',
      responseDescription: 'Bestimmen Sie Art und Stil der AI-Antworten',
      responseLength: 'Antwortlänge',
      responseTone: 'Antwort-Ton',
      creativity: 'Kreativität (Temperatur)',
      creativityDescription: 'Höhere Werte = kreativer, niedrigere = fokussierter',
      conservative: 'Konservativ',
      creative: 'Kreativ',
      preciseLabel: 'Sehr präzise',
      balancedLabel: 'Ausgewogen',
      creativeLabel: 'Sehr kreativ',
      
      // Response Length Options
      short: 'Kurz & Präzise',
      medium: 'Standard',
      long: 'Ausführlich',
      comprehensive: 'Sehr detailliert',
      
      // Response Tone Options
      professional: 'Professionell',
      casual: 'Locker',
      friendly: 'Freundlich',
      formal: 'Formal',
      expert: 'Expertenebene'
    },
    
    // Orchestrator Panel
    orchestratorPanel: {
      configureSettings: 'Konfigurieren Sie die Einstellungen für die AI-Antwortgenerierung',
      active: 'Aktiv',
      inactive: 'Inaktiv',
      start: 'Starten',
      stop: 'Stoppen',
      modelConfig: 'Modell-Konfiguration',
      modelConfigDescription: 'Wählen Sie das AI-Modell und grundlegende Parameter',
      aiModel: 'AI-Modell',
      maxTokens: 'Maximale Tokens',
      streamingEnabled: 'Streaming aktiviert',
      advancedParams: 'Erweiterte Parameter',
      advancedParamsDescription: 'Feinabstimmung der AI-Antwortgenerierung',
      temperature: 'Temperatur',
      topP: 'Top-P',
      frequencyPenalty: 'Frequency Penalty',
      presencePenalty: 'Presence Penalty',
      systemPrompt: 'System Prompt',
      systemPromptDescription: 'Definieren Sie das Verhalten und die Persönlichkeit der AI',
      systemPromptPlaceholder: 'Geben Sie hier den System Prompt ein...',
      reset: 'Zurücksetzen'
    },
    
    // Agents
    agents: {
      emailAgent: {
        name: 'Email-Agent',
        description: 'Verfasst und verwaltet E-Mail-Korrespondenz in professioneller Qualität.',
        capabilities: ['E-Mail Verfassen', 'Terminplanung', 'Follow-ups']
      },
      normenAgent: {
        name: 'Normen-Agent',
        description: 'Spezialisiert auf Standards, Normen und Compliance-Anforderungen.',
        capabilities: ['ISO Standards', 'Compliance', 'Normprüfung']
      },
      internetAgent: {
        name: 'Internet-Agent',
        description: 'Recherchiert aktuelle Informationen aus dem Internet und Webquellen.',
        capabilities: ['Web-Recherche', 'Aktuelle Daten', 'Faktencheck']
      },
      jelmoliAgent: {
        name: 'Jelmoli-Agent',
        description: 'Unternehmensspezifischer Agent für Jelmoli-interne Prozesse und Informationen.',
        capabilities: ['Firmen-Infos', 'Interne Prozesse', 'Produktdaten']
      }
    },
    
    // Chat Interface
    chat: {
      title: 'Orchestrator Chat',
      placeholder: 'Geben Sie Ihre Nachricht ein...',
      send: 'Senden',
      thinking: 'Denkt nach...',
      welcomeMessage: 'Hallo! Ich bin Ihr AI-Orchestrator. Wie kann ich Ihnen heute helfen?',
      noActiveAgents: 'Keine Agents aktiviert',
      activeAgents: 'Aktive Agents',
      
      history: {
        chatUnpinned: 'Chat entfernt',
        chatPinned: 'Chat angepinnt',
        chatDeleted: 'Chat gelöscht',
        titleUpdated: 'Titel aktualisiert',
        folderCreated: 'Ordner erstellt',
        chatMoved: 'Chat verschoben',
        folderColorChanged: 'Ordnerfarbe geändert',
        folderRenamed: 'Ordner umbenannt',
        spaceDeleted: 'Space gelöscht',
        yesterday: 'Gestern',
        lastWeek: 'Letzte Woche',
        lastMonth: 'Letzter Monat',
        older: 'Älter',
        deleteSpaceMessage: 'Möchten Sie diesen Space wirklich löschen? Die Chats in diesem Space werden in "Alle Chats" verschoben. Diese Aktion kann nicht rückgängig gemacht werden.',
        allChats: 'Alle Chats',
        noChatsFound: 'Keine Chats gefunden',
        searchPlaceholder: 'Suchen...',
        deleteChatTitle: 'Chat löschen',
        deleteChatMessage: 'Möchten Sie diesen Chat wirklich löschen?',
        deleteSpaceTitle: 'Space löschen',
        delete: 'Löschen',
        pin: 'Anpinnen',
        unpin: 'Entpinnen',
        rename: 'Umbenennen',
        newSpace: 'Neuer Space',
        newChat: 'Neuer Chat',
        cancel: 'Abbrechen',
        renameAction: 'Umbenennen',
        cannotUndo: 'Diese Aktion kann nicht rückgängig gemacht werden.',
        search: 'Suche',
        unpinAction: 'Lösen',
        pinAction: 'Anpinnen',
        collapse: 'Einklappen'
      },
      
      interface: {
        messageDeleted: 'Nachricht gelöscht',
        messageCopied: 'Nachricht kopiert',
        addFiles: 'Dateien hinzufügen',
        recordAudio: 'Audio aufnehmen',
        addPhotosAndFiles: 'Fotos und Dateien hinzufügen',
        takeScreenshot: 'Screenshot machen',
        takePhoto: 'Foto aufnehmen',
        deepResearch: 'Deep Research',
        createImage: 'Bild erstellen',
        screenshotInDevelopment: 'Screenshot-Funktion in Entwicklung',
        deepResearchInDevelopment: 'Deep Research in Entwicklung',
        createImageInDevelopment: 'Bild erstellen in Entwicklung',
        dropFilesHere: 'Dateien hier ablegen',
        dropFilesDescription: 'PDFs, Bilder und andere Dateien',
        copy: 'Kopieren',
        deleteAction: 'Löschen'
      }
    },
    
    // Window Actions
    window: {
      minimize: 'Minimieren',
      maximize: 'Maximieren',
      restore: 'Wiederherstellen',
      close: 'Schließen',
      clickToRestore: 'Klicken zum Wiederherstellen'
    },
    
    // Languages
    languages: {
      de: 'Deutsch',
      en: 'English',
      fr: 'Français',
      'pt-br': 'Português (Brasil)'
    },
    
    // Tenant Administration
    tenantAdmin: {
      title: 'AI Hub Tenant-Administration',
      settingsLabel: 'Einstellungen',
      lightMode: 'Helles Design',
      darkMode: 'Dunkles Design',
      language: 'Sprache',
      logout: 'Abmelden',
      version: 'AI Hub v2.4.1',
      
      sidebar: {
        tenantAdmin: 'Tenant Admin',
        dashboard: 'Dashboard',
        tenantSettings: 'Tenant-Einstellungen',
        userRoles: 'Benutzer & Rollen',
        modulesFeatures: 'Module & Features',
        dataManagement: 'Datenverwaltung',
        promptsFrameworks: 'Prompts & Frameworks',
        loggingMonitoring: 'Logging & Monitoring',
        supportDocs: 'Support & Dokumentation',
      },
      
      tenantSettingsSub: {
        general: 'Allgemeine Informationen',
        compliance: 'Compliance',
        euAiAct: 'EU AI Act',
        dsgvo: 'DSGVO',
        responsibilities: 'Verantwortlichkeiten',
        security: 'Sicherheit',
      },
      
      userManagementSub: {
        users: 'Benutzerverwaltung',
        dsgvo: 'DSGVO Verwaltung',
        roles: 'Rollen & Rechte',
        departments: 'Promptverwaltung',
      },
      
      modulesSub: {
        models: 'LLM-Modelle',
        overview: 'Orchestrator & Agenten',
      },
      
      dataSub: {
        backups: 'Backups & Wiederherstellung',
      },
      
      promptsSub: {
        library: 'Prompt-Bibliothek',
        frameworks: 'Frameworks',
      },
      
      monitoringSub: {
        activity: 'Aktivitätsprotokoll',
        system: 'Systemmonitoring',
        alerts: 'Alarme & Benachrichtigungen',
      },
      
      supportSub: {
        documentation: 'Dokumentation',
        faq: 'Häufige Fragen',
        tickets: 'Support-Tickets',
        tutorials: 'Video-Tutorials',
        api: 'API-Dokumentation',
        contact: 'Kontakt aufnehmen',
      },
      
      dashboard: {
        title: 'Dashboard',
        welcome: 'Willkommen',
        overview: 'Übersicht',
        quickStats: 'Schnellübersicht',
        activeUsers: 'Aktive Benutzer',
        totalModels: 'Modelle gesamt',
        storageUsed: 'Speicher verwendet',
        apiCalls: 'API-Aufrufe',
        recentActivity: 'Letzte Aktivitäten',
        systemHealth: 'Systemzustand',
        healthy: 'Gesund',
        noActivity: 'Keine aktuellen Aktivitäten',
      },
      
      settings: {
        title: 'Tenant-Einstellungen',
        general: {
          title: 'Allgemeine Informationen',
          subtitle: 'Grundlegende Einstellungen für Ihren Tenant',
          tenantName: 'Tenant-Name',
          tenantId: 'Tenant-ID',
          description: 'Beschreibung',
          contactEmail: 'Kontakt E-Mail',
          timezone: 'Zeitzone',
          saveChanges: 'Änderungen speichern',
        },
        security: {
          title: 'Sicherheit & Compliance',
          subtitle: 'Sicherheitseinstellungen und Compliance-Richtlinien',
          twoFactor: 'Zwei-Faktor-Authentifizierung',
          twoFactorDesc: 'Erfordert 2FA für alle Benutzer',
          sessionTimeout: 'Sitzungs-Timeout',
          minutes: 'Minuten',
          ipWhitelist: 'IP-Whitelist',
          ipWhitelistDesc: 'Erlaubte IP-Adressen',
          addIp: 'IP hinzufügen',
        },
        access: {
          title: 'Zugriff & Netzwerk',
          subtitle: 'Netzwerk- und Zugriffseinstellungen',
          publicAccess: 'Öffentlicher Zugriff',
          publicAccessDesc: 'Erlaubt öffentlichen Zugriff auf bestimmte Ressourcen',
          apiAccess: 'API-Zugriff',
          apiAccessDesc: 'Aktiviert externen API-Zugriff',
          corsOrigins: 'CORS-Ursprünge',
          corsOriginsDesc: 'Erlaubte CORS-Ursprünge',
          addOrigin: 'Ursprung hinzufügen',
        },
      },
      
      userManagement: {
        title: 'Benutzer- & Rollenverwaltung',
        users: {
          title: 'Benutzerverwaltung',
          subtitle: 'Verwalten Sie Benutzerkonten und Berechtigungen',
          searchPlaceholder: 'Benutzer suchen...',
          addUser: 'Benutzer hinzufügen',
          newUser: 'Neuer Benutzer',
          name: 'Name',
          email: 'E-Mail',
          role: 'Rolle',
          status: 'Status',
          lastActive: 'Zuletzt aktiv',
          actions: 'Aktionen',
          active: 'Aktiv',
          inactive: 'Inaktiv',
          edit: 'Bearbeiten',
          delete: 'Löschen',
          source: 'Quelle',
          localUser: 'Lokaler Benutzer',
          azureAD: 'Azure AD',
          googleIdentity: 'Google Identity',
          syncUsers: 'Benutzer synchronisieren',
          allUsers: 'Alle Benutzer',
          ssoUsers: 'SSO-Benutzer',
          inactiveUsers: 'Inaktive Benutzer',
          neverLoggedIn: 'Noch nie',
          departments: 'Abteilungen',
          selectDepartments: 'Abteilungen auswählen',
          selected: 'ausgewählt',
          exportCSVExcel: 'Exportieren (CSV/Excel)',
          import: 'Importieren',
          manualSync: 'Manuelle Synchronisierung',
          viewSyncLogs: 'Sync-Logs anzeigen',
          syncSuccess: 'Benutzer erfolgreich synchronisiert',
          syncSuccessDetails: '42 neue Benutzer, 2 aktualisiert',
          accessRightsAndRoles: 'Zugriffsrechte & Rollen',
          setUserStatus: 'Benutzer aktiv/inaktiv setzen',
          syncFromDirectory: 'Dieser Wert wird aus dem Directory synchronisiert',
          openInDirectory: 'In Directory öffnen',
          lastLogin: 'Letzter Login',
          syncedAt: 'Synchronisiert am',
          department: 'Abteilung',
          roleAdmin: 'Administrator',
          rolePowerUser: 'Power User',
          roleUser: 'Benutzer',
          roleViewer: 'Betrachter',
          duplicate: 'Duplizieren',
          assignRole: 'Rolle zuweisen',
          assignDepartment: 'Abteilung zuweisen',
          merge: 'Zusammenführen',
          approval: 'Freigabe',
        },
        roles: {
          title: 'Rollen & Rechte',
          subtitle: 'Verwalten Sie Rollen und Berechtigungen',
          addRole: 'Rolle hinzufügen',
          roleName: 'Rollenname',
          permissions: 'Berechtigungen',
          users: 'Benutzer',
          created: 'Erstellt',
          actions: 'Aktionen',
          edit: 'Bearbeiten',
          delete: 'Löschen',
          adminRights: 'Verwaltungsrechte',
          basicPermissions: 'Basis-Berechtigungen',
          dataRights: 'Datenrechte',
          roleManagement: 'Verwaltung von Rolle und Berechtigung',
          roleManagementDesc: 'Verwalten Sie Rollen und Berechtigungen',
        },
        departments: {
          title: 'Prompt-Kategorien & Abteilungen',
          subtitle: 'Zuweisung der Prompt-Kategorien zu Abteilungen oder einzelnen Nutzer.',
          department: 'Abteilung',
          promptCategories: 'Promptkategorien',
          newDepartment: 'Neue Abteilung',
          editDepartment: 'Abteilung bearbeiten',
          departmentName: 'Abteilungsname',
          editDepartmentDesc: 'Bearbeiten Sie die Abteilung und weisen Sie Promptkategorien und Nutzer zu.',
          selectOrCreateDepartment: 'Abteilung auswählen oder neu erstellen...',
          createNewDepartment: 'Neue Abteilung erstellen',
          enterDepartmentName: 'Neuen Abteilungsnamen eingeben...',
          deleteDepartmentTitle: 'Möchten Sie diese Abteilung wirklich löschen?',
          deleteDepartmentDesc: 'Diese Aktion kann nicht rückgängig gemacht werden.',
          assignDepartmentTitle: 'Abteilung zuweisen',
          assignDepartmentDesc: 'Wählen Sie eine bestehende Abteilung aus oder erstellen Sie eine neue.',
          selectDepartment: 'Abteilung auswählen...',
          renameDepartmentTitle: 'Abteilung umbenennen',
          renameDepartmentDesc: 'Geben Sie den neuen Namen für die Abteilung ein.',
          newDepartmentName: 'Neuer Abteilungsname',
          noDepartmentAssigned: 'Falls keine Abteilung zugewiesen ist, können einzelne Nutzer zugewiesen werden.',
          assignUsers: 'Nutzer zuweisen',
          allUsers: 'Alle Nutzer',
          assignCategories: 'Kategorien zuweisen',
          allCategories: 'Alle Kategorien',
          save: 'Speichern',
          cancel: 'Abbrechen',
          create: 'Erstellen',
          select: 'Auswählen',
          rename: 'Umbenennen',
          active: 'Aktiv',
          inactive: 'Inaktiv',
          all: 'Alle',
          // Dialog-spezifisch
          assignPromptCategory: 'Prompt-Kategorie zuweisen',
          promptCategory: 'Prompt-Kategorie',
          categoriesSelected: 'Kategorien ausgewählt',
          usersSelected: 'Nutzer ausgewählt',
          users: 'Nutzer',
          searchUsers: 'Nutzer suchen...',
          status: 'Status',
          edit: 'Bearbeiten',
          duplicate: 'Duplizieren',
          delete: 'Löschen',
          // Tabelle
          managementTitle: 'Verwaltung Prompt-Kategorien',
          actions: 'Aktionen',
          categories: 'Kategorien',
          noUsersAssigned: 'Keine Nutzer zugewiesen',
          newDepartmentTooltip: 'Neue Abteilung',
        },
        promptCategories: {
          addNewCategory: 'Neue Promptkategorie hinzufügen',
          addNewCategoryDesc: 'Geben Sie den Namen der neuen Promptkategorie ein.',
          categoryName: 'Kategoriename',
          renameCategory: 'Promptkategorie umbenennen',
          renameCategoryDesc: 'Geben Sie den neuen Namen für die Promptkategorie ein.',
          newCategoryName: 'Neuer Kategoriename',
          add: 'Hinzufügen',
        },
      },
      
      dataManagement: {
        title: 'Datenverwaltung',
        backups: {
          title: 'Backups & Wiederherstellung',
          subtitle: 'Verwalten Sie Daten-Backups und Wiederherstellungen',
          createBackup: 'Backup erstellen',
          backupName: 'Backup-Name',
          size: 'Größe',
          created: 'Erstellt',
          status: 'Status',
          actions: 'Aktionen',
          restore: 'Wiederherstellen',
          download: 'Herunterladen',
          delete: 'Löschen',
          completed: 'Abgeschlossen',
          inProgress: 'In Bearbeitung',
          failed: 'Fehlgeschlagen',
          autoBackup: 'Automatisches Backup',
          autoBackupDesc: 'Automatische Backups aktivieren',
          backupFrequency: 'Backup-Häufigkeit',
          daily: 'Täglich',
          weekly: 'Wöchentlich',
          monthly: 'Monatlich',
        },
      },
      
      monitoring: {
        activity: {
          title: 'Aktivitätsprotokoll',
          subtitle: 'Übersicht aller Systemaktivitäten',
          filterByUser: 'Nach Benutzer filtern',
          filterByAction: 'Nach Aktion filtern',
          allUsers: 'Alle Benutzer',
          allActions: 'Alle Aktionen',
          timestamp: 'Zeitstempel',
          user: 'Benutzer',
          action: 'Aktion',
          details: 'Details',
          ipAddress: 'IP-Adresse',
        },
        system: {
          title: 'Systemmonitoring',
          subtitle: 'Überwachung der Systemleistung',
          cpuUsage: 'CPU-Auslastung',
          memoryUsage: 'Speichernutzung',
          diskUsage: 'Festplattennutzung',
          networkTraffic: 'Netzwerkverkehr',
          uptime: 'Laufzeit',
          lastRestart: 'Letzter Neustart',
          systemHealth: 'Systemzustand',
          healthy: 'Gesund',
          warning: 'Warnung',
          critical: 'Kritisch',
        },
        alerts: {
          title: 'Alerts & Benachrichtigungen',
          subtitle: 'Verwalten Sie System-Alerts und Benachrichtigungen',
          createAlert: 'Alert erstellen',
          alertName: 'Alert-Name',
          type: 'Typ',
          severity: 'Schweregrad',
          status: 'Status',
          created: 'Erstellt',
          actions: 'Aktionen',
          edit: 'Bearbeiten',
          delete: 'Löschen',
          active: 'Aktiv',
          inactive: 'Inaktiv',
          high: 'Hoch',
          medium: 'Mittel',
          low: 'Niedrig',
        },
      },
      
      support: {
        title: 'Support & Dokumentation',
        overview: {
          title: 'Übersicht',
          welcome: 'Willkommen im Support-Bereich',
          description: 'Hier finden Sie Hilfe, Dokumentation und Support-Ressourcen',
          gettingStarted: 'Erste Schritte',
          gettingStartedDesc: 'Beginnen Sie hier mit AI Hub',
          documentation: 'Dokumentation',
          documentationDesc: 'Vollständige Produktdokumentation',
          support: 'Support',
          supportDesc: 'Kontaktieren Sie unser Support-Team',
          updates: 'Updates & Neuigkeiten',
          updatesDesc: 'Letzte Updates und Änderungen',
        },
        documentation: {
          title: 'Dokumentation',
          search: 'Dokumentation durchsuchen...',
          categories: 'Kategorien',
          gettingStarted: 'Erste Schritte',
          userGuide: 'Benutzerhandbuch',
          adminGuide: 'Administrator-Handbuch',
          apiDocs: 'API-Dokumentation',
          troubleshooting: 'Fehlerbehebung',
        },
        faq: {
          title: 'FAQ',
          search: 'FAQ durchsuchen...',
          categories: 'Kategorien',
          general: 'Allgemein',
          technical: 'Technisch',
          billing: 'Abrechnung',
          security: 'Sicherheit',
        },
        tickets: {
          title: 'Support-Tickets',
          createTicket: 'Ticket erstellen',
          ticketNumber: 'Ticket-Nummer',
          subject: 'Betreff',
          status: 'Status',
          priority: 'Priorität',
          created: 'Erstellt',
          actions: 'Aktionen',
          open: 'Offen',
          inProgress: 'In Bearbeitung',
          resolved: 'Gelöst',
          closed: 'Geschlossen',
          view: 'Ansehen',
        },
        contact: {
          title: 'Kontakt',
          description: 'Nehmen Sie Kontakt mit unserem Support-Team auf',
          email: 'E-Mail',
          phone: 'Telefon',
          availability: 'Verfügbarkeit',
          emergencySupport: 'Notfall-Support',
          sendMessage: 'Nachricht senden',
          name: 'Name',
          emailLabel: 'E-Mail',
          message: 'Nachricht',
          submit: 'Absenden',
        },
      },
      
      supportDocumentation: {
        title: 'Support & Dokumentation',
        ticketStatus: {
          open: 'Offen',
          inProgress: 'In Bearbeitung',
          resolved: 'Gelöst',
          closed: 'Geschlossen',
        },
        ticketPriority: {
          low: 'Niedrig',
          medium: 'Mittel',
          high: 'Hoch',
          urgent: 'Dringend',
        },
        documentation: {
          searchTitle: 'Dokumentation durchsuchen',
          searchDescription: 'Finden Sie Anleitungen, Best Practices und technische Referenzen',
          searchPlaceholder: 'Dokumentation durchsuchen...',
          learnMore: 'Mehr erfahren',
          noDocsFound: 'Keine Dokumentation gefunden',
          downloads: 'Downloads',
          downloadsDescription: 'Handbücher und zusätzliche Ressourcen',
          userManual: 'AI Hub Benutzerhandbuch',
          adminGuide: 'Administrator-Leitfaden',
          apiDocs: 'API-Dokumentation',
          download: 'Download',
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
            },
          },
        },
        faq: {
          title: 'Häufig gestellte Fragen',
          description: 'Finden Sie schnelle Antworten auf gängige Fragen',
          needMoreHelp: 'Weitere Hilfe benötigt?',
          needMoreHelpDesc: 'Wenn Sie Ihre Frage hier nicht finden, können Sie über die Sidebar zu anderen Support-Bereichen navigieren',
          management: 'FAQ-Verwaltung',
          managementDesc: 'Verwalten Sie häufig gestellte Fragen',
          createNew: 'Neue FAQ erstellen',
          editFaq: 'FAQ bearbeiten',
          panelCreateTitle: 'Neue FAQ erstellen',
          panelEditTitle: 'FAQ bearbeiten',
          questionLabel: 'Frage',
          categoryLabel: 'Kategorie',
          answerLabel: 'Antwort',
          tips: 'Tipps für gute FAQs:',
          tip1: 'Formulieren Sie Fragen so, wie Benutzer sie stellen würden',
          tip2: 'Halten Sie Antworten präzise und verständlich',
          tip3: 'Verwenden Sie Beispiele zur Verdeutlichung',
          tip4: 'Verlinken Sie auf weiterführende Dokumentation',
          minCharsRecommended: 'Mindestens 50 Zeichen empfohlen',
          createButton: 'FAQ erstellen',
          saveChanges: 'Änderungen speichern',
          successCreated: 'FAQ erstellt',
          successUpdated: 'FAQ aktualisiert',
          changesSaved: 'Die Änderungen wurden gespeichert.',
          categories: {
            general: 'Allgemein',
            technical: 'Technisch',
            billing: 'Abrechnung',
            security: 'Sicherheit',
            setup: 'Einrichtung',
            troubleshooting: 'Fehlerbehebung',
          },
        },
        tickets: {
          createTitle: 'Neues Support-Ticket erstellen',
          createDescription: 'Beschreiben Sie Ihr Anliegen und unser Team wird sich umgehend melden',
          yourTicketsTitle: 'Ihre Support-Tickets',
          yourTicketsDescription: 'Übersicht Ihrer aktuellen und vergangenen Anfragen',
          subjectLabel: 'Betreff',
          priorityLabel: 'Priorität',
          messageLabel: 'Nachricht',
          submitButton: 'Ticket absenden',
          noTickets: 'Keine Support-Tickets vorhanden',
          created: 'Erstellt',
          updated: 'Aktualisiert',
          successTitle: 'Support-Ticket erstellt!',
          confirmationEmail: 'Sie erhalten eine Bestätigung per E-Mail.',
        },
        tutorials: {
          title: 'Video-Tutorials',
          description: 'Schritt-für-Schritt Videoanleitungen für alle wichtigen Funktionen',
          duration: 'Dauer',
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
            },
          },
        },
        api: {
          title: 'API-Dokumentation',
          description: 'REST API Referenz für Entwickler',
          authentication: 'Authentifizierung',
          baseUrl: 'Base URL',
          endpoints: 'Endpoints',
          endpointGetAgents: 'Liste aller verfügbaren Agenten abrufen',
          endpointPostAgentExecute: 'Einen Agenten mit einer Anfrage ausführen',
          endpointGetModels: 'Liste aller konfigurierten LLM-Modelle',
          endpointGetUsers: 'Benutzer und deren Berechtigungen abrufen',
          endpointPostBackup: 'Neues Backup erstellen',
          downloadFullDocs: 'Vollständige API-Dokumentation herunterladen (PDF)',
          codeExamples: 'Code-Beispiele',
          codeExamplesDescription: 'Integration in Ihre Anwendung',
        },
        contact: {
          supportTitle: 'Support-Kontakt',
          supportDescription: 'Erreichen Sie unser Support-Team',
          emailSupport: 'E-Mail Support',
          phoneSupport: 'Telefon-Support',
          emergencyHotline: '24/7 Notfall-Hotline',
          responseTime: 'Antwortzeit',
          availability: 'Verfügbarkeit',
          salesTitle: 'Vertrieb & Partnerschaften',
          salesDescription: 'Für Fragen zu Lizenzen und Zusammenarbeit',
          sales: 'Vertrieb',
          partnerships: 'Partnerschaften',
          companyTitle: 'Unternehmen',
          companyDescription: 'RMB Group & neuco AG',
          companyInfo: 'AI Hub wird gemeinsam entwickelt von RMB Group und neuco AG',
          headquarters: 'Hauptsitz: Zürich, Schweiz',
          emergencyOnly: 'Nur für kritische Systemausfälle',
          mondayFriday: 'Mo-Fr, 08:00 - 18:00 Uhr',
        },
      },
      
      models: {
        title: 'Modellverwaltung',
        subtitle: 'Verwalten Sie AI-Modelle und deren Konfigurationen',
        addModel: 'Modell hinzufügen',
        modelName: 'Modellname',
        provider: 'Anbieter',
        version: 'Version',
        status: 'Status',
        lastUsed: 'Zuletzt verwendet',
        actions: 'Aktionen',
        active: 'Aktiv',
        inactive: 'Inaktiv',
        configure: 'Konfigurieren',
        delete: 'Löschen',
        edit: 'Bearbeiten',
        cancel: 'Abbrechen',
        save: 'Speichern',
        deleteConfirm: 'Löschen bestätigen',
        deleteMessage: 'Sind Sie sicher, dass Sie dieses Modell löschen möchten? Dieser Vorgang kann nicht rückgängig gemacht werden.',
        // Dialog
        editModel: 'Modell bearbeiten',
        basicInfo: 'Grundinformationen',
        modelNameLabel: 'Modellname *',
        modelNameHelp: 'Ein aussagekräftiger Name für interne Referenz',
        providerLabel: 'Provider *',
        modelIdLabel: 'Modell-ID *',
        modelIdHelp: 'Die technische Modell-ID des Providers',
        apiConfiguration: 'API-Konfiguration',
        apiKeyInfo: 'API-Schlüssel werden verschlüsselt gespeichert und sind nur im System sichtbar',
        apiKeyLabel: 'API-Schlüssel *',
        notes: 'Notizen',
        notesPlaceholder: 'Zusätzliche Informationen oder Konfigurationsdetails...',
      },
      
      moduleOverview: {
        title: 'Modul-Übersicht',
        subtitle: 'Übersicht aller verfügbaren Module',
        moduleName: 'Modulname',
        status: 'Status',
        version: 'Version',
        users: 'Benutzer',
        actions: 'Aktionen',
        enabled: 'Aktiviert',
        disabled: 'Deaktiviert',
        configure: 'Konfigurieren',
        disable: 'Deaktivieren',
        enable: 'Aktivieren',
        newAgent: 'Neuer Agent',
        editAgent: 'Agent bearbeiten',
        agentName: 'Agent-Name',
        agentDescription: 'Beschreibung',
        agentType: 'Agent-Typ',
        agentCapabilities: 'Fähigkeiten',
        addCapability: 'Fähigkeit hinzufügen',
        removeCapability: 'Entfernen',
        capabilityPlaceholder: 'z.B. E-Mail versenden, Daten analysieren...',
        saveAgent: 'Agent speichern',
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
        searchUsers: 'Benutzer suchen...',
        allUsers: 'Alle Benutzer',
        selectAll: 'Alle auswählen',
        deselectAll: 'Alle abwählen',
        saveRole: 'Rolle speichern',
        deleteRole: 'Rolle löschen',
        subtitle: 'Ändern Sie Rolleninformationen und Berechtigungen',
        basicInfo: 'Grundinformationen',
        roleNameLabel: 'Rollenname *',
        roleNamePlaceholder: 'z.B. Content Manager',
        descriptionLabel: 'Beschreibung',
        descriptionPlaceholder: 'Kurze Beschreibung der Rolle',
        usersLabel: 'Zugewiesene Benutzer',
        users: 'Nutzer',
        noUsersAssigned: 'Keine Benutzer zugewiesen',
        permissionsLabel: 'Berechtigungen',
        selectNone: 'Keine',
        basicPermissions: 'Basis-Berechtigungen',
        adminRights: 'Verwaltungsrechte',
        dataRights: 'Datenrechte',
        permCreate: 'Erstellen',
        permRead: 'Lesen',
        permUpdate: 'Bearbeiten',
        permDelete: 'Löschen',
        permManageUsers: 'Benutzer verwalten',
        permManageSettings: 'Einstellungen verwalten',
        permManageRoles: 'Rollen verwalten',
        permViewReports: 'Berichte ansehen',
        permExportData: 'Daten exportieren',
        permImportData: 'Daten importieren',
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
        editUser: 'Benutzer bearbeiten',
        newUser: 'Neuer Benutzer',
        firstName: 'Vorname',
        lastName: 'Nachname',
        phoneNumber: 'Telefonnummer',
        position: 'Position',
        hireDate: 'Einstellungsdatum',
        selectRole: 'Rolle auswählen',
        selectStatus: 'Status auswählen',
        saveUser: 'Benutzer speichern',
      },
      
      modelManagementExtended: {
        newModel: 'Neues Modell',
        editModel: 'Modell bearbeiten',
        modelType: 'Modelltyp',
        apiKey: 'API-Schlüssel',
        endpoint: 'Endpunkt',
        maxTokens: 'Maximale Tokens',
        temperature: 'Temperatur',
        topP: 'Top P',
        saveModel: 'Modell speichern',
        testModel: 'Modell testen',
        title: 'LLM Modellverwaltung',
        statsTotal: 'Gesamt',
        statsActive: 'Aktiv',
        statsInactive: 'Inaktiv',
        statsError: 'Fehler',
        configuredModels: 'Konfigurierte Modelle',
        modelsCount: 'Modellen',
        model: 'Modell',
        modelId: 'Modell-ID',
        sort: 'Sortieren',
        lastTested: 'Letzter Test',
        usedBy: 'Verwendet von',
        actions: 'Aktionen',
        noModelsFound: 'Keine Modelle gefunden',
        addNewModel: 'Neues Modell hinzufügen',
        modelName: 'Modellname',
        modelNameRequired: 'Modellname *',
        modelIdRequired: 'Modell-ID *',
        modelIdDescription: 'Die technische Modell-ID des Providers',
        lastTest: 'Letzter Test',
        never: 'Nie',
        deleteConfirm: 'Löschen bestätigen',
        deleteConfirmMessage: 'Sind Sie sicher, dass Sie dieses Modell löschen möchten? Dieser Vorgang kann nicht rückgängig gemacht werden.',
        // Dialog sections
        basicInformation: 'Grundinformationen',
        modelNameHelper: 'Ein aussagekräftiger Name für interne Referenz',
        apiConfiguration: 'API-Konfiguration',
        apiKeySecurityNotice: 'API-Schlüssel werden verschlüsselt gespeichert und sind nur im System sichtbar',
        notes: 'Notizen',
        endpointHelper: 'Basis-URL für API-Anfragen (bei Azure oder Custom Endpoints erforderlich)',
        usage: 'Verwendung',
        addedDate: 'Hinzugefügt',
        usedIn: 'Verwendet in',
        notYetUsed: 'Noch nicht verwendet',
        modelNameLabel: 'Modellname *',
        apiKeyLabel: 'API-Schlüssel *',
        providerLabel: 'Provider *',
        modelIdLabel: 'Modell-ID *',
        endpointLabel: 'API-Endpoint',
        statusLabel: 'Status'
      },
      
      alertsExtended: {
        newAlert: 'Neuer Alert',
        editAlert: 'Alert bearbeiten',
        alertType: 'Alert-Typ',
        alertMessage: 'Nachricht',
        alertThreshold: 'Schwellenwert',
        alertRecipients: 'Empfänger',
        addRecipient: 'Empfänger hinzufügen',
        emailNotification: 'E-Mail-Benachrichtigung',
        smsNotification: 'SMS-Benachrichtigung',
        saveAlert: 'Alert speichern',
      },
      
      supportExtended: {
        manageFAQ: 'FAQ verwalten',
        newFAQ: 'Neue FAQ',
        editFAQ: 'FAQ bearbeiten',
        faqQuestion: 'Frage',
        faqAnswer: 'Antwort',
        faqCategory: 'Kategorie',
        saveFAQ: 'FAQ speichern',
        deleteFAQ: 'FAQ löschen',
        ticketSuccess: 'Ticket erfolgreich erstellt',
        ticketSubmitted: 'Ihr Support-Ticket wurde erfolgreich erstellt.',
        ticketNumber: 'Ticket-Nummer',
        backToSupport: 'Zurück zum Support',
        viewTicket: 'Ticket ansehen',
      },
      
      activityLog: {
        actions: {
          backupCreated: 'Backup erstellt',
          userCreated: 'Benutzer erstellt',
          loginFailed: 'Fehlerhafte Anmeldung',
          configChanged: 'Konfiguration geändert',
          autoBackup: 'Automatisches Backup',
          roleAssigned: 'Rolle zugewiesen',
          dbConnectionFailed: 'Datenbankverbindung fehlgeschlagen',
          healthCheck: 'Täglicher Gesundheitscheck'
        },
        resources: {
          userManagement: 'Benutzerverwaltung',
          authentication: 'Authentifizierung',
          normenAgent: 'Normen-Agent',
          userAnalyticsDB: 'User Analytics DB',
          agentConfigDB: 'Agent Configuration DB',
          system: 'System',
          aiHubMainDB: 'AI Hub Main DB'
        },
        details: {
          invalidPassword: 'Ungültiges Passwort'
        },
        ui: {
          title: 'Aktivitätsprotokoll',
          description: 'Überwachen Sie alle System-Aktivitäten und Benutzeraktionen',
          searchPlaceholder: 'Durchsuchen Sie Logs...',
          filterByStatus: 'Nach Status filtern',
          allStatuses: 'Alle Status',
          success: 'Erfolgreich',
          warning: 'Warnung',
          error: 'Fehler',
          info: 'Info',
          warnings: 'Warnungen',
          errors: 'Fehler',
          information: 'Informationen',
          exportLogs: 'Logs exportieren',
          clearFilters: 'Filter löschen',
          activitiesCount: 'Aktivitäten',
          chronologicalListing: 'Chronologische Auflistung aller System-Aktivitäten',
          export: 'Exportieren',
          timestamp: 'Zeitstempel',
          user: 'Benutzer',
          action: 'Aktion',
          resource: 'Ressource',
          status: 'Status',
          ip: 'IP-Adresse',
          details: 'Details',
          sort: 'Sortieren',
          resetFilters: 'Filter zurücksetzen',
          successful: 'Erfolgreich',
          ipAddress: 'IP-Adresse'
        }
      },
      
      dashboardExtended: {
        stats: {
          activeModules: 'Aktive Module',
          processedToday: 'Heute verarbeitet',
          avgResponseTime: 'Durchschn. Antwortzeit',
          systemLoad: 'System-Auslastung',
          requests: 'Anfragen',
          seconds: 'Sekunden',
          cpu: 'CPU'
        },
        modules: {
          chatAgent: 'Chat Agent',
          documentAnalyzer: 'Dokumenten-Analyse',
          calendarAssistant: 'Kalender-Assistent',
          dataAnalyst: 'Daten-Analyst',
          securityMonitor: 'Sicherheits-Monitor'
        },
        ui: {
          welcomeBack: 'Willkommen zurück',
          overviewText: 'Hier ist eine Übersicht über Ihr AI-System und die aktuellen Aktivitäten.',
          recentActivity: 'Letzte Aktivitäten',
          recentActivityDesc: 'Aktuelle System-Events und Änderungen',
          systemStatus: 'System-Status',
          systemStatusDesc: 'Aktuelle Module und deren Auslastung',
          viewAllActivities: 'Alle Aktivitäten anzeigen',
          detailedMetrics: 'Detaillierte Metriken',
          quickActions: 'Schnellaktionen',
          quickActionsDesc: 'Häufig verwendete Funktionen für schnellen Zugriff',
          newChat: 'Neuer Chat',
          configureAI: 'AI konfigurieren',
          manageModules: 'Module verwalten',
          settings: 'Einstellungen',
          statusActive: 'Aktiv',
          statusWarning: 'Warnung',
          statusError: 'Fehler'
        },
        cards: {
          users: 'Benutzer',
          modules: 'Module',
          agents: 'Agenten',
          apiCalls: 'API Calls',
          active: 'aktiv',
          inactive: 'inaktiv',
          moreAvailable: 'weitere verfügbar',
          thisMonth: 'diesen Monat'
        },
        quickStats: {
          uptime: 'Uptime',
          activeSessions: 'Aktive Sessions',
          regions: 'Regionen'
        },
        systemMessages: {
          planExpiring: 'Ihr Tarif läuft in {days} Tagen ab',
          newVersionAvailable: 'Neue Version {version} verfügbar'
        },
        activities: {
          newUserCreated: 'Neuer Benutzer erstellt',
          backupCompleted: 'Backup erfolgreich abgeschlossen',
          roleUpdated: 'Rolle \'{role}\' aktualisiert',
          apiRateLimitReached: 'API Rate Limit erreicht',
          moduleActivated: 'Modul \'{module}\' aktiviert',
          chatAgentActivated: 'Chat Agent wurde aktiviert',
          requestsProcessed: '1,234 Anfragen erfolgreich verarbeitet',
          temperatureChanged: 'AI-Temperatur auf 0.7 geändert',
          timeAgo: {
            minutes: 'vor {count} Min',
            hour: 'vor 1 Std',
            hours: 'vor {count} Std'
          }
        },
        notifications: {
          userLoggedIn: 'Benutzer {username} angemeldet'
        }
      },
      
      dataManagementExtended: {
        backups: {
          scheduledBackup: 'Geplantes Backup',
          manualBackup: 'Manuelles Backup',
          allDatabases: 'Alle Datenbanken'
        },
        ui: {
          title: 'Backups & Wiederherstellung',
          databases: 'Datenbanken',
          successful: 'Erfolgreich',
          failed: 'Fehlgeschlagen',
          newBackup: 'Neues Backup erstellen',
          newBackupDesc: 'Erstellen Sie ein manuelles Backup Ihrer Datenbanken',
          backupName: 'Backup-Name',
          backupNamePlaceholder: 'z.B. Production Backup vor Update',
          selectDatabase: 'Datenbank auswählen',
          creating: 'Backup wird erstellt...',
          createBackup: 'Backup erstellen',
          uploadBackup: 'Backup hochladen',
          databasesTitle: 'Datenbanken',
          databasesDesc: 'Übersicht aller verfügbaren Datenbanken',
          name: 'Name',
          size: 'Größe',
          tables: 'Tabellen',
          lastBackup: 'Letztes Backup',
          actions: 'Aktionen',
          backup: 'Backup',
          backupHistory: 'Backup-Verlauf',
          backupHistoryDesc: 'Alle erstellten Backups mit Versionierung',
          database: 'Datenbank',
          version: 'Version',
          date: 'Datum',
          type: 'Typ',
          status: 'Status',
          sort: 'Sortieren',
          resetFilters: 'Filter zurücksetzen',
          manual: 'Manuell',
          automatic: 'Automatisch',
          statusCompleted: 'Erfolgreich',
          statusInProgress: 'In Arbeit',
          statusFailed: 'Fehlgeschlagen',
          download: 'Datei Herunterladen',
          restore: 'Wiederherstellen',
          delete: 'Löschen',
          deleteTitle: 'Backup löschen?',
          deleteMessage: 'Sind Sie sicher, dass Sie dieses Backup löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
          restoreTitle: 'Backup wiederherstellen?',
          restoreMessage: 'Sind Sie sicher, dass Sie dieses Backup wiederherstellen möchten? Die aktuellen Daten werden überschrieben.',
          backupLabel: 'Backup',
          databaseLabel: 'Datenbank',
          versionLabel: 'Version',
          dateLabel: 'Datum',
          confirmRestore: 'Wiederherstellen',
          beingCreated: 'Wird erstellt...'
        }
      },
      
      alertsManagement: {
        title: 'Alarme & Benachrichtigungen',
        stats: {
          activeAlerts: 'Aktive Alarme',
          unacknowledged: 'Unbestätigt',
          triggers24h: 'Auslösungen (24h)',
          totalAlerts: 'Gesamte Alarme'
        },
        notifications: {
          title: 'Aktuelle Benachrichtigungen',
          subtitle: 'Neueste Alarm-Benachrichtigungen und deren Status',
          acknowledge: 'Bestätigen'
        },
        rules: {
          title: 'Alarm-Regeln',
          subtitle: 'Verwalten Sie Ihre Alert-Konfigurationen',
          searchPlaceholder: 'Alarme durchsuchen...'
        },
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
          status: 'Status',
          lastTriggered: 'Zuletzt ausgelöst',
          actions: 'Aktionen',
          sort: 'Sortieren'
        },
        status: {
          active: 'Aktiv',
          inactive: 'Inaktiv'
        },
        channels: {
          email: 'E-Mail',
          slack: 'Slack'
        },
        actions: {
          edit: 'Bearbeiten',
          duplicate: 'Duplizieren',
          delete: 'Löschen'
        },
        createPanel: {
          titleNew: 'Neuer Alert',
          titleEdit: 'Alert bearbeiten',
          subtitleNew: 'Konfigurieren Sie einen neuen Alert',
          subtitleEdit: 'Ändern Sie die Alert-Einstellungen',
          nameLabel: 'Alert-Name',
          namePlaceholder: 'z.B. CPU Auslastung Kritisch',
          typeLabel: 'Typ',
          conditionLabel: 'Bedingung',
          conditionPlaceholder: 'z.B. CPU Auslastung > 85%',
          thresholdLabel: 'Schwellenwert',
          thresholdPlaceholder: 'z.B. 85%',
          channelsLabel: 'Benachrichtigungskanäle',
          buttonSave: 'Speichern',
          buttonCancel: 'Abbrechen',
          buttonCreate: 'Alert erstellen'
        },
        deleteDialog: {
          title: 'Alert löschen?',
          message: 'Sind Sie sicher, dass Sie diesen Alert löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
          confirm: 'Löschen',
          cancel: 'Abbrechen'
        }
      },
      
      accountExtended: {
        displayNamePlaceholder: 'Ihr Anzeigename'
      },
      
      systemMonitoringExtended: {
        title: 'Systemmonitoring',
        serviceStatus: 'Service Status',
        servicesOnline: 'von',
        servicesOf: 'Services online',
        degraded: 'eingeschränkt',
        online: 'Online',
        offline: 'Offline',
        restricted: 'Eingeschränkt',
        uptime: 'Uptime',
        responseTime: 'Antwortzeit',
        resourceUsage24h: 'Ressourcenauslastung in % (24h)',
        resourceUsageSubtitle: 'CPU, RAM, DISK & Netzwerk',
        apiRequests24h: 'API Requests (24h)',
        apiRequestsSubtitle: 'Anzahl der verarbeiteten Anfragen',
        network: 'Netzwerk',
        totalApiCalls: 'Gesamte API Calls',
        vsYesterday: 'vs. gestern',
        avgResponseTime: 'Durchschn. Antwortzeit',
        systemUptime: 'System Uptime',
        days: 'Tage',
        hours: 'Std',
        requests: 'Anfragen',
        services: {
          aiHubAPI: 'AI Hub API',
          emailAgent: 'Email-Agent Service',
          normenAgent: 'Normen-Agent Service',
          internetAgent: 'Internet-Agent Service',
          jelmoliAgent: 'Jelmoli-Agent Service',
          databaseCluster: 'Database Cluster',
          authenticationService: 'Authentication Service',
          fileStorage: 'File Storage'
        }
      },
      
      loginExtended: {
        logoAlt: 'AIHUB Logo',
        tenants: {
          rmbGroup: 'RMB Group',
          neuco: 'neuco'
        }
      },
      
      dashboardFull: {
        stats: {
          activeModules: 'Aktive Module',
          processedToday: 'Heute verarbeitet'
        },
        modules: {
          chatAgent: 'Chat Agent',
          documentAnalyzer: 'Dokumenten-Analyse',
          calendarAssistant: 'Kalender-Assistent',
          dataAnalyst: 'Daten-Analyst',
          securityMonitor: 'Sicherheits-Monitor'
        }
      },
      
      modelManagementFull: {
        providers: {
          geminiPro: 'Gemini Pro',
          googleAI: 'Google AI',
          azureOpenAI: 'Azure OpenAI',
          awsBedrock: 'AWS Bedrock',
          mistralAI: 'Mistral AI',
          cohere: 'Cohere',
          customEndpoint: 'Custom Endpoint'
        },
        dialog: {
          addNewModel: 'Neues Modell hinzufügen',
          editModel: 'Modell bearbeiten',
          addModel: 'Modell hinzufügen',
          save: 'Speichern',
          selectModel: 'Modell wählen'
        }
      },
      
      placeholders: {
        systemPrompt: 'System-Prompt eingeben...',
        searchDots: 'Durchsuchen...',
        spaceName: 'Space-Name eingeben...',
        email: 'ihre.email@company.com',
        phone: '+41 XX XXX XX XX',
        jobTitle: 'z.B. Software Entwickler',
        department: 'z.B. IT, Marketing, Sales',
        modelName: 'z.B. GPT-4 Turbo Production',
        selectProvider: 'Wählen Sie einen Provider',
        modelId: 'z.B. gpt-4-turbo-preview',
        apiKey: 'sk-...',
        endpoint: 'https://...',
        notes: 'Zusätzliche Informationen oder Konfigurationsdetails...',
        agentName: 'z.B. Customer Service Agent',
        agentDescription: 'Beschreiben Sie die Funktion dieses Agents...',
        version: '1.0.0',
        agentEndpoint: 'https://api.aihub.internal/agents/...',
        storageUrl: 'https://storage.example.com/...',
        storageToken: 'stg-...',
        agentApiKey: 'agt-...',
        searchDocumentation: 'Dokumentation durchsuchen...',
        ticketSubject: 'Kurze Beschreibung Ihres Anliegens',
        ticketMessage: 'Beschreiben Sie Ihr Problem oder Ihre Frage ausführlich...',
        faqQuestion: 'Z.B. Wie aktiviere ich die Zwei-Faktor-Authentifizierung?',
        faqAnswer: 'Geben Sie eine detaillierte Antwort auf die Frage ein...',
        passwordMinLength: 'Passwort muss mindestens 6 Zeichen lang sein'
      },
      
      moduleOverviewFull: {
        notConfigured: 'Nicht konfiguriert',
        selectModel: 'Modell wählen',
        orchestratorDiagram: 'Orchestrator Flussdiagramm',
        statsModulesTotal: 'Gesamt Module',
        statsActive: 'Aktiv',
        statsInactive: 'Inaktiv',
        statsError: 'Fehler',
        title: 'Orchestrator & Agenten',
        addModule: 'Modul hinzufügen',
        orchestratorTitle: 'Orchestrator',
        orchestratorDescription: 'Zentrale Steuerungseinheit für alle AI-Agents und Workflows',
        orchestratorQuery: 'Orchestratorabfrage',
        llmConfiguration: 'LLM-Konfiguration',
        llm1: 'LLM 1',
        llm2: 'LLM 2',
        prompt: 'Prompt',
        edit: 'Bearbeiten',
        agentsTitle: 'Agenten',
        agentConfiguration: 'Agent-Konfiguration',
        apiEndpoint: 'API-Endpoint',
        apiKey: 'API-Schlüssel',
        testConnection: 'Verbindung testen',
        testing: 'Teste...',
        storage: 'Speicher',
        storageAccessUrl: 'Speicher (Zugangs-URL)',
        storageToken: 'Speicher (Token)',
        delete: 'Löschen',
        save: 'Speichern',
        cancel: 'Abbrechen',
        deleteConfirmTitle: 'Modul löschen',
        deleteConfirmDescription: 'Möchten Sie dieses Modul wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
        version: 'Version',
        lastSync: 'Letzte Synchronisation',
        category: 'Kategorie',
        public: 'Öffentlich',
        private: 'Privat',
        riskCategory: 'Risikokategorie',
        low: 'Niedrig',
        high: 'Hoch',
        icon: 'Icon',
        agentName: 'Agent Name',
        description: 'Beschreibung',
        apiKeysEncrypted: 'API-Schlüssel werden verschlüsselt gespeichert',
        deleteAgent: 'Agent löschen',
        deleteAgentConfirmation: 'Sind Sie sicher, dass Sie diesen Agent löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
        addNewAgent: 'Neuen Agent hinzufügen',
        basicInformation: 'Grundinformationen',
        addAgent: 'Agent hinzufügen',
        agents: {
          jelmoliAgent: 'Jelmoli Agent',
          emailAgent: 'Email Agent',
          internetAgent: 'Internet Agent',
          normenAgent: 'Normen Agent'
        },
        agentDescriptions: {
          emailAgent: 'Verarbeitet und generiert E-Mails mit AI-Unterstützung',
          internetAgent: 'Führt Websuchen und Internetrecherchen durch',
          jelmoliAgent: 'Jelmoli-spezifischer Assistent für Kundenanfragen',
          normenAgent: 'Durchsucht und analysiert technische Normen und Standards'
        },
        prompts: {
          orchestrator1: 'Du bist ein AI-Orchestrator, der verschiedene Agents koordiniert.',
          orchestrator2: 'Analysiere die Anfrage und leite sie an den passenden Agent weiter.'
        },
        models: {
          geminiPro: 'Gemini Pro',
          azureGPT4: 'Azure GPT-4'
        }
      },
      
      orchestratorExtended: {
        selectModel: 'Modell auswählen'
      },
      
      alertsSampleData: {
        serviceOffline: 'Service Offline',
        backupFailed: 'Backup Fehlgeschlagen',
        unusualTraffic: 'Ungewöhnlicher Traffic',
        backupFailedMessage: 'Das geplante Backup um 03:00 Uhr ist fehlgeschlagen. Fehlercode: DB_TIMEOUT'
      },
      
      dataManagementFull: {
        scheduledBackup: 'Geplantes Backup',
        manualBackup: 'Manuelles Backup',
        allDatabases: 'Alle Datenbanken'
      },
      
      chatSampleData: {
        productInquiryJelmoli: 'Produktanfrage Jelmoli',
        productAvailability: 'Verfügbarkeit von Produkten'
      },
      
      roleManagementPermissions: {
        read: 'Lesen',
        write: 'Schreiben',
        delete: 'Löschen',
        manageUsers: 'Benutzer verwalten',
        manageSettings: 'Einstellungen verwalten',
        manageRoles: 'Rollen verwalten',
        viewReports: 'Berichte ansehen',
        exportData: 'Daten exportieren',
        importData: 'Daten importieren'
      },
      
      chatExtended: {
        filesAttached: 'Dateien angehängt',
        detailedResponseFrom: 'Detaillierte Antwort von {agentId} auf "{message}"',
        detailedResponseContent: 'Dies ist die spezifische, ausführliche Analyse und Antwort dieses Agents mit allen relevanten Details und Informationen, die dieser Agent bereitstellen kann.',
        basedOnAnalysis: 'Basierend auf der Analyse aller {count} aktiven Agents zu Ihrer Anfrage "{message}"',
        orchestratorSummary: 'Die Orchestrator AI hat die Antworten interpretiert und zusammengefasst. Dies ist eine intelligente Synthese der Informationen aus allen Quellen ({modules}), die Ihnen eine klare, verständliche Antwort bietet.',
        forDetailedInfo: 'Für detaillierte Informationen einzelner Agents klicken Sie auf die entsprechenden Badges unten.',
        filesAdded: '{count} Datei(en) hinzugefügt'
      }
    },
    
    // Prompts & Frameworks
    promptsFrameworks: {
      // Tabs/Headers
      promptLibrary: 'Prompt-Bibliothek',
      frameworks: 'Frameworks',
      
      // Actions
      edit: 'Bearbeiten',
      duplicate: 'Duplizieren',
      createNew: 'Neu erstellen',
      delete: 'Löschen',
      
      // Labels
      promptLabel: 'Prompt:',
      structureLabel: 'Struktur:',
      title: 'Titel',
      description: 'Beschreibung',
      category: 'Kategorie',
      
      // Counts
      promptsCount: 'Prompts',
      frameworksCount: 'Frameworks',
      
      // Headers
      promptCategories: 'Prompt-Kategorien',
      promptCategoriesDescription: 'Wählen Sie eine Kategorie, um die verfügbaren Prompts zu sehen',
      frameworkCategories: 'Framework-Kategorien',
      frameworkCategoriesDescription: 'Wählen Sie eine Kategorie, um die verfügbaren Frameworks zu sehen',
      
      // Search
      searchPlaceholder: 'Kategorien durchsuchen...',
      noCategoriesFound: 'Keine Kategorien gefunden',
      
      // Edit Panel
      editPrompt: 'Prompt bearbeiten',
      editFramework: 'Framework bearbeiten',
      duplicatePrompt: 'Prompt duplizieren',
      duplicateFramework: 'Framework duplizieren',
      createNewPrompt: 'Neuen Prompt erstellen',
      createNewFramework: 'Neues Framework erstellen',
      
      // Form Fields
      titleLabel: 'Titel',
      titlePlaceholder: 'Prompt-Titel',
      frameworkTitlePlaceholder: 'Framework-Titel',
      descriptionLabel: 'Beschreibung',
      descriptionPlaceholder: 'Kurze Beschreibung des Prompts',
      frameworkDescriptionPlaceholder: 'Kurze Beschreibung des Frameworks',
      promptPlaceholder: 'Prompt-Text',
      frameworkPlaceholder: 'Framework-Struktur',
      promptContentLabel: 'Prompt',
      frameworkContentLabel: 'Struktur',
      
      // Buttons
      saveButton: 'Speichern',
      cancelButton: 'Abbrechen',
      
      // Delete Dialog
      deletePromptTitle: 'Prompt löschen',
      deleteFrameworkTitle: 'Framework löschen',
      deletePromptMessage: 'Sind Sie sicher, dass Sie diesen Prompt löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      deleteFrameworkMessage: 'Sind Sie sicher, dass Sie dieses Framework löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      confirmDelete: 'Löschen',
      
      // Copy suffix
      copySuffix: '(Kopie)',
      
      // Category Names
      categoryNames: {
        market: 'Markt & Wettbewerb',
        planning: 'Planung & Umsetzung',
        strategy: 'Strategie & Wachstum',
        sales: 'Vertrieb',
        service: 'Kundenservice',
        finance: 'Finanzen & Reporting',
        hr: 'Personal & Recruiting',
        learning: 'Lernen & Wissen',
        organization: 'Organisation & Zusammenarbeit',
        coaching: 'Coaching & Entwicklung',
        promptEngineering: 'Prompt-Erstellung & Optimierung',
        quality: 'Qualitäts- & Ausgabeverbesserung',
        criticalAnalysis: 'Kritische Analyse & Vorfragen',
        // Frameworks
        mission: 'Mission Frameworks',
        thinking: 'Thinking Frameworks',
        expression: 'Expression Frameworks',
        interaction: 'Interaction Frameworks'
      },
      
      // Category Descriptions
      categoryDescriptions: {
        market: 'Marktanalyse, Wettbewerbsbeobachtung und Positionierung',
        planning: 'Projektplanung, Roadmaps und Implementierungsstrategien',
        strategy: 'Geschäftsstrategien, Wachstumsplanung und Innovation',
        sales: 'Prompts für Verkaufsgespräche, Kundenakquise und Verkaufsstrategien',
        service: 'Kundensupport, Kommunikation und Service Excellence',
        finance: 'Finanzplanung, Controlling und Geschäftsberichte',
        hr: 'Recruiting, Mitarbeiterentwicklung und HR-Prozesse',
        learning: 'Wissensvermittlung, Training und Dokumentation',
        organization: 'Teamwork, Prozesse und Kollaboration',
        coaching: 'Persönliche Entwicklung, Mentoring und Feedback',
        promptEngineering: 'Effektive AI-Prompts erstellen und verbessern',
        quality: 'Output-Qualität steigern und verfeinern',
        criticalAnalysis: 'Anforderungen hinterfragen und präzisieren',
        // Frameworks
        mission: 'Frameworks zur strukturierten Erstellung von Aufgaben und präzisen Anweisungen',
        thinking: 'Frameworks für klare Gedankenstrukturen und strategisches Denken',
        expression: 'Frameworks für zielgerichtete Kommunikation und Content-Produktion',
        interaction: 'Frameworks für kooperative Kommunikation, Coaching und iterative Prozesse'
      }
    }
  },
  
  en: {
    // Common
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    open: 'Open',
    settings: 'Settings',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    
    // Login
    login: {
      title: 'AI Hub Login',
      subtitle: 'Sign in to access AI modules',
      username: 'Username',
      password: 'Password',
      loginButton: 'Sign In',
      forgotPassword: 'Forgot password?',
      invalidCredentials: 'Invalid credentials',
      welcomeBack: 'Welcome back!',
      // 2FA
      twoFactorTitle: 'Two-Factor Authentication',
      twoFactorSubtitle: 'Enter the 6-digit code',
      twoFactorAuthDescription: 'Please enter the 6-digit code from your authenticator app',
      codeLabel: 'Verification Code',
      codePlaceholder: '000000',
      verifyButton: 'Verify Code',
      invalidCode: 'Invalid code',
      resendCode: 'Resend code',
      confirmButton: 'Confirm',
      // Login form fields
      selectTenantLabel: 'Select Tenant',
      selectTenantPlaceholder: 'Choose a tenant',
      passwordPlaceholder: 'Password',
      versionLabel: 'Version',
      desktopLabel: 'Desktop',
      mobileLabel: 'Mobile',
      copyright: '© 2025. All rights reserved.',
      // Error messages
      errorSelectTenant: 'Please select a tenant',
      errorPasswordEmpty: 'Password cannot be empty',
      errorPasswordTooShort: 'Password must be at least 4 characters long',
      errorInvalidPassword: 'Invalid password. Use: password, 1234, test or demo',
      errorCode6Digits: 'Please enter a 6-digit code',
      errorInvalidCode: 'Invalid code. Use: 123456, 000000 or 111111',
      // Demo hints
      demoCodeHint: 'Tip: Use 123456, 000000 or 111111 for demo'
    },
    
    // Header
    header: {
      aiHub: 'AI Hub',
      chat: 'Chat',
      options: 'Options',
      logout: 'Logout',
      welcomeMessage: 'Welcome',
      tenantAdministrator: 'Tenant Administrator',
      tagline: 'own your data'
    },
    
    // Admin Menus
    admin: {
      tenant: {
        title: 'Tenant',
        selectTenant: 'Select Tenant',
        agentAssignment: 'Agent Assignment',
        api: 'API',
        permissions: 'Permissions'
      },
      profile: {
        title: 'Profile',
        account: 'Account',
        logout: 'Logout'
      }
    },
    
    // Account Panel
    accountPanel: {
      title: 'Account Settings',
      language: 'Language',
      design: 'Design',
      logout: 'End Session',
      darkModeTitle: 'Dark Design',
      darkModeDescription: 'Enables dark mode for the entire application',
      logoutDescription: 'Sign out of your account',
      logoutButton: 'Sign Out'
    },
    
    // Account Settings
    account: {
      title: 'Account Settings',
      subtitle: 'Manage your profile and preferences',
      profilePicture: 'Profile Picture',
      profilePictureDescription: 'Upload a profile picture or change the existing one',
      uploadImage: 'Upload Image',
      removeImage: 'Remove Image',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      updatePassword: 'Update Password',
      passwordMismatch: 'Passwords do not match',
      passwordUpdated: 'Password successfully updated',
      languageSection: 'Language',
      languageDescription: 'Choose your preferred language',
      themeSection: 'Theme',
      themeDescription: 'Choose between light and dark theme',
      personalInfo: 'Personal Information',
      personalInfoDescription: 'Your account details and user information',
      username: 'Username',
      email: 'Email',
      role: 'Role',
      saveChanges: 'Save Changes',
      // New additions for AccountSettings
      displayName: 'Display Name',
      phoneNumber: 'Phone Number',
      jobTitle: 'Job Title',
      department: 'Department',
      emailPlaceholder: 'your.email@company.com',
      phoneNumberPlaceholder: '+1 XXX XXX XXXX',
      jobTitlePlaceholder: 'e.g. Software Developer',
      departmentPlaceholder: 'e.g. IT, Marketing, Sales',
      imageTooLarge: 'Image too large. Maximum 5MB allowed.',
      passwordTooShort: 'Password must be at least 6 characters long',
      endSession: 'End Session',
      endSessionDescription: 'Sign out of your account and return to login',
      logoutNow: 'Sign Out Now',
      administrator: 'Administrator',
      user: 'User'
    },
    
    // Mobile Layout
    mobileLayout: {
      chatDescription: 'Chat interface for interacting with AI agents',
      optionsDescription: 'Agent settings and configuration',
      accountDescription: 'User account settings and profile management'
    },
    
    // Agent Settings
    agentSettings: {
      title: 'Orchestrator Settings',
      subtitle: 'Configure agents and AI behavior',
      availableAgents: 'Available Agents',
      agentDescription: 'Overview of all available AI agents and their functions',
      active: 'Active',
      available: 'Available',
      private: 'Private',
      public: 'Public',
      activated: 'Activated',
      deactivated: 'Deactivated',
      
      // Theme Settings
      themeSettings: 'Theme Settings',
      themeDescription: 'Choose between light and dark theme',
      darkMode: 'Dark Mode',
      darkModeDescription: 'Enables dark mode for the entire application',
      
      // Language Settings
      languageSettings: 'Language Settings',
      languageDescription: 'Choose the desired language for AI responses',
      language: 'Language',
      
      // Custom Prompt
      customPrompt: 'System Prompt Addition',
      customPromptDescription: 'This text will be included as context with every request',
      customPromptLabel: 'Additional Prompt',
      customPromptPlaceholder: 'e.g. "Always respond as an expert in..." or "Always consider the following company guidelines..."',
      customPromptTip: 'Tip: Use specific instructions to adapt AI responses to your needs.',
      
      // Response Settings
      responseSettings: 'Response Configuration',
      responseDescription: 'Determine the type and style of AI responses',
      responseLength: 'Response Length',
      responseTone: 'Response Tone',
      creativity: 'Creativity (Temperature)',
      creativityDescription: 'Higher values = more creative, lower = more focused',
      conservative: 'Conservative',
      creative: 'Creative',
      preciseLabel: 'Very precise',
      balancedLabel: 'Balanced',
      creativeLabel: 'Very creative',
      
      // Response Length Options
      short: 'Short & Precise',
      medium: 'Standard',
      long: 'Detailed',
      comprehensive: 'Very detailed',
      
      // Response Tone Options
      professional: 'Professional',
      casual: 'Casual',
      friendly: 'Friendly',
      formal: 'Formal',
      expert: 'Expert level'
    },
    
    // Orchestrator Panel
    orchestratorPanel: {
      configureSettings: 'Configure settings for AI response generation',
      active: 'Active',
      inactive: 'Inactive',
      start: 'Start',
      stop: 'Stop',
      modelConfig: 'Model Configuration',
      modelConfigDescription: 'Select the AI model and basic parameters',
      aiModel: 'AI Model',
      maxTokens: 'Maximum Tokens',
      streamingEnabled: 'Streaming Enabled',
      advancedParams: 'Advanced Parameters',
      advancedParamsDescription: 'Fine-tune AI response generation',
      temperature: 'Temperature',
      topP: 'Top-P',
      frequencyPenalty: 'Frequency Penalty',
      presencePenalty: 'Presence Penalty',
      systemPrompt: 'System Prompt',
      systemPromptDescription: 'Define the behavior and personality of the AI',
      systemPromptPlaceholder: 'Enter the system prompt here...',
      reset: 'Reset'
    },
    
    // Agents
    agents: {
      emailAgent: {
        name: 'Email Agent',
        description: 'Composes and manages email correspondence in professional quality.',
        capabilities: ['Email Composition', 'Scheduling', 'Follow-ups']
      },
      normenAgent: {
        name: 'Standards Agent',
        description: 'Specialized in standards, norms and compliance requirements.',
        capabilities: ['ISO Standards', 'Compliance', 'Standard Verification']
      },
      internetAgent: {
        name: 'Internet Agent',
        description: 'Researches current information from the internet and web sources.',
        capabilities: ['Web Research', 'Current Data', 'Fact Checking']
      },
      jelmoliAgent: {
        name: 'Jelmoli Agent',
        description: 'Company-specific agent for Jelmoli-internal processes and information.',
        capabilities: ['Company Info', 'Internal Processes', 'Product Data']
      }
    },
    
    // Chat Interface
    chat: {
      title: 'Orchestrator Chat',
      placeholder: 'Type your message...',
      send: 'Send',
      thinking: 'Thinking...',
      welcomeMessage: 'Hello! I am your AI Orchestrator. How can I help you today?',
      noActiveAgents: 'No agents activated',
      activeAgents: 'Active Agents',
      
      history: {
        chatUnpinned: 'Chat unpinned',
        chatPinned: 'Chat pinned',
        chatDeleted: 'Chat deleted',
        titleUpdated: 'Title updated',
        folderCreated: 'Folder created',
        chatMoved: 'Chat moved',
        folderColorChanged: 'Folder color changed',
        folderRenamed: 'Folder renamed',
        spaceDeleted: 'Space deleted',
        yesterday: 'Yesterday',
        lastWeek: 'Last Week',
        lastMonth: 'Last Month',
        older: 'Older',
        deleteSpaceMessage: 'Are you sure you want to delete this space? Chats in this space will be moved to "All Chats". This action cannot be undone.',
        allChats: 'All Chats',
        noChatsFound: 'No chats found',
        searchPlaceholder: 'Search...',
        deleteChatTitle: 'Delete Chat',
        deleteChatMessage: 'Are you sure you want to delete this chat?',
        deleteSpaceTitle: 'Delete Space',
        delete: 'Delete',
        pin: 'Pin',
        unpin: 'Unpin',
        rename: 'Rename',
        newSpace: 'New Space',
        newChat: 'New Chat',
        cancel: 'Cancel',
        renameAction: 'Rename',
        cannotUndo: 'This action cannot be undone.',
        search: 'Search',
        unpinAction: 'Unpin',
        pinAction: 'Pin',
        collapse: 'Collapse'
      },
      
      interface: {
        messageDeleted: 'Message deleted',
        messageCopied: 'Message copied',
        addFiles: 'Add files',
        recordAudio: 'Record audio',
        addPhotosAndFiles: 'Add photos and files',
        takeScreenshot: 'Take screenshot',
        takePhoto: 'Take photo',
        deepResearch: 'Deep Research',
        createImage: 'Create image',
        screenshotInDevelopment: 'Screenshot feature in development',
        deepResearchInDevelopment: 'Deep Research in development',
        createImageInDevelopment: 'Create image in development',
        dropFilesHere: 'Drop files here',
        dropFilesDescription: 'PDFs, images and other files',
        copy: 'Copy',
        deleteAction: 'Delete'
      }
    },
    
    // Window Actions
    window: {
      minimize: 'Minimize',
      maximize: 'Maximize',
      restore: 'Restore',
      close: 'Close',
      clickToRestore: 'Click to restore'
    },
    
    // Languages
    languages: {
      de: 'Deutsch',
      en: 'English',
      fr: 'Français',
      'pt-br': 'Português (Brasil)'
    },
    
    // Tenant Administration
    tenantAdmin: {
      title: 'AI Hub Tenant Administration',
      settingsLabel: 'Settings',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      language: 'Language',
      logout: 'Logout',
      version: 'AI Hub v2.4.1',
      sidebar: {
        tenantAdmin: 'Tenant Admin',
        dashboard: 'Dashboard',
        tenantSettings: 'Tenant Settings',
        userRoles: 'Users & Roles',
        modulesFeatures: 'Modules & Features',
        dataManagement: 'Data Management',
        promptsFrameworks: 'Prompts & Frameworks',
        loggingMonitoring: 'Logging & Monitoring',
        supportDocs: 'Support & Documentation',
      },
      tenantSettingsSub: { general: 'General Information', compliance: 'Compliance', euAiAct: 'EU AI Act', dsgvo: 'GDPR', responsibilities: 'Responsibilities', security: 'Security' },
      userManagementSub: { users: 'User Management', dsgvo: 'GDPR Management', roles: 'Roles & Permissions', departments: 'Departments & Prompts' },
      modulesSub: { models: 'LLM Models', overview: 'Orchestrator & Agents' },
      dataSub: { backups: 'Backups & Restore' },
      promptsSub: { library: 'Prompt Library', frameworks: 'Frameworks' },
      monitoringSub: { activity: 'Activity Log', system: 'System Monitoring', alerts: 'Alerts & Notifications' },
      supportSub: {
        documentation: 'Documentation',
        faq: 'Frequently Asked Questions',
        tickets: 'Support Tickets',
        tutorials: 'Video Tutorials',
        api: 'API Documentation',
        contact: 'Contact Us',
      },
      dashboard: {
        title: 'Dashboard', welcome: 'Welcome', overview: 'Overview', quickStats: 'Quick Stats',
        activeUsers: 'Active Users', totalModels: 'Total Models', storageUsed: 'Storage Used', apiCalls: 'API Calls',
        recentActivity: 'Recent Activity', systemHealth: 'System Health', healthy: 'Healthy', noActivity: 'No recent activity'
      },
      settings: {
        title: 'Tenant Settings',
        general: { title: 'General Information', subtitle: 'Basic settings for your tenant', tenantName: 'Tenant Name', 
          tenantId: 'Tenant ID', description: 'Description', contactEmail: 'Contact Email', timezone: 'Timezone', saveChanges: 'Save Changes' },
        security: { title: 'Security & Compliance', subtitle: 'Security settings and compliance policies', 
          twoFactor: 'Two-Factor Authentication', twoFactorDesc: 'Require 2FA for all users', 
          sessionTimeout: 'Session Timeout', minutes: 'Minutes', ipWhitelist: 'IP Whitelist', 
          ipWhitelistDesc: 'Allowed IP addresses', addIp: 'Add IP' },
        access: { title: 'Access & Network', subtitle: 'Network and access settings', publicAccess: 'Public Access', 
          publicAccessDesc: 'Allow public access to certain resources', apiAccess: 'API Access', 
          apiAccessDesc: 'Enable external API access', corsOrigins: 'CORS Origins', 
          corsOriginsDesc: 'Allowed CORS origins', addOrigin: 'Add Origin' },
      },
      userManagement: {
        title: 'User & Role Management',
        users: { title: 'User Management', subtitle: 'Manage user accounts and permissions', searchPlaceholder: 'Search users...', 
          addUser: 'Add User', newUser: 'New User', name: 'Name', email: 'Email', role: 'Role', status: 'Status', lastActive: 'Last Active', 
          actions: 'Actions', active: 'Active', inactive: 'Inactive', edit: 'Edit', delete: 'Delete',
          source: 'Source', localUser: 'Local User', azureAD: 'Azure AD', googleIdentity: 'Google Identity',
          syncUsers: 'Sync Users', allUsers: 'All Users', ssoUsers: 'SSO Users', inactiveUsers: 'Inactive Users',
          neverLoggedIn: 'Never logged in', departments: 'Departments', selectDepartments: 'Select Departments', selected: 'selected',
          exportCSVExcel: 'Export (CSV/Excel)', import: 'Import', manualSync: 'Manual Sync', viewSyncLogs: 'View Sync Logs',
          syncSuccess: 'Users synchronized successfully', syncSuccessDetails: '42 new users, 2 updated',
          accessRightsAndRoles: 'Access Rights & Roles', setUserStatus: 'Set user active/inactive',
          syncFromDirectory: 'This value is synchronized from the directory',
          openInDirectory: 'Open in Directory',
          lastLogin: 'Last Login',
          syncedAt: 'Synchronized At',
          department: 'Department',
          roleAdmin: 'Administrator',
          rolePowerUser: 'Power User',
          roleUser: 'User',
          roleViewer: 'Viewer',
          duplicate: 'Duplicate',
          assignRole: 'Assign Role',
          assignDepartment: 'Assign Department',
          merge: 'Merge',
          approval: 'Approval' },
        roles: { title: 'Roles & Permissions', subtitle: 'Manage roles and permissions', addRole: 'Add Role', 
          roleName: 'Role Name', permissions: 'Permissions', users: 'Users', created: 'Created', 
          actions: 'Actions', edit: 'Edit', delete: 'Delete',
          adminRights: 'Administrative Rights', basicPermissions: 'Basic Permissions', dataRights: 'Data Rights',
          roleManagement: 'Role and permission management', roleManagementDesc: 'Manage roles and permissions' },
        departments: {
          title: 'Prompt Categories & Departments',
          subtitle: 'Assignment of prompt categories to departments or individual users.',
          department: 'Department',
          promptCategories: 'Prompt Categories',
          newDepartment: 'New Department',
          editDepartment: 'Edit Department',
          departmentName: 'Department Name',
          editDepartmentDesc: 'Edit the department and assign prompt categories and users.',
          selectOrCreateDepartment: 'Select department or create new...',
          createNewDepartment: 'Create New Department',
          enterDepartmentName: 'Enter new department name...',
          deleteDepartmentTitle: 'Do you really want to delete this department?',
          deleteDepartmentDesc: 'This action cannot be undone.',
          assignDepartmentTitle: 'Assign Department',
          assignDepartmentDesc: 'Select an existing department or create a new one.',
          selectDepartment: 'Select department...',
          renameDepartmentTitle: 'Rename Department',
          renameDepartmentDesc: 'Enter the new name for the department.',
          newDepartmentName: 'New Department Name',
          noDepartmentAssigned: 'If no department is assigned, individual users can be assigned.',
          assignUsers: 'Assign Users',
          allUsers: 'All Users',
          assignCategories: 'Assign Categories',
          allCategories: 'All Categories',
          save: 'Save',
          cancel: 'Cancel',
          create: 'Create',
          select: 'Select',
          rename: 'Rename',
          active: 'Active',
          inactive: 'Inactive',
          all: 'All',
          // Dialog-specific
          assignPromptCategory: 'Assign Prompt Category',
          promptCategory: 'Prompt Category',
          categoriesSelected: 'categories selected',
          usersSelected: 'users selected',
          users: 'Users',
          searchUsers: 'Search users...',
          status: 'Status',
          edit: 'Edit',
          duplicate: 'Duplicate',
          delete: 'Delete',
          // Table
          managementTitle: 'Prompt Categories Management',
          actions: 'Actions',
          categories: 'Categories',
          noUsersAssigned: 'No users assigned',
          newDepartmentTooltip: 'New Department',
        },
        promptCategories: {
          addNewCategory: 'Add New Prompt Category',
          addNewCategoryDesc: 'Enter the name of the new prompt category.',
          categoryName: 'Category Name',
          renameCategory: 'Rename Prompt Category',
          renameCategoryDesc: 'Enter the new name for the prompt category.',
          newCategoryName: 'New Category Name',
          add: 'Add',
        },
      },
      dataManagement: {
        title: 'Data Management',
        backups: { title: 'Backups & Restore', subtitle: 'Manage data backups and restorations', createBackup: 'Create Backup', 
          backupName: 'Backup Name', size: 'Size', created: 'Created', status: 'Status', actions: 'Actions', 
          restore: 'Restore', download: 'Download', delete: 'Delete', completed: 'Completed', 
          inProgress: 'In Progress', failed: 'Failed', autoBackup: 'Automatic Backup', 
          autoBackupDesc: 'Enable automatic backups', backupFrequency: 'Backup Frequency', 
          daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly' },
      },
      monitoring: {
        activity: { title: 'Activity Log', subtitle: 'Overview of all system activities', filterByUser: 'Filter by User', 
          filterByAction: 'Filter by Action', allUsers: 'All Users', allActions: 'All Actions', timestamp: 'Timestamp', 
          user: 'User', action: 'Action', details: 'Details', ipAddress: 'IP Address' },
        system: { title: 'System Monitoring', subtitle: 'Monitor system performance', cpuUsage: 'CPU Usage', 
          memoryUsage: 'Memory Usage', diskUsage: 'Disk Usage', networkTraffic: 'Network Traffic', uptime: 'Uptime', 
          lastRestart: 'Last Restart', systemHealth: 'System Health', healthy: 'Healthy', warning: 'Warning', critical: 'Critical' },
        alerts: { title: 'Alerts & Notifications', subtitle: 'Manage system alerts and notifications', createAlert: 'Create Alert', 
          alertName: 'Alert Name', type: 'Type', severity: 'Severity', status: 'Status', created: 'Created', 
          actions: 'Actions', edit: 'Edit', delete: 'Delete', active: 'Active', inactive: 'Inactive', 
          high: 'High', medium: 'Medium', low: 'Low' },
      },
      support: {
        title: 'Support & Documentation',
        overview: { title: 'Overview', welcome: 'Welcome to Support', description: 'Find help, documentation, and support resources here', 
          gettingStarted: 'Getting Started', gettingStartedDesc: 'Start here with AI Hub', 
          documentation: 'Documentation', documentationDesc: 'Complete product documentation', 
          support: 'Support', supportDesc: 'Contact our support team', 
          updates: 'Updates & News', updatesDesc: 'Latest updates and changes' },
        documentation: { title: 'Documentation', search: 'Search documentation...', categories: 'Categories', 
          gettingStarted: 'Getting Started', userGuide: 'User Guide', adminGuide: 'Admin Guide', 
          apiDocs: 'API Documentation', troubleshooting: 'Troubleshooting' },
        faq: { title: 'FAQ', search: 'Search FAQ...', categories: 'Categories', general: 'General', 
          technical: 'Technical', billing: 'Billing', security: 'Security' },
        tickets: { title: 'Support Tickets', createTicket: 'Create Ticket', ticketNumber: 'Ticket Number', 
          subject: 'Subject', status: 'Status', priority: 'Priority', created: 'Created', actions: 'Actions', 
          open: 'Open', inProgress: 'In Progress', resolved: 'Resolved', closed: 'Closed', view: 'View' },
        contact: { title: 'Contact', description: 'Get in touch with our support team', email: 'Email', 
          phone: 'Phone', availability: 'Availability', emergencySupport: 'Emergency Support', 
          sendMessage: 'Send Message', name: 'Name', emailLabel: 'Email', message: 'Message', submit: 'Submit' },
      },
      
      supportDocumentation: {
        title: 'Support & Documentation',
        ticketStatus: {
          open: 'Open',
          inProgress: 'In Progress',
          resolved: 'Resolved',
          closed: 'Closed',
        },
        ticketPriority: {
          low: 'Low',
          medium: 'Medium',
          high: 'High',
          urgent: 'Urgent',
        },
        documentation: {
          searchTitle: 'Browse Documentation',
          searchDescription: 'Find guides, best practices and technical references',
          searchPlaceholder: 'Search documentation...',
          learnMore: 'Learn more',
          noDocsFound: 'No documentation found',
          downloads: 'Downloads',
          downloadsDescription: 'Manuals and additional resources',
          userManual: 'AI Hub User Manual',
          adminGuide: 'Administrator Guide',
          apiDocs: 'API Documentation',
          download: 'Download',
          items: {
            gettingStarted: { 
              title: 'Getting Started with AI Hub', 
              description: 'Learn the basics of the platform and set up your first environment.',
              category: 'Getting Started'
            },
            userRoleManagement: { 
              title: 'User & Role Management', 
              description: 'Manage users, roles and permissions in your tenant.',
              category: 'Administration'
            },
            agentConfiguration: { 
              title: 'Agent Configuration', 
              description: 'Detailed guide for configuring the various AI agents.',
              category: 'Agents'
            },
            backupRecovery: { 
              title: 'Backup & Recovery', 
              description: 'Create backups and restore your data in case of emergency.',
              category: 'Data Management'
            },
            securityCompliance: { 
              title: 'Security & Compliance', 
              description: 'Best practices for security, 2FA and compliance requirements.',
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
            },
          },
        },
        faq: {
          title: 'Frequently Asked Questions',
          description: 'Find quick answers to common questions',
          needMoreHelp: 'Need More Help?',
          needMoreHelpDesc: 'If you can\'t find your question here, you can navigate to other support areas via the sidebar',
          management: 'FAQ Management',
          managementDesc: 'Manage frequently asked questions',
          createNew: 'Create New FAQ',
          editFaq: 'Edit FAQ',
          panelCreateTitle: 'Create New FAQ',
          panelEditTitle: 'Edit FAQ',
          questionLabel: 'Question',
          categoryLabel: 'Category',
          answerLabel: 'Answer',
          tips: 'Tips for Good FAQs:',
          tip1: 'Formulate questions as users would ask them',
          tip2: 'Keep answers concise and understandable',
          tip3: 'Use examples for clarity',
          tip4: 'Link to further documentation',
          minCharsRecommended: 'At least 50 characters recommended',
          createButton: 'Create FAQ',
          saveChanges: 'Save Changes',
          successCreated: 'FAQ created',
          successUpdated: 'FAQ updated',
          changesSaved: 'Changes have been saved.',
          categories: {
            general: 'General',
            technical: 'Technical',
            billing: 'Billing',
            security: 'Security',
            setup: 'Setup',
            troubleshooting: 'Troubleshooting',
          },
        },
        tickets: {
          createTitle: 'Create New Support Ticket',
          createDescription: 'Describe your issue and our team will get back to you promptly',
          yourTicketsTitle: 'Your Support Tickets',
          yourTicketsDescription: 'Overview of your current and past requests',
          subjectLabel: 'Subject',
          priorityLabel: 'Priority',
          messageLabel: 'Message',
          submitButton: 'Submit Ticket',
          noTickets: 'No support tickets available',
          created: 'Created',
          updated: 'Updated',
          successTitle: 'Support Ticket Created!',
          confirmationEmail: 'You will receive a confirmation email.',
        },
        tutorials: {
          title: 'Video Tutorials',
          description: 'Step-by-step video guides for all important features',
          duration: 'Duration',
          items: {
            gettingStarted: { 
              title: 'Getting Started with AI Hub', 
              description: 'Introduction to the platform and basic navigation',
              duration: '8:42 min'
            },
            userRoleManagement: { 
              title: 'User and Role Management', 
              description: 'Create users, assign roles and manage permissions',
              duration: '12:15 min'
            },
            modelConfiguration: { 
              title: 'Configuring LLM Models', 
              description: 'Set up API keys and test models',
              duration: '10:30 min'
            },
            agentSetup: { 
              title: 'Setting up Agents', 
              description: 'Configure Email Agent, Internet Agent and more',
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
            },
          },
        },
        api: {
          title: 'API Documentation',
          description: 'REST API Reference for Developers',
          authentication: 'Authentication',
          baseUrl: 'Base URL',
          endpoints: 'Endpoints',
          endpointGetAgents: 'Retrieve list of all available agents',
          endpointPostAgentExecute: 'Execute an agent with a request',
          endpointGetModels: 'List of all configured LLM models',
          endpointGetUsers: 'Retrieve users and their permissions',
          endpointPostBackup: 'Create new backup',
          downloadFullDocs: 'Download complete API documentation (PDF)',
          codeExamples: 'Code Examples',
          codeExamplesDescription: 'Integration into your application',
        },
        contact: {
          supportTitle: 'Support Contact',
          supportDescription: 'Reach our support team',
          emailSupport: 'Email Support',
          phoneSupport: 'Phone Support',
          emergencyHotline: '24/7 Emergency Hotline',
          responseTime: 'Response Time',
          availability: 'Availability',
          salesTitle: 'Sales & Partnerships',
          salesDescription: 'For questions about licenses and collaboration',
          sales: 'Sales',
          partnerships: 'Partnerships',
          companyTitle: 'Company',
          companyDescription: 'RMB Group & neuco AG',
          companyInfo: 'AI Hub is jointly developed by RMB Group and neuco AG',
          headquarters: 'Headquarters: Zurich, Switzerland',
          emergencyOnly: 'For critical system failures only',
          mondayFriday: 'Mon-Fri, 08:00 - 18:00',
        },
      },
      
      models: { title: 'Model Management', subtitle: 'Manage AI models and their configurations', addModel: 'Add Model', 
        modelName: 'Model Name', provider: 'Provider', version: 'Version', status: 'Status', lastUsed: 'Last Used', 
        actions: 'Actions', active: 'Active', inactive: 'Inactive', configure: 'Configure', delete: 'Delete',
        edit: 'Edit', cancel: 'Cancel', save: 'Save', deleteConfirm: 'Confirm Deletion',
        deleteMessage: 'Are you sure you want to delete this model? This action cannot be undone.',
        // Dialog
        editModel: 'Edit Model',
        basicInfo: 'Basic Information',
        modelNameLabel: 'Model Name *',
        modelNameHelp: 'A descriptive name for internal reference',
        providerLabel: 'Provider *',
        modelIdLabel: 'Model ID *',
        modelIdHelp: 'The technical model ID from the provider',
        apiConfiguration: 'API Configuration',
        apiKeyInfo: 'API keys are stored encrypted and are only visible in the system',
        apiKeyLabel: 'API Key *',
        notes: 'Notes',
        notesPlaceholder: 'Additional information or configuration details...' },
      moduleOverview: { title: 'Module Overview', subtitle: 'Overview of all available modules', moduleName: 'Module Name', 
        status: 'Status', version: 'Version', users: 'Users', actions: 'Actions', enabled: 'Enabled', 
        disabled: 'Disabled', configure: 'Configure', disable: 'Disable', enable: 'Enable',
        newAgent: 'New Agent', editAgent: 'Edit Agent', agentName: 'Agent Name', agentDescription: 'Description',
        agentType: 'Agent Type', agentCapabilities: 'Capabilities', addCapability: 'Add Capability',
        removeCapability: 'Remove', capabilityPlaceholder: 'e.g. Send emails, Analyze data...', saveAgent: 'Save Agent' },
      
      thinkTank: {
        title: 'Think Tank', subtitle: 'Multi-Perspective Scenario Analysis',
        scenario: 'Scenario / Question', scenarioPlaceholder: 'Describe your scenario or question...',
        perspectives: 'Perspectives', addPerspective: 'Add Perspective', removePerspective: 'Remove',
        startSession: 'Start Session', stopSession: 'Stop Session', clearSession: 'Reset Session',
        thinking: 'Analyzing...', perspectivePlaceholder: 'e.g. CEO, CTO, Customer, Investor...'
      },
      
      roleManagement: {
        newRole: 'Create New Role', editRole: 'Edit Role', roleName: 'Role Name',
        roleDescription: 'Description', permissions: 'Permissions', assignedUsers: 'Assigned Users',
        selectUsers: 'Select Users', usersSelected: 'selected', searchUsers: 'Search users...',
        allUsers: 'All Users', selectAll: 'Select All', deselectAll: 'Deselect All',
        saveRole: 'Save Role', deleteRole: 'Delete Role',
        subtitle: 'Modify role information and permissions',
        basicInfo: 'Basic Information',
        roleNameLabel: 'Role Name *',
        roleNamePlaceholder: 'e.g. Content Manager',
        descriptionLabel: 'Description',
        descriptionPlaceholder: 'Brief description of the role',
        usersLabel: 'Assigned Users',
        users: 'Users',
        noUsersAssigned: 'No users assigned',
        permissionsLabel: 'Permissions',
        selectNone: 'None',
        basicPermissions: 'Basic Permissions',
        adminRights: 'Administrative Rights',
        dataRights: 'Data Rights',
        permCreate: 'Create',
        permRead: 'Read',
        permUpdate: 'Update',
        permDelete: 'Delete',
        permManageUsers: 'Manage Users',
        permManageSettings: 'Manage Settings',
        permManageRoles: 'Manage Roles',
        permViewReports: 'View Reports',
        permExportData: 'Export Data',
        permImportData: 'Import Data'
      },
      
      userManagementExtended: {
        department: 'Department', departments: 'Departments', selectDepartments: 'Select Departments',
        departmentsSelected: 'selected', newDepartment: 'New Department', allUsers: 'All Users',
        filterByDepartment: 'Filter by Department', showAllUsers: 'Show All Users',
        showActiveOnly: 'Active Users Only', editUser: 'Edit User', newUser: 'New User',
        firstName: 'First Name', lastName: 'Last Name', phoneNumber: 'Phone Number',
        position: 'Position', hireDate: 'Hire Date', selectRole: 'Select Role',
        selectStatus: 'Select Status', saveUser: 'Save User'
      },
      
      modelManagementExtended: {
        newModel: 'New Model', editModel: 'Edit Model', modelType: 'Model Type',
        apiKey: 'API Key', endpoint: 'Endpoint', maxTokens: 'Max Tokens',
        temperature: 'Temperature', topP: 'Top P', saveModel: 'Save Model', testModel: 'Test Model',
        title: 'LLM Model Management',
        statsTotal: 'Total',
        statsActive: 'Active',
        statsInactive: 'Inactive',
        statsError: 'Error',
        configuredModels: 'Configured Models',
        modelsCount: 'models',
        model: 'Model',
        modelId: 'Model ID',
        sort: 'Sort',
        lastTested: 'Last Tested',
        usedBy: 'Used By',
        actions: 'Actions',
        noModelsFound: 'No models found',
        addNewModel: 'Add New Model',
        modelName: 'Model Name',
        modelNameRequired: 'Model Name *',
        modelIdRequired: 'Model ID *',
        modelIdDescription: 'Technical model ID from the provider',
        lastTest: 'Last Test',
        never: 'Never',
        deleteConfirm: 'Confirm Deletion',
        deleteConfirmMessage: 'Are you sure you want to delete this model? This action cannot be undone.',
        // Dialog sections
        basicInformation: 'Basic Information',
        modelNameHelper: 'A descriptive name for internal reference',
        apiConfiguration: 'API Configuration',
        apiKeySecurityNotice: 'API keys are stored encrypted and are only visible within the system',
        notes: 'Notes',
        endpointHelper: 'Base URL for API requests (required for Azure or Custom Endpoints)',
        usage: 'Usage',
        addedDate: 'Added',
        usedIn: 'Used in',
        notYetUsed: 'Not yet used',
        modelNameLabel: 'Model Name *',
        apiKeyLabel: 'API Key *',
        providerLabel: 'Provider *',
        modelIdLabel: 'Model ID *',
        endpointLabel: 'API Endpoint',
        statusLabel: 'Status'
      },
      
      alertsExtended: {
        newAlert: 'New Alert', editAlert: 'Edit Alert', alertType: 'Alert Type',
        alertMessage: 'Message', alertThreshold: 'Threshold', alertRecipients: 'Recipients',
        addRecipient: 'Add Recipient', emailNotification: 'Email Notification',
        smsNotification: 'SMS Notification', saveAlert: 'Save Alert'
      },
      
      supportExtended: {
        manageFAQ: 'Manage FAQ', newFAQ: 'New FAQ', editFAQ: 'Edit FAQ',
        faqQuestion: 'Question', faqAnswer: 'Answer', faqCategory: 'Category',
        saveFAQ: 'Save FAQ', deleteFAQ: 'Delete FAQ', ticketSuccess: 'Ticket Successfully Created',
        ticketSubmitted: 'Your support ticket has been successfully created.',
        ticketNumber: 'Ticket Number', backToSupport: 'Back to Support', viewTicket: 'View Ticket'
      },
      
      activityLog: {
        actions: {
          backupCreated: 'Backup Created',
          userCreated: 'User Created',
          loginFailed: 'Login Failed',
          configChanged: 'Configuration Changed',
          autoBackup: 'Automatic Backup',
          roleAssigned: 'Role Assigned',
          dbConnectionFailed: 'Database Connection Failed',
          healthCheck: 'Daily Health Check'
        },
        resources: {
          userManagement: 'User Management',
          authentication: 'Authentication',
          normenAgent: 'Standards Agent',
          userAnalyticsDB: 'User Analytics DB',
          agentConfigDB: 'Agent Configuration DB',
          system: 'System',
          aiHubMainDB: 'AI Hub Main DB'
        },
        details: {
          invalidPassword: 'Invalid Password'
        },
        ui: {
          title: 'Activity Log',
          description: 'Monitor all system activities and user actions',
          searchPlaceholder: 'Search logs...',
          filterByStatus: 'Filter by Status',
          allStatuses: 'All Statuses',
          success: 'Success',
          warning: 'Warning',
          error: 'Error',
          info: 'Info',
          warnings: 'Warnings',
          errors: 'Errors',
          information: 'Information',
          exportLogs: 'Export Logs',
          clearFilters: 'Clear Filters',
          activitiesCount: 'Activities',
          chronologicalListing: 'Chronological listing of all system activities',
          export: 'Export',
          timestamp: 'Timestamp',
          user: 'User',
          action: 'Action',
          resource: 'Resource',
          status: 'Status',
          ip: 'IP Address',
          details: 'Details',
          sort: 'Sort',
          resetFilters: 'Reset Filters',
          successful: 'Successful',
          ipAddress: 'IP Address'
        }
      },
      
      dashboardExtended: {
        stats: {
          activeModules: 'Active Modules',
          processedToday: 'Processed Today',
          avgResponseTime: 'Avg. Response Time',
          systemLoad: 'System Load',
          requests: 'Requests',
          seconds: 'Seconds',
          cpu: 'CPU'
        },
        modules: {
          chatAgent: 'Chat Agent',
          documentAnalyzer: 'Document Analyzer',
          calendarAssistant: 'Calendar Assistant',
          dataAnalyst: 'Data Analyst',
          securityMonitor: 'Security Monitor'
        },
        ui: {
          welcomeBack: 'Welcome back',
          overviewText: 'Here is an overview of your AI system and current activities.',
          recentActivity: 'Recent Activity',
          recentActivityDesc: 'Current system events and changes',
          systemStatus: 'System Status',
          systemStatusDesc: 'Current modules and their usage',
          viewAllActivities: 'View All Activities',
          detailedMetrics: 'Detailed Metrics',
          quickActions: 'Quick Actions',
          quickActionsDesc: 'Frequently used functions for quick access',
          newChat: 'New Chat',
          configureAI: 'Configure AI',
          manageModules: 'Manage Modules',
          settings: 'Settings',
          statusActive: 'Active',
          statusWarning: 'Warning',
          statusError: 'Error'
        },
        cards: {
          users: 'Users',
          modules: 'Modules',
          agents: 'Agents',
          apiCalls: 'API Calls',
          active: 'active',
          inactive: 'inactive',
          moreAvailable: 'more available',
          thisMonth: 'this month'
        },
        quickStats: {
          uptime: 'Uptime',
          activeSessions: 'Active Sessions',
          regions: 'Regions'
        },
        systemMessages: {
          planExpiring: 'Your plan expires in {days} days',
          newVersionAvailable: 'New version {version} available'
        },
        activities: {
          newUserCreated: 'New user created',
          backupCompleted: 'Backup successfully completed',
          roleUpdated: 'Role \'{role}\' updated',
          apiRateLimitReached: 'API rate limit reached',
          moduleActivated: 'Module \'{module}\' activated',
          chatAgentActivated: 'Chat Agent was activated',
          requestsProcessed: '1,234 requests successfully processed',
          temperatureChanged: 'AI temperature changed to 0.7',
          timeAgo: {
            minutes: '{count} min ago',
            hour: '1 hour ago',
            hours: '{count} hours ago'
          }
        },
        notifications: {
          userLoggedIn: 'User {username} logged in'
        }
      },
      
      dataManagementExtended: {
        backups: {
          scheduledBackup: 'Scheduled Backup',
          manualBackup: 'Manual Backup',
          allDatabases: 'All Databases'
        },
        ui: {
          title: 'Backups & Recovery',
          databases: 'Databases',
          successful: 'Successful',
          failed: 'Failed',
          newBackup: 'Create New Backup',
          newBackupDesc: 'Create a manual backup of your databases',
          backupName: 'Backup Name',
          backupNamePlaceholder: 'e.g. Production Backup before Update',
          selectDatabase: 'Select Database',
          creating: 'Backup is being created...',
          createBackup: 'Create Backup',
          uploadBackup: 'Upload Backup',
          databasesTitle: 'Databases',
          databasesDesc: 'Overview of all available databases',
          name: 'Name',
          size: 'Size',
          tables: 'Tables',
          lastBackup: 'Last Backup',
          actions: 'Actions',
          backup: 'Backup',
          backupHistory: 'Backup History',
          backupHistoryDesc: 'All created backups with versioning',
          database: 'Database',
          version: 'Version',
          date: 'Date',
          type: 'Type',
          status: 'Status',
          sort: 'Sort',
          resetFilters: 'Reset Filters',
          manual: 'Manual',
          automatic: 'Automatic',
          statusCompleted: 'Completed',
          statusInProgress: 'In Progress',
          statusFailed: 'Failed',
          download: 'Download File',
          restore: 'Restore',
          delete: 'Delete',
          deleteTitle: 'Delete Backup?',
          deleteMessage: 'Are you sure you want to delete this backup? This action cannot be undone.',
          restoreTitle: 'Restore Backup?',
          restoreMessage: 'Are you sure you want to restore this backup? The current data will be overwritten.',
          backupLabel: 'Backup',
          databaseLabel: 'Database',
          versionLabel: 'Version',
          dateLabel: 'Date',
          confirmRestore: 'Restore',
          beingCreated: 'Being created...'
        }
      },
      
      alertsManagement: {
        title: 'Alerts & Notifications',
        stats: {
          activeAlerts: 'Active Alerts',
          unacknowledged: 'Unacknowledged',
          triggers24h: 'Triggers (24h)',
          totalAlerts: 'Total Alerts'
        },
        notifications: {
          title: 'Recent Notifications',
          subtitle: 'Latest alert notifications and their status',
          acknowledge: 'Acknowledge'
        },
        rules: {
          title: 'Alert Rules',
          subtitle: 'Manage your alert configurations',
          searchPlaceholder: 'Search alerts...'
        },
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
          status: 'Status',
          lastTriggered: 'Last Triggered',
          actions: 'Actions',
          sort: 'Sort'
        },
        status: {
          active: 'Active',
          inactive: 'Inactive'
        },
        channels: {
          email: 'Email',
          slack: 'Slack'
        },
        actions: {
          edit: 'Edit',
          duplicate: 'Duplicate',
          delete: 'Delete'
        },
        createPanel: {
          titleNew: 'New Alert',
          titleEdit: 'Edit Alert',
          subtitleNew: 'Configure a new alert',
          subtitleEdit: 'Modify alert settings',
          nameLabel: 'Alert Name',
          namePlaceholder: 'e.g. High CPU Usage',
          typeLabel: 'Type',
          conditionLabel: 'Condition',
          conditionPlaceholder: 'e.g. CPU Usage > 85%',
          thresholdLabel: 'Threshold',
          thresholdPlaceholder: 'e.g. 85%',
          channelsLabel: 'Notification Channels',
          buttonSave: 'Save',
          buttonCancel: 'Cancel',
          buttonCreate: 'Create Alert'
        },
        deleteDialog: {
          title: 'Delete Alert?',
          message: 'Are you sure you want to delete this alert? This action cannot be undone.',
          confirm: 'Delete',
          cancel: 'Cancel'
        }
      },
      
      accountExtended: {
        displayNamePlaceholder: 'Your display name'
      },
      
      systemMonitoringExtended: {
        title: 'System Monitoring',
        serviceStatus: 'Service Status',
        servicesOnline: 'of',
        servicesOf: 'services online',
        degraded: 'degraded',
        online: 'Online',
        offline: 'Offline',
        restricted: 'Degraded',
        uptime: 'Uptime',
        responseTime: 'Response Time',
        resourceUsage24h: 'Resource Usage % (24h)',
        resourceUsageSubtitle: 'CPU, RAM, DISK & Network',
        apiRequests24h: 'API Requests (24h)',
        apiRequestsSubtitle: 'Number of processed requests',
        network: 'Network',
        totalApiCalls: 'Total API Calls',
        vsYesterday: 'vs. yesterday',
        avgResponseTime: 'Avg Response Time',
        systemUptime: 'System Uptime',
        days: 'days',
        hours: 'hrs',
        requests: 'Requests',
        services: {
          aiHubAPI: 'AI Hub API',
          emailAgent: 'Email Agent Service',
          normenAgent: 'Standards Agent Service',
          internetAgent: 'Internet Agent Service',
          jelmoliAgent: 'Jelmoli Agent Service',
          databaseCluster: 'Database Cluster',
          authenticationService: 'Authentication Service',
          fileStorage: 'File Storage'
        }
      },
      
      loginExtended: {
        logoAlt: 'AIHUB Logo',
        tenants: {
          rmbGroup: 'RMB Group',
          neuco: 'neuco'
        }
      },
      
      dashboardFull: {
        stats: {
          activeModules: 'Active Modules',
          processedToday: 'Processed Today'
        },
        modules: {
          chatAgent: 'Chat Agent',
          documentAnalyzer: 'Document Analyzer',
          calendarAssistant: 'Calendar Assistant',
          dataAnalyst: 'Data Analyst',
          securityMonitor: 'Security Monitor'
        }
      },
      
      modelManagementFull: {
        providers: {
          geminiPro: 'Gemini Pro',
          googleAI: 'Google AI',
          azureOpenAI: 'Azure OpenAI',
          awsBedrock: 'AWS Bedrock',
          mistralAI: 'Mistral AI',
          cohere: 'Cohere',
          customEndpoint: 'Custom Endpoint'
        },
        dialog: {
          addNewModel: 'Add New Model',
          editModel: 'Edit Model',
          addModel: 'Add Model',
          save: 'Save',
          selectModel: 'Select Model'
        }
      },
      
      placeholders: {
        systemPrompt: 'Enter system prompt...',
        searchDots: 'Search...',
        spaceName: 'Enter space name...',
        email: 'your.email@company.com',
        phone: '+1 XXX XXX XXXX',
        jobTitle: 'e.g. Software Developer',
        department: 'e.g. IT, Marketing, Sales',
        modelName: 'e.g. GPT-4 Turbo Production',
        selectProvider: 'Select a provider',
        modelId: 'e.g. gpt-4-turbo-preview',
        apiKey: 'sk-...',
        endpoint: 'https://...',
        notes: 'Additional information or configuration details...',
        agentName: 'e.g. Customer Service Agent',
        agentDescription: 'Describe the function of this agent...',
        version: '1.0.0',
        agentEndpoint: 'https://api.aihub.internal/agents/...',
        storageUrl: 'https://storage.example.com/...',
        storageToken: 'stg-...',
        agentApiKey: 'agt-...',
        searchDocumentation: 'Search documentation...',
        ticketSubject: 'Brief description of your issue',
        ticketMessage: 'Describe your problem or question in detail...',
        faqQuestion: 'e.g. How do I enable two-factor authentication?',
        faqAnswer: 'Enter a detailed answer to the question...',
        passwordMinLength: 'Password must be at least 6 characters long'
      },
      
      moduleOverviewFull: {
        notConfigured: 'Not configured',
        selectModel: 'Select model',
        orchestratorDiagram: 'Orchestrator Flowchart',
        statsModulesTotal: 'Total Modules',
        statsActive: 'Active',
        statsInactive: 'Inactive',
        statsError: 'Error',
        title: 'Orchestrator & Agents',
        addModule: 'Add Module',
        orchestratorTitle: 'Orchestrator',
        orchestratorDescription: 'Central control unit for all AI agents and workflows',
        orchestratorQuery: 'Orchestrator Query',
        llmConfiguration: 'LLM Configuration',
        llm1: 'LLM 1',
        llm2: 'LLM 2',
        prompt: 'Prompt',
        edit: 'Edit',
        agentsTitle: 'Agents',
        agentConfiguration: 'Agent Configuration',
        apiEndpoint: 'API Endpoint',
        apiKey: 'API Key',
        testConnection: 'Test Connection',
        testing: 'Testing...',
        storage: 'Storage',
        storageAccessUrl: 'Storage (Access URL)',
        storageToken: 'Storage (Token)',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        deleteConfirmTitle: 'Delete Module',
        deleteConfirmDescription: 'Are you sure you want to delete this module? This action cannot be undone.',
        version: 'Version',
        lastSync: 'Last Sync',
        category: 'Category',
        public: 'Public',
        private: 'Private',
        riskCategory: 'Risk Category',
        low: 'Low',
        high: 'High',
        icon: 'Icon',
        agentName: 'Agent Name',
        description: 'Description',
        apiKeysEncrypted: 'API keys are encrypted',
        deleteAgent: 'Delete Agent',
        deleteAgentConfirmation: 'Are you sure you want to delete this agent? This action cannot be undone.',
        addNewAgent: 'Add New Agent',
        basicInformation: 'Basic Information',
        addAgent: 'Add Agent',
        agents: {
          jelmoliAgent: 'Jelmoli Agent',
          emailAgent: 'Email Agent',
          internetAgent: 'Internet Agent',
          normenAgent: 'Standards Agent'
        },
        agentDescriptions: {
          emailAgent: 'Processes and generates emails with AI support',
          internetAgent: 'Performs web searches and internet research',
          jelmoliAgent: 'Jelmoli-specific assistant for customer inquiries',
          normenAgent: 'Searches and analyzes technical standards and norms'
        },
        prompts: {
          orchestrator1: 'You are an AI orchestrator that coordinates various agents.',
          orchestrator2: 'Analyze the request and forward it to the appropriate agent.'
        },
        models: {
          geminiPro: 'Gemini Pro',
          azureGPT4: 'Azure GPT-4'
        }
      },
      
      orchestratorExtended: {
        selectModel: 'Select model'
      },
      
      alertsSampleData: {
        serviceOffline: 'Service Offline',
        backupFailed: 'Backup Failed',
        unusualTraffic: 'Unusual Traffic',
        backupFailedMessage: 'Scheduled backup at 03:00 AM failed. Error code: DB_TIMEOUT'
      },
      
      dataManagementFull: {
        scheduledBackup: 'Scheduled Backup',
        manualBackup: 'Manual Backup',
        allDatabases: 'All Databases'
      },
      
      chatSampleData: {
        productInquiryJelmoli: 'Product Inquiry Jelmoli',
        productAvailability: 'Product Availability'
      },
      
      roleManagementPermissions: {
        read: 'Read',
        write: 'Write',
        delete: 'Delete',
        manageUsers: 'Manage Users',
        manageSettings: 'Manage Settings',
        manageRoles: 'Manage Roles',
        viewReports: 'View Reports',
        exportData: 'Export Data',
        importData: 'Import Data'
      },
      
      chatExtended: {
        filesAttached: 'Files Attached',
        detailedResponseFrom: 'Detailed response from {agentId} to "{message}"',
        detailedResponseContent: 'This is the specific, detailed analysis and response from this agent with all relevant details and information that this agent can provide.',
        basedOnAnalysis: 'Based on the analysis of all {count} active agents regarding your request "{message}"',
        orchestratorSummary: 'The Orchestrator AI has interpreted and summarized the responses. This is an intelligent synthesis of information from all sources ({modules}), providing you with a clear, understandable answer.',
        forDetailedInfo: 'For detailed information from individual agents, click on the corresponding badges below.',
        filesAdded: '{count} file(s) added'
      }
    },
    
    // Prompts & Frameworks
    promptsFrameworks: {
      // Tabs/Headers
      promptLibrary: 'Prompt Library',
      frameworks: 'Frameworks',
      
      // Actions
      edit: 'Edit',
      duplicate: 'Duplicate',
      createNew: 'Create New',
      delete: 'Delete',
      
      // Labels
      promptLabel: 'Prompt:',
      structureLabel: 'Structure:',
      title: 'Title',
      description: 'Description',
      category: 'Category',
      
      // Counts
      promptsCount: 'Prompts',
      frameworksCount: 'Frameworks',
      
      // Headers
      promptCategories: 'Prompt Categories',
      promptCategoriesDescription: 'Select a category to view available prompts',
      frameworkCategories: 'Framework Categories',
      frameworkCategoriesDescription: 'Select a category to view available frameworks',
      
      // Search
      searchPlaceholder: 'Search categories...',
      noCategoriesFound: 'No categories found',
      
      // Edit Panel
      editPrompt: 'Edit Prompt',
      editFramework: 'Edit Framework',
      duplicatePrompt: 'Duplicate Prompt',
      duplicateFramework: 'Duplicate Framework',
      createNewPrompt: 'Create New Prompt',
      createNewFramework: 'Create New Framework',
      
      // Form Fields
      titleLabel: 'Title',
      titlePlaceholder: 'Prompt Title',
      frameworkTitlePlaceholder: 'Framework Title',
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Brief description of the prompt',
      frameworkDescriptionPlaceholder: 'Brief description of the framework',
      promptPlaceholder: 'Prompt Text',
      frameworkPlaceholder: 'Framework Structure',
      promptContentLabel: 'Prompt',
      frameworkContentLabel: 'Structure',
      
      // Buttons
      saveButton: 'Save',
      cancelButton: 'Cancel',
      
      // Delete Dialog
      deletePromptTitle: 'Delete Prompt',
      deleteFrameworkTitle: 'Delete Framework',
      deletePromptMessage: 'Are you sure you want to delete this prompt? This action cannot be undone.',
      deleteFrameworkMessage: 'Are you sure you want to delete this framework? This action cannot be undoned.',
      confirmDelete: 'Delete',
      
      // Copy suffix
      copySuffix: '(Copy)',
      
      // Category Names
      categoryNames: {
        market: 'Market & Competition',
        planning: 'Planning & Implementation',
        strategy: 'Strategy & Growth',
        sales: 'Sales',
        service: 'Customer Service',
        finance: 'Finance & Reporting',
        hr: 'HR & Recruiting',
        learning: 'Learning & Knowledge',
        organization: 'Organization & Collaboration',
        coaching: 'Coaching & Development',
        promptEngineering: 'Prompt Creation & Optimization',
        quality: 'Quality & Output Improvement',
        criticalAnalysis: 'Critical Analysis & Pre-Questions',
        // Frameworks
        mission: 'Mission Frameworks',
        thinking: 'Thinking Frameworks',
        expression: 'Expression Frameworks',
        interaction: 'Interaction Frameworks'
      },
      
      // Category Descriptions
      categoryDescriptions: {
        market: 'Market analysis, competitive intelligence and positioning',
        planning: 'Project planning, roadmaps and implementation strategies',
        strategy: 'Business strategies, growth planning and innovation',
        sales: 'Prompts for sales conversations, customer acquisition and sales strategies',
        service: 'Customer support, communication and service excellence',
        finance: 'Financial planning, controlling and business reports',
        hr: 'Recruiting, employee development and HR processes',
        learning: 'Knowledge transfer, training and documentation',
        organization: 'Teamwork, processes and collaboration',
        coaching: 'Personal development, mentoring and feedback',
        promptEngineering: 'Create and improve effective AI prompts',
        quality: 'Increase and refine output quality',
        criticalAnalysis: 'Question and refine requirements',
        // Frameworks
        mission: 'Frameworks for structured creation of tasks and precise instructions',
        thinking: 'Frameworks for clear thought structures and strategic thinking',
        expression: 'Frameworks for targeted communication and content production',
        interaction: 'Frameworks for cooperative communication, coaching and iterative processes'
      }
    }
  },
  
  fr: {
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    close: 'Fermer',
    open: 'Ouvrir',
    settings: 'Param��tres',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Avertissement',
    
    // Login
    login: {
      title: 'Connexion AI Hub',
      subtitle: 'Connectez-vous pour accéder aux modules IA',
      username: 'Nom d\'utilisateur',
      password: 'Mot de passe',
      loginButton: 'Se connecter',
      forgotPassword: 'Mot de passe oublié ?',
      invalidCredentials: 'Identifiants invalides',
      welcomeBack: 'Bon retour !',
      // 2FA
      twoFactorTitle: 'Authentification à Deux Facteurs',
      twoFactorSubtitle: 'Entrez le code à 6 chiffres',
      twoFactorAuthDescription: 'Veuillez entrer le code à 6 chiffres de votre application d\'authentification',
      codeLabel: 'Code de vérification',
      codePlaceholder: '000000',
      verifyButton: 'Vérifier le code',
      invalidCode: 'Code invalide',
      resendCode: 'Renvoyer le code',
      confirmButton: 'Confirmer',
      // Login form fields
      selectTenantLabel: 'Sélectionner Tenant',
      selectTenantPlaceholder: 'Choisissez un tenant',
      passwordPlaceholder: 'Mot de passe',
      versionLabel: 'Version',
      desktopLabel: 'Bureau',
      mobileLabel: 'Mobile',
      copyright: '© 2025. Tous droits réservés.',
      // Error messages
      errorSelectTenant: 'Veuillez sélectionner un tenant',
      errorPasswordEmpty: 'Le mot de passe ne peut pas être vide',
      errorPasswordTooShort: 'Le mot de passe doit contenir au moins 4 caractères',
      errorInvalidPassword: 'Mot de passe invalide. Utilisez : password, 1234, test ou demo',
      errorCode6Digits: 'Veuillez entrer un code à 6 chiffres',
      errorInvalidCode: 'Code invalide. Utilisez : 123456, 000000 ou 111111',
      // Demo hints
      demoCodeHint: 'Astuce : Utilisez 123456, 000000 ou 111111 pour la démo'
    },
    
    // Header
    header: {
      aiHub: 'AI Hub',
      chat: 'Chat',
      options: 'Options',
      logout: 'Déconnexion',
      welcomeMessage: 'Bienvenue',
      tenantAdministrator: 'Administrateur de Tenant',
      tagline: 'maîtrisez vos données'
    },
    
    // Admin Menus
    admin: {
      tenant: {
        title: 'Tenant',
        selectTenant: 'Sélection Tenant',
        agentAssignment: 'Attribution Agent',
        api: 'API',
        permissions: 'Autorisations'
      },
      profile: {
        title: 'Profil',
        account: 'Compte',
        logout: 'Déconnexion'
      }
    },
    
    // Account Panel
    accountPanel: {
      title: 'Paramètres du Compte',
      language: 'Langue',
      design: 'Design',
      logout: 'Terminer la Session',
      darkModeTitle: 'Design Sombre',
      darkModeDescription: 'Active le mode sombre pour toute l\'application',
      logoutDescription: 'Déconnectez-vous de votre compte',
      logoutButton: 'Déconnexion'
    },
    
    // Account Settings
    account: {
      title: 'Paramètres du Compte',
      subtitle: 'Gérez votre profil et vos préférences',
      profilePicture: 'Photo de Profil',
      profilePictureDescription: 'Téléchargez une photo de profil ou modifiez celle existante',
      uploadImage: 'Télécharger Image',
      removeImage: 'Supprimer Image',
      changePassword: 'Changer le Mot de Passe',
      currentPassword: 'Mot de Passe Actuel',
      newPassword: 'Nouveau Mot de Passe',
      confirmPassword: 'Confirmer le Mot de Passe',
      updatePassword: 'Mettre à Jour le Mot de Passe',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      passwordUpdated: 'Mot de passe mis à jour avec succès',
      languageSection: 'Langue',
      languageDescription: 'Choisissez votre langue préférée',
      themeSection: 'Thème',
      themeDescription: 'Choisissez entre le thème clair et sombre',
      personalInfo: 'Informations Personnelles',
      personalInfoDescription: 'Détails de votre compte et informations utilisateur',
      username: 'Nom d\'utilisateur',
      email: 'Email',
      role: 'Rôle',
      saveChanges: 'Enregistrer les Modifications',
      // New additions for AccountSettings
      displayName: 'Nom d\'Affichage',
      phoneNumber: 'Numéro de Téléphone',
      jobTitle: 'Titre du Poste',
      department: 'Département',
      emailPlaceholder: 'votre.email@entreprise.com',
      phoneNumberPlaceholder: '+33 X XX XX XX XX',
      jobTitlePlaceholder: 'p.ex. Développeur Logiciel',
      departmentPlaceholder: 'p.ex. IT, Marketing, Ventes',
      imageTooLarge: 'Image trop volumineuse. Maximum 5MB autorisé.',
      passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
      endSession: 'Terminer la Session',
      endSessionDescription: 'Déconnectez-vous de votre compte et retournez à la connexion',
      logoutNow: 'Se Déconnecter Maintenant',
      administrator: 'Administrateur',
      user: 'Utilisateur'
    },
    
    // Mobile Layout
    mobileLayout: {
      chatDescription: 'Interface de chat pour interagir avec les agents IA',
      optionsDescription: 'Paramètres et configuration des agents',
      accountDescription: 'Paramètres du compte utilisateur et gestion du profil'
    },
    
    // Agent Settings
    agentSettings: {
      title: 'Paramètres de l\'Orchestrateur',
      subtitle: 'Configurez les agents et le comportement IA',
      availableAgents: 'Agents Disponibles',
      agentDescription: 'Aperçu de tous les agents IA disponibles et leurs fonctions',
      active: 'Actif',
      available: 'Disponible',
      private: 'Privé',
      public: 'Public',
      activated: 'Activé',
      deactivated: 'Désactivé',
      
      // Theme Settings
      themeSettings: 'Paramètres de Thème',
      themeDescription: 'Choisissez entre le thème clair et sombre',
      darkMode: 'Mode Sombre',
      darkModeDescription: 'Active le mode sombre pour toute l\'application',
      
      // Language Settings
      languageSettings: 'Paramètres de Langue',
      languageDescription: 'Choisissez la langue souhaitée pour les réponses IA',
      language: 'Langue',
      
      // Custom Prompt
      customPrompt: 'Ajout de Prompt Système',
      customPromptDescription: 'Ce texte sera inclus comme contexte avec chaque demande',
      customPromptLabel: 'Prompt Supplémentaire',
      customPromptPlaceholder: 'ex. "Répondez toujours en tant qu\'expert en..." ou "Considérez toujours les directives d\'entreprise suivantes..."',
      customPromptTip: 'Conseil : Utilisez des instructions spécifiques pour adapter les réponses IA à vos besoins.',
      
      // Response Settings
      responseSettings: 'Configuration des Réponses',
      responseDescription: 'Déterminez le type et le style des réponses IA',
      responseLength: 'Longueur de Réponse',
      responseTone: 'Ton de Réponse',
      creativity: 'Créativité (Température)',
      creativityDescription: 'Valeurs plus élevées = plus créatif, plus faibles = plus focalisé',
      conservative: 'Conservateur',
      creative: 'Créatif',
      preciseLabel: 'Très précis',
      balancedLabel: 'Équilibré',
      creativeLabel: 'Très créatif',
      
      // Response Length Options
      short: 'Court & Précis',
      medium: 'Standard',
      long: 'Détaillé',
      comprehensive: 'Très détaillé',
      
      // Response Tone Options
      professional: 'Professionnel',
      casual: 'Décontracté',
      friendly: 'Amical',
      formal: 'Formel',
      expert: 'Niveau expert'
    },
    
    // Orchestrator Panel
    orchestratorPanel: {
      configureSettings: 'Configurez les paramètres de génération de réponses IA',
      active: 'Actif',
      inactive: 'Inactif',
      start: 'Démarrer',
      stop: 'Arrêter',
      modelConfig: 'Configuration du Modèle',
      modelConfigDescription: 'Sélectionnez le modèle IA et les paramètres de base',
      aiModel: 'Modèle IA',
      maxTokens: 'Tokens Maximum',
      streamingEnabled: 'Streaming Activé',
      advancedParams: 'Paramètres Avancés',
      advancedParamsDescription: 'Affinez la génération de réponses IA',
      temperature: 'Température',
      topP: 'Top-P',
      frequencyPenalty: 'Pénalité de Fréquence',
      presencePenalty: 'Pénalité de Présence',
      systemPrompt: 'Prompt Système',
      systemPromptDescription: 'Définissez le comportement et la personnalité de l\'IA',
      systemPromptPlaceholder: 'Entrez le prompt système ici...',
      reset: 'Réinitialiser'
    },
    
    // Agents
    agents: {
      emailAgent: {
        name: 'Agent Email',
        description: 'Compose et gère la correspondance email de qualité professionnelle.',
        capabilities: ['Rédaction d\'Email', 'Planification', 'Suivis']
      },
      normenAgent: {
        name: 'Agent Normes',
        description: 'Spécialisé dans les standards, normes et exigences de conformité.',
        capabilities: ['Standards ISO', 'Conformité', 'Vérification de Normes']
      },
      internetAgent: {
        name: 'Agent Internet',
        description: 'Recherche des informations actuelles sur internet et les sources web.',
        capabilities: ['Recherche Web', 'Données Actuelles', 'Vérification de Faits']
      },
      jelmoliAgent: {
        name: 'Agent Jelmoli',
        description: 'Agent spécifique à l\'entreprise pour les processus et informations internes Jelmoli.',
        capabilities: ['Infos Entreprise', 'Processus Internes', 'Données Produit']
      }
    },
    
    // Chat Interface
    chat: {
      title: 'Chat Orchestrateur',
      placeholder: 'Tapez votre message...',
      send: 'Envoyer',
      thinking: 'Réflexion...',
      welcomeMessage: 'Bonjour ! Je suis votre Orchestrateur IA. Comment puis-je vous aider aujourd\'hui ?',
      noActiveAgents: 'Aucun agent activé',
      activeAgents: 'Agents Actifs',
      
      history: {
        chatUnpinned: 'Chat désépinglé',
        chatPinned: 'Chat épinglé',
        chatDeleted: 'Chat supprimé',
        titleUpdated: 'Titre mis à jour',
        folderCreated: 'Dossier créé',
        chatMoved: 'Chat déplacé',
        folderColorChanged: 'Couleur du dossier modifiée',
        folderRenamed: 'Dossier renommé',
        spaceDeleted: 'Espace supprimé',
        yesterday: 'Hier',
        lastWeek: 'La semaine dernière',
        lastMonth: 'Le mois dernier',
        older: 'Plus ancien',
        deleteSpaceMessage: 'Voulez-vous vraiment supprimer cet espace ? Les chats dans cet espace seront déplacés vers "Tous les chats". Cette action ne peut pas être annulée.',
        allChats: 'Tous les chats',
        noChatsFound: 'Aucun chat trouvé',
        searchPlaceholder: 'Rechercher...',
        deleteChatTitle: 'Supprimer le chat',
        deleteChatMessage: 'Voulez-vous vraiment supprimer ce chat ?',
        deleteSpaceTitle: 'Supprimer l\'espace',
        delete: 'Supprimer',
        pin: 'Épingler',
        unpin: 'Désépingler',
        rename: 'Renommer',
        newSpace: 'Nouvel espace',
        newChat: 'Nouveau chat',
        cancel: 'Annuler',
        renameAction: 'Renommer',
        cannotUndo: 'Cette action ne peut pas être annulée.',
        search: 'Recherche',
        unpinAction: 'Détacher',
        pinAction: 'Épingler',
        collapse: 'Réduire'
      },
      
      interface: {
        messageDeleted: 'Message supprimé',
        messageCopied: 'Message copié',
        addFiles: 'Ajouter des fichiers',
        recordAudio: 'Enregistrer audio',
        addPhotosAndFiles: 'Ajouter photos et fichiers',
        takeScreenshot: 'Prendre une capture d\'écran',
        takePhoto: 'Prendre une photo',
        deepResearch: 'Recherche Approfondie',
        createImage: 'Créer une image',
        screenshotInDevelopment: 'Fonction de capture d\'écran en développement',
        deepResearchInDevelopment: 'Recherche approfondie en développement',
        createImageInDevelopment: 'Création d\'image en développement',
        dropFilesHere: 'Déposer les fichiers ici',
        dropFilesDescription: 'PDFs, images et autres fichiers',
        copy: 'Copier',
        deleteAction: 'Supprimer'
      }
    },
    
    // Window Actions
    window: {
      minimize: 'Réduire',
      maximize: 'Maximiser',
      restore: 'Restaurer',
      close: 'Fermer',
      clickToRestore: 'Cliquer pour restaurer'
    },
    
    // Languages
    languages: {
      de: 'Deutsch',
      en: 'English',
      fr: 'Français',
      'pt-br': 'Português (Brasil)'
    },
    
    // Tenant Administration
    tenantAdmin: {
      title: 'Administration Tenant AI Hub',
      settingsLabel: 'Paramètres',
      lightMode: 'Mode Clair',
      darkMode: 'Mode Sombre',
      language: 'Langue',
      logout: 'Déconnexion',
      version: 'AI Hub v2.4.1',
      sidebar: {
        tenantAdmin: 'Admin Tenant',
        dashboard: 'Tableau de Bord',
        tenantSettings: 'Paramètres Tenant',
        userRoles: 'Utilisateurs & Rôles',
        modulesFeatures: 'Modules & Fonctionnalités',
        dataManagement: 'Gestion des Données',
        promptsFrameworks: 'Prompts & Frameworks',
        loggingMonitoring: 'Journalisation & Monitoring',
        supportDocs: 'Support & Documentation',
      },
      tenantSettingsSub: { general: 'Informations Générales', compliance: 'Conformité', euAiAct: 'Loi européenne sur l\'IA', dsgvo: 'RGPD', responsibilities: 'Responsabilités', security: 'Sécurité' },
      userManagementSub: { users: 'Gestion des Utilisateurs', dsgvo: 'Gestion RGPD', roles: 'Rôles & Permissions', departments: 'Départements & Prompts' },
      modulesSub: { models: 'Modèles LLM', overview: 'Orchestrator & Agents' },
      dataSub: { backups: 'Sauvegardes & Restauration' },
      promptsSub: { library: 'Bibliothèque de Prompts', frameworks: 'Frameworks' },
      monitoringSub: { activity: 'Journal d\'Activité', system: 'Monitoring Système', alerts: 'Alertes & Notifications' },
      supportSub: {
        documentation: 'Documentation',
        faq: 'Questions Fréquentes',
        tickets: 'Tickets de Support',
        tutorials: 'Tutoriels Vidéo',
        api: 'Documentation API',
        contact: 'Nous Contacter',
      },
      dashboard: {
        title: 'Tableau de Bord', welcome: 'Bienvenue', overview: 'Aperçu', quickStats: 'Statistiques Rapides',
        activeUsers: 'Utilisateurs Actifs', totalModels: 'Modèles Total', storageUsed: 'Stockage Utilisé', apiCalls: 'Appels API',
        recentActivity: 'Activité Récente', systemHealth: 'État du Système', healthy: 'Sain', noActivity: 'Aucune activité récente'
      },
      settings: {
        title: 'Paramètres Tenant',
        general: { title: 'Informations Générales', subtitle: 'Paramètres de base pour votre tenant', tenantName: 'Nom du Tenant', 
          tenantId: 'ID Tenant', description: 'Description', contactEmail: 'Email de Contact', timezone: 'Fuseau Horaire', saveChanges: 'Enregistrer' },
        security: { title: 'Sécurité & Conformité', subtitle: 'Paramètres de sécurité et politiques de conformité', 
          twoFactor: 'Authentification à Deux Facteurs', twoFactorDesc: 'Exiger 2FA pour tous les utilisateurs', 
          sessionTimeout: 'Expiration de Session', minutes: 'Minutes', ipWhitelist: 'Liste Blanche IP', 
          ipWhitelistDesc: 'Adresses IP autorisées', addIp: 'Ajouter IP' },
        access: { title: 'Accès & Réseau', subtitle: 'Paramètres réseau et d\'accès', publicAccess: 'Accès Public', 
          publicAccessDesc: 'Autoriser l\'accès public à certaines ressources', apiAccess: 'Accès API', 
          apiAccessDesc: 'Activer l\'accès API externe', corsOrigins: 'Origines CORS', 
          corsOriginsDesc: 'Origines CORS autorisées', addOrigin: 'Ajouter Origine' },
      },
      userManagement: {
        title: 'Gestion Utilisateurs & Rôles',
        users: { title: 'Gestion des Utilisateurs', subtitle: 'Gérer les comptes utilisateurs et permissions', searchPlaceholder: 'Rechercher utilisateurs...', 
          addUser: 'Ajouter Utilisateur', newUser: 'Nouvel Utilisateur', name: 'Nom', email: 'Email', role: 'Rôle', status: 'Statut', lastActive: 'Dernière Activité', 
          actions: 'Actions', active: 'Actif', inactive: 'Inactif', edit: 'Modifier', delete: 'Supprimer',
          source: 'Source', localUser: 'Utilisateur Local', azureAD: 'Azure AD', googleIdentity: 'Google Identity',
          syncUsers: 'Synchroniser les Utilisateurs', allUsers: 'Tous les Utilisateurs', ssoUsers: 'Utilisateurs SSO', inactiveUsers: 'Utilisateurs Inactifs',
          neverLoggedIn: 'Jamais connecté', departments: 'Départements', selectDepartments: 'Sélectionner Départements', selected: 'sélectionnés',
          exportCSVExcel: 'Exporter (CSV/Excel)', import: 'Importer', manualSync: 'Synchronisation Manuelle', viewSyncLogs: 'Voir les Journaux de Sync',
          syncSuccess: 'Utilisateurs synchronisés avec succès', syncSuccessDetails: '42 nouveaux utilisateurs, 2 mis à jour',
          accessRightsAndRoles: 'Droits d\'Accès & Rôles', setUserStatus: 'Définir utilisateur actif/inactif',
          syncFromDirectory: 'Cette valeur est synchronisée depuis le répertoire',
          openInDirectory: 'Ouvrir dans le Répertoire',
          lastLogin: 'Dernière Connexion',
          syncedAt: 'Synchronisé le',
          department: 'Département',
          roleAdmin: 'Administrateur',
          rolePowerUser: 'Utilisateur Avancé',
          roleUser: 'Utilisateur',
          roleViewer: 'Observateur',
          duplicate: 'Dupliquer',
          assignRole: 'Attribuer un Rôle',
          assignDepartment: 'Attribuer un Département',
          merge: 'Fusionner',
          approval: 'Autorisation' },
        roles: { title: 'Rôles & Permissions', subtitle: 'Gérer les rôles et permissions', addRole: 'Ajouter Rôle', 
          roleName: 'Nom du Rôle', permissions: 'Permissions', users: 'Utilisateurs', created: 'Créé', 
          actions: 'Actions', edit: 'Modifier', delete: 'Supprimer',
          adminRights: 'Droits Administratifs', basicPermissions: 'Permissions de Base', dataRights: 'Droits sur les Données',
          roleManagement: 'Gestion des rôles et permissions', roleManagementDesc: 'Gérer les rôles et permissions' },
        departments: {
          title: 'Catégories de Prompts & Départements',
          subtitle: 'Attribution des catégories de prompts aux départements ou utilisateurs individuels.',
          department: 'Département',
          promptCategories: 'Catégories de Prompts',
          newDepartment: 'Nouveau Département',
          editDepartment: 'Modifier Département',
          departmentName: 'Nom du Département',
          editDepartmentDesc: 'Modifier le département et attribuer les catégories de prompts et utilisateurs.',
          selectOrCreateDepartment: 'Sélectionner département ou créer nouveau...',
          createNewDepartment: 'Créer Nouveau Département',
          enterDepartmentName: 'Entrer nouveau nom de département...',
          deleteDepartmentTitle: 'Voulez-vous vraiment supprimer ce département?',
          deleteDepartmentDesc: 'Cette action ne peut pas être annulée.',
          assignDepartmentTitle: 'Attribuer Département',
          assignDepartmentDesc: 'Sélectionner un département existant ou en créer un nouveau.',
          selectDepartment: 'Sélectionner département...',
          renameDepartmentTitle: 'Renommer Département',
          renameDepartmentDesc: 'Entrer le nouveau nom pour le département.',
          newDepartmentName: 'Nouveau Nom de Département',
          noDepartmentAssigned: 'Si aucun département n\'est attribué, des utilisateurs individuels peuvent être attribués.',
          assignUsers: 'Attribuer Utilisateurs',
          allUsers: 'Tous les Utilisateurs',
          assignCategories: 'Attribuer Catégories',
          allCategories: 'Toutes les Catégories',
          save: 'Enregistrer',
          cancel: 'Annuler',
          create: 'Créer',
          select: 'Sélectionner',
          rename: 'Renommer',
          active: 'Actif',
          inactive: 'Inactif',
          all: 'Tous',
          // Spécifique au dialogue
          assignPromptCategory: 'Attribuer Catégorie de Prompt',
          promptCategory: 'Catégorie de Prompt',
          categoriesSelected: 'catégories sélectionnées',
          usersSelected: 'utilisateurs sélectionnés',
          users: 'Utilisateurs',
          searchUsers: 'Rechercher utilisateurs...',
          status: 'Statut',
          edit: 'Modifier',
          duplicate: 'Dupliquer',
          delete: 'Supprimer',
          // Tableau
          managementTitle: 'Gestion des Catégories de Prompts',
          actions: 'Actions',
          categories: 'Catégories',
          noUsersAssigned: 'Aucun utilisateur attribué',
          newDepartmentTooltip: 'Nouveau Département',
        },
        promptCategories: {
          addNewCategory: 'Ajouter Nouvelle Catégorie de Prompt',
          addNewCategoryDesc: 'Entrer le nom de la nouvelle catégorie de prompt.',
          categoryName: 'Nom de Catégorie',
          renameCategory: 'Renommer Catégorie de Prompt',
          renameCategoryDesc: 'Entrer le nouveau nom pour la catégorie de prompt.',
          newCategoryName: 'Nouveau Nom de Catégorie',
          add: 'Ajouter',
        },
      },
      dataManagement: {
        title: 'Gestion des Données',
        backups: { title: 'Sauvegardes & Restauration', subtitle: 'Gérer les sauvegardes et restaurations', createBackup: 'Créer Sauvegarde', 
          backupName: 'Nom de Sauvegarde', size: 'Taille', created: 'Créé', status: 'Statut', actions: 'Actions', 
          restore: 'Restaurer', download: 'Télécharger', delete: 'Supprimer', completed: 'Terminé', 
          inProgress: 'En Cours', failed: 'Échoué', autoBackup: 'Sauvegarde Automatique', 
          autoBackupDesc: 'Activer les sauvegardes automatiques', backupFrequency: 'Fréquence de Sauvegarde', 
          daily: 'Quotidien', weekly: 'Hebdomadaire', monthly: 'Mensuel' },
      },
      monitoring: {
        activity: { title: 'Journal d\'Activité', subtitle: 'Aperçu de toutes les activités système', filterByUser: 'Filtrer par Utilisateur', 
          filterByAction: 'Filtrer par Action', allUsers: 'Tous Utilisateurs', allActions: 'Toutes Actions', timestamp: 'Horodatage', 
          user: 'Utilisateur', action: 'Action', details: 'Détails', ipAddress: 'Adresse IP' },
        system: { title: 'Monitoring Système', subtitle: 'Surveiller les performances système', cpuUsage: 'Utilisation CPU', 
          memoryUsage: 'Utilisation Mémoire', diskUsage: 'Utilisation Disque', networkTraffic: 'Trafic Réseau', uptime: 'Temps de Fonctionnement', 
          lastRestart: 'Dernier Redémarrage', systemHealth: 'État Système', healthy: 'Sain', warning: 'Avertissement', critical: 'Critique' },
        alerts: { title: 'Alertes & Notifications', subtitle: 'Gérer les alertes et notifications système', createAlert: 'Créer Alerte', 
          alertName: 'Nom Alerte', type: 'Type', severity: 'Gravité', status: 'Statut', created: 'Créé', 
          actions: 'Actions', edit: 'Modifier', delete: 'Supprimer', active: 'Actif', inactive: 'Inactif', 
          high: 'Élevé', medium: 'Moyen', low: 'Faible' },
      },
      support: {
        title: 'Support & Documentation',
        overview: { title: 'Aperçu', welcome: 'Bienvenue au Support', description: 'Trouvez aide, documentation et ressources de support ici', 
          gettingStarted: 'Premiers Pas', gettingStartedDesc: 'Commencez ici avec AI Hub', 
          documentation: 'Documentation', documentationDesc: 'Documentation produit complète', 
          support: 'Support', supportDesc: 'Contactez notre équipe support', 
          updates: 'Mises à Jour & Actualités', updatesDesc: 'Dernières mises à jour et changements' },
        documentation: { title: 'Documentation', search: 'Rechercher documentation...', categories: 'Catégories', 
          gettingStarted: 'Premiers Pas', userGuide: 'Guide Utilisateur', adminGuide: 'Guide Admin', 
          apiDocs: 'Documentation API', troubleshooting: 'Dépannage' },
        faq: { title: 'FAQ', search: 'Rechercher FAQ...', categories: 'Catégories', general: 'Général', 
          technical: 'Technique', billing: 'Facturation', security: 'Sécurité' },
        tickets: { title: 'Tickets Support', createTicket: 'Créer Ticket', ticketNumber: 'Num��ro Ticket', 
          subject: 'Sujet', status: 'Statut', priority: 'Priorité', created: 'Créé', actions: 'Actions', 
          open: 'Ouvert', inProgress: 'En Cours', resolved: 'Résolu', closed: 'Fermé', view: 'Voir' },
        contact: { title: 'Contact', description: 'Contactez notre équipe support', email: 'Email', 
          phone: 'Téléphone', availability: 'Disponibilité', emergencySupport: 'Support d\'Urgence', 
          sendMessage: 'Envoyer Message', name: 'Nom', emailLabel: 'Email', message: 'Message', submit: 'Soumettre' },
      },
      
      supportDocumentation: {
        title: 'Support & Documentation',
        ticketStatus: {
          open: 'Ouvert',
          inProgress: 'En Cours',
          resolved: 'Résolu',
          closed: 'Fermé',
        },
        ticketPriority: {
          low: 'Faible',
          medium: 'Moyen',
          high: 'Élevé',
          urgent: 'Urgent',
        },
        documentation: {
          searchTitle: 'Parcourir la Documentation',
          searchDescription: 'Trouvez des guides, bonnes pratiques et références techniques',
          searchPlaceholder: 'Rechercher documentation...',
          learnMore: 'En savoir plus',
          noDocsFound: 'Aucune documentation trouvée',
          downloads: 'Téléchargements',
          downloadsDescription: 'Manuels et ressources supplémentaires',
          userManual: 'Manuel d\'Utilisateur AI Hub',
          adminGuide: 'Guide Administrateur',
          apiDocs: 'Documentation API',
          download: 'Télécharger',
          items: {
            gettingStarted: { 
              title: 'Premiers Pas avec AI Hub', 
              description: 'Apprenez les bases de la plateforme et configurez votre premier environnement.',
              category: 'Premiers Pas'
            },
            userRoleManagement: { 
              title: 'Gestion Utilisateurs & Rôles', 
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
              description: 'Meilleures pratiques pour la sécurité, 2FA et exigences de conformité.',
              category: 'Sécurité'
            },
            apiDocumentation: { 
              title: 'Documentation API', 
              description: 'Référence complète de l\'API REST AI Hub pour développeurs.',
              category: 'Développeur'
            },
            monitoringLogging: { 
              title: 'Monitoring & Journalisation', 
              description: 'Surveillez les performances du système et analysez les journaux d\'activité.',
              category: 'Monitoring'
            },
            troubleshooting: { 
              title: 'Guide de Dépannage', 
              description: 'Solutions pour les problèmes courants et messages d\'erreur.',
              category: 'Dépannage'
            },
          },
        },
        faq: {
          title: 'Questions Fréquemment Posées',
          description: 'Trouvez des réponses rapides aux questions courantes',
          needMoreHelp: 'Besoin d\'Aide Supplémentaire ?',
          needMoreHelpDesc: 'Si vous ne trouvez pas votre question ici, vous pouvez naviguer vers d\'autres sections de support via la barre latérale',
          management: 'Gestion des FAQ',
          managementDesc: 'Gérer les questions fréquemment posées',
          createNew: 'Créer une Nouvelle FAQ',
          editFaq: 'Modifier la FAQ',
          panelCreateTitle: 'Créer une Nouvelle FAQ',
          panelEditTitle: 'Modifier la FAQ',
          questionLabel: 'Question',
          categoryLabel: 'Catégorie',
          answerLabel: 'Réponse',
          tips: 'Conseils pour de Bonnes FAQ :',
          tip1: 'Formulez les questions comme les utilisateurs les poseraient',
          tip2: 'Gardez les réponses concises et compréhensibles',
          tip3: 'Utilisez des exemples pour clarifier',
          tip4: 'Ajoutez des liens vers de la documentation supplémentaire',
          minCharsRecommended: 'Au moins 50 caractères recommandés',
          createButton: 'Créer FAQ',
          saveChanges: 'Enregistrer les Modifications',
          successCreated: 'FAQ créée',
          successUpdated: 'FAQ mise à jour',
          changesSaved: 'Les modifications ont été enregistrées.',
          categories: {
            general: 'Général',
            technical: 'Technique',
            billing: 'Facturation',
            security: 'Sécurité',
            setup: 'Configuration',
            troubleshooting: 'Dépannage',
          },
        },
        tickets: {
          createTitle: 'Créer un Nouveau Ticket de Support',
          createDescription: 'Décrivez votre problème et notre équipe vous répondra rapidement',
          yourTicketsTitle: 'Vos Tickets de Support',
          yourTicketsDescription: 'Aperçu de vos demandes actuelles et passées',
          subjectLabel: 'Sujet',
          priorityLabel: 'Priorité',
          messageLabel: 'Message',
          submitButton: 'Soumettre le Ticket',
          noTickets: 'Aucun ticket de support disponible',
          created: 'Créé',
          updated: 'Mis à Jour',
          successTitle: 'Ticket de Support Créé !',
          confirmationEmail: 'Vous recevrez un email de confirmation.',
        },
        tutorials: {
          title: 'Tutoriels Vidéo',
          description: 'Guides vidéo étape par étape pour toutes les fonctionnalités importantes',
          duration: 'Durée',
          items: {
            gettingStarted: { 
              title: 'Premiers Pas avec AI Hub', 
              description: 'Introduction à la plateforme et navigation de base',
              duration: '8:42 min'
            },
            userRoleManagement: { 
              title: 'Gestion Utilisateurs et Rôles', 
              description: 'Créer des utilisateurs, attribuer des rôles et gérer les permissions',
              duration: '12:15 min'
            },
            modelConfiguration: { 
              title: 'Configuration des Modèles LLM', 
              description: 'Configurer les clés API et tester les modèles',
              duration: '10:30 min'
            },
            agentSetup: { 
              title: 'Configuration des Agents', 
              description: 'Configurer Email Agent, Internet Agent et plus',
              duration: '15:20 min'
            },
            backupRecovery: { 
              title: 'Sauvegarde & Récupération', 
              description: 'Créer des sauvegardes et restaurer les données',
              duration: '9:45 min'
            },
            monitoringAlerts: { 
              title: 'Monitoring & Alertes', 
              description: 'Configurer la surveillance système et les alertes',
              duration: '11:00 min'
            },
          },
        },
        api: {
          title: 'Documentation API',
          description: 'Référence API REST pour les Développeurs',
          authentication: 'Authentification',
          baseUrl: 'URL de Base',
          endpoints: 'Points de Terminaison',
          endpointGetAgents: 'Récupérer la liste de tous les agents disponibles',
          endpointPostAgentExecute: 'Exécuter un agent avec une requête',
          endpointGetModels: 'Liste de tous les modèles LLM configurés',
          endpointGetUsers: 'Récupérer les utilisateurs et leurs permissions',
          endpointPostBackup: 'Créer une nouvelle sauvegarde',
          downloadFullDocs: 'Télécharger la documentation API complète (PDF)',
          codeExamples: 'Exemples de Code',
          codeExamplesDescription: 'Intégration dans votre application',
        },
        contact: {
          supportTitle: 'Contact Support',
          supportDescription: 'Contactez notre équipe de support',
          emailSupport: 'Support par Email',
          phoneSupport: 'Support Téléphonique',
          emergencyHotline: 'Ligne d\'Urgence 24/7',
          responseTime: 'Temps de Réponse',
          availability: 'Disponibilité',
          salesTitle: 'Ventes & Partenariats',
          salesDescription: 'Pour des questions sur les licences et la collaboration',
          sales: 'Ventes',
          partnerships: 'Partenariats',
          companyTitle: 'Entreprise',
          companyDescription: 'RMB Group & neuco AG',
          companyInfo: 'AI Hub est développé conjointement par RMB Group et neuco AG',
          headquarters: 'Siège social : Zurich, Suisse',
          emergencyOnly: 'Pour les pannes système critiques uniquement',
          mondayFriday: 'Lun-Ven, 08:00 - 18:00',
        },
      },
      
      models: { title: 'Gestion des Modèles', subtitle: 'Gérer les modèles IA et leurs configurations', addModel: 'Ajouter Modèle', 
        modelName: 'Nom Modèle', provider: 'Fournisseur', version: 'Version', status: 'Statut', lastUsed: 'Dernière Utilisation', 
        actions: 'Actions', active: 'Actif', inactive: 'Inactif', configure: 'Configurer', delete: 'Supprimer',
        edit: 'Modifier', cancel: 'Annuler', save: 'Enregistrer', deleteConfirm: 'Confirmer la Suppression',
        deleteMessage: 'Êtes-vous sûr de vouloir supprimer ce modèle ? Cette action ne peut pas être annulée.',
        // Dialog
        editModel: 'Modifier le Modèle',
        basicInfo: 'Informations de Base',
        modelNameLabel: 'Nom du Modèle *',
        modelNameHelp: 'Un nom descriptif pour référence interne',
        providerLabel: 'Fournisseur *',
        modelIdLabel: 'ID Modèle *',
        modelIdHelp: 'L\'ID technique du modèle du fournisseur',
        apiConfiguration: 'Configuration API',
        apiKeyInfo: 'Les clés API sont stockées de manière chiffrée et ne sont visibles que dans le système',
        apiKeyLabel: 'Clé API *',
        notes: 'Notes',
        notesPlaceholder: 'Informations supplémentaires ou détails de configuration...' },
      moduleOverview: { title: 'Aperçu des Modules', subtitle: 'Aperçu de tous les modules disponibles', moduleName: 'Nom Module', 
        status: 'Statut', version: 'Version', users: 'Utilisateurs', actions: 'Actions', enabled: 'Activé', 
        disabled: 'Désactivé', configure: 'Configurer', disable: 'Désactiver', enable: 'Activer',
        newAgent: 'Nouvel Agent', editAgent: 'Modifier l\'Agent', agentName: 'Nom de l\'Agent',
        agentDescription: 'Description', agentType: 'Type d\'Agent', agentCapabilities: 'Capacités',
        addCapability: 'Ajouter une Capacité', removeCapability: 'Supprimer',
        capabilityPlaceholder: 'ex. Envoyer des emails, Analyser des données...', saveAgent: 'Enregistrer l\'Agent' },
      
      thinkTank: {
        title: 'Think Tank', subtitle: 'Analyse de Scénario Multi-Perspectives',
        scenario: 'Scénario / Question', scenarioPlaceholder: 'Décrivez votre scénario ou question...',
        perspectives: 'Perspectives', addPerspective: 'Ajouter une Perspective', removePerspective: 'Supprimer',
        startSession: 'Démarrer la Session', stopSession: 'Arrêter la Session',
        clearSession: 'Réinitialiser la Session', thinking: 'Analyse en cours...',
        perspectivePlaceholder: 'ex. PDG, CTO, Client, Investisseur...'
      },
      
      roleManagement: {
        newRole: 'Créer un Nouveau Rôle', editRole: 'Modifier le Rôle', roleName: 'Nom du Rôle',
        roleDescription: 'Description', permissions: 'Permissions', assignedUsers: 'Utilisateurs Assignés',
        selectUsers: 'Sélectionner des Utilisateurs', usersSelected: 'sélectionnés',
        searchUsers: 'Rechercher utilisateurs...', allUsers: 'Tous les Utilisateurs',
        selectAll: 'Tout Sélectionner', deselectAll: 'Tout Désélectionner',
        saveRole: 'Enregistrer le Rôle', deleteRole: 'Supprimer le Rôle',
        subtitle: 'Modifier les informations et les permissions du rôle',
        basicInfo: 'Informations de Base',
        roleNameLabel: 'Nom du Rôle *',
        roleNamePlaceholder: 'ex. Gestionnaire de Contenu',
        descriptionLabel: 'Description',
        descriptionPlaceholder: 'Brève description du rôle',
        usersLabel: 'Utilisateurs Assignés',
        users: 'Utilisateurs',
        noUsersAssigned: 'Aucun utilisateur assigné',
        permissionsLabel: 'Permissions',
        selectNone: 'Aucun',
        basicPermissions: 'Permissions de Base',
        adminRights: 'Droits Administratifs',
        dataRights: 'Droits sur les Données',
        permCreate: 'Créer',
        permRead: 'Lire',
        permUpdate: 'Modifier',
        permDelete: 'Supprimer',
        permManageUsers: 'Gérer les Utilisateurs',
        permManageSettings: 'Gérer les Paramètres',
        permManageRoles: 'Gérer les Rôles',
        permViewReports: 'Voir les Rapports',
        permExportData: 'Exporter les Données',
        permImportData: 'Importer les Données'
      },
      
      userManagementExtended: {
        department: 'Département', departments: 'Départements', selectDepartments: 'Sélectionner des Départements',
        departmentsSelected: 'sélectionnés', newDepartment: 'Nouveau Département', allUsers: 'Tous les Utilisateurs',
        filterByDepartment: 'Filtrer par Département', showAllUsers: 'Afficher Tous les Utilisateurs',
        showActiveOnly: 'Utilisateurs Actifs Uniquement', editUser: 'Modifier l\'Utilisateur',
        newUser: 'Nouvel Utilisateur', firstName: 'Prénom', lastName: 'Nom',
        phoneNumber: 'Numéro de Téléphone', position: 'Poste', hireDate: 'Date d\'Embauche',
        selectRole: 'Sélectionner un Rôle', selectStatus: 'Sélectionner un Statut', saveUser: 'Enregistrer l\'Utilisateur'
      },
      
      modelManagementExtended: {
        newModel: 'Nouveau Modèle', editModel: 'Modifier le Modèle', modelType: 'Type de Modèle',
        apiKey: 'Clé API', endpoint: 'Point de Terminaison', maxTokens: 'Tokens Maximum',
        temperature: 'Température', topP: 'Top P', saveModel: 'Enregistrer le Modèle',
        testModel: 'Tester le Modèle',
        title: 'Gestion des Modèles LLM',
        statsTotal: 'Total',
        statsActive: 'Actif',
        statsInactive: 'Inactif',
        statsError: 'Erreur',
        configuredModels: 'Modèles Configurés',
        modelsCount: 'modèles',
        model: 'Modèle',
        modelId: 'ID du Modèle',
        sort: 'Trier',
        lastTested: 'Dernier Test',
        usedBy: 'Utilisé Par',
        actions: 'Actions',
        noModelsFound: 'Aucun modèle trouvé',
        addNewModel: 'Ajouter un Nouveau Modèle',
        modelName: 'Nom du Modèle',
        modelNameRequired: 'Nom du Modèle *',
        modelIdRequired: 'ID du Modèle *',
        modelIdDescription: 'L\'ID technique du modèle du fournisseur',
        lastTest: 'Dernier Test',
        never: 'Jamais',
        deleteConfirm: 'Confirmer la Suppression',
        deleteConfirmMessage: 'Êtes-vous sûr de vouloir supprimer ce modèle ? Cette action ne peut pas être annulée.',
        // Dialog sections
        basicInformation: 'Informations de Base',
        modelNameHelper: 'Un nom descriptif pour référence interne',
        apiConfiguration: 'Configuration API',
        apiKeySecurityNotice: 'Les clés API sont stockées de manière cryptée et ne sont visibles que dans le système',
        notes: 'Notes',
        endpointHelper: 'URL de base pour les requêtes API (requis pour Azure ou Custom Endpoints)',
        usage: 'Utilisation',
        addedDate: 'Ajouté',
        usedIn: 'Utilisé dans',
        notYetUsed: 'Pas encore utilisé',
        modelNameLabel: 'Nom du Modèle *',
        apiKeyLabel: 'Clé API *',
        providerLabel: 'Fournisseur *',
        modelIdLabel: 'ID du Modèle *',
        endpointLabel: 'Point de Terminaison API',
        statusLabel: 'Statut'
      },
      
      alertsExtended: {
        newAlert: 'Nouvelle Alerte', editAlert: 'Modifier l\'Alerte', alertType: 'Type d\'Alerte',
        alertMessage: 'Message', alertThreshold: 'Seuil', alertRecipients: 'Destinataires',
        addRecipient: 'Ajouter un Destinataire', emailNotification: 'Notification par Email',
        smsNotification: 'Notification par SMS', saveAlert: 'Enregistrer l\'Alerte'
      },
      
      supportExtended: {
        manageFAQ: 'Gérer FAQ', newFAQ: 'Nouvelle FAQ', editFAQ: 'Modifier FAQ',
        faqQuestion: 'Question', faqAnswer: 'Réponse', faqCategory: 'Catégorie',
        saveFAQ: 'Enregistrer FAQ', deleteFAQ: 'Supprimer FAQ',
        ticketSuccess: 'Ticket Créé avec Succès',
        ticketSubmitted: 'Votre ticket de support a été créé avec succès.',
        ticketNumber: 'Numéro de Ticket', backToSupport: 'Retour au Support', viewTicket: 'Voir le Ticket'
      },
      
      activityLog: {
        actions: {
          backupCreated: 'Sauvegarde créée',
          userCreated: 'Utilisateur créé',
          loginFailed: 'Échec de connexion',
          configChanged: 'Configuration modifiée',
          autoBackup: 'Sauvegarde automatique',
          roleAssigned: 'Rôle attribué',
          dbConnectionFailed: 'Échec de connexion à la base de données',
          healthCheck: 'Vérification de santé quotidienne'
        },
        resources: {
          userManagement: 'Gestion des Utilisateurs',
          authentication: 'Authentification',
          normenAgent: 'Agent de Normes',
          userAnalyticsDB: 'User Analytics DB',
          agentConfigDB: 'Agent Configuration DB',
          system: 'Système',
          aiHubMainDB: 'AI Hub Main DB'
        },
        details: {
          invalidPassword: 'Mot de passe invalide'
        },
        ui: {
          title: 'Journal d\'Activité',
          description: 'Surveiller toutes les activités système et actions utilisateur',
          searchPlaceholder: 'Rechercher dans les journaux...',
          filterByStatus: 'Filtrer par Statut',
          allStatuses: 'Tous les Statuts',
          success: 'Succès',
          warning: 'Avertissement',
          error: 'Erreur',
          info: 'Info',
          warnings: 'Avertissements',
          errors: 'Erreurs',
          information: 'Informations',
          exportLogs: 'Exporter les Journaux',
          clearFilters: 'Effacer les Filtres',
          activitiesCount: 'Activités',
          chronologicalListing: 'Liste chronologique de toutes les activités du système',
          export: 'Exporter',
          timestamp: 'Horodatage',
          user: 'Utilisateur',
          action: 'Action',
          resource: 'Ressource',
          status: 'Statut',
          ip: 'Adresse IP',
          details: 'Détails',
          sort: 'Trier',
          resetFilters: 'Réinitialiser les filtres',
          successful: 'Réussi',
          ipAddress: 'Adresse IP'
        }
      },
      
      dashboardExtended: {
        stats: {
          activeModules: 'Modules Actifs',
          processedToday: 'Traité Aujourd\'hui',
          avgResponseTime: 'Temps de Réponse Moy.',
          systemLoad: 'Charge Système',
          requests: 'Demandes',
          seconds: 'Secondes',
          cpu: 'CPU'
        },
        modules: {
          chatAgent: 'Agent de Chat',
          documentAnalyzer: 'Analyseur de Documents',
          calendarAssistant: 'Assistant Calendrier',
          dataAnalyst: 'Analyste de Données',
          securityMonitor: 'Moniteur de Sécurité'
        },
        ui: {
          welcomeBack: 'Bienvenue',
          overviewText: 'Voici un aperçu de votre système IA et des activités actuelles.',
          recentActivity: 'Activité Récente',
          recentActivityDesc: 'Événements système actuels et modifications',
          systemStatus: 'Statut du Système',
          systemStatusDesc: 'Modules actuels et leur utilisation',
          viewAllActivities: 'Voir Toutes les Activités',
          detailedMetrics: 'Métriques Détaillées',
          quickActions: 'Actions Rapides',
          quickActionsDesc: 'Fonctions fréquemment utilisées pour un accès rapide',
          newChat: 'Nouveau Chat',
          configureAI: 'Configurer l\'IA',
          manageModules: 'Gérer les Modules',
          settings: 'Paramètres',
          statusActive: 'Actif',
          statusWarning: 'Avertissement',
          statusError: 'Erreur'
        },
        cards: {
          users: 'Utilisateurs',
          modules: 'Modules',
          agents: 'Agents',
          apiCalls: 'Appels API',
          active: 'actif',
          inactive: 'inactif',
          moreAvailable: 'de plus disponibles',
          thisMonth: 'ce mois'
        },
        quickStats: {
          uptime: 'Disponibilité',
          activeSessions: 'Sessions Actives',
          regions: 'Régions'
        },
        systemMessages: {
          planExpiring: 'Votre forfait expire dans {days} jours',
          newVersionAvailable: 'Nouvelle version {version} disponible'
        },
        activities: {
          newUserCreated: 'Nouvel utilisateur créé',
          backupCompleted: 'Sauvegarde terminée avec succès',
          roleUpdated: 'Rôle \'{role}\' mis à jour',
          apiRateLimitReached: 'Limite de taux API atteinte',
          moduleActivated: 'Module \'{module}\' activé',
          chatAgentActivated: 'Agent Chat a été activé',
          requestsProcessed: '1 234 demandes traitées avec succès',
          temperatureChanged: 'Température IA changée à 0.7',
          timeAgo: {
            minutes: 'il y a {count} min',
            hour: 'il y a 1 heure',
            hours: 'il y a {count} heures'
          }
        },
        notifications: {
          userLoggedIn: 'Utilisateur {username} connecté'
        }
      },
      
      dataManagementExtended: {
        backups: {
          scheduledBackup: 'Sauvegarde Programmée',
          manualBackup: 'Sauvegarde Manuelle',
          allDatabases: 'Toutes les Bases de Données'
        },
        ui: {
          title: 'Sauvegardes & Restauration',
          databases: 'Bases de Données',
          successful: 'Réussi',
          failed: 'Échoué',
          newBackup: 'Créer Nouvelle Sauvegarde',
          newBackupDesc: 'Créer une sauvegarde manuelle de vos bases de données',
          backupName: 'Nom de Sauvegarde',
          backupNamePlaceholder: 'ex. Sauvegarde Production avant Mise à Jour',
          selectDatabase: 'Sélectionner Base de Données',
          creating: 'Sauvegarde en cours de création...',
          createBackup: 'Créer Sauvegarde',
          uploadBackup: 'Télécharger Sauvegarde',
          databasesTitle: 'Bases de Données',
          databasesDesc: 'Aperçu de toutes les bases de données disponibles',
          name: 'Nom',
          size: 'Taille',
          tables: 'Tables',
          lastBackup: 'Dernière Sauvegarde',
          actions: 'Actions',
          backup: 'Sauvegarder',
          backupHistory: 'Historique des Sauvegardes',
          backupHistoryDesc: 'Toutes les sauvegardes créées avec versioning',
          database: 'Base de Données',
          version: 'Version',
          date: 'Date',
          type: 'Type',
          status: 'Statut',
          sort: 'Trier',
          resetFilters: 'Réinitialiser Filtres',
          manual: 'Manuel',
          automatic: 'Automatique',
          statusCompleted: 'Terminé',
          statusInProgress: 'En Cours',
          statusFailed: 'Échoué',
          download: 'Télécharger Fichier',
          restore: 'Restaurer',
          delete: 'Supprimer',
          deleteTitle: 'Supprimer Sauvegarde ?',
          deleteMessage: 'Êtes-vous sûr de vouloir supprimer cette sauvegarde ? Cette action ne peut pas être annulée.',
          restoreTitle: 'Restaurer Sauvegarde ?',
          restoreMessage: 'Êtes-vous sûr de vouloir restaurer cette sauvegarde ? Les données actuelles seront écrasées.',
          backupLabel: 'Sauvegarde',
          databaseLabel: 'Base de Données',
          versionLabel: 'Version',
          dateLabel: 'Date',
          confirmRestore: 'Restaurer',
          beingCreated: 'En cours de création...'
        }
      },
      
      alertsManagement: {
        title: 'Alertes & Notifications',
        stats: {
          activeAlerts: 'Alertes Actives',
          unacknowledged: 'Non Confirmées',
          triggers24h: 'Déclenchements (24h)',
          totalAlerts: 'Total Alertes'
        },
        notifications: {
          title: 'Notifications Récentes',
          subtitle: 'Dernières notifications d\'alerte et leur statut',
          acknowledge: 'Confirmer'
        },
        rules: {
          title: 'Règles d\'Alerte',
          subtitle: 'Gérez vos configurations d\'alerte',
          searchPlaceholder: 'Rechercher des alertes...'
        },
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
          channels: 'Canaux',
          status: 'Statut',
          lastTriggered: 'Dernier Déclenchement',
          actions: 'Actions',
          sort: 'Trier'
        },
        status: {
          active: 'Active',
          inactive: 'Inactive'
        },
        channels: {
          email: 'E-mail',
          slack: 'Slack'
        },
        actions: {
          edit: 'Modifier',
          duplicate: 'Dupliquer',
          delete: 'Supprimer'
        },
        createPanel: {
          titleNew: 'Nouvelle Alerte',
          titleEdit: 'Modifier Alerte',
          subtitleNew: 'Configurer une nouvelle alerte',
          subtitleEdit: 'Modifier les paramètres d\'alerte',
          nameLabel: 'Nom de l\'Alerte',
          namePlaceholder: 'ex. Utilisation CPU Élevée',
          typeLabel: 'Type',
          conditionLabel: 'Condition',
          conditionPlaceholder: 'ex. Utilisation CPU > 85%',
          thresholdLabel: 'Seuil',
          thresholdPlaceholder: 'ex. 85%',
          channelsLabel: 'Canaux de Notification',
          buttonSave: 'Enregistrer',
          buttonCancel: 'Annuler',
          buttonCreate: 'Créer Alerte'
        },
        deleteDialog: {
          title: 'Supprimer Alerte ?',
          message: 'Êtes-vous sûr de vouloir supprimer cette alerte ? Cette action ne peut pas être annulée.',
          confirm: 'Supprimer',
          cancel: 'Annuler'
        }
      },
      
      accountExtended: {
        displayNamePlaceholder: 'Votre nom d\'affichage'
      },
      
      systemMonitoringExtended: {
        title: 'Monitoring Système',
        serviceStatus: 'Statut des Services',
        servicesOnline: 'sur',
        servicesOf: 'services en ligne',
        degraded: 'dégradé',
        online: 'En Ligne',
        offline: 'Hors Ligne',
        restricted: 'Dégradé',
        uptime: 'Temps de Fonctionnement',
        responseTime: 'Temps de Réponse',
        resourceUsage24h: 'Utilisation des Ressources % (24h)',
        resourceUsageSubtitle: 'CPU, RAM, DISK & Réseau',
        apiRequests24h: 'Requêtes API (24h)',
        apiRequestsSubtitle: 'Nombre de requêtes traitées',
        network: 'Réseau',
        totalApiCalls: 'Appels API Totaux',
        vsYesterday: 'vs. hier',
        avgResponseTime: 'Temps de Réponse Moy',
        systemUptime: 'Disponibilité Système',
        days: 'jours',
        hours: 'h',
        requests: 'Requêtes',
        services: {
          aiHubAPI: 'API AI Hub',
          emailAgent: 'Service Agent Email',
          normenAgent: 'Service Agent de Normes',
          internetAgent: 'Service Agent Internet',
          jelmoliAgent: 'Service Agent Jelmoli',
          databaseCluster: 'Cluster de Base de Données',
          authenticationService: 'Service d\'Authentification',
          fileStorage: 'Stockage de Fichiers'
        }
      },
      
      loginExtended: {
        logoAlt: 'Logo AIHUB',
        tenants: {
          rmbGroup: 'RMB Group',
          neuco: 'neuco'
        }
      },
      
      dashboardFull: {
        stats: {
          activeModules: 'Modules Actifs',
          processedToday: 'Traité Aujourd\'hui'
        },
        modules: {
          chatAgent: 'Agent de Chat',
          documentAnalyzer: 'Analyseur de Documents',
          calendarAssistant: 'Assistant Calendrier',
          dataAnalyst: 'Analyste de Données',
          securityMonitor: 'Moniteur de Sécurité'
        }
      },
      
      modelManagementFull: {
        providers: {
          geminiPro: 'Gemini Pro',
          googleAI: 'Google AI',
          azureOpenAI: 'Azure OpenAI',
          awsBedrock: 'AWS Bedrock',
          mistralAI: 'Mistral AI',
          cohere: 'Cohere',
          customEndpoint: 'Point de Terminaison Personnalisé'
        },
        dialog: {
          addNewModel: 'Ajouter un Nouveau Modèle',
          editModel: 'Modifier le Modèle',
          addModel: 'Ajouter le Modèle',
          save: 'Enregistrer',
          selectModel: 'Sélectionner un Modèle'
        }
      },
      
      placeholders: {
        systemPrompt: 'Entrer le prompt système...',
        searchDots: 'Rechercher...',
        spaceName: 'Entrer le nom de l\'espace...',
        email: 'votre.email@company.com',
        phone: '+33 X XX XX XX XX',
        jobTitle: 'p. ex. Développeur de Logiciels',
        department: 'p. ex. IT, Marketing, Ventes',
        modelName: 'p. ex. GPT-4 Turbo Production',
        selectProvider: 'Sélectionner un fournisseur',
        modelId: 'p. ex. gpt-4-turbo-preview',
        apiKey: 'sk-...',
        endpoint: 'https://...',
        notes: 'Informations supplémentaires ou détails de configuration...',
        agentName: 'p. ex. Agent Service Client',
        agentDescription: 'Décrire la fonction de cet agent...',
        version: '1.0.0',
        agentEndpoint: 'https://api.aihub.internal/agents/...',
        storageUrl: 'https://storage.example.com/...',
        storageToken: 'stg-...',
        agentApiKey: 'agt-...',
        searchDocumentation: 'Rechercher dans la documentation...',
        ticketSubject: 'Brève description de votre problème',
        ticketMessage: 'Décrivez votre problème ou votre question en détail...',
        faqQuestion: 'p. ex. Comment activer l\'authentification à deux facteurs?',
        faqAnswer: 'Entrez une réponse détaillée à la question...',
        passwordMinLength: 'Le mot de passe doit contenir au moins 6 caractères'
      },
      
      moduleOverviewFull: {
        notConfigured: 'Non configuré',
        selectModel: 'Sélectionner un modèle',
        orchestratorDiagram: 'Diagramme d\'Orchestrateur',
        statsModulesTotal: 'Total de Modules',
        statsActive: 'Actif',
        statsInactive: 'Inactif',
        statsError: 'Erreur',
        title: 'Orchestrateur & Agents',
        addModule: 'Ajouter un Module',
        orchestratorTitle: 'Orchestrateur',
        orchestratorDescription: 'Unité de contrôle centrale pour tous les agents IA et workflows',
        orchestratorQuery: 'Requête d\'Orchestrateur',
        llmConfiguration: 'Configuration LLM',
        llm1: 'LLM 1',
        llm2: 'LLM 2',
        prompt: 'Invite',
        edit: 'Modifier',
        agentsTitle: 'Agents',
        agentConfiguration: 'Configuration d\'Agent',
        apiEndpoint: 'Point de terminaison API',
        apiKey: 'Clé API',
        testConnection: 'Tester la connexion',
        testing: 'Test en cours...',
        storage: 'Stockage',
        storageAccessUrl: 'Stockage (URL d\'accès)',
        storageToken: 'Stockage (Jeton)',
        delete: 'Supprimer',
        save: 'Enregistrer',
        cancel: 'Annuler',
        deleteConfirmTitle: 'Supprimer le module',
        deleteConfirmDescription: 'Êtes-vous sûr de vouloir supprimer ce module? Cette action ne peut pas être annulée.',
        version: 'Version',
        lastSync: 'Dernière synchronisation',
        category: 'Catégorie',
        public: 'Public',
        private: 'Privé',
        riskCategory: 'Catégorie de Risque',
        low: 'Faible',
        high: 'Élevé',
        icon: 'Icône',
        agentName: 'Nom de l\'agent',
        description: 'Description',
        apiKeysEncrypted: 'Les clés API sont chiffrées',
        deleteAgent: 'Supprimer l\'agent',
        deleteAgentConfirmation: 'Êtes-vous sûr de vouloir supprimer cet agent? Cette action ne peut pas être annulée.',
        addNewAgent: 'Ajouter un Nouvel Agent',
        basicInformation: 'Informations de Base',
        addAgent: 'Ajouter l\'Agent',
        agents: {
          jelmoliAgent: 'Agent Jelmoli',
          emailAgent: 'Agent Email',
          internetAgent: 'Agent Internet',
          normenAgent: 'Agent de Normes'
        },
        agentDescriptions: {
          emailAgent: 'Traite et génère des e-mails avec l\'aide de l\'IA',
          internetAgent: 'Effectue des recherches web et des recherches sur Internet',
          jelmoliAgent: 'Assistant spécifique à Jelmoli pour les demandes clients',
          normenAgent: 'Recherche et analyse les normes et standards techniques'
        },
        prompts: {
          orchestrator1: 'Vous êtes un orchestrateur IA qui coordonne divers agents.',
          orchestrator2: 'Analysez la demande et transmettez-la à l\'agent approprié.'
        },
        models: {
          geminiPro: 'Gemini Pro',
          azureGPT4: 'Azure GPT-4'
        }
      },
      
      orchestratorExtended: {
        selectModel: 'Sélectionner un modèle'
      },
      
      alertsSampleData: {
        serviceOffline: 'Service Hors Ligne',
        backupFailed: 'Échec de la Sauvegarde',
        unusualTraffic: 'Trafic Inhabituel',
        backupFailedMessage: 'La sauvegarde programmée à 03h00 a échoué. Code d\'erreur: DB_TIMEOUT'
      },
      
      dataManagementFull: {
        scheduledBackup: 'Sauvegarde Programmée',
        manualBackup: 'Sauvegarde Manuelle',
        allDatabases: 'Toutes les Bases de Données'
      },
      
      chatSampleData: {
        productInquiryJelmoli: 'Demande de Produit Jelmoli',
        productAvailability: 'Disponibilité des Produits'
      },
      
      roleManagementPermissions: {
        read: 'Lire',
        write: 'Écrire',
        delete: 'Supprimer',
        manageUsers: 'Gérer les Utilisateurs',
        manageSettings: 'Gérer les Paramètres',
        manageRoles: 'Gérer les Rôles',
        viewReports: 'Voir les Rapports',
        exportData: 'Exporter les Données',
        importData: 'Importer les Données'
      },
      
      chatExtended: {
        filesAttached: 'Fichiers Joints',
        detailedResponseFrom: 'Réponse détaillée de {agentId} à "{message}"',
        detailedResponseContent: 'Ceci est l\'analyse spécifique et détaillée et la réponse de cet agent avec tous les détails et informations pertinents que cet agent peut fournir.',
        basedOnAnalysis: 'Basé sur l\'analyse de tous les {count} agents actifs concernant votre demande "{message}"',
        orchestratorSummary: 'L\'IA Orchestrateur a interprété et résumé les réponses. Ceci est une synthèse intelligente des informations de toutes les sources ({modules}), vous fournissant une réponse claire et compréhensible.',
        forDetailedInfo: 'Pour des informations détaillées d\'agents individuels, cliquez sur les badges correspondants ci-dessous.',
        filesAdded: '{count} fichier(s) ajouté(s)'
      }
    },
    
    // Prompts & Frameworks
    promptsFrameworks: {
      // Tabs/Headers
      promptLibrary: 'Bibliothèque de Prompts',
      frameworks: 'Cadres',
      
      // Actions
      edit: 'Modifier',
      duplicate: 'Dupliquer',
      createNew: 'Créer Nouveau',
      delete: 'Supprimer',
      
      // Labels
      promptLabel: 'Prompt :',
      structureLabel: 'Structure :',
      title: 'Titre',
      description: 'Description',
      category: 'Catégorie',
      
      // Counts
      promptsCount: 'Prompts',
      frameworksCount: 'Cadres',
      
      // Headers
      promptCategories: 'Catégories de Prompts',
      promptCategoriesDescription: 'Sélectionnez une catégorie pour voir les prompts disponibles',
      frameworkCategories: 'Catégories de Cadres',
      frameworkCategoriesDescription: 'Sélectionnez une catégorie pour voir les cadres disponibles',
      
      // Search
      searchPlaceholder: 'Rechercher des catégories...',
      noCategoriesFound: 'Aucune catégorie trouvée',
      
      // Edit Panel
      editPrompt: 'Modifier le Prompt',
      editFramework: 'Modifier le Cadre',
      duplicatePrompt: 'Dupliquer le Prompt',
      duplicateFramework: 'Dupliquer le Cadre',
      createNewPrompt: 'Créer un Nouveau Prompt',
      createNewFramework: 'Créer un Nouveau Cadre',
      
      // Form Fields
      titleLabel: 'Titre',
      titlePlaceholder: 'Titre du Prompt',
      frameworkTitlePlaceholder: 'Titre du Cadre',
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Brève description du prompt',
      frameworkDescriptionPlaceholder: 'Brève description du cadre',
      promptPlaceholder: 'Texte du Prompt',
      frameworkPlaceholder: 'Structure du Cadre',
      promptContentLabel: 'Prompt',
      frameworkContentLabel: 'Structure',
      
      // Buttons
      saveButton: 'Enregistrer',
      cancelButton: 'Annuler',
      
      // Delete Dialog
      deletePromptTitle: 'Supprimer le Prompt',
      deleteFrameworkTitle: 'Supprimer le Cadre',
      deletePromptMessage: 'Êtes-vous sûr de vouloir supprimer ce prompt ? Cette action ne peut pas être annulée.',
      deleteFrameworkMessage: 'Êtes-vous sûr de vouloir supprimer ce cadre ? Cette action ne peut pas être annulée.',
      confirmDelete: 'Supprimer',
      
      // Copy suffix
      copySuffix: '(Copie)',
      
      // Category Names
      categoryNames: {
        market: 'Marché & Concurrence',
        planning: 'Planification & Mise en Œuvre',
        strategy: 'Stratégie & Croissance',
        sales: 'Ventes',
        service: 'Service Client',
        finance: 'Finance & Reporting',
        hr: 'RH & Recrutement',
        learning: 'Apprentissage & Connaissance',
        organization: 'Organisation & Collaboration',
        coaching: 'Coaching & Développement',
        promptEngineering: 'Création & Optimisation de Prompts',
        quality: 'Qualité & Amélioration des Résultats',
        criticalAnalysis: 'Analyse Critique & Pré-Questions',
        // Frameworks
        mission: 'Cadres de Mission',
        thinking: 'Cadres de Réflexion',
        expression: 'Cadres d\'Expression',
        interaction: 'Cadres d\'Interaction'
      },
      
      // Category Descriptions
      categoryDescriptions: {
        market: 'Analyse de marché, veille concurrentielle et positionnement',
        planning: 'Planification de projets, feuilles de route et stratégies de mise en œuvre',
        strategy: 'Stratégies commerciales, planification de la croissance et innovation',
        sales: 'Prompts pour conversations commerciales, acquisition de clients et stratégies de vente',
        service: 'Support client, communication et excellence du service',
        finance: 'Planification financière, contrôle et rapports d\'entreprise',
        hr: 'Recrutement, développement des employés et processus RH',
        learning: 'Transfert de connaissances, formation et documentation',
        organization: 'Travail d\'équipe, processus et collaboration',
        coaching: 'Développement personnel, mentorat et feedback',
        promptEngineering: 'Créer et améliorer des prompts IA efficaces',
        quality: 'Augmenter et affiner la qualité des résultats',
        criticalAnalysis: 'Questionner et affiner les exigences',
        // Frameworks
        mission: 'Cadres pour la création structurée de tâches et d\'instructions précises',
        thinking: 'Cadres pour des structures de pensée claires et une réflexion stratégique',
        expression: 'Cadres pour une communication ciblée et la production de contenu',
        interaction: 'Cadres pour une communication coopérative, le coaching et les processus itératifs'
      }
    }
  },
  
  'pt-br': {
    // Common
    save: 'Salvar',
    cancel: 'Cancelar',
    close: 'Fechar',
    open: 'Abrir',
    settings: 'Configurações',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    warning: 'Aviso',
    
    // Login
    login: {
      title: 'Login AI Hub',
      subtitle: 'Faça login para acessar os módulos de IA',
      username: 'Nome de usuário',
      password: 'Senha',
      loginButton: 'Entrar',
      forgotPassword: 'Esqueceu a senha?',
      invalidCredentials: 'Credenciais inválidas',
      welcomeBack: 'Bem-vindo de volta!',
      // 2FA
      twoFactorTitle: 'Autenticação de Dois Fatores',
      twoFactorSubtitle: 'Digite o código de 6 dígitos',
      twoFactorAuthDescription: 'Por favor, digite o código de 6 dígitos do seu aplicativo autenticador',
      codeLabel: 'Código de Verificação',
      codePlaceholder: '000000',
      verifyButton: 'Verificar Código',
      invalidCode: 'Código inválido',
      resendCode: 'Reenviar código',
      confirmButton: 'Confirmar',
      // Login form fields
      selectTenantLabel: 'Selecionar Tenant',
      selectTenantPlaceholder: 'Escolha um tenant',
      passwordPlaceholder: 'Senha',
      versionLabel: 'Versão',
      desktopLabel: 'Desktop',
      mobileLabel: 'Mobile',
      copyright: '© 2025. Todos os direitos reservados.',
      // Error messages
      errorSelectTenant: 'Por favor, selecione um tenant',
      errorPasswordEmpty: 'A senha não pode estar vazia',
      errorPasswordTooShort: 'A senha deve ter pelo menos 4 caracteres',
      errorInvalidPassword: 'Senha inválida. Use: password, 1234, test ou demo',
      errorCode6Digits: 'Por favor, digite um código de 6 dígitos',
      errorInvalidCode: 'Código inválido. Use: 123456, 000000 ou 111111',
      // Demo hints
      demoCodeHint: 'Dica: Use 123456, 000000 ou 111111 para demo'
    },
    
    // Header
    header: {
      aiHub: 'AI Hub',
      chat: 'Chat',
      options: 'Opções',
      logout: 'Sair',
      welcomeMessage: 'Bem-vindo',
      tenantAdministrator: 'Administrador de Tenant',
      tagline: 'controle seus dados'
    },
    
    // Admin Menus
    admin: {
      tenant: {
        title: 'Tenant',
        selectTenant: 'Seleção Tenant',
        agentAssignment: 'Atribuição Agente',
        api: 'API',
        permissions: 'Permissões'
      },
      profile: {
        title: 'Perfil',
        account: 'Conta',
        logout: 'Sair'
      }
    },
    
    // Account Panel
    accountPanel: {
      title: 'Configurações da Conta',
      language: 'Idioma',
      design: 'Design',
      logout: 'Encerrar Sessão',
      darkModeTitle: 'Design Escuro',
      darkModeDescription: 'Ativa o modo escuro para todo o aplicativo',
      logoutDescription: 'Saia da sua conta',
      logoutButton: 'Sair'
    },
    
    // Account Settings
    account: {
      title: 'Configurações da Conta',
      subtitle: 'Gerencie seu perfil e preferências',
      profilePicture: 'Foto do Perfil',
      profilePictureDescription: 'Carregue uma foto de perfil ou altere a existente',
      uploadImage: 'Carregar Imagem',
      removeImage: 'Remover Imagem',
      changePassword: 'Alterar Senha',
      currentPassword: 'Senha Atual',
      newPassword: 'Nova Senha',
      confirmPassword: 'Confirmar Senha',
      updatePassword: 'Atualizar Senha',
      passwordMismatch: 'As senhas não coincidem',
      passwordUpdated: 'Senha atualizada com sucesso',
      languageSection: 'Idioma',
      languageDescription: 'Escolha seu idioma preferido',
      themeSection: 'Tema',
      themeDescription: 'Escolha entre tema claro e escuro',
      personalInfo: 'Informações Pessoais',
      personalInfoDescription: 'Detalhes da sua conta e informações do usuário',
      username: 'Nome de usuário',
      email: 'Email',
      role: 'Função',
      saveChanges: 'Salvar Alterações',
      // New additions for AccountSettings
      displayName: 'Nome de Exibição',
      phoneNumber: 'Número de Telefone',
      jobTitle: 'Cargo',
      department: 'Departamento',
      emailPlaceholder: 'seu.email@empresa.com',
      phoneNumberPlaceholder: '+55 XX XXXXX XXXX',
      jobTitlePlaceholder: 'ex. Desenvolvedor de Software',
      departmentPlaceholder: 'ex. TI, Marketing, Vendas',
      imageTooLarge: 'Imagem muito grande. Máximo 5MB permitido.',
      passwordTooShort: 'A senha deve ter pelo menos 6 caracteres',
      endSession: 'Encerrar Sessão',
      endSessionDescription: 'Saia da sua conta e retorne ao login',
      logoutNow: 'Sair Agora',
      administrator: 'Administrador',
      user: 'Usuário'
    },
    
    // Mobile Layout
    mobileLayout: {
      chatDescription: 'Interface de chat para interagir com agentes de IA',
      optionsDescription: 'Configurações e configuração de agentes',
      accountDescription: 'Configurações da conta de usuário e gerenciamento de perfil'
    },
    
    // Agent Settings
    agentSettings: {
      title: 'Configurações do Orquestrador',
      subtitle: 'Configure agentes e comportamento da IA',
      availableAgents: 'Agentes Disponíveis',
      agentDescription: 'Visão geral de todos os agentes de IA disponíveis e suas funções',
      active: 'Ativo',
      available: 'Disponível',
      private: 'Privado',
      public: 'Público',
      activated: 'Ativado',
      deactivated: 'Desativado',
      
      // Theme Settings
      themeSettings: 'Configurações de Tema',
      themeDescription: 'Escolha entre tema claro e escuro',
      darkMode: 'Modo Escuro',
      darkModeDescription: 'Ativa o modo escuro para toda a aplicação',
      
      // Language Settings
      languageSettings: 'Configurações de Idioma',
      languageDescription: 'Escolha o idioma desejado para as respostas da IA',
      language: 'Idioma',
      
      // Custom Prompt
      customPrompt: 'Adição de Prompt do Sistema',
      customPromptDescription: 'Este texto será incluído como contexto com cada solicitação',
      customPromptLabel: 'Prompt Adicional',
      customPromptPlaceholder: 'ex. "Sempre responda como um especialista em..." ou "Sempre considere as seguintes diretrizes da empresa..."',
      customPromptTip: 'Dica: Use instruções específicas para adaptar as respostas da IA às suas necessidades.',
      
      // Response Settings
      responseSettings: 'Configuração de Respostas',
      responseDescription: 'Determine o tipo e estilo das respostas da IA',
      responseLength: 'Comprimento da Resposta',
      responseTone: 'Tom da Resposta',
      creativity: 'Criatividade (Temperatura)',
      creativityDescription: 'Valores mais altos = mais criativo, mais baixos = mais focado',
      conservative: 'Conservador',
      creative: 'Criativo',
      preciseLabel: 'Muito preciso',
      balancedLabel: 'Equilibrado',
      creativeLabel: 'Muito criativo',
      
      // Response Length Options
      short: 'Curto & Preciso',
      medium: 'Padrão',
      long: 'Detalhado',
      comprehensive: 'Muito detalhado',
      
      // Response Tone Options
      professional: 'Profissional',
      casual: 'Casual',
      friendly: 'Amigável',
      formal: 'Formal',
      expert: 'Nível especialista'
    },
    
    // Orchestrator Panel
    orchestratorPanel: {
      configureSettings: 'Configure as configurações para geração de respostas de IA',
      active: 'Ativo',
      inactive: 'Inativo',
      start: 'Iniciar',
      stop: 'Parar',
      modelConfig: 'Configuração do Modelo',
      modelConfigDescription: 'Selecione o modelo de IA e parâmetros básicos',
      aiModel: 'Modelo de IA',
      maxTokens: 'Tokens Máximos',
      streamingEnabled: 'Streaming Ativado',
      advancedParams: 'Parâmetros Avançados',
      advancedParamsDescription: 'Ajuste fino da geração de respostas de IA',
      temperature: 'Temperatura',
      topP: 'Top-P',
      frequencyPenalty: 'Penalidade de Frequência',
      presencePenalty: 'Penalidade de Presença',
      systemPrompt: 'Prompt do Sistema',
      systemPromptDescription: 'Defina o comportamento e a personalidade da IA',
      systemPromptPlaceholder: 'Digite o prompt do sistema aqui...',
      reset: 'Redefinir'
    },
    
    // Agents
    agents: {
      emailAgent: {
        name: 'Agente de Email',
        description: 'Compõe e gerencia correspondência por email com qualidade profissional.',
        capabilities: ['Composição de Email', 'Agendamento', 'Follow-ups']
      },
      normenAgent: {
        name: 'Agente de Normas',
        description: 'Especializado em padrões, normas e requisitos de conformidade.',
        capabilities: ['Padrões ISO', 'Conformidade', 'Verificação de Normas']
      },
      internetAgent: {
        name: 'Agente de Internet',
        description: 'Pesquisa informações atuais da internet e fontes web.',
        capabilities: ['Pesquisa Web', 'Dados Atuais', 'Verificação de Fatos']
      },
      jelmoliAgent: {
        name: 'Agente Jelmoli',
        description: 'Agente específico da empresa para processos e informações internas da Jelmoli.',
        capabilities: ['Informações da Empresa', 'Processos Internos', 'Dados de Produtos']
      }
    },
    
    // Chat Interface
    chat: {
      title: 'Chat do Orquestrador',
      placeholder: 'Digite sua mensagem...',
      send: 'Enviar',
      thinking: 'Pensando...',
      welcomeMessage: 'Olá! Eu sou seu Orquestrador de IA. Como posso ajudá-lo hoje?',
      noActiveAgents: 'Nenhum agente ativado',
      activeAgents: 'Agentes Ativos',
      
      history: {
        chatUnpinned: 'Chat desafixado',
        chatPinned: 'Chat fixado',
        chatDeleted: 'Chat excluído',
        titleUpdated: 'Título atualizado',
        folderCreated: 'Pasta criada',
        chatMoved: 'Chat movido',
        folderColorChanged: 'Cor da pasta alterada',
        folderRenamed: 'Pasta renomeada',
        spaceDeleted: 'Espaço excluído',
        yesterday: 'Ontem',
        lastWeek: 'Última Semana',
        lastMonth: 'Último Mês',
        older: 'Mais Antigo',
        deleteSpaceMessage: 'Tem certeza que deseja excluir este espaço? Os chats neste espaço serão movidos para "Todos os Chats". Esta ação não pode ser desfeita.',
        allChats: 'Todos os Chats',
        noChatsFound: 'Nenhum chat encontrado',
        searchPlaceholder: 'Pesquisar...',
        deleteChatTitle: 'Excluir Chat',
        deleteChatMessage: 'Tem certeza que deseja excluir este chat?',
        deleteSpaceTitle: 'Excluir Espaço',
        delete: 'Excluir',
        pin: 'Fixar',
        unpin: 'Desafixar',
        rename: 'Renomear',
        newSpace: 'Novo Espaço',
        newChat: 'Novo Chat',
        cancel: 'Cancelar',
        renameAction: 'Renomear',
        cannotUndo: 'Esta ação não pode ser desfeita.',
        search: 'Pesquisar',
        unpinAction: 'Desafixar',
        pinAction: 'Fixar',
        collapse: 'Recolher'
      },
      
      interface: {
        messageDeleted: 'Mensagem excluída',
        messageCopied: 'Mensagem copiada',
        addFiles: 'Adicionar arquivos',
        recordAudio: 'Gravar áudio',
        addPhotosAndFiles: 'Adicionar fotos e arquivos',
        takeScreenshot: 'Tirar captura de tela',
        takePhoto: 'Tirar foto',
        deepResearch: 'Pesquisa Profunda',
        createImage: 'Criar imagem',
        screenshotInDevelopment: 'Recurso de captura de tela em desenvolvimento',
        deepResearchInDevelopment: 'Pesquisa profunda em desenvolvimento',
        createImageInDevelopment: 'Criar imagem em desenvolvimento',
        dropFilesHere: 'Solte os arquivos aqui',
        dropFilesDescription: 'PDFs, imagens e outros arquivos',
        copy: 'Copiar',
        deleteAction: 'Excluir'
      }
    },
    
    // Window Actions
    window: {
      minimize: 'Minimizar',
      maximize: 'Maximizar',
      restore: 'Restaurar',
      close: 'Fechar',
      clickToRestore: 'Clique para restaurar'
    },
    
    // Languages
    languages: {
      de: 'Deutsch',
      en: 'English',
      fr: 'Français',
      'pt-br': 'Português (Brasil)'
    },
    
    // Tenant Administration
    tenantAdmin: {
      title: 'Administração Tenant AI Hub',
      settingsLabel: 'Configurações',
      lightMode: 'Modo Claro',
      darkMode: 'Modo Escuro',
      language: 'Idioma',
      logout: 'Sair',
      version: 'AI Hub v2.4.1',
      sidebar: {
        tenantAdmin: 'Admin Tenant',
        dashboard: 'Painel',
        tenantSettings: 'Configurações Tenant',
        userRoles: 'Usuários & Funções',
        modulesFeatures: 'Módulos & Recursos',
        dataManagement: 'Gestão de Dados',
        promptsFrameworks: 'Prompts & Frameworks',
        loggingMonitoring: 'Registro & Monitoramento',
        supportDocs: 'Suporte & Documentação',
      },
      tenantSettingsSub: { general: 'Informações Gerais', compliance: 'Conformidade', euAiAct: 'Lei de IA da UE', dsgvo: 'LGPD', responsibilities: 'Responsabilidades', security: 'Segurança' },
      userManagementSub: { users: 'Gestão de Usuários', dsgvo: 'Gestão LGPD', roles: 'Funções & Permissões', departments: 'Departamentos & Prompts' },
      modulesSub: { models: 'Modelos LLM', overview: 'Orchestrator & Agents' },
      dataSub: { backups: 'Backups & Restauração' },
      promptsSub: { library: 'Biblioteca de Prompts', frameworks: 'Frameworks' },
      monitoringSub: { activity: 'Registro de Atividades', system: 'Monitoramento Sistema', alerts: 'Alertas & Notificações' },
      supportSub: {
        documentation: 'Documentação',
        faq: 'Perguntas Frequentes',
        tickets: 'Tickets de Suporte',
        tutorials: 'Tutoriais em Vídeo',
        api: 'Documentação API',
        contact: 'Fale Conosco',
      },
      dashboard: {
        title: 'Painel', welcome: 'Bem-vindo', overview: 'Visão Geral', quickStats: 'Estatísticas Rápidas',
        activeUsers: 'Usuários Ativos', totalModels: 'Total de Modelos', storageUsed: 'Armazenamento Usado', apiCalls: 'Chamadas API',
        recentActivity: 'Atividade Recente', systemHealth: 'Saúde do Sistema', healthy: 'Saudável', noActivity: 'Nenhuma atividade recente'
      },
      settings: {
        title: 'Configurações Tenant',
        general: { title: 'Informações Gerais', subtitle: 'Configurações básicas para seu tenant', tenantName: 'Nome do Tenant', 
          tenantId: 'ID Tenant', description: 'Descrição', contactEmail: 'Email de Contato', timezone: 'Fuso Horário', saveChanges: 'Salvar' },
        security: { title: 'Segurança & Conformidade', subtitle: 'Configurações de segurança e políticas de conformidade', 
          twoFactor: 'Autenticação de Dois Fatores', twoFactorDesc: 'Exigir 2FA para todos os usuários', 
          sessionTimeout: 'Tempo Limite de Sessão', minutes: 'Minutos', ipWhitelist: 'Lista Branca IP', 
          ipWhitelistDesc: 'Endereços IP permitidos', addIp: 'Adicionar IP' },
        access: { title: 'Acesso & Rede', subtitle: 'Configurações de rede e acesso', publicAccess: 'Acesso Público', 
          publicAccessDesc: 'Permitir acesso público a certos recursos', apiAccess: 'Acesso API', 
          apiAccessDesc: 'Habilitar acesso API externo', corsOrigins: 'Origens CORS', 
          corsOriginsDesc: 'Origens CORS permitidas', addOrigin: 'Adicionar Origem' },
      },
      userManagement: {
        title: 'Gestão de Usuários & Funções',
        users: { title: 'Gestão de Usuários', subtitle: 'Gerenciar contas de usuários e permissões', searchPlaceholder: 'Buscar usuários...', 
          addUser: 'Adicionar Usuário', newUser: 'Novo Usuário', name: 'Nome', email: 'Email', role: 'Função', status: 'Status', lastActive: 'Última Atividade', 
          actions: 'Ações', active: 'Ativo', inactive: 'Inativo', edit: 'Editar', delete: 'Excluir',
          source: 'Fonte', localUser: 'Usuário Local', azureAD: 'Azure AD', googleIdentity: 'Google Identity',
          syncUsers: 'Sincronizar Usuários', allUsers: 'Todos os Usuários', ssoUsers: 'Usuários SSO', inactiveUsers: 'Usuários Inativos',
          neverLoggedIn: 'Nunca conectado', departments: 'Departamentos', selectDepartments: 'Selecionar Departamentos', selected: 'selecionados',
          exportCSVExcel: 'Exportar (CSV/Excel)', import: 'Importar', manualSync: 'Sincronização Manual', viewSyncLogs: 'Ver Logs de Sincronização',
          syncSuccess: 'Usuários sincronizados com sucesso', syncSuccessDetails: '42 novos usuários, 2 atualizados',
          accessRightsAndRoles: 'Direitos de Acesso & Funções', setUserStatus: 'Definir usuário ativo/inativo',
          syncFromDirectory: 'Este valor é sincronizado do diretório',
          openInDirectory: 'Abrir no Diretório',
          lastLogin: 'Último Login',
          syncedAt: 'Sincronizado em',
          department: 'Departamento',
          roleAdmin: 'Administrador',
          rolePowerUser: 'Usuário Avançado',
          roleUser: 'Usuário',
          roleViewer: 'Visualizador',
          duplicate: 'Duplicar',
          assignRole: 'Atribuir Função',
          assignDepartment: 'Atribuir Departamento',
          merge: 'Mesclar',
          approval: 'Aprovação' },
        roles: { title: 'Funções & Permissões', subtitle: 'Gerenciar funções e permissões', addRole: 'Adicionar Função', 
          roleName: 'Nome da Função', permissions: 'Permissões', users: 'Usuários', created: 'Criado', 
          actions: 'Ações', edit: 'Editar', delete: 'Excluir',
          adminRights: 'Direitos Administrativos', basicPermissions: 'Permissões Básicas', dataRights: 'Direitos sobre Dados',
          roleManagement: 'Gestão de funções e permissões', roleManagementDesc: 'Gerenciar funções e permissões' },
        departments: {
          title: 'Categorias de Prompts & Departamentos',
          subtitle: 'Atribuição de categorias de prompts a departamentos ou usuários individuais.',
          department: 'Departamento',
          promptCategories: 'Categorias de Prompts',
          newDepartment: 'Novo Departamento',
          editDepartment: 'Editar Departamento',
          departmentName: 'Nome do Departamento',
          editDepartmentDesc: 'Editar o departamento e atribuir categorias de prompts e usuários.',
          selectOrCreateDepartment: 'Selecionar departamento ou criar novo...',
          createNewDepartment: 'Criar Novo Departamento',
          enterDepartmentName: 'Inserir novo nome de departamento...',
          deleteDepartmentTitle: 'Você realmente deseja excluir este departamento?',
          deleteDepartmentDesc: 'Esta ação não pode ser desfeita.',
          assignDepartmentTitle: 'Atribuir Departamento',
          assignDepartmentDesc: 'Selecionar um departamento existente ou criar um novo.',
          selectDepartment: 'Selecionar departamento...',
          renameDepartmentTitle: 'Renomear Departamento',
          renameDepartmentDesc: 'Inserir o novo nome para o departamento.',
          newDepartmentName: 'Novo Nome do Departamento',
          noDepartmentAssigned: 'Se nenhum departamento for atribuído, usuários individuais podem ser atribuídos.',
          assignUsers: 'Atribuir Usuários',
          allUsers: 'Todos os Usuários',
          assignCategories: 'Atribuir Categorias',
          allCategories: 'Todas as Categorias',
          save: 'Salvar',
          cancel: 'Cancelar',
          create: 'Criar',
          select: 'Selecionar',
          rename: 'Renomear',
          active: 'Ativo',
          inactive: 'Inativo',
          all: 'Todos',
          // Específico do diálogo
          assignPromptCategory: 'Atribuir Categoria de Prompt',
          promptCategory: 'Categoria de Prompt',
          categoriesSelected: 'categorias selecionadas',
          usersSelected: 'usuários selecionados',
          users: 'Usuários',
          searchUsers: 'Buscar usuários...',
          status: 'Status',
          edit: 'Editar',
          duplicate: 'Duplicar',
          delete: 'Excluir',
          // Tabela
          managementTitle: 'Gestão de Categorias de Prompts',
          actions: 'Ações',
          categories: 'Categorias',
          noUsersAssigned: 'Nenhum usuário atribuído',
          newDepartmentTooltip: 'Novo Departamento',
        },
        promptCategories: {
          addNewCategory: 'Adicionar Nova Categoria de Prompt',
          addNewCategoryDesc: 'Inserir o nome da nova categoria de prompt.',
          categoryName: 'Nome da Categoria',
          renameCategory: 'Renomear Categoria de Prompt',
          renameCategoryDesc: 'Inserir o novo nome para a categoria de prompt.',
          newCategoryName: 'Novo Nome da Categoria',
          add: 'Adicionar',
        },
      },
      dataManagement: {
        title: 'Gestão de Dados',
        backups: { title: 'Backups & Restauração', subtitle: 'Gerenciar backups e restaurações de dados', createBackup: 'Criar Backup', 
          backupName: 'Nome do Backup', size: 'Tamanho', created: 'Criado', status: 'Status', actions: 'Ações', 
          restore: 'Restaurar', download: 'Baixar', delete: 'Excluir', completed: 'Concluído', 
          inProgress: 'Em Andamento', failed: 'Falhou', autoBackup: 'Backup Automático', 
          autoBackupDesc: 'Habilitar backups automáticos', backupFrequency: 'Frequência de Backup', 
          daily: 'Diário', weekly: 'Semanal', monthly: 'Mensal' },
      },
      monitoring: {
        activity: { title: 'Registro de Atividades', subtitle: 'Visão geral de todas as atividades do sistema', filterByUser: 'Filtrar por Usuário', 
          filterByAction: 'Filtrar por Ação', allUsers: 'Todos Usuários', allActions: 'Todas Ações', timestamp: 'Data/Hora', 
          user: 'Usuário', action: 'Ação', details: 'Detalhes', ipAddress: 'Endereço IP' },
        system: { title: 'Monitoramento Sistema', subtitle: 'Monitorar desempenho do sistema', cpuUsage: 'Uso CPU', 
          memoryUsage: 'Uso Memória', diskUsage: 'Uso Disco', networkTraffic: 'Tráfego Rede', uptime: 'Tempo Ativo', 
          lastRestart: 'Última Reinicialização', systemHealth: 'Saúde Sistema', healthy: 'Saudável', warning: 'Aviso', critical: 'Crítico' },
        alerts: { title: 'Alertas & Notificações', subtitle: 'Gerenciar alertas e notificações do sistema', createAlert: 'Criar Alerta', 
          alertName: 'Nome Alerta', type: 'Tipo', severity: 'Gravidade', status: 'Status', created: 'Criado', 
          actions: 'Ações', edit: 'Editar', delete: 'Excluir', active: 'Ativo', inactive: 'Inativo', 
          high: 'Alto', medium: 'Médio', low: 'Baixo' },
      },
      support: {
        title: 'Suporte & Documentação',
        overview: { title: 'Visão Geral', welcome: 'Bem-vindo ao Suporte', description: 'Encontre ajuda, documentação e recursos de suporte aqui', 
          gettingStarted: 'Primeiros Passos', gettingStartedDesc: 'Comece aqui com AI Hub', 
          documentation: 'Documentação', documentationDesc: 'Documentação completa do produto', 
          support: 'Suporte', supportDesc: 'Entre em contato com nossa equipe de suporte', 
          updates: 'Atualizações & Novidades', updatesDesc: 'Últimas atualizações e mudanças' },
        documentation: { title: 'Documentação', search: 'Buscar documentação...', categories: 'Categorias', 
          gettingStarted: 'Primeiros Passos', userGuide: 'Guia do Usuário', adminGuide: 'Guia Admin', 
          apiDocs: 'Documentação API', troubleshooting: 'Solução de Problemas' },
        faq: { title: 'FAQ', search: 'Buscar FAQ...', categories: 'Categorias', general: 'Geral', 
          technical: 'Técnico', billing: 'Faturamento', security: 'Segurança' },
        tickets: { title: 'Tickets Suporte', createTicket: 'Criar Ticket', ticketNumber: 'Número Ticket', 
          subject: 'Assunto', status: 'Status', priority: 'Prioridade', created: 'Criado', actions: 'Ações', 
          open: 'Aberto', inProgress: 'Em Andamento', resolved: 'Resolvido', closed: 'Fechado', view: 'Ver' },
        contact: { title: 'Contato', description: 'Entre em contato com nossa equipe de suporte', email: 'Email', 
          phone: 'Telefone', availability: 'Disponibilidade', emergencySupport: 'Suporte de Emergência', 
          sendMessage: 'Enviar Mensagem', name: 'Nome', emailLabel: 'Email', message: 'Mensagem', submit: 'Enviar' },
      },
      
      supportDocumentation: {
        title: 'Suporte & Documentação',
        ticketStatus: {
          open: 'Aberto',
          inProgress: 'Em Andamento',
          resolved: 'Resolvido',
          closed: 'Fechado',
        },
        ticketPriority: {
          low: 'Baixa',
          medium: 'Média',
          high: 'Alta',
          urgent: 'Urgente',
        },
        documentation: {
          searchTitle: 'Navegar na Documentação',
          searchDescription: 'Encontre guias, melhores práticas e referências técnicas',
          searchPlaceholder: 'Pesquisar documentação...',
          learnMore: 'Saber mais',
          noDocsFound: 'Nenhuma documentação encontrada',
          downloads: 'Downloads',
          downloadsDescription: 'Manuais e recursos adicionais',
          userManual: 'Manual do Usuário AI Hub',
          adminGuide: 'Guia do Administrador',
          apiDocs: 'Documentação da API',
          download: 'Baixar',
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
              description: 'Crie backups e restaure seus dados em caso de emergência.',
              category: 'Gestão de Dados'
            },
            securityCompliance: { 
              title: 'Segurança & Conformidade', 
              description: 'Melhores práticas para segurança, 2FA e requisitos de conformidade.',
              category: 'Segurança'
            },
            apiDocumentation: { 
              title: 'Documentação da API', 
              description: 'Referência completa da API REST AI Hub para desenvolvedores.',
              category: 'Desenvolvedor'
            },
            monitoringLogging: { 
              title: 'Monitoramento & Registro', 
              description: 'Monitore o desempenho do sistema e analise logs de atividade.',
              category: 'Monitoramento'
            },
            troubleshooting: { 
              title: 'Guia de Solução de Problemas', 
              description: 'Soluções para problemas comuns e mensagens de erro.',
              category: 'Solução de Problemas'
            },
          },
        },
        faq: {
          title: 'Perguntas Frequentes',
          description: 'Encontre respostas rápidas para perguntas comuns',
          needMoreHelp: 'Precisa de Mais Ajuda?',
          needMoreHelpDesc: 'Se você não encontrar sua pergunta aqui, você pode navegar para outras áreas de suporte através da barra lateral',
          management: 'Gerenciamento de FAQ',
          managementDesc: 'Gerenciar perguntas frequentes',
          createNew: 'Criar Nova FAQ',
          editFaq: 'Editar FAQ',
          panelCreateTitle: 'Criar Nova FAQ',
          panelEditTitle: 'Editar FAQ',
          questionLabel: 'Pergunta',
          categoryLabel: 'Categoria',
          answerLabel: 'Resposta',
          tips: 'Dicas para Boas FAQs:',
          tip1: 'Formule perguntas como os usuários as fariam',
          tip2: 'Mantenha as respostas concisas e compreensíveis',
          tip3: 'Use exemplos para esclarecer',
          tip4: 'Adicione links para documentação adicional',
          minCharsRecommended: 'Pelo menos 50 caracteres recomendados',
          createButton: 'Criar FAQ',
          saveChanges: 'Salvar Alterações',
          successCreated: 'FAQ criada',
          successUpdated: 'FAQ atualizada',
          changesSaved: 'As alterações foram salvas.',
          categories: {
            general: 'Geral',
            technical: 'Técnico',
            billing: 'Faturamento',
            security: 'Segurança',
            setup: 'Configuração',
            troubleshooting: 'Solução de Problemas',
          },
        },
        tickets: {
          createTitle: 'Criar Novo Ticket de Suporte',
          createDescription: 'Descreva seu problema e nossa equipe responderá prontamente',
          yourTicketsTitle: 'Seus Tickets de Suporte',
          yourTicketsDescription: 'Visão geral de suas solicitações atuais e passadas',
          subjectLabel: 'Assunto',
          priorityLabel: 'Prioridade',
          messageLabel: 'Mensagem',
          submitButton: 'Enviar Ticket',
          noTickets: 'Nenhum ticket de suporte disponível',
          created: 'Criado',
          updated: 'Atualizado',
          successTitle: 'Ticket de Suporte Criado!',
          confirmationEmail: 'Você receberá um email de confirmação.',
        },
        tutorials: {
          title: 'Tutoriais em Vídeo',
          description: 'Guias em vídeo passo a passo para todos os recursos importantes',
          duration: 'Duração',
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
              title: 'Configurando Modelos LLM', 
              description: 'Configurar chaves de API e testar modelos',
              duration: '10:30 min'
            },
            agentSetup: { 
              title: 'Configurando Agentes', 
              description: 'Configurar Email Agent, Internet Agent e mais',
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
            },
          },
        },
        api: {
          title: 'Documentação da API',
          description: 'Referência da API REST para Desenvolvedores',
          authentication: 'Autenticação',
          baseUrl: 'URL Base',
          endpoints: 'Endpoints',
          endpointGetAgents: 'Recuperar lista de todos os agentes disponíveis',
          endpointPostAgentExecute: 'Executar um agente com uma solicitação',
          endpointGetModels: 'Lista de todos os modelos LLM configurados',
          endpointGetUsers: 'Recuperar usuários e suas permissões',
          endpointPostBackup: 'Criar novo backup',
          downloadFullDocs: 'Baixar documentação completa da API (PDF)',
          codeExamples: 'Exemplos de Código',
          codeExamplesDescription: 'Integração em sua aplicação',
        },
        contact: {
          supportTitle: 'Contato de Suporte',
          supportDescription: 'Entre em contato com nossa equipe de suporte',
          emailSupport: 'Suporte por Email',
          phoneSupport: 'Suporte por Telefone',
          emergencyHotline: 'Linha de Emergência 24/7',
          responseTime: 'Tempo de Resposta',
          availability: 'Disponibilidade',
          salesTitle: 'Vendas & Parcerias',
          salesDescription: 'Para perguntas sobre licenças e colaboração',
          sales: 'Vendas',
          partnerships: 'Parcerias',
          companyTitle: 'Empresa',
          companyDescription: 'RMB Group & neuco AG',
          companyInfo: 'AI Hub é desenvolvido em conjunto pela RMB Group e neuco AG',
          headquarters: 'Sede: Zurique, Suíça',
          emergencyOnly: 'Apenas para falhas críticas do sistema',
          mondayFriday: 'Seg-Sex, 08:00 - 18:00',
        },
      },
      
      models: { title: 'Gestão de Modelos', subtitle: 'Gerenciar modelos IA e suas configurações', addModel: 'Adicionar Modelo', 
        modelName: 'Nome Modelo', provider: 'Provedor', version: 'Versão', status: 'Status', lastUsed: 'Última Utilização', 
        actions: 'Ações', active: 'Ativo', inactive: 'Inativo', configure: 'Configurar', delete: 'Excluir',
        edit: 'Editar', cancel: 'Cancelar', save: 'Salvar', deleteConfirm: 'Confirmar Exclusão',
        deleteMessage: 'Tem certeza de que deseja excluir este modelo? Esta ação não pode ser desfeita.',
        // Dialog
        editModel: 'Editar Modelo',
        basicInfo: 'Informações Básicas',
        modelNameLabel: 'Nome do Modelo *',
        modelNameHelp: 'Um nome descritivo para referência interna',
        providerLabel: 'Provedor *',
        modelIdLabel: 'ID do Modelo *',
        modelIdHelp: 'O ID técnico do modelo do provedor',
        apiConfiguration: 'Configuração API',
        apiKeyInfo: 'As chaves API são armazenadas criptografadas e são visíveis apenas no sistema',
        apiKeyLabel: 'Chave API *',
        notes: 'Notas',
        notesPlaceholder: 'Informações adicionais ou detalhes de configuração...' },
      moduleOverview: { title: 'Visão Geral Módulos', subtitle: 'Visão geral de todos os módulos disponíveis', moduleName: 'Nome Módulo', 
        status: 'Status', version: 'Versão', users: 'Usuários', actions: 'Ações', enabled: 'Habilitado', 
        disabled: 'Desabilitado', configure: 'Configurar', disable: 'Desabilitar', enable: 'Habilitar',
        newAgent: 'Novo Agente', editAgent: 'Editar Agente', agentName: 'Nome do Agente',
        agentDescription: 'Descrição', agentType: 'Tipo de Agente', agentCapabilities: 'Capacidades',
        addCapability: 'Adicionar Capacidade', removeCapability: 'Remover',
        capabilityPlaceholder: 'ex. Enviar emails, Analisar dados...', saveAgent: 'Salvar Agente' },
      
      thinkTank: {
        title: 'Think Tank', subtitle: 'Análise de Cenário Multi-Perspectivas',
        scenario: 'Cenário / Questão', scenarioPlaceholder: 'Descreva seu cenário ou questão...',
        perspectives: 'Perspectivas', addPerspective: 'Adicionar Perspectiva', removePerspective: 'Remover',
        startSession: 'Iniciar Sessão', stopSession: 'Parar Sessão', clearSession: 'Redefinir Sessão',
        thinking: 'Analisando...', perspectivePlaceholder: 'ex. CEO, CTO, Cliente, Investidor...'
      },
      
      roleManagement: {
        newRole: 'Criar Nova Função', editRole: 'Editar Função', roleName: 'Nome da Função',
        roleDescription: 'Descrição', permissions: 'Permissões', assignedUsers: 'Usuários Atribuídos',
        selectUsers: 'Selecionar Usuários', usersSelected: 'selecionados',
        searchUsers: 'Buscar usuários...', allUsers: 'Todos os Usuários',
        selectAll: 'Selecionar Todos', deselectAll: 'Desselecionar Todos',
        saveRole: 'Salvar Função', deleteRole: 'Excluir Função',
        subtitle: 'Modificar informações e permissões da função',
        basicInfo: 'Informações Básicas',
        roleNameLabel: 'Nome da Função *',
        roleNamePlaceholder: 'ex. Gerente de Conteúdo',
        descriptionLabel: 'Descrição',
        descriptionPlaceholder: 'Breve descrição da função',
        usersLabel: 'Usuários Atribuídos',
        users: 'Usuários',
        noUsersAssigned: 'Nenhum usuário atribuído',
        permissionsLabel: 'Permissões',
        selectNone: 'Nenhum',
        basicPermissions: 'Permissões Básicas',
        adminRights: 'Direitos Administrativos',
        dataRights: 'Direitos de Dados',
        permCreate: 'Criar',
        permRead: 'Ler',
        permUpdate: 'Atualizar',
        permDelete: 'Excluir',
        permManageUsers: 'Gerenciar Usuários',
        permManageSettings: 'Gerenciar Configurações',
        permManageRoles: 'Gerenciar Funções',
        permViewReports: 'Ver Relatórios',
        permExportData: 'Exportar Dados',
        permImportData: 'Importar Dados'
      },
      
      userManagementExtended: {
        department: 'Departamento', departments: 'Departamentos', selectDepartments: 'Selecionar Departamentos',
        departmentsSelected: 'selecionados', newDepartment: 'Novo Departamento', allUsers: 'Todos os Usuários',
        filterByDepartment: 'Filtrar por Departamento', showAllUsers: 'Mostrar Todos os Usuários',
        showActiveOnly: 'Somente Usuários Ativos', editUser: 'Editar Usuário', newUser: 'Novo Usuário',
        firstName: 'Primeiro Nome', lastName: 'Sobrenome', phoneNumber: 'Número de Telefone',
        position: 'Cargo', hireDate: 'Data de Contratação', selectRole: 'Selecionar Função',
        selectStatus: 'Selecionar Status', saveUser: 'Salvar Usuário'
      },
      
      modelManagementExtended: {
        newModel: 'Novo Modelo', editModel: 'Editar Modelo', modelType: 'Tipo de Modelo',
        apiKey: 'Chave API', endpoint: 'Endpoint', maxTokens: 'Tokens Máximos',
        temperature: 'Temperatura', topP: 'Top P', saveModel: 'Salvar Modelo', testModel: 'Testar Modelo',
        title: 'Gerenciamento de Modelos LLM',
        statsTotal: 'Total',
        statsActive: 'Ativo',
        statsInactive: 'Inativo',
        statsError: 'Erro',
        configuredModels: 'Modelos Configurados',
        modelsCount: 'modelos',
        model: 'Modelo',
        modelId: 'ID do Modelo',
        sort: 'Ordenar',
        lastTested: 'Último Teste',
        usedBy: 'Usado Por',
        actions: 'Ações',
        noModelsFound: 'Nenhum modelo encontrado',
        addNewModel: 'Adicionar Novo Modelo',
        modelName: 'Nome do Modelo',
        modelNameRequired: 'Nome do Modelo *',
        modelIdRequired: 'ID do Modelo *',
        modelIdDescription: 'ID técnico do modelo do provedor',
        lastTest: 'Último Teste',
        never: 'Nunca',
        deleteConfirm: 'Confirmar Exclusão',
        deleteConfirmMessage: 'Tem certeza que deseja excluir este modelo? Esta ação não pode ser desfeita.',
        // Dialog sections
        basicInformation: 'Informações Básicas',
        modelNameHelper: 'Um nome descritivo para referência interna',
        apiConfiguration: 'Configuração da API',
        apiKeySecurityNotice: 'As chaves API são armazenadas criptografadas e são visíveis apenas no sistema',
        notes: 'Notas',
        endpointHelper: 'URL base para requisições API (necessário para Azure ou Custom Endpoints)',
        usage: 'Uso',
        addedDate: 'Adicionado',
        usedIn: 'Usado em',
        notYetUsed: 'Ainda não usado',
        modelNameLabel: 'Nome do Modelo *',
        apiKeyLabel: 'Chave API *',
        providerLabel: 'Provedor *',
        modelIdLabel: 'ID do Modelo *',
        endpointLabel: 'Endpoint da API',
        statusLabel: 'Status'
      },
      
      alertsExtended: {
        newAlert: 'Novo Alerta', editAlert: 'Editar Alerta', alertType: 'Tipo de Alerta',
        alertMessage: 'Mensagem', alertThreshold: 'Limite', alertRecipients: 'Destinatários',
        addRecipient: 'Adicionar Destinatário', emailNotification: 'Notificação por Email',
        smsNotification: 'Notificação por SMS', saveAlert: 'Salvar Alerta'
      },
      
      supportExtended: {
        manageFAQ: 'Gerenciar FAQ', newFAQ: 'Nova FAQ', editFAQ: 'Editar FAQ',
        faqQuestion: 'Pergunta', faqAnswer: 'Resposta', faqCategory: 'Categoria',
        saveFAQ: 'Salvar FAQ', deleteFAQ: 'Excluir FAQ', ticketSuccess: 'Ticket Criado com Sucesso',
        ticketSubmitted: 'Seu ticket de suporte foi criado com sucesso.',
        ticketNumber: 'Número do Ticket', backToSupport: 'Voltar ao Suporte', viewTicket: 'Ver Ticket'
      },
      
      activityLog: {
        actions: {
          backupCreated: 'Backup Criado',
          userCreated: 'Usuário Criado',
          loginFailed: 'Falha no Login',
          configChanged: 'Configuração Alterada',
          autoBackup: 'Backup Automático',
          roleAssigned: 'Função Atribuída',
          dbConnectionFailed: 'Falha na Conexão com Banco de Dados',
          healthCheck: 'Verificação de Saúde Diária'
        },
        resources: {
          userManagement: 'Gerenciamento de Usuários',
          authentication: 'Autenticação',
          normenAgent: 'Agente de Normas',
          userAnalyticsDB: 'User Analytics DB',
          agentConfigDB: 'Agent Configuration DB',
          system: 'Sistema',
          aiHubMainDB: 'AI Hub Main DB'
        },
        details: {
          invalidPassword: 'Senha Inválida'
        },
        ui: {
          title: 'Registro de Atividades',
          description: 'Monitore todas as atividades do sistema e ações do usuário',
          searchPlaceholder: 'Pesquisar registros...',
          filterByStatus: 'Filtrar por Status',
          allStatuses: 'Todos os Status',
          success: 'Sucesso',
          warning: 'Aviso',
          error: 'Erro',
          info: 'Info',
          warnings: 'Avisos',
          errors: 'Erros',
          information: 'Informações',
          exportLogs: 'Exportar Registros',
          clearFilters: 'Limpar Filtros',
          activitiesCount: 'Atividades',
          chronologicalListing: 'Listagem cronológica de todas as atividades do sistema',
          export: 'Exportar',
          timestamp: 'Carimbo de Data/Hora',
          user: 'Usuário',
          action: 'Ação',
          resource: 'Recurso',
          status: 'Status',
          ip: 'Endereço IP',
          details: 'Detalhes',
          sort: 'Ordenar',
          resetFilters: 'Redefinir Filtros',
          successful: 'Bem-sucedido',
          ipAddress: 'Endereço IP'
        }
      },
      
      dashboardExtended: {
        stats: {
          activeModules: 'Módulos Ativos',
          processedToday: 'Processado Hoje',
          avgResponseTime: 'Tempo de Resposta Méd.',
          systemLoad: 'Carga do Sistema',
          requests: 'Solicitações',
          seconds: 'Segundos',
          cpu: 'CPU'
        },
        modules: {
          chatAgent: 'Agente de Chat',
          documentAnalyzer: 'Analisador de Documentos',
          calendarAssistant: 'Assistente de Calendário',
          dataAnalyst: 'Analista de Dados',
          securityMonitor: 'Monitor de Segurança'
        },
        ui: {
          welcomeBack: 'Bem-vindo de volta',
          overviewText: 'Aqui está uma visão geral do seu sistema de IA e atividades atuais.',
          recentActivity: 'Atividade Recente',
          recentActivityDesc: 'Eventos do sistema atuais e alterações',
          systemStatus: 'Status do Sistema',
          systemStatusDesc: 'Módulos atuais e seu uso',
          viewAllActivities: 'Ver Todas as Atividades',
          detailedMetrics: 'Métricas Detalhadas',
          quickActions: 'Ações Rápidas',
          quickActionsDesc: 'Funções frequentemente usadas para acesso rápido',
          newChat: 'Novo Chat',
          configureAI: 'Configurar IA',
          manageModules: 'Gerenciar Módulos',
          settings: 'Configurações',
          statusActive: 'Ativo',
          statusWarning: 'Aviso',
          statusError: 'Erro'
        },
        cards: {
          users: 'Usuários',
          modules: 'Módulos',
          agents: 'Agentes',
          apiCalls: 'Chamadas API',
          active: 'ativo',
          inactive: 'inativo',
          moreAvailable: 'mais disponíveis',
          thisMonth: 'este mês'
        },
        quickStats: {
          uptime: 'Tempo de Atividade',
          activeSessions: 'Sessões Ativas',
          regions: 'Regiões'
        },
        systemMessages: {
          planExpiring: 'Seu plano expira em {days} dias',
          newVersionAvailable: 'Nova versão {version} disponível'
        },
        activities: {
          newUserCreated: 'Novo usuário criado',
          backupCompleted: 'Backup concluído com sucesso',
          roleUpdated: 'Função \'{role}\' atualizada',
          apiRateLimitReached: 'Limite de taxa de API atingido',
          moduleActivated: 'Módulo \'{module}\' ativado',
          chatAgentActivated: 'Agente de Chat foi ativado',
          requestsProcessed: '1.234 solicitações processadas com sucesso',
          temperatureChanged: 'Temperatura da IA alterada para 0.7',
          timeAgo: {
            minutes: 'há {count} min',
            hour: 'há 1 hora',
            hours: 'há {count} horas'
          }
        },
        notifications: {
          userLoggedIn: 'Usuário {username} conectado'
        }
      },
      
      dataManagementExtended: {
        backups: {
          scheduledBackup: 'Backup Programado',
          manualBackup: 'Backup Manual',
          allDatabases: 'Todos os Bancos de Dados'
        },
        ui: {
          title: 'Backups & Recuperação',
          databases: 'Bancos de Dados',
          successful: 'Bem-sucedido',
          failed: 'Falhou',
          newBackup: 'Criar Novo Backup',
          newBackupDesc: 'Criar um backup manual de seus bancos de dados',
          backupName: 'Nome do Backup',
          backupNamePlaceholder: 'ex. Backup Produção antes da Atualização',
          selectDatabase: 'Selecionar Banco de Dados',
          creating: 'Backup está sendo criado...',
          createBackup: 'Criar Backup',
          uploadBackup: 'Carregar Backup',
          databasesTitle: 'Bancos de Dados',
          databasesDesc: 'Visão geral de todos os bancos de dados disponíveis',
          name: 'Nome',
          size: 'Tamanho',
          tables: 'Tabelas',
          lastBackup: 'Último Backup',
          actions: 'Ações',
          backup: 'Backup',
          backupHistory: 'Histórico de Backups',
          backupHistoryDesc: 'Todos os backups criados com versionamento',
          database: 'Banco de Dados',
          version: 'Versão',
          date: 'Data',
          type: 'Tipo',
          status: 'Status',
          sort: 'Ordenar',
          resetFilters: 'Redefinir Filtros',
          manual: 'Manual',
          automatic: 'Automático',
          statusCompleted: 'Concluído',
          statusInProgress: 'Em Andamento',
          statusFailed: 'Falhou',
          download: 'Baixar Arquivo',
          restore: 'Restaurar',
          delete: 'Excluir',
          deleteTitle: 'Excluir Backup?',
          deleteMessage: 'Tem certeza de que deseja excluir este backup? Esta ação não pode ser desfeita.',
          restoreTitle: 'Restaurar Backup?',
          restoreMessage: 'Tem certeza de que deseja restaurar este backup? Os dados atuais serão sobrescritos.',
          backupLabel: 'Backup',
          databaseLabel: 'Banco de Dados',
          versionLabel: 'Versão',
          dateLabel: 'Data',
          confirmRestore: 'Restaurar',
          beingCreated: 'Sendo criado...'
        }
      },
      
      alertsManagement: {
        title: 'Alertas & Notificações',
        stats: {
          activeAlerts: 'Alertas Ativos',
          unacknowledged: 'Não Confirmados',
          triggers24h: 'Disparos (24h)',
          totalAlerts: 'Total de Alertas'
        },
        notifications: {
          title: 'Notificações Recentes',
          subtitle: 'Últimas notificações de alerta e seu status',
          acknowledge: 'Confirmar'
        },
        rules: {
          title: 'Regras de Alerta',
          subtitle: 'Gerencie suas configurações de alerta',
          searchPlaceholder: 'Buscar alertas...'
        },
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
          status: 'Status',
          lastTriggered: 'Último Disparo',
          actions: 'Ações',
          sort: 'Ordenar'
        },
        status: {
          active: 'Ativo',
          inactive: 'Inativo'
        },
        channels: {
          email: 'E-mail',
          slack: 'Slack'
        },
        actions: {
          edit: 'Editar',
          duplicate: 'Duplicar',
          delete: 'Excluir'
        },
        createPanel: {
          titleNew: 'Novo Alerta',
          titleEdit: 'Editar Alerta',
          subtitleNew: 'Configurar um novo alerta',
          subtitleEdit: 'Modificar configurações do alerta',
          nameLabel: 'Nome do Alerta',
          namePlaceholder: 'ex. Uso Alto de CPU',
          typeLabel: 'Tipo',
          conditionLabel: 'Condição',
          conditionPlaceholder: 'ex. Uso de CPU > 85%',
          thresholdLabel: 'Limite',
          thresholdPlaceholder: 'ex. 85%',
          channelsLabel: 'Canais de Notificação',
          buttonSave: 'Salvar',
          buttonCancel: 'Cancelar',
          buttonCreate: 'Criar Alerta'
        },
        deleteDialog: {
          title: 'Excluir Alerta?',
          message: 'Tem certeza de que deseja excluir este alerta? Esta ação não pode ser desfeita.',
          confirm: 'Excluir',
          cancel: 'Cancelar'
        }
      },
      
      accountExtended: {
        displayNamePlaceholder: 'Seu nome de exibição'
      },
      
      systemMonitoringExtended: {
        title: 'Monitoramento do Sistema',
        serviceStatus: 'Status dos Serviços',
        servicesOnline: 'de',
        servicesOf: 'serviços online',
        degraded: 'degradado',
        online: 'Online',
        offline: 'Offline',
        restricted: 'Degradado',
        uptime: 'Tempo de Atividade',
        responseTime: 'Tempo de Resposta',
        resourceUsage24h: 'Uso de Recursos % (24h)',
        resourceUsageSubtitle: 'CPU, RAM, DISK & Rede',
        apiRequests24h: 'Solicitações de API (24h)',
        apiRequestsSubtitle: 'Número de solicitações processadas',
        network: 'Rede',
        totalApiCalls: 'Chamadas de API Totais',
        vsYesterday: 'vs. ontem',
        avgResponseTime: 'Tempo de Resposta Médio',
        systemUptime: 'Disponibilidade do Sistema',
        days: 'dias',
        hours: 'hrs',
        requests: 'Solicitações',
        services: {
          aiHubAPI: 'API AI Hub',
          emailAgent: 'Serviço de Agente de Email',
          normenAgent: 'Serviço de Agente de Normas',
          internetAgent: 'Serviço de Agente de Internet',
          jelmoliAgent: 'Serviço de Agente Jelmoli',
          databaseCluster: 'Cluster de Banco de Dados',
          authenticationService: 'Serviço de Autenticação',
          fileStorage: 'Armazenamento de Arquivos'
        }
      },
      
      loginExtended: {
        logoAlt: 'Logo AIHUB',
        tenants: {
          rmbGroup: 'RMB Group',
          neuco: 'neuco'
        }
      },
      
      dashboardFull: {
        stats: {
          activeModules: 'Módulos Ativos',
          processedToday: 'Processado Hoje'
        },
        modules: {
          chatAgent: 'Agente de Chat',
          documentAnalyzer: 'Analisador de Documentos',
          calendarAssistant: 'Assistente de Calendário',
          dataAnalyst: 'Analista de Dados',
          securityMonitor: 'Monitor de Segurança'
        }
      },
      
      modelManagementFull: {
        providers: {
          geminiPro: 'Gemini Pro',
          googleAI: 'Google AI',
          azureOpenAI: 'Azure OpenAI',
          awsBedrock: 'AWS Bedrock',
          mistralAI: 'Mistral AI',
          cohere: 'Cohere',
          customEndpoint: 'Endpoint Personalizado'
        },
        dialog: {
          addNewModel: 'Adicionar Novo Modelo',
          editModel: 'Editar Modelo',
          addModel: 'Adicionar Modelo',
          save: 'Salvar',
          selectModel: 'Selecionar Modelo'
        }
      },
      
      placeholders: {
        systemPrompt: 'Digite o prompt do sistema...',
        searchDots: 'Pesquisar...',
        spaceName: 'Digite o nome do espaço...',
        email: 'seu.email@company.com',
        phone: '+55 XX XXXXX-XXXX',
        jobTitle: 'ex. Desenvolvedor de Software',
        department: 'ex. TI, Marketing, Vendas',
        modelName: 'ex. GPT-4 Turbo Production',
        selectProvider: 'Selecione um provedor',
        modelId: 'ex. gpt-4-turbo-preview',
        apiKey: 'sk-...',
        endpoint: 'https://...',
        notes: 'Informações adicionais ou detalhes de configuração...',
        agentName: 'ex. Agente de Atendimento ao Cliente',
        agentDescription: 'Descreva a função deste agente...',
        version: '1.0.0',
        agentEndpoint: 'https://api.aihub.internal/agents/...',
        storageUrl: 'https://storage.example.com/...',
        storageToken: 'stg-...',
        agentApiKey: 'agt-...',
        searchDocumentation: 'Pesquisar documentação...',
        ticketSubject: 'Breve descrição do seu problema',
        ticketMessage: 'Descreva seu problema ou pergunta em detalhes...',
        faqQuestion: 'ex. Como ativo a autenticação de dois fatores?',
        faqAnswer: 'Digite uma resposta detalhada à pergunta...',
        passwordMinLength: 'A senha deve ter pelo menos 6 caracteres'
      },
      
      moduleOverviewFull: {
        notConfigured: 'Não configurado',
        selectModel: 'Selecionar modelo',
        orchestratorDiagram: 'Fluxograma do Orquestrador',
        statsModulesTotal: 'Total de Módulos',
        statsActive: 'Ativo',
        statsInactive: 'Inativo',
        statsError: 'Erro',
        title: 'Orquestrador & Agentes',
        addModule: 'Adicionar Módulo',
        orchestratorTitle: 'Orquestrador',
        orchestratorDescription: 'Unidade de controle central para todos os agentes de IA e fluxos de trabalho',
        orchestratorQuery: 'Consulta do Orquestrador',
        llmConfiguration: 'Configuração LLM',
        llm1: 'LLM 1',
        llm2: 'LLM 2',
        prompt: 'Prompt',
        edit: 'Editar',
        agentsTitle: 'Agentes',
        agentConfiguration: 'Configuração do Agente',
        apiEndpoint: 'Endpoint da API',
        apiKey: 'Chave da API',
        testConnection: 'Testar Conexão',
        testing: 'Testando...',
        storage: 'Armazenamento',
        storageAccessUrl: 'Armazenamento (URL de Acesso)',
        storageToken: 'Armazenamento (Token)',
        delete: 'Excluir',
        save: 'Salvar',
        cancel: 'Cancelar',
        deleteConfirmTitle: 'Excluir Módulo',
        deleteConfirmDescription: 'Tem certeza de que deseja excluir este módulo? Esta ação não pode ser desfeita.',
        version: 'Versão',
        lastSync: 'Última Sincronização',
        category: 'Categoria',
        public: 'Público',
        private: 'Privado',
        riskCategory: 'Categoria de Risco',
        low: 'Baixo',
        high: 'Alto',
        icon: 'Ícone',
        agentName: 'Nome do Agente',
        description: 'Descrição',
        apiKeysEncrypted: 'As chaves da API são criptografadas',
        deleteAgent: 'Excluir Agente',
        deleteAgentConfirmation: 'Tem certeza de que deseja excluir este agente? Esta ação não pode ser desfeita.',
        addNewAgent: 'Adicionar Novo Agente',
        basicInformation: 'Informações Básicas',
        addAgent: 'Adicionar Agente',
        agents: {
          jelmoliAgent: 'Agente Jelmoli',
          emailAgent: 'Agente de Email',
          internetAgent: 'Agente de Internet',
          normenAgent: 'Agente de Normas'
        },
        agentDescriptions: {
          emailAgent: 'Processa e gera e-mails com suporte de IA',
          internetAgent: 'Realiza pesquisas na web e pesquisas na internet',
          jelmoliAgent: 'Assistente específico da Jelmoli para consultas de clientes',
          normenAgent: 'Pesquisa e analisa normas e padrões técnicos'
        },
        prompts: {
          orchestrator1: 'Você é um orquestrador de IA que coordena vários agentes.',
          orchestrator2: 'Analise a solicitação e encaminhe-a para o agente apropriado.'
        },
        models: {
          geminiPro: 'Gemini Pro',
          azureGPT4: 'Azure GPT-4'
        }
      },
      
      orchestratorExtended: {
        selectModel: 'Selecionar modelo'
      },
      
      alertsSampleData: {
        serviceOffline: 'Serviço Offline',
        backupFailed: 'Falha no Backup',
        unusualTraffic: 'Tráfego Incomum',
        backupFailedMessage: 'O backup programado às 03:00 falhou. Código de erro: DB_TIMEOUT'
      },
      
      dataManagementFull: {
        scheduledBackup: 'Backup Programado',
        manualBackup: 'Backup Manual',
        allDatabases: 'Todos os Bancos de Dados'
      },
      
      chatSampleData: {
        productInquiryJelmoli: 'Consulta de Produto Jelmoli',
        productAvailability: 'Disponibilidade de Produtos'
      },
      
      roleManagementPermissions: {
        read: 'Ler',
        write: 'Escrever',
        delete: 'Excluir',
        manageUsers: 'Gerenciar Usuários',
        manageSettings: 'Gerenciar Configurações',
        manageRoles: 'Gerenciar Funções',
        viewReports: 'Ver Relatórios',
        exportData: 'Exportar Dados',
        importData: 'Importar Dados'
      },
      
      chatExtended: {
        filesAttached: 'Arquivos Anexados',
        detailedResponseFrom: 'Resposta detalhada de {agentId} para "{message}"',
        detailedResponseContent: 'Esta é a análise específica e detalhada e resposta deste agente com todos os detalhes e informações relevantes que este agente pode fornecer.',
        basedOnAnalysis: 'Com base na análise de todos os {count} agentes ativos em relação à sua solicitação "{message}"',
        orchestratorSummary: 'A IA Orquestradora interpretou e resumiu as respostas. Esta é uma síntese inteligente de informações de todas as fontes ({modules}), fornecendo uma resposta clara e compreensível.',
        forDetailedInfo: 'Para informações detalhadas de agentes individuais, clique nos badges correspondentes abaixo.',
        filesAdded: '{count} arquivo(s) adicionado(s)'
      }
    },
    
    // Prompts & Frameworks
    promptsFrameworks: {
      // Tabs/Headers
      promptLibrary: 'Biblioteca de Prompts',
      frameworks: 'Frameworks',
      
      // Actions
      edit: 'Editar',
      duplicate: 'Duplicar',
      createNew: 'Criar Novo',
      delete: 'Excluir',
      
      // Labels
      promptLabel: 'Prompt:',
      structureLabel: 'Estrutura:',
      title: 'Título',
      description: 'Descrição',
      category: 'Categoria',
      
      // Counts
      promptsCount: 'Prompts',
      frameworksCount: 'Frameworks',
      
      // Headers
      promptCategories: 'Categorias de Prompts',
      promptCategoriesDescription: 'Selecione uma categoria para ver os prompts disponíveis',
      frameworkCategories: 'Categorias de Frameworks',
      frameworkCategoriesDescription: 'Selecione uma categoria para ver os frameworks disponíveis',
      
      // Search
      searchPlaceholder: 'Pesquisar categorias...',
      noCategoriesFound: 'Nenhuma categoria encontrada',
      
      // Edit Panel
      editPrompt: 'Editar Prompt',
      editFramework: 'Editar Framework',
      duplicatePrompt: 'Duplicar Prompt',
      duplicateFramework: 'Duplicar Framework',
      createNewPrompt: 'Criar Novo Prompt',
      createNewFramework: 'Criar Novo Framework',
      
      // Form Fields
      titleLabel: 'Título',
      titlePlaceholder: 'Título do Prompt',
      frameworkTitlePlaceholder: 'Título do Framework',
      descriptionLabel: 'Descrição',
      descriptionPlaceholder: 'Breve descrição do prompt',
      frameworkDescriptionPlaceholder: 'Breve descrição do framework',
      promptPlaceholder: 'Texto do Prompt',
      frameworkPlaceholder: 'Estrutura do Framework',
      promptContentLabel: 'Prompt',
      frameworkContentLabel: 'Estrutura',
      
      // Buttons
      saveButton: 'Salvar',
      cancelButton: 'Cancelar',
      
      // Delete Dialog
      deletePromptTitle: 'Excluir Prompt',
      deleteFrameworkTitle: 'Excluir Framework',
      deletePromptMessage: 'Tem certeza de que deseja excluir este prompt? Esta ação não pode ser desfeita.',
      deleteFrameworkMessage: 'Tem certeza de que deseja excluir este framework? Esta ação não pode ser desfeita.',
      confirmDelete: 'Excluir',
      
      // Copy suffix
      copySuffix: '(Cópia)',
      
      // Category Names
      categoryNames: {
        market: 'Mercado & Concorrência',
        planning: 'Planejamento & Implementação',
        strategy: 'Estratégia & Crescimento',
        sales: 'Vendas',
        service: 'Atendimento ao Cliente',
        finance: 'Finanças & Relatórios',
        hr: 'RH & Recrutamento',
        learning: 'Aprendizagem & Conhecimento',
        organization: 'Organização & Colaboração',
        coaching: 'Coaching & Desenvolvimento',
        promptEngineering: 'Criação & Otimização de Prompts',
        quality: 'Qualidade & Melhoria de Resultados',
        criticalAnalysis: 'Análise Crítica & Pré-Perguntas',
        // Frameworks
        mission: 'Frameworks de Missão',
        thinking: 'Frameworks de Pensamento',
        expression: 'Frameworks de Expressão',
        interaction: 'Frameworks de Interação'
      },
      
      // Category Descriptions
      categoryDescriptions: {
        market: 'Análise de mercado, inteligência competitiva e posicionamento',
        planning: 'Planejamento de projetos, roteiros e estratégias de implementação',
        strategy: 'Estratégias de negócios, planejamento de crescimento e inovação',
        sales: 'Prompts para conversas de vendas, aquisição de clientes e estratégias de vendas',
        service: 'Suporte ao cliente, comunicação e excelência no atendimento',
        finance: 'Planejamento financeiro, controladoria e relatórios empresariais',
        hr: 'Recrutamento, desenvolvimento de funcionários e processos de RH',
        learning: 'Transferência de conhecimento, treinamento e documentação',
        organization: 'Trabalho em equipe, processos e colaboração',
        coaching: 'Desenvolvimento pessoal, mentoria e feedback',
        promptEngineering: 'Criar e melhorar prompts de IA eficazes',
        quality: 'Aumentar e refinar a qualidade dos resultados',
        criticalAnalysis: 'Questionar e refinar requisitos',
        // Frameworks
        mission: 'Frameworks para criação estruturada de tarefas e instruções precisas',
        thinking: 'Frameworks para estruturas de pensamento claras e pensamento estratégico',
        expression: 'Frameworks para comunicação direcionada e produção de conteúdo',
        interaction: 'Frameworks para comunicação cooperativa, coaching e processos iterativos'
      }
    }
  }
};

// Helper function to get language flag emojis
export function getLanguageFlag(language: Language): string {
  const flags: Record<Language, string> = {
    'de': '🇩🇪',
    'en': '🇺🇸',
    'fr': '🇫🇷',
    'pt-br': '🇧🇷'
  };
  return flags[language];
}

// Language context and hooks
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first, then browser language, fallback to 'de'
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && translations[saved]) {
        return saved;
      }
      
      // Try to match browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) return 'en';
      if (browserLang.startsWith('fr')) return 'fr';
      if (browserLang.startsWith('pt')) return 'pt-br';
      if (browserLang.startsWith('de')) return 'de';
    }
    return 'de'; // Default fallback
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook for extended translations
export function useExtendedTranslations(): ExtendedTranslations {
  const { language } = useLanguage();
  
  const extendedTranslations = {
    'de': extendedTranslationsDE,
    'en': extendedTranslationsEN,
    'fr': extendedTranslationsFR,
    'pt-br': extendedTranslationsPTBR
  };
  
  return extendedTranslations[language];
}