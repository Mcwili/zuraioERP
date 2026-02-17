// Internationalization for Prompts and Frameworks
// This provides a practical solution for translating prompt content

import { Language } from './i18n';

// Translation mappings for common terms and phrases used in prompts
export const promptTermTranslations = {
  // Placeholders
  "[Name, Branche]": {
    de: "[Name, Branche]",
    en: "[Name, Industry]",
    fr: "[Nom, Secteur]",
    'pt-br': "[Nome, Setor]"
  },
  "[Produkt/Idee]": {
    de: "[Produkt/Idee]",
    en: "[Product/Idea]",
    fr: "[Produit/Idée]",
    'pt-br': "[Produto/Ideia]"
  },
  "[Produkt]": {
    de: "[Produkt]",
    en: "[Product]",
    fr: "[Produit]",
    'pt-br': "[Produto]"
  },
  "[Zielgruppe]": {
    de: "[Zielgruppe]",
    en: "[Target Audience]",
    fr: "[Public Cible]",
    'pt-br': "[Público-Alvo]"
  },
  "[Berufsbezeichnung/Branche einfügen]": {
    de: "[Berufsbezeichnung/Branche einfügen]",
    en: "[Insert job title/industry]",
    fr: "[Insérer titre/secteur]",
    'pt-br': "[Inserir cargo/setor]"
  },
  "[Aufgabenliste für heute einfügen]": {
    de: "[Aufgabenliste für heute einfügen]",
    en: "[Insert today's task list]",
    fr: "[Insérer liste de tâches]",
    'pt-br': "[Inserir lista de tarefas]"
  },
  "[Projekt oder Ziel einfügen]": {
    de: "[Projekt oder Ziel einfügen]",
    en: "[Insert project or goal]",
    fr: "[Insérer projet ou objectif]",
    'pt-br': "[Inserir projeto ou objetivo]"
  },
  "[Unternehmensname einfügen]": {
    de: "[Unternehmensname einfügen]",
    en: "[Insert company name]",
    fr: "[Insérer nom de l'entreprise]",
    'pt-br': "[Inserir nome da empresa]"
  },
  "[Branche einfügen]": {
    de: "[Branche einfügen]",
    en: "[Insert industry]",
    fr: "[Insérer secteur]",
    'pt-br': "[Inserir setor]"
  },
  "[Name einfügen]": {
    de: "[Name einfügen]",
    en: "[Insert name]",
    fr: "[Insérer nom]",
    'pt-br': "[Inserir nome]"
  },
  "[Jobtitel]": {
    de: "[Jobtitel]",
    en: "[Job title]",
    fr: "[Titre du poste]",
    'pt-br': "[Cargo]"
  },
  "[X]": {
    de: "[X]",
    en: "[X]",
    fr: "[X]",
    'pt-br': "[X]"
  },
  "[Y]": {
    de: "[Y]",
    en: "[Y]",
    fr: "[Y]",
    'pt-br': "[Y]"
  },
  "[XY]": {
    de: "[XY]",
    en: "[XY]",
    fr: "[XY]",
    'pt-br': "[XY]"
  },
  "[Details zu deinem Projekt]": {
    de: "[Details zu deinem Projekt]",
    en: "[Your project details]",
    fr: "[Détails de votre projet]",
    'pt-br': "[Detalhes do seu projeto]"
  },
  "[Details zu deinem Geschäftsmodell]": {
    de: "[Details zu deinem Geschäftsmodell]",
    en: "[Your business model details]",
    fr: "[Détails de votre modèle d'affaires]",
    'pt-br': "[Detalhes do seu modelo de negócios]"
  },
  "[Beschreibung]": {
    de: "[Beschreibung]",
    en: "[Description]",
    fr: "[Description]",
    'pt-br': "[Descrição]"
  },
  "[Branche oder Nische]": {
    de: "[Branche oder Nische]",
    en: "[Industry or niche]",
    fr: "[Secteur ou niche]",
    'pt-br': "[Setor ou nicho]"
  },
  "[Produkt/Service]": {
    de: "[Produkt/Service]",
    en: "[Product/Service]",
    fr: "[Produit/Service]",
    'pt-br': "[Produto/Serviço]"
  },
  "[Kernnutzen]": {
    de: "[Kernnutzen]",
    en: "[Core benefit]",
    fr: "[Avantage principal]",
    'pt-br': "[Benefício principal]"
  },
  "[z. B. 38 Jahre]": {
    de: "[z. B. 38 Jahre]",
    en: "[e.g., 38 years old]",
    fr: "[p. ex. 38 ans]",
    'pt-br': "[p. ex. 38 anos]"
  },
  "[z. B. Marketingmanager in einem mittelständischen Unternehmen]": {
    de: "[z. B. Marketingmanager in einem mittelständischen Unternehmen]",
    en: "[e.g., Marketing Manager in a medium-sized company]",
    fr: "[p. ex. Responsable Marketing dans une entreprise de taille moyenne]",
    'pt-br': "[p. ex. Gerente de Marketing em uma empresa de médio porte]"
  },
  "[Kundenname]": {
    de: "[Kundenname]",
    en: "[Customer name]",
    fr: "[Nom du client]",
    'pt-br': "[Nome do cliente]"
  },
  "[Alter, z. B. 38 Jahre]": {
    de: "[Alter, z. B. 38 Jahre]",
    en: "[Age, e.g., 38 years old]",
    fr: "[Âge, p. ex. 38 ans]",
    'pt-br': "[Idade, p. ex. 38 anos]"
  },
  "[Rohdaten einfügen: Umsatz, Kosten, Cashflow, KPIs]": {
    de: "[Rohdaten einfügen: Umsatz, Kosten, Cashflow, KPIs]",
    en: "[Insert raw data: Revenue, Costs, Cashflow, KPIs]",
    fr: "[Insérer données brutes: Chiffre d'affaires, Coûts, Flux de trésorerie, KPIs]",
    'pt-br': "[Inserir dados brutos: Receita, Custos, Fluxo de Caixa, KPIs]"
  },
  "[Liste der häufigsten Kundenanfragen der letzten 6 Monate]": {
    de: "[Liste der häufigsten Kundenanfragen der letzten 6 Monate]",
    en: "[List of most frequent customer requests from the last 6 months]",
    fr: "[Liste des demandes client les plus fréquentes des 6 derniers mois]",
    'pt-br': "[Lista das solicitações de clientes mais frequentes dos últimos 6 meses]"
  },
  "[Themengebiet einfügen]": {
    de: "[Themengebiet einfügen]",
    en: "[Insert topic area]",
    fr: "[Insérer domaine]",
    'pt-br': "[Inserir área temática]"
  },
  "[Situation oder Alter einfügen]": {
    de: "[Situation oder Alter einfügen]",
    en: "[Insert situation or age]",
    fr: "[Insérer situation ou âge]",
    'pt-br': "[Inserir situação ou idade]"
  },
  "[DEINE FRAGE / SITUATION]": {
    de: "[DEINE FRAGE / SITUATION]",
    en: "[YOUR QUESTION / SITUATION]",
    fr: "[VOTRE QUESTION / SITUATION]",
    'pt-br': "[SUA PERGUNTA / SITUAÇÃO]"
  },
  "[Dein Problem]": {
    de: "[Dein Problem]",
    en: "[Your problem]",
    fr: "[Votre problème]",
    'pt-br': "[Seu problema]"
  },
  "[Deine Frage]": {
    de: "[Deine Frage]",
    en: "[Your question]",
    fr: "[Votre question]",
    'pt-br': "[Sua pergunta]"
  },
  "[Deine Aufgabe]": {
    de: "[Deine Aufgabe]",
    en: "[Your task]",
    fr: "[Votre tâche]",
    'pt-br': "[Sua tarefa]"
  },
};

// Note: For a production system handling 50+ lengthy prompts, consider:
// 1. Using a translation management system (TMS)
// 2. Integrating with a translation API for dynamic translation
// 3. Storing translations in a database
// 4. Using a professional translation service
// 
// This file provides the foundation for placeholder translation.
// Full prompt content translation should be handled by professional translators
// due to the specialized nature and length of the content.

export function translatePlaceholders(text: string, targetLang: Language): string {
  let translated = text;
  
  for (const [german, translations] of Object.entries(promptTermTranslations)) {
    if (translated.includes(german)) {
      translated = translated.replace(new RegExp(escapeRegExp(german), 'g'), translations[targetLang]);
    }
  }
  
  return translated;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper to indicate that manual translation is recommended
export const TRANSLATION_NOTE = `
IMPORTANT: This system provides placeholder translation for prompts and frameworks.
For production use with multiple languages, professional translation of the full 
prompt content is strongly recommended due to:
- Specialized business/coaching terminology
- Cultural context and nuance
- Length and complexity of prompts (50+ prompts with 100-500 words each)
- Domain-specific knowledge required

Current approach:
- German (DE): Original content (complete)
- English (EN): Placeholder translation (requires professional review)
- French (FR): Placeholder translation (requires professional review)  
- Portuguese (PT-BR): Placeholder translation (requires professional review)
`;
