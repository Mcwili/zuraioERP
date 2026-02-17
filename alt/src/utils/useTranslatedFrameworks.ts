// Hook for accessing translated frameworks based on current language
import { useLanguage } from './i18n';
import {
  FrameworkItem,
  getMissionFrameworks,
  getThinkingFrameworks,
  getExpressionFrameworks,
  getInteractionFrameworks,
  FRAMEWORK_TRANSLATION_STATUS
} from './frameworks-translations';

export function useTranslatedFrameworks() {
  const { language } = useLanguage();

  const missionFrameworks = getMissionFrameworks(language);
  const thinkingFrameworks = getThinkingFrameworks(language);
  const expressionFrameworks = getExpressionFrameworks(language);
  const interactionFrameworks = getInteractionFrameworks(language);

  return {
    frameworks: {
      mission: missionFrameworks,
      thinking: thinkingFrameworks,
      expression: expressionFrameworks,
      interaction: interactionFrameworks
    },
    status: FRAMEWORK_TRANSLATION_STATUS
  };
}
