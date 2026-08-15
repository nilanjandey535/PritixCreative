import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_1.png';

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4.5 h-4.5 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.248 2.227.415.56.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.058 1.266.069 1.646.069 4.849 0 3.205-.012 3.584-.069 4.849-.055 1.17-.249 1.805-.414 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.058-1.646.07-4.849.07-3.205 0-3.584-.012-4.849-.07-1.17-.054-1.805-.249-2.227-.414-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.058-1.266-.07-1.646-.07-4.849 0-3.205.012-3.584.07-4.849.053-1.17.248-1.805.413-2.227.218-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.051.072 5.776.13 4.903.333 4.144.63c-.789.306-1.46.717-2.126 1.384S.935 3.355.63 4.144C.333 4.903.13 5.776.072 7.051.014 8.332 0 8.741 0 12c0 3.26.014 3.668.072 4.949.058 1.275.261 2.148.558 2.907.306.789.718 1.46 1.384 2.126.667.666 1.336 1.079 2.126 1.384.76.296 1.633.498 2.907.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.949-.072c1.275-.06 2.148-.262 2.907-.558.79-.305 1.46-.718 2.126-1.384.666-.667 1.079-1.336 1.384-2.126.295-.76.498-1.633.558-2.907.058-1.281.072-1.689.072-4.949s-.014-3.668-.072-4.949c-.06-1.275-.263-2.148-.558-2.907-.305-.789-.718-1.46-1.384-2.126C21.319 1.347 20.651.935 19.856.63c-.76-.296-1.633-.498-2.907-.558C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4.5 h-4.5 fill-current">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://telegram.org/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4.5 h-4.5 fill-current">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

const HOME_NAV = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'team', label: 'Team' },
  { id: 'stories', label: 'Stories' },
];

const HEADER_OFFSET = 72;

function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const target = window.scrollY + rect.top - HEADER_OFFSET;
  try {
    window.scrollTo({ top: Math.max(target, 0), left: 0, behavior: 'smooth' });
  } catch {
    window.scrollTo(0, Math.max(target, 0));
  }
}

const CONTACT_INFO = [
  {
    label: 'Call/WhatsApp',
    value: '+91 81599 55605',
    href: 'tel:+918159955605',
    icon: 'call',
  },
  {
    label: 'Email',
    value: 'hellopritixcreative@gmail.com',
    href: 'mailto:hellopritixcreative@gmail.com',
    icon: 'mail',
  },
  {
    label: 'Studio',
    value: 'Diamond Harbour, India',
    href: 'https://maps.google.com/?q=Diamond Harbour+India',
    icon: 'location_on',
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname === '/' || location.pathname === '') {
      smoothScrollToId(sectionId);
      if (window.history.replaceState) {
        window.history.replaceState(null, '', `#${sectionId}`);
      }
      return;
    }
    navigate(`/#${sectionId}`);
  };

  return (
    <footer className="relative bg-inverse-surface overflow-hidden border-t border-white/[0.06] w-full">
      {/* Ambient purple wash */}
      <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 w-[600px] h-[220px] rounded-full bg-primary/[0.18] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[280px] h-[160px] rounded-full bg-secondary/[0.1] blur-[110px] pointer-events-none" />

      <div className="relative px-margin-mobile md:px-margin-desktop py-2 md:py-4 max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-10">
          {/* COLUMN 1: Logo + Socials */}
          <div className="md:flex-1 md:basis-[32%] md:max-w-[32%] flex flex-col items-start justify-start gap-2">
            <Link to="/" className="inline-flex items-center gap-1.5 md:gap-2 group justify-start">
              <img
                src={logo}
                alt="Pritix"
                className="h-6 md:h-8 w-auto object-contain drop-shadow-[0_0_26px_rgba(95,46,255,0.42)] transition-transform duration-500 group-hover:scale-105"
              />
              <span className="text-[1.1rem] md:text-[1.35rem] font-bold tracking-tight text-white select-none leading-none">
                Pritix Creative
              </span>
            </Link>

            <div className="flex items-center gap-6 pt-2.9">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="group relative flex items-center justify-center w-8.5 h-8.5 rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-primary/50 hover:bg-primary/15 hover:shadow-[0_0_24px_rgba(95,46,255,0.22)] transition-all duration-400"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Navigation (same labels as header) */}
          <div className="md:flex-1 md:basis-[32%] md:max-w-[32%] flex flex-col items-start justify-start gap-2">
            <p className="font-sans-premium text-[10px] uppercase tracking-[0.28em] text-on-surface-variant/70">
              Navigate
            </p>
            <nav className="grid grid-rows-2 gap-x-4 gap-y-1.5 md:grid-rows-2">
              {HOME_NAV.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => handleSectionClick(e, l.id)}
                  className="group relative w-fit font-display text-white/80 text-base tracking-tight hover:text-white transition-colors duration-400"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-500 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          {/* COLUMN 3: Contact details */}
          <div className="md:flex-1 md:basis-[32%] md:max-w-[32%] flex flex-col items-start justify-start gap-2">
            <p className="font-sans-premium text-[10px] uppercase tracking-[0.28em] text-on-surface-variant/70">
              Reach Out
            </p>
            <div className="flex flex-col gap-1.5">
              {CONTACT_INFO.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group inline-flex items-center gap-2.5 w-fit"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/10 bg-white/[0.03] text-primary/90 group-hover:text-white group-hover:border-primary/50 group-hover:bg-primary/15 transition-all duration-400">
                    <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                      {c.icon}
                    </span>
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="font-sans-premium text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/60">
                      {c.label}
                    </span>
                    <span className="font-sans-premium text-[13px] md:text-sm text-white/85 group-hover:text-white transition-colors duration-400">
                      {c.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Hairline */}
        <div className="mt-4 md:mt-6 w-full h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

        {/* Bottom row: Copyright + Legal */}
        <div className="mt-3 md:mt-4 flex flex-col-reverse md:flex-row items-center justify-between gap-2.5">
          <p className="font-sans-premium text-[11px] md:text-xs text-on-surface-variant/70 tracking-wide text-center md:text-left">
            &copy; {year} Pritix Creative. All rights reserved.
          </p>
          <nav className="flex items-center gap-5 md:gap-6">
            <Link
              to="#"
              className="font-sans-premium text-[10px] md:text-xs uppercase tracking-[0.22em] text-on-surface-variant/80 hover:text-white transition-colors duration-400"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="font-sans-premium text-[10px] md:text-xs uppercase tracking-[0.22em] text-on-surface-variant/80 hover:text-white transition-colors duration-400"
            >
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
