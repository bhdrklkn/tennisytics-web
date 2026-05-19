"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  lang?: "tr" | "en";
}

const screens = {
  tr: [
    { label: "Canlı Maç", src: "/screenshots/tr-match.png" },
    { label: "İstatistikler", src: "/screenshots/tr-stats.png" },
    { label: "Oyuncular", src: "/screenshots/tr-players.png" },
  ],
  en: [
    { label: "Live Match", src: "/screenshots/en-match.png" },
    { label: "Statistics", src: "/screenshots/en-stats.png" },
    { label: "Players", src: "/screenshots/en-players.png" },
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
    <div style={{ position: "relative", width: 200, height: 400, flexShrink: 0 }}>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={list[current].src}
              alt={list[current].label}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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
    </div>
  );
}
