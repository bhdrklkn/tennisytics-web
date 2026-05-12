"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [lang, setLangState] = useState<"en" | "tr">("en");

  useEffect(() => {
    const saved = localStorage.getItem("tny_lang");
    if (saved === "tr" || saved === "en") {
      setLangState(saved);
    } else {
      const browser = navigator.language || "en";
      setLangState(browser.toLowerCase().startsWith("tr") ? "tr" : "en");
    }
  }, []);

  const setLang = (l: "en" | "tr") => {
    setLangState(l);
    localStorage.setItem("tny_lang", l);
    window.dispatchEvent(new CustomEvent("langchange", { detail: l }));
  };

  return (
    <nav style={{ background: "var(--primary)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Link href="/" style={{ color: "white", fontSize: 20, fontWeight: 800, letterSpacing: -0.5, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <Image src="/logo.png" alt="Tennisytics" width={32} height={32} style={{ borderRadius: 6 }} />
        Tennisytics
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="nav-links" style={{ display: "flex" }}>
          <Link href="/#features" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 14, fontWeight: 500, marginLeft: 24 }}>
            {lang === "tr" ? "Özellikler" : "Features"}
          </Link>
          <Link href="/#pricing" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 14, fontWeight: 500, marginLeft: 24 }}>
            {lang === "tr" ? "Fiyatlar" : "Pricing"}
          </Link>
          <Link href="/privacy" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 14, fontWeight: 500, marginLeft: 24 }}>
            {lang === "tr" ? "Gizlilik" : "Privacy"}
          </Link>
        </div>
        <div style={{ display: "flex", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 8, overflow: "hidden" }}>
          <button onClick={() => setLang("en")} style={{ background: lang === "en" ? "rgba(255,255,255,0.2)" : "transparent", border: "none", color: lang === "en" ? "white" : "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 700, padding: "5px 10px", cursor: "pointer" }}>EN</button>
          <button onClick={() => setLang("tr")} style={{ background: lang === "tr" ? "rgba(255,255,255,0.2)" : "transparent", border: "none", color: lang === "tr" ? "white" : "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 700, padding: "5px 10px", cursor: "pointer" }}>TR</button>
        </div>
      </div>
    </nav>
  );
}
