import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import HeroRotating from '@/components/redesign/HeroRotating'
import StatsBar from '@/components/redesign/StatsBar'
import ServicesGrid from '@/components/redesign/ServicesGrid'

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>Turan Logix — {t('redesign.logoSubtitle')}</title>
      </Helmet>
      <HeroRotating />
      <StatsBar />
      <ServicesGrid
        count={3}
        eyebrow={t('redesign.servicesPage.homeEyebrow')}
        title={t('redesign.servicesPage.homeTitle')}
      />
    </>
  )
}
