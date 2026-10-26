import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'The AstroVision Journal', description: 'Thoughtful notes on astrology, preparing for a reading, and everyday reflection.'};
export default function Page() { return <Home page="blog"/>; }
