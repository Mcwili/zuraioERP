import { useLanguage } from '../utils/i18n';
import { newFeaturesTranslations } from '../utils/newFeaturesTranslations';

export function useNewTranslations() {
  const { language } = useLanguage();
  
  const tn = (key: string) => {
    const keys = key.split('.');
    let value: any = newFeaturesTranslations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  };
  
  return { tn, language };
}
