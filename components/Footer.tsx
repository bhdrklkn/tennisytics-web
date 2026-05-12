"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [lang, setLang] = useState<"en" | "tr">("en");

  useEffect(() => {
    const saved = localStorage.getItem("tny_lang");
    if (saved === "tr" || saved === "en") setLang(saved);
    const handler = (e: Event) => setLang((e as CustomEvent).detail);
    window.addEventListener("langchange", handler);
    return () => window.removeEventListener("langchange", handler);
  }, []);

  return (
    <footer style={{ background: "var(--primary)", color: "rgba(255,255,255,0.65)", textAlign: "center", padding: "32px 24px", fontSize: 13 }}>
      <div style={{ marginBottom: 12 }}>
        <Link href="/privacy" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", margin: "0 12px", fontWeight: 500 }}>
          {lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
        </Link>
        <a href="mailto:bhdrklkn09@gmail.com" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", margin: "0 12px", fontWeight: 500 }}>
          {lang === "tr" ? "İletişim" : "Contact"}
        </a>
      </div>
      <div>© 2025 Tennisytics. {lang === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}</div>
    </footer>
  );
}
