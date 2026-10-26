'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Heart, BriefcaseBusiness, Sparkles, Compass, Shield, Flame } from 'lucide-react';

const illustrations = {
  together: Heart,
  growth: BriefcaseBusiness,
  lotus: Sparkles,
  rings: Compass,
  protection: Shield,
  devotion: Flame,
};

export default function ServiceArt({ mark, number }: { mark: string; number: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: .15 });
  const Icon = illustrations[mark as keyof typeof illustrations] ?? Compass;

  return <div ref={ref} className={`service-art ${mark}`} data-visible={visible} aria-hidden="true">
    <span className="service-orbit"><span /></span>
    <Icon />
    <span className="art-index">{number}</span>
    <span className="service-constellation">✧</span>
  </div>;
}
