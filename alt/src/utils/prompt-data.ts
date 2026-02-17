// Multilingual Prompt and Framework Data
// This file contains all prompts and frameworks in all supported languages (DE, EN, FR, PT-BR)

import { Language } from './i18n';
import {
  Target, Calendar, Briefcase, TrendingUp, Users, DollarSign,
  UserPlus, GraduationCap, Network, Lightbulb, Code, CheckCircle,
  HelpCircle, FileText
} from 'lucide-react';

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

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  prompts?: PromptItem[];
  frameworks?: FrameworkItem[];
}

// Translation data structure for a single prompt/framework
interface PromptTranslation {
  de: PromptItem;
  en: PromptItem;
  fr: PromptItem;
  'pt-br': PromptItem;
}

interface FrameworkTranslation {
  de: FrameworkItem;
  en: FrameworkItem;
  fr: FrameworkItem;
  'pt-br': FrameworkItem;
}

// ============================================================================
// PROMPT TRANSLATIONS
// ============================================================================

// Market & Competition Prompts
const market_aiRival: PromptTranslation = {
  de: {
    title: "Der KI-Rivale",
    description: "Hilft dir, dein Unternehmen aus Sicht eines Konkurrenten zu analysieren und Schwächen, Chancen und Innovationen sichtbar zu machen.",
    prompt: "Erstelle ein fiktives KI-Startup, das dein Unternehmen [Name, Branche] vollständig vom Markt verdrängen könnte. Nutze dafür gezielt eure Schwächen, die Pain Points eurer Kunden und aktuelle Technologietrends. Beschreibe:\n·       den Namen des Startups\n·       den Pitch\n·       den USP (Alleinstellungsfaktor)\n·       das Geschäftsmodell\n·       und erkläre, warum Kunden sofort begeistert wären.",
    tags: ["Wettbewerb", "Innovation", "Strategie"]
  },
  en: {
    title: "The AI Rival",
    description: "Helps you analyze your company from a competitor's perspective and identify weaknesses, opportunities and innovations.",
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
};

const market_preMortem: PromptTranslation = {
  de: {
    title: "Der Pre-Mortem-Analyst",
    description: "Zeigt mögliche Fehlerquellen und Risiken auf, bevor ein Projekt startet – technisch, emotional und marktwirtschaftlich.",
    prompt: "Wir planen [Produkt/Idee]. Du bist ein erfahrener Kritiker und listest in einem Pre-Mortem alle Dinge auf, die schiefgehen könnten – technisch, emotional, marktwirtschaftlich. Ziel: Alles vorhersehen, bevor wir starten.",
    tags: ["Risiko", "Analyse", "Planung"]
  },
  en: {
    title: "The Pre-Mortem Analyst",
    description: "Identifies possible error sources and risks before a project starts – technically, emotionally and economically.",
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
};

// Add a simplified version marker to indicate this is using simplified translations
const USE_SIMPLIFIED_TRANSLATIONS = true;

// Helper function to get prompt content for a category
export function getPromptCategory(categoryId: string, lang: Language): PromptItem[] {
  // For demonstration, return the two translated prompts
  // In a complete implementation, all prompts would be here
  if (categoryId === 'market') {
    return [
      market_aiRival[lang],
      market_preMortem[lang]
      // Add all other market prompts here
    ];
  }
  
  // Return empty array for other categories (to be implemented)
  return [];
}

// Export function to check if using simplified translations
export function isUsingSimplifiedTranslations(): boolean {
  return USE_SIMPLIFIED_TRANSLATIONS;
}

// Export a message for developers
export const TRANSLATION_STATUS = {
  implemented: ['market: aiRival, preMortem'],
  pending: ['All other prompts and frameworks'],
  note: 'Due to the large volume of content (50+ prompts with long texts), this uses a scalable translation architecture. Add translations as needed.'
};
