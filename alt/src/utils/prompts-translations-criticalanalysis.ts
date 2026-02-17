// Critical Analysis category translations - imported by prompts-translations.ts
import type { Language } from './i18n';

// Re-use type definitions
export interface PromptItem {
  title: string;
  description: string;
  prompt: string;
  tags: string[];
}

export type PromptTranslations = {
  de: PromptItem;
  en: PromptItem;
  fr: PromptItem;
  'pt-br': PromptItem;
};

export const criticalAnalysis_prompts = {
  fiveQuestionsImprove: {
    de: {
      title: "Stelle mir 5 Fragen, die das Ergebnis verbessern",
      description: "Kurze Vorfrage‑Schicht vor Antwort.",
      prompt: "Stelle mir 5 Fragen, die das Ergebnis von dir verbessern würden, bevor du antwortest.",
      tags: ["Fragen", "Qualität", "Kontext"]
    },
    en: {
      title: "Ask Me 5 Questions to Improve the Result",
      description: "Brief pre-question layer before answering.",
      prompt: "Ask me 5 questions that would improve your result before you answer.",
      tags: ["Questions", "Quality", "Context"]
    },
    fr: {
      title: "Posez-moi 5 Questions pour Améliorer le Résultat",
      description: "Brève couche de pré-questions avant de répondre.",
      prompt: "Posez-moi 5 questions qui amélioreraient votre résultat avant de répondre.",
      tags: ["Questions", "Qualité", "Contexte"]
    },
    'pt-br': {
      title: "Faça-me 5 Perguntas para Melhorar o Resultado",
      description: "Breve camada de pré-perguntas antes de responder.",
      prompt: "Faça-me 5 perguntas que melhorariam seu resultado antes de responder.",
      tags: ["Perguntas", "Qualidade", "Contexto"]
    }
  } as PromptTranslations,

  ruthlessCritic: {
    de: {
      title: "Agiere wie ein Kritiker – Schonungslose Analyse",
      description: "Strenge Kritik zur Qualitätssteigerung.",
      prompt: "Agiere wie ein Kritiker. Sei schonungslos. Analysiere den Text und sage mir wo er noch besser sein könnte.",
      tags: ["Kritik", "Analyse", "Verbesserung"]
    },
    en: {
      title: "Act Like a Critic – Ruthless Analysis",
      description: "Strict criticism for quality improvement.",
      prompt: "Act like a critic. Be ruthless. Analyze the text and tell me where it could be even better.",
      tags: ["Critique", "Analysis", "Improvement"]
    },
    fr: {
      title: "Agissez comme un Critique – Analyse Impitoyable",
      description: "Critique stricte pour l'amélioration de la qualité.",
      prompt: "Agissez comme un critique. Soyez impitoyable. Analysez le texte et dites-moi où il pourrait être encore meilleur.",
      tags: ["Critique", "Analyse", "Amélioration"]
    },
    'pt-br': {
      title: "Aja como um Crítico – Análise Implacável",
      description: "Crítica rigorosa para melhoria da qualidade.",
      prompt: "Aja como um crítico. Seja implacável. Analise o texto e me diga onde ele poderia ser ainda melhor.",
      tags: ["Crítica", "Análise", "Melhoria"]
    }
  } as PromptTranslations,

  deepQuestioningSolver: {
    de: {
      title: "Löse mein Problem – erst 10/20 Fragen",
      description: "Tiefe Kontextklärung via Frageblock vor Lösung.",
      prompt: "Löse mir nachfolgendes Problem. Stelle mir 10 / 20 Fragen dazu, damit du besser verstehst um was es geht.",
      tags: ["Problem Solving", "Fragen", "Klärung"]
    },
    en: {
      title: "Solve My Problem – First 10/20 Questions",
      description: "Deep context clarification via question block before solution.",
      prompt: "Solve the following problem for me. Ask me 10 / 20 questions about it so you better understand what it's about.",
      tags: ["Problem Solving", "Questions", "Clarification"]
    },
    fr: {
      title: "Résolvez Mon Problème – D'abord 10/20 Questions",
      description: "Clarification approfondie du contexte via bloc de questions avant la solution.",
      prompt: "Résolvez le problème suivant pour moi. Posez-moi 10 / 20 questions à ce sujet afin de mieux comprendre de quoi il s'agit.",
      tags: ["Résolution de Problèmes", "Questions", "Clarification"]
    },
    'pt-br': {
      title: "Resolva Meu Problema – Primeiro 10/20 Perguntas",
      description: "Esclarecimento profundo do contexto via bloco de perguntas antes da solução.",
      prompt: "Resolva o seguinte problema para mim. Faça-me 10 / 20 perguntas sobre isso para entender melhor do que se trata.",
      tags: ["Resolução de Problemas", "Perguntas", "Esclarecimento"]
    }
  } as PromptTranslations
};

export function getCriticalAnalysisPrompts(lang: Language): PromptItem[] {
  return [
    criticalAnalysis_prompts.fiveQuestionsImprove[lang],
    criticalAnalysis_prompts.ruthlessCritic[lang],
    criticalAnalysis_prompts.deepQuestioningSolver[lang]
  ];
}
