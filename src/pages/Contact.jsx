import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

//const WHATSAPP_NUMBER = '918293577563';

export default function Contact() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const redirectTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) return;

    setSubmitting(true);

    try {
      const templateParams = {
        name: name.trim(),
        phone: phone.trim(),
        message: 'I would like to discuss a project.',
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      // try {
      //   const waMessage = encodeURIComponent(
      //     `Hello Pritix360,
      //      Name: ${name.trim()}
      //      Phone: ${phone.trim()}

      //      I would like to discuss a project.`
      //   );
      //   const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
      //   window.open(waUrl, '_blank', 'noopener,noreferrer');
      // } catch (waErr) {
      //   console.warn('WhatsApp open failed:', waErr);
      // }

      setName('');
      setPhone('');

      setToast({
        type: 'success',
        title: 'Message Received',
        heading: "Thank You.",
        description:
          'Your enquiry has been sent successfully. We will get back to you shortly.',
      });

      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = setTimeout(() => {
        setToast(null);
        navigate('/', { replace: true });
        setTimeout(() => {
          const hero = document.getElementById('hero-section') || document.querySelector('#hero, .hero-section, section');
          if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      }, 3200);
    } catch (error) {
      console.error('Email sending failed:', error);

      setToast({
        type: 'error',
        title: 'Something Went Wrong',
        heading: 'Unable to Send.',
        description:
          'Sorry, we could not send your enquiry. Please try again in a moment.',
      });

      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = setTimeout(() => setToast(null), 4000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <section className="relative bg-surface-container overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-[12%] -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.08] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[8%] -right-32 w-[480px] h-[480px] rounded-full bg-gold-accent/[0.06] blur-[120px] pointer-events-none" />

        {/* Back Bar */}
        <div className="relative px-margin-mobile md:px-margin-desktop pt-8 md:pt-10 max-w-[960px] mx-auto">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 text-white/70 font-sans-premium text-[11px] uppercase tracking-[0.2em] hover:text-white hover:border-primary/60 hover:bg-primary/10 transition-all duration-400"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:-translate-x-0.5" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
              arrow_back
            </span>
            Back
          </button>
        </div>

        <div className="relative px-margin-mobile md:px-margin-desktop pt-[40px] md:pt-[48px] pb-[40px] md:pb-[48px] max-w-[960px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            {/* Section Title */}
            <div className="text-center mb-[56px] md:mb-[72px]">
              <p className="font-sans-premium text-label-premium uppercase tracking-[0.35em] text-primary-fixed-dim mb-stack-md">
                Get In Touch
              </p>
              <h2 className="font-display text-display-section text-white leading-[1.1]">
                Let&apos;s Build Something{' '}
                <span className="italic text-gradient-purple">Timeless.</span>
              </h2>
              <p className="font-sans-premium text-body-md text-on-surface-variant mt-stack-md max-w-xl mx-auto">
                Drop your name and number. We&apos;ll get back to you shortly.
              </p>
            </div>

            {/* Form Card */}
            <div className="relative bg-inverse-surface/70 border border-white/[0.07] rounded-[24px] p-7 md:p-14 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55),0_0_50px_rgba(95,46,255,0.14)] overflow-hidden">
              {/* Inner glow */}
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-primary/[0.12] blur-[120px] pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative flex flex-col gap-stack-md">
                {/* Name */}
                <div className="relative group">
                  <label className="block font-sans-premium text-[10px] uppercase tracking-[0.25em] text-primary-fixed-dim mb-3">
                    Name
                  </label>
                  <span className="absolute left-5 bottom-[20px] -translate-y-1/2 pointer-events-none text-on-surface-variant/40 group-focus-within:text-primary transition-colors duration-300">
                    <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                      person
                    </span>
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="footer-input w-full pl-[58px] pr-5 py-[18px] bg-surface-container-highest/60 border border-white/10 text-white placeholder:text-white/30 font-sans-premium text-body-md focus:outline-none focus:border-primary/70 focus:bg-surface-container-highest transition-all duration-400 backdrop-blur-md"
                  />
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-primary via-gold-accent to-primary transition-all duration-500 group-focus-within:w-full" />
                </div>

                {/* Phone */}
                <div className="relative group">
                  <label className="block font-sans-premium text-[10px] uppercase tracking-[0.25em] text-primary-fixed-dim mb-3">
                    Phone Number
                  </label>
                  <span className="absolute left-5 bottom-[20px] -translate-y-1/2 pointer-events-none text-on-surface-variant/40 group-focus-within:text-primary transition-colors duration-300">
                    <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                      call
                    </span>
                  </span>
                  <span className="absolute left-[54px] bottom-[20px] -translate-y-1/2 text-white/45 font-sans-premium text-body-md pointer-events-none select-none">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^\d+]/g, ''))}
                    placeholder="Your 10-digit number"
                    required
                    inputMode="numeric"
                    maxLength={15}
                    className="footer-input w-full pl-[100px] pr-5 py-[18px] bg-surface-container-highest/60 border border-white/10 text-white placeholder:text-white/30 font-sans-premium text-body-md focus:outline-none focus:border-primary/70 focus:bg-surface-container-highest transition-all duration-400 backdrop-blur-md"
                  />
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-primary via-gold-accent to-primary transition-all duration-500 group-focus-within:w-full" />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting || !name.trim() || !phone.trim()}
                  className="footer-submit group relative mt-stack-sm overflow-hidden w-full py-[19px] bg-primary text-white font-sans-premium text-sm uppercase tracking-[0.2em] font-medium transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_14px_50px_rgba(95,46,255,0.5),0_0_30px_rgba(166,107,255,0.4)]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] group-hover:animate-shimmer-x" />
                  <span className="relative z-10 inline-flex items-center gap-3 justify-center">
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-lg" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                          progress_activity
                        </span>
                        Sending…
                      </>
                    ) : (
                      <>
                        Submit
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                        >
                          arrow_forward
                        </span>
                      </>
                    )}
                  </span>
                </button>

                {/* Trust note */}
                <p className="text-center font-sans-premium text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/50 mt-stack-sm">
                  No spam. 100% private conversation.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-5"
          >
            <div
              className="absolute inset-0 bg-black/55 backdrop-blur-md"
              onClick={() => {
                if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
                setToast(null);
                if (toast.type === 'success') {
                  navigate('/', { replace: true });
                  setTimeout(() => {
                    const hero = document.getElementById('hero-section') || document.querySelector('#hero, .hero-section, section');
                    if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    else window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 50);
                }
              }}
            />

            <motion.div
              key="toast-card"
              initial={{ opacity: 0, scale: 0.82, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 26,
                mass: 0.9,
              }}
              className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/10 bg-inverse-surface/80 backdrop-blur-2xl shadow-[0_60px_160px_rgba(0,0,0,0.7),0_0_80px_rgba(95,46,255,0.35)]"
            >
              <div
                className={`absolute -top-48 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full blur-[120px] pointer-events-none ${toast.type === 'success' ? 'bg-primary/[0.28]' : 'bg-rose-500/[0.28]'
                  }`}
              />
              <div
                className={`absolute -bottom-40 -right-24 w-[360px] h-[360px] rounded-full blur-[120px] pointer-events-none ${toast.type === 'success' ? 'bg-gold-accent/[0.22]' : 'bg-orange-500/[0.22]'
                  }`}
              />

              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 rounded-[28px] pointer-events-none"
                style={{
                  boxShadow:
                    'inset 0 0 0 1px rgba(255,255,255,0.06)',
                }}
              />

              <div className="relative px-7 py-10 md:px-12 md:py-14 text-center">
                <div className="relative mx-auto mb-8 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 0.55, scale: 1.4 }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                    className={`absolute inset-0 rounded-full ${toast.type === 'success' ? 'bg-primary' : 'bg-rose-500'
                      } blur-2xl`}
                  />
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 22,
                      delay: 0.08,
                    }}
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full ${toast.type === 'success'
                        ? 'bg-gradient-to-br from-primary via-secondary to-primary'
                        : 'bg-gradient-to-br from-rose-500 via-red-500 to-orange-500'
                      } shadow-[0_20px_60px_rgba(95,46,255,0.55)] flex items-center justify-center border border-white/15`}
                  >
                    <motion.span
                      className="material-symbols-outlined text-white"
                      style={{
                        fontSize: '44px',
                        fontVariationSettings: "'FILL' 1, 'wght' 500",
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 24,
                        delay: 0.35,
                      }}
                    >
                      {toast.type === 'success' ? 'check' : 'error'}
                    </motion.span>
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-sans-premium text-[10px] md:text-[11px] uppercase tracking-[0.4em] mb-4"
                  style={{
                    color:
                      toast.type === 'success'
                        ? 'rgba(191, 170, 255, 1)'
                        : 'rgba(255, 184, 184, 1)',
                  }}
                >
                  {toast.title}
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display text-[40px] md:text-[56px] leading-[1.05] mb-5"
                  style={{
                    background:
                      toast.type === 'success'
                        ? 'linear-gradient(180deg, #FFFFFF 0%, #C7B8FF 55%, #9A7DFF 100%)'
                        : 'linear-gradient(180deg, #FFFFFF 0%, #FFC1C1 55%, #FF7D7D 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {toast.heading}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-sans-premium text-body-md md:text-body-lg text-on-surface-variant max-w-md mx-auto leading-relaxed"
                >
                  {toast.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative mx-auto mt-10 h-[2px] w-full max-w-[220px] overflow-hidden rounded-full bg-white/8"
                >
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{
                      duration: toast.type === 'success' ? 2.8 : 3.6,
                      delay: 0.9,
                      ease: 'linear',
                    }}
                    className={`absolute inset-y-0 left-0 w-full rounded-full ${toast.type === 'success'
                        ? 'bg-gradient-to-r from-primary via-gold-accent to-secondary'
                        : 'bg-gradient-to-r from-rose-500 via-orange-400 to-amber-400'
                      }`}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mt-7 font-sans-premium text-[11px] uppercase tracking-[0.3em] text-on-surface-variant/55"
                >
                  {toast.type === 'success'
                    ? 'Redirecting to Home…'
                    : 'Dismissing shortly…'}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
