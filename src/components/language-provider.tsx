'use client';

import { Children, cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Globe2 } from 'lucide-react';

export const websiteLanguages = [
  ['en', 'English'], ['el', 'Ελληνικά'], ['fr', 'Français'],
  ['nl', 'Nederlands'], ['tr', 'Türkçe'], ['hi', 'हिन्दी'],
] as const;
type Dictionary = Record<string, string>;
const LanguageContext = createContext({ locale: 'en', pending: false, error: '', changeLanguage: (_code: string) => {}, t: (text: string) => text, localize: (node: ReactNode): ReactNode => node });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en');
  const [dictionary, setDictionary] = useState<Dictionary>({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(0);
  const cache = useRef<Record<string, Dictionary>>({ en: {} });
  const changeLanguage = useCallback(async (code: string) => {
    if (!websiteLanguages.some(([value]) => value === code)) return;
    const id = ++request.current;
    setPending(true); setError('');
    try {
      if (!cache.current[code]) {
        const response = await fetch(`/locales/${code}.json`);
        if (!response.ok) throw new Error('Translation unavailable');
        cache.current[code] = await response.json();
      }
      if (id !== request.current) return;
      setDictionary(cache.current[code]); setLocale(code);
      document.documentElement.lang = code;
      try { localStorage.setItem('astrovision-language', code); } catch { /* Storage may be disabled. */ }
    } catch {
      if (id === request.current) setError('Could not load this language. Please try again.');
    } finally { if (id === request.current) setPending(false); }
  }, []);
  useEffect(() => {
    try { const saved = localStorage.getItem('astrovision-language'); if (saved) void changeLanguage(saved); } catch { /* English remains usable. */ }
  }, [changeLanguage]);

  const t = useCallback((text: string) => {
    const key = text.trim();
    return dictionary[key] ? text.replace(key, dictionary[key]) : text;
  }, [dictionary]);

  // Translate the React render tree, never the DOM. React retains ownership of
  // form state and updates. URLs, identifiers, values, and user input stay intact.
  const localize = useCallback(function translate(node: ReactNode): ReactNode {
    if (typeof node === 'string') return t(node);
    if (Array.isArray(node)) return Children.map(node, translate);
    if (!isValidElement<Record<string, unknown>>(node)) return node;
    if (node.props.translate === 'no') return node;
    const props: Record<string, unknown> = {};
    {
      for (const attribute of ['aria-label', 'placeholder', 'title', 'alt']) {
        if (typeof node.props[attribute] === 'string') props[attribute] = t(node.props[attribute] as string);
      }
      // Translating an option must not change its submitted value.
      if (node.type === 'option' && node.props.value === undefined && typeof node.props.children === 'string') props.value = node.props.children;
    }
    if ('children' in node.props) props.children = translate(node.props.children as ReactNode);
    return cloneElement(node, props);
  }, [t]);
  const value = useMemo(() => ({ locale, pending, error, changeLanguage, t, localize }), [locale, pending, error, changeLanguage, t, localize]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);

export function LanguageSwitcher() {
  const { locale, pending, error, changeLanguage, t } = useLanguage();
  return <div className="language-control" translate="no">
    <label className="language-select"><Globe2 size={16} aria-hidden="true"/><span className="sr-only">{t('Website language')}</span>
      <select aria-label={t('Website language')} value={locale} aria-busy={pending} onChange={event => changeLanguage(event.target.value)}>
        {websiteLanguages.map(([code, name]) => <option value={code} key={code} lang={code}>{name}</option>)}
      </select>
    </label>
    <span className={error ? 'language-error' : 'sr-only'} role="status">{error ? t(error) : pending ? t('Loading language…') : ''}</span>
  </div>;
}
