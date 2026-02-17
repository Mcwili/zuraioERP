// Temporary translation file for new features
// TODO: Merge into main i18n.ts

import { type Language } from './i18n';

export const newFeaturesTranslations: Record<Language, any> = {
  de: {
    analyticsDashboard: {
      title: 'Analytics Dashboard',
      subtitle: 'Benutzeraktivität und Systemleistung verfolgen',
      timeRanges: {
        last7days: 'Letzte 7 Tage',
        last30days: 'Letzte 30 Tage',
        last90days: 'Letzte 90 Tage',
        lastYear: 'Letztes Jahr'
      },
      export: 'Exportieren',
      metrics: {
        totalUsers: 'Gesamte Benutzer',
        activeUsers: 'Aktive Benutzer',
        totalLogins: 'Gesamte Logins',
        avgSession: 'Durchschn. Sitzung',
        newThisMonth: 'neu diesen Monat',
        ofTotal: 'von gesamt',
        thisPeriod: 'In diesem Zeitraum',
        perUserSession: 'Pro Benutzersitzung'
      },
      tabs: {
        overview: 'Übersicht',
        users: 'Benutzer',
        activity: 'Aktivität',
        distribution: 'Verteilung'
      },
      charts: {
        userGrowthTrend: 'Benutzerwachstumstrend',
        userGrowthSubtitle: 'Täglich aktive Benutzer im Zeitverlauf',
        loginActivity: 'Login-Aktivität',
        loginActivitySubtitle: 'Tägliche Login-Anzahl',
        roleDistribution: 'Rollenverteilung',
        roleDistributionSubtitle: 'Benutzer nach Rolle',
        departmentActivity: 'Abteilungsaktivität',
        departmentActivitySubtitle: 'Aktive vs. Gesamtbenutzer',
        userGrowthOverTime: 'Benutzerwachstum im Zeitverlauf',
        systemActivity: 'Systemaktivität',
        rolesBreakdown: 'Rollenaufschlüsselung',
        departmentsOverview: 'Abteilungsübersicht',
        totalUsers: 'Gesamtbenutzer',
        activeUsers: 'Aktive Benutzer',
        logins: 'Logins',
        actions: 'Aktionen'
      }
    },
    
    activityLogExtended: {
      title: 'Aktivitätsprotokoll',
      subtitle: 'Alle Systemaktivitäten und Benutzeraktionen verfolgen',
      searchPlaceholder: 'Aktivitäten durchsuchen...',
      filters: {
        allTypes: 'Alle Typen',
        allLevels: 'Alle Stufen',
        userActions: 'Benutzeraktionen',
        roleActions: 'Rollenaktionen',
        permissions: 'Berechtigungen',
        settings: 'Einstellungen',
        data: 'Daten',
        loginLogout: 'Login/Logout'
      },
      severity: {
        success: 'Erfolg',
        info: 'Info',
        warning: 'Warnung',
        error: 'Fehler'
      },
      noActivities: 'Keine Aktivitäten gefunden',
      detailsSheet: {
        title: 'Aktivitätsdetails',
        subtitle: 'Vollständige Informationen zu dieser Aktivität',
        action: 'Aktion',
        performedBy: 'Durchgeführt von',
        timestamp: 'Zeitstempel',
        target: 'Ziel',
        severity: 'Schweregrad',
        details: 'Details',
        technicalInfo: 'Technische Informationen',
        ipAddress: 'IP-Adresse',
        activityId: 'Aktivitäts-ID'
      },
      actions: {
        userCreated: 'Neuer Benutzer erstellt',
        userUpdated: 'Benutzerprofil aktualisiert',
        userDeleted: 'Benutzer gelöscht',
        userActivated: 'Benutzerkonto aktiviert',
        userDeactivated: 'Benutzerkonto deaktiviert',
        roleCreated: 'Neue Rolle erstellt',
        roleUpdated: 'Rollenberechtigungen aktualisiert',
        roleDeleted: 'Rolle gelöscht',
        permissionChanged: 'Berechtigungen geändert',
        settingsUpdated: 'Systemeinstellungen aktualisiert',
        dataExported: 'Daten exportiert',
        dataImported: 'Daten importiert',
        loginSuccess: 'Erfolgreich angemeldet',
        loginFailed: 'Anmeldeversuch fehlgeschlagen',
        logout: 'Abgemeldet'
      }
    },
    
    notificationCenter: {
      title: 'Benachrichtigungen',
      subtitle: 'ungelesene Benachrichtigungen',
      unreadNotifications: 'Ungelesene Benachrichtigungen',
      markAllAsRead: 'Alle als gelesen markieren',
      clearAll: 'Alle löschen',
      noNotifications: 'Keine Benachrichtigungen',
      tabs: {
        all: 'Alle',
        messages: 'Nachrichten',
        mentions: 'Erwähnungen',
        system: 'System'
      },
      types: {
        info: 'Info',
        success: 'Erfolg',
        warning: 'Warnung',
        error: 'Fehler',
        message: 'Nachricht',
        mention: 'Erwähnung',
        system: 'System'
      },
      actions: {
        markAsRead: 'Als gelesen markieren',
        markAsUnread: 'Als ungelesen markieren',
        delete: 'Löschen'
      },
      timeAgo: {
        justNow: 'Gerade eben',
        minutesAgo: 'vor {count}m',
        hoursAgo: 'vor {count}h',
        daysAgo: 'vor {count}d'
      }
    }
  },
  
  en: {
    analyticsDashboard: {
      title: 'Analytics Dashboard',
      subtitle: 'Track user activity and system performance',
      timeRanges: {
        last7days: 'Last 7 days',
        last30days: 'Last 30 days',
        last90days: 'Last 90 days',
        lastYear: 'Last year'
      },
      export: 'Export',
      metrics: {
        totalUsers: 'Total Users',
        activeUsers: 'Active Users',
        totalLogins: 'Total Logins',
        avgSession: 'Avg Session',
        newThisMonth: 'new this month',
        ofTotal: 'of total',
        thisPeriod: 'This period',
        perUserSession: 'Per user session'
      },
      tabs: {
        overview: 'Overview',
        users: 'Users',
        activity: 'Activity',
        distribution: 'Distribution'
      },
      charts: {
        userGrowthTrend: 'User Growth Trend',
        userGrowthSubtitle: 'Daily active users over time',
        loginActivity: 'Login Activity',
        loginActivitySubtitle: 'Daily login count',
        roleDistribution: 'Role Distribution',
        roleDistributionSubtitle: 'Users by role',
        departmentActivity: 'Department Activity',
        departmentActivitySubtitle: 'Active vs total users',
        userGrowthOverTime: 'User Growth Over Time',
        systemActivity: 'System Activity',
        rolesBreakdown: 'Roles Breakdown',
        departmentsOverview: 'Departments Overview',
        totalUsers: 'Total Users',
        activeUsers: 'Active Users',
        logins: 'Logins',
        actions: 'Actions'
      }
    },
    
    activityLogExtended: {
      title: 'Activity Log',
      subtitle: 'Track all system activities and user actions',
      searchPlaceholder: 'Search activities...',
      filters: {
        allTypes: 'All Types',
        allLevels: 'All Levels',
        userActions: 'User Actions',
        roleActions: 'Role Actions',
        permissions: 'Permissions',
        settings: 'Settings',
        data: 'Data',
        loginLogout: 'Login/Logout'
      },
      severity: {
        success: 'Success',
        info: 'Info',
        warning: 'Warning',
        error: 'Error'
      },
      noActivities: 'No activities found',
      detailsSheet: {
        title: 'Activity Details',
        subtitle: 'Full information about this activity',
        action: 'Action',
        performedBy: 'Performed By',
        timestamp: 'Timestamp',
        target: 'Target',
        severity: 'Severity',
        details: 'Details',
        technicalInfo: 'Technical Information',
        ipAddress: 'IP Address',
        activityId: 'Activity ID'
      },
      actions: {
        userCreated: 'Created new user',
        userUpdated: 'Updated user profile',
        userDeleted: 'Deleted user',
        userActivated: 'Activated user account',
        userDeactivated: 'Deactivated user account',
        roleCreated: 'Created new role',
        roleUpdated: 'Updated role permissions',
        roleDeleted: 'Deleted role',
        permissionChanged: 'Changed permissions',
        settingsUpdated: 'Updated system settings',
        dataExported: 'Exported data',
        dataImported: 'Imported data',
        loginSuccess: 'Logged in successfully',
        loginFailed: 'Failed login attempt',
        logout: 'Logged out'
      }
    },
    
    notificationCenter: {
      title: 'Notifications',
      subtitle: 'unread notifications',
      unreadNotifications: 'Unread Notifications',
      markAllAsRead: 'Mark all as read',
      clearAll: 'Clear all',
      noNotifications: 'No notifications',
      tabs: {
        all: 'All',
        messages: 'Messages',
        mentions: 'Mentions',
        system: 'System'
      },
      types: {
        info: 'Info',
        success: 'Success',
        warning: 'Warning',
        error: 'Error',
        message: 'Message',
        mention: 'Mention',
        system: 'System'
      },
      actions: {
        markAsRead: 'Mark as read',
        markAsUnread: 'Mark as unread',
        delete: 'Delete'
      },
      timeAgo: {
        justNow: 'Just now',
        minutesAgo: '{count}m ago',
        hoursAgo: '{count}h ago',
        daysAgo: '{count}d ago'
      }
    }
  },
  
  fr: {
    analyticsDashboard: {
      title: 'Tableau de bord analytique',
      subtitle: 'Suivre l\'activité des utilisateurs et les performances du système',
      timeRanges: {
        last7days: '7 derniers jours',
        last30days: '30 derniers jours',
        last90days: '90 derniers jours',
        lastYear: 'Dernière année'
      },
      export: 'Exporter',
      metrics: {
        totalUsers: 'Utilisateurs totaux',
        activeUsers: 'Utilisateurs actifs',
        totalLogins: 'Connexions totales',
        avgSession: 'Session moy.',
        newThisMonth: 'nouveaux ce mois-ci',
        ofTotal: 'du total',
        thisPeriod: 'Cette période',
        perUserSession: 'Par session utilisateur'
      },
      tabs: {
        overview: 'Aperçu',
        users: 'Utilisateurs',
        activity: 'Activité',
        distribution: 'Distribution'
      },
      charts: {
        userGrowthTrend: 'Tendance de croissance des utilisateurs',
        userGrowthSubtitle: 'Utilisateurs actifs quotidiens au fil du temps',
        loginActivity: 'Activité de connexion',
        loginActivitySubtitle: 'Nombre de connexions quotidiennes',
        roleDistribution: 'Distribution des rôles',
        roleDistributionSubtitle: 'Utilisateurs par rôle',
        departmentActivity: 'Activité départementale',
        departmentActivitySubtitle: 'Actifs vs utilisateurs totaux',
        userGrowthOverTime: 'Croissance des utilisateurs dans le temps',
        systemActivity: 'Activité du système',
        rolesBreakdown: 'Répartition des rôles',
        departmentsOverview: 'Aperçu des départements',
        totalUsers: 'Utilisateurs totaux',
        activeUsers: 'Utilisateurs actifs',
        logins: 'Connexions',
        actions: 'Actions'
      }
    },
    
    activityLogExtended: {
      title: 'Journal d\'activité',
      subtitle: 'Suivre toutes les activités du système et les actions des utilisateurs',
      searchPlaceholder: 'Rechercher des activités...',
      filters: {
        allTypes: 'Tous les types',
        allLevels: 'Tous les niveaux',
        userActions: 'Actions utilisateur',
        roleActions: 'Actions de rôle',
        permissions: 'Permissions',
        settings: 'Paramètres',
        data: 'Données',
        loginLogout: 'Connexion/Déconnexion'
      },
      severity: {
        success: 'Succès',
        info: 'Info',
        warning: 'Avertissement',
        error: 'Erreur'
      },
      noActivities: 'Aucune activité trouvée',
      detailsSheet: {
        title: 'Détails de l\'activité',
        subtitle: 'Informations complètes sur cette activité',
        action: 'Action',
        performedBy: 'Effectué par',
        timestamp: 'Horodatage',
        target: 'Cible',
        severity: 'Gravité',
        details: 'Détails',
        technicalInfo: 'Informations techniques',
        ipAddress: 'Adresse IP',
        activityId: 'ID d\'activité'
      },
      actions: {
        userCreated: 'Nouvel utilisateur créé',
        userUpdated: 'Profil utilisateur mis à jour',
        userDeleted: 'Utilisateur supprimé',
        userActivated: 'Compte utilisateur activé',
        userDeactivated: 'Compte utilisateur désactivé',
        roleCreated: 'Nouveau rôle créé',
        roleUpdated: 'Permissions de rôle mises à jour',
        roleDeleted: 'Rôle supprimé',
        permissionChanged: 'Permissions modifiées',
        settingsUpdated: 'Paramètres système mis à jour',
        dataExported: 'Données exportées',
        dataImported: 'Données importées',
        loginSuccess: 'Connexion réussie',
        loginFailed: 'Tentative de connexion échouée',
        logout: 'Déconnecté'
      }
    },
    
    notificationCenter: {
      title: 'Notifications',
      subtitle: 'notifications non lues',
      unreadNotifications: 'Notifications non lues',
      markAllAsRead: 'Tout marquer comme lu',
      clearAll: 'Tout effacer',
      noNotifications: 'Aucune notification',
      tabs: {
        all: 'Tout',
        messages: 'Messages',
        mentions: 'Mentions',
        system: 'Système'
      },
      types: {
        info: 'Info',
        success: 'Succès',
        warning: 'Avertissement',
        error: 'Erreur',
        message: 'Message',
        mention: 'Mention',
        system: 'Système'
      },
      actions: {
        markAsRead: 'Marquer comme lu',
        markAsUnread: 'Marquer comme non lu',
        delete: 'Supprimer'
      },
      timeAgo: {
        justNow: 'À l\'instant',
        minutesAgo: 'il y a {count}m',
        hoursAgo: 'il y a {count}h',
        daysAgo: 'il y a {count}j'
      }
    }
  },
  
  'pt-br': {
    analyticsDashboard: {
      title: 'Painel de Análise',
      subtitle: 'Acompanhar atividade do usuário e desempenho do sistema',
      timeRanges: {
        last7days: 'Últimos 7 dias',
        last30days: 'Últimos 30 dias',
        last90days: 'Últimos 90 dias',
        lastYear: 'Último ano'
      },
      export: 'Exportar',
      metrics: {
        totalUsers: 'Total de Usuários',
        activeUsers: 'Usuários Ativos',
        totalLogins: 'Total de Logins',
        avgSession: 'Sessão Média',
        newThisMonth: 'novos este mês',
        ofTotal: 'do total',
        thisPeriod: 'Neste período',
        perUserSession: 'Por sessão de usuário'
      },
      tabs: {
        overview: 'Visão geral',
        users: 'Usuários',
        activity: 'Atividade',
        distribution: 'Distribuição'
      },
      charts: {
        userGrowthTrend: 'Tendência de Crescimento de Usuários',
        userGrowthSubtitle: 'Usuários ativos diários ao longo do tempo',
        loginActivity: 'Atividade de Login',
        loginActivitySubtitle: 'Contagem diária de logins',
        roleDistribution: 'Distribuição de Funções',
        roleDistributionSubtitle: 'Usuários por função',
        departmentActivity: 'Atividade do Departamento',
        departmentActivitySubtitle: 'Ativos vs usuários totais',
        userGrowthOverTime: 'Crescimento de Usuários ao Longo do Tempo',
        systemActivity: 'Atividade do Sistema',
        rolesBreakdown: 'Detalhamento de Funções',
        departmentsOverview: 'Visão Geral dos Departamentos',
        totalUsers: 'Total de Usuários',
        activeUsers: 'Usuários Ativos',
        logins: 'Logins',
        actions: 'Ações'
      }
    },
    
    activityLogExtended: {
      title: 'Registro de Atividades',
      subtitle: 'Acompanhar todas as atividades do sistema e ações do usuário',
      searchPlaceholder: 'Pesquisar atividades...',
      filters: {
        allTypes: 'Todos os Tipos',
        allLevels: 'Todos os Níveis',
        userActions: 'Ações do Usuário',
        roleActions: 'Ações de Função',
        permissions: 'Permissões',
        settings: 'Configurações',
        data: 'Dados',
        loginLogout: 'Login/Logout'
      },
      severity: {
        success: 'Sucesso',
        info: 'Info',
        warning: 'Aviso',
        error: 'Erro'
      },
      noActivities: 'Nenhuma atividade encontrada',
      detailsSheet: {
        title: 'Detalhes da Atividade',
        subtitle: 'Informações completas sobre esta atividade',
        action: 'Ação',
        performedBy: 'Realizado por',
        timestamp: 'Data/Hora',
        target: 'Alvo',
        severity: 'Gravidade',
        details: 'Detalhes',
        technicalInfo: 'Informações Técnicas',
        ipAddress: 'Endereço IP',
        activityId: 'ID da Atividade'
      },
      actions: {
        userCreated: 'Novo usuário criado',
        userUpdated: 'Perfil do usuário atualizado',
        userDeleted: 'Usuário excluído',
        userActivated: 'Conta de usuário ativada',
        userDeactivated: 'Conta de usuário desativada',
        roleCreated: 'Nova função criada',
        roleUpdated: 'Permissões de função atualizadas',
        roleDeleted: 'Função excluída',
        permissionChanged: 'Permissões alteradas',
        settingsUpdated: 'Configurações do sistema atualizadas',
        dataExported: 'Dados exportados',
        dataImported: 'Dados importados',
        loginSuccess: 'Login bem-sucedido',
        loginFailed: 'Tentativa de login falhada',
        logout: 'Logout efetuado'
      }
    },
    
    notificationCenter: {
      title: 'Notificações',
      subtitle: 'notificações não lidas',
      unreadNotifications: 'Notificações Não Lidas',
      markAllAsRead: 'Marcar todas como lidas',
      clearAll: 'Limpar todas',
      noNotifications: 'Sem notificações',
      tabs: {
        all: 'Todas',
        messages: 'Mensagens',
        mentions: 'Menções',
        system: 'Sistema'
      },
      types: {
        info: 'Info',
        success: 'Sucesso',
        warning: 'Aviso',
        error: 'Erro',
        message: 'Mensagem',
        mention: 'Menção',
        system: 'Sistema'
      },
      actions: {
        markAsRead: 'Marcar como lida',
        markAsUnread: 'Marcar como não lida',
        delete: 'Excluir'
      },
      timeAgo: {
        justNow: 'Agora mesmo',
        minutesAgo: 'há {count}m',
        hoursAgo: 'há {count}h',
        daysAgo: 'há {count}d'
      }
    }
  }
};