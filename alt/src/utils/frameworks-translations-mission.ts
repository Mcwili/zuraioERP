// Mission category frameworks translations
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

export const mission_frameworks = {
  rain: {
    de: {
      title: "R-A-I-N",
      description: "Ein kompaktes Struktur-Framework, das hilft, präzise Anweisungen für Aufgaben zu formulieren",
      structure: "R – Act as a (ROLE): Definiere die Rolle\nA – State the (AIM): Formuliere das Ziel\nI – Use the provided (INPUT): Bestimme Material/Daten\nN – Hit the (NUMERIC TARGET): Lege messbare Ziele fest",
      tags: ["Struktur", "Anweisung", "Ziel"]
    },
    en: {
      title: "R-A-I-N",
      description: "A compact structure framework that helps formulate precise instructions for tasks",
      structure: "R – Act as a (ROLE): Define the role\nA – State the (AIM): Formulate the goal\nI – Use the provided (INPUT): Determine material/data\nN – Hit the (NUMERIC TARGET): Set measurable goals",
      tags: ["Structure", "Instruction", "Goal"]
    },
    fr: {
      title: "R-A-I-N",
      description: "Un framework de structure compact qui aide à formuler des instructions précises pour les tâches",
      structure: "R – Act as a (ROLE): Définir le rôle\nA – State the (AIM): Formuler l'objectif\nI – Use the provided (INPUT): Déterminer le matériel/les données\nN – Hit the (NUMERIC TARGET): Fixer des objectifs mesurables",
      tags: ["Structure", "Instruction", "Objectif"]
    },
    'pt-br': {
      title: "R-A-I-N",
      description: "Um framework de estrutura compacto que ajuda a formular instruções precisas para tarefas",
      structure: "R – Act as a (ROLE): Definir o papel\nA – State the (AIM): Formular o objetivo\nI – Use the provided (INPUT): Determinar material/dados\nN – Hit the (NUMERIC TARGET): Definir metas mensuráveis",
      tags: ["Estrutura", "Instrução", "Objetivo"]
    }
  } as FrameworkTranslations,

  risen: {
    de: {
      title: "R-I-S-E-N",
      description: "Dient zur strukturierten Erstellung konsistenter Outputs",
      structure: "R – Role (Rolle): 'Als [Experte/Funktion]'\nI – Instructions (Anweisung): 'Erstelle/Analysiere/Entwirf [Aufgabe]'\nS – Steps (Schritte): '1) … 2) … 3) …'\nE – End Goal (Endziel): 'Ziel: [Ergebnis]'\nN – Narrowing (Eingrenzung): 'Fokus auf [Grenzen/Themenbereich]'",
      tags: ["Struktur", "Output", "Konsistenz"]
    },
    en: {
      title: "R-I-S-E-N",
      description: "Serves for structured creation of consistent outputs",
      structure: "R – Role: 'As [Expert/Function]'\nI – Instructions: 'Create/Analyze/Design [Task]'\nS – Steps: '1) … 2) … 3) …'\nE – End Goal: 'Goal: [Result]'\nN – Narrowing: 'Focus on [Limits/Topic Area]'",
      tags: ["Structure", "Output", "Consistency"]
    },
    fr: {
      title: "R-I-S-E-N",
      description: "Sert à la création structurée de sorties cohérentes",
      structure: "R – Role (Rôle): 'En tant que [Expert/Fonction]'\nI – Instructions: 'Créer/Analyser/Concevoir [Tâche]'\nS – Steps (Étapes): '1) … 2) … 3) …'\nE – End Goal (Objectif final): 'But: [Résultat]'\nN – Narrowing (Ciblage): 'Focus sur [Limites/Domaine]'",
      tags: ["Structure", "Sortie", "Cohérence"]
    },
    'pt-br': {
      title: "R-I-S-E-N",
      description: "Serve para criação estruturada de saídas consistentes",
      structure: "R – Role (Papel): 'Como [Especialista/Função]'\nI – Instructions (Instruções): 'Criar/Analisar/Projetar [Tarefa]'\nS – Steps (Passos): '1) … 2) … 3) …'\nE – End Goal (Meta final): 'Objetivo: [Resultado]'\nN – Narrowing (Delimitação): 'Foco em [Limites/Área temática]'",
      tags: ["Estrutura", "Saída", "Consistência"]
    }
  } as FrameworkTranslations,

  razia: {
    de: {
      title: "R-A-Z-I-A",
      description: "Struktur zur klaren Aufgabenbeschreibung mit Rollendefinition, Ziel, Kontext und Ausgabeformat",
      structure: "R – Rolle: Du agierst als [Rolle]\nA – Aufgabe: Deine Aufgabe ist [Aufgabe]\nZ – Ziel: Das Ziel der Aufgabe ist [Ziel]\nI – Informationen: Zusatzinformationen und Kontext\nA – Ausgabeformat: Format [z. B. Tabelle, Bericht]",
      tags: ["Aufgabe", "Rolle", "Format"]
    },
    en: {
      title: "R-A-Z-I-A",
      description: "Structure for clear task description with role definition, goal, context and output format",
      structure: "R – Role: You act as [Role]\nA – Assignment: Your task is [Task]\nZ – Ziel (Goal): The goal of the task is [Goal]\nI – Information: Additional information and context\nA – Output Format: Format [e.g., table, report]",
      tags: ["Task", "Role", "Format"]
    },
    fr: {
      title: "R-A-Z-I-A",
      description: "Structure pour une description claire de tâche avec définition du rôle, objectif, contexte et format de sortie",
      structure: "R – Rôle: Vous agissez en tant que [Rôle]\nA – Aufgabe (Tâche): Votre tâche est [Tâche]\nZ – Ziel (Objectif): L'objectif de la tâche est [Objectif]\nI – Informations: Informations supplémentaires et contexte\nA – Format de sortie: Format [p. ex. tableau, rapport]",
      tags: ["Tâche", "Rôle", "Format"]
    },
    'pt-br': {
      title: "R-A-Z-I-A",
      description: "Estrutura para descrição clara de tarefa com definição de papel, objetivo, contexto e formato de saída",
      structure: "R – Rolle (Papel): Você age como [Papel]\nA – Aufgabe (Tarefa): Sua tarefa é [Tarefa]\nZ – Ziel (Objetivo): O objetivo da tarefa é [Objetivo]\nI – Informationen (Informações): Informações adicionais e contexto\nA – Formato de saída: Formato [p. ex. tabela, relatório]",
      tags: ["Tarefa", "Papel", "Formato"]
    }
  } as FrameworkTranslations,

  razzia: {
    de: {
      title: "R-A-Z-Z-I-A",
      description: "Eine erweiterte Version von RAZIA, ergänzt um eine Zielgruppenorientierung",
      structure: "R – Rolle: Du agierst als [Rolle]\nA – Aufgabe: Deine Aufgabe ist [Aufgabe]\nZ – Ziel: Das Ziel der Aufgabe ist [Ziel]\nZ – Zielgruppe: Ausgerichtet auf [Zielgruppe]\nI – Informationen: Zusatzinformationen und Kontext\nA – Ausgabeformat: Format [z. B. Tabelle, Bericht]",
      tags: ["Aufgabe", "Zielgruppe", "Format"]
    },
    en: {
      title: "R-A-Z-Z-I-A",
      description: "An extended version of RAZIA, supplemented with target audience orientation",
      structure: "R – Role: You act as [Role]\nA – Assignment: Your task is [Task]\nZ – Ziel (Goal): The goal of the task is [Goal]\nZ – Zielgruppe (Target Audience): Aimed at [Target Audience]\nI – Information: Additional information and context\nA – Output Format: Format [e.g., table, report]",
      tags: ["Task", "Target Audience", "Format"]
    },
    fr: {
      title: "R-A-Z-Z-I-A",
      description: "Une version étendue de RAZIA, complétée par une orientation vers le public cible",
      structure: "R – Rôle: Vous agissez en tant que [Rôle]\nA – Aufgabe (Tâche): Votre tâche est [Tâche]\nZ – Ziel (Objectif): L'objectif de la tâche est [Objectif]\nZ – Zielgruppe (Public cible): Destiné à [Public cible]\nI – Informations: Informations supplémentaires et contexte\nA – Format de sortie: Format [p. ex. tableau, rapport]",
      tags: ["Tâche", "Public Cible", "Format"]
    },
    'pt-br': {
      title: "R-A-Z-Z-I-A",
      description: "Uma versão estendida do RAZIA, complementada com orientação ao público-alvo",
      structure: "R – Rolle (Papel): Você age como [Papel]\nA – Aufgabe (Tarefa): Sua tarefa é [Tarefa]\nZ – Ziel (Objetivo): O objetivo da tarefa é [Objetivo]\nZ – Zielgruppe (Público-alvo): Direcionado a [Público-alvo]\nI – Informationen (Informações): Informações adicionais e contexto\nA – Formato de saída: Formato [p. ex. tabela, relatório]",
      tags: ["Tarefa", "Público-Alvo", "Formato"]
    }
  } as FrameworkTranslations,

  aida: {
    de: {
      title: "A-I-D-A",
      description: "Ein klassisches Marketing- und Kommunikations-Framework",
      structure: "A – Attention (Aufmerksamkeit): Wie erregen wir Aufmerksamkeit?\nI – Interest (Interesse): Wie wecken wir Interesse?\nD – Desire (Verlangen): Wie erzeugen wir Verlangen/Emotionen?\nA – Action (Handlung): Welche konkrete Handlung soll erfolgen?",
      tags: ["Marketing", "Kommunikation", "Conversion"]
    },
    en: {
      title: "A-I-D-A",
      description: "A classic marketing and communication framework",
      structure: "A – Attention: How do we attract attention?\nI – Interest: How do we arouse interest?\nD – Desire: How do we create desire/emotions?\nA – Action: What concrete action should be taken?",
      tags: ["Marketing", "Communication", "Conversion"]
    },
    fr: {
      title: "A-I-D-A",
      description: "Un framework classique de marketing et de communication",
      structure: "A – Attention: Comment attirer l'attention?\nI – Interest (Intérêt): Comment éveiller l'intérêt?\nD – Desire (Désir): Comment créer le désir/les émotions?\nA – Action: Quelle action concrète doit être prise?",
      tags: ["Marketing", "Communication", "Conversion"]
    },
    'pt-br': {
      title: "A-I-D-A",
      description: "Um framework clássico de marketing e comunicação",
      structure: "A – Attention (Atenção): Como atraímos atenção?\nI – Interest (Interesse): Como despertamos interesse?\nD – Desire (Desejo): Como criamos desejo/emoções?\nA – Action (Ação): Que ação concreta deve ser tomada?",
      tags: ["Marketing", "Comunicação", "Conversão"]
    }
  } as FrameworkTranslations
};

export function getMissionFrameworks(lang: Language): FrameworkItem[] {
  return [
    mission_frameworks.rain[lang],
    mission_frameworks.risen[lang],
    mission_frameworks.razia[lang],
    mission_frameworks.razzia[lang],
    mission_frameworks.aida[lang]
  ];
}
