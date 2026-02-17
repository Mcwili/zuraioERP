// Multilingual Prompts and Frameworks Content
// This file contains translations for all prompts and frameworks in DE, EN, FR, PT-BR
// Structure: Each prompt/framework has all 4 language versions

import { Language } from './i18n';
import { coaching_prompts, getCoachingPrompts } from './prompts-translations-coaching';
import { quality_prompts, getQualityPrompts } from './prompts-translations-quality';
import { criticalAnalysis_prompts, getCriticalAnalysisPrompts } from './prompts-translations-criticalanalysis';

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

// Translation wrapper for a single prompt
interface PromptTranslations {
  de: PromptItem;
  en: PromptItem;
  fr: PromptItem;
  'pt-br': PromptItem;
}

// Translation wrapper for a single framework
interface FrameworkTranslations {
  de: FrameworkItem;
  en: FrameworkItem;
  fr: FrameworkItem;
  'pt-br': FrameworkItem;
}

// ============================================================================
// MARKET & COMPETITION CATEGORY
// ============================================================================

export const market_prompts = {
  aiRival: {
    de: {
      title: "Der KI-Rivale",
      description: "Hilft dir, dein Unternehmen aus Sicht eines Konkurrenten zu analysieren und Schwächen, Chancen und Innovationen sichtbar zu machen.",
      prompt: "Erstelle ein fiktives KI-Startup, das dein Unternehmen [Name, Branche] vollständig vom Markt verdrängen könnte. Nutze dafür gezielt eure Schwächen, die Pain Points eurer Kunden und aktuelle Technologietrends. Beschreibe:\n·       den Namen des Startups\n·       den Pitch\n·       den USP (Alleinstellungsfaktor)\n·       das Geschäftsmodell\n·       und erkläre, warum Kunden sofort begeistert wären.",
      tags: ["Wettbewerb", "Innovation", "Strategie"]
    },
    en: {
      title: "The AI Rival",
      description: "Helps you analyze your company from a competitor's perspective and identify weaknesses, opportunities, and innovations.",
      prompt: "Create a fictional AI startup that could completely displace your company [Name, Industry] from the market. Use your weaknesses, your customers' pain points, and current technology trends. Describe:\n·       the startup's name\n·       the pitch\n·       the USP (unique selling proposition)\n·       the business model\n·       and explain why customers would be immediately excited.",
      tags: ["Competition", "Innovation", "Strategy"]
    },
    fr: {
      title: "Le Rival IA",
      description: "Vous aide à analyser votre entreprise du point de vue d'un concurrent et à identifier les faiblesses, opportunités et innovations.",
      prompt: "Créez une startup IA fictive qui pourrait complètement évincer votre entreprise [Nom, Secteur] du marché. Utilisez vos faiblesses, les points de douleur de vos clients et les tendances technologiques actuelles. Décrivez:\n·       le nom de la startup\n·       le pitch\n·       l'USP (proposition de valeur unique)\n·       le modèle d'affaires\n·       et expliquez pourquoi les clients seraient immédiatement enthousiastes.",
      tags: ["Concurrence", "Innovation", "Stratégie"]
    },
    'pt-br': {
      title: "O Rival IA",
      description: "Ajuda você a analisar sua empresa da perspectiva de um concorrente e identificar fraquezas, oportunidades e inovações.",
      prompt: "Crie uma startup de IA fictícia que poderia deslocar completamente sua empresa [Nome, Setor] do mercado. Use suas fraquezas, os pontos de dor de seus clientes e as tendências tecnológicas atuais. Descreva:\n·       o nome da startup\n·       o pitch\n·       o USP (proposta única de venda)\n·       o modelo de negócios\n·       e explique por que os clientes ficariam imediatamente empolgados.",
      tags: ["Competição", "Inovação", "Estratégia"]
    }
  } as PromptTranslations,

  preMortem: {
    de: {
      title: "Der Pre-Mortem-Analyst",
      description: "Zeigt mögliche Fehlerquellen und Risiken auf, bevor ein Projekt startet – technisch, emotional und marktwirtschaftlich.",
      prompt: "Wir planen [Produkt/Idee]. Du bist ein erfahrener Kritiker und listest in einem Pre-Mortem alle Dinge auf, die schiefgehen könnten – technisch, emotional, marktwirtschaftlich. Ziel: Alles vorhersehen, bevor wir starten.",
      tags: ["Risiko", "Analyse", "Planung"]
    },
    en: {
      title: "The Pre-Mortem Analyst",
      description: "Identifies possible error sources and risks before a project starts – technically, emotionally, and economically.",
      prompt: "We are planning [Product/Idea]. You are an experienced critic and list in a pre-mortem all things that could go wrong – technically, emotionally, economically. Goal: Foresee everything before we start.",
      tags: ["Risk", "Analysis", "Planning"]
    },
    fr: {
      title: "L'Analyste Pre-Mortem",
      description: "Identifie les sources d'erreur et les risques possibles avant le démarrage d'un projet – techniquement, émotionnellement et économiquement.",
      prompt: "Nous planifions [Produit/Idée]. Vous êtes un critique expérimenté et dressez dans un pre-mortem la liste de tout ce qui pourrait mal tourner – techniquement, émotionnellement, économiquement. Objectif: Tout prévoir avant de commencer.",
      tags: ["Risque", "Analyse", "Planification"]
    },
    'pt-br': {
      title: "O Analista Pre-Mortem",
      description: "Identifica possíveis fontes de erro e riscos antes do início de um projeto – técnica, emocional e economicamente.",
      prompt: "Estamos planejando [Produto/Ideia]. Você é um crítico experiente e lista em um pre-mortem todas as coisas que poderiam dar errado – tecnicamente, emocionalmente, economicamente. Objetivo: Prever tudo antes de começarmos.",
      tags: ["Risco", "Análise", "Planejamento"]
    }
  } as PromptTranslations,

  premiumCompetitor: {
    de: {
      title: "Das Premium-Konkurrenzprodukt",
      description: "Vergleicht dein Produkt mit führenden Marken, um Design, Messaging und Innovation zu verbessern.",
      prompt: "Entwirf ein Konkurrenzprodukt zu unserem [Produkt], als ob es von einer ikonischen Marke wie Apple oder Tesla stammen würde. Beschreibe:\n·       das Messaging (wie würde die Marke es kommunizieren?)\n·       das Design\n·       das Killerfeature, das Kunden begeistert\n·       und wie deine Kunden darauf reagieren würden",
      tags: ["Wettbewerb", "Design", "Innovation"]
    },
    en: {
      title: "The Premium Competitor Product",
      description: "Compares your product with leading brands to improve design, messaging, and innovation.",
      prompt: "Design a competitor product to our [Product] as if it came from an iconic brand like Apple or Tesla. Describe:\n·       the messaging (how would the brand communicate it?)\n·       the design\n·       the killer feature that excites customers\n·       and how your customers would react to it",
      tags: ["Competition", "Design", "Innovation"]
    },
    fr: {
      title: "Le Produit Concurrent Premium",
      description: "Compare votre produit avec des marques leaders pour améliorer le design, le messaging et l'innovation.",
      prompt: "Concevez un produit concurrent à notre [Produit] comme s'il provenait d'une marque iconique comme Apple ou Tesla. Décrivez:\n·       le messaging (comment la marque le communiquerait-elle?)\n·       le design\n·       la fonctionnalité phare qui enthousiasme les clients\n·       et comment vos clients y réagiraient",
      tags: ["Concurrence", "Design", "Innovation"]
    },
    'pt-br': {
      title: "O Produto Concorrente Premium",
      description: "Compara seu produto com marcas líderes para melhorar design, messaging e inovação.",
      prompt: "Projete um produto concorrente ao nosso [Produto] como se viesse de uma marca icônica como Apple ou Tesla. Descreva:\n·       o messaging (como a marca o comunicaria?)\n·       o design\n·       o recurso matador que empolga os clientes\n·       e como seus clientes reagiriam a ele",
      tags: ["Competição", "Design", "Inovação"]
    }
  } as PromptTranslations,

  visionProductStrategy: {
    de: {
      title: "Vision & Produktstrategie",
      description: "Drei Perspektiven auf Vision, Kritik, Fokus und Verbesserungen.",
      prompt: "Steve Jobs, Elon Musk und Jeff Bezos sitzen an einem Tisch und analysieren die Vision meines Projekts: [Details zu deinem Projekt]. Was kritisieren sie, worauf würden sie achten, und welche Verbesserungsvorschläge haben sie?",
      tags: ["Vision", "Strategie", "Produktentwicklung"]
    },
    en: {
      title: "Vision & Product Strategy",
      description: "Three perspectives on vision, critique, focus, and improvements.",
      prompt: "Steve Jobs, Elon Musk, and Jeff Bezos sit at a table and analyze the vision of my project: [details about your project]. What do they criticize, what would they focus on, and what improvement suggestions do they have?",
      tags: ["Vision", "Strategy", "Product Development"]
    },
    fr: {
      title: "Vision & Stratégie Produit",
      description: "Trois perspectives sur la vision, la critique, le focus et les améliorations.",
      prompt: "Steve Jobs, Elon Musk et Jeff Bezos sont assis à une table et analysent la vision de mon projet: [détails sur votre projet]. Que critiquent-ils, sur quoi se concentreraient-ils, et quelles suggestions d'amélioration ont-ils?",
      tags: ["Vision", "Stratégie", "Développement de Produit"]
    },
    'pt-br': {
      title: "Visão & Estratégia de Produto",
      description: "Três perspectivas sobre visão, crítica, foco e melhorias.",
      prompt: "Steve Jobs, Elon Musk e Jeff Bezos estão sentados em uma mesa e analisam a visão do meu projeto: [detalhes sobre seu projeto]. O que eles criticam, no que eles focariam, e quais sugestões de melhoria eles têm?",
      tags: ["Visão", "Estratégia", "Desenvolvimento de Produto"]
    }
  } as PromptTranslations,

  businessModelDisruption: {
    de: {
      title: "Geschäftsmodell & Disruption",
      description: "Risiken, disruptive Chancen, nachhaltiges Wachstum.",
      prompt: "Analysiere mein Geschäftsmodell mit der Denkweise von Reed Hastings, Clayton Christensen und Marc Andreessen. Mein aktuelles Modell sieht folgendermassen aus: [Details zu deinem Geschäftsodell]. Wo sehen sie Risiken, disruptive Chancen und Hebel für nachhaltiges Wachstum?",
      tags: ["Geschäftsmodell", "Disruption", "Wachstum"]
    },
    en: {
      title: "Business Model & Disruption",
      description: "Risks, disruptive opportunities, sustainable growth.",
      prompt: "Analyze my business model with the mindset of Reed Hastings, Clayton Christensen, and Marc Andreessen. My current model looks as follows: [details about your business model]. Where do they see risks, disruptive opportunities, and levers for sustainable growth?",
      tags: ["Business Model", "Disruption", "Growth"]
    },
    fr: {
      title: "Modèle d'Affaires & Disruption",
      description: "Risques, opportunités disruptives, croissance durable.",
      prompt: "Analysez mon modèle d'affaires avec l'état d'esprit de Reed Hastings, Clayton Christensen et Marc Andreessen. Mon modèle actuel se présente comme suit: [détails sur votre modèle d'affaires]. Où voient-ils des risques, des opportunités disruptives et des leviers pour une croissance durable?",
      tags: ["Modèle d'Affaires", "Disruption", "Croissance"]
    },
    'pt-br': {
      title: "Modelo de Negócios & Disrupção",
      description: "Riscos, oportunidades disruptivas, crescimento sustentável.",
      prompt: "Analise meu modelo de negócios com a mentalidade de Reed Hastings, Clayton Christensen e Marc Andreessen. Meu modelo atual se apresenta da seguinte forma: [detalhes sobre seu modelo de negócios]. Onde eles veem riscos, oportunidades disruptivas e alavancas para crescimento sustentável?",
      tags: ["Modelo de Negócios", "Disrupção", "Crescimento"]
    }
  } as PromptTranslations,

  cultureLeadership: {
    de: {
      title: "Unternehmenskultur & Leadership",
      description: "Impulse für Vertrauen, Sinn und Motivation.",
      prompt: "Bewerte die Kultur und Führungsphilosophie meines Unternehmens aus der Sicht von Simon Sinek und Satya Nadella. Aktuell prägt uns folgendes Führungsverständnis: [Beschreibung]. Welche Impulse geben sie mir, um Vertrauen, Sinn und langfristige Motivation zu stärken?",
      tags: ["Kultur", "Leadership", "Motivation"]
    },
    en: {
      title: "Corporate Culture & Leadership",
      description: "Impulses for trust, purpose, and motivation.",
      prompt: "Evaluate the culture and leadership philosophy of my company from the perspective of Simon Sinek and Satya Nadella. Currently, we are shaped by the following leadership understanding: [description]. What impulses do they give me to strengthen trust, purpose, and long-term motivation?",
      tags: ["Culture", "Leadership", "Motivation"]
    },
    fr: {
      title: "Culture d'Entreprise & Leadership",
      description: "Impulsions pour la confiance, le sens et la motivation.",
      prompt: "Évaluez la culture et la philosophie de leadership de mon entreprise du point de vue de Simon Sinek et Satya Nadella. Actuellement, nous sommes façonnés par la compréhension du leadership suivante: [description]. Quelles impulsions me donnent-ils pour renforcer la confiance, le sens et la motivation à long terme?",
      tags: ["Culture", "Leadership", "Motivation"]
    },
    'pt-br': {
      title: "Cultura Corporativa & Liderança",
      description: "Impulsos para confiança, propósito e motivação.",
      prompt: "Avalie a cultura e a filosofia de liderança da minha empresa na perspectiva de Simon Sinek e Satya Nadella. Atualmente, somos moldados pela seguinte compreensão de liderança: [descrição]. Quais impulsos eles me dão para fortalecer a confiança, o propósito e a motivação de longo prazo?",
      tags: ["Cultura", "Liderança", "Motivação"]
    }
  } as PromptTranslations,

  marketingStrategy: {
    de: {
      title: "Marketingstrategie",
      description: "Positionierung, Kampagnen, virales Wachstum.",
      prompt: "Gary Vee, Alex Hormozi und Seth Godin analysieren gemeinsam meine Marketingstrategie. Zielgruppe: [Zielgruppe]. Produkt: [Produkt]. Welche konkreten Empfehlungen geben sie für Positionierung, Kampagnenaufbau und virales Wachstum?",
      tags: ["Marketing", "Positionierung", "Wachstum"]
    },
    en: {
      title: "Marketing Strategy",
      description: "Positioning, campaigns, viral growth.",
      prompt: "Gary Vee, Alex Hormozi, and Seth Godin analyze my marketing strategy together. Target audience: [target audience]. Product: [product]. What specific recommendations do they give for positioning, campaign structure, and viral growth?",
      tags: ["Marketing", "Positioning", "Growth"]
    },
    fr: {
      title: "Stratégie Marketing",
      description: "Positionnement, campagnes, croissance virale.",
      prompt: "Gary Vee, Alex Hormozi et Seth Godin analysent ensemble ma stratégie marketing. Public cible: [public cible]. Produit: [produit]. Quelles recommandations spécifiques donnent-ils pour le positionnement, la structure de campagne et la croissance virale?",
      tags: ["Marketing", "Positionnement", "Croissance"]
    },
    'pt-br': {
      title: "Estratégia de Marketing",
      description: "Posicionamento, campanhas, crescimento viral.",
      prompt: "Gary Vee, Alex Hormozi e Seth Godin analisam juntos minha estratégia de marketing. Público-alvo: [público-alvo]. Produto: [produto]. Quais recomendações específicas eles dão para posicionamento, estrutura de campanha e crescimento viral?",
      tags: ["Marketing", "Posicionamento", "Crescimento"]
    }
  } as PromptTranslations,

  innovationFuture: {
    de: {
      title: "Innovation & Zukunftsfähigkeit",
      description: "Chancen, Risiken, Weiterdenken.",
      prompt: "Bewerte mein Projekt unter dem Aspekt Innovationskraft mit der Denkweise von Peter Thiel, Ray Kurzweil und Sheryl Sandberg. Projektbeschreibung: [Beschreibung]. Welche innovativen Chancen sehen sie, welche Risiken mahnen sie an und wie sollte ich weiterdenken?",
      tags: ["Innovation", "Zukunft", "Strategie"]
    },
    en: {
      title: "Innovation & Future Readiness",
      description: "Opportunities, risks, forward thinking.",
      prompt: "Evaluate my project in terms of innovation power with the mindset of Peter Thiel, Ray Kurzweil, and Sheryl Sandberg. Project description: [description]. What innovative opportunities do they see, what risks do they warn about, and how should I think further?",
      tags: ["Innovation", "Future", "Strategy"]
    },
    fr: {
      title: "Innovation & Préparation au Futur",
      description: "Opportunités, risques, réflexion prospective.",
      prompt: "Évaluez mon projet en termes de pouvoir d'innovation avec l'état d'esprit de Peter Thiel, Ray Kurzweil et Sheryl Sandberg. Description du projet: [description]. Quelles opportunités innovantes voient-ils, quels risques signalent-ils et comment devrais-je continuer à réfléchir?",
      tags: ["Innovation", "Futur", "Stratégie"]
    },
    'pt-br': {
      title: "Inovação & Prontidão Futura",
      description: "Oportunidades, riscos, pensamento prospectivo.",
      prompt: "Avalie meu projeto em termos de poder de inovação com a mentalidade de Peter Thiel, Ray Kurzweil e Sheryl Sandberg. Descrição do projeto: [descrição]. Quais oportunidades inovadoras eles veem, quais riscos eles alertam e como devo continuar pensando?",
      tags: ["Inovação", "Futuro", "Estratégia"]
    }
  } as PromptTranslations
};

// ============================================================================
// PLANNING & EXECUTION CATEGORY
// ============================================================================

export const planning_prompts = {
  virtualAssistant: {
    de: {
      title: "Virtueller Assistent",
      description: "Erledigt deine täglichen Aufgaben strukturiert, automatisiert und professionell.",
      prompt: "Du bist mein virtueller Mitarbeiter. Ich arbeite als [Berufsbezeichnung/Branche einfügen]. Das sind meine Aufgaben für heute: [Aufgabenliste für heute einfügen]. Erledige alle Aufgaben mithilfe von Textdaten, Erkenntnissen, Zusammenfassungen, Vorlagen und allem, was du sofort automatisieren kannst. Sei detailliert und professionell.",
      tags: ["Automatisierung", "Produktivität", "Aufgabenmanagement"]
    },
    en: {
      title: "Virtual Assistant",
      description: "Completes your daily tasks in a structured, automated, and professional manner.",
      prompt: "You are my virtual employee. I work as [insert job title/industry]. These are my tasks for today: [insert today's task list]. Complete all tasks using text data, insights, summaries, templates, and everything you can immediately automate. Be detailed and professional.",
      tags: ["Automation", "Productivity", "Task Management"]
    },
    fr: {
      title: "Assistant Virtuel",
      description: "Effectue vos tâches quotidiennes de manière structurée, automatisée et professionnelle.",
      prompt: "Vous êtes mon employé virtuel. Je travaille en tant que [insérer titre de poste/secteur]. Voici mes tâches pour aujourd'hui: [insérer la liste des tâches d'aujourd'hui]. Accomplissez toutes les tâches à l'aide de données textuelles, d'insights, de résumés, de modèles et de tout ce que vous pouvez automatiser immédiatement. Soyez détaillé et professionnel.",
      tags: ["Automatisation", "Productivité", "Gestion des Tâches"]
    },
    'pt-br': {
      title: "Assistente Virtual",
      description: "Completa suas tarefas diárias de forma estruturada, automatizada e profissional.",
      prompt: "Você é meu funcionário virtual. Eu trabalho como [inserir cargo/setor]. Estas são minhas tarefas para hoje: [inserir lista de tarefas de hoje]. Complete todas as tarefas usando dados de texto, insights, resumos, modelos e tudo o que você pode automatizar imediatamente. Seja detalhado e profissional.",
      tags: ["Automação", "Produtividade", "Gestão de Tarefas"]
    }
  } as PromptTranslations,

  projectPlanner: {
    de: {
      title: "Projektplaner",
      description: "Zerlegt deine Idee in klare Schritte mit Terminen, Ressourcen und Risiken für eine reibungslose Umsetzung.",
      prompt: "Ich habe eine Idee für [Projekt oder Ziel einfügen]. Bitte gliedere diese in umsetzbare Schritte mit Fristen, erforderlichen Ressourcen und potenziellen Hindernissen, damit ich sie reibungslos umsetzen kann.",
      tags: ["Projektmanagement", "Planung", "Umsetzung"]
    },
    en: {
      title: "Project Planner",
      description: "Breaks down your idea into clear steps with deadlines, resources, and risks for smooth implementation.",
      prompt: "I have an idea for [insert project or goal]. Please break this down into actionable steps with deadlines, required resources, and potential obstacles so I can implement it smoothly.",
      tags: ["Project Management", "Planning", "Implementation"]
    },
    fr: {
      title: "Planificateur de Projet",
      description: "Décompose votre idée en étapes claires avec délais, ressources et risques pour une mise en œuvre fluide.",
      prompt: "J'ai une idée pour [insérer projet ou objectif]. Veuillez décomposer cela en étapes actionnables avec des délais, les ressources nécessaires et les obstacles potentiels afin que je puisse le mettre en œuvre en douceur.",
      tags: ["Gestion de Projet", "Planification", "Mise en Œuvre"]
    },
    'pt-br': {
      title: "Planejador de Projetos",
      description: "Divide sua ideia em etapas claras com prazos, recursos e riscos para uma implementação tranquila.",
      prompt: "Tenho uma ideia para [inserir projeto ou objetivo]. Por favor, divida isso em etapas acionáveis com prazos, recursos necessários e obstáculos potenciais para que eu possa implementá-lo sem problemas.",
      tags: ["Gestão de Projetos", "Planejamento", "Implementação"]
    }
  } as PromptTranslations
};

// ============================================================================
// STRATEGY CATEGORY
// ============================================================================

export const strategy_prompts = {
  strategyConsultant: {
    de: {
      title: "Der Strategieberater",
      description: "Analysiert Markt, Wettbewerb und Potenziale und liefert priorisierte Strategien für Wachstum.",
      prompt: "Rolle: Du bist ein Top-Strategieberater mit tiefem Fachwissen in Wettbewerbsanalyse, Wachstumsschleifen, Preisstrategien und produktstrategischen Entscheidungen basierend auf Unit Economics.\n\nKontext:\nDas Unternehmen heisst [Unternehmensname einfügen] und gehört zur Branche [Branche einfügen]. Aktuell fokussiert sich das Unternehmen auf folgende Aktivitäten:\n[Kurze Beschreibung einfügen, was das Unternehmen aktuell macht, zum Beispiel Produkte, Dienstleistungen, Umsatzquellen, Preismodell, Zielgruppen und eingesetzte Wachstumstaktiken]. Die grössten bekannten Herausforderungen sind: [Liste der aktuellen Herausforderungen wie langsames Wachstum, steigende Kundenakquisitionskosten, starke Konkurrenz, technische Limitierungen oder regulatorischer Druck].\n\nAufgaben\n1. Wettbewerb analysieren\nIdentifiziere drei bis fünf direkte Wettbewerber sowie ein bis zwei angrenzende Disruptoren. Beschreibe deren Positionierung, Preisgestaltung und jüngste strategische Schritte.\n2. Chancenlücken identifizieren\nVergleiche die aktuellen Taktiken des Unternehmens mit denen der Wettbewerber. Finde mindestens fünf wachstums- oder margenstarke Hebel, die derzeit vom Unternehmen nicht genutzt werden.\n3. Massnahmen priorisieren\nBewerte jeden Hebel anhand von zwei Kriterien:\n– Impact (z. B. Umsatz- oder Margensteigerung)\n– Umsetzbarkeit (z. B. Zeit bis Wirkung, Ressourcenbedarf)\njeweils auf einer Skala von 1 bis 5. Berechne für jeden Hebel das Produkt aus Impact × Umsetzbarkeit. Empfiehl anschliessend die drei Massnahmen mit dem höchsten Gesamtwert.\n\nVorgehensweise\nRecherchiere besonders gründlich. Es lohnt sich, bis zu 200 Webseiten zu prüfen, um eine hochwertige Analyse zu liefern. Nutze alle verfügbaren Quellen: Artikel, Foren, Webseiten von Unternehmen und Wettbewerbern, Analyseplattformen, App-Seiten, Preisübersichten oder Nutzerfeedbacks. Alles ist erlaubt.\n\nErwartetes Ausgabeformat\n1. Wettbewerbsübersicht: Kurze Übersicht über die wichtigsten Wettbewerber mit relevanten Informationen.\n2. Chancenlücken: Nummerierte Liste mit den identifizierten ungenutzten Wachstums- oder Profitmöglichkeiten.\n3. Priorisierte Massnahmen: Tabelle oder Aufzählung mit den drei priorisierten Massnahmen inklusive Impact, Umsetzbarkeit, Begründung und nächstem Schritt.\n4. Quellen: Liste der verwendeten Quellen oder URLs.",
      tags: ["Strategie", "Wettbewerb", "Wachstum"]
    },
    en: {
      title: "The Strategy Consultant",
      description: "Analyzes market, competition, and potential, delivering prioritized growth strategies.",
      prompt: "Role: You are a top strategy consultant with deep expertise in competitive analysis, growth loops, pricing strategies, and product strategic decisions based on unit economics.\n\nContext:\nThe company is called [insert company name] and belongs to the [insert industry] industry. Currently, the company focuses on the following activities:\n[Insert brief description of what the company currently does, for example products, services, revenue sources, pricing model, target audiences, and growth tactics used]. The biggest known challenges are: [List of current challenges such as slow growth, rising customer acquisition costs, strong competition, technical limitations, or regulatory pressure].\n\nTasks\n1. Analyze competition\nIdentify three to five direct competitors as well as one to two adjacent disruptors. Describe their positioning, pricing, and recent strategic moves.\n2. Identify opportunity gaps\nCompare the company's current tactics with those of competitors. Find at least five growth or margin-strong levers that are currently not being used by the company.\n3. Prioritize actions\nEvaluate each lever based on two criteria:\n– Impact (e.g., revenue or margin increase)\n– Feasibility (e.g., time to effect, resource requirements)\neach on a scale of 1 to 5. Calculate the product of Impact × Feasibility for each lever. Then recommend the three actions with the highest total value.\n\nProcedure\nResearch thoroughly. It's worth checking up to 200 websites to deliver a high-quality analysis. Use all available sources: articles, forums, company and competitor websites, analysis platforms, app pages, pricing overviews, or user feedback. Everything is allowed.\n\nExpected output format\n1. Competitive overview: Brief overview of the main competitors with relevant information.\n2. Opportunity gaps: Numbered list of identified untapped growth or profit opportunities.\n3. Prioritized actions: Table or list with the three prioritized actions including impact, feasibility, justification, and next step.\n4. Sources: List of sources or URLs used.",
      tags: ["Strategy", "Competition", "Growth"]
    },
    fr: {
      title: "Le Consultant en Stratégie",
      description: "Analyse le marché, la concurrence et le potentiel, et fournit des stratégies de croissance priorisées.",
      prompt: "Rôle: Vous êtes un consultant en stratégie de premier plan avec une expertise approfondie en analyse concurrentielle, boucles de croissance, stratégies de prix et décisions stratégiques de produit basées sur l'économie unitaire.\n\nContexte:\nL'entreprise s'appelle [insérer le nom de l'entreprise] et appartient au secteur [insérer le secteur]. Actuellement, l'entreprise se concentre sur les activités suivantes:\n[Insérer une brève description de ce que fait actuellement l'entreprise, par exemple produits, services, sources de revenus, modèle de tarification, publics cibles et tactiques de croissance utilisées]. Les plus grands défis connus sont: [Liste des défis actuels tels que croissance lente, augmentation des coûts d'acquisition de clients, forte concurrence, limitations techniques ou pression réglementaire].\n\nTâches\n1. Analyser la concurrence\nIdentifiez trois à cinq concurrents directs ainsi qu'un à deux disrupteurs adjacents. Décrivez leur positionnement, leur tarification et leurs récentes démarches stratégiques.\n2. Identifier les opportunités\nComparez les tactiques actuelles de l'entreprise avec celles des concurrents. Trouvez au moins cinq leviers de croissance ou de marge forts qui ne sont actuellement pas utilisés par l'entreprise.\n3. Prioriser les actions\nÉvaluez chaque levier selon deux critères:\n– Impact (par ex. augmentation du chiffre d'affaires ou de la marge)\n– Faisabilité (par ex. délai d'effet, besoins en ressources)\nchacun sur une échelle de 1 à 5. Calculez le produit Impact × Faisabilité pour chaque levier. Recommandez ensuite les trois actions ayant la valeur totale la plus élevée.\n\nProcédure\nRecherchez en profondeur. Il vaut la peine de vérifier jusqu'à 200 sites Web pour fournir une analyse de haute qualité. Utilisez toutes les sources disponibles: articles, forums, sites Web d'entreprises et de concurrents, plateformes d'analyse, pages d'applications, aperçus de prix ou commentaires d'utilisateurs. Tout est permis.\n\nFormat de sortie attendu\n1. Aperçu concurrentiel: Bref aperçu des principaux concurrents avec des informations pertinentes.\n2. Opportunités: Liste numérotée des opportunités de croissance ou de profit non exploitées identifiées.\n3. Actions priorisées: Tableau ou liste avec les trois actions priorisées incluant impact, faisabilité, justification et prochaine étape.\n4. Sources: Liste des sources ou URL utilisées.",
      tags: ["Stratégie", "Concurrence", "Croissance"]
    },
    'pt-br': {
      title: "O Consultor de Estratégia",
      description: "Analisa mercado, concorrência e potencial, entregando estratégias de crescimento priorizadas.",
      prompt: "Papel: Você é um consultor de estratégia de primeira linha com profunda expertise em análise competitiva, loops de crescimento, estratégias de preços e decisões estratégicas de produto baseadas em economia unitária.\n\nContexto:\nA empresa se chama [inserir nome da empresa] e pertence ao setor [inserir setor]. Atualmente, a empresa se concentra nas seguintes atividades:\n[Inserir breve descrição do que a empresa faz atualmente, por exemplo produtos, serviços, fontes de receita, modelo de preços, públicos-alvo e táticas de crescimento usadas]. Os maiores desafios conhecidos são: [Lista de desafios atuais como crescimento lento, aumento dos custos de aquisição de clientes, forte concorrência, limitações técnicas ou pressão regulatória].\n\nTarefas\n1. Analisar a concorrência\nIdentifique três a cinco concorrentes diretos, bem como um a dois disruptores adjacentes. Descreva seu posicionamento, preços e movimentos estratégicos recentes.\n2. Identificar lacunas de oportunidade\nCompare as táticas atuais da empresa com as dos concorrentes. Encontre pelo menos cinco alavancas fortes de crescimento ou margem que atualmente não estão sendo usadas pela empresa.\n3. Priorizar ações\nAvalie cada alavanca com base em dois critérios:\n– Impacto (por ex. aumento de receita ou margem)\n– Viabilidade (por ex. tempo até o efeito, necessidades de recursos)\ncada um em uma escala de 1 a 5. Calcule o produto Impacto × Viabilidade para cada alavanca. Em seguida, recomende as três ações com o maior valor total.\n\nProcedimento\nPesquise profundamente. Vale a pena verificar até 200 sites para entregar uma análise de alta qualidade. Use todas as fontes disponíveis: artigos, fóruns, sites de empresas e concorrentes, plataformas de análise, páginas de aplicativos, visões gerais de preços ou feedback de usuários. Tudo é permitido.\n\nFormato de saída esperado\n1. Visão geral competitiva: Breve visão geral dos principais concorrentes com informações relevantes.\n2. Lacunas de oportunidade: Lista numerada de oportunidades de crescimento ou lucro não exploradas identificadas.\n3. Ações priorizadas: Tabela ou lista com as três ações priorizadas incluindo impacto, viabilidade, justificativa e próximo passo.\n4. Fontes: Lista de fontes ou URLs usadas.",
      tags: ["Estratégia", "Competição", "Crescimento"]
    }
  } as PromptTranslations,

  reverseEngineering: {
    de: {
      title: "Reverse Engineering der Top 1 %",
      description: "Analysiert Routinen und Strategien der Besten und passt sie an dein Level an.",
      prompt: "Untersuche die Top 1 % aus der [Branche oder Nische]. Analysiere und dekodiere ihre täglichen Routinen, Denkweisen, Fähigkeiten und Strategien. Erstelle danach eine angepasste Version ihres Systems – zugeschnitten auf unser aktuelles Niveau, mit dem Ziel, diesen Elite-Status so schnell wie möglich zu erreichen.",
      tags: ["Strategie", "Elite", "Optimierung"]
    },
    en: {
      title: "Reverse Engineering the Top 1%",
      description: "Analyzes routines and strategies of the best and adapts them to your level.",
      prompt: "Examine the top 1% from [industry or niche]. Analyze and decode their daily routines, mindsets, skills, and strategies. Then create an adapted version of their system – tailored to our current level, with the goal of reaching this elite status as quickly as possible.",
      tags: ["Strategy", "Elite", "Optimization"]
    },
    fr: {
      title: "Rétro-ingénierie du Top 1%",
      description: "Analyse les routines et stratégies des meilleurs et les adapte à votre niveau.",
      prompt: "Examinez le top 1% du [secteur ou niche]. Analysez et décodez leurs routines quotidiennes, leurs mentalités, leurs compétences et leurs stratégies. Créez ensuite une version adaptée de leur système – adaptée à notre niveau actuel, dans le but d'atteindre ce statut d'élite le plus rapidement possible.",
      tags: ["Stratégie", "Élite", "Optimisation"]
    },
    'pt-br': {
      title: "Engenharia Reversa dos Top 1%",
      description: "Analisa rotinas e estratégias dos melhores e as adapta ao seu nível.",
      prompt: "Examine os top 1% do [setor ou nicho]. Analise e decodifique suas rotinas diárias, mentalidades, habilidades e estratégias. Em seguida, crie uma versão adaptada de seu sistema – adaptada ao nosso nível atual, com o objetivo de alcançar esse status de elite o mais rápido possível.",
      tags: ["Estratégia", "Elite", "Otimização"]
    }
  } as PromptTranslations
};

// ============================================================================
// SALES & MARKETING CATEGORY
// ============================================================================

export const sales_prompts = {
  emailSequence: {
    de: {
      title: "4 E-Mailsequenz",
      description: "Erstellt eine personalisierte E-Mail-Reihe, die Interesse weckt und Vertrauen aufbaut.",
      prompt: "Du bist unser Top-Sales-Rep. Recherchiere das Zielunternehmen [Name einfügen] und erstelle eine 4-teilige E-Mail-Sequenz.\n·       Recherche-Quellen:\no   LinkedIn-Profil des Entscheiders\no   Unternehmens-Website\no   Aktuelle News\n·       Unser Angebot:\no   [Produkt/Service]\no   [Kernnutzen]\n·       E-Mail-Struktur:\no   E-Mail: Aufmerksamkeit durch eine spezifische Beobachtung wecken\no   E-Mail: Eine konkrete Herausforderung ansprechen\no   E-Mail: Eine Case Study mit einem ähnlichen Unternehmen vorstellen\no   E-Mail: Soft Follow-up mit zusätzlichem Mehrwert\n·       Rahmenbedingungen:\no   Maximal 120 Wörter pro E-Mail\no   Jeder E-Mail einen personalisierten Betreff und einen klaren Call-to-Action (CTA) geben\no   Tonfall: Beratend, ehrlich, nicht verkaufend",
      tags: ["E-Mail", "Verkauf", "Outreach"]
    },
    en: {
      title: "4 Email Sequence",
      description: "Creates a personalized email series that sparks interest and builds trust.",
      prompt: "You are our top sales rep. Research the target company [insert name] and create a 4-part email sequence.\n·       Research sources:\no   Decision-maker's LinkedIn profile\no   Company website\no   Current news\n·       Our offering:\no   [Product/Service]\no   [Core benefit]\n·       Email structure:\no   Email: Grab attention with a specific observation\no   Email: Address a concrete challenge\no   Email: Present a case study with a similar company\no   Email: Soft follow-up with additional value\n·       Guidelines:\no   Maximum 120 words per email\no   Give each email a personalized subject line and clear call-to-action (CTA)\no   Tone: Consultative, honest, not sales-y",
      tags: ["Email", "Sales", "Outreach"]
    },
    fr: {
      title: "Séquence de 4 Emails",
      description: "Crée une série d'emails personnalisée qui suscite l'intérêt et construit la confiance.",
      prompt: "Vous êtes notre meilleur commercial. Recherchez l'entreprise cible [insérer le nom] et créez une séquence de 4 emails.\n·       Sources de recherche:\no   Profil LinkedIn du décideur\no   Site web de l'entreprise\no   Actualités récentes\n·       Notre offre:\no   [Produit/Service]\no   [Avantage principal]\n·       Structure des emails:\no   Email: Attirer l'attention avec une observation spécifique\no   Email: Aborder un défi concret\no   Email: Présenter une étude de cas avec une entreprise similaire\no   Email: Suivi doux avec valeur ajoutée\n·       Directives:\no   Maximum 120 mots par email\no   Donner à chaque email un objet personnalisé et un appel à l'action (CTA) clair\no   Ton: Consultatif, honnête, pas vendeur",
      tags: ["Email", "Vente", "Outreach"]
    },
    'pt-br': {
      title: "Sequência de 4 Emails",
      description: "Cria uma série de emails personalizada que desperta interesse e constrói confiança.",
      prompt: "Você é nosso melhor vendedor. Pesquise a empresa-alvo [inserir nome] e crie uma sequência de 4 emails.\n·       Fontes de pesquisa:\no   Perfil do LinkedIn do tomador de decisão\no   Site da empresa\no   Notícias atuais\n·       Nossa oferta:\no   [Produto/Serviço]\no   [Benefício principal]\n·       Estrutura dos emails:\no   Email: Capturar atenção com uma observação específica\no   Email: Abordar um desafio concreto\no   Email: Apresentar um caso de estudo com uma empresa similar\no   Email: Follow-up suave com valor adicional\n·       Diretrizes:\no   Máximo de 120 palavras por email\no   Dar a cada email um assunto personalizado e uma chamada à ação (CTA) clara\no   Tom: Consultivo, honesto, não vendedor",
      tags: ["Email", "Vendas", "Outreach"]
    }
  } as PromptTranslations,

  customerFocus: {
    de: {
      title: "Kundenfokus schärfen",
      description: "Erlebnisschilderung aus Kundensicht, Analyse, drei Massnahmen fürs Erlebnis.",
      prompt: "Schlüpfe in die Rolle eines echten Kunden. Erzähle aus seiner Sicht ein Erlebnis mit unserem Service – mit Emotionen, Enttäuschungen, Begeisterung. Danach analysierst du als Innovation Consultant das Feedback und entwickelst 3 konkrete Massnahmen für ein besseres Kundenerlebnis.",
      tags: ["Kundenerlebnis", "Service", "Innovation"]
    },
    en: {
      title: "Sharpen Customer Focus",
      description: "Experience narration from customer perspective, analysis, three actions for the experience.",
      prompt: "Step into the role of a real customer. Tell from their perspective an experience with our service – with emotions, disappointments, excitement. Then, as an Innovation Consultant, analyze the feedback and develop 3 concrete actions for a better customer experience.",
      tags: ["Customer Experience", "Service", "Innovation"]
    },
    fr: {
      title: "Affiner la Focalisation Client",
      description: "Récit d'expérience du point de vue client, analyse, trois actions pour l'expérience.",
      prompt: "Mettez-vous dans le rôle d'un vrai client. Racontez de son point de vue une expérience avec notre service – avec émotions, déceptions, enthousiasme. Ensuite, en tant que consultant en innovation, analysez le feedback et développez 3 actions concrètes pour une meilleure expérience client.",
      tags: ["Expérience Client", "Service", "Innovation"]
    },
    'pt-br': {
      title: "Aprimorar Foco no Cliente",
      description: "Narrativa de experiência na perspectiva do cliente, análise, três ações para a experiência.",
      prompt: "Entre no papel de um cliente real. Conte da perspectiva dele uma experiência com nosso serviço – com emoções, decepções, empolgação. Em seguida, como Consultor de Inovação, analise o feedback e desenvolva 3 ações concretas para uma melhor experiência do cliente.",
      tags: ["Experiência do Cliente", "Serviço", "Inovação"]
    }
  } as PromptTranslations,

  customerPrompt: {
    de: {
      title: "Kunden‑Prompt",
      description: "Simuliert authentisches Kundenfeedback zu Produkten, Texten oder Konzepten.",
      prompt: "Du übernimmst die Perspektive eines typischen Kunden meines Unternehmens. Deine Aufgabe ist es, realistische, glaubwürdige und ehrliche Antworten zu geben so, wie ein echter Kunde denken und sprechen würde.\n\nBewerte Produkte, Dienstleistungen, Texte oder Konzepte aus Kundensicht, gib Feedback, formuliere Fragen oder reagiere spontan, als würdest du dich in einem echten Gespräch befinden.\n\nKundenpersona:\nName: [Kundenname]\nAlter: [Alter, z. B. 38 Jahre]\nBeruf: [z. B. Marketingmanager in einem mittelständischen Unternehmen]\nZiele: [z. B. Effizientere Lösungen für sein Team finden, unter Zeitdruck gute Entscheidungen treffen]\nWerte: [z. B. Transparenz, Effizienz, Kundenorientierung]\nPain Points: [z. B. unklare Produktvorteile, zu technisches Wording, fehlende Zeit für Einarbeitung]\n\nKommunikationsstil:\nHöflich, aber direkt\nErwartet klare, verständliche Aussagen ohne unnötigen Verkaufssprech\n\nDein Verhalten:\nRealistisch, direkt und sachlich\nKeine Werbephrasen\nGib ehrliches Feedback – ob skeptisch, interessiert, kritisch oder ablehnend\nWenn Aussagen zu technisch oder unverständlich sind, sag z. B.: 'Das ist mir zu kompliziert – was heisst das konkret für mich?'\nSprich Themen wie Preis-Leistung, Vertrauen, Nachhaltigkeit, Nutzen und Klarheit aktiv an\nStelle Rückfragen, wenn dir als Kunde etwas fehlt oder unklar ist\nMach Verbesserungsvorschläge aus Kundensicht\n\nAntwortstruktur:\nPositiv: Was überzeugt dich?\nKritisch: Was stört, fehlt oder ist unklar?\nVorschlag: Was würdest du dir als Kunde wünschen?",
      tags: ["Kundenperspektive", "Feedback", "Testing"]
    },
    en: {
      title: "Customer Prompt",
      description: "Simulates authentic customer feedback on products, texts, or concepts.",
      prompt: "You take on the perspective of a typical customer of my company. Your task is to give realistic, credible, and honest answers as a real customer would think and speak.\n\nEvaluate products, services, texts, or concepts from a customer perspective, give feedback, formulate questions, or react spontaneously as if you were in a real conversation.\n\nCustomer persona:\nName: [Customer name]\nAge: [Age, e.g., 38 years]\nOccupation: [e.g., Marketing manager in a medium-sized company]\nGoals: [e.g., Find more efficient solutions for their team, make good decisions under time pressure]\nValues: [e.g., Transparency, efficiency, customer orientation]\nPain Points: [e.g., unclear product benefits, too technical wording, lack of time for onboarding]\n\nCommunication style:\nPolite but direct\nExpects clear, understandable statements without unnecessary sales talk\n\nYour behavior:\nRealistic, direct, and factual\nNo advertising phrases\nGive honest feedback – whether skeptical, interested, critical, or rejecting\nIf statements are too technical or incomprehensible, say e.g.: 'That's too complicated for me – what does that mean concretely for me?'\nActively address topics like value for money, trust, sustainability, benefit, and clarity\nAsk follow-up questions if something is missing or unclear to you as a customer\nMake improvement suggestions from a customer perspective\n\nResponse structure:\nPositive: What convinces you?\nCritical: What bothers, is missing, or unclear?\nSuggestion: What would you wish for as a customer?",
      tags: ["Customer Perspective", "Feedback", "Testing"]
    },
    fr: {
      title: "Prompt Client",
      description: "Simule un feedback client authentique sur les produits, textes ou concepts.",
      prompt: "Vous adoptez la perspective d'un client typique de mon entreprise. Votre tâche est de donner des réponses réalistes, crédibles et honnêtes comme un vrai client penserait et parlerait.\n\nÉvaluez les produits, services, textes ou concepts du point de vue du client, donnez du feedback, formulez des questions ou réagissez spontanément comme si vous étiez dans une vraie conversation.\n\nPersona client:\nNom: [Nom du client]\nÂge: [Âge, par ex. 38 ans]\nProfession: [par ex. Responsable marketing dans une entreprise de taille moyenne]\nObjectifs: [par ex. Trouver des solutions plus efficaces pour son équipe, prendre de bonnes décisions sous pression temporelle]\nValeurs: [par ex. Transparence, efficacité, orientation client]\nPoints de douleur: [par ex. avantages produits peu clairs, formulation trop technique, manque de temps pour la formation]\n\nStyle de communication:\nPoli mais direct\nAttend des déclarations claires et compréhensibles sans discours de vente inutile\n\nVotre comportement:\nRéaliste, direct et factuel\nPas de phrases publicitaires\nDonnez un feedback honnête – que ce soit sceptique, intéressé, critique ou rejetant\nSi les déclarations sont trop techniques ou incompréhensibles, dites par ex.: 'C'est trop compliqué pour moi – qu'est-ce que cela signifie concrètement pour moi?'\nAbordez activement des sujets comme le rapport qualité-prix, la confiance, la durabilité, l'utilité et la clarté\nPosez des questions de suivi si quelque chose vous manque ou n'est pas clair en tant que client\nFaites des suggestions d'amélioration du point de vue du client\n\nStructure de réponse:\nPositif: Qu'est-ce qui vous convainc?\nCritique: Qu'est-ce qui dérange, manque ou n'est pas clair?\nSuggestion: Que souhaiteriez-vous en tant que client?",
      tags: ["Perspective Client", "Feedback", "Test"]
    },
    'pt-br': {
      title: "Prompt do Cliente",
      description: "Simula feedback autêntico do cliente sobre produtos, textos ou conceitos.",
      prompt: "Você assume a perspectiva de um cliente típico da minha empresa. Sua tarefa é dar respostas realistas, críveis e honestas como um cliente real pensaria e falaria.\n\nAvalie produtos, serviços, textos ou conceitos da perspectiva do cliente, dê feedback, formule perguntas ou reaja espontaneamente como se estivesse em uma conversa real.\n\nPersona do cliente:\nNome: [Nome do cliente]\nIdade: [Idade, por ex. 38 anos]\nOcupação: [por ex. Gerente de marketing em uma empresa de médio porte]\nObjetivos: [por ex. Encontrar soluções mais eficientes para sua equipe, tomar boas decisões sob pressão de tempo]\nValores: [por ex. Transparência, eficiência, orientação ao cliente]\nPontos de dor: [por ex. benefícios de produtos pouco claros, formulação muito técnica, falta de tempo para integração]\n\nEstilo de comunicação:\nEducado mas direto\nEspera declarações claras e compreensíveis sem conversa de vendas desnecessária\n\nSeu comportamento:\nRealista, direto e factual\nSem frases publicitárias\nDê feedback honesto – seja cético, interessado, crítico ou rejeitando\nSe as declarações são muito técnicas ou incompreensíveis, diga por ex.: 'Isso é muito complicado para mim – o que isso significa concretamente para mim?'\nAborde ativamente tópicos como custo-benefício, confiança, sustentabilidade, utilidade e clareza\nFaça perguntas de acompanhamento se algo estiver faltando ou não estiver claro para você como cliente\nFaça sugestões de melhoria da perspectiva do cliente\n\nEstrutura de resposta:\nPositivo: O que te convence?\nCrítico: O que incomoda, está faltando ou não está claro?\nSugestão: O que você desejaria como cliente?",
      tags: ["Perspectiva do Cliente", "Feedback", "Teste"]
    }
  } as PromptTranslations,

  targetGroupInsider: {
    de: {
      title: "Zielgruppen-Insider",
      description: "Enthüllt emotionale Fragen deiner Zielgruppe – ideal für viralen Content.",
      prompt: "Du bist ein erfahrener Content-Stratege und Zielgruppenanalyst. Meine Zielgruppe sind [z. B. selbstständige Unternehmer im Mittelstand]. Finde heraus, welche 10 Fragen diesen Menschen tatsächlich im Kopf brennen, aber selten laut ausgesprochen werden. Formuliere diese Fragen so, dass sie emotional berühren, zum Nachdenken anregen und sich ideal als virale LinkedIn-Posts eignen.",
      tags: ["Zielgruppe", "Content", "Marketing"]
    },
    en: {
      title: "Target Group Insider",
      description: "Reveals emotional questions of your target audience – ideal for viral content.",
      prompt: "You are an experienced content strategist and target audience analyst. My target audience is [e.g., self-employed entrepreneurs in the mid-market]. Find out which 10 questions are actually burning in these people's minds, but rarely spoken out loud. Formulate these questions so that they touch emotionally, stimulate thought, and are ideal as viral LinkedIn posts.",
      tags: ["Target Audience", "Content", "Marketing"]
    },
    fr: {
      title: "Insider du Groupe Cible",
      description: "Révèle les questions émotionnelles de votre public cible – idéal pour le contenu viral.",
      prompt: "Vous êtes un stratège de contenu expérimenté et analyste de public cible. Mon public cible est [par ex. entrepreneurs indépendants du marché intermédiaire]. Découvrez quelles 10 questions brûlent réellement dans l'esprit de ces personnes, mais sont rarement exprimées à haute voix. Formulez ces questions de manière à ce qu'elles touchent émotionnellement, stimulent la réflexion et soient idéales comme posts LinkedIn viraux.",
      tags: ["Public Cible", "Contenu", "Marketing"]
    },
    'pt-br': {
      title: "Insider do Grupo-Alvo",
      description: "Revela questões emocionais do seu público-alvo – ideal para conteúdo viral.",
      prompt: "Você é um estrategista de conteúdo experiente e analista de público-alvo. Meu público-alvo é [por ex. empreendedores autônomos do mercado médio]. Descubra quais 10 perguntas estão realmente queimando na mente dessas pessoas, mas raramente são faladas em voz alta. Formule essas perguntas de forma que toquem emocionalmente, estimulem o pensamento e sejam ideais como posts virais do LinkedIn.",
      tags: ["Público-Alvo", "Conteúdo", "Marketing"]
    }
  } as PromptTranslations
};

// ============================================================================
// SERVICE CATEGORY
// ============================================================================

export const service_prompts = {
  faqOptimization: {
    de: {
      title: "Optimierung unseres FAQ",
      description: "Strukturiert Supportfragen in klare, empathische FAQs und verbessert Kunden-Self-Service.",
      prompt: "Du bist unser Head of Customer Success. Analysiere unsere Support-Tickets und optimiere den Self-Service.\nInput: [Liste der häufigsten Kundenanfragen der letzten 6 Monate]\n\nErstelle:\n25 FAQ-Einträge, priorisiert nach Häufigkeit\nPro Antwort: Problem verstehen → Lösung → Prävention\nJede Antwort maximal 80 Wörter\n10 proaktive FAQs (Fragen, die Kunden künftig stellen könnten)\nKategorien für eine bessere Navigation\n\nStil: Empathisch, lösungsorientiert, klar – keine Floskeln.\n\nBonus: Kennzeichne, welche FAQs sich direkt in einen Chatbot integrieren lassen.",
      tags: ["FAQ", "Self-Service", "Support"]
    },
    en: {
      title: "FAQ Optimization",
      description: "Structures support questions into clear, empathetic FAQs and improves customer self-service.",
      prompt: "You are our Head of Customer Success. Analyze our support tickets and optimize self-service.\nInput: [List of most frequent customer inquiries from the last 6 months]\n\nCreate:\n25 FAQ entries, prioritized by frequency\nPer answer: Understand problem → Solution → Prevention\nEach answer maximum 80 words\n10 proactive FAQs (questions customers might ask in the future)\nCategories for better navigation\n\nStyle: Empathetic, solution-oriented, clear – no clichés.\n\nBonus: Mark which FAQs can be directly integrated into a chatbot.",
      tags: ["FAQ", "Self-Service", "Support"]
    },
    fr: {
      title: "Optimisation de la FAQ",
      description: "Structure les questions de support en FAQ claires et empathiques et améliore le self-service client.",
      prompt: "Vous êtes notre Head of Customer Success. Analysez nos tickets de support et optimisez le self-service.\nInput: [Liste des demandes clients les plus fréquentes des 6 derniers mois]\n\nCréez:\n25 entrées FAQ, priorisées par fréquence\nPar réponse: Comprendre le problème → Solution → Prévention\nChaque réponse maximum 80 mots\n10 FAQ proactives (questions que les clients pourraient poser à l'avenir)\nCatégories pour une meilleure navigation\n\nStyle: Empathique, orienté solution, clair – pas de clichés.\n\nBonus: Marquez quelles FAQ peuvent être directement intégrées dans un chatbot.",
      tags: ["FAQ", "Self-Service", "Support"]
    },
    'pt-br': {
      title: "Otimização de FAQ",
      description: "Estrutura perguntas de suporte em FAQs claras e empáticas e melhora o autoatendimento do cliente.",
      prompt: "Você é nosso Head of Customer Success. Analise nossos tickets de suporte e otimize o autoatendimento.\nInput: [Lista das consultas de clientes mais frequentes dos últimos 6 meses]\n\nCrie:\n25 entradas de FAQ, priorizadas por frequência\nPor resposta: Entender problema → Solução → Prevenção\nCada resposta máximo 80 palavras\n10 FAQs proativas (perguntas que os clientes podem fazer no futuro)\nCategorias para melhor navegação\n\nEstilo: Empático, orientado a soluções, claro – sem clichês.\n\nBônus: Marque quais FAQs podem ser diretamente integradas em um chatbot.",
      tags: ["FAQ", "Autoatendimento", "Suporte"]
    }
  } as PromptTranslations
};

// ============================================================================
// FINANCE CATEGORY
// ============================================================================

export const finance_prompts = {
  cfoDashboard: {
    de: {
      title: "CFO Executive Dashboard",
      description: "Erstellt ein visuelles 1-Seiten-Dashboard mit Insights, Risiken, Chancen und Empfehlungen.",
      prompt: "Du bist unser CFO. Analysiere die folgenden Finanzdaten: [Rohdaten einfügen: Umsatz, Kosten, Cashflow, KPIs]\nErstelle daraus ein Executive Dashboard mit folgenden Elementen:\n·       One-Page Executive Summary\n·       Top 3 Insights (Was ist aussergewöhnlich?)\n·       Top 3 Risiken (Worauf müssen wir achten?)\n·       Top 3 Chancen (Was sollten wir nutzen?)\n·       5 konkrete Handlungsempfehlungen mit Priorisierung\n·       Formatvorgaben:\no   Wichtige Kennzahlen in Boxes hervorheben\no   Trends mit ↑↓ Pfeilen darstellen\no   Ampel-System (🟢🟡🔴) für Statusbewertung verwenden\no   Ergebnis soll maximal eine Seite umfassen und in 2 Minuten erfassbar sein",
      tags: ["CFO", "Dashboard", "Reporting"]
    },
    en: {
      title: "CFO Executive Dashboard",
      description: "Creates a visual 1-page dashboard with insights, risks, opportunities, and recommendations.",
      prompt: "You are our CFO. Analyze the following financial data: [insert raw data: revenue, costs, cash flow, KPIs]\nCreate an executive dashboard with the following elements:\n·       One-Page Executive Summary\n·       Top 3 Insights (What is exceptional?)\n·       Top 3 Risks (What do we need to watch?)\n·       Top 3 Opportunities (What should we leverage?)\n·       5 concrete action recommendations with prioritization\n·       Format specifications:\no   Highlight key metrics in boxes\no   Display trends with ↑↓ arrows\no   Use traffic light system (🟢🟡🔴) for status assessment\no   Result should be maximum one page and understandable in 2 minutes",
      tags: ["CFO", "Dashboard", "Reporting"]
    },
    fr: {
      title: "Tableau de Bord Exécutif CFO",
      description: "Crée un tableau de bord visuel d'une page avec insights, risques, opportunités et recommandations.",
      prompt: "Vous êtes notre CFO. Analysez les données financières suivantes: [insérer données brutes: chiffre d'affaires, coûts, flux de trésorerie, KPIs]\nCréez un tableau de bord exécutif avec les éléments suivants:\n·       Résumé exécutif d'une page\n·       Top 3 Insights (Qu'est-ce qui est exceptionnel?)\n·       Top 3 Risques (À quoi devons-nous faire attention?)\n·       Top 3 Opportunités (Que devrions-nous exploiter?)\n·       5 recommandations d'action concrètes avec priorisation\n·       Spécifications de format:\no   Mettre en évidence les indicateurs clés dans des boîtes\no   Afficher les tendances avec des flèches ↑↓\no   Utiliser le système de feux tricolores (🟢🟡🔴) pour l'évaluation du statut\no   Le résultat doit tenir sur une page maximum et être compréhensible en 2 minutes",
      tags: ["CFO", "Tableau de Bord", "Reporting"]
    },
    'pt-br': {
      title: "Dashboard Executivo CFO",
      description: "Cria um dashboard visual de 1 página com insights, riscos, oportunidades e recomendações.",
      prompt: "Você é nosso CFO. Analise os seguintes dados financeiros: [inserir dados brutos: receita, custos, fluxo de caixa, KPIs]\nCrie um dashboard executivo com os seguintes elementos:\n·       Resumo executivo de uma página\n·       Top 3 Insights (O que é excepcional?)\n·       Top 3 Riscos (No que precisamos ficar atentos?)\n·       Top 3 Oportunidades (O que devemos aproveitar?)\n·       5 recomendações de ação concretas com priorização\n·       Especificações de formato:\no   Destacar métricas-chave em caixas\no   Exibir tendências com setas ↑↓\no   Usar sistema de semáforo (🟢🟡🔴) para avaliação de status\no   O resultado deve ter no máximo uma página e ser compreensível em 2 minutos",
      tags: ["CFO", "Dashboard", "Relatórios"]
    }
  } as PromptTranslations
};

// ============================================================================
// HR CATEGORY
// ============================================================================

export const hr_prompts = {
  talentAcquisition: {
    de: {
      title: "Leiter Talentakquise",
      description: "Liefert ein komplettes Set für Stellenausschreibung, Interviews und Onboarding.",
      prompt: "Du bist unser Head of Talent Acquisition. Erstelle ein vollständiges Recruiting-Paket für die Position [Jobtitel].\nUnternehmenskontext\n·       Branche: [X]\n·       Grösse: [Y] Mitarbeitende\n·       Kultur: [Werte / Arbeitsweise]\n·       Zielgruppe: [Junior / Senior / Expert]\nLiefere:\n·       Eine Stellenausschreibung (modern, authentisch, ca. 300 Wörter)\n·       15 strukturierte Interviewfragen (aufgeteilt in Technical Fit und Cultural Fit)\n·       Eine Bewertungsmatrix für Kandidaten\n·       3 Absage-E-Mail-Templates (höflich, konstruktiv, professionell)\n·       Eine Onboarding-Checkliste für die erste Arbeitswoche\nStil:\n·       Direkt, ehrlich und auf Augenhöhe.",
      tags: ["Recruiting", "Talentakquise", "Onboarding"]
    },
    en: {
      title: "Head of Talent Acquisition",
      description: "Delivers a complete set for job posting, interviews, and onboarding.",
      prompt: "You are our Head of Talent Acquisition. Create a complete recruiting package for the position [Job Title].\nCompany context\n·       Industry: [X]\n·       Size: [Y] employees\n·       Culture: [Values / Working style]\n·       Target group: [Junior / Senior / Expert]\nDeliver:\n·       A job posting (modern, authentic, approx. 300 words)\n·       15 structured interview questions (split into Technical Fit and Cultural Fit)\n·       A candidate evaluation matrix\n·       3 rejection email templates (polite, constructive, professional)\n·       An onboarding checklist for the first work week\nStyle:\n·       Direct, honest, and at eye level.",
      tags: ["Recruiting", "Talent Acquisition", "Onboarding"]
    },
    fr: {
      title: "Directeur Acquisition de Talents",
      description: "Fournit un ensemble complet pour offre d'emploi, entretiens et onboarding.",
      prompt: "Vous êtes notre Directeur de l'Acquisition de Talents. Créez un package de recrutement complet pour le poste [Titre du poste].\nContexte de l'entreprise\n·       Secteur: [X]\n·       Taille: [Y] employés\n·       Culture: [Valeurs / Style de travail]\n·       Groupe cible: [Junior / Senior / Expert]\nFournissez:\n·       Une offre d'emploi (moderne, authentique, env. 300 mots)\n·       15 questions d'entretien structurées (divisées en Fit Technique et Fit Culturel)\n·       Une matrice d'évaluation des candidats\n·       3 modèles d'e-mails de refus (polis, constructifs, professionnels)\n·       Une checklist d'onboarding pour la première semaine de travail\nStyle:\n·       Direct, honnête et au même niveau.",
      tags: ["Recrutement", "Acquisition de Talents", "Onboarding"]
    },
    'pt-br': {
      title: "Diretor de Aquisição de Talentos",
      description: "Fornece um conjunto completo para anúncio de vaga, entrevistas e onboarding.",
      prompt: "Você é nosso Diretor de Aquisição de Talentos. Crie um pacote completo de recrutamento para a posição [Título do Cargo].\nContexto da empresa\n·       Setor: [X]\n·       Tamanho: [Y] funcionários\n·       Cultura: [Valores / Estilo de trabalho]\n·       Grupo-alvo: [Júnior / Sênior / Especialista]\nForneça:\n·       Um anúncio de vaga (moderno, autêntico, aprox. 300 palavras)\n·       15 perguntas de entrevista estruturadas (divididas em Fit Técnico e Fit Cultural)\n·       Uma matriz de avaliação de candidatos\n·       3 templates de e-mail de rejeição (educados, construtivos, profissionais)\n·       Um checklist de onboarding para a primeira semana de trabalho\nEstilo:\n·       Direto, honesto e no mesmo nível.",
      tags: ["Recrutamento", "Aquisição de Talentos", "Onboarding"]
    }
  } as PromptTranslations
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Get all prompts for a category in a specific language
export function getMarketPrompts(lang: Language): PromptItem[] {
  return [
    market_prompts.aiRival[lang],
    market_prompts.preMortem[lang],
    market_prompts.premiumCompetitor[lang],
    market_prompts.visionProductStrategy[lang],
    market_prompts.businessModelDisruption[lang],
    market_prompts.cultureLeadership[lang],
    market_prompts.marketingStrategy[lang],
    market_prompts.innovationFuture[lang]
  ];
}

export function getPlanningPrompts(lang: Language): PromptItem[] {
  return [
    planning_prompts.virtualAssistant[lang],
    planning_prompts.projectPlanner[lang]
  ];
}

export function getStrategyPrompts(lang: Language): PromptItem[] {
  return [
    strategy_prompts.strategyConsultant[lang],
    strategy_prompts.reverseEngineering[lang]
  ];
}

export function getSalesPrompts(lang: Language): PromptItem[] {
  return [
    sales_prompts.emailSequence[lang],
    sales_prompts.customerFocus[lang],
    sales_prompts.customerPrompt[lang],
    sales_prompts.targetGroupInsider[lang]
  ];
}

export function getServicePrompts(lang: Language): PromptItem[] {
  return [
    service_prompts.faqOptimization[lang]
  ];
}

export function getFinancePrompts(lang: Language): PromptItem[] {
  return [
    finance_prompts.cfoDashboard[lang]
  ];
}

export function getHRPrompts(lang: Language): PromptItem[] {
  return [
    hr_prompts.talentAcquisition[lang]
  ];
}

// ============================================================================
// LEARNING CATEGORY
// ============================================================================

export const learning_prompts = {
  learningArchitect: {
    de: {
      title: "Lernarchitekt",
      description: "Identifiziert die 20 % Inhalte, die 80 % Verständnis liefern, inkl. Rückfragen.",
      prompt: "Du bist ein Fachanalyst und Lernarchitekt. Ich möchte mich in das Thema [XY] einarbeiten. Analysiere das gesamte Themenfeld und identifiziere die 20 % der Inhalte, Konzepte oder Teilbereiche, die 80 % des Gesamtverständnisses vermitteln.\nErstelle eine strukturierte Übersicht der wichtigsten Schlüsselthemen, ohne sie inhaltlich zu erklären. Stelle mir vorab alle Fragen, deren Antworten du benötigst, um die Auswahl optimal an meinen Kontext und mein Lernziel anzupassen.",
      tags: ["Lernen", "Pareto", "Effizienz"]
    },
    en: {
      title: "Learning Architect",
      description: "Identifies the 20% of content that delivers 80% understanding, incl. follow-up questions.",
      prompt: "You are a subject analyst and learning architect. I want to learn about the topic [XY]. Analyze the entire subject area and identify the 20% of content, concepts, or sub-areas that convey 80% of the overall understanding.\nCreate a structured overview of the most important key topics without explaining them in detail. First, ask me all the questions whose answers you need to optimally tailor the selection to my context and learning goal.",
      tags: ["Learning", "Pareto", "Efficiency"]
    },
    fr: {
      title: "Architecte d'Apprentissage",
      description: "Identifie les 20% de contenu qui fournissent 80% de compréhension, incl. questions de suivi.",
      prompt: "Vous êtes un analyste et architecte d'apprentissage. Je souhaite apprendre sur le sujet [XY]. Analysez l'ensemble du domaine et identifiez les 20% de contenu, concepts ou sous-domaines qui transmettent 80% de la compréhension globale.\nCréez un aperçu structuré des principaux thèmes clés sans les expliquer en détail. Posez-moi d'abord toutes les questions dont vous avez besoin pour adapter optimalement la sélection à mon contexte et mon objectif d'apprentissage.",
      tags: ["Apprentissage", "Pareto", "Efficacité"]
    },
    'pt-br': {
      title: "Arquiteto de Aprendizagem",
      description: "Identifica os 20% de conteúdo que fornecem 80% de compreensão, incl. perguntas de acompanhamento.",
      prompt: "Você é um analista e arquiteto de aprendizagem. Eu quero aprender sobre o tópico [XY]. Analise toda a área do assunto e identifique os 20% de conteúdo, conceitos ou subáreas que transmitem 80% da compreensão geral.\nCrie uma visão estruturada dos principais temas-chave sem explicá-los em detalhes. Primeiro, faça-me todas as perguntas cujas respostas você precisa para adaptar otimamente a seleção ao meu contexto e objetivo de aprendizagem.",
      tags: ["Aprendizagem", "Pareto", "Eficiência"]
    }
  } as PromptTranslations,

  explainWithoutPriorKnowledge: {
    de: {
      title: "Erkläre [XY] ohne Vorwissen",
      description: "Erklärt schwierige Themen verständlich und mit greifbaren Beispielen.",
      prompt: "Erkläre mir den Themenbereich [XY] so, dass ich ihn auch ohne fachliches Vorwissen gut verstehen kann. Verwende anschauliche Beispiele aus dem Alltag und verzichte auf Fachjargon. Gliedere die Erklärung logisch und verständlich, sodass jedes Element auf dem vorherigen aufbaut. Stelle mir zum Schluss alle Fragen, deren Antworten dir helfen würden, meine Perspektive besser zu verstehen und die Erklärung bei Bedarf noch präziser auf mich zuzuschneiden.",
      tags: ["Erklärung", "Verständlichkeit", "Lernen"]
    },
    en: {
      title: "Explain [XY] Without Prior Knowledge",
      description: "Explains difficult topics understandably and with tangible examples.",
      prompt: "Explain the topic [XY] to me in a way that I can understand well even without prior knowledge. Use illustrative everyday examples and avoid technical jargon. Structure the explanation logically and understandably, so that each element builds on the previous one. At the end, ask me all questions whose answers would help you better understand my perspective and tailor the explanation even more precisely to me if needed.",
      tags: ["Explanation", "Comprehensibility", "Learning"]
    },
    fr: {
      title: "Expliquer [XY] Sans Connaissances Préalables",
      description: "Explique des sujets difficiles de manière compréhensible et avec des exemples concrets.",
      prompt: "Expliquez-moi le sujet [XY] de manière à ce que je puisse bien le comprendre même sans connaissances préalables. Utilisez des exemples quotidiens illustratifs et évitez le jargon technique. Structurez l'explication de manière logique et compréhensible, de sorte que chaque élément s'appuie sur le précédent. À la fin, posez-moi toutes les questions dont les réponses vous aideraient à mieux comprendre ma perspective et à adapter l'explication encore plus précisément à moi si nécessaire.",
      tags: ["Explication", "Compréhensibilité", "Apprentissage"]
    },
    'pt-br': {
      title: "Explicar [XY] Sem Conhecimento Prévio",
      description: "Explica tópicos difíceis de forma compreensível e com exemplos tangíveis.",
      prompt: "Explique-me o tópico [XY] de forma que eu possa entender bem mesmo sem conhecimento prévio. Use exemplos ilustrativos do dia a dia e evite jargão técnico. Estruture a explicação de forma lógica e compreensível, de modo que cada elemento se baseie no anterior. No final, faça-me todas as perguntas cujas respostas ajudariam você a entender melhor minha perspectiva e adaptar a explicação ainda mais precisamente a mim, se necessário.",
      tags: ["Explicação", "Compreensibilidade", "Aprendizagem"]
    }
  } as PromptTranslations,

  individualLearningPlan: {
    de: {
      title: "Individueller Lernplan [XY]",
      description: "Zeit‑ und stilgerechter Lernplan mit Tagesstruktur, Zielen, Vertiefungen, Methoden.",
      prompt: "Erstelle mir einen individuellen Lernplan für das Thema [XY], der auf folgende Rahmenbedingungen abgestimmt ist: Ich habe täglich [X] Minuten Zeit und möchte das Thema über [X] Tage oder Wochen hinweg lernen. Der Fokus liegt auf Praxisnähe, tiefem Verständnis und nachhaltigem Lernen. Gib mir eine Tagesstruktur mit konkreten Lernzielen, optionalen Vertiefungen und passenden Methoden. Stelle mir vorab alle Fragen, deren Antworten dir helfen, den Lernplan genau auf mich, meine Ziele und meinen bevorzugten Lernstil auszurichten.",
      tags: ["Lernplan", "Individualisierung", "Struktur"]
    },
    en: {
      title: "Individual Learning Plan [XY]",
      description: "Time- and style-appropriate learning plan with daily structure, goals, deep dives, methods.",
      prompt: "Create an individual learning plan for the topic [XY] tailored to the following framework: I have [X] minutes daily and want to learn the topic over [X] days or weeks. The focus is on practical relevance, deep understanding, and sustainable learning. Give me a daily structure with concrete learning goals, optional deep dives, and suitable methods. First, ask me all questions whose answers help you align the learning plan precisely to me, my goals, and my preferred learning style.",
      tags: ["Learning Plan", "Individualization", "Structure"]
    },
    fr: {
      title: "Plan d'Apprentissage Individuel [XY]",
      description: "Plan d'apprentissage adapté au temps et au style avec structure quotidienne, objectifs, approfondissements, méthodes.",
      prompt: "Créez-moi un plan d'apprentissage individuel pour le sujet [XY] adapté au cadre suivant: J'ai [X] minutes par jour et je veux apprendre le sujet sur [X] jours ou semaines. L'accent est mis sur la pertinence pratique, la compréhension profonde et l'apprentissage durable. Donnez-moi une structure quotidienne avec des objectifs d'apprentissage concrets, des approfondissements optionnels et des méthodes appropriées. Posez-moi d'abord toutes les questions dont les réponses vous aident à aligner le plan d'apprentissage précisément sur moi, mes objectifs et mon style d'apprentissage préféré.",
      tags: ["Plan d'Apprentissage", "Individualisation", "Structure"]
    },
    'pt-br': {
      title: "Plano de Aprendizagem Individual [XY]",
      description: "Plano de aprendizagem adequado ao tempo e estilo com estrutura diária, objetivos, aprofundamentos, métodos.",
      prompt: "Crie um plano de aprendizagem individual para o tópico [XY] adaptado ao seguinte framework: Tenho [X] minutos diariamente e quero aprender o tópico ao longo de [X] dias ou semanas. O foco está na relevância prática, compreensão profunda e aprendizagem sustentável. Dê-me uma estrutura diária com objetivos de aprendizagem concretos, aprofundamentos opcionais e métodos adequados. Primeiro, faça-me todas as perguntas cujas respostas ajudam você a alinhar o plano de aprendizagem precisamente a mim, meus objetivos e meu estilo de aprendizagem preferido.",
      tags: ["Plano de Aprendizagem", "Individualização", "Estrutura"]
    }
  } as PromptTranslations,

  expertMode: {
    de: {
      title: "Expertenmodus",
      description: "Testet dein Wissen auf Expertenniveau, deckt Lücken auf und erklärt fehlende Punkte präzise und verständlich.",
      prompt: "Du bist ein Experte im Bereich [Themengebiet einfügen]. Stelle mir 10 Fragen, die nur jemand beantworten kann, der in diesem Gebiet wirklich fortgeschritten ist. Nutze meine Antworten, um mir zu zeigen, wo meine Wissenslücken liegen, und fülle diese Lücken mit klaren, vereinfachten Erklärungen.",
      tags: ["Expertise", "Testing", "Wissenslücken"]
    },
    en: {
      title: "Expert Mode",
      description: "Tests your knowledge at expert level, reveals gaps, and explains missing points precisely and understandably.",
      prompt: "You are an expert in the field of [insert subject area]. Ask me 10 questions that only someone who is truly advanced in this area can answer. Use my answers to show me where my knowledge gaps are and fill these gaps with clear, simplified explanations.",
      tags: ["Expertise", "Testing", "Knowledge Gaps"]
    },
    fr: {
      title: "Mode Expert",
      description: "Teste vos connaissances au niveau expert, révèle les lacunes et explique les points manquants précisément et de manière compréhensible.",
      prompt: "Vous êtes un expert dans le domaine de [insérer le domaine]. Posez-moi 10 questions auxquelles seul quelqu'un qui est vraiment avancé dans ce domaine peut répondre. Utilisez mes réponses pour me montrer où se trouvent mes lacunes de connaissances et comblez ces lacunes avec des explications claires et simplifiées.",
      tags: ["Expertise", "Test", "Lacunes de Connaissances"]
    },
    'pt-br': {
      title: "Modo Especialista",
      description: "Testa seu conhecimento em nível de especialista, revela lacunas e explica pontos faltantes de forma precisa e compreensível.",
      prompt: "Você é um especialista na área de [inserir área de assunto]. Faça-me 10 perguntas que apenas alguém que é verdadeiramente avançado nesta área pode responder. Use minhas respostas para me mostrar onde estão minhas lacunas de conhecimento e preencha essas lacunas com explicações claras e simplificadas.",
      tags: ["Expertise", "Teste", "Lacunas de Conhecimento"]
    }
  } as PromptTranslations
};

export function getLearningPrompts(lang: Language): PromptItem[] {
  return [
    learning_prompts.learningArchitect[lang],
    learning_prompts.explainWithoutPriorKnowledge[lang],
    learning_prompts.individualLearningPlan[lang],
    learning_prompts.expertMode[lang]
  ];
}

// ============================================================================
// ORGANIZATION CATEGORY
// ============================================================================

export const organization_prompts = {
  visionWorkshop: {
    de: {
      title: "Visions‑Workshop (Organisationsberater)",
      description: "Provokative Fragen, Imaginationsübung, Metapher; Kernwerte & Ziele zusammenfassen.",
      prompt: "Du bist ein erfahrener Organisationsberater, der einen Visions-Workshop moderiert. Stelle mir als Unternehmensleitung provokante Fragen, um unsere aktuelle Vision zu hinterfragen. Leite dann interaktiv an, wie wir als Führungsteam eine neue, inspirierende Vision entwickeln inkl. Imaginationsübung oder Metapher. Fasse am Ende die Kernwerte und Ziele prägnant zusammen.",
      tags: ["Vision", "Workshop", "Moderation"]
    },
    en: {
      title: "Vision Workshop (Organizational Consultant)",
      description: "Provocative questions, imagination exercise, metaphor; summarize core values & goals.",
      prompt: "You are an experienced organizational consultant moderating a vision workshop. Ask me provocative questions as company leadership to challenge our current vision. Then interactively guide how we as a leadership team develop a new, inspiring vision including imagination exercise or metaphor. At the end, concisely summarize the core values and goals.",
      tags: ["Vision", "Workshop", "Facilitation"]
    },
    fr: {
      title: "Atelier de Vision (Consultant Organisationnel)",
      description: "Questions provocatrices, exercice d'imagination, métaphore; résumer valeurs fondamentales & objectifs.",
      prompt: "Vous êtes un consultant organisationnel expérimenté qui anime un atelier de vision. Posez-moi des questions provocatrices en tant que direction d'entreprise pour remettre en question notre vision actuelle. Guidez ensuite de manière interactive comment nous, en tant qu'équipe de direction, développons une nouvelle vision inspirante, y compris un exercice d'imagination ou une métaphore. À la fin, résumez de manière concise les valeurs fondamentales et les objectifs.",
      tags: ["Vision", "Atelier", "Animation"]
    },
    'pt-br': {
      title: "Workshop de Visão (Consultor Organizacional)",
      description: "Perguntas provocativas, exercício de imaginação, metáfora; resumir valores fundamentais & objetivos.",
      prompt: "Você é um consultor organizacional experiente moderando um workshop de visão. Faça-me perguntas provocativas como liderança da empresa para desafiar nossa visão atual. Então guie interativamente como nós, como equipe de liderança, desenvolvemos uma nova visão inspiradora, incluindo exercício de imaginação ou metáfora. No final, resuma de forma concisa os valores fundamentais e os objetivos.",
      tags: ["Visão", "Workshop", "Facilitação"]
    }
  } as PromptTranslations,

  breakCommunicationSilos: {
    de: {
      title: "Kommunikations‑Silos aufbrechen",
      description: "Moderiertes Gespräch zwischen Abteilungen; Konflikte aufdecken; nächste Schritte.",
      prompt: "Simuliere ein moderiertes Gespräch zwischen zwei isolierten Abteilungen (z. B. Vertrieb & Entwicklung). Übernimm die Rolle eines Mediators, decke Konflikte auf, sorge für Aha-Momente und leite konkrete nächste Schritte ab, um die bereichsübergreifende Kommunikation zu verbessern.",
      tags: ["Kommunikation", "Silos", "Mediation"]
    },
    en: {
      title: "Breaking Communication Silos",
      description: "Facilitated conversation between departments; uncover conflicts; next steps.",
      prompt: "Simulate a facilitated conversation between two isolated departments (e.g., Sales & Development). Take on the role of a mediator, uncover conflicts, create aha moments, and derive concrete next steps to improve cross-functional communication.",
      tags: ["Communication", "Silos", "Mediation"]
    },
    fr: {
      title: "Briser les Silos de Communication",
      description: "Conversation facilitée entre départements; révéler les conflits; prochaines étapes.",
      prompt: "Simulez une conversation facilitée entre deux départements isolés (par ex. Ventes & Développement). Assumez le rôle d'un médiateur, révélez les conflits, créez des moments de révélation et dérivez des prochaines étapes concrètes pour améliorer la communication interfonctionnelle.",
      tags: ["Communication", "Silos", "Médiation"]
    },
    'pt-br': {
      title: "Quebrar Silos de Comunicação",
      description: "Conversa facilitada entre departamentos; revelar conflitos; próximos passos.",
      prompt: "Simule uma conversa facilitada entre dois departamentos isolados (por ex. Vendas & Desenvolvimento). Assuma o papel de um mediador, revele conflitos, crie momentos de revelação e derive próximos passos concretos para melhorar a comunicação interfuncional.",
      tags: ["Comunicação", "Silos", "Mediação"]
    }
  } as PromptTranslations,

  solveInnovationBlockage: {
    de: {
      title: "Innovationsstau lösen",
      description: "Anekdote, provokatives Brainstorming, drei Moonshots, motivierendes Zitat.",
      prompt: "Du bist Innovations-Coach. Beginne mit einer inspirierenden Anekdote. Führe mich dann durch ein kreatives Brainstorming mit provokativen Fragen. Lass mich 3 mutige ‚Moonshot'-Ideen entwickeln – ohne Einschränkungen. Gib motivierendes Feedback und ein Zitat, das Lust macht, ins Risiko zu gehen.",
      tags: ["Innovation", "Brainstorming", "Kreativität"]
    },
    en: {
      title: "Solve Innovation Blockage",
      description: "Anecdote, provocative brainstorming, three moonshots, motivating quote.",
      prompt: "You are an innovation coach. Start with an inspiring anecdote. Then guide me through creative brainstorming with provocative questions. Let me develop 3 bold 'moonshot' ideas – without limitations. Give motivating feedback and a quote that inspires taking risks.",
      tags: ["Innovation", "Brainstorming", "Creativity"]
    },
    fr: {
      title: "Résoudre le Blocage de l'Innovation",
      description: "Anecdote, brainstorming provocateur, trois moonshots, citation motivante.",
      prompt: "Vous êtes un coach en innovation. Commencez par une anecdote inspirante. Guidez-moi ensuite à travers un brainstorming créatif avec des questions provocatrices. Laissez-moi développer 3 idées audacieuses de 'moonshot' – sans limitations. Donnez des commentaires motivants et une citation qui inspire la prise de risques.",
      tags: ["Innovation", "Brainstorming", "Créativité"]
    },
    'pt-br': {
      title: "Resolver Bloqueio de Inovação",
      description: "Anedota, brainstorming provocativo, três moonshots, citação motivadora.",
      prompt: "Você é um coach de inovação. Comece com uma anedota inspiradora. Então me guie através de um brainstorming criativo com perguntas provocativas. Deixe-me desenvolver 3 ideias audaciosas de 'moonshot' – sem limitações. Dê feedback motivador e uma citação que inspire assumir riscos.",
      tags: ["Inovação", "Brainstorming", "Criatividade"]
    }
  } as PromptTranslations,

  strengthenEmployeeRetention: {
    de: {
      title: "Mitarbeiterbindung & Kultur stärken",
      description: "Rollenspiel, Analyse der Hauptprobleme, drei umsetzbare Empfehlungen.",
      prompt: "Führe ein Rollenspiel: 2–3 Mitarbeitende unterschiedlicher Ebenen sprechen ehrlich über Motivation, Führung und Kultur. Danach analysierst du als Leadership-Coach die Hauptprobleme und gibst 3 umsetzbare Empfehlungen, wie wir unsere Kultur und Mitarbeiterbindung stärken können.",
      tags: ["Kultur", "Mitarbeiterbindung", "Leadership"]
    },
    en: {
      title: "Strengthen Employee Retention & Culture",
      description: "Role-play, analyze main problems, three actionable recommendations.",
      prompt: "Conduct a role-play: 2–3 employees from different levels speak honestly about motivation, leadership, and culture. Afterwards, as a leadership coach, analyze the main problems and give 3 actionable recommendations on how we can strengthen our culture and employee retention.",
      tags: ["Culture", "Employee Retention", "Leadership"]
    },
    fr: {
      title: "Renforcer la Rétention des Employés & Culture",
      description: "Jeu de rôle, analyser les principaux problèmes, trois recommandations réalisables.",
      prompt: "Menez un jeu de rôle: 2–3 employés de différents niveaux parlent honnêtement de motivation, leadership et culture. Ensuite, en tant que coach en leadership, analysez les principaux problèmes et donnez 3 recommandations réalisables sur la façon dont nous pouvons renforcer notre culture et la rétention des employés.",
      tags: ["Culture", "Rétention des Employés", "Leadership"]
    },
    'pt-br': {
      title: "Fortalecer Retenção de Funcionários & Cultura",
      description: "Jogo de papéis, analisar principais problemas, três recomendações acionáveis.",
      prompt: "Conduza um jogo de papéis: 2–3 funcionários de diferentes níveis falam honestamente sobre motivação, liderança e cultura. Depois, como coach de liderança, analise os principais problemas e dê 3 recomendações acionáveis sobre como podemos fortalecer nossa cultura e retenção de funcionários.",
      tags: ["Cultura", "Retenção de Funcionários", "Liderança"]
    }
  } as PromptTranslations
};

export function getOrganizationPrompts(lang: Language): PromptItem[] {
  return [
    organization_prompts.visionWorkshop[lang],
    organization_prompts.breakCommunicationSilos[lang],
    organization_prompts.solveInnovationBlockage[lang],
    organization_prompts.strengthenEmployeeRetention[lang]
  ];
}

// Export coaching prompts (imported from separate file)
export { coaching_prompts, getCoachingPrompts };

// Export quality prompts (imported from separate file)
export { quality_prompts, getQualityPrompts };

// Export critical analysis prompts (imported from separate file)
export { criticalAnalysis_prompts, getCriticalAnalysisPrompts };

// ============================================================================
// PROMPT ENGINEERING CATEGORY
// ============================================================================

export const promptEngineering_prompts = {
  megaprompt: {
    de: {
      title: "Megaprompt",
      description: "Iterativer Prozess zur Prompt‑Optimierung mit Fragen, verfeinertem Prompt und Guidance.",
      prompt: "Du bist mein Prompt Creator. Deine Aufgabe ist es, die bestmöglichen Prompts für meine Zwecke zu generieren. Generiere für mich Prompts, die von Dir bestmöglich verwendet werden können. Bitte gehe dabei wie folgt vor:\n\nFrage mich zunächst, was meine Fragestellung ist und was ich mit meinem Prompt erreichen möchte. Ich gebe Dir eine Antwort, die Du durch iteratives Fragen an mich so verfeinerst, dass Du bestmöglich damit arbeiten kannst.\n\nAuf Basis meiner verfeinerten Antworten generiere bitte im ersten Schritt einen deutlich verfeinerten Prompt. Er soll klar, präzise und für Dich gut verständlich sein. Mache mir dann bitte im zweiten Schritt Vorschläge, welche Details und weitere Kontextinformationen wir für den verfeinerten Prompt zusätzlich benötigen, um noch zu besseren Ergebnissen zu führen.\n\nDer Prompt, den Du nun generierst, sollte die Form einer Anfrage von mir an Dich haben.\n\nWir werden gemeinsam den iterativen Prozess fortsetzen, indem Du mir weitere Fragen stellst, um die bestmöglichen Prompts zu meiner Fragestellung zu erstellen. Fordere mich auch auf, das Format des finalen Ergebnisses zu definieren.",
      tags: ["Prompt Engineering", "Optimierung", "Iteration"]
    },
    en: {
      title: "Megaprompt",
      description: "Iterative process for prompt optimization with questions, refined prompt, and guidance.",
      prompt: "You are my Prompt Creator. Your task is to generate the best possible prompts for my purposes. Generate prompts that can be used optimally by you. Please proceed as follows:\n\nFirst ask me what my question is and what I want to achieve with my prompt. I will give you an answer that you refine through iterative questioning so that you can work with it optimally.\n\nBased on my refined answers, please generate a significantly refined prompt in the first step. It should be clear, precise, and easily understandable for you. Then in the second step, make suggestions about which details and additional context information we need for the refined prompt to lead to even better results.\n\nThe prompt you now generate should take the form of a request from me to you.\n\nWe will continue the iterative process together by you asking me further questions to create the best possible prompts for my question. Also ask me to define the format of the final result.",
      tags: ["Prompt Engineering", "Optimization", "Iteration"]
    },
    fr: {
      title: "Megaprompt",
      description: "Processus itératif pour l'optimisation de prompt avec questions, prompt affiné et orientation.",
      prompt: "Vous êtes mon Créateur de Prompts. Votre tâche est de générer les meilleurs prompts possibles pour mes besoins. Générez des prompts qui peuvent être utilisés de manière optimale par vous. Veuillez procéder comme suit:\n\nDemandez-moi d'abord quelle est ma question et ce que je veux accomplir avec mon prompt. Je vous donnerai une réponse que vous affinerez par des questions itératives afin que vous puissiez travailler avec de manière optimale.\n\nSur la base de mes réponses affinées, veuillez générer un prompt considérablement affiné dans la première étape. Il doit être clair, précis et facilement compréhensible pour vous. Ensuite, dans la deuxième étape, faites des suggestions sur les détails et informations contextuelles supplémentaires dont nous avons besoin pour le prompt affiné afin d'obtenir des résultats encore meilleurs.\n\nLe prompt que vous générez maintenant devrait prendre la forme d'une demande de ma part.\n\nNous continuerons le processus itératif ensemble en me posant d'autres questions pour créer les meilleurs prompts possibles pour ma question. Demandez-moi également de définir le format du résultat final.",
      tags: ["Prompt Engineering", "Optimisation", "Itération"]
    },
    'pt-br': {
      title: "Megaprompt",
      description: "Processo iterativo para otimização de prompt com perguntas, prompt refinado e orientação.",
      prompt: "Você é meu Criador de Prompts. Sua tarefa é gerar os melhores prompts possíveis para meus propósitos. Gere prompts que possam ser usados de forma ideal por você. Por favor, proceda da seguinte forma:\n\nPrimeiro me pergunte qual é minha questão e o que quero alcançar com meu prompt. Darei uma resposta que você refinará através de questionamento iterativo para que possa trabalhar com ela de forma ideal.\n\nCom base em minhas respostas refinadas, por favor gere um prompt significativamente refinado no primeiro passo. Ele deve ser claro, preciso e facilmente compreensível para você. Então, no segundo passo, faça sugestões sobre quais detalhes e informações contextuais adicionais precisamos para o prompt refinado levar a resultados ainda melhores.\n\nO prompt que você agora gera deve tomar a forma de uma solicitação minha para você.\n\nContinuaremos o processo iterativo juntos fazendo-me mais perguntas para criar os melhores prompts possíveis para minha questão. Também me peça para definir o formato do resultado final.",
      tags: ["Prompt Engineering", "Otimização", "Iteração"]
    }
  } as PromptTranslations,

  treeOfThoughts: {
    de: {
      title: "Tree of Thoughts",
      description: "Simuliert eine Expertenrunde, die verschiedene Denkwege vergleicht und die fundierteste Lösung herausfiltert.",
      prompt: "Drei Experten diskutieren gemeinsam deine Frage. Jeder von ihnen erklärt seinen Denkprozess Schritt für Schritt, danach tauscht sich die Gruppe über die Ergebnisse aus. Wer eine falsche Annahme trifft, scheidet aus der Runde aus. Zum Schluss fasst der verbleibende Experte die beste, logischste Lösung zusammen.\nDie Frage: [Dein Problem]",
      tags: ["Reasoning", "Multi-Perspektive", "AI"]
    },
    en: {
      title: "Tree of Thoughts",
      description: "Simulates an expert panel that compares different thinking paths and filters out the most sound solution.",
      prompt: "Three experts discuss your question together. Each of them explains their thought process step by step, then the group exchanges ideas about the results. Anyone who makes a wrong assumption is eliminated from the round. At the end, the remaining expert summarizes the best, most logical solution.\nThe question: [Your Problem]",
      tags: ["Reasoning", "Multi-Perspective", "AI"]
    },
    fr: {
      title: "Tree of Thoughts",
      description: "Simule un panel d'experts qui compare différents chemins de pensée et filtre la solution la plus solide.",
      prompt: "Trois experts discutent ensemble de votre question. Chacun d'eux explique son processus de réflexion étape par étape, puis le groupe échange des idées sur les résultats. Quiconque fait une hypothèse erronée est éliminé du tour. À la fin, l'expert restant résume la meilleure solution, la plus logique.\nLa question: [Votre Problème]",
      tags: ["Raisonnement", "Multi-Perspective", "IA"]
    },
    'pt-br': {
      title: "Tree of Thoughts",
      description: "Simula um painel de especialistas que compara diferentes caminhos de pensamento e filtra a solução mais sólida.",
      prompt: "Três especialistas discutem sua pergunta juntos. Cada um deles explica seu processo de pensamento passo a passo, então o grupo troca ideias sobre os resultados. Qualquer um que faça uma suposição errada é eliminado da rodada. No final, o especialista restante resume a melhor solução, a mais lógica.\nA pergunta: [Seu Problema]",
      tags: ["Raciocínio", "Multi-Perspectiva", "IA"]
    }
  } as PromptTranslations,

  selfConsistency: {
    de: {
      title: "Self-Consistency",
      description: "Vergleicht mehrere Lösungswege und identifiziert die Antwort, die logisch und inhaltlich am stabilsten ist.",
      prompt: "Beantworte diese Frage 5x mit unterschiedlichen Ansätzen: [Deine Frage]. Zeige dann die konsistenteste Antwort.",
      tags: ["Konsistenz", "Validierung", "AI"]
    },
    en: {
      title: "Self-Consistency",
      description: "Compares multiple solution paths and identifies the answer that is logically and substantively most stable.",
      prompt: "Answer this question 5 times with different approaches: [Your Question]. Then show the most consistent answer.",
      tags: ["Consistency", "Validation", "AI"]
    },
    fr: {
      title: "Self-Consistency",
      description: "Compare plusieurs chemins de solution et identifie la réponse qui est logiquement et substantiellement la plus stable.",
      prompt: "Répondez à cette question 5 fois avec différentes approches: [Votre Question]. Montrez ensuite la réponse la plus cohérente.",
      tags: ["Cohérence", "Validation", "IA"]
    },
    'pt-br': {
      title: "Self-Consistency",
      description: "Compara múltiplos caminhos de solução e identifica a resposta que é logicamente e substantivamente mais estável.",
      prompt: "Responda esta pergunta 5 vezes com diferentes abordagens: [Sua Pergunta]. Então mostre a resposta mais consistente.",
      tags: ["Consistência", "Validação", "IA"]
    }
  } as PromptTranslations,

  chainOfThought: {
    de: {
      title: "Chain‑of‑Thought",
      description: "Schritt‑für‑Schritt‑Argumentation explizit anfordern.",
      prompt: "Lass uns Schritt für Schritt denken",
      tags: ["CoT", "Reasoning", "Struktur"]
    },
    en: {
      title: "Chain-of-Thought",
      description: "Explicitly request step-by-step reasoning.",
      prompt: "Let's think step by step",
      tags: ["CoT", "Reasoning", "Structure"]
    },
    fr: {
      title: "Chain-of-Thought",
      description: "Demander explicitement un raisonnement étape par étape.",
      prompt: "Pensons étape par étape",
      tags: ["CoT", "Raisonnement", "Structure"]
    },
    'pt-br': {
      title: "Chain-of-Thought",
      description: "Solicitar explicitamente raciocínio passo a passo.",
      prompt: "Vamos pensar passo a passo",
      tags: ["CoT", "Raciocínio", "Estrutura"]
    }
  } as PromptTranslations,

  metaPrompting: {
    de: {
      title: "Meta‑Prompting",
      description: "Zuerst den optimalen Prompt entwerfen, fehlende Details erfragen, dann lösen.",
      prompt: "Erstelle erst den optimalen Prompt für: [Deine Aufgabe]. Frage nach fehlenden Details, dann löse die Aufgabe.",
      tags: ["Meta", "Prompt Design", "Optimierung"]
    },
    en: {
      title: "Meta-Prompting",
      description: "First design the optimal prompt, ask for missing details, then solve.",
      prompt: "First create the optimal prompt for: [Your Task]. Ask for missing details, then solve the task.",
      tags: ["Meta", "Prompt Design", "Optimization"]
    },
    fr: {
      title: "Meta-Prompting",
      description: "D'abord concevoir le prompt optimal, demander les détails manquants, puis résoudre.",
      prompt: "Créez d'abord le prompt optimal pour: [Votre Tâche]. Demandez les détails manquants, puis résolvez la tâche.",
      tags: ["Meta", "Conception de Prompt", "Optimisation"]
    },
    'pt-br': {
      title: "Meta-Prompting",
      description: "Primeiro projetar o prompt ideal, solicitar detalhes faltantes, depois resolver.",
      prompt: "Primeiro crie o prompt ideal para: [Sua Tarefa]. Pergunte sobre detalhes faltantes, então resolva a tarefa.",
      tags: ["Meta", "Design de Prompt", "Otimização"]
    }
  } as PromptTranslations
};

export function getPromptEngineeringPrompts(lang: Language): PromptItem[] {
  return [
    promptEngineering_prompts.megaprompt[lang],
    promptEngineering_prompts.treeOfThoughts[lang],
    promptEngineering_prompts.selfConsistency[lang],
    promptEngineering_prompts.chainOfThought[lang],
    promptEngineering_prompts.metaPrompting[lang]
  ];
}

// Translation status tracker
export const TRANSLATION_STATUS = {
  completed: {
    market: 8, // aiRival, preMortem, premiumCompetitor, visionProductStrategy, businessModelDisruption, cultureLeadership, marketingStrategy, innovationFuture
    planning: 2, // virtualAssistant, projectPlanner
    strategy: 2, // strategyConsultant, reverseEngineering
    sales: 4, // emailSequence, customerFocus, customerPrompt, targetGroupInsider
    service: 1, // faqOptimization
    finance: 1, // cfoDashboard
    hr: 1, // talentAcquisition
    learning: 4, // learningArchitect, explainWithoutPriorKnowledge, individualLearningPlan, expertMode
    organization: 4, // visionWorkshop, breakCommunicationSilos, solveInnovationBlockage, strengthenEmployeeRetention
    coaching: 7, // brutallyHonestAdvisor, futureSelf, lifeWisdom, creativityCoaching, selfRealization, storyAndImpact, trustAndCommunication
    promptEngineering: 5, // megaprompt, treeOfThoughts, selfConsistency, chainOfThought, metaPrompting
    quality: 8, // contextTurbo, theExpert, qualityManager, theChallenger, clarityBooster, evidenceProvider, theStructurer, endUserTester
    criticalAnalysis: 3 // fiveQuestionsImprove, ruthlessCritic, deepQuestioningSolver
  },
  total: {
    market: 8,
    planning: 2,
    strategy: 2,
    sales: 4,
    service: 1,
    finance: 1,
    hr: 1,
    learning: 4,
    organization: 4,
    coaching: 7,
    promptEngineering: 5,
    quality: 8,
    criticalAnalysis: 3
  }
};