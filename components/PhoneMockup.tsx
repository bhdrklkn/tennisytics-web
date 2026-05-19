"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const screens = [
  {
    label: "Live Match",
    bg: "#313851",
    content: (
      <div style={{ padding: "16px 14px", color: "white", fontFamily: "system-ui" }}>
        <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Live Match</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Rafael A.</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#C8E84B" }}>6</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.7 }}>Carlos M.</div>
          <div style={{ fontSize: 28, fontWeight: 900, opacity: 0.5 }}>4</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 10px", marginBottom: 10 }}>
          <div style={{ fontSize: 9, opacity: 0.5, marginBottom: 4 }}>CURRENT GAME</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["40", "30"].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 18, fontWeight: 900, color: i === 0 ? "#C8E84B" : "white", opacity: i === 1 ? 0.5 : 1 }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["Point P1", "Point P2"].map((label, i) => (
            <div key={i} style={{ flex: 1, background: i === 0 ? "#C8E84B" : "rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 0", textAlign: "center", fontSize: 9, fontWeight: 700, color: i === 0 ? "#313851" : "white" }}>{label}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Statistics",
    bg: "#F6F3ED",
    content: (
      <div style={{ padding: "16px 14px", fontFamily: "system-ui" }}>
        <div style={{ fontSize: 10, opacity: 0.5, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1, color: "#313851" }}>Player Stats</div>
        {[
          { label: "Win Rate", value: 72, color: "#313851" },
          { label: "1st Serve %", value: 64, color: "#10B981" },
          { label: "Ace Count", value: 45, color: "#C8E84B", textColor: "#313851" },
        ].map((stat, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: "#5a6478", fontWeight: 600 }}>{stat.label}</span>
              <span style={{ fontSize: 10, color: "#313851", fontWeight: 800 }}>{stat.value}%</span>
            </div>
            <div style={{ background: "#e5e7eb", borderRadius: 4, height: 5, overflow: "hidden" }}>
              <div style={{ width: `${stat.value}%`, height: "100%", background: stat.color, borderRadius: 4, transition: "width 1s" }} />
            </div>
          </div>
        ))}
        <div style={{ background: "#313851", borderRadius: 10, padding: "8px 10px", marginTop: 8 }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>RECENT FORM</div>
          <div style={{ display: "flex", gap: 4 }}>
            {["W","W","L","W","W"].map((r, i) => (
              <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: r === "W" ? "#10B981" : "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: "white" }}>{r}</div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Players",
    bg: "#ffffff",
    content: (
      <div style={{ padding: "16px 14px", fontFamily: "system-ui" }}>
        <div style={{ fontSize: 10, opacity: 0.5, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1, color: "#313851" }}>My Players</div>
        {[
          { name: "Rafael A.", wins: 18, losses: 4, initials: "RA" },
          { name: "Carlos M.", wins: 12, losses: 7, initials: "CM" },
          { name: "Novak D.", wins: 21, losses: 2, initials: "ND" },
        ].map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #f0f0f0" }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: "#313851", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "white", flexShrink: 0 }}>{p.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#313851" }}>{p.name}</div>
              <div style={{ fontSize: 9, color: "#5a6478" }}>{p.wins}W – {p.losses}L</div>
            </div>
            <div style={{ fontSize: 9, color: "#10B981", fontWeight: 700 }}>{Math.round(p.wins/(p.wins+p.losses)*100)}%</div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function PhoneMockup() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % screens.length), 3000);
    return () => clearInterval(timer);
  }, []);

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
        background: screens[current].bg,
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", inset: 0, background: screens[current].bg }}
          >
            {/* Status bar */}
            <div style={{ height: 28, background: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>9:41</span>
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)" }}>●●●</span>
            </div>
            {screens[current].content}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Dots */}
      <div style={{ position: "absolute", bottom: -24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
        {screens.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 16 : 6, height: 6, borderRadius: 3, background: i === current ? "#C8E84B" : "rgba(255,255,255,0.3)", transition: "all 0.3s", cursor: "pointer" }} />
        ))}
      </div>
    </div>
  );
}
