import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'Book an Appointment', description: 'Request a consultation in English, Greek, French, Dutch, Turkish, or Hindi.'};
export default function Page() { return <Home page="book"/>; }
