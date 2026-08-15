import { motion } from 'framer-motion';

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] } },
};


function StarRow({ rating = 4.56 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-gold-accent text-[16px] select-none"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}
        >
          star
        </span>
      );
    } else if (rating > i - 1) {
      const fillPct = (rating - (i - 1)) * 100;
      stars.push(
        <div key={i} className="relative inline-flex text-[16px] w-[16px] h-[16px] select-none leading-none">
          <span
            className="material-symbols-outlined text-gold-accent/20 text-[16px] absolute top-0 left-0"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 500" }}
          >
            star
          </span>
          <div
            className="absolute top-0 left-0 overflow-hidden h-full"
            style={{ width: `${fillPct}%` }}
          >
            <span
              className="material-symbols-outlined text-gold-accent text-[16px] block w-[16px]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}
            >
              star
            </span>
          </div>
        </div>
      );
    } else {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-gold-accent/20 text-[16px] select-none"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 500" }}
        >
          star
        </span>
      );
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default function ClientTestimonials() {
  const clientCount = '120+';
  const ratingAvg = '4.56';
  const rateCount = '98';

  return (
    <section className="relative pt-[55px] md:pt-[56px] pb-[55px] md:pb-[56px] px-margin-mobile md:px-margin-desktop bg-surface-container overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[10%] right-[4%] w-[500px] h-[500px] rounded-full bg-primary/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[12%] left-[2%] w-[480px] h-[480px] rounded-full bg-gold-accent/[0.05] blur-[120px] pointer-events-none" />

      <div className="relative max-w-container-max mx-auto">
        {/* Section header */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-0 flex flex-col md:flex-row md:items-end md:justify-between gap-stack-lg"
        >
          <div className="max-w-2xl">
            <p className="font-sans-premium text-label-premium uppercase tracking-[0.35em] text-primary-fixed-dim mb-stack-md">
              Client Stories
            </p>
            <h2 className="font-display text-[2.1rem] md:text-display-section text-white leading-[1.05] tracking-tight">
              What We've{' '}
              <span className="italic text-gradient-purple">Been Upto.</span>
            </h2>
            <p className="font-sans-premium text-body-lg text-on-surface-variant mt-stack-md max-w-xl">
              Real words from people we’ve worked with — from colleges and families to government teams, brands, and creators who trusted us with their stories and special moments.
            </p>
            <div className="mt-stack-md w-[140px] h-[2px] rounded-full bg-gradient-to-r from-primary via-gold-accent to-transparent" />
          </div>

          {/* Stat pill row */}
          <div className="flex flex-wrap gap-stack-sm shrink-0">
            <div className="flex items-center gap-stack-sm px-5 py-3 rounded-full border border-white/[0.07] bg-inverse-surface/60 backdrop-blur">
              <div className="flex flex-col">
                <span className="font-display text-gold-accent text-[1.15rem] leading-none tabular-nums">{ratingAvg}</span>
                <span className="font-sans-premium text-[9px] uppercase tracking-[0.22em] text-on-surface-variant/80 mt-1">
                  Avg. Rating
                </span>
              </div>
              <StarRow rating={parseFloat(ratingAvg)} />
            </div>
            <div className="flex items-center gap-stack-sm px-5 py-3 rounded-full border border-white/[0.07] bg-inverse-surface/60 backdrop-blur">
              <div className="flex flex-col">
                <span className="font-display text-primary text-[1.15rem] leading-none tabular-nums">{clientCount}</span>
                <span className="font-sans-premium text-[9px] uppercase tracking-[0.22em] text-on-surface-variant/80 mt-1">
                  Happy Clients
                </span>
              </div>
              <span className="w-9 h-9 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                  favorite
                </span>
              </span>
            </div>
            <div className="flex items-center gap-stack-sm px-5 py-3 rounded-full border border-white/[0.07] bg-inverse-surface/60 backdrop-blur">
              <div className="flex flex-col">
                <span className="font-display text-white text-[1.15rem] leading-none tabular-nums">{rateCount}%</span>
                <span className="font-sans-premium text-[9px] uppercase tracking-[0.22em] text-on-surface-variant/80 mt-1">
                  Repeat Rate
                </span>
              </div>
              <span className="w-9 h-9 rounded-full border border-white/10 bg-surface-container-highest flex items-center justify-center text-white/70">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                  repeat
                </span>
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
