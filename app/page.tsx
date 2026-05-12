"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const t = {
  en: {
    badge: "🎾 Tennis Analytics App",
    h1a: "The smarter way to",
    h1b: "coach tennis",
    sub: "Track matches in real time, analyze player statistics, and take your coaching to the next level.",
    featuresTitle: "Everything a coach needs",
    featuresSub: "From live scoring to deep statistics — all in one app",
    pricingTitle: "Simple pricing",
    pricingSub: "Start free. Upgrade when you're ready.",
    free: "Free",
    forever: "forever",
    premium: "Premium",
    perMonth: "per month · or $29.99/year",
    mostPopular: "Most Popular",
    features: [
      { icon: "📊", title: "Live Match Tracking", desc: "Score points in real time with a single tap. Automatic set and match calculation." },
      { icon: "📈", title: "Player Statistics", desc: "Win rates, first serve percentages, ace counts, and detailed match history for every player." },
      { icon: "👥", title: "Player Profiles", desc: "Manage your entire roster. Track each player's progress over time." },
      { icon: "⚡", title: "Instant Sharing", desc: "Share live match links with parents so they can follow the score in real time." },
      { icon: "🔄", title: "Works Offline", desc: "Record matches without internet. Data syncs automatically when you're back online." },
      { icon: "🏆", title: "Head-to-Head Stats", desc: "Compare two players and see detailed opponent history." },
    ],
    freePlan: ["4 player profiles", "12 matches", "All statistics", "Live match sharing"],
    premiumPlan: ["Unlimited players", "Unlimited matches", "All statistics", "Live match sharing"],
  },
  tr: {
    badge: "🎾 Tenis Analiz Uygulaması",
    h1a: "Tenis koçluğunun",
    h1b: "akıllı yolu",
    sub: "Maçları gerçek zamanlı takip et, oyuncu istatistiklerini analiz et ve koçluğunu bir üst seviyeye taşı.",
    featuresTitle: "Bir koçun ihtiyacı olan her şey",
    featuresSub: "Canlı skordan detaylı istatistiklere — hepsi tek uygulamada",
    pricingTitle: "Sade fiyatlandırma",
    pricingSub: "Ücretsiz başla. Hazır olduğunda yükselt.",
    free: "Ücretsiz",
    forever: "sonsuza kadar",
    premium: "Premium",
    perMonth: "aylık · veya $29.99/yıl",
    mostPopular: "En Popüler",
    features: [
      { icon: "📊", title: "Canlı Maç Takibi", desc: "Tek dokunuşla gerçek zamanlı skor tut. Otomatik set ve maç hesaplama." },
      { icon: "📈", title: "Oyuncu İstatistikleri", desc: "Kazanma oranları, ilk servis yüzdeleri, as sayıları ve her oyuncu için detaylı maç geçmişi." },
      { icon: "👥", title: "Oyuncu Profilleri", desc: "Tüm oyuncu kadronunu yönet. Her oyuncunun gelişimini zaman içinde takip et." },
      { icon: "⚡", title: "Anlık Paylaşım", desc: "Velilerle canlı maç linkini paylaş, skoru gerçek zamanlı takip etsinler." },
      { icon: "🔄", title: "Çevrimdışı Çalışır", desc: "İnternetsiz maç kaydet. Bağlantıya geçince veriler otomatik senkronize olur." },
      { icon: "🏆", title: "Karşılıklı İstatistikler", desc: "İki oyuncuyu karşılaştır ve detaylı rakip geçmişini gör." },
    ],
    freePlan: ["4 oyuncu profili", "12 maç", "Tüm istatistikler", "Canlı maç paylaşımı"],
    premiumPlan: ["Sınırsız oyuncu", "Sınırsız maç", "Tüm istatistikler", "Canlı maç paylaşımı"],
  },
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function Home() {
  const [lang, setLang] = useState<"en" | "tr">("en");

  useEffect(() => {
    const saved = localStorage.getItem("tny_lang");
    if (saved === "tr" || saved === "en") setLang(saved);
    const handler = (e: Event) => setLang((e as CustomEvent).detail);
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const c = t[lang];

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{ background: "var(--primary)", color: "white", textAlign: "center", padding: "80px 24px 96px" }}>
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <span style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 20, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 24, letterSpacing: 0.5 }}>
              {c.badge}
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.5 }} style={{ fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: -1 }}>
            {c.h1a}<br /><span style={{ color: "var(--mid)" }}>{c.h1b}</span>
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }} style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", maxWidth: 500, margin: "0 auto 40px" }}>
            {c.sub}
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }} style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#"
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              style={{ display: "inline-block", transition: "transform 0.15s" }}>
              <Image src={lang === "tr" ? "/appstore-tr.svg" : "/appstore-en.svg"} alt="App Store" width={160} height={54} />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: "var(--mid)", padding: "80px 24px", textAlign: "center" }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }} style={{ fontSize: 32, fontWeight: 800, color: "var(--primary)", marginBottom: 12 }}>
            {c.featuresTitle}
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }} style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 56 }}>
            {c.featuresSub}
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, maxWidth: 960, margin: "0 auto" }}>
            {c.features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                style={{ background: "white", borderRadius: 16, padding: "32px 24px", textAlign: "left", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--primary)", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 24px", textAlign: "center", background: "var(--cream)" }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }} style={{ fontSize: 32, fontWeight: 800, color: "var(--primary)", marginBottom: 12 }}>
            {c.pricingTitle}
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }} style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 56 }}>
            {c.pricingSub}
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, maxWidth: 640, margin: "0 auto" }}>
            <motion.div variants={fadeUp} transition={{ duration: 0.4 }} whileHover={{ scale: 1.02 }}
              style={{ border: "2px solid #e5e7eb", borderRadius: 20, padding: "36px 28px", background: "white", color: "var(--text)" }}>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.7, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{c.free}</div>
              <div style={{ fontSize: 40, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>$0</div>
              <div style={{ fontSize: 14, opacity: 0.6, marginBottom: 24 }}>{c.forever}</div>
              <ul style={{ listStyle: "none", textAlign: "left" }}>
                {c.freePlan.map((item, i) => (
                  <li key={i} style={{ fontSize: 14, padding: "6px 0", opacity: 0.85 }}>
                    <span style={{ fontWeight: 700, color: "#10B981" }}>✓ </span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.4 }} whileHover={{ scale: 1.02 }}
              style={{ border: "2px solid var(--primary)", borderRadius: 20, padding: "36px 28px", background: "var(--primary)", color: "white", position: "relative" }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#10B981", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap" }}>
                {c.mostPopular}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.7, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{c.premium}</div>
              <div style={{ fontSize: 40, fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>$4.99</div>
              <div style={{ fontSize: 14, opacity: 0.6, marginBottom: 24 }}>{c.perMonth}</div>
              <ul style={{ listStyle: "none", textAlign: "left" }}>
                {c.premiumPlan.map((item, i) => (
                  <li key={i} style={{ fontSize: 14, padding: "6px 0", opacity: 0.85 }}>
                    <span style={{ fontWeight: 700, color: "var(--mid)" }}>✓ </span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
