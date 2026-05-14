import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/redesign/PageHeader'
import RouteNetworkMap from '@/components/redesign/RouteNetworkMap'
import RoutesTable from '@/components/redesign/RoutesTable'

export default function Routes() {
  const { t } = useTranslation()
  const rp = t('redesign.routesPage', { returnObjects: true }) as Record<string, string>

  return (
    <>
      <Helmet><title>{t('nav.routes')} — Turan Logix</title></Helmet>
      <PageHeader
        eyebrow={rp.eyebrow}
        title={rp.title}
        accentTitle={rp.accentTitle}
        subtitle={rp.subtitle}
      />
      <RouteNetworkMap />
      <RoutesTable />
    </>
  )
}
