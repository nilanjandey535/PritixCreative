import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FilterModal from './FilterModal.jsx';

import heroImg from '../assets/brand.jpeg';
import festival from '../assets/photo.jpeg';
import video from '../assets/other.jpeg';
import brand from '../assets/brand.jpg';

const LABEL_FROM_ID = {
  photography: '',
  other: '',
  'brand-design': '',
  'social-media': '',
};

const CATEGORIES = [
  {
    id: 'photography',
    cta: 'Explore Photography',
    hero: festival,
    tint: 'from-primary/40',
  },
  {
    id: 'social-media',
    cta: 'Explore Videos',
    hero: video,
    tint: 'from-primary-fixed-dim/30',
  },
  {
    id: 'brand-design',
    cta: 'Brand',
    hero: brand,
    tint: 'from-secondary/40',
  },
  {
    id: 'other',
    cta: 'Other',
    hero: heroImg,
    tint: 'from-gold-accent/30',
  },
];

const GRID_LAYOUT = {
  photography: 'md:col-span-4 aspect-[16/10]',
  'social-media': 'md:col-span-2 aspect-[4/5]',
  other: 'md:col-span-3 aspect-[4/3]',
  'brand-design': 'md:col-span-3 aspect-[4/3]',
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.85,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function WhatWeCreate() {
  const [activeFilter, setActiveFilter] = useState(null);

  const openFilter = (id) => () => setActiveFilter(id);
  const closeFilter = () => setActiveFilter(null);

  return (
    <>
      <section className="relative pt-[55px] md:pt-[56px] pb-[55px] md:pb-[56px] px-margin-mobile md:px-margin-desktop bg-surface-container overflow-hidden" id="work">
        {/* Ambient background glows */}
        <div className="absolute top-[8%] -left-40 w-[520px] h-[520px] rounded-full bg-primary/[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] -right-40 w-[520px] h-[520px] rounded-full bg-gold-accent/[0.05] blur-[120px] pointer-events-none" />

        <div className="relative max-w-container-max mx-auto">
          {/* Section Header — matches "Stories We've Captured" style */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            className="mb-[48px] md:mb-[50px]"
          >
            <h2 className="font-display text-headline-xl md:text-headline-xl text-white leading-tight tracking-tight inline-block">
              Our Work
            </h2>
            <div className="mt-stack-sm w-[88px] h-[3px] rounded-full bg-gradient-to-r from-primary via-gold-accent to-primary" />
          </motion.div>

          {/* Bento Grid — matches the reference layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-gutter md:gap-[22px]">
            {CATEGORIES.map((cat, idx) => {
              const label = LABEL_FROM_ID[cat.id];
              const selected = cat.id === 'other';
              return (
                <motion.div
                  key={cat.id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className={`${GRID_LAYOUT[cat.id]} group`}
                >
                  <button
                    type="button"
                    onClick={openFilter(cat.id)}
                    className={`relative block w-full h-full overflow-hidden rounded-[20px] bento-card text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 ${selected ? 'ring-3 ring-offset-[6px] ring-offset-surface-container ring-primary shadow-[0_0_40px_rgba(95,46,255,0.35)]' : ''}`}
                    aria-label={`Open ${label} gallery — ${cat.cta}`}
                  >
                    {/* Image */}
                    <img
                      src={cat.hero}
                      alt={label}
                      className="w-full h-full object-cover bento-img transition-transform duration-[1600ms] ease-out"
                      loading="lazy"
                    />
                    {/* Category tint + dark gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.tint} via-transparent to-transparent opacity-80 mix-blend-screen pointer-events-none`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/92 via-inverse-surface/35 to-inverse-surface/10 pointer-events-none" />
                    {/* Darken slightly on hover */}
                    <div className="absolute inset-0 bg-inverse-surface/0 group-hover:bg-inverse-surface/25 transition-colors duration-600 pointer-events-none" />
                    {/* Purple border fade on hover */}
                    <div className={`absolute inset-0 rounded-[20px] transition-all duration-600 pointer-events-none ${selected ? 'border-0' : 'border-[1.5px] border-white/0 group-hover:border-primary/60'}`} />
                    {/* Inner purple glow on hover */}
                    <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none shadow-[inset_0_0_70px_rgba(95,46,255,0.18)]" />
                    {/* Selected inner edge glow */}
                    {selected && (
                      <div className="absolute inset-[3px] rounded-[18px] pointer-events-none shadow-[inset_0_0_50px_rgba(95,46,255,0.22)]" />
                    )}

                    {/* Card Content: label + title */}
                    <div className="absolute left-5 md:left-8 bottom-5 md:bottom-7 right-5 md:right-8 flex flex-col gap-1 md:gap-1.5 pointer-events-none">
                      <span className="font-sans-premium text-[11px] md:text-label-sm uppercase tracking-[0.28em] text-primary-fixed-dim">
                        {label}
                      </span>
                      <span className="font-display text-[clamp(1.4rem,2vw,2.2rem)] text-white leading-tight tracking-[-0.01em]">
                        {cat.cta.replace(/^Explore /, '').replace(/ Collection$/, '')}
                      </span>
                    </div>

                    {/* View pill CTA slides down on hover */}
                    <div className="absolute right-5 md:right-7 top-5 md:top-7 overflow-hidden pointer-events-none">
                      <span className="bento-cta inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-white font-sans-premium text-[11px] uppercase tracking-[0.2em]">
                        View More
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                          arrow_outward
                        </span>
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Subtext below grid (curiosity-driving) */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-[48px] md:mt-[64px] flex flex-col md:flex-row md:items-end md:justify-between gap-stack-md border-t border-white/[0.06] pt-stack-lg"
          >
            <Link
              to="/contact"
              className="group self-start md:self-end inline-flex items-center gap-3 px-7 py-3 border border-white/20 text-white font-sans-premium text-sm uppercase tracking-[0.18em] font-medium hover:border-primary hover:text-primary transition-all duration-500"
            >
              <span className="relative z-10">Start a Project</span>
              <span className="material-symbols-outlined text-lg relative z-10 transform transition-transform duration-500 group-hover:translate-x-1" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                arrow_forward
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Popup Modal */}
      <FilterModal filterId={activeFilter} onClose={closeFilter} />
    </>
  );
}
