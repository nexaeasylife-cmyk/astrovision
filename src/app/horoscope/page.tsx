import type { Metadata } from 'next';
import Home from '@/components/home';
export const metadata: Metadata = {title: 'Daily Zodiac Reflections', description: 'Explore daily zodiac reflections, find your sun sign, or request a personal birth-chart reading.'};
export default function Page() { return <Home page="horoscope"/>; }
