import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'About AstroVision', description: 'Traditional astrology and personal guidance in Nicosia, available in six consultation languages.'};
export default function Page() { return <Home page="about"/>; }
