// Multilingual Frameworks Content
// This file contains translations for all frameworks in DE, EN, FR, PT-BR

import { Language } from './i18n';
import { mission_frameworks, getMissionFrameworks } from './frameworks-translations-mission';
import { thinking_frameworks, getThinkingFrameworks } from './frameworks-translations-thinking';
import { expression_frameworks, getExpressionFrameworks } from './frameworks-translations-expression';
import { interaction_frameworks, getInteractionFrameworks } from './frameworks-translations-interaction';

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

// Export all framework collections (imported from separate files)
export { mission_frameworks, getMissionFrameworks };
export { thinking_frameworks, getThinkingFrameworks };
export { expression_frameworks, getExpressionFrameworks };
export { interaction_frameworks, getInteractionFrameworks };

// Translation status tracker
export const FRAMEWORK_TRANSLATION_STATUS = {
  categories: {
    mission: 5, // rain, risen, razia, razzia, aida
    thinking: 5, // clar, pivo, seed, smart, fiveW1H
    expression: 1, // flow
    interaction: 3 // coach, bridge, loop
  },
  total: 14, // Total frameworks translated
  complete: true // All frameworks are now translated!
};
