import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'Let’s Talk', description: 'Contact AstroVision in Nicosia and prepare your personal consultation enquiry.'};
export default function Page() { return <Home page="contact"/>; }
