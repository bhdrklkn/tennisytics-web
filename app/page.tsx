"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhoneMockup from "@/components/PhoneMockup";

const t = {
  en: {
    badge: "🎾 Tennis Analytics App",
    h1a: "The smarter way to",
    h1b: "coach tennis",
    sub: "Track matches in real time, analyze player statistics, and take your coaching to the next level.",
    ctaDownload: "Download on App Store",
    ctaFree: "Start for Free",
    howTitle: "How it works",
    howSub: "Three simple steps to transform your coaching",
    howSteps: [
      { step: "01", title: "Start a Match", desc: "Tap to begin tracking any match. Set players, surface, and format in seconds.", icon: "🎾" },
      { step: "02", title: "Record Every Point", desc: "Tap after each point to log serve type, rally length, winner, and error type.", icon: "📊" },
      { step: "03", title: "Analyze & Improve", desc: "Get instant stats: win rates, serve percentages, break points, and player trends.", icon: "📈" },
    ],
    featuresTitle: "Everything a coach needs",
    featuresSub: "From live scoring to deep statistics — all in one app",
    features: [
      { icon: "⚡", title: "Live Match Tracking", desc: "Score points in real time with a single tap. Automatic set and match calculation." },
      { icon: "📈", title: "Player Statistics", desc: "Win rates, first serve percentages, ace counts, and detailed match history for every player." },
      { icon: "👥", title: "Player Profiles", desc: "Manage your entire roster. Track each player's progress over time." },
      { icon: "📡", title: "Instant Sharing", desc: "Share live match links with parents so they can follow the score in real time." },
      { icon: "🔄", title: "Works Offline", desc: "Record matches without internet. Data syncs automatically when you're back online." },
      { icon: "🏆", title: "Head-to-Head Stats", desc: "Compare two players and see detailed opponent history." },
    ],
    pricingTitle: "Simple pricing",
    pricingSub: "Start free. Upgrade when you're ready.",
    free: "Free",
    forever: "forever",
    premium: "Premium",
    perMonth: "per month",
    perYear: "or $29.99/year",
    mostPopular: "Most Popular",
    freePlan: ["4 player profiles", "12 matches per month", "Full statistics", "Live match sharing"],
    premiumPlan: ["Unlimited players", "Unlimited matches", "Full statistics", "Live match sharing"],
    faqTitle: "Frequently asked questions",
    faqSub: "Everything you need to know about Tennisytics",
    faqs: [
      { q: "What's the difference between Free and Premium?", a: "The Free plan lets you manage up to 4 players and 12 matches per month — perfect to get started. Premium removes all limits so you can track every match, every player, with no restrictions." },
      { q: "Is it available on iPhone and Android?", a: "Currently available on iOS (iPhone). Android support is coming soon. Stay tuned!" },
      { q: "Does it work without internet?", a: "Yes. You can record full matches offline. Everything syncs automatically the next time you're connected." },
      { q: "Is my data safe?", a: "All data is stored securely on Firebase (Google Cloud). Your match data is private and only accessible to you." },
      { q: "Can I share matches with parents?", a: "Yes. Tap 'Share Live' during any match to generate a link. Parents can follow the score in real time from any browser." },
    ],
  },
  tr: {
    badge: "🎾 Tenis Analiz Uygulaması",
    h1a: "Tenis koçluğunun",
    h1b: "akıllı yolu",
    sub: "Maçları gerçek zamanlı takip et, oyuncu istatistiklerini analiz et ve koçluğunu bir üst seviyeye taşı.",
    ctaDownload: "App Store'dan İndir",
    ctaFree: "Ücretsiz Başla",
    howTitle: "Nasıl çalışır",
    howSub: "Koçluğunu dönüştürecek üç basit adım",
    howSteps: [
      { step: "01", title: "Maç Başlat", desc: "Herhangi bir maçı takip etmek için dokun. Oyuncuları, zemini ve formatı saniyeler içinde ayarla.", icon: "🎾" },
      { step: "02", title: "Her Puanı Kaydet", desc: "Her puan sonrası dokun: servis türü, ralli uzunluğu, winner ve hata türünü kaydet.", icon: "📊" },
      { step: "03", title: "Analiz Et & Geliş", desc: "Anında istatistik al: kazanma oranları, servis yüzdeleri, break puanları ve oyuncu trendleri.", icon: "📈" },
    ],
    featuresTitle: "Bir koçun ihtiyacı olan her şey",
    featuresSub: "Canlı skordan detaylı istatistiklere — hepsi tek uygulamada",
    features: [
      { icon: "⚡", title: "Canlı Maç Takibi", desc: "Tek dokunuşla gerçek zamanlı skor tut. Otomatik set ve maç hesaplama." },
      { icon: "📈", title: "Oyuncu İstatistikleri", desc: "Kazanma oranları, ilk servis yüzdeleri, as sayıları ve her oyuncu için detaylı maç geçmişi." },
      { icon: "👥", title: "Oyuncu Profilleri", desc: "Tüm oyuncu kadronunu yönet. Her oyuncunun gelişimini zaman içinde takip et." },
      { icon: "📡", title: "Anlık Paylaşım", desc: "Velilerle canlı maç linkini paylaş, skoru gerçek zamanlı takip etsinler." },
      { icon: "🔄", title: "Çevrimdışı Çalışır", desc: "İnternetsiz maç kaydet. Bağlantıya geçince veriler otomatik senkronize olur." },
      { icon: "🏆", title: "Karşılıklı İstatistikler", desc: "İki oyuncuyu karşılaştır ve detaylı rakip geçmişini gör." },
    ],
    pricingTitle: "Sade fiyatlandırma",
    pricingSub: "Ücretsiz başla. Hazır olduğunda yükselt.",
    free: "Ücretsiz",
    forever: "sonsuza kadar",
    premium: "Premium",
    perMonth: "aylık",
    perYear: "veya $29.99/yıl",
    mostPopular: "En Popüler",
    freePlan: ["4 oyuncu profili", "Aylık 12 maç", "Tüm istatistikler", "Canlı maç paylaşımı"],
    premiumPlan: ["Sınırsız oyuncu", "Sınırsız maç", "Tüm istatistikler", "Canlı maç paylaşımı"],
    faqTitle: "Sık sorulan sorular",
    faqSub: "Tennisytics hakkında bilmek istediğin her şey",
    faqs: [
      { q: "Ücretsiz ve Premium arasındaki fark nedir?", a: "Ücretsiz plan ayda 4 oyuncu ve 12 maça kadar izin verir — başlamak için mükemmel. Premium tüm limitleri kaldırır, sınırsız maç ve oyuncu takibi sağlar." },
      { q: "iPhone ve Android'de var mı?", a: "Şu an iOS (iPhone) için mevcut. Android desteği çok yakında geliyor!" },
      { q: "İnternetsiz çalışıyor mu?", a: "Evet. Maçları tamamen çevrimdışı kaydedebilirsin. Her şey bir sonraki bağlantıda otomatik senkronize olur." },
      { q: "Verilerim güvende mi?", a: "Tüm veriler Firebase (Google Cloud) üzerinde güvenli şekilde saklanır. Maç verilerine sadece sen erişebilirsin." },
      { q: "Maçları velilerle paylaşabilir miyim?", a: "Evet. Herhangi bir maçta 'Canlı Paylaş' butonuna dokun. Veliler linki herhangi bir tarayıcıdan açarak skoru gerçek zamanlı takip edebilir." },
    ],
  },
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{ borderBottom: "1px solid rgba(49,56,81,0.12)", cursor: "pointer", padding: "20px 0" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--primary)" }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 20, color: "var(--primary)", flexShrink: 0, lineHeight: 1 }}
        >+</motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginTop: 10 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "tr">("en");
  const howRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: howRef, offset: ["start end", "end start"] });
  const xStep1 = useTransform(scrollYProgress, [0.1, 0.4], [-60, 0]);
  const xStep2 = useTransform(scrollYProgress, [0.25, 0.55], [60, 0]);
  const xStep3 = useTransform(scrollYProgress, [0.4, 0.7], [-60, 0]);
  const opStep1 = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const opStep2 = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const opStep3 = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);

  useEffect(() => {
    const saved = localStorage.getItem("tny_lang");
    if (saved === "tr" || saved === "en") setLang(saved);
    const handler = (e: Event) => setLang((e as CustomEvent).detail);
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  const c = t[lang];
  const steps = [
    { x: xStep1, op: opStep1 },
    { x: xStep2, op: opStep2 },
    { x: xStep3, op: opStep3 },
  ];

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: "var(--primary)",
        color: "white",
        padding: "90px 24px 110px",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60, flexWrap: "wrap" }}>
          {/* Left */}
          <motion.div
            initial="hidden" animate="show" variants={stagger}
            style={{ flex: "1 1 400px", minWidth: 280 }}
          >

            <motion.h1 variants={fadeUp} transition={{ duration: 0.5 }}
              style={{ fontSize: "clamp(36px, 5.5vw, 58px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 20, letterSpacing: -1.5 }}>
              {c.h1a}<br />
              <span style={{ color: "#C8E84B" }}>{c.h1b}</span>
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", maxWidth: 440, marginBottom: 40, lineHeight: 1.7 }}>
              {c.sub}
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
              style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <a href="#"
                style={{ display: "inline-block", transition: "transform 0.15s, opacity 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}>
                <Image src={lang === "tr" ? "/appstore-tr.svg" : "/appstore-en.svg"} alt="App Store" width={151} height={40} />
              </a>
              <a href="#"
                style={{ display: "inline-block", transition: "transform 0.15s, opacity 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.opacity = "1"; }}>
                <Image src={lang === "tr" ? "/googleplay-tr.svg" : "/googleplay-en.svg"} alt="Google Play" width={135} height={40} />
              </a>
              <a href="#pricing"
                style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "12px 22px", fontSize: 14, fontWeight: 600, color: "white", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}>
                {c.ctaFree} →
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", paddingBottom: 32 }}
          >
            <PhoneMockup lang={lang as "tr" | "en"} />
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={howRef} style={{ background: "var(--primary)", padding: "80px 24px 100px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontSize: 32, fontWeight: 800, color: "white", marginBottom: 10 }}>
            {c.howTitle}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 72 }}>
            {c.howSub}
          </motion.p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {c.howSteps.map((step, i) => (
              <motion.div
                key={i}
                style={{ x: steps[i].x, opacity: steps[i].op, display: "flex", alignItems: "center", gap: 24, background: "rgba(255,255,255,0.05)", borderRadius: 20, padding: "28px 32px", textAlign: "left", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div style={{ fontSize: 36, flexShrink: 0 }}>{step.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#C8E84B", letterSpacing: 2, marginBottom: 6 }}>STEP {step.step}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 6 }}>{step.title}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: "var(--mid)", padding: "90px 24px", textAlign: "center" }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
            style={{ fontSize: 32, fontWeight: 800, color: "var(--primary)", marginBottom: 12 }}>
            {c.featuresTitle}
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
            style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 60 }}>
            {c.featuresSub}
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, maxWidth: 980, margin: "0 auto" }}>
            {c.features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.02, boxShadow: "0 16px 40px rgba(49,56,81,0.15)" }}
                style={{ background: "white", borderRadius: 18, padding: "32px 24px", textAlign: "left", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid rgba(49,56,81,0.06)", transition: "border-color 0.2s", cursor: "default" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 16 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--primary)", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "90px 24px", textAlign: "center", background: "var(--cream)" }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.5 }}
            style={{ fontSize: 32, fontWeight: 800, color: "var(--primary)", marginBottom: 12 }}>
            {c.pricingTitle}
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
            style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 60 }}>
            {c.pricingSub}
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 24, maxWidth: 660, margin: "0 auto" }}>
            {/* Free */}
            <motion.div variants={fadeUp} transition={{ duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(49,56,81,0.1)" }}
              style={{ border: "2px solid #e5e7eb", borderRadius: 22, padding: "38px 30px", background: "white", color: "var(--text)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 14 }}>{c.free}</div>
              <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, marginBottom: 4, color: "var(--primary)" }}>$0</div>
              <div style={{ fontSize: 13, opacity: 0.5, marginBottom: 28 }}>{c.forever}</div>
              <ul style={{ listStyle: "none", textAlign: "left", marginBottom: 28 }}>
                {c.freePlan.map((item, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    style={{ fontSize: 14, padding: "7px 0", display: "flex", alignItems: "center", gap: 8, borderBottom: i < c.freePlan.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                    <span style={{ color: "#10B981", fontWeight: 800, fontSize: 13 }}>✓</span>{item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Premium */}
            <motion.div variants={fadeUp} transition={{ duration: 0.4 }}
              whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(49,56,81,0.3)" }}
              style={{ border: "2px solid var(--primary)", borderRadius: 22, padding: "38px 30px", background: "var(--primary)", color: "white", position: "relative" }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#10B981", color: "white", fontSize: 10, fontWeight: 700, padding: "4px 16px", borderRadius: 20, whiteSpace: "nowrap", letterSpacing: 0.5 }}>
                {c.mostPopular}
              </motion.div>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.6, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 14 }}>{c.premium}</div>
              <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, marginBottom: 4, color: "#C8E84B" }}>$4.99</div>
              <div style={{ fontSize: 13, opacity: 0.5, marginBottom: 4 }}>{c.perMonth}</div>
              <div style={{ fontSize: 11, opacity: 0.4, marginBottom: 28 }}>{c.perYear}</div>
              <ul style={{ listStyle: "none", textAlign: "left", marginBottom: 28 }}>
                {c.premiumPlan.map((item, i) => (
                  <motion.li key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    style={{ fontSize: 14, padding: "7px 0", display: "flex", alignItems: "center", gap: 8, borderBottom: i < c.premiumPlan.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                    <span style={{ color: "#C8E84B", fontWeight: 800, fontSize: 13 }}>✓</span>{item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--cream)", padding: "0 24px 90px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontSize: 28, fontWeight: 800, color: "var(--primary)", marginBottom: 8, textAlign: "center" }}>
            {c.faqTitle}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 15, color: "var(--text-secondary)", textAlign: "center", marginBottom: 40 }}>
            {c.faqSub}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            {c.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
