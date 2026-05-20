"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  lang?: "tr" | "en";
}

const screens = {
  tr: [
    { label: "Ana Sayfa",          src: "/screenshots/tr-home.png" },
    { label: "Oyuncular",          src: "/screenshots/tr-players.png" },
    { label: "Maçlar",             src: "/screenshots/tr-matches.png" },
    { label: "Kazanma Oranı",      src: "/screenshots/tr-stats-trend.png" },
    { label: "Servis",             src: "/screenshots/tr-stats-serve.png" },
    { label: "Hata Analizi",       src: "/screenshots/tr-stats-error.png" },
    { label: "Vuruş Analizi",      src: "/screenshots/tr-stats-stroke.png" },
  ],
  en: [
    { label: "Home",           src: "/screenshots/tr-home.png" },
    { label: "Players",        src: "/screenshots/tr-players.png" },
    { label: "Matches",        src: "/screenshots/tr-matches.png" },
    { label: "Win Rate",       src: "/screenshots/tr-stats-trend.png" },
    { label: "Serve",          src: "/screenshots/tr-stats-serve.png" },
    { label: "Error Analysis", src: "/screenshots/tr-stats-error.png" },
    { label: "Stroke Analysis",src: "/screenshots/tr-stats-stroke.png" },
  ],
};

export default function PhoneMockup({ lang = "en" }: Props) {
  const [current, setCurrent] = useState(0);
  const list = screens[lang];

  useEffect(() => {
    setCurrent(0);
  }, [lang]);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % list.length), 3000);
    return () => clearInterval(timer);
  }, [list.length]);

  return (
    <div className="phone-mockup-wrap" style={{ position: "relative", flexShrink: 0 }}>
      {/* Phone frame */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: 36,
        background: "#1a1f2e",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,255,255,0.08)",
      }} />
      {/* Notch */}
      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 60, height: 10, background: "#1a1f2e", borderRadius: 8, zIndex: 10 }} />
      {/* Screen */}
      <div style={{
        position: "absolute", top: 10, left: 8, right: 8, bottom: 10,
        borderRadius: 28,
        overflow: "hidden",
        background: "#313851",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${lang}-${current}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={list[current].src}
              alt={list[current].label}
              fill
              style={{ objectFit: "cover", objectPosition: "50% 85%" }}
              sizes="380px"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Dots */}
      <div style={{ position: "absolute", bottom: -24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
        {list.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 16 : 6, height: 6, borderRadius: 3, background: i === current ? "#C8E84B" : "rgba(255,255,255,0.3)", transition: "all 0.3s", cursor: "pointer" }} />
        ))}
      </div>
      <style>{`
        .phone-mockup-wrap {
          width: 380px;
          height: 760px;
        }
        @media (max-width: 640px) {
          .phone-mockup-wrap {
            width: min(300px, 80vw);
            height: min(600px, 160vw);
          }
        }
      `}</style>
    </div>
  );
}
