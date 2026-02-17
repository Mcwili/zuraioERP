// Hook to access translated prompts and frameworks based on current language
// This hook provides an easy way to get translated content in components

import { useLanguage } from './i18n';
import { PromptItem } from './prompts-translations';
import {
  getMarketPrompts,
  getPlanningPrompts,
  getStrategyPrompts,
  getSalesPrompts,
  getServicePrompts,
  getFinancePrompts,
  getHRPrompts,
  getLearningPrompts,
  getOrganizationPrompts,
  getCoachingPrompts,
  getPromptEngineeringPrompts,
  getQualityPrompts,
  getCriticalAnalysisPrompts,
  TRANSLATION_STATUS
} from './prompts-translations';

export function useTranslatedPrompts() {
  const { language } = useLanguage();

  // Get prompts for each category in the current language
  const marketPrompts = getMarketPrompts(language);
  const planningPrompts = getPlanningPrompts(language);
  const strategyPrompts = getStrategyPrompts(language);
  const salesPrompts = getSalesPrompts(language);
  const servicePrompts = getServicePrompts(language);
  const financePrompts = getFinancePrompts(language);
  const hrPrompts = getHRPrompts(language);
  const learningPrompts = getLearningPrompts(language);
  const organizationPrompts = getOrganizationPrompts(language);
  const coachingPrompts = getCoachingPrompts(language);
  const promptEngineeringPrompts = getPromptEngineeringPrompts(language);
  const qualityPrompts = getQualityPrompts(language);
  const criticalAnalysisPrompts = getCriticalAnalysisPrompts(language);

  // Check if a category has complete translations
  const isFullyTranslated = (category: keyof typeof TRANSLATION_STATUS.total) => {
    return TRANSLATION_STATUS.completed[category] === TRANSLATION_STATUS.total[category];
  };

  // Get translation progress for a category
  const getTranslationProgress = (category: keyof typeof TRANSLATION_STATUS.total) => {
    const completed = TRANSLATION_STATUS.completed[category] || 0;
    const total = TRANSLATION_STATUS.total[category];
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
      isComplete: completed === total
    };
  };

  return {
    // Translated prompts by category
    prompts: {
      market: marketPrompts,
      planning: planningPrompts,
      strategy: strategyPrompts,
      sales: salesPrompts,
      service: servicePrompts,
      finance: financePrompts,
      hr: hrPrompts,
      learning: learningPrompts,
      organization: organizationPrompts,
      coaching: coachingPrompts,
      promptEngineering: promptEngineeringPrompts,
      quality: qualityPrompts,
      criticalAnalysis: criticalAnalysisPrompts
    },
    
    // Translation status helpers
    isFullyTranslated,
    getTranslationProgress,
    
    // Overall translation status
    translationStatus: TRANSLATION_STATUS,
    
    // Current language
    currentLanguage: language
  };
}