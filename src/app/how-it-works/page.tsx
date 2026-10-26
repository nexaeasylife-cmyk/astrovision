import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'How It Works', description: 'From your first conversation to your follow-up: what to expect from an AstroVision consultation.'};
export default function Page() { return <Home page="how-it-works"/>; }
