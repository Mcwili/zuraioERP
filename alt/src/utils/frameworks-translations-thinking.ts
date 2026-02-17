// Thinking category frameworks translations
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

export const thinking_frameworks = {
  clar: {
    de: {
      title: "C-L-A-R",
      description: "Gedankenstruktur für klare, logische Aufgabenformulierungen",
      structure: "C – Context (Kontext): Beschreibe die Ausgangslage\nL – Limits (Grenzen): Nenne Einschränkungen/Bedingungen\nA – Action (Handlung): Definiere, was getan werden soll\nR – Result (Ergebnis): Beschreibe das gewünschte Resultat",
      tags: ["Logik", "Struktur", "Klarheit"]
    },
    en: {
      title: "C-L-A-R",
      description: "Thought structure for clear, logical task formulations",
      structure: "C – Context: Describe the initial situation\nL – Limits: Name constraints/conditions\nA – Action: Define what should be done\nR – Result: Describe the desired outcome",
      tags: ["Logic", "Structure", "Clarity"]
    },
    fr: {
      title: "C-L-A-R",
      description: "Structure de pensée pour des formulations de tâches claires et logiques",
      structure: "C – Context (Contexte): Décrire la situation initiale\nL – Limits (Limites): Nommer les contraintes/conditions\nA – Action: Définir ce qui doit être fait\nR – Result (Résultat): Décrire le résultat souhaité",
      tags: ["Logique", "Structure", "Clarté"]
    },
    'pt-br': {
      title: "C-L-A-R",
      description: "Estrutura de pensamento para formulações de tarefas claras e lógicas",
      structure: "C – Context (Contexto): Descrever a situação inicial\nL – Limits (Limites): Nomear restrições/condições\nA – Action (Ação): Definir o que deve ser feito\nR – Result (Resultado): Descrever o resultado desejado",
      tags: ["Lógica", "Estrutura", "Clareza"]
    }
  } as FrameworkTranslations,

  pivo: {
    de: {
      title: "P-I-V-O",
      description: "Ein reflektives Framework für strategisches Denken und Argumentationsaufbau",
      structure: "P – Problem: Beschreibe das zu lösende Problem\nI – Insights (Erkenntnisse): Wichtigste Erkenntnisse/Beobachtungen\nV – Voice (Stimme): Definiere Ton oder Perspektive\nO – Outcome (Ergebnis): Was soll erreicht werden?",
      tags: ["Strategie", "Reflexion", "Argumentation"]
    },
    en: {
      title: "P-I-V-O",
      description: "A reflective framework for strategic thinking and argumentation building",
      structure: "P – Problem: Describe the problem to be solved\nI – Insights: Most important insights/observations\nV – Voice: Define tone or perspective\nO – Outcome: What should be achieved?",
      tags: ["Strategy", "Reflection", "Argumentation"]
    },
    fr: {
      title: "P-I-V-O",
      description: "Un framework réflexif pour la pensée stratégique et la construction d'argumentations",
      structure: "P – Problem (Problème): Décrire le problème à résoudre\nI – Insights: Aperçus/observations les plus importants\nV – Voice (Voix): Définir le ton ou la perspective\nO – Outcome (Résultat): Qu'est-ce qui doit être atteint?",
      tags: ["Stratégie", "Réflexion", "Argumentation"]
    },
    'pt-br': {
      title: "P-I-V-O",
      description: "Um framework reflexivo para pensamento estratégico e construção de argumentação",
      structure: "P – Problem (Problema): Descrever o problema a ser resolvido\nI – Insights: Percepções/observações mais importantes\nV – Voice (Voz): Definir tom ou perspectiva\nO – Outcome (Resultado): O que deve ser alcançado?",
      tags: ["Estratégia", "Reflexão", "Argumentação"]
    }
  } as FrameworkTranslations,

  seed: {
    de: {
      title: "S-E-E-D",
      description: "Eine Denkstruktur für zielgerichtete Planung und Output-Definition",
      structure: "S – Situation: Beschreibe aktuelle Situation/Problem\nE – Endgoal (Endziel): Definiere gewünschtes Ergebnis\nE – Examples (Beispiele): Führe Beispiele/Referenzen an\nD – Deliverables (Ergebnisse): Konkrete zu liefernde Outputs",
      tags: ["Planung", "Ziel", "Output"]
    },
    en: {
      title: "S-E-E-D",
      description: "A thinking structure for targeted planning and output definition",
      structure: "S – Situation: Describe current situation/problem\nE – Endgoal: Define desired outcome\nE – Examples: Provide examples/references\nD – Deliverables: Concrete outputs to be delivered",
      tags: ["Planning", "Goal", "Output"]
    },
    fr: {
      title: "S-E-E-D",
      description: "Une structure de pensée pour la planification ciblée et la définition de sortie",
      structure: "S – Situation: Décrire la situation/problème actuel\nE – Endgoal (Objectif final): Définir le résultat souhaité\nE – Examples (Exemples): Fournir des exemples/références\nD – Deliverables (Livrables): Sorties concrètes à livrer",
      tags: ["Planification", "Objectif", "Sortie"]
    },
    'pt-br': {
      title: "S-E-E-D",
      description: "Uma estrutura de pensamento para planejamento direcionado e definição de saída",
      structure: "S – Situation (Situação): Descrever situação/problema atual\nE – Endgoal (Meta final): Definir resultado desejado\nE – Examples (Exemplos): Fornecer exemplos/referências\nD – Deliverables (Entregáveis): Saídas concretas a serem entregues",
      tags: ["Planejamento", "Objetivo", "Saída"]
    }
  } as FrameworkTranslations,

  smart: {
    de: {
      title: "S-M-A-R-T",
      description: "Klassisches Management- und Zielsetzungsframework zur Definition klarer, überprüfbarer und erreichbarer Ziele",
      structure: "S – Specific (Spezifisch): Was genau soll erreicht werden?\nM – Measurable (Messbar): Wie wird Erfolg gemessen?\nA – Achievable (Erreichbar): Ist das Ziel realistisch?\nR – Relevant (Relevant): Warum ist das Ziel wichtig?\nT – Time-bound (Zeitgebunden): Bis wann soll es erreicht werden?",
      tags: ["Ziele", "Management", "Messbarkeit"]
    },
    en: {
      title: "S-M-A-R-T",
      description: "Classic management and goal-setting framework for defining clear, verifiable, and achievable goals",
      structure: "S – Specific: What exactly should be achieved?\nM – Measurable: How is success measured?\nA – Achievable: Is the goal realistic?\nR – Relevant: Why is the goal important?\nT – Time-bound: By when should it be achieved?",
      tags: ["Goals", "Management", "Measurability"]
    },
    fr: {
      title: "S-M-A-R-T",
      description: "Framework classique de gestion et de définition d'objectifs pour définir des objectifs clairs, vérifiables et réalisables",
      structure: "S – Specific (Spécifique): Que doit-on atteindre exactement?\nM – Measurable (Mesurable): Comment mesure-t-on le succès?\nA – Achievable (Réalisable): L'objectif est-il réaliste?\nR – Relevant: Pourquoi l'objectif est-il important?\nT – Time-bound (Limité dans le temps): Pour quand doit-il être atteint?",
      tags: ["Objectifs", "Gestion", "Mesurabilité"]
    },
    'pt-br': {
      title: "S-M-A-R-T",
      description: "Framework clássico de gestão e definição de metas para definir metas claras, verificáveis e alcançáveis",
      structure: "S – Specific (Específico): O que exatamente deve ser alcançado?\nM – Measurable (Mensurável): Como o sucesso é medido?\nA – Achievable (Alcançável): A meta é realista?\nR – Relevant (Relevante): Por que a meta é importante?\nT – Time-bound (Com prazo): Até quando deve ser alcançado?",
      tags: ["Metas", "Gestão", "Mensurabilidade"]
    }
  } as FrameworkTranslations,

  fiveW1H: {
    de: {
      title: "5-W-1-H",
      description: "Ein journalistisches und analytisches Framework, das hilft, Situationen vollständig zu verstehen und zu planen",
      structure: "Who (Wer): Wer ist beteiligt?\nWhat (Was): Was soll erreicht werden?\nWhen (Wann): Wann soll es geschehen?\nWhere (Wo): Wo findet es statt?\nWhy (Warum): Warum ist es wichtig?\nHow (Wie): Wie wird es umgesetzt?",
      tags: ["Analyse", "Planung", "Vollständigkeit"]
    },
    en: {
      title: "5-W-1-H",
      description: "A journalistic and analytical framework that helps fully understand and plan situations",
      structure: "Who: Who is involved?\nWhat: What should be achieved?\nWhen: When should it happen?\nWhere: Where does it take place?\nWhy: Why is it important?\nHow: How is it implemented?",
      tags: ["Analysis", "Planning", "Completeness"]
    },
    fr: {
      title: "5-W-1-H",
      description: "Un framework journalistique et analytique qui aide à comprendre et planifier complètement les situations",
      structure: "Who (Qui): Qui est impliqué?\nWhat (Quoi): Qu'est-ce qui doit être atteint?\nWhen (Quand): Quand cela doit-il se produire?\nWhere (Où): Où cela se déroule-t-il?\nWhy (Pourquoi): Pourquoi est-ce important?\nHow (Comment): Comment est-ce mis en œuvre?",
      tags: ["Analyse", "Planification", "Exhaustivité"]
    },
    'pt-br': {
      title: "5-W-1-H",
      description: "Um framework jornalístico e analítico que ajuda a entender e planejar situações completamente",
      structure: "Who (Quem): Quem está envolvido?\nWhat (O quê): O que deve ser alcançado?\nWhen (Quando): Quando deve acontecer?\nWhere (Onde): Onde acontece?\nWhy (Por quê): Por que é importante?\nHow (Como): Como é implementado?",
      tags: ["Análise", "Planejamento", "Completude"]
    }
  } as FrameworkTranslations
};

export function getThinkingFrameworks(lang: Language): FrameworkItem[] {
  return [
    thinking_frameworks.clar[lang],
    thinking_frameworks.pivo[lang],
    thinking_frameworks.seed[lang],
    thinking_frameworks.smart[lang],
    thinking_frameworks.fiveW1H[lang]
  ];
}
