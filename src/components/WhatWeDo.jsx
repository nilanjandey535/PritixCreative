import { motion } from 'framer-motion';

const SERVICES = [
    {
        title: 'BRAND IDENTITY',
        description: 'We give your brand a personality people can recognize.',
        icon: 'brand',
    },
    {
        title: 'GRAPHIC DESIGN',
        description: 'Visuals that don\'t just fill space – they communicate.',
        icon: 'graphic',
    },
    {
        title: 'VIDEO PRODUCTION',
        description: 'From concept to final cut, we turn stories into experiences.',
        icon: 'video',
    },
    {
        title: 'SOCIAL MEDIA',
        description: 'Content that makes people stop, watch, engage and remember.',
        icon: 'social',
    },
    {
        title: 'DIGITAL MARKETING',
        description: 'Organic marketing and targeted ads that reach the right audience and drive results.',
        icon: 'marketing',
    },
    {
        title: 'WEB DESIGN',
        description: 'Digital experiences built to look premium and convert.',
        icon: 'web',
    },
    {
        title: 'PERSONAL BRANDING',
        description: 'We help creators build strong personal brands through consistent, professional content.',
        icon: 'creator',
    },
    {
        title: 'PRODUCTION SUPPORT',
        description: 'From shoot planning to post-production – we bring it all together.',
        icon: 'production',
    },
];

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
            delay: 0.05 + i * 0.06,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    }),
};

// 1. Brand Identity Custom SVG Icon
function FountainPenIcon() {
    return (
        <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-110 select-none z-10"
        >
            <defs>
                <linearGradient
                    id="brandGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop offset="0%" stopColor="#A66BFF" />
                    <stop offset="50%" stopColor="#5F2EFF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>

            {/* Fountain pen nib group for drawing motion */}
            <g className="pen-nib transition-all duration-300">
                <path
                    d="M24 6 L36 18 L27.5 31 L20.5 31 L12 18 Z"
                    stroke="url(#brandGradient)"
                    strokeWidth="3.6"
                    strokeLinejoin="round"
                />

                {/* Center line */}
                <path
                    d="M24 6 L24 29"
                    stroke="url(#brandGradient)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                />

                {/* Nib lower lines */}
                <path
                    d="M12 18 L24 29 L36 18"
                    stroke="url(#brandGradient)"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                />

                {/* Center hole */}
                <circle
                    cx="24"
                    cy="18"
                    r="2"
                    stroke="url(#brandGradient)"
                    strokeWidth="3.0"
                />
            </g>

            {/* Base stays static */}
            <path
                d="M20 31 H28 L31 35 V39 H17 V35 Z"
                stroke="url(#brandGradient)"
                strokeWidth="3.6"
                strokeLinejoin="round"
            />

            {/* Base divider */}
            <path
                d="M17 35 H31"
                stroke="url(#brandGradient)"
                strokeWidth="3.2"
            />
        </svg>
    );
}

// 2. Graphic Design Custom SVG Icon
function GraphicDesignIcon() {
    return (
        <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-110 select-none z-10"
        >
            <defs>
                <linearGradient
                    id="graphicGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop offset="0%" stopColor="#A66BFF" />
                    <stop offset="50%" stopColor="#5F2EFF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>
            {/* Back rounded square */}
            <rect
                x="18"
                y="7"
                width="19"
                height="19"
                rx="2.5"
                stroke="url(#graphicGradient)"
                strokeWidth="3.6"
            />

            {/* Front rounded square */}
            <rect
                x="10"
                y="17"
                width="19"
                height="19"
                rx="2.5"
                stroke="url(#graphicGradient)"
                strokeWidth="3.6"
            />

            {/* Small circular design element */}
            <circle
                cx="25"
                cy="15"
                r="2.2"
                stroke="url(#graphicGradient)"
                strokeWidth="3.2"
            />

            {/* Edit / pen shape inside animator */}
            <g className="design-pencil transition-all duration-300">
                <path
                    d="M28.5 29.5
                       L34.5 23.5
                       L37 26
                       L31 32
                       L27.5 32.5
                       Z"
                    stroke="url(#graphicGradient)"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                />

                {/* Pen tip */}
                <path
                    d="M27.5 32.5
                       L28.2 29.7"
                    stroke="url(#graphicGradient)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
}

// 3. Video Production Custom SVG Icon
function VideoProductionIcon() {
    return (
        <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-110 select-none z-10"
        >
            <defs>
                <linearGradient id="videoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A66BFF" />
                    <stop offset="50%" stopColor="#5F2EFF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>

            {/* Camera body */}
            <rect
                x="9"
                y="16"
                width="23"
                height="17"
                rx="2"
                stroke="url(#videoGradient)"
                strokeWidth="3.6"
            />

            {/* Camera lens */}
            <path
                d="M32 21 L39 17 V32 L32 28 Z"
                stroke="url(#videoGradient)"
                strokeWidth="3.6"
                strokeLinejoin="round"
            />

            {/* Top camera detail */}
            <path
                d="M14 16 L17 12 H22 L25 16"
                stroke="url(#videoGradient)"
                strokeWidth="3.6"
                strokeLinejoin="round"
            />

            {/* Reels spinning */}
            <circle
                cx="15"
                cy="11"
                r="3"
                stroke="url(#videoGradient)"
                strokeWidth="3.6"
                className="reel-1"
            />
            <circle
                cx="23"
                cy="11"
                r="3"
                stroke="url(#videoGradient)"
                strokeWidth="3.6"
                className="reel-2"
            />
        </svg>
    );
}

// 4. Social Media Custom SVG Icon
function SocialMediaIcon() {
    return (
        <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-110 select-none z-10"
        >
            <defs>
                <linearGradient id="socialGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A66BFF" />
                    <stop offset="50%" stopColor="#5F2EFF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>

            {/* Megaphone body */}
            <g className="megaphone transition-all duration-300">
                <path
                    d="M12 22 H18 L31 16 V32 L18 26 H12 Z"
                    stroke="url(#socialGradient)"
                    strokeWidth="3.6"
                    strokeLinejoin="round"
                />

                {/* Handle */}
                <path
                    d="M18 26 V31"
                    stroke="url(#socialGradient)"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                />
            </g>

            {/* Sound waves pulsing */}
            <path
                d="M35 20 C38 22 38 26 35 28"
                stroke="url(#socialGradient)"
                strokeWidth="3.4"
                strokeLinecap="round"
                className="sound-wave-1"
            />

            <path
                d="M38 17 C43 20 43 28 38 31"
                stroke="url(#socialGradient)"
                strokeWidth="3.4"
                strokeLinecap="round"
                className="sound-wave-2"
            />
        </svg>
    );
}

// 5. Digital Marketing Custom SVG Icon
function DigitalMarketingIcon() {
    return (
        <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-110 select-none z-10"
        >
            <defs>
                <linearGradient id="marketingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A66BFF" />
                    <stop offset="50%" stopColor="#5F2EFF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>

            {/* Rising bars */}
            <path
                d="M12 34 V29"
                stroke="url(#marketingGradient)"
                strokeWidth="3.6"
                strokeLinecap="round"
                className="marketing-bar-1"
            />

            <path
                d="M19 34 V25"
                stroke="url(#marketingGradient)"
                strokeWidth="3.6"
                strokeLinecap="round"
                className="marketing-bar-2"
            />

            <path
                d="M26 34 V21"
                stroke="url(#marketingGradient)"
                strokeWidth="3.6"
                strokeLinecap="round"
                className="marketing-bar-3"
            />

            {/* Growth line */}
            <path
                d="M11 27 L19 20 L25 24 L37 12"
                stroke="url(#marketingGradient)"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Arrow */}
            <path
                d="M30 12 H37 V19"
                stroke="url(#marketingGradient)"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="marketing-arrow"
            />
        </svg>
    );
}

// 6. Web Design Custom SVG Icon
function WebDesignIcon() {
    return (
        <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-110 select-none z-10"
        >
            <defs>
                <linearGradient id="webGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A66BFF" />
                    <stop offset="50%" stopColor="#5F2EFF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>

            {/* Monitor */}
            <rect
                x="9"
                y="11"
                width="30"
                height="21"
                rx="2"
                stroke="url(#webGradient)"
                strokeWidth="3.6"
                className="monitor-screen"
            />

            {/* Stand */}
            <path
                d="M24 32 V37"
                stroke="url(#webGradient)"
                strokeWidth="3.6"
                strokeLinecap="round"
            />

            {/* Base */}
            <path
                d="M17 37 H31"
                stroke="url(#webGradient)"
                strokeWidth="3.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

// 7. Creator Support Custom SVG Icon
function CreatorSupportIcon() {
    return (
        <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-110 select-none z-10"
        >
            <defs>
                <linearGradient id="creatorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A66BFF" />
                    <stop offset="50%" stopColor="#5F2EFF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>

            {/* Head bouncing */}
            <circle
                cx="24"
                cy="17"
                r="5"
                stroke="url(#creatorGradient)"
                strokeWidth="3.6"
                className="creator-head"
            />

            {/* Shoulders */}
            <path
                d="M13 35 C13 28 18 25 24 25 C30 25 35 28 35 35"
                stroke="url(#creatorGradient)"
                strokeWidth="3.6"
                strokeLinecap="round"
            />

            {/* Small base line */}
            <path
                d="M11 35 H37"
                stroke="url(#creatorGradient)"
                strokeWidth="3.4"
                strokeLinecap="round"
            />
        </svg>
    );
}

// 8. Production Support Custom SVG Icon
function ProductionSupportIcon() {
    return (
        <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-110 select-none z-10"
        >
            <defs>
                <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A66BFF" />
                    <stop offset="50%" stopColor="#5F2EFF" />
                    <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
            </defs>

            {/* Clapperboard top (animating clap) */}
            <path
                d="M10 15 L36 10 L38 17 L12 22 Z"
                stroke="url(#productionGradient)"
                strokeWidth="3.6"
                strokeLinejoin="round"
                className="clapper-bar"
            />

            {/* Main board */}
            <rect
                x="11"
                y="21"
                width="26"
                height="18"
                rx="1.5"
                stroke="url(#productionGradient)"
                strokeWidth="3.6"
            />

            {/* Clapper stripes */}
            <path
                d="M16 13 L19 20"
                stroke="url(#productionGradient)"
                strokeWidth="3.2"
            />

            <path
                d="M24 11.5 L27 18.5"
                stroke="url(#productionGradient)"
                strokeWidth="3.2"
            />

            <path
                d="M32 10 L35 17"
                stroke="url(#productionGradient)"
                strokeWidth="3.2"
            />
        </svg>
    );
}

export default function WhatWeDo() {
    return (
        <section className="relative pt-[60px] md:pt-[70px] pb-[60px] md:pb-[70px] px-margin-mobile md:px-margin-desktop bg-[radial-gradient(ellipse_at_top,_var(--color-surface-container-low)_0%,_var(--color-background)_100%)] overflow-hidden border-b border-white/[0.03]">
            {/* Scoped CSS micro-animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes clap {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(-10deg); }
                }
                @keyframes megaphone-shake {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-4deg); }
                    75% { transform: rotate(4deg); }
                }
                @keyframes wave-pulse {
                    0%, 100% { transform: scale(0.9); opacity: 0.3; }
                    50% { transform: scale(1.1) translateX(1px); opacity: 1; }
                }
                @keyframes pen-draw {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-3px) translateX(1px); }
                }
                @keyframes pencil-draw {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-2px, -2px); }
                }
                @keyframes monitor-shine {
                    0%, 100% { opacity: 0.75; }
                    50% { opacity: 1; filter: drop-shadow(0 0 1px rgba(166,107,255,0.4)); }
                }
                @keyframes bar-grow {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(1.35); }
                }
                @keyframes creator-bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-2.5px); }
                }

                .group:hover .pen-nib {
                    animation: pen-draw 1.5s ease-in-out infinite;
                }
                .group:hover .design-pencil {
                    animation: pencil-draw 1.2s ease-in-out infinite;
                }
                .group:hover .reel-1 {
                    animation: spin-slow 3s linear infinite;
                    transform-origin: 15px 11px;
                }
                .group:hover .reel-2 {
                    animation: spin-slow 3s linear infinite;
                    transform-origin: 23px 11px;
                }
                .group:hover .megaphone {
                    animation: megaphone-shake 1.2s ease-in-out infinite;
                    transform-origin: 18px 26px;
                }
                .group:hover .sound-wave-1 {
                    animation: wave-pulse 1.2s ease-in-out infinite;
                    transform-origin: 35px 24px;
                }
                .group:hover .sound-wave-2 {
                    animation: wave-pulse 1.2s ease-in-out infinite;
                    transform-origin: 38px 24px;
                    animation-delay: 0.25s;
                }
                .group:hover .marketing-bar-1 {
                    animation: bar-grow 1s ease-in-out infinite;
                    transform-origin: 12px 34px;
                }
                .group:hover .marketing-bar-2 {
                    animation: bar-grow 1s ease-in-out infinite;
                    transform-origin: 19px 34px;
                    animation-delay: 0.15s;
                }
                .group:hover .marketing-bar-3 {
                    animation: bar-grow 1s ease-in-out infinite;
                    transform-origin: 26px 34px;
                    animation-delay: 0.3s;
                }
                .group:hover .marketing-arrow {
                    animation: megaphone-shake 1.2s ease-in-out infinite;
                    transform-origin: 11px 27px;
                }
                .group:hover .monitor-screen {
                    animation: monitor-shine 1.5s ease-in-out infinite;
                }
                .group:hover .creator-head {
                    animation: creator-bounce 1.5s ease-in-out infinite;
                    transform-origin: center;
                }
                .group:hover .clapper-bar {
                    animation: clap 0.8s ease-in-out infinite;
                    transform-origin: 10px 15px;
                }
            `}} />

            {/* Ambient glowing fields */}
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-[10%] w-[320px] h-[320px] rounded-full bg-secondary/[0.03] blur-[80px] pointer-events-none" />

            <div className="relative max-w-container-max mx-auto">

                {/* Section Header */}
                <motion.div
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="flex flex-col items-center text-center mb-[48px] md:mb-[56px]"
                >
                    <p className="font-sans-premium text-label-premium uppercase tracking-[0.35em] text-primary mb-3">
                        WHAT WE DO
                    </p>
                    <h2 className="font-sans-premium font-extrabold text-[2.2rem] md:text-[3.2rem] text-white leading-tight tracking-[0.05em] uppercase">
                        BUILD. CREATE. ELEVATE.
                    </h2>
                    <div className="mt-stack-sm w-[72px] h-[2px] rounded-full bg-gradient-to-r from-primary via-gold-accent to-secondary" />
                </motion.div>

                {/* 8-Card Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
                    {SERVICES.map((service, idx) => (
                        <motion.div
                            key={service.title}
                            custom={idx}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            className="group relative flex flex-col items-center text-center px-4 py-8 rounded-[16px] bg-surface-container-low/40 border border-white/[0.04] hover:border-primary/30 hover:bg-surface-container/60 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(95,46,255,0.18)]"
                        >
                            {/* Card Hover Inner Radial Glow */}
                            <div className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(95,46,255,0.06)_0%,_transparent_70%)]" />

                            {/* Icon Container */}
                            <div className="relative mb-6 flex items-center justify-center w-12 h-12">
                                {/* Background glow beneath icon */}
                                <div className="absolute inset-0 bg-primary/20 blur-md rounded-full scale-75 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />

                                {/* Icon rendering (All 8 are high-fidelity SVGs) */}
                                {service.icon === 'brand' && <FountainPenIcon />}
                                {service.icon === 'graphic' && <GraphicDesignIcon />}
                                {service.icon === 'video' && <VideoProductionIcon />}
                                {service.icon === 'social' && <SocialMediaIcon />}
                                {service.icon === 'marketing' && <DigitalMarketingIcon />}
                                {service.icon === 'web' && <WebDesignIcon />}
                                {service.icon === 'creator' && <CreatorSupportIcon />}
                                {service.icon === 'production' && <ProductionSupportIcon />}
                            </div>

                            {/* Title */}
                            <h3 className="font-sans-premium text-[11px] md:text-[12px] font-semibold text-white tracking-[0.18em] uppercase mb-3 z-10 select-none">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="font-sans-premium text-[11px] md:text-[12.5px] text-on-surface-variant/85 leading-relaxed z-10">
                                {service.description}
                            </p>

                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
