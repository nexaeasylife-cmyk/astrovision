import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'Frequently Asked Questions', description: 'Answers about readings, booking, privacy, languages, and what to expect.'};
export default function Page() { return <Home page="faq"/>; }
