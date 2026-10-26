'use client';
import Link from 'next/link';
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="error-page"><h1>A moment to reconnect.</h1><p>We couldn’t load this page. Please try again.</p><div className="actions"><button className="button" onClick={reset}>Try again</button><Link href="/" className="button outline">Return home</Link></div></main>;}
