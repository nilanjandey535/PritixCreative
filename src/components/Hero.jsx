import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';

const SKILLS = [
  'VIDEO PRODUCTION',
  'VIDEO EDITING',
  'GRAPHIC DESIGN',
  'DIGITAL MARKETING',
  'SOCIAL MEDIA',
  'BRANDING',
  'CONTENT CREATION',
  'CREATOR PRODUCTION',
];

const PURPLE = '#A66BFF';
const PURPLE_DEEP = '#5F2EFF';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const fn = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return isMobile;
}

function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

export default function Hero() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const primaryRef = useRef(null);
  const copyLRef = useRef(null);
  const copyRRef = useRef(null);
  const counterRef = useRef(null);
  const trackRef = useRef(null);
  const eyebrowRef = useRef(null);
  const progressRef = useRef(null);
  const autoRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef(null);
  const progressTLRef = useRef(null);
  const directionRef = useRef(1);
  const mountedRef = useRef(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const isMobile = useIsMobile();
  const width = useWindowWidth();
  const isTablet = width >= 768 && width < 1400;

  const fontSize = isMobile
    ? 'clamp(2.2rem, 11vw, 5.4rem)'
    : isTablet
      ? 'clamp(3.0rem, 6.4vw, 6.8rem)'
      : 'clamp(3.6rem, 8vw, 7.8rem)';
  const counterBig = isMobile ? '1.1rem' : '1.35rem';
  const counterSmall = isMobile ? '0.85rem' : '1rem';

  const current = SKILLS[activeIdx];
  const hasTwoWords = current.includes(' ');
  const stageH = isMobile && hasTwoWords ? 340 : isMobile ? 260 : isTablet ? 300 : 360;

  const handleScrollClick = () => {
    const nextSection = document.getElementById('stats-section');
    if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
  };

  const splitWord = useMemo(() => {
    const isSpace = (ch) => ch === ' ';
    const list = current.split('');
    const spaceIndex = list.findIndex(isSpace);
    return {
      chars: list,
      spaceIndex,
      renderChar: (variant, i) => {
        const ch = list[i];
        const space = isSpace(ch);
        let origin;
        if (variant === 'l') origin = '0% 50%';
        else if (variant === 'r') origin = '100% 50%';
        else origin = '50% 100%';
        return { ch: space ? '\u00A0' : ch, space, origin, variant };
      },
    };
  }, [current]);

  // Animate entrance for each skill transition
  useEffect(() => {
    const primary = primaryRef.current;
    const copyL = copyLRef.current;
    const copyR = copyRRef.current;
    if (!primary || !copyL || !copyR) return;
    const chars = primary.querySelectorAll('[data-char]');
    const lSpan = copyL.querySelectorAll('[data-char]');
    const rSpan = copyR.querySelectorAll('[data-char]');
    const dir = directionRef.current || 1;

    // FIRST — Set hard static visible state (guarantees render regardless of GSAP)
    gsap.killTweensOf([primary, copyL, copyR, chars, lSpan, rSpan]);
    gsap.set(primary, { opacity: 1, visibility: 'visible', display: 'flex' });
    gsap.set(chars, { yPercent: 0, opacity: 1, skewY: 0, scale: 1, filter: 'none' });
    gsap.set(copyL, { opacity: 0.12, visibility: 'visible', display: 'flex', x: -6, clipPath: 'inset(0 0% 0 0%)' });
    gsap.set(copyR, { opacity: 0.08, visibility: 'visible', display: 'flex', x: 6, clipPath: 'inset(0 0% 0 0%)' });

    // THEN — Apply entrance animation on top
    gsap.fromTo(
      chars,
      { yPercent: 140 * dir, opacity: 0, skewY: 6 * dir },
      {
        yPercent: 0,
        opacity: 1,
        skewY: 0,
        scale: 1,
        filter: 'none',
        duration: 0.95,
        stagger: { each: 0.025, from: 'start' },
        ease: 'expo.out',
        overwrite: 'auto',
      }
    );
    gsap.fromTo(
      copyL,
      { clipPath: 'inset(0 50% 0 50%)', opacity: 0, x: -16 },
      {
        clipPath: 'inset(0 0% 0 0%)',
        opacity: 0.12,
        x: -10,
        duration: 0.85,
        ease: 'power3.out',
        overwrite: 'auto',
      }
    );
    gsap.fromTo(
      copyR,
      { clipPath: 'inset(0 50% 0 50%)', opacity: 0, x: 16 },
      {
        clipPath: 'inset(0 0% 0 0%)',
        opacity: 0.08,
        x: 10,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.05,
        overwrite: 'auto',
      }
    );

    if (counterRef.current) {
      gsap.fromTo(
        counterRef.current,
        { yPercent: 70, opacity: 0, filter: 'blur(6px)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.55,
          ease: 'expo.out',
        }
      );
    }

    if (progressTLRef.current) progressTLRef.current.kill();
    if (progressRef.current) {
      progressTLRef.current = gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          ease: 'none',
          transformOrigin: 'left center',
        }
      );
    }
  }, [activeIdx]);

  // Overall chrome/entrance + stage visibility + interactions
  useEffect(() => {
    mountedRef.current = true;
    const stage = stageRef.current;
    const eyebrow = eyebrowRef.current;
    const track = trackRef.current;
    const counter = counterRef.current;
    const primary = primaryRef.current;
    const copyL = copyLRef.current;
    const copyR = copyRRef.current;

    // Hard failsafe: stage, all layers visible from start (opacity inline removed, only use fromTo)
    if (stage) {
      gsap.set(stage, { opacity: 1, visibility: 'visible', display: 'flex', filter: 'none' });
    }
    [primary, copyL, copyR].forEach((el) => {
      if (!el) return;
      let op = 0.2;
      if (el === primary) op = 1;
      else if (el === copyL) op = 0.12;
      else if (el === copyR) op = 0.08;
      gsap.set(el, { opacity: op, visibility: 'visible', display: 'flex' });
      const spans = el.querySelectorAll('[data-char]');
      gsap.set(spans, { yPercent: 0, opacity: 1, rotateX: 0, skewY: 0 });
    });

    const tl = gsap.timeline();
    if (eyebrow) {
      tl.fromTo(
        eyebrow,
        { y: 30, opacity: 0, filter: 'blur(6px)' },
        { y: 0, opacity: 1, filter: 'none', duration: 0.9, ease: 'expo.out', clearProps: 'filter' },
        0
      );
    }
    if (track) {
      tl.fromTo(
        track,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'expo.inOut',
          transformOrigin: 'left center',
        },
        0.15
      );
    }
    if (counter) {
      tl.fromTo(
        counter,
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'none', duration: 0.8, ease: 'expo.out', clearProps: 'filter' },
        0.35
      );
    }
    if (stage) {
      tl.fromTo(
        stage,
        { scale: 1, y: 12, filter: 'none' },
        { scale: 1, y: 0, filter: 'none', duration: 1.0, ease: 'expo.out', clearProps: 'filter' },
        0.1
      );
    }

    // Rotate through skills
    const auto = setTimeout(() => {
      if (autoRef.current) return;
      autoRef.current = setInterval(() => {
        setActiveIdx((prev) => {
          const next = prev + 1 >= SKILLS.length ? 0 : prev + 1;
          directionRef.current = next > prev ? 1 : -1;
          return next;
        });
      }, 1800);
    }, 2600);

    // Mouse parallax
    const tick = () => {
      const st = stageRef.current;
      if (!st) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const rect = st.getBoundingClientRect();
      if (rect && mouseRef.current.active) {
        const m = mouseRef.current;
        const cx = (m.x - rect.left) / rect.width - 0.5;
        const cy = (m.y - rect.top) / rect.height - 0.5;
        gsap.to(st, {
          x: -cx * 10,
          y: -cy * 6,
          duration: 0.9,
          ease: 'power2.out',
          overwrite: true,
        });
      } else {
        gsap.to(st, {
          x: 0,
          y: 0,
          duration: 1.3,
          ease: 'expo.out',
          overwrite: true,
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const container = containerRef.current;
    const onMove = (e) => {
      const pt = e.touches ? e.touches[0] : e;
      if (!pt) return;
      mouseRef.current.x = pt.clientX;
      mouseRef.current.y = pt.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    container?.addEventListener('mousemove', onMove, { passive: true });
    container?.addEventListener('mouseleave', onLeave);
    container?.addEventListener('touchmove', onMove, { passive: true });
    container?.addEventListener('touchend', onLeave);

    return () => {
      mountedRef.current = false;
      clearTimeout(auto);
      if (autoRef.current) clearInterval(autoRef.current);
      if (progressTLRef.current) progressTLRef.current.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      tl.kill();
      container?.removeEventListener('mousemove', onMove);
      container?.removeEventListener('mouseleave', onLeave);
      container?.removeEventListener('touchmove', onMove);
      container?.removeEventListener('touchend', onLeave);
    };
  }, []);

  // Render helpers
  const renderChars = (variant, keyPrefix) => {
    const si = splitWord.spaceIndex;
    const hasTwoWords = si !== -1;
    const chars = splitWord.chars;

    if (isMobile && hasTwoWords) {
      const firstWordChars = chars.slice(0, si);
      const secondWordChars = chars.slice(si + 1);

      const renderGroup = (groupChars, offset, lineKey) => (
        <div key={`${keyPrefix}-line-${lineKey}-${activeIdx}-${variant}`} className="flex items-center justify-center w-full">
          {groupChars.map((_, j) => {
            const i = offset + j;
            const { origin, space } = splitWord.renderChar(variant, i);
            const isPrimary = variant === 'w';
            return (
              <span
                key={`${keyPrefix}-${activeIdx}-${i}-${variant}`}
                data-char={`${variant}-${i}`}
                className="inline-block"
                style={{
                  transformOrigin: origin,
                  whiteSpace: space ? 'pre' : 'normal',
                  minWidth: space ? '0.4em' : undefined,
                  color: isPrimary ? '#FFFFFF' : undefined,
                  filter: isPrimary ? 'none' : undefined,
                  textShadow: isPrimary ? 'none' : undefined,
                }}
              >
                {space ? '\u00A0' : splitWord.renderChar(variant, i).ch}
              </span>
            );
          })}
        </div>
      );

      return (
        <>
          {renderGroup(firstWordChars, 0, 'a')}
          {renderGroup(secondWordChars, si + 1, 'b')}
        </>
      );
    }

    return chars.map((_, i) => {
      const { origin, space } = splitWord.renderChar(variant, i);
      const isPrimary = variant === 'w';
      return (
        <span
          key={`${keyPrefix}-${activeIdx}-${i}-${variant}`}
          data-char={`${variant}-${i}`}
          className="inline-block"
          style={{
            transformOrigin: origin,
            whiteSpace: space ? 'pre' : 'normal',
            minWidth: space ? '0.4em' : undefined,
            color: isPrimary ? '#FFFFFF' : undefined,
            filter: isPrimary ? 'none' : undefined,
            textShadow: isPrimary ? 'none' : undefined,
          }}
        >
          {space ? '\u00A0' : splitWord.renderChar(variant, i).ch}
        </span>
      );
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      id="home"
      style={{
        background:
          'radial-gradient(ellipse 90% 75% at 50% 45%, #0C1135 0%, #060A1E 50%, #02040E 100%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(166,107,255,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(166,107,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: '110px 110px',
          maskImage:
            'radial-gradient(ellipse at 50% 55%, black 0%, rgba(0,0,0,0.4) 55%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 50% 55%, black 0%, rgba(0,0,0,0.4) 55%, transparent 90%)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 -left-40 w-[620px] h-[620px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${PURPLE_DEEP}33 0%, transparent 65%)`,
          filter: 'blur(40px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 -right-40 w-[620px] h-[620px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${PURPLE}22 0%, transparent 65%)`,
          filter: 'blur(40px)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-[92%] h-[68%] rounded-[40px] border border-white/[0.04]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(95,46,255,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 h-full w-full flex flex-col">
        {/* EYEBROW — fixed top spacing so it never overlaps navbar and doesn't shift on mobile */}
        <div
          ref={eyebrowRef}
          className="flex justify-center mt-[5.5rem] md:mt-[7.5rem] mb-auto px-margin-mobile md:px-margin-desktop"
          style={{ opacity: 0 }}
        >
          <span className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-4 backdrop-blur-md">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: PURPLE, boxShadow: `0 0 10px ${PURPLE}` }}
            />
            <span
              className="font-sans-premium text-[11px] uppercase tracking-[0.32em] font-medium"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              Our Craft · 8 Disciplines
            </span>
          </span>
        </div>

        {/* CENTERED WORD STAGE */}
        <div className="w-full flex items-center justify-center flex-1 py-2 md:py-6 min-h-0 overflow-hidden">
          <div className="w-full">
            <div
              className="relative w-full flex items-center justify-center"
              style={{ minHeight: `${stageH}px` }}
            >
              <div
                ref={stageRef}
                className="relative w-full flex items-center justify-center"
                style={{
                  minHeight: `${stageH}px`,
                  transformStyle: 'preserve-3d',
                  opacity: 0,
                  filter: 'none',
                }}
              >
                {/* PRIMARY WHITE VISIBLE H2 */}
                <h2
                  ref={primaryRef}
                  data-primary-word="true"
                  className="relative z-[4] flex items-center justify-center"
                  style={{
                    width: '100%',
                    minHeight: `${stageH}px`,
                    fontFamily: '"PlusJakartaSans", "DM Sans", Inter, sans-serif',
                    fontWeight: 700,
                    fontSize,
                    lineHeight: 0.95,
                    letterSpacing: '-0.045em',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    mixBlendMode: 'normal',
                    isolation: 'isolate',
                    filter: 'none',
                    textShadow: 'none',
                    WebkitTextStroke: '0.0px',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    flexDirection: isMobile && hasTwoWords ? 'column' : 'row',
                    gap: isMobile && hasTwoWords ? '0.05em' : '0px',
                  }}
                >
                  {renderChars('w', 'p')}
                </h2>

                {/* PURPLE CHROMATIC COPY LAYERS */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  style={{ width: '100%', minHeight: `${stageH}px`, zIndex: 3 }}
                >
                  <div
                    ref={copyLRef}
                    data-copy-l="true"
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      color: PURPLE,
                      opacity: 0.12,
                      fontFamily: '"PlusJakartaSans", "DM Sans", Inter, sans-serif',
                      fontWeight: 700,
                      fontSize,
                      lineHeight: 0.95,
                      letterSpacing: '-0.045em',
                      textAlign: 'center',
                      transform: 'translateX(-10px)',
                      clipPath: 'inset(0 0% 0 0%)',
                      flexDirection: isMobile && hasTwoWords ? 'column' : 'row',
                      gap: isMobile && hasTwoWords ? '0.05em' : '0px',
                    }}
                  >
                    {renderChars('l', 'cl')}
                  </div>

                  <div
                    ref={copyRRef}
                    data-copy-r="true"
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      color: PURPLE_DEEP,
                      opacity: 0.08,
                      fontFamily: '"PlusJakartaSans", "DM Sans", Inter, sans-serif',
                      fontWeight: 700,
                      fontSize,
                      lineHeight: 0.95,
                      letterSpacing: '-0.045em',
                      textAlign: 'center',
                      transform: 'translateX(10px)',
                      clipPath: 'inset(0 0% 0 0%)',
                      flexDirection: isMobile && hasTwoWords ? 'column' : 'row',
                      gap: isMobile && hasTwoWords ? '0.05em' : '0px',
                    }}
                  >
                    {renderChars('r', 'cr')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ZONE: progress + scroll-down (fixed, never overlaps word) */}
        <div className="w-full shrink-0 px-margin-mobile md:px-margin-desktop">
          {/* TRACK / PROGRESS */}
          <div
            ref={trackRef}
            className="w-full flex items-center gap-4 mt-1 md:mt-2 mb-0 pb-1 md:pb-2 max-w-[720px] mx-auto"
            style={{ opacity: 0 }}
          >
            <div
              ref={counterRef}
              className="shrink-0 flex items-baseline gap-1 tabular-nums"
              style={{ opacity: 0 }}
            >
              <span
                className="font-sans-premium font-semibold"
                style={{ fontSize: counterBig, color: PURPLE, lineHeight: 1 }}
              >
                {String(activeIdx + 1).padStart(2, '0')}
              </span>
              <span
                className="font-sans-premium text-white/40"
                style={{ fontSize: counterSmall, lineHeight: 1 }}
              >
                /{String(SKILLS.length).padStart(2, '0')}
              </span>
            </div>

            <div className="relative flex-1 h-[3px] rounded-full bg-white/[0.08] overflow-hidden">
              <div
                ref={progressRef}
                className="absolute left-0 top-0 h-full w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${PURPLE_DEEP} 0%, ${PURPLE} 100%)`,
                  boxShadow: `0 0 12px ${PURPLE}88`,
                  transformOrigin: 'left center',
                  transform: 'scaleX(0)',
                }}
              />
            </div>

            <div className="shrink-0 hidden sm:flex items-center gap-2 text-white/50 font-sans-premium text-[10px] uppercase tracking-[0.28em]">
              <span>Live</span>
              <span
                className="inline-block w-[6px] h-[6px] rounded-full animate-pulse"
                style={{ background: PURPLE }}
              />
            </div>
          </div>

          {/* SCROLL DOWN (now inside flex-col bottom zone, not absolute overlap) */}
          <button
            onClick={handleScrollClick}
            className="w-full flex flex-col items-center gap-1 group cursor-pointer focus:outline-none animate-fade-up opacity-0 pb-3 md:pb-5"
            style={{ animationDelay: '2.8s' }}
            aria-label="Scroll to explore"
          >
            <span className="font-sans-premium text-label-premium uppercase tracking-[0.25em] text-on-surface-variant/70 group-hover:text-white transition-colors duration-300 text-[10px]">
              Scroll Down
            </span>
            <span
              className="material-symbols-outlined text-on-surface-variant/60 group-hover:text-white transition-colors duration-300 animate-bounce-y text-lg"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}
            >
              south
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
