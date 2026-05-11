import { Helmet } from 'react-helmet-async'
import ContactsSection from '@/components/sections/ContactsSection'
export default function Contacts() {
  return (<><Helmet><title>Контакты — TuranLogix</title></Helmet><div className="pt-20"><ContactsSection /></div></>)
}
