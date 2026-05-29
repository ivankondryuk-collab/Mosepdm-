"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Play, VolumeX, Volume2 } from "lucide-react";

const stats = [
  { value: ">10", label: "тонн/сутки", sub: "производство" },
  { value: ">1000", label: "объектов", sub: "сдано" },
  { value: "min 22%", label: "каучука", sub: "в составе" },
  { value: "5 лет", label: "гарантия", sub: "на укладку" },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const textY = useTransform(scrollY, [0, 600], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── VIDEO BACKGROUND ── */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          src="/videos/hero-bg.mov"
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Fallback poster when video not loaded */}
        {!videoLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-poster.jpg')" }}
          />
        )}
      </motion.div>

      {/* ── ANIMATED GRID OVERLAY ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── ACCENT GLOW ── */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-DEFAULT/15 rounded-full blur-[120px] pointer-events-none" />

      {/* ── MUTE BUTTON ── */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        aria-label={muted ? "Включить звук" : "Выключить звук"}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* ── CONTENT ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container-custom relative z-10 pt-24 pb-20 lg:pt-32"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-accent-DEFAULT rounded-full animate-pulse" />
              Крупнейший производитель EPDM крошки в России
            </span>
          </motion.div>

          {/* Heading with letter-by-letter reveal */}
          <motion.h1 variants={itemVariants} className="text-hero text-white mb-6 leading-[1.08]">
            Производство и укладка{" "}
            <span className="text-accent-DEFAULT relative">
              резиновых и EPDM
              <motion.span
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-DEFAULT/50 block"
              />
            </span>{" "}
            покрытий
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
            Производство EPDM и TPV методом вулканизации. Укладка бесшовных покрытий под ключ.
            Собственный склад в Подмосковье. Более 1000 сданных объектов.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link href="/calculator" className="btn-accent flex items-center gap-2 text-base group">
              Рассчитать стоимость проекта
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/catalog"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-base group"
            >
              <Play className="w-4 h-4 fill-current" />
              Каталог продукции
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              className="bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-5 cursor-default"
            >
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-accent-DEFAULT font-semibold text-sm mt-1">{stat.label}</div>
              <div className="text-white/40 text-xs mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 pointer-events-none"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Листать</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
