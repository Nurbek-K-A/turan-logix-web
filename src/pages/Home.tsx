import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import RoutesSection from '@/components/sections/RoutesSection'
import CalculatorSection from '@/components/sections/CalculatorSection'
import AiChatSection from '@/components/sections/AiChatSection'
import AboutSection from '@/components/sections/AboutSection'
import ContactsSection from '@/components/sections/ContactsSection'

export default function Home() {
  const { t, i18n } = useTranslation()

  const hreflangLinks = [
    { lang: 'ru', href: 'https://turanlogix.kz/' },
    { lang: 'kk', href: 'https://turanlogix.kz/kz' },
    { lang: 'en', href: 'https://turanlogix.kz/en' },
    { lang: 'x-default', href: 'https://turanlogix.kz/' },
  ]

  return (
    <>
      <Helmet>
        <html lang={i18n.language === 'kz' ? 'kk' : i18n.language} />
        <title>TuranLogix — Грузоперевозки по Казахстану | ИП «Туран Логистика»</title>
        <meta name="description" content="Надёжная транспортно-экспедиционная компания. Перевозки FTL/LTL, экспресс-доставка, карго из Китая. Онлайн-заявка, ИИ-ассистент, отслеживание груза." />
        <meta name="keywords" content="грузоперевозки Казахстан, логистика Алматы, экспедиция, фура, LTL, FTL, карго Китай, ИП Туран Логистика" />
        <meta property="og:title" content="TuranLogix — Грузоперевозки по Казахстану" />
        <meta property="og:description" content="Надёжная экспедиция и перевозка грузов по всему Казахстану." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://turanlogix.kz" />
        <meta property="og:locale" content="ru_KZ" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://turanlogix.kz/" />
        {hreflangLinks.map(l => (
          <link key={l.lang} rel="alternate" hrefLang={l.lang} href={l.href} />
        ))}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'ИП «Туран Логистика»',
          description: 'Транспортно-экспедиционная компания в Казахстане',
          url: 'https://turanlogix.kz',
          telephone: '+77001234567',
          email: 'info@turanlogix.kz',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Алматы',
            addressCountry: 'KZ',
          },
          openingHours: 'Mo-Fr 09:00-18:00',
          serviceArea: { '@type': 'Country', name: 'Kazakhstan' },
        })}</script>
      </Helmet>

      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <RoutesSection />
      <CalculatorSection />
      <AiChatSection />
      <AboutSection />
      <ContactsSection />
    </>
  )
}
