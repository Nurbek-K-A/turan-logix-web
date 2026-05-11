import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru.json'
import kz from './locales/kz.json'
import en from './locales/en.json'

const savedLang = localStorage.getItem('turanlogix-lang') || 'ru'

i18n
  .use(initReactI18next)
  .init({
    resources: { ru: { translation: ru }, kz: { translation: kz }, en: { translation: en } },
    lng: savedLang,
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
    supportedLngs: ['ru', 'kz', 'en'],
  })

export default i18n
export const SUPPORTED_LANGUAGES = [
  { code: 'ru', label: 'РУС', full: 'Русский' },
  { code: 'kz', label: 'ҚАЗ', full: 'Қазақша' },
  { code: 'en', label: 'ENG', full: 'English' },
]
