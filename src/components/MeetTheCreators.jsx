// import { useEffect, useRef, useState } from 'react';
// import { motion, useInView } from 'framer-motion';

// //import pritam from '../assets/pritam.jpeg';
// //import devsankar from '../assets/devsankar.jpeg';

// const CREATORS = [
//   {
//     name: 'PRITAM',
//     role: 'Creative Director',
//     roleTint: 'from-primary/40',
//     badge: 'Lead Vision',
//     image: pritam,
//     bio:
//       'Bringing stories to life through cinematography, photography and creative editing with a passion for visual storytelling.',
//     icon: 'movie_edit',
//     tint: 'rgba(95,46,255,0.30)',
//   },
//   {
//     name: 'DEVSANKAR',
//     role: 'Drone Operator & Production Assistant',
//     roleTint: 'from-gold-accent/32',
//     badge: 'Aerial & Production',
//     image: devsankar,
//     bio:
//       'Capturing unique perspectives from the sky while supporting seamless production for every project.',
//     icon: 'flight',
//     tint: 'rgba(242,201,76,0.26)',
//   },
// ];

// function useCountUp(target, opts = {}) {
//   const { duration = 1800, start = false } = opts;
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     if (!start) return;
//     let raf;
//     const t0 = performance.now();
//     const tick = (t) => {
//       const p = Math.min(1, (t - t0) / duration);
//       const eased = 1 - Math.pow(1 - p, 3);
//       setVal(Math.round(target * eased));
//       if (p < 1) raf = requestAnimationFrame(tick);
//     };
//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [target, duration, start]);
//   return val;
// }

// function StatTile({ stat, index }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: '-40px' });
//   const current = useCountUp(stat.value, { duration: 1900, start: inView });

//   const isK = stat.suffix === 'K+';
//   const displayNum = isK ? current : current.toLocaleString('en-IN');

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 28 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: '-20px' }}
//       transition={{ delay: index * 0.08, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
//       className="relative flex flex-col items-center md:items-start gap-stack-xs md:gap-stack-sm p-stack-sm md:p-stack-md rounded-[16px] bg-surface-container-highest/40 border border-white/[0.06] hover:border-primary/25 hover:bg-surface-container-highest/70 backdrop-blur transition-all duration-600 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(95,46,255,0.18)]"
//     >
//       <div className="flex items-baseline gap-1">
//         <span className={`font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-none tracking-tight ${stat.accent}`}>
//           {displayNum}
//           <span className="tabular-nums">{stat.suffix}</span>
//         </span>
//       </div>
//       <span className="font-sans-premium text-[10px] md:text-label-sm uppercase tracking-[0.24em] text-on-surface-variant/80 max-w-[16ch] md:text-left text-center">
//         {stat.label}
//       </span>
//       {stat.special && (
//         <span className="absolute top-stack-xs right-stack-xs inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary-fixed-dim text-[9px] uppercase tracking-[0.2em]">
//           <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
//           Multiple
//         </span>
//       )}
//     </motion.div>
//   );
// }

// const sectionVariant = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1, y: 0,
//     transition: { duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] },
//   },
// };

// export default function MeetTheCreators() {
//   return (
//     <section className="relative pt-[55px] md:pt-[56px] pb-[55px] md:pb-[56px] px-margin-mobile md:px-margin-desktop bg-background overflow-hidden">
//       <div className="absolute top-[12%] left-[6%] w-[480px] h-[480px] rounded-full bg-primary/[0.07] blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[6%] right-[4%] w-[460px] h-[460px] rounded-full bg-gold-accent/[0.06] blur-[120px] pointer-events-none" />

//       <div className="relative max-w-container-max mx-auto">
//         <motion.div
//           variants={sectionVariant}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-100px' }}
//           className="mb-[48px] md:mb-[64px]"
//         >
//           <p className="font-sans-premium text-label-premium uppercase tracking-[0.35em] text-primary-fixed-dim mb-stack-md">
//             Meet The Creators
//           </p>
//           <h2 className="font-display text-[2.1rem] md:text-display-section text-white leading-[1.05] tracking-tight max-w-2xl">
//             Behind Every Great{' '}
//             <span className="italic text-gradient-purple">Story.</span>
//           </h2>
//           <p className="font-sans-premium text-body-lg text-on-surface-variant mt-stack-md max-w-xl">
//             Two minds, one cinematic vision. Every frame you see is crafted by the hands behind the camera, the drone, and the edit suite.
//           </p>
//           <div className="mt-stack-md w-[120px] h-[2px] rounded-full bg-gradient-to-r from-primary via-gold-accent to-transparent" />
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-[36px] md:gap-[30px] md:max-w-[700px] mx-auto mb-0">
//           {CREATORS.map((c, i) => (
//             <motion.article
//               key={c.name}
//               initial={{ opacity: 0, y: 48 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-60px' }}
//               transition={{ delay: i * 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
//               className="group relative max-w-[320px] w-full mx-auto"
//             >
//               <div className="relative overflow-hidden rounded-[20px] md:rounded-[24px] border border-white/[0.06] bg-surface-container/60 backdrop-blur transition-all duration-700 hover:border-primary/30 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(95,46,255,0.12)]">
//                 <div className="relative aspect-[4/5] overflow-hidden">
//                   <img
//                     src={c.image}
//                     alt={c.name}
//                     loading="lazy"
//                     className="w-full h-full object-cover transition-transform duration-[2200ms] ease-out group-hover:scale-108"
//                   />
//                   <div className={`absolute inset-0 bg-gradient-to-t ${c.roleTint} via-transparent to-transparent opacity-70 mix-blend-screen pointer-events-none`} />
//                   <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/30 to-transparent pointer-events-none" />
//                   <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.35)] pointer-events-none" />
//                   <div className="absolute inset-0 border-[1.5px] border-primary/0 group-hover:border-primary/55 transition-all duration-600 pointer-events-none rounded-[20px] md:rounded-[24px]" />
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none shadow-[inset_0_0_60px_rgba(95,46,255,0.18)] rounded-[20px] md:rounded-[24px]" />

//                   <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-inverse-surface/80 backdrop-blur border border-white/10 text-white text-[9px] uppercase tracking-[0.2em]">
//                     <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
//                       {c.icon}
//                     </span>
//                     {c.badge}
//                   </div>

//                   <div className="absolute left-5 bottom-5 right-5">
//                     <div className="flex flex-col gap-stack-xs">
//                       <h3 className="font-display text-[22px] md:text-[25px] leading-none tracking-[0.08em] text-white">
//                         {c.name}
//                       </h3>
//                       <p className="font-sans-premium text-[10px] md:text-label-sm uppercase tracking-[0.22em] text-primary-fixed-dim">
//                         {c.role}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
