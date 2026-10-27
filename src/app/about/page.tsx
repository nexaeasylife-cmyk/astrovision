import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'About AstroVision', description: 'Discover AstroVision in Nicosia: traditional astrology, personal reflection, and a clear, respectful approach to your questions.'};
export default function Page() { return <Home page="about"/>; }
