// Expression category frameworks translations
import type { Language } from './i18n';

// Framework item type
export interface FrameworkItem {
  title: string;
  description: string;
  structure: string;
  tags: string[];
}

export type FrameworkTranslations = {
  de: FrameworkItem;
  en: FrameworkItem;
  fr: FrameworkItem;
  'pt-br': FrameworkItem;
};

export const expression_frameworks = {
  flow: {
    de: {
      title: "F-L-O-W",
      description: "Ein Ausdrucks- und Kommunikationsframework, das hilft, zielgerichtet Inhalte zu produzieren",
      structure: "F – Function (Funktion): Definiere den Zweck/die Aufgabe\nL – Level (Niveau): Lege Wissensniveau/Zielgruppe fest\nO – Output (Ergebnis): Bestimme, was geliefert wird\nW – Win Metric (Erfolgskriterium): Woran wird Erfolg gemessen?",
      tags: ["Kommunikation", "Content", "Zielgruppe"]
    },
    en: {
      title: "F-L-O-W",
      description: "An expression and communication framework that helps produce targeted content",
      structure: "F – Function: Define the purpose/task\nL – Level: Set knowledge level/target audience\nO – Output: Determine what is delivered\nW – Win Metric: How is success measured?",
      tags: ["Communication", "Content", "Target Audience"]
    },
    fr: {
      title: "F-L-O-W",
      description: "Un framework d'expression et de communication qui aide à produire du contenu ciblé",
      structure: "F – Function (Fonction): Définir le but/la tâche\nL – Level (Niveau): Définir le niveau de connaissance/public cible\nO – Output (Sortie): Déterminer ce qui est livré\nW – Win Metric (Critère de succès): Comment le succès est-il mesuré?",
      tags: ["Communication", "Contenu", "Public Cible"]
    },
    'pt-br': {
      title: "F-L-O-W",
      description: "Um framework de expressão e comunicação que ajuda a produzir conteúdo direcionado",
      structure: "F – Function (Função): Definir o propósito/tarefa\nL – Level (Nível): Definir nível de conhecimento/público-alvo\nO – Output (Saída): Determinar o que é entregue\nW – Win Metric (Critério de sucesso): Como o sucesso é medido?",
      tags: ["Comunicação", "Conteúdo", "Público-Alvo"]
    }
  } as FrameworkTranslations
};

export function getExpressionFrameworks(lang: Language): FrameworkItem[] {
  return [
    expression_frameworks.flow[lang]
  ];
}
