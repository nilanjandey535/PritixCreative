import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import heroLaptop from '../assets/hero_laptop.png';

export default function Hero() {
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const titleLine3Ref = useRef(null);
  const descRef = useRef(null);
  const pRef = useRef(null);
  const specsRef = useRef(null);
  const btnRef = useRef(null);
  const imageRef = useRef(null);
  const floatItemsRef = useRef([]);

  const addToRefs = (el) => {
    if (el && !floatItemsRef.current.includes(el)) {
      floatItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Background Image scale-in & fade representation
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.12 },
      { opacity: 1, scale: 1.02, duration: 1.6 }
    );

    // Title lines slide up & fade in
    tl.fromTo(
      [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
      '-=1.1'
    );

    // Descriptions & Paragraphs fade in
    tl.fromTo(
      [descRef.current, pRef.current],
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
      '-=0.4'
    );

    // Specs list fade in
    tl.fromTo(
      specsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    // Button pop in
    tl.fromTo(
      btnRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.2'
    );

    // Floating badges slide/pop in
    if (floatItemsRef.current.length > 0) {
      tl.fromTo(
        floatItemsRef.current,
        { scale: 0.75, opacity: 0, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'back.out(1.3)' },
        '-=0.5'
      );
    }
  }, []);

  return (
    <section
      className="relative min-h-[680px] md:min-h-screen py-12 md:py-0 w-full bg-[#050816] overflow-hidden flex items-center"
      id="home"
    >
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .float-item-1 { animation: float 8s ease-in-out infinite; }
        .float-item-2 { animation: float 10s ease-in-out infinite 0.5s; }
        .float-item-3 { animation: float 7s ease-in-out infinite 1.2s; }
        .float-item-4 { animation: float 9s ease-in-out infinite 1.8s; }
        .float-item-5 { animation: float 6s ease-in-out infinite 2.2s; }

        @keyframes train-move {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .train-scroller {
          display: flex !important;
          flex-wrap: nowrap !important;
          white-space: nowrap !important;
          width: max-content;
          animation: train-move 18s linear infinite;
          will-change: transform;
        }
        .train-scroller > div {
          display: flex !important;
          flex-wrap: nowrap !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
        }

        @keyframes train-move-reverse {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .train-scroller-reverse {
          display: flex !important;
          flex-wrap: nowrap !important;
          white-space: nowrap !important;
          width: max-content;
          animation: train-move-reverse 18s linear infinite;
          will-change: transform;
        }
        .train-scroller-reverse > div {
          display: flex !important;
          flex-wrap: nowrap !important;
          white-space: nowrap !important;
          flex-shrink: 0 !important;
        }
      `}</style>

      {/* Grid Pattern BG */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(166,107,255,0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(166,107,255,0.7) 1px, transparent 1px)
          `,
          backgroundSize: '110px 110px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
        }}
      /> */}

      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#5F2EFF]/10 blur-[130px] pointer-events-none" />

      {/* Photographer / Creative Visual Section */}
      <div className="absolute inset-0 md:left-auto md:w-[60%] lg:w-[54%] h-full z-0 pointer-events-none overflow-hidden">
        {/* Main Background Image */}
        <img
          ref={imageRef}
          src={heroLaptop}
          alt="Creative director shooting"
          className="w-full h-full object-cover object-[center_right] sm:object-center select-none"
          style={{ opacity: 0 }}
        />

        {/* mobile-only full cover overlay */}
        <div className="absolute inset-0 bg-[#050816]/75 md:hidden z-10" />

        {/* desktop-only side linear fade */}
        <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#050816] to-transparent hidden md:block z-10" />

        {/* bottom linear fade to blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050816] to-transparent z-10" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          {/* Left Text Column */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col items-start text-left">
            <h1 className="font-sans-premium font-black tracking-tight leading-[0.95] text-white text-[2rem] sm:text-[2.5rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] uppercase select-none">
              <div ref={titleLine1Ref} style={{ opacity: 0 }}>YOU</div>
              <div ref={titleLine2Ref} style={{ opacity: 0 }}>DESERVE</div>
              <div
                ref={titleLine3Ref}
                className="bg-gradient-to-r from-[#A66BFF] via-[#BC85FF] to-[#D19FFF] bg-clip-text text-transparent pb-2"
                style={{ opacity: 0 }}
              >
                BETTER
              </div>
            </h1>

            <p
              ref={descRef}
              className="text-white/90 font-sans-premium text-lg sm:text-xl md:text-2xl font-light tracking-wide max-w-xl mt-6 leading-relaxed"
              style={{ opacity: 0 }}
            >
              For your brand. For your ideas. <br />
              For your digital presence.
            </p>

            <p
              ref={pRef}
              className="text-white/50 font-sans-premium text-base sm:text-lg md:text-xl max-w-lg mt-4 leading-relaxed"
              style={{ opacity: 0 }}
            >
              We turn ideas into identities, content into impact, and brands into experiences.
            </p>

            {/* Specializations list with dots */}
            <div
              ref={specsRef}
              className="flex flex-col gap-2 mt-8 font-sans-premium text-[11px] md:text-[12px] tracking-[0.24em] text-white/50 font-bold uppercase select-none w-full overflow-hidden"
              style={{ opacity: 0 }}
            >
              <div className="overflow-hidden w-[60%]">
                <div className="train-scroller">
                  < div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span>BRANDING</span>
                    <span className="text-[#A66BFF]">·</span>
                    <span>DESIGN</span>
                    <span className="text-[#A66BFF]">·</span>
                    <span>VIDEO</span>
                    <span className="text-[#A66BFF]">·</span>
                    <span>SOCIAL MEDIA</span>
                    <span className="text-[#A66BFF]">·</span>
                  </div>
                  {/* Identical second chain */}
                  <div className="flex flex-nowrap items-center gap-x-2.5 shrink-0">
                    <span>BRANDING</span>
                    <span className="text-[#A66BFF]">·</span>
                    <span>DESIGN</span>
                    <span className="text-[#A66BFF]">·</span>
                    <span>VIDEO</span>
                    <span className="text-[#A66BFF]">·</span>
                    <span>SOCIAL MEDIA</span>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 train-scroller">
                <span>BRANDING</span>
                <span className="text-[#A66BFF]">·</span>
                <span>DESIGN</span>
                <span className="text-[#A66BFF]">·</span>
                <span>VIDEO</span>
                <span className="text-[#A66BFF]">·</span>
                <span>SOCIAL MEDIA</span>
              </div> */}
              <div className="overflow-hidden w-[60%]">
                <div className="train-scroller-reverse">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span>MARKETING</span>
                    <span className="text-[#A66BFF]">·</span>
                    <span>WEB DESIGN</span>
                    <span className="text-[#A66BFF]">·</span>
                    <span>CREATOR SUPPORT</span>
                    <span className="text-[#A66BFF]">·</span>
                  </div>
                  {/* Identical second chain */}
                  <div className="flex flex-nowrap items-center gap-x-2.5 shrink-0">
                    <span>MARKETING</span>
                    <span className="text-[#A66BFF]">·</span>
                    <span>WEB DESIGN</span>
                    <span className="text-[#A66BFF]">·</span>
                    <span>CREATOR SUPPORT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Option */}
            <div ref={btnRef} className="mt-9" style={{ opacity: 0 }}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#A66BFF] to-[#E9D5FF] text-[#050816] font-sans-premium text-xs uppercase tracking-[0.2em] font-extrabold rounded-lg shadow-lg hover:shadow-[0_0_30px_rgba(166,107,255,0.4)] transition-all duration-300 hover:scale-[1.02]"
              >
                Start A Project
                <span className="text-sm font-bold transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </div>

          {/* Right Placeholder Column — to restrict content overlaying on desktop */}
          <div className="hidden md:block md:col-span-5 lg:col-span-6 relative h-[600px]" />
        </div>
      </div>

      {/*Floating Elements Container (Only displayed on desktop/tablets)*/}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">

        {/* Live Website Mockup Box */}
        {/* <div
          ref={addToRefs}
          className="absolute left-[54%] bottom-[20%] float-item-1 w-64 bg-[#050816]/90 border border-white/10 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{ opacity: 0 }}
        >
          <div className="flex gap-1.5 mb-2.5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div> */}
        {/* <div className="h-28 rounded-xl bg-[#0c112c] border border-white/5 p-3 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[8px] text-white/40 tracking-wider">
              <span>pritix.co</span>
              <span className="border border-[#A66BFF]/30 px-1 py-0.5 rounded text-[#A66BFF] font-bold">LIVE PREVIEW</span>
            </div>
            <div className="my-auto">
              <div className="text-xs font-bold text-white leading-tight font-sans-premium">Elevating Brands.</div>
              <div className="text-[10px] text-white/50 font-sans-premium font-light">Digitalizing Presence</div>
            </div>
            <div className="flex justify-between items-center text-[7px] text-white/30 border-t border-white/5 pt-1.5">
              <span>Full-service Agency</span>
              <span className="text-[#A66BFF]">↗</span>
            </div>
          </div>
        </div> */}

        {/* Branding Concept Card */}
        {/* <div
          ref={addToRefs}
          className="absolute right-[8%] top-[18%] float-item-2 w-52 bg-[#050816]/90 border border-white/10 rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{ opacity: 0 }}
        >
          <div className="h-28 rounded-xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 border border-white/5 flex flex-col justify-center items-center">
            <span className="text-[10px] text-[#A66BFF] uppercase tracking-[0.25em] font-semibold mb-1.5">Identity</span>
            <span className="text-white text-sm uppercase tracking-[0.2em] font-extrabold font-sans-premium">BRANDING</span>
          </div>
        </div> */}

        {/* Premiere Pro Badge */}
        {/* <div
          ref={addToRefs}
          className="absolute left-[48%] top-[35%] float-item-3 bg-[#0c081a]/90 backdrop-blur-md border border-[#9999FF]/20 px-3 py-2 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center gap-2.5"
          style={{ opacity: 0 }}
        >
          <div className="w-7 h-7 rounded-lg bg-[#14002c] border border-[#a074ff] flex items-center justify-center text-xs font-black text-[#a074ff] font-sans">Pr</div>
          <span className="text-[10px] text-white/60 tracking-widest font-sans-premium uppercase font-medium">Video</span>
        </div> */}

        {/* Photoshop Badge */}
        {/* <div
          ref={addToRefs}
          className="absolute right-[22%] bottom-[28%] float-item-4 bg-[#050d1a]/90 backdrop-blur-md border border-[#31A8FF]/20 px-3 py-2 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center gap-2.5"
          style={{ opacity: 0 }}
        >
          <div className="w-7 h-7 rounded-lg bg-[#001c3d] border border-[#31a8ff] flex items-center justify-center text-xs font-black text-[#31a8ff] font-sans">Ps</div>
          <span className="text-[10px] text-white/60 tracking-widest font-sans-premium uppercase font-medium">Design</span>
        </div> */}

        {/* Hand-drawn purple cross */}
        {/* <div
          ref={addToRefs}
          className="absolute right-[28%] top-[10%] text-[#A66BFF]/40 text-4xl select-none float-item-5"
          style={{ opacity: 0 }}
        >
          ✕
        </div> */}

        {/* Hand-drawn spray text "CREATE IMPACT" at the bottom right */}
        <div
          className="absolute bottom-16 right-[10%] z-20 select-none pointer-events-none transform rotate-[-8deg] origin-center"
          style={{ fontFamily: "'Permanent Marker', cursive" }}
        >
          <div className="text-white text-4xl lg:text-5xl tracking-normal uppercase leading-none">
            CREATE
          </div>
          <div className="text-[#A66BFF] text-5xl lg:text-6xl tracking-normal uppercase leading-none mt-1 drop-shadow-[0_0_15px_rgba(166,107,255,0.6)]">
            IMPACT
          </div>
        </div>

      </div>
    </section>
  );
}
