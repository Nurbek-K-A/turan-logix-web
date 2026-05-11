import { Helmet } from 'react-helmet-async'
import AboutSection from '@/components/sections/AboutSection'
export default function About() {
  return (<><Helmet><title>О компании — TuranLogix</title></Helmet><div className="pt-20"><AboutSection /></div></>)
}
