import { Helmet } from 'react-helmet-async'
import AboutSection from '@/components/sections/AboutSection'
export default function About() {
  return (<><Helmet><title>О компании — TuranLogix</title></Helmet><div><AboutSection /></div></>)
}
