// Helper functions and compact translations for prompts and frameworks
// Due to the large volume of content, this uses a more scalable approach

import { Language } from './i18n';

export interface PromptItem {
  title: string;
  description: string;
  prompt: string;
  tags: string[];
}

export interface FrameworkItem {
  title: string;
  description: string;
  structure: string;
  tags: string[];
}

// Translation keys for prompt titles, descriptions, and content
// Each key maps to translations in all 4 languages
export const promptTranslationKeys = {
  // Market category
  market_aiRival_title: {
    de: "Der KI-Rivale",
    en: "The AI Rival",
    fr: "Le Rival IA",
    'pt-br': "O Rival IA"
  },
  market_aiRival_desc: {
    de: "Hilft dir, dein Unternehmen aus Sicht eines Konkurrenten zu analysieren und Schwächen, Chancen und Innovationen sichtbar zu machen.",
    en: "Helps you analyze your company from a competitor's perspective and identify weaknesses, opportunities and innovations.",
    fr: "Vous aide à analyser votre entreprise du point de vue d'un concurrent et à identifier les faiblesses, les opportunités et les innovations.",
    'pt-br': "Ajuda você a analisar sua empresa da perspectiva de um concorrente e identificar fraquezas, oportunidades e inovações."
  },
  market_aiRival_prompt: {
    de: "Erstelle ein fiktives KI-Startup, das dein Unternehmen [Name, Branche] vollständig vom Markt verdrängen könnte. Nutze dafür gezielt eure Schwächen, die Pain Points eurer Kunden und aktuelle Technologietrends. Beschreibe:\n·       den Namen des Startups\n·       den Pitch\n·       den USP (Alleinstellungsfaktor)\n·       das Geschäftsmodell\n·       und erkläre, warum Kunden sofort begeistert wären.",
    en: "Create a fictional AI startup that could completely displace your company [Name, Industry] from the market. Use your weaknesses, your customers' pain points, and current technology trends. Describe:\n·       the startup's name\n·       the pitch\n·       the USP (unique selling proposition)\n·       the business model\n·       and explain why customers would be immediately excited.",
    fr: "Créez une startup IA fictive qui pourrait complètement évincer votre entreprise [Nom, Secteur] du marché. Utilisez vos faiblesses, les points de douleur de vos clients et les tendances technologiques actuelles. Décrivez:\n·       le nom de la startup\n·       le pitch\n·       l'USP (proposition de valeur unique)\n·       le modèle d'affaires\n·       et expliquez pourquoi les clients seraient immédiatement enthousiastes.",
    'pt-br': "Crie uma startup de IA fictícia que poderia deslocar completamente sua empresa [Nome, Setor] do mercado. Use suas fraquezas, os pontos de dor de seus clientes e as tendências tecnológicas atuais. Descreva:\n·       o nome da startup\n·       o pitch\n·       o USP (proposta única de venda)\n·       o modelo de negócios\n·       e explique por que os clientes ficariam imediatamente empolgados."
  },
  
  // Planning category
  planning_virtualAssistant_title: {
    de: "Virtueller Assistent",
    en: "Virtual Assistant",
    fr: "Assistant Virtuel",
    'pt-br': "Assistente Virtual"
  },
  planning_virtualAssistant_desc: {
    de: "Erledigt deine täglichen Aufgaben strukturiert, automatisiert und professionell.",
    en: "Completes your daily tasks in a structured, automated and professional manner.",
    fr: "Effectue vos tâches quotidiennes de manière structurée, automatisée et professionnelle.",
    'pt-br': "Completa suas tarefas diárias de forma estruturada, automatizada e profissional."
  },
  planning_virtualAssistant_prompt: {
    de: "Du bist mein virtueller Mitarbeiter. Ich arbeite als [Berufsbezeichnung/Branche einfügen]. Das sind meine Aufgaben für heute: [Aufgabenliste für heute einfügen]. Erledige alle Aufgaben mithilfe von Textdaten, Erkenntnissen, Zusammenfassungen, Vorlagen und allem, was du sofort automatisieren kannst. Sei detailliert und professionell.",
    en: "You are my virtual employee. I work as [insert job title/industry]. These are my tasks for today: [insert today's task list]. Complete all tasks using text data, insights, summaries, templates, and everything you can immediately automate. Be detailed and professional.",
    fr: "Vous êtes mon employé virtuel. Je travaille en tant que [insérer titre de poste/secteur]. Voici mes tâches pour aujourd'hui: [insérer la liste des tâches d'aujourd'hui]. Accomplissez toutes les tâches à l'aide de données textuelles, d'insights, de résumés, de modèles et de tout ce que vous pouvez automatiser immédiatement. Soyez détaillé et professionnel.",
    'pt-br': "Você é meu funcionário virtual. Eu trabalho como [inserir cargo/setor]. Estas são minhas tarefas para hoje: [inserir lista de tarefas de hoje]. Complete todas as tarefas usando dados de texto, insights, resumos, modelos e tudo o que você pode automatizar imediatamente. Seja detalhado e profissional."
  },

  // Tags
  tags_competition: { de: "Wettbewerb", en: "Competition", fr: "Concurrence", 'pt-br': "Competição" },
  tags_innovation: { de: "Innovation", en: "Innovation", fr: "Innovation", 'pt-br': "Inovação" },
  tags_strategy: { de: "Strategie", en: "Strategy", fr: "Stratégie", 'pt-br': "Estratégia" },
  tags_risk: { de: "Risiko", en: "Risk", fr: "Risque", 'pt-br': "Risco" },
  tags_analysis: { de: "Analyse", en: "Analysis", fr: "Analyse", 'pt-br': "Análise" },
  tags_planning: { de: "Planung", en: "Planning", fr: "Planification", 'pt-br': "Planejamento" },
  tags_automation: { de: "Automatisierung", en: "Automation", fr: "Automatisation", 'pt-br': "Automação" },
  tags_productivity: { de: "Produktivität", en: "Productivity", fr: "Productivité", 'pt-br': "Produtividade" },
  tags_taskManagement: { de: "Aufgabenmanagement", en: "Task Management", fr: "Gestion des Tâches", 'pt-br': "Gestão de Tarefas" },
  tags_projectManagement: { de: "Projektmanagement", en: "Project Management", fr: "Gestion de Projet", 'pt-br': "Gestão de Projetos" },
  tags_implementation: { de: "Umsetzung", en: "Implementation", fr: "Mise en Œuvre", 'pt-br': "Implementação" },
  tags_design: { de: "Design", en: "Design", fr: "Design", 'pt-br': "Design" },
  tags_vision: { de: "Vision", en: "Vision", fr: "Vision", 'pt-br': "Visão" },
  tags_productDevelopment: { de: "Produktentwicklung", en: "Product Development", fr: "Développement de Produit", 'pt-br': "Desenvolvimento de Produto" },
  tags_businessModel: { de: "Geschäftsmodell", en: "Business Model", fr: "Modèle d'Affaires", 'pt-br': "Modelo de Negócios" },
  tags_disruption: { de: "Disruption", en: "Disruption", fr: "Disruption", 'pt-br': "Disrupção" },
  tags_growth: { de: "Wachstum", en: "Growth", fr: "Croissance", 'pt-br': "Crescimento" },
  tags_culture: { de: "Kultur", en: "Culture", fr: "Culture", 'pt-br': "Cultura" },
  tags_leadership: { de: "Leadership", en: "Leadership", fr: "Leadership", 'pt-br': "Liderança" },
  tags_motivation: { de: "Motivation", en: "Motivation", fr: "Motivation", 'pt-br': "Motivação" },
  tags_marketing: { de: "Marketing", en: "Marketing", fr: "Marketing", 'pt-br': "Marketing" },
  tags_positioning: { de: "Positionierung", en: "Positioning", fr: "Positionnement", 'pt-br': "Posicionamento" },
  tags_future: { de: "Zukunft", en: "Future", fr: "Avenir", 'pt-br': "Futuro" },
  tags_bestPractice: { de: "Best Practice", en: "Best Practice", fr: "Meilleures Pratiques", 'pt-br': "Melhores Práticas" },
  tags_benchmarking: { de: "Benchmarking", en: "Benchmarking", fr: "Benchmarking", 'pt-br': "Benchmarking" },
  tags_email: { de: "E-Mail", en: "Email", fr: "E-mail", 'pt-br': "E-mail" },
  tags_sales: { de: "Verkauf", en: "Sales", fr: "Ventes", 'pt-br': "Vendas" },
  tags_outreach: { de: "Outreach", en: "Outreach", fr: "Prospection", 'pt-br': "Prospecção" },
  tags_customerExperience: { de: "Kundenerlebnis", en: "Customer Experience", fr: "Expérience Client", 'pt-br': "Experiência do Cliente" },
  tags_service: { de: "Service", en: "Service", fr: "Service", 'pt-br': "Serviço" },
  tags_customerPerspective: { de: "Kundenperspektive", en: "Customer Perspective", fr: "Perspective Client", 'pt-br': "Perspectiva do Cliente" },
  tags_feedback: { de: "Feedback", en: "Feedback", fr: "Retour d'Information", 'pt-br': "Feedback" },
  tags_testing: { de: "Testing", en: "Testing", fr: "Tests", 'pt-br': "Testes" },
  tags_targetAudience: { de: "Zielgruppe", en: "Target Audience", fr: "Public Cible", 'pt-br': "Público-Alvo" },
  tags_content: { de: "Content", en: "Content", fr: "Contenu", 'pt-br': "Conteúdo" },
  tags_faq: { de: "FAQ", en: "FAQ", fr: "FAQ", 'pt-br': "FAQ" },
  tags_selfService: { de: "Self-Service", en: "Self-Service", fr: "Libre-Service", 'pt-br': "Autoatendimento" },
  tags_support: { de: "Support", en: "Support", fr: "Support", 'pt-br': "Suporte" },
  tags_cfo: { de: "CFO", en: "CFO", fr: "CFO", 'pt-br': "CFO" },
  tags_dashboard: { de: "Dashboard", en: "Dashboard", fr: "Tableau de Bord", 'pt-br': "Painel" },
  tags_reporting: { de: "Reporting", en: "Reporting", fr: "Reporting", 'pt-br': "Relatórios" },
  tags_recruiting: { de: "Recruiting", en: "Recruiting", fr: "Recrutement", 'pt-br': "Recrutamento" },
  tags_talentAcquisition: { de: "Talentakquise", en: "Talent Acquisition", fr: "Acquisition de Talents", 'pt-br': "Aquisição de Talentos" },
  tags_onboarding: { de: "Onboarding", en: "Onboarding", fr: "Intégration", 'pt-br': "Integração" },
  tags_learning: { de: "Lernen", en: "Learning", fr: "Apprentissage", 'pt-br': "Aprendizagem" },
  tags_pareto: { de: "Pareto", en: "Pareto", fr: "Pareto", 'pt-br': "Pareto" },
  tags_efficiency: { de: "Effizienz", en: "Efficiency", fr: "Efficacité", 'pt-br': "Eficiência" },
  tags_explanation: { de: "Erklärung", en: "Explanation", fr: "Explication", 'pt-br': "Explicação" },
  tags_comprehension: { de: "Verständlichkeit", en: "Comprehension", fr: "Compréhension", 'pt-br': "Compreensão" },
  tags_learningPlan: { de: "Lernplan", en: "Learning Plan", fr: "Plan d'Apprentissage", 'pt-br': "Plano de Aprendizagem" },
  tags_individualization: { de: "Individualisierung", en: "Individualization", fr: "Personnalisation", 'pt-br': "Individualização" },
  tags_structure: { de: "Struktur", en: "Structure", fr: "Structure", 'pt-br': "Estrutura" },
  tags_expertise: { de: "Expertise", en: "Expertise", fr: "Expertise", 'pt-br': "Expertise" },
  tags_knowledgeGaps: { de: "Wissenslücken", en: "Knowledge Gaps", fr: "Lacunes de Connaissances", 'pt-br': "Lacunas de Conhecimento" },
  tags_workshop: { de: "Workshop", en: "Workshop", fr: "Atelier", 'pt-br': "Workshop" },
  tags_moderation: { de: "Moderation", en: "Moderation", fr: "Modération", 'pt-br': "Moderação" },
  tags_communication: { de: "Kommunikation", en: "Communication", fr: "Communication", 'pt-br': "Comunicação" },
  tags_silos: { de: "Silos", en: "Silos", fr: "Silos", 'pt-br': "Silos" },
  tags_mediation: { de: "Mediation", en: "Mediation", fr: "Médiation", 'pt-br': "Mediação" },
  tags_brainstorming: { de: "Brainstorming", en: "Brainstorming", fr: "Brainstorming", 'pt-br': "Brainstorming" },
  tags_creativity: { de: "Kreativität", en: "Creativity", fr: "Créativité", 'pt-br': "Criatividade" },
  tags_employeeRetention: { de: "Mitarbeiterbindung", en: "Employee Retention", fr: "Fidélisation des Employés", 'pt-br': "Retenção de Funcionários" },
  tags_criticism: { de: "Kritik", en: "Criticism", fr: "Critique", 'pt-br': "Crítica" },
  tags_development: { de: "Entwicklung", en: "Development", fr: "Développement", 'pt-br': "Desenvolvimento" },
  tags_reflection: { de: "Reflexion", en: "Reflection", fr: "Réflexion", 'pt-br': "Reflexão" },
  tags_decisions: { de: "Entscheidungen", en: "Decisions", fr: "Décisions", 'pt-br': "Decisões" },
  tags_lifeWisdom: { de: "Lebensweisheit", en: "Life Wisdom", fr: "Sagesse de Vie", 'pt-br': "Sabedoria de Vida" },
  tags_principles: { de: "Prinzipien", en: "Principles", fr: "Principes", 'pt-br': "Princípios" },
  tags_coaching: { de: "Coaching", en: "Coaching", fr: "Coaching", 'pt-br': "Coaching" },
  tags_personalDevelopment: { de: "Persönlichkeitsentwicklung", en: "Personal Development", fr: "Développement Personnel", 'pt-br': "Desenvolvimento Pessoal" },
  tags_selfActualization: { de: "Selbstverwirklichung", en: "Self-Actualization", fr: "Réalisation de Soi", 'pt-br': "Autorrealização" },
  tags_jung: { de: "Jung", en: "Jung", fr: "Jung", 'pt-br': "Jung" },
  tags_depthPsychology: { de: "Tiefenpsychologie", en: "Depth Psychology", fr: "Psychologie Profonde", 'pt-br': "Psicologia Profunda" },
  tags_emotionalIntelligence: { de: "Emotionale Intelligenz", en: "Emotional Intelligence", fr: "Intelligence Émotionnelle", 'pt-br': "Inteligência Emocional" },
  tags_storytelling: { de: "Storytelling", en: "Storytelling", fr: "Storytelling", 'pt-br': "Storytelling" },
  tags_impact: { de: "Wirkung", en: "Impact", fr: "Impact", 'pt-br': "Impacto" },
  tags_trust: { de: "Vertrauen", en: "Trust", fr: "Confiance", 'pt-br': "Confiança" },
  tags_promptEngineering: { de: "Prompt Engineering", en: "Prompt Engineering", fr: "Ingénierie de Prompts", 'pt-br': "Engenharia de Prompts" },
  tags_optimization: { de: "Optimierung", en: "Optimization", fr: "Optimisation", 'pt-br': "Otimização" },
  tags_iteration: { de: "Iteration", en: "Iteration", fr: "Itération", 'pt-br': "Iteração" },
  tags_reasoning: { de: "Reasoning", en: "Reasoning", fr: "Raisonnement", 'pt-br': "Raciocínio" },
  tags_multiPerspective: { de: "Multi-Perspektive", en: "Multi-Perspective", fr: "Multi-Perspectives", 'pt-br': "Multiperspectiva" },
  tags_ai: { de: "AI", en: "AI", fr: "IA", 'pt-br': "IA" },
  tags_consistency: { de: "Konsistenz", en: "Consistency", fr: "Cohérence", 'pt-br': "Consistência" },
  tags_validation: { de: "Validierung", en: "Validation", fr: "Validation", 'pt-br': "Validação" },
  tags_cot: { de: "CoT", en: "CoT", fr: "CoT", 'pt-br': "CoT" },
  tags_meta: { de: "Meta", en: "Meta", fr: "Meta", 'pt-br': "Meta" },
  tags_promptDesign: { de: "Prompt Design", en: "Prompt Design", fr: "Conception de Prompts", 'pt-br': "Design de Prompts" },
  tags_context: { de: "Kontext", en: "Context", fr: "Contexte", 'pt-br': "Contexto" },
  tags_questions: { de: "Fragen", en: "Questions", fr: "Questions", 'pt-br': "Perguntas" },
  tags_quality: { de: "Qualität", en: "Quality", fr: "Qualité", 'pt-br': "Qualidade" },
  tags_frameworks: { de: "Frameworks", en: "Frameworks", fr: "Frameworks", 'pt-br': "Frameworks" },
  tags_review: { de: "Review", en: "Review", fr: "Revue", 'pt-br': "Revisão" },
  tags_verification: { de: "Prüfung", en: "Verification", fr: "Vérification", 'pt-br': "Verificação" },
  tags_perspective: { de: "Perspektive", en: "Perspective", fr: "Perspective", 'pt-br': "Perspectiva" },
  tags_clarity: { de: "Klarheit", en: "Clarity", fr: "Clarté", 'pt-br': "Clareza" },
  tags_evidence: { de: "Evidenz", en: "Evidence", fr: "Preuve", 'pt-br': "Evidência" },
  tags_sources: { de: "Quellen", en: "Sources", fr: "Sources", 'pt-br': "Fontes" },
  tags_traceability: { de: "Nachvollziehbarkeit", en: "Traceability", fr: "Traçabilité", 'pt-br': "Rastreabilidade" },
  tags_organization: { de: "Organisation", en: "Organization", fr: "Organisation", 'pt-br': "Organização" },
  tags_overview: { de: "Übersicht", en: "Overview", fr: "Aperçu", 'pt-br': "Visão Geral" },
  tags_userPerspective: { de: "Nutzerperspektive", en: "User Perspective", fr: "Perspective Utilisateur", 'pt-br': "Perspectiva do Usuário" },
  tags_usability: { de: "Usability", en: "Usability", fr: "Utilisabilité", 'pt-br': "Usabilidade" },
  tags_problemSolving: { de: "Problem Solving", en: "Problem Solving", fr: "Résolution de Problèmes", 'pt-br': "Resolução de Problemas" },
  tags_clarification: { de: "Klärung", en: "Clarification", fr: "Clarification", 'pt-br': "Esclarecimento" },
  tags_improvement: { de: "Verbesserung", en: "Improvement", fr: "Amélioration", 'pt-br': "Melhoria" },

  // Framework translations
  framework_rain_title: { de: "R-A-I-N", en: "R-A-I-N", fr: "R-A-I-N", 'pt-br': "R-A-I-N" },
  framework_rain_desc: {
    de: "Ein kompaktes Struktur-Framework, das hilft, präzise Anweisungen für Aufgaben zu formulieren",
    en: "A compact structure framework that helps formulate precise instructions for tasks",
    fr: "Un framework de structure compact qui aide à formuler des instructions précises pour les tâches",
    'pt-br': "Um framework de estrutura compacto que ajuda a formular instruções precisas para tarefas"
  },
  framework_rain_structure: {
    de: "R – Act as a (ROLE): Definiere die Rolle\nA – State the (AIM): Formuliere das Ziel\nI – Use the provided (INPUT): Bestimme Material/Daten\nN – Hit the (NUMERIC TARGET): Lege messbare Ziele fest",
    en: "R – Act as a (ROLE): Define the role\nA – State the (AIM): Formulate the goal\nI – Use the provided (INPUT): Determine material/data\nN – Hit the (NUMERIC TARGET): Set measurable goals",
    fr: "R – Act as a (ROLE): Définir le rôle\nA – State the (AIM): Formuler l'objectif\nI – Use the provided (INPUT): Déterminer le matériel/les données\nN – Hit the (NUMERIC TARGET): Fixer des objectifs mesurables",
    'pt-br': "R – Act as a (ROLE): Definir o papel\nA – State the (AIM): Formular o objetivo\nI – Use the provided (INPUT): Determinar material/dados\nN – Hit the (NUMERIC TARGET): Estabelecer metas mensuráveis"
  },

  // Framework tags
  framework_tags_instruction: { de: "Anweisung", en: "Instruction", fr: "Instruction", 'pt-br': "Instrução" },
  framework_tags_goal: { de: "Ziel", en: "Goal", fr: "Objectif", 'pt-br': "Objetivo" },
  framework_tags_output: { de: "Output", en: "Output", fr: "Sortie", 'pt-br': "Saída" },
  framework_tags_consistency: { de: "Konsistenz", en: "Consistency", fr: "Cohérence", 'pt-br': "Consistência" },
  framework_tags_task: { de: "Aufgabe", en: "Task", fr: "Tâche", 'pt-br': "Tarefa" },
  framework_tags_role: { de: "Rolle", en: "Role", fr: "Rôle", 'pt-br': "Papel" },
  framework_tags_format: { de: "Format", en: "Format", fr: "Format", 'pt-br': "Formato" },
  framework_tags_targetAudience: { de: "Zielgruppe", en: "Target Audience", fr: "Public Cible", 'pt-br': "Público-Alvo" },
  framework_tags_conversion: { de: "Conversion", en: "Conversion", fr: "Conversion", 'pt-br': "Conversão" },
  framework_tags_logic: { de: "Logik", en: "Logic", fr: "Logique", 'pt-br': "Lógica" },
  framework_tags_argumentation: { de: "Argumentation", en: "Argumentation", fr: "Argumentation", 'pt-br': "Argumentação" },
  framework_tags_measurability: { de: "Messbarkeit", en: "Measurability", fr: "Mesurabilité", 'pt-br': "Mensurabilidade" },
  framework_tags_completeness: { de: "Vollständigkeit", en: "Completeness", fr: "Complétude", 'pt-br': "Completude" },
  framework_tags_mentoring: { de: "Mentoring", en: "Mentoring", fr: "Mentorat", 'pt-br': "Mentoria" },
  framework_tags_conflictResolution: { de: "Konfliktlösung", en: "Conflict Resolution", fr: "Résolution de Conflits", 'pt-br': "Resolução de Conflitos" },
  framework_tags_negotiation: { de: "Verhandlung", en: "Negotiation", fr: "Négociation", 'pt-br': "Negociação" },
  framework_tags_collaboration: { de: "Zusammenarbeit", en: "Collaboration", fr: "Collaboration", 'pt-br': "Colaboração" }
};

// Helper function to get translated text
export function getTranslation(key: keyof typeof promptTranslationKeys, lang: Language): string {
  const translations = promptTranslationKeys[key];
  return translations[lang] || translations.de; // Fallback to German if translation missing
}

// Helper function to translate an array of tag keys
export function translateTags(tagKeys: string[], lang: Language): string[] {
  return tagKeys.map(key => {
    const translationKey = `tags_${key}` as keyof typeof promptTranslationKeys;
    return getTranslation(translationKey, lang);
  });
}

// Export a helper to generate the full prompt data structure for a given language
export function getLocalizedPromptContent(lang: Language): any {
  return {
    market: [
      {
        title: getTranslation('market_aiRival_title', lang),
        description: getTranslation('market_aiRival_desc', lang),
        prompt: getTranslation('market_aiRival_prompt', lang),
        tags: translateTags(['competition', 'innovation', 'strategy'], lang)
      },
      // Additional prompts would follow the same pattern
    ],
    planning: [
      {
        title: getTranslation('planning_virtualAssistant_title', lang),
        description: getTranslation('planning_virtualAssistant_desc', lang),
        prompt: getTranslation('planning_virtualAssistant_prompt', lang),
        tags: translateTags(['automation', 'productivity', 'taskManagement'], lang)
      },
      // Additional prompts...
    ],
    // Other categories...
  };
}

export function getLocalizedFrameworkContent(lang: Language): any {
  return {
    mission: [
      {
        title: getTranslation('framework_rain_title', lang),
        description: getTranslation('framework_rain_desc', lang),
        structure: getTranslation('framework_rain_structure', lang),
        tags: translateTags(['structure', 'instruction', 'goal'], lang).map(tag => {
          const key = `framework_tags_${tag.toLowerCase()}` as keyof typeof promptTranslationKeys;
          return getTranslation(key, lang);
        })
      },
      // Additional frameworks...
    ],
    // Other categories...
  };
}
