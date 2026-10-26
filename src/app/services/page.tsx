import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'Our Services', description: 'Explore relationship guidance, traditional readings, spiritual practices, and career consultations.'};
export default function Page() { return <Home page="services"/>; }
