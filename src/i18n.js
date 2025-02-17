import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import fr from './locales/fr.json';
import ger from './locales/ger.json';
import hindi from './locales/hindi.json';

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		fr: { translation: fr },
		ger: { translation: ger },
		hindi: {translation: hindi },
	},
	lng: 'en', // Default language
	fallbackLng: 'en', // Language to use if the current one is not available
	interpolation: {
		escapeValue: false, // React already escapes values
	},
});

export default i18n;