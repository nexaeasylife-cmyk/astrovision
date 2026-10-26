import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'Terms of Use', description: 'Understand the scope of AstroVision’s traditional and belief-based guidance.'};
export default function Page() { return <Home page="terms"/>; }
