import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'Client Experiences', description: 'Read experiences shared by AstroVision clients and visit our Google listing.'};
export default function Page() { return <Home page="reviews"/>; }
