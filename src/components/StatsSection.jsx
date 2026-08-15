import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 35, suffix: '+',  label: 'Projects Covered', accent: 'text-primary', },
  { value: 22, suffix: '+',  label: 'Events Covered', accent: 'text-white', },
  { value: 15, suffix: '+', label: 'Brand Marketing', accent: 'text-gold-accent', },
  { value: 5,   suffix: '+',   label: 'Government Collaborations', accent: 'text-primary-fixed-dim', special: true },
];

function useCountUp(target, opts = {}) {
  const { duration = 1800, start = false } = opts;
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function StatTile({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const current = useCountUp(stat.value, { duration: 1900, start: inView });

  const isK = stat.suffix === 'K+';
  const displayNum = isK ? current : current.toLocaleString('en-IN');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col items-center md:items-start gap-stack-xs md:gap-stack-sm p-stack-sm md:p-stack-md rounded-[16px] bg-surface-container-highest/40 border border-white/[0.06] hover:border-primary/25 hover:bg-surface-container-highest/70 backdrop-blur transition-all duration-600 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(95,46,255,0.18)]"
    >
      <div className="flex items-baseline gap-1">
        <span className={`font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-tight ${stat.accent}`}>
          {displayNum}
          <span className="tabular-nums">{stat.suffix}</span>
        </span>
      </div>
      <span className="font-sans-premium text-[10px] md:text-label-sm uppercase tracking-[0.24em] text-on-surface-variant/80 max-w-[16ch] md:text-left text-center">
        {stat.label}
      </span>
      {stat.special && (
        <span className="absolute top-stack-xs right-stack-xs inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary-fixed-dim text-[9px] uppercase tracking-[0.2em]">
          <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
          Multiple
        </span>
      )}
    </motion.div>
  );
}

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function StatsSection() {
  return (
    <section className="relative pt-[56px] md:pt-[64px] pb-[56px] md:pb-[64px] px-margin-mobile md:px-margin-desktop bg-background overflow-hidden">
      <div className="relative max-w-container-max mx-auto">
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="relative rounded-[24px] md:rounded-[28px] p-stack-md md:p-stack-xl bg-surface-container/60 backdrop-blur-xl border border-white/[0.07] overflow-hidden"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[240px] rounded-full bg-primary/[0.14] blur-[120px] pointer-events-none" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {STATS.map((s, i) => (
              <StatTile key={s.label} stat={s} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
