import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import Celestial from '@/components/celestial';

const heading = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-heading' });
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
export const metadata: Metadata = { title: { default: 'AstroVision | Personal Astrology & Spiritual Guidance', template: '%s | AstroVision' }, icons: { icon: '/images/astro-vision-logo.webp', apple: '/images/astro-vision-logo.webp' }, description: 'Traditional astrology and spiritual guidance. A calm space for your questions about relationships, work, and life.' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en" data-scroll-behavior="smooth"><body className={`${heading.variable} ${body.variable}`}><Celestial/>{children}</body></html>; }
