// Hook for accessing translated prompt and framework content
// This provides a centralized way to get all prompts and frameworks in the current language

import { useLanguage, type Language } from './i18n';
import { 
  promptContentDE, 
  promptContentEN, 
  promptContentFR, 
  promptContentPTBR,
  frameworkContentDE,
  frameworkContentEN,
  frameworkContentFR,
  frameworkContentPTBR,
  type PromptsContent,
  type FrameworksContent
} from './prompts-content';

export function usePromptContent() {
  const { language } = useLanguage();
  
  const getPromptsContent = (): PromptsContent => {
    switch (language) {
      case 'en':
        return promptContentEN;
      case 'fr':
        return promptContentFR;
      case 'pt-br':
        return promptContentPTBR;
      case 'de':
      default:
        return promptContentDE;
    }
  };

  const getFrameworksContent = (): FrameworksContent => {
    switch (language) {
      case 'en':
        return frameworkContentEN;
      case 'fr':
        return frameworkContentFR;
      case 'pt-br':
        return frameworkContentPTBR;
      case 'de':
      default:
        return frameworkContentDE;
    }
  };

  return {
    promptsContent: getPromptsContent(),
    frameworksContent: getFrameworksContent()
  };
}

// Helper to get content for a specific language (useful for server-side or testing)
export function getPromptContentForLanguage(lang: Language): PromptsContent {
  switch (lang) {
    case 'en':
      return promptContentEN;
    case 'fr':
      return promptContentFR;
    case 'pt-br':
      return promptContentPTBR;
    case 'de':
    default:
      return promptContentDE;
  }
}

export function getFrameworkContentForLanguage(lang: Language): FrameworksContent {
  switch (lang) {
    case 'en':
      return frameworkContentEN;
    case 'fr':
      return frameworkContentFR;
    case 'pt-br':
      return frameworkContentPTBR;
    case 'de':
    default:
      return frameworkContentDE;
  }
}
