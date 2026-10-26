import type { MetadataRoute } from 'next';
import { services, articles } from '@/data/content';
export default function sitemap(): MetadataRoute.Sitemap {
 const origin=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,'');
 if(!origin)return [];
 return ['','/about','/services','/how-it-works','/reviews','/faq','/contact','/book','/horoscope','/blog','/privacy','/terms',...services.map(s=>`/services/${s.slug}`),...articles.map(a=>`/blog/${a.slug}`)].map(path=>({url:`${origin}${path}`,changeFrequency:'monthly',priority:path===''?1:.7}));
}
