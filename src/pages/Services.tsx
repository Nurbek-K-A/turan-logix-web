import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/redesign/PageHeader'
import ServicesGrid from '@/components/redesign/ServicesGrid'

export default function Services() {
  const { t } = useTranslation()
  const sp = t('redesign.servicesPage', { returnObjects: true }) as Record<string, string>

  return (
    <>
      <Helmet><title>{t('nav.services')} — Turan Logix</title></Helmet>
      <PageHeader
        eyebrow={sp.eyebrow}
        title={sp.title}
        accentTitle={sp.accentTitle}
        subtitle={sp.subtitle}
      />
      <ServicesGrid count={6} title={sp.gridTitle} />
    </>
  )
}
