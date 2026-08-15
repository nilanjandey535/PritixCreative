import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

//import heroImg from '../assets/hero.png

import corporateImage from '../assets/corporate_event.jpg';
import equipment from '../assets/equipment.jpg';
import collegeFestival from '../assets/festival.jpeg';
import govImage from '../assets/Government_event.jpg';
import nicCamp from '../assets/pre_republic_event.jpg';
import brand from '../assets/college_festival.JPG';

import behThe from '../assets/behind_the_scene_1.mp4';
import ganga from '../assets/ganga1.mp4';
import gangaSagar from '../assets/gangasagar_1.mp4';
import kiff from '../assets/KIFF_2K25_Sample_video_0.1_1.mp4';
import ganga1 from '../assets/Ganga1.png';
import kolkataFair from '../assets/kolkata_fair.jpg';
import beh from '../assets/behind.jpg';
import droneVideo from '../assets/drone_video.mp4';
import konika from '../assets/konika.mp4';
import promotional from '../assets/promotional.mp4';
import nicCamp1 from '../assets/NIC_camp.mp4';
import kalika from '../assets/kalika.jpg';
import poster from '../assets/poster.jpg';
import gym from '../assets/gym.mp4';
import nic from '../assets/NIC.jpg';
import rmk from '../assets/RMK.mp4';
import final from '../assets/final_ch.mp4';
import secPoster from '../assets/second_poster.jpeg';

const LABEL_FROM_ID = {
  photography: 'Photography',
  other: 'Other Activities',
  'brand-design': 'Brand Promotion',
  'social-media': 'Videos',
};

const GALLERY = {
  photography: [
    { type: 'image', src: govImage, label: 'Government Event' },
    { type: 'image', src: corporateImage, label: 'Corporate Event' },
    { type: 'image', src: equipment, label: 'Equipment' },
    { type: 'image', src: brand, label: 'College Festival' },
    { type: 'image', src: nicCamp, label: 'Republic Day Film' },
    { type: 'image', src: nic, label: 'NIC Camp 2026' },
    { type: 'image', src: collegeFestival, label: 'Brand Film' },
  ],
  'social-media': [
    //{ type: 'video', src: gangaSagar, poster: gangaSagar1, label: 'Ganga Sagar Festival2' },
    { type: 'video', src: ganga, poster: ganga1, label: 'Ganga Festival' },
    { type: 'video', src: droneVideo, label: 'Drone Video' },
    { type: 'video', src: konika, label: 'Edited Video' },
    { type: 'video', src: behThe, poster: beh, label: 'Behind the Scene' },
    { type: 'video', src: kiff, poster: kolkataFair, label: 'Kolkata Fair Festival' },
  ],
  'brand-design': [
    { type: 'video', src: gangaSagar, label: 'Ganga Sagar Festival' },
    { type: 'video', src: promotional, label: 'Brand Film' },
    { type: 'instagram', src: kalika, url: 'https://www.instagram.com/reel/DbLZHhDSpS2/?igsh=ZnJzc2k0M2d3cWxq', label: 'Kalika Jewellers' },
    { type: 'video', src: rmk, label: 'Promtional Video' },
    { type: 'instagram', url: 'https://www.instagram.com/reel/DblLo1Zzrpo/?igsh=MW8wbnQ0YnJueGk1dg==', label: 'Dentist Reaction' },
    { type: 'video', src: nicCamp1, label: 'NIC Camp 2026' },
    { type: 'instagram', url: 'https://www.instagram.com/reel/DbS9hmhyU9R/?igsh=MXc1ZGFxcW5qdTJqbg==', label: 'Jewellery Promotional Design' },
    { type: 'video', src: final, label: 'Promotional Video' },
    //{ type: 'facebook', url: 'https://www.facebook.com/share/r/1P5pQb27HD/', label: 'Promotional Poster Design' },
  ],
  other: [
    { type: 'youtube', url: 'https://youtu.be/Zq5oyEWFwrU?si=o_eSzJ9hu5TPxhdq', label: 'Podcast' },
    { type: 'youtube', url: 'https://youtu.be/7xLcgYeHp0g?si=OdyTCEd1bbFbPQht', label: 'Life Documentory' },
    { type: 'image', src: poster, label: 'Promotional Poster Design' },
    { type: 'instagram', url: 'https://www.instagram.com/reel/DbGGalZz0cF/?igsh=MW5jdXpzNGZ2ZWpvaQ==', label: 'Reels' },
    { type: 'instagram', url: 'https://www.instagram.com/reel/DYPdQq_Ppzo/?utm_source=ig_web_button_share_sheet', label: 'Instagram Reel' },
    { type: 'image', src: secPoster, label: 'Promotional Poster Design' },
  ],
};

const getYouTubeId = (url = '') => {
  if (!url) return null;
  // Match youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([^&?#/]+)/);
  if (watchMatch) return watchMatch[1];
  // Match youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([^&?#/]+)/);
  if (shortMatch) return shortMatch[1];
  // Match youtube.com/embed/ID / shorts
  const embedMatch = url.match(/youtube\.com\/(?:embed|shorts)\/([^&?#/]+)/);
  if (embedMatch) return embedMatch[1];
  return null;
};

const getInstagramId = (url = '') => {
  if (!url) return null;
  // Handle /p/..., /reel/..., /reels/..., /tv/..., /stories/<user>/<id>
  const m =
    url.match(/instagram\.com\/(?:p|reel|reels|tv|stories(?:\/[^/?#]+)?)\/([^/?#]+)/) ||
    url.match(/instagr\.am\/(?:p|reel|reels|tv)\/([^/?#]+)/);
  return m ? m[1] : null;
};

const getFacebookVideoId = (url = '') => {
  if (!url) return null;
  const m1 = url.match(/facebook\.com\/share\/v\/([^/?#]+)/);
  if (m1) return { kind: 'share', id: m1[1] };
  const m2 = url.match(/facebook\.com\/[^/?#]+\/videos\/(\d+)/);
  if (m2) return { kind: 'video', id: m2[1] };
  const m3 = url.match(/facebook\.com\/watch\/\?v=(\d+)/);
  if (m3) return { kind: 'video', id: m3[1] };
  const m4 = url.match(/fb\.watch\/([^/?#]+)/);
  if (m4) return { kind: 'watch', id: m4[1] };
  return null;
};

const getTikTokId = (url = '') => {
  if (!url) return null;
  const m = url.match(/tiktok\.com\/@[^/?#]+\/video\/(\d+)/) || url.match(/vm\.tiktok\.com\/([^/?#]+)/);
  return m ? m[1] : null;
};

const getVimeoId = (url = '') => {
  if (!url) return null;
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
};

const getSocialHost = (url = '') => {
  try {
    const u = new URL(url);
    const h = u.hostname.replace(/^www\./, '').toLowerCase();
    if (h.includes('youtube') || h === 'youtu.be') return 'youtube';
    if (h.includes('instagram')) return 'instagram';
    if (h.includes('facebook') || h.includes('fb.')) return 'facebook';
    if (h.includes('tiktok') || h === 'vm.tiktok.com') return 'tiktok';
    if (h.includes('twitter') || h === 'x.com') return 'twitter';
    if (h.includes('vimeo')) return 'vimeo';
    return 'generic';
  } catch {
    return 'generic';
  }
};

const SOCIAL_META = {
  youtube: { label: 'YouTube', color: 'bg-red-600/95', border: 'border-red-400/40', fill: 'fill-red-500', shadow: 'shadow-[0_0_25px_rgba(255,0,0,0.35)]' },
  instagram: { label: 'Instagram', color: 'bg-pink-600/95', border: 'border-pink-400/40', fill: 'fill-pink-500', shadow: 'shadow-[0_0_25px_rgba(236,72,153,0.35)]' },
  facebook: { label: 'Facebook', color: 'bg-blue-600/95', border: 'border-blue-400/40', fill: 'fill-blue-500', shadow: 'shadow-[0_0_25px_rgba(59,130,246,0.35)]' },
  tiktok: { label: 'TikTok', color: 'bg-black/95', border: 'border-white/30', fill: 'fill-black', shadow: 'shadow-[0_0_25px_rgba(0,0,0,0.55)]' },
  twitter: { label: 'X', color: 'bg-black/95', border: 'border-white/30', fill: 'fill-black', shadow: 'shadow-[0_0_25px_rgba(0,0,0,0.55)]' },
  vimeo: { label: 'Vimeo', color: 'bg-sky-600/95', border: 'border-sky-400/40', fill: 'fill-sky-500', shadow: 'shadow-[0_0_25px_rgba(14,165,233,0.35)]' },
  generic: { label: 'Video', color: 'bg-primary/95', border: 'border-primary/40', fill: 'fill-primary', shadow: 'shadow-[0_0_25px_rgba(95,46,255,0.35)]' },
};

const getSocialMeta = (url) => SOCIAL_META[getSocialHost(url)] ?? SOCIAL_META.generic;

const SOCIAL_EMBED_TYPES = ['youtube', 'instagram', 'facebook'];
const isSocialEmbedType = (type) => SOCIAL_EMBED_TYPES.includes(type);

const getEmbedUrl = (url = '') => {
  if (!url) return '';
  const host = getSocialHost(url);
  if (host === 'youtube') {
    const ytId = getYouTubeId(url);
    if (!ytId) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return (
      `https://www.youtube.com/embed/${ytId}` +
      `?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1` +
      `&origin=${encodeURIComponent(origin)}`
    );
  }
  if (host === 'instagram') {
    // /p/ID/embed/ works for both posts and reels. IG respects autoplay=1 when muted.
    const id = getInstagramId(url);
    if (!id) return '';
    return `https://www.instagram.com/p/${id}/embed/?cr=1&v=14&w=720&autoplay=1&muted=1&controls=0&omitscript=1`;
  }
  if (host === 'facebook') {
    const encoded = encodeURIComponent(url);
    return (
      `https://www.facebook.com/plugins/video.php` +
      `?href=${encoded}` +
      `&width=960` +
      `&show_text=false` +
      `&height=540` +
      `&autoplay=1` +
      `&mute=1` +
      `&allowfullscreen=true` +
      `&t=0`
    );
  }
  if (host === 'tiktok') {
    const id = getTikTokId(url);
    if (!id) return '';
    return `https://www.tiktok.com/embed/v2/${id}?autoplay=1&muted=1`;
  }
  if (host === 'twitter') {
    const encoded = encodeURIComponent(url);
    return `https://twitframe.com/show?url=${encoded}`;
  }
  if (host === 'vimeo') {
    const id = getVimeoId(url);
    if (!id) return '';
    return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&title=0&byline=0&portrait=0&playsinline=1&transparent=1`;
  }
  return '';
};

// Per-network aspect ratio for the active card media panel.
// Returned as a CSS aspect-ratio string so the full post is visible (no object-cover cropping).
const getEmbedAspect = (url = '') => {
  switch (getSocialHost(url)) {
    case 'instagram':
    case 'tiktok':
      return '9 / 16';           // vertical reel/story/tik
    case 'twitter':
      return 'auto';             // tweets are self-sizing, let iframe's scroll show all
    case 'facebook':
      return '16 / 9';           // FB video player landscape
    case 'vimeo':
    case 'youtube':
    default:
      return '16 / 9';           // standard cinematic
  }
};

const canUseYouTubeJSAPI = (url = '') => getSocialHost(url) === 'youtube';

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

const panel = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0, y: 30, scale: 0.98,
    transition: { duration: 0.35, ease: 'easeIn' },
  },
};

const circularDistance = (index, activeIndex, total) => {
  if (total <= 1) return 0;
  const raw = ((index - activeIndex) % total + total) % total;
  return raw > total / 2 ? raw - total : raw;
};

const getCardStyle = (index, activeIndex, total) => {
  const distance = circularDistance(index, activeIndex, total);
  const absDistance = Math.abs(distance);

  let scale = 1;
  let opacity = 1;
  let translateX = distance * 68;
  let zIndex = total - absDistance;

  if (absDistance === 0) {
    scale = 1;
    opacity = 1;
  } else if (absDistance === 1) {
    scale = 0.78;
    opacity = 0.7;
    translateX = distance * 100 * 0.62;
  } else if (absDistance === 2) {
    scale = 0.58;
    opacity = 0.35;
    translateX = distance * 100 * 0.85;
  } else {
    scale = 0.4;
    opacity = 0;
    translateX = distance * 100 * 1.1;
  }

  return {
    transform: `translateX(${translateX}%) scale(${scale})`,
    opacity,
    zIndex,
    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };
};

export default function FilterModal({ filterId, onClose }) {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef({});
  const ytIframeRefs = useRef({});
  const [playingStates, setPlayingStates] = useState({});
  const [showControls, setShowControls] = useState(false);
  const [muteStates, setMuteStates] = useState({});
  const [ytMuteStates, setYtMuteStates] = useState({});
  const [ytLockStates, setYtLockStates] = useState({}); // true when 4-min limit reached
  const ytCurrentTimesRef = useRef({});
  const ytPollTimersRef = useRef({});
  const ytRedirectTimeoutRef = useRef(null);
  const ytStartTimeRef = useRef({});
  const ytActivationKeys = useRef({});
  const YT_MAX_SECONDS = 4 * 60;

  const ytSetRef = (key, el) => {
    ytIframeRefs.current[key] = el;
  };

  const ytSendCommand = (key, func, args = '') => {
    const iframe = ytIframeRefs.current[key];
    if (!iframe || !iframe.contentWindow) return;
    try {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func,
          args: args === '' ? '' : Array.isArray(args) ? args : [args],
        }),
        '*'
      );
    } catch (_e) { }
  };

  // Parse YouTube JS API messages from iframes → store currentTime per iframe key
  useEffect(() => {
    const onMessage = (ev) => {
      if (typeof ev.data !== 'string') return;
      try {
        const msg = JSON.parse(ev.data);
        if (!msg || msg.event !== 'infoDelivery' || !msg.info) return;
        const iframe = Object.values(ytIframeRefs.current).find((f) => f && f.contentWindow === ev.source);
        if (!iframe) return;
        const key = Object.keys(ytIframeRefs.current).find((k) => ytIframeRefs.current[k] === iframe);
        if (!key) return;
        if (typeof msg.info.currentTime === 'number' && isFinite(msg.info.currentTime)) {
          ytCurrentTimesRef.current[key] = msg.info.currentTime;
        }
        if (typeof msg.info.duration === 'number' && isFinite(msg.info.duration)) {
          ytCurrentTimesRef.current[`${key}__dur`] = msg.info.duration;
        }
      } catch (_) { }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    if (!filterId) return;
    setActiveIndex(0);
    setShowControls(false);
    setYtMuteStates({});
    setYtLockStates({});
    ytCurrentTimesRef.current = {};
    Object.values(ytPollTimersRef.current).forEach((t) => clearInterval(t));
    ytPollTimersRef.current = {};
    ytStartTimeRef.current = {};
    if (ytRedirectTimeoutRef.current) {
      clearTimeout(ytRedirectTimeoutRef.current);
      ytRedirectTimeoutRef.current = null;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleEsc);

    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' });

    return () => {
      document.body.style.overflow = prevOverflow || '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [filterId, onClose]);

  useEffect(() => {
    if (!filterId) return;
    const items = GALLERY[filterId] || [];
    const activeMedia = items[activeIndex];
    setShowControls(false);

    // Clean up any running YT polls + pending redirect from the previously-active card
    Object.values(ytPollTimersRef.current).forEach((t) => clearInterval(t));
    ytPollTimersRef.current = {};
    if (ytRedirectTimeoutRef.current) {
      clearTimeout(ytRedirectTimeoutRef.current);
      ytRedirectTimeoutRef.current = null;
    }

    if (!activeMedia) return;

    // First: pause & reset ALL video-type cards except the incoming active one.
    // This ensures side (left/right) cards stop immediately whenever you swipe.
    const galleryItems = GALLERY[filterId] || [];
    galleryItems.forEach((m, i) => {
      if (m.type !== 'video') return;
      const k = `${filterId}-${i}`;
      if (i === activeIndex) return;
      const v = videoRefs.current[k];
      if (!v) return;
      try {
        if (!v.paused) v.pause();
        v.currentTime = 0;
        setPlayingStates((prev) => {
          if (prev[k] === false) return prev;
          return { ...prev, [k]: false };
        });
      } catch (_) { }
    });

    if (activeMedia.type === 'video') {
      const vKey = `${filterId}-${activeIndex}`;
      const video = videoRefs.current[vKey];
      if (!video) return;
      const defaultMuted = muteStates[vKey] !== false;
      try {
        video.muted = defaultMuted;
        video.volume = 1;
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise
            .then(() => {
              setPlayingStates((prev) => ({ ...prev, [vKey]: !video.paused }));
              if (defaultMuted) {
                try {
                  video.muted = false;
                  setMuteStates((prev) => ({ ...prev, [vKey]: false }));
                } catch (_) { }
              }
            })
            .catch(() => { });
        } else {
          setPlayingStates((prev) => ({ ...prev, [vKey]: !video.paused }));
          if (defaultMuted) {
            try {
              video.muted = false;
              setMuteStates((prev) => ({ ...prev, [vKey]: false }));
            } catch (_) { }
          }
        }
      } catch (_) { }
      return;
    }

    if (activeMedia.type === 'youtube') {
      const ytKey = `${filterId}-${activeIndex}`;
      if (ytLockStates[ytKey]) return;
      ytCurrentTimesRef.current[ytKey] = 0;
      ytStartTimeRef.current[ytKey] = Date.now();
      ytActivationKeys.current[ytKey] = (ytActivationKeys.current[ytKey] ?? 0) + 1;
      setYtMuteStates((prev) => {
        if (prev[ytKey] !== false) return prev;
        return { ...prev, [ytKey]: true };
      });
      const isYT = canUseYouTubeJSAPI(activeMedia.url);
      ytPollTimersRef.current[ytKey] = setInterval(() => {
        if (ytLockStates[ytKey]) return;
        const ytTime = ytCurrentTimesRef.current[ytKey] ?? 0;
        const wallElapsed = (Date.now() - (ytStartTimeRef.current[ytKey] ?? Date.now())) / 1000;
        const t = Math.max(ytTime, wallElapsed);
        if (t >= YT_MAX_SECONDS) {
          if (isYT) {
            ytSendCommand(ytKey, 'seekTo', [YT_MAX_SECONDS, true]);
            ytSendCommand(ytKey, 'pauseVideo');
          }
          clearInterval(ytPollTimersRef.current[ytKey]);
          delete ytPollTimersRef.current[ytKey];
          setYtLockStates((prev) => ({ ...prev, [ytKey]: true }));
          if (ytRedirectTimeoutRef.current) clearTimeout(ytRedirectTimeoutRef.current);
          ytRedirectTimeoutRef.current = setTimeout(() => {
            if (activeMedia?.url) window.open(activeMedia.url, '_blank', 'noopener,noreferrer');
            ytRedirectTimeoutRef.current = null;
          }, 2200);
        }
      }, 700);
    } else if (activeMedia.type === 'instagram' || activeMedia.type === 'facebook') {
      const sKey = `${filterId}-${activeIndex}`;
      ytCurrentTimesRef.current[sKey] = 0;
      ytStartTimeRef.current[sKey] = Date.now();
      ytActivationKeys.current[sKey] = (ytActivationKeys.current[sKey] ?? 0) + 1;
      setYtMuteStates((prev) => {
        if (prev[sKey] !== false) return prev;
        return { ...prev, [sKey]: true };
      });
    }
  }, [filterId, activeIndex]);

  // Cleanup all YT poll timers + redirect timeout on unmount
  useEffect(() => {
    return () => {
      Object.values(ytPollTimersRef.current).forEach((t) => clearInterval(t));
      ytPollTimersRef.current = {};
      if (ytRedirectTimeoutRef.current) {
        clearTimeout(ytRedirectTimeoutRef.current);
        ytRedirectTimeoutRef.current = null;
      }
    };
  }, []);

  if (!filterId) return null;
  const items = GALLERY[filterId] || [];
  const label = LABEL_FROM_ID[filterId] || 'Gallery';

  const goContact = () => {
    onClose?.();
    navigate('/contact');
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const setVideoRef = (key, el) => {
    videoRefs.current[key] = el;
  };

  const handleVideoPlayPause = (e, key) => {
    e.stopPropagation();
    const video = videoRefs.current[key];
    if (!video) return;
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.then === 'function') {
        p.then(() => setPlayingStates((prev) => ({ ...prev, [key]: true }))).catch(() => { });
      } else {
        setPlayingStates((prev) => ({ ...prev, [key]: true }));
      }
    } else {
      video.pause();
      setPlayingStates((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleVideoRewind = (e, key) => {
    e.stopPropagation();
    const video = videoRefs.current[key];
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  const handleVideoForward = (e, key) => {
    e.stopPropagation();
    const video = videoRefs.current[key];
    if (!video) return;
    const maxT = (video.duration && isFinite(video.duration)) ? video.duration : Infinity;
    video.currentTime = Math.min(maxT, video.currentTime + 10);
  };

  const onVideoPlayStateUpdate = (key, playing) => {
    setPlayingStates((prev) => ({ ...prev, [key]: playing }));
  };

  const handleVideoClickToggleControls = (e) => {
    e.stopPropagation();
    setShowControls((prev) => !prev);
  };

  const openYouTube = (e, url) => {
    e.stopPropagation();
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleVideoMute = (e, key) => {
    e.stopPropagation();
    const video = videoRefs.current[key];
    setMuteStates((prev) => {
      const wasMuted = prev[key] !== false;
      const muted = !wasMuted;
      if (video) {
        try {
          video.muted = muted;
          if (!muted && video.paused) {
            const p = video.play();
            if (p && typeof p.then === 'function') p.catch(() => { });
          }
        } catch (_) { }
      }
      return { ...prev, [key]: muted };
    });
  };

  const toggleYouTubeMute = (e, key) => {
    e.stopPropagation();
    const idxStr = key.split('-').pop();
    const idx = parseInt(idxStr, 10);
    const galleryItems = GALLERY[filterId] || [];
    const media = galleryItems[idx];
    const host = media?.url ? getSocialHost(media.url) : 'youtube';
    setYtMuteStates((prev) => {
      const wasMuted = prev[key] !== false;
      const muted = !wasMuted;
      if (host === 'youtube') {
        ytSendCommand(key, muted ? 'mute' : 'unMute');
      } else if (host === 'instagram' || host === 'facebook') {
        ytStartTimeRef.current[key] = Date.now();
        ytActivationKeys.current[key] = (ytActivationKeys.current[key] ?? 0) + 1;
      }
      return { ...prev, [key]: muted };
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[100] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-inverse-surface/70 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(95,46,255,0.12)_0%,_transparent_65%)]" />

        <motion.div
          key="modal-panel"
          variants={panel}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full h-full flex flex-col bg-transparent overflow-hidden"
        >
          {/* Header */}
          <div className="relative px-margin-mobile md:px-12 py-5 md:py-7 flex items-center justify-between gap-stack-md">
            <div className="flex items-center gap-stack-md min-w-0">
              <button
                onClick={onClose}
                className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 shrink-0 group"
                aria-label="Back"
              >
                <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:-translate-x-0.5" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                  arrow_back
                </span>
              </button>
              <div className="min-w-0">
                <p className="font-sans-premium text-[10px] uppercase tracking-[0.3em] text-primary-fixed-dim mb-1">
                  Stories We&apos;ve Captured
                </p>
                <h3 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] text-white leading-tight tracking-tight truncate">
                  {label}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="hidden md:flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 shrink-0"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                close
              </span>
            </button>
          </div>

          {/* Carousel Gallery */}
          <div
            ref={scrollRef}
            className="relative flex-1 flex items-center justify-center overflow-hidden no-scrollbar"
          >
            {/* Left Arrow — scrolls strip RIGHT */}
            <button
              onClick={prev}
              className="absolute left-4 md:left-10 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/15 bg-inverse-surface/30 backdrop-blur-md text-white/80 hover:text-white hover:border-primary/60 hover:bg-primary/20 transition-all duration-300 group"
              aria-label="Scroll Left"
            >
              <span className="material-symbols-outlined text-2xl md:text-3xl transition-transform duration-300 group-hover:-translate-x-0.5" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                chevron_left
              </span>
            </button>

            {/* Right Arrow — scrolls strip LEFT */}
            <button
              onClick={next}
              className="absolute right-4 md:right-10 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/15 bg-inverse-surface/30 backdrop-blur-md text-white/80 hover:text-white hover:border-primary/60 hover:bg-primary/20 transition-all duration-300 group"
              aria-label="Scroll Right"
            >
              <span className="material-symbols-outlined text-2xl md:text-3xl transition-transform duration-300 group-hover:translate-x-0.5" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                chevron_right
              </span>
            </button>

            {/* Carousel Container */}
            <div className="relative w-full h-full flex items-center justify-center perspective-[1500px]">
              <div className="relative w-full h-[60vh] md:h-[68vh] flex items-center justify-center">
                {items.map((media, i) => {
                  const style = getCardStyle(i, activeIndex, items.length);
                  const isActive = i === activeIndex;
                  const isNear = Math.abs(circularDistance(i, activeIndex, items.length)) <= 2;
                  const vKey = `${filterId}-${i}`;

                  if (!isNear) return null;

                  return (
                    <div
                      key={vKey}
                      className="absolute w-[70vw] md:w-[460px] max-w-[520px] h-[55vh] md:h-[62vh] max-h-[540px] will-change-transform"
                      style={style}
                    >
                      <div
                        className={`group relative w-full h-full overflow-hidden rounded-[20px] bg-black/80 border ${isActive ? 'border-primary/40 shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_80px_rgba(95,46,255,0.35)]' : 'border-white/[0.06] shadow-[0_15px_50px_rgba(0,0,0,0.5)]'} transition-all duration-500`}
                        onClick={(e) => {
                          if (isSocialEmbedType(media.type) && isActive) return;
                          setActiveIndex(i);
                        }}
                      >
                        {media.type === 'video' ? (
                          (() => {
                            const muted = muteStates[vKey] !== false;
                            return (
                              <video
                                ref={(el) => setVideoRef(vKey, el)}
                                src={media.src}
                                poster={media.poster}
                                muted={muted}
                                loop
                                playsInline
                                preload="metadata"
                                volume={1}
                                onPlay={() => {
                                  onVideoPlayStateUpdate(vKey, true);
                                  const v = videoRefs.current[vKey];
                                  if (v && v.muted) {
                                    try {
                                      v.muted = false;
                                      setMuteStates((prev) => ({ ...prev, [vKey]: false }));
                                    } catch (_) { }
                                  }
                                }}
                                onPause={() => onVideoPlayStateUpdate(vKey, false)}
                                onClick={isActive ? handleVideoClickToggleControls : undefined}
                                className={`w-full h-full object-contain bg-black/70 ${isActive ? 'cursor-pointer' : ''}`}
                              />
                            );
                          })()
                        ) : isSocialEmbedType(media.type) ? (
                          (() => {
                            const muted = ytMuteStates[vKey] !== false;
                            const locked = !!ytLockStates[vKey];
                            const host = getSocialHost(media.url);
                            const meta = SOCIAL_META[host] ?? SOCIAL_META.generic;
                            let embedUrl = '';
                            const origin = typeof window !== 'undefined' ? window.location.origin : '';
                            const ak = ytActivationKeys.current[vKey] ?? 0;
                            if (host === 'youtube') {
                              const ytId = getYouTubeId(media.url);
                              if (ytId) {
                                embedUrl =
                                  `https://www.youtube.com/embed/${ytId}` +
                                  `?autoplay=${locked ? 0 : 1}` +
                                  `&mute=1` +
                                  `&controls=1` +
                                  `&rel=0` +
                                  `&modestbranding=1` +
                                  `&playsinline=1` +
                                  `&enablejsapi=1` +
                                  `&origin=${encodeURIComponent(origin)}` +
                                  `&_ak=${ak}`;
                              }
                            } else if (host === 'instagram') {
                              const id = getInstagramId(media.url);
                              if (id) {
                                embedUrl =
                                  `https://www.instagram.com/p/${id}/embed/` +
                                  `?cr=1&v=14&w=720` +
                                  `&autoplay=1` +
                                  `&muted=${muted ? 1 : 0}` +
                                  `&controls=0` +
                                  `&omitscript=1` +
                                  `&_ak=${ak}`;
                              }
                            } else if (host === 'facebook') {
                              const encoded = encodeURIComponent(media.url);
                              embedUrl =
                                `https://www.facebook.com/plugins/video.php` +
                                `?href=${encoded}` +
                                `&width=960` +
                                `&show_text=false` +
                                `&height=540` +
                                `&autoplay=1` +
                                `&mute=${muted ? 1 : 0}` +
                                `&allowfullscreen=true` +
                                `&t=0` +
                                `&_ak=${ak}`;
                            } else {
                              const base = getEmbedUrl(media.url);
                              if (base) {
                                embedUrl = base + (base.includes('?') ? '&' : '?') + `_ak=${ak}`;
                              }
                            }
                            if (isActive && embedUrl) {
                              const isYT = host === 'youtube';
                              const isIG = host === 'instagram';
                              const aspect = getEmbedAspect(media.url);
                              return (
                                <>
                                  <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
                                    <div
                                      className="bg-black flex items-center justify-center"
                                      style={{
                                        aspectRatio: aspect,
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: aspect === '9 / 16' ? 'auto' : '100%',
                                        height: aspect === '9 / 16' ? '100%' : 'auto',
                                        minWidth: 0,
                                        minHeight: 0,
                                      }}
                                    >
                                      {isIG ? (
                                        <div key={`ig-${vKey}-${ak}`} className="relative w-full h-full overflow-hidden bg-black">
                                          <iframe
                                            src={embedUrl}
                                            title={media.label}
                                            loading="lazy"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            className="absolute block bg-black border-0"
                                            style={{
                                              inset: 0,
                                              width: '100%',
                                              height: '100%',
                                              transform: 'scale(1.42)',
                                              transformOrigin: '50% 38%',
                                            }}
                                            scrolling="no"
                                            allowTransparency="true"
                                          />
                                        </div>
                                      ) : (
                                        <iframe
                                          key={`yt-fb-${vKey}-${ak}`}
                                          ref={(el) => (isYT ? ytSetRef(vKey, el) : null)}
                                          src={embedUrl}
                                          title={media.label}
                                          loading="lazy"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                          referrerPolicy="strict-origin-when-cross-origin"
                                          className="w-full h-full bg-black border-0 block"
                                          scrolling={host === 'twitter' ? 'yes' : 'no'}
                                          allowTransparency="true"
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
                                  <button
                                    onClick={(e) => openYouTube(e, media.url)}
                                    className="absolute top-3.5 right-3.5 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-inverse-surface/80 backdrop-blur border border-white/10 text-white text-[10px] uppercase tracking-[0.2em] hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group"
                                    aria-label={`Open on ${meta.label}`}
                                    title={`Open on ${meta.label}`}
                                  >
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className={`w-3.5 h-3.5 ${meta.fill}`}>
                                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    <span className="hidden sm:inline">Watch</span>
                                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                                      open_in_new
                                    </span>
                                  </button>
                                  {!locked && isSocialEmbedType(media.type) && (
                                    <button
                                      onClick={(e) => toggleYouTubeMute(e, vKey)}
                                      className="absolute right-4 bottom-20 z-30 flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-inverse-surface/70 backdrop-blur text-white hover:text-primary hover:border-primary/60 hover:bg-primary/15 hover:shadow-[0_0_25px_rgba(95,46,255,0.35)] transition-all duration-300"
                                      aria-label={muted ? 'Unmute video' : 'Mute video'}
                                      title={muted ? 'Unmute (Sound On)' : 'Mute (Sound Off)'}
                                    >
                                      <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 500" }}>
                                        {muted ? 'volume_off' : 'volume_up'}
                                      </span>
                                    </button>
                                  )}
                                  {locked && isYT && (
                                    <button
                                      onClick={(e) => openYouTube(e, media.url)}
                                      className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-6 cursor-pointer"
                                      aria-label={`Watch the full video on ${meta.label}, click on it`}
                                    >
                                      <span className="absolute inset-0 bg-inverse-surface/92 backdrop-blur-md" />
                                      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(95,46,255,0.12)_0%,_transparent_60%)]" />
                                      <span className="relative z-10 flex flex-col items-center gap-stack-md max-w-[28rem]">
                                        <span className="relative inline-flex items-center justify-center">
                                          <span className="relative w-20 h-20 md:w-24 md:h-24">
                                            <span className={`absolute inset-0 rounded-full ${meta.color} ${meta.shadow}`} />
                                            <span className="absolute inset-[6%] rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/30" />
                                            <span className="absolute inset-0 flex items-center justify-center pl-[6px]">
                                              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-10 h-10 md:w-12 md:h-12 fill-white drop-shadow">
                                                <path d="M10 15.5v-7l6 3.5-6 3.5z" />
                                              </svg>
                                            </span>
                                          </span>
                                        </span>
                                        <span className="flex flex-col items-center gap-1.5">
                                          <span className="font-sans-premium text-[10px] uppercase tracking-[0.3em] text-primary fixed-dim">
                                            Preview Limited to 4 Minutes
                                          </span>
                                          <span className="font-display text-white text-xl md:text-3xl leading-[1.15] tracking-tight">
                                            Watch the full video on {meta.label}, click on it
                                          </span>
                                          <span className={`mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full border ${meta.border} ${meta.color} text-white text-xs md:text-sm backdrop-blur hover:brightness-110 transition-all duration-300`}>
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                                              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                            Continue on {meta.label}
                                            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                                              arrow_outward
                                            </span>
                                          </span>
                                        </span>
                                      </span>
                                    </button>
                                  )}
                                </>
                              );
                            }
                            return (
                              <>
                                <img
                                  src={media.src}
                                  alt={media.label}
                                  loading="lazy"
                                  className="w-full h-full object-cover bg-black/60 transition-transform duration-[1400ms] ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25 pointer-events-none" />
                                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                  <div className="flex items-center justify-center rounded-full transition-all duration-400 scale-90 opacity-90 group-hover:scale-95">
                                    <div className="relative w-16 h-16 md:w-20 md:h-20">
                                      <div className={`absolute inset-0 rounded-full ${meta.color} ${meta.shadow}`} />
                                      <div className="absolute inset-[7%] rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/30" />
                                      <div className="absolute inset-0 flex items-center justify-center pl-[5px]">
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 md:w-10 md:h-10 fill-white drop-shadow">
                                          <path d="M10 15.5v-7l6 3.5-6 3.5z" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })()
                        ) : (
                          <img
                            src={media.src}
                            alt={media.label}
                            loading="lazy"
                            className={`w-full h-full object-contain bg-black/50 transition-transform duration-[1400ms] ease-out ${isActive ? 'scale-[1.03]' : ''}`}
                          />
                        )}

                        {media.type === 'video' && (
                          <div className="absolute top-4 left-4 z-25 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-inverse-surface/80 backdrop-blur border border-white/10 text-white text-[10px] uppercase tracking-[0.2em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Video
                          </div>
                        )}

                        {media.type === 'video' && isActive && (
                          (() => {
                            const muted = muteStates[vKey] !== false;
                            return (
                              <button
                                onClick={(e) => toggleVideoMute(e, vKey)}
                                className="absolute right-4 bottom-20 z-30 flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-inverse-surface/70 backdrop-blur text-white hover:text-primary hover:border-primary/60 hover:bg-primary/15 hover:shadow-[0_0_25px_rgba(95,46,255,0.35)] transition-all duration-300"
                                aria-label={muted ? 'Unmute video' : 'Mute video'}
                                title={muted ? 'Unmute (Sound On)' : 'Mute (Sound Off)'}
                              >
                                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 500" }}>
                                  {muted ? 'volume_off' : 'volume_up'}
                                </span>
                              </button>
                            );
                          })()
                        )}

                        {isSocialEmbedType(media.type) && (
                          (() => {
                            const meta = getSocialMeta(media.url);
                            return (
                              <div className={`absolute top-4 left-4 z-25 flex items-center gap-1.5 px-3 py-1.5 rounded-full ${meta.color} backdrop-blur border ${meta.border} text-white text-[10px] uppercase tracking-[0.2em] ${meta.shadow}`}>
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-current">
                                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                                {meta.label}
                              </div>
                            );
                          })()
                        )}

                        {/* Active Video Controls — toggle on video click */}
                        {media.type === 'video' && isActive && (
                          <AnimatePresence>
                            {showControls && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center pointer-events-none"
                              >
                                <div className="flex items-center gap-3 pointer-events-auto">
                                  <button
                                    onClick={(e) => handleVideoRewind(e, vKey)}
                                    className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-inverse-surface/50 backdrop-blur-md text-white hover:text-primary hover:border-primary/70 hover:bg-primary/15 transition-all duration-300 group"
                                    aria-label="Rewind 10 seconds"
                                    title="Rewind 10s"
                                  >
                                    <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:scale-110" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                                      replay_10
                                    </span>
                                  </button>
                                  <button
                                    onClick={(e) => handleVideoPlayPause(e, vKey)}
                                    className="flex items-center justify-center w-16 h-16 rounded-full border border-primary/50 bg-primary/80 backdrop-blur-md text-white hover:bg-primary hover:shadow-[0_0_40px_rgba(95,46,255,0.55)] transition-all duration-300 group"
                                    aria-label={playingStates[vKey] ? 'Pause' : 'Play'}
                                    title={playingStates[vKey] ? 'Pause' : 'Play'}
                                  >
                                    <span className="material-symbols-outlined text-3xl transition-transform duration-300 group-hover:scale-110" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>
                                      {playingStates[vKey] ? 'pause' : 'play_arrow'}
                                    </span>
                                  </button>
                                  <button
                                    onClick={(e) => handleVideoForward(e, vKey)}
                                    className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-inverse-surface/50 backdrop-blur-md text-white hover:text-primary hover:border-primary/70 hover:bg-primary/15 transition-all duration-300 group"
                                    aria-label="Forward 10 seconds"
                                    title="Forward 10s"
                                  >
                                    <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:scale-110" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                                      forward_10
                                    </span>
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/92 via-inverse-surface/10 to-transparent pointer-events-none" />
                        {isActive && (
                          <div className="absolute inset-0 rounded-[20px] opacity-100 pointer-events-none shadow-[inset_0_0_80px_rgba(95,46,255,0.18)]" />
                        )}

                        {/* Reliable click/tap catcher — sits ABOVE decorative overlays, BELOW controls & labels */}
                        {media.type === 'video' && isActive && (
                          <div
                            onClick={handleVideoClickToggleControls}
                            className="absolute inset-0 z-20 cursor-pointer"
                            aria-label="Toggle video controls"
                          />
                        )}

                        <div className="absolute left-5 bottom-5 right-5 z-40">
                          <p className="font-sans-premium text-[10px] uppercase tracking-[0.25em] text-gold-accent/90 mb-0.5">
                            {String(i + 1).padStart(2, '0')}
                          </p>
                          <p className="font-display text-white text-lg md:text-2xl leading-tight truncate pr-6">
                            {media.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-400 ${i === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Footer CTA — transparent */}
          <div className="px-margin-mobile md:px-12 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-stack-md">
            <p className="font-sans-premium text-body-md text-on-surface-variant max-w-xl text-center sm:text-left">
              Like what you see? Let&apos;s create something timeless for your brand.
            </p>
            <button
              onClick={goContact}
              className="group inline-flex items-center gap-3 px-7 py-3 bg-primary text-white font-sans-premium text-sm uppercase tracking-[0.18em] font-medium hover:shadow-[0_10px_40px_rgba(95,46,255,0.45)] transition-all duration-500"
            >
              <span className="relative z-10">Back to Stories</span>
              <span className="material-symbols-outlined text-lg relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                arrow_forward
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
