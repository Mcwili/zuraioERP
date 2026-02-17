// Interaction category frameworks translations
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

export const interaction_frameworks = {
  coach: {
    de: {
      title: "C-O-A-C-H",
      description: "Ein Framework für beratende oder unterstützende Interaktionen – ideal für Coaching, Mentoring, Feedbackgespräche oder KI-Dialoge, bei denen der Nutzer begleitet statt belehrt wird",
      structure: "C – Clarify (Klären): Verstehe Situation und Ziel der Person\nO – Observe (Beobachten): Erfasse Muster, Stärken, Herausforderungen\nA – Ask (Fragen): Stelle gezielte Fragen zum Denken anregen\nC – Challenge (Hinterfragen): Fordere Annahmen sanft heraus\nH – Help (Unterstützen): Biete Handlungsoptionen/Perspektiven an",
      tags: ["Coaching", "Mentoring", "Feedback"]
    },
    en: {
      title: "C-O-A-C-H",
      description: "A framework for advisory or supportive interactions – ideal for coaching, mentoring, feedback conversations or AI dialogues where the user is accompanied rather than lectured",
      structure: "C – Clarify: Understand the person's situation and goal\nO – Observe: Capture patterns, strengths, challenges\nA – Ask: Pose targeted questions to stimulate thinking\nC – Challenge: Gently challenge assumptions\nH – Help: Offer action options/perspectives",
      tags: ["Coaching", "Mentoring", "Feedback"]
    },
    fr: {
      title: "C-O-A-C-H",
      description: "Un framework pour les interactions consultatives ou de soutien – idéal pour le coaching, le mentorat, les conversations de feedback ou les dialogues IA où l'utilisateur est accompagné plutôt qu'enseigné",
      structure: "C – Clarify (Clarifier): Comprendre la situation et l'objectif de la personne\nO – Observe (Observer): Capturer les modèles, forces, défis\nA – Ask (Demander): Poser des questions ciblées pour stimuler la réflexion\nC – Challenge (Défier): Remettre en question doucement les hypothèses\nH – Help (Aider): Offrir des options d'action/perspectives",
      tags: ["Coaching", "Mentorat", "Feedback"]
    },
    'pt-br': {
      title: "C-O-A-C-H",
      description: "Um framework para interações consultivas ou de suporte – ideal para coaching, mentoria, conversas de feedback ou diálogos de IA onde o usuário é acompanhado em vez de ensinado",
      structure: "C – Clarify (Esclarecer): Entender a situação e o objetivo da pessoa\nO – Observe (Observar): Capturar padrões, forças, desafios\nA – Ask (Perguntar): Fazer perguntas direcionadas para estimular o pensamento\nC – Challenge (Desafiar): Desafiar suavemente suposições\nH – Help (Ajudar): Oferecer opções de ação/perspectivas",
      tags: ["Coaching", "Mentoria", "Feedback"]
    }
  } as FrameworkTranslations,

  bridge: {
    de: {
      title: "B-R-I-D-G-E",
      description: "Entwickelt für kooperative Kommunikation – etwa bei Konfliktlösung, Teamabstimmung oder Verhandlung. Ziel ist es, Brücken zwischen Perspektiven zu schlagen",
      structure: "B – Background (Hintergrund): Kläre Ausgangslage und Parteien\nR – Respect (Respekt): Anerkenne unterschiedliche Positionen\nI – Identify (Identifizieren): Benenne gemeinsames Ziel/Nutzen\nD – Discuss (Diskutieren): Erörtere Ideen offen und respektvoll\nG – Generate (Erzeugen): Entwickle gemeinsam Lösungen/Kompromisse\nE – Evaluate (Bewerten): Prüfe Tragfähigkeit der Lösung",
      tags: ["Konfliktlösung", "Verhandlung", "Zusammenarbeit"]
    },
    en: {
      title: "B-R-I-D-G-E",
      description: "Developed for cooperative communication – such as conflict resolution, team alignment, or negotiation. The goal is to build bridges between perspectives",
      structure: "B – Background: Clarify initial situation and parties\nR – Respect: Acknowledge different positions\nI – Identify: Name common goal/benefit\nD – Discuss: Discuss ideas openly and respectfully\nG – Generate: Develop solutions/compromises together\nE – Evaluate: Check viability of the solution",
      tags: ["Conflict Resolution", "Negotiation", "Collaboration"]
    },
    fr: {
      title: "B-R-I-D-G-E",
      description: "Développé pour la communication coopérative – comme la résolution de conflits, l'alignement d'équipe ou la négociation. L'objectif est de construire des ponts entre les perspectives",
      structure: "B – Background (Contexte): Clarifier la situation initiale et les parties\nR – Respect: Reconnaître les différentes positions\nI – Identify (Identifier): Nommer l'objectif/bénéfice commun\nD – Discuss (Discuter): Discuter des idées ouvertement et respectueusement\nG – Generate (Générer): Développer des solutions/compromis ensemble\nE – Evaluate (Évaluer): Vérifier la viabilité de la solution",
      tags: ["Résolution de Conflits", "Négociation", "Collaboration"]
    },
    'pt-br': {
      title: "B-R-I-D-G-E",
      description: "Desenvolvido para comunicação cooperativa – como resolução de conflitos, alinhamento de equipe ou negociação. O objetivo é construir pontes entre perspectivas",
      structure: "B – Background (Contexto): Esclarecer situação inicial e partes\nR – Respect (Respeito): Reconhecer diferentes posições\nI – Identify (Identificar): Nomear objetivo/benefício comum\nD – Discuss (Discutir): Discutir ideias abertamente e respeitosamente\nG – Generate (Gerar): Desenvolver soluções/compromissos juntos\nE – Evaluate (Avaliar): Verificar viabilidade da solução",
      tags: ["Resolução de Conflitos", "Negociação", "Colaboração"]
    }
  } as FrameworkTranslations,

  loop: {
    de: {
      title: "L-O-O-P",
      description: "Ein dynamisches Interaktions-Framework für iterative Prozesse – Feedback, Lernen, Produktentwicklung oder fortlaufende Kommunikation. Es betont Kreislaufdenken und Anpassung",
      structure: "L – Listen (Zuhören): Nimm wahr, was gesagt/gemeint/unausgesprochen ist\nO – Observe (Beobachten): Analysiere Reaktionen/Daten/Ergebnisse\nO – Optimize (Optimieren): Passe Verhalten/Argumentation/Output an\nP – Provide (Liefern): Gib Rückmeldung/verbessertes Ergebnis/nächste Schritte",
      tags: ["Iteration", "Feedback", "Optimierung"]
    },
    en: {
      title: "L-O-O-P",
      description: "A dynamic interaction framework for iterative processes – feedback, learning, product development, or ongoing communication. It emphasizes cyclical thinking and adaptation",
      structure: "L – Listen: Perceive what is said/meant/unspoken\nO – Observe: Analyze reactions/data/results\nO – Optimize: Adapt behavior/argumentation/output\nP – Provide: Give feedback/improved result/next steps",
      tags: ["Iteration", "Feedback", "Optimization"]
    },
    fr: {
      title: "L-O-O-P",
      description: "Un framework d'interaction dynamique pour les processus itératifs – feedback, apprentissage, développement de produits ou communication continue. Il met l'accent sur la pensée cyclique et l'adaptation",
      structure: "L – Listen (Écouter): Percevoir ce qui est dit/signifié/non dit\nO – Observe (Observer): Analyser les réactions/données/résultats\nO – Optimize (Optimiser): Adapter le comportement/l'argumentation/la sortie\nP – Provide (Fournir): Donner un feedback/résultat amélioré/prochaines étapes",
      tags: ["Itération", "Feedback", "Optimisation"]
    },
    'pt-br': {
      title: "L-O-O-P",
      description: "Um framework de interação dinâmico para processos iterativos – feedback, aprendizado, desenvolvimento de produtos ou comunicação contínua. Ele enfatiza o pensamento cíclico e a adaptação",
      structure: "L – Listen (Ouvir): Perceber o que é dito/significado/não dito\nO – Observe (Observar): Analisar reações/dados/resultados\nO – Optimize (Otimizar): Adaptar comportamento/argumentação/saída\nP – Provide (Fornecer): Dar feedback/resultado melhorado/próximos passos",
      tags: ["Iteração", "Feedback", "Otimização"]
    }
  } as FrameworkTranslations
};

export function getInteractionFrameworks(lang: Language): FrameworkItem[] {
  return [
    interaction_frameworks.coach[lang],
    interaction_frameworks.bridge[lang],
    interaction_frameworks.loop[lang]
  ];
}
