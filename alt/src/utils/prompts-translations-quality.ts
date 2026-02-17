// Quality category translations - imported by prompts-translations.ts
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

export const quality_prompts = {
  contextTurbo: {
    de: {
      title: "Der Kontextturbo",
      description: "Erzwingt fünf präzise Folgefragen, um Kontext zu klären und die Antwortqualität zu steigern.",
      prompt: "Stelle mir fünf Folgefragen, deren Antworten dir helfen werden, die Antwort signifikant zu verbessern.",
      tags: ["Kontext", "Fragen", "Qualität"]
    },
    en: {
      title: "The Context Turbo",
      description: "Forces five precise follow-up questions to clarify context and increase answer quality.",
      prompt: "Ask me five follow-up questions whose answers will help you significantly improve the response.",
      tags: ["Context", "Questions", "Quality"]
    },
    fr: {
      title: "Le Turbo de Contexte",
      description: "Force cinq questions de suivi précises pour clarifier le contexte et améliorer la qualité de la réponse.",
      prompt: "Posez-moi cinq questions de suivi dont les réponses vous aideront à améliorer considérablement la réponse.",
      tags: ["Contexte", "Questions", "Qualité"]
    },
    'pt-br': {
      title: "O Turbo de Contexto",
      description: "Força cinco perguntas de acompanhamento precisas para esclarecer o contexto e aumentar a qualidade da resposta.",
      prompt: "Faça-me cinco perguntas de acompanhamento cujas respostas o ajudarão a melhorar significativamente a resposta.",
      tags: ["Contexto", "Perguntas", "Qualidade"]
    }
  } as PromptTranslations,

  theExpert: {
    de: {
      title: "Der Experte",
      description: "Blick der Top‑1 % auf die Antwort; nutzt Frameworks für Optimierungen.",
      prompt: "Was würden die Top 1 % der Experten in diesem Themenfeld über deine Antwort denken? Nutze relevante Frameworks, um Optimierungen zu evaluieren und vorzuschlagen.",
      tags: ["Expertise", "Frameworks", "Review"]
    },
    en: {
      title: "The Expert",
      description: "Top 1% view on the answer; uses frameworks for optimizations.",
      prompt: "What would the top 1% of experts in this field think about your answer? Use relevant frameworks to evaluate and suggest optimizations.",
      tags: ["Expertise", "Frameworks", "Review"]
    },
    fr: {
      title: "L'Expert",
      description: "Vue du top 1% sur la réponse; utilise des frameworks pour les optimisations.",
      prompt: "Que penseraient les 1% d'experts les plus performants dans ce domaine de votre réponse? Utilisez des frameworks pertinents pour évaluer et suggérer des optimisations.",
      tags: ["Expertise", "Frameworks", "Révision"]
    },
    'pt-br': {
      title: "O Especialista",
      description: "Visão do top 1% sobre a resposta; usa frameworks para otimizações.",
      prompt: "O que os 1% melhores especialistas neste campo pensariam sobre sua resposta? Use frameworks relevantes para avaliar e sugerir otimizações.",
      tags: ["Expertise", "Frameworks", "Revisão"]
    }
  } as PromptTranslations,

  qualityManager: {
    de: {
      title: "Der Qualitätsmanager",
      description: "Systematische Prüfung auf Genauigkeit, Vollständigkeit und Konsistenz vor Ausgabe.",
      prompt: "Prüfe deine Antwort systematisch auf Genauigkeit, Vollständigkeit und interne Konsistenz – korrigiere oder ergänze, falls nötig, bevor du sie mir gibst.",
      tags: ["Qualität", "Prüfung", "Validierung"]
    },
    en: {
      title: "The Quality Manager",
      description: "Systematic check for accuracy, completeness, and consistency before output.",
      prompt: "Systematically check your answer for accuracy, completeness, and internal consistency – correct or supplement if necessary before giving it to me.",
      tags: ["Quality", "Review", "Validation"]
    },
    fr: {
      title: "Le Manager de Qualité",
      description: "Vérification systématique de la précision, l'exhaustivité et la cohérence avant la sortie.",
      prompt: "Vérifiez systématiquement votre réponse pour la précision, l'exhaustivité et la cohérence interne – corrigez ou complétez si nécessaire avant de me la donner.",
      tags: ["Qualité", "Révision", "Validation"]
    },
    'pt-br': {
      title: "O Gerente de Qualidade",
      description: "Verificação sistemática de precisão, completude e consistência antes da saída.",
      prompt: "Verifique sistematicamente sua resposta quanto à precisão, completude e consistência interna – corrija ou complemente se necessário antes de me dar.",
      tags: ["Qualidade", "Revisão", "Validação"]
    }
  } as PromptTranslations,

  theChallenger: {
    de: {
      title: "Der Challenger",
      description: "Hinterfragt Annahmen, öffnet neue Perspektiven.",
      prompt: "Fordere meine Annahmen heraus und hilf mir, dieses Problem aus einer neuen Perspektive zu durchdenken.",
      tags: ["Kritik", "Perspektive", "Reflexion"]
    },
    en: {
      title: "The Challenger",
      description: "Questions assumptions, opens new perspectives.",
      prompt: "Challenge my assumptions and help me think through this problem from a new perspective.",
      tags: ["Critique", "Perspective", "Reflection"]
    },
    fr: {
      title: "Le Challenger",
      description: "Remet en question les hypothèses, ouvre de nouvelles perspectives.",
      prompt: "Remettez en question mes hypothèses et aidez-moi à réfléchir à ce problème sous un nouvel angle.",
      tags: ["Critique", "Perspective", "Réflexion"]
    },
    'pt-br': {
      title: "O Desafiador",
      description: "Questiona suposições, abre novas perspectivas.",
      prompt: "Desafie minhas suposições e ajude-me a pensar neste problema de uma nova perspectiva.",
      tags: ["Crítica", "Perspectiva", "Reflexão"]
    }
  } as PromptTranslations,

  clarityBooster: {
    de: {
      title: "Der Klarheitsbooster",
      description: "Verständliche Formulierung, einfache Sprache, Zwei‑Satz‑Summary.",
      prompt: "Formuliere dein Ergebnis so verständlich wie möglich: nutze kurze Sätze, vermeide Fachjargon (oder erkläre ihn) und gib eine knappe Zusammenfassung in zwei Sätzen.",
      tags: ["Klarheit", "Verständlichkeit", "Kommunikation"]
    },
    en: {
      title: "The Clarity Booster",
      description: "Clear formulation, simple language, two-sentence summary.",
      prompt: "Formulate your result as understandably as possible: use short sentences, avoid jargon (or explain it) and give a brief summary in two sentences.",
      tags: ["Clarity", "Comprehensibility", "Communication"]
    },
    fr: {
      title: "Le Booster de Clarté",
      description: "Formulation claire, langage simple, résumé en deux phrases.",
      prompt: "Formulez votre résultat de manière aussi compréhensible que possible: utilisez des phrases courtes, évitez le jargon (ou expliquez-le) et donnez un bref résumé en deux phrases.",
      tags: ["Clarté", "Compréhensibilité", "Communication"]
    },
    'pt-br': {
      title: "O Impulsionador de Clareza",
      description: "Formulação clara, linguagem simples, resumo de duas frases.",
      prompt: "Formule seu resultado da forma mais compreensível possível: use frases curtas, evite jargão (ou explique-o) e dê um breve resumo em duas frases.",
      tags: ["Clareza", "Compreensibilidade", "Comunicação"]
    }
  } as PromptTranslations,

  evidenceProvider: {
    de: {
      title: "Der Evidenzlieferant",
      description: "Belegt Hauptaussagen mit Quelle, Beispiel oder Begründung.",
      prompt: "Belege jede Hauptaussage mit mindestens einer zuverlässigen Quelle, einem belastbaren Beispiel oder einer eindeutigen Begründung, damit ich die Aussage nachvollziehen kann.",
      tags: ["Evidenz", "Quellen", "Nachvollziehbarkeit"]
    },
    en: {
      title: "The Evidence Provider",
      description: "Supports main statements with source, example, or reasoning.",
      prompt: "Support each main statement with at least one reliable source, a solid example, or a clear justification so I can follow the statement.",
      tags: ["Evidence", "Sources", "Traceability"]
    },
    fr: {
      title: "Le Fournisseur de Preuves",
      description: "Appuie les déclarations principales par une source, un exemple ou un raisonnement.",
      prompt: "Appuyez chaque déclaration principale avec au moins une source fiable, un exemple solide ou une justification claire afin que je puisse suivre la déclaration.",
      tags: ["Preuve", "Sources", "Traçabilité"]
    },
    'pt-br': {
      title: "O Fornecedor de Evidências",
      description: "Apoia as principais declarações com fonte, exemplo ou raciocínio.",
      prompt: "Apoie cada declaração principal com pelo menos uma fonte confiável, um exemplo sólido ou uma justificativa clara para que eu possa acompanhar a declaração.",
      tags: ["Evidência", "Fontes", "Rastreabilidade"]
    }
  } as PromptTranslations,

  theStructurer: {
    de: {
      title: "Der Strukturierer",
      description: "Logische Ordnung, Überschriften, Listen, ggf. visuell.",
      prompt: "Ordne die Informationen logisch mit aussagekräftigen Überschriften, Aufzählungen und – falls sinnvoll – einer visuellen Darstellung (z. B. Tabelle, Diagramm) für den schnellen Überblick.",
      tags: ["Struktur", "Organisation", "Übersicht"]
    },
    en: {
      title: "The Structurer",
      description: "Logical order, headings, lists, possibly visual.",
      prompt: "Organize the information logically with meaningful headings, bullet points and – if useful – a visual representation (e.g., table, diagram) for a quick overview.",
      tags: ["Structure", "Organization", "Overview"]
    },
    fr: {
      title: "Le Structureur",
      description: "Ordre logique, titres, listes, éventuellement visuel.",
      prompt: "Organisez les informations de manière logique avec des titres significatifs, des points et – si utile – une représentation visuelle (par ex. tableau, diagramme) pour un aperçu rapide.",
      tags: ["Structure", "Organisation", "Vue d'ensemble"]
    },
    'pt-br': {
      title: "O Estruturador",
      description: "Ordem lógica, títulos, listas, possivelmente visual.",
      prompt: "Organize as informações logicamente com títulos significativos, marcadores e – se útil – uma representação visual (por ex. tabela, diagrama) para uma visão geral rápida.",
      tags: ["Estrutura", "Organização", "Visão Geral"]
    }
  } as PromptTranslations,

  endUserTester: {
    de: {
      title: "Der Endanwender‑Tester",
      description: "Perspektive eines kritischen Endnutzers plus kurze Antworten auf Einwände.",
      prompt: "Versetze dich in einen kritischen Endnutzer: welche Fragen oder Einwände hätte er? Ergänze deine Antwort um kurze Reaktionen auf diese möglichen Rückfragen.",
      tags: ["Nutzerperspektive", "Testing", "Usability"]
    },
    en: {
      title: "The End User Tester",
      description: "Perspective of a critical end user plus brief answers to objections.",
      prompt: "Put yourself in the position of a critical end user: what questions or objections would they have? Supplement your answer with brief responses to these possible follow-up questions.",
      tags: ["User Perspective", "Testing", "Usability"]
    },
    fr: {
      title: "Le Testeur Utilisateur Final",
      description: "Perspective d'un utilisateur final critique plus des réponses brèves aux objections.",
      prompt: "Mettez-vous à la place d'un utilisateur final critique: quelles questions ou objections aurait-il? Complétez votre réponse avec de brèves réponses à ces éventuelles questions de suivi.",
      tags: ["Perspective Utilisateur", "Test", "Utilisabilité"]
    },
    'pt-br': {
      title: "O Testador de Usuário Final",
      description: "Perspectiva de um usuário final crítico mais respostas breves a objeções.",
      prompt: "Coloque-se no lugar de um usuário final crítico: quais perguntas ou objeções ele teria? Complemente sua resposta com respostas breves a essas possíveis perguntas de acompanhamento.",
      tags: ["Perspectiva do Usuário", "Teste", "Usabilidade"]
    }
  } as PromptTranslations
};

export function getQualityPrompts(lang: Language): PromptItem[] {
  return [
    quality_prompts.contextTurbo[lang],
    quality_prompts.theExpert[lang],
    quality_prompts.qualityManager[lang],
    quality_prompts.theChallenger[lang],
    quality_prompts.clarityBooster[lang],
    quality_prompts.evidenceProvider[lang],
    quality_prompts.theStructurer[lang],
    quality_prompts.endUserTester[lang]
  ];
}
