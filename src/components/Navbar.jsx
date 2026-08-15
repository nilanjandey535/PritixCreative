import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_1.png';

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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((p) => !p);
  const closeMenu = () => setIsOpen(false);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    if (isOpen) closeMenu();
    if (location.pathname === '/' || location.pathname === '') {
      smoothScrollToId(sectionId);
      if (window.history.replaceState) {
        window.history.replaceState(null, '', `#${sectionId}`);
      }
      return;
    }
    navigate(`/#${sectionId}`);
  };

  const activeHash = location.hash.replace('#', '');

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${scrolled
            ? 'backdrop-blur-2xl bg-inverse-surface/60 shadow-[0_1px_0_0_rgba(166,107,255,0.12)] border-b border-white/[0.05]'
            : 'bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-3 md:py-4 w-full max-w-container-max mx-auto">
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/' && window.scrollY > 20) {
                closeMenu();
                setTimeout(() => smoothScrollToId('hero'), 0);
              }
            }}
            className="group inline-flex items-center gap-1.5 md:gap-2 select-none"
          >
            <img
              src={logo}
              alt="Pritix"
              className="h-7 md:h-11 w-auto object-contain drop-shadow-[0_0_25px_rgba(95,46,255,0.35)] transition-all duration-500 group-hover:scale-105"
            />
            <span className="text-[1.15rem] leading-none md:text-[1.85rem] font-bold tracking-tight text-white select-none whitespace-nowrap">
              Pritix Creative
            </span>
          </Link>

          {/* Desktop: Section nav — each link in its own button-like pill box */}
          <nav className="hidden md:flex items-center gap-2">
            {HOME_NAV.map((item) => {
              const isActive =
                (location.pathname === '/' || location.pathname === '') && activeHash === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleSectionClick(e, item.id)}
                  className={`inline-flex items-center px-5 py-2.5 rounded-full font-sans-premium text-xs uppercase tracking-[0.2em] border transition-all duration-500 ${isActive
                      ? 'text-white bg-primary/90 border-white/5 shadow-[0_0_30px_rgba(95,46,255,0.4)]'
                      : 'text-white/80 bg-white/[0.03] border-white/10 backdrop-blur-md hover:text-white hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_0_20px_rgba(95,46,255,0.15)]'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-stack-md">
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-primary/90 text-on-primary rounded-full font-sans-premium text-xs uppercase tracking-[0.22em] hover:bg-primary hover:shadow-[0_0_30px_rgba(95,46,255,0.4)] transition-all duration-500 border border-white/5"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 h-screen w-screen bg-inverse-surface/97 backdrop-blur-2xl z-[45] transition-transform duration-400 ease-in-out md:hidden flex flex-col justify-center items-center gap-6 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <nav className="flex flex-col items-center gap-6">
          {HOME_NAV.map((item) => {
            const isActive =
              (location.pathname === '/' || location.pathname === '') && activeHash === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleSectionClick(e, item.id)}
                className={`font-display text-3xl tracking-tight transition-all duration-400 ${isActive ? 'text-white drop-shadow-[0_0_20px_rgba(95,46,255,0.45)]' : 'text-white/75 hover:text-white'
                  }`}
              >
                {item.label}
              </a>
            );
          })}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="mt-6 px-10 py-4 bg-primary text-on-primary rounded-full font-sans-premium text-sm uppercase tracking-[0.22em] hover:shadow-[0_0_40px_rgba(95,46,255,0.5)] transition-all"
          >
            Start Project
          </Link>
        </nav>
      </div>
    </>
  );
}
