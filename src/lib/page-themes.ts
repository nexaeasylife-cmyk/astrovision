export const artThemes = ['home', 'about', 'services', 'how-it-works', 'reviews', 'contact', 'book', 'horoscope', 'blog', 'faq', 'privacy', 'terms'] as const;
export type ArtTheme = typeof artThemes[number];
export function pageArt(path: string): ArtTheme {
  const section = path.split('/')[1] || 'home';
  return artThemes.includes(section as ArtTheme) ? section as ArtTheme : 'faq';
}
