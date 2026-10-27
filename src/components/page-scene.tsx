'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { createPageArt, disposePageArt, animatePageArt, type ArtTheme } from '@/lib/page-art';

function Sculpture({ theme, onReady }: { theme: ArtTheme; onReady: () => void }) {
  const model = useMemo(() => createPageArt(theme), [theme]);
  const rendered = useRef(false);
  useEffect(() => () => disposePageArt(model), [model]);
  useFrame(({ clock }) => {
    animatePageArt(model, clock.elapsedTime);
    if (!rendered.current) { rendered.current = true; onReady(); }
  });
  return <primitive object={model}/>;
}
export default function PageScene({ theme, onReady }: { theme: ArtTheme; onReady: () => void }) {
  return <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0, 10], fov: 40 }} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} aria-hidden="true">
    <ambientLight intensity={1.8}/><directionalLight position={[-3, 5, 6]} intensity={2.5}/><directionalLight position={[4, -2, 2]} intensity={1.3} color="#76cacc"/>
    <Sculpture theme={theme} onReady={onReady}/>
  </Canvas>;
}
