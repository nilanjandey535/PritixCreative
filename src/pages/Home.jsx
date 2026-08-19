import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx';
import WhatWeCreate from '../components/WhatWeCreate.jsx';
//import MeetTheCreators from '../components/MeetTheCreators.jsx';
import ClientTestimonials from '../components/ClientTestimonials.jsx';
import StatsSection from '../components/StatsSection.jsx';
import WhatWeDo from '../components/WhatWeDo.jsx';

import natureBg from '../assets/CTA.png';

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

const PHONE_MOCKUPS = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ74aiVNxhEnN7uX1Q8UH9wg-b8kjLqQjIE7Yy6BMMSW67g32QVPePjt6rYCvMkm-FbuVm7BTOFVi1s7-mOmv263inNmzURfsreW8cPhGkTP1EuXQIIe502Pu9Bax2QZ8_g91_QEnp1d7lHeDqLD4iTShLknp-jMqxTFSqqeTybfBewH-xzy0H0My4P5QEBpUHxSCVzg84DgBxE9CrYKa9_2rAG9sOye56JnzX0ipy1ps1r9A4OekH8Q',
    alt: 'A vertical Instagram Reel mockup featuring a high-fashion model walking through a minimalist gallery.',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjGt1N9hubuvCwsz_YBkKAqIIPwXTvH3pw_HhDauPBrJYisvh4XDYT8LwcFwBEIDmPkEuH3bauLFozugJfSK2IP4Q9dHN6trWnrpqG1aE4GoJjN9npzAw6Hv8uFs24BOtHjIo79HXoqg2Kc7GlHlG02o7aBu_8XpL5c3FdWwPr3wZD9snvGQBzE0c26-b4nIpu_dhwHs-eFXZv1zRXvtvp0Vj-My-vkwe95Z__BUsJ8Wgmvu5Rv15Lpw',
    alt: 'A vertical TikTok style video mockup showing a behind-the-scenes look at a professional film production.',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8HRjMTGSRwelVn9rhpVM5ccFak94BMoEAsX57Ju5UKnxgcHKxmNUjs34H-jlEeuR2HmtPWQKQneY-Kc-L0vpU3-qg14NzjEiXhyst1WMtob7yh-O_22ybg-Pe7gZq7lMuvluie1pUm1BIdoJUB7jFQf66hVYatZsPqi3nvgrdCsINnmXWzaURFrwxRhuM-6cYza9V5QaOrazalmHlEEdhCmM2Ys9n_OQMxU4b-59Zo8y-3bBe7pjNBQ',
    alt: 'A vertical video mockup showing a fast-paced travel sequence with smooth transitions through a modern city.',
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBBThQ0-FIvSWYKSNYeyyRJM3fhmxRgzI0cHjz_K5UG0aYIlVysRZ8EJkZ8xhWN0XWN6tSPdFSjsqMNSLJ6HgUuaExuAhnSb5wwpxQwhGrxFt8QFpw7MNBKsXuJbuwIaaLtR4uB6nzMFjiQuXEAVO7xxXHj_L_XxwRK9MYOiJYw5ubTIRy--Y-Wm5rRZZ02wJptJ7vDJkcRfsfOUyvW_gRG70pPBWu1RQAsE01RH1Ltn4bqg93Yd54lQ',
    alt: 'A vertical mobile advertisement mockup for a tech brand, featuring sleek minimalist animations of a new gadget.',
  },
];

function PhoneMockup({ url, alt }) {
  return (
    <div className="w-[280px] h-[550px] bg-primary rounded-[32px] border-[6px] border-gold-accent/30 overflow-hidden shadow-2xl shrink-0">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('${url}')` }}
        data-alt={alt}
      />
    </div>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      if (!id) return;
      const t = setTimeout(() => smoothScrollToId(id), 80);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const targetLink = e.target.closest('a[href^="#"]');
      if (!targetLink) return;

      const targetId = targetLink.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    const observedElements = document.querySelectorAll('section > div');

    observedElements.forEach((el) => {
      if (el.closest('#home')) {
        el.classList.add('animate-fade-up');
      } else {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.classList.add('animate-fade-up');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observedElements.forEach((div) => {
      if (!div.closest('#home')) {
        observer.observe(div);
      }
    });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main ref={containerRef}>
        {/* Section 1: HERO — Cinematic Video */}
        <section id="hero">
          <Hero />
        </section>

        {/* Section 1.5: WHAT WE DO — Core Capabilities */}
        <section id="services">
          <WhatWeDo />
        </section>

        {/* Section 4: WHAT WE CREATE — Cinematic Panels */}
        <section id="work">
          <WhatWeCreate />
        </section>

        {/* Section 5: MEET THE CREATORS — Behind Every Great Story */}
        {/* <section id="team">
          <MeetTheCreators />
        </section> */}

        {/* Section 2: STATS — Key Achievements */}
        <section id="stats">
          <StatsSection />
        </section>

        {/* Section 3: CLIENT STORIES — Testimonials */}
        <section id="stories">
          <ClientTestimonials />
        </section>

        {/* Section 6: FINAL CTA — Cinematic Sunset Drone */}
        <section className="relative overflow-hidden" id="contact">
          {/* Cinematic background: sunset drone shot */}
          <div className="absolute inset-0 -z-10">
            <img
              src={natureBg}
              alt="Sunset drone landscape"
              loading="eager"
              className="w-full h-full object-cover cta-bg-img"
            />
          </div>
          {/* Overlay layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-inverse-surface/30 via-inverse-surface/55 to-inverse-surface/95 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(95,46,255,0.14)_0%,_transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.55)] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full divider-purple" />

          <div className="relative z-10 px-margin-mobile md:px-margin-desktop pt-[40px] md:pt-[48px] pb-[40px] md:pb-[48px] max-w-5xl mx-auto text-center">
            {/* Top eyebrow chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 bg-inverse-surface/60 backdrop-blur-md mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-sans-premium text-[9px] uppercase tracking-[0.3em] text-primary-fixed-dim">
                Why Pritix?
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-[24px] md:text-[36px] text-white leading-[1.08] tracking-tight mb-2">
              We Don't Just Make Content <br />
              {' '}
              <span className="italic text-gradient-purple">We Build Perception.</span>
            </h2>

            {/* Paragraph */}
            <p className="font-sans-premium text-base md:text-body-lg text-on-surface-variant max-w-xl mx-auto mb-4 leading-relaxed">
              Because your audience does&apos;t see your hard work first.
              They see your brand.
              That&apos;s why we focus on every detail - from the first visual to the final impression.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-stack-md px-margin-mobile md:px-margin-desktop py-0">
              <Link
                to="/contact"
                className="cta-btn-primary group relative inline-flex items-center gap-2.5 px-7 py-3 bg-primary text-white font-sans-premium text-[12px] uppercase tracking-[0.2em] font-medium overflow-hidden transition-all duration-500 hover:shadow-[0_10px_35px_rgba(95,46,255,0.42),0_0_25px_rgba(166,107,255,0.38)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer-x" />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                    call
                  </span>
                  Contact Us
                  <span className="material-symbols-outlined text-[16px] transform transition-transform duration-300 group-hover:translate-x-0.5" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                    arrow_forward
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
