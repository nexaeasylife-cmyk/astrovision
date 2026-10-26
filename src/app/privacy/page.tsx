import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'Privacy Policy', description: 'How AstroVision’s website handles enquiry information and third-party services.'};
export default function Page() { return <Home page="privacy"/>; }
